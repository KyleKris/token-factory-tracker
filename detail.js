// Token Factory Tracker - Detail Modal Module

const Detail = (function() {
  let overlay, modal, content, closeBtn;

  function init() {
    overlay = document.getElementById('detail-overlay');
    modal = document.getElementById('detail-modal');
    content = document.getElementById('detail-content');
    closeBtn = document.getElementById('detail-close');

    closeBtn.addEventListener('click', hide);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) hide();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hide();
    });
  }

  function show(company) {
    const countryFlags = { US: '🇺🇸', CN: '🇨🇳', FR: '🇫🇷' };
    const countryNames = { US: '美国', CN: '中国', FR: '法国' };
    const confNames = { official: '官方', reported: '报道', estimated: '估算', confident: '较可靠', likely: '可能' };
    const roleNames = { 'ai-lab': 'AI 实验室', 'hyperscaler': '超大规模云', 'platform': '平台型', 'open-source': '开源' };
    const tierNames = { flagship: '旗舰', mid: '中端', budget: '经济', reasoning: '推理', 'reasoning-lite': '轻量推理', nano: '超轻量', code: '代码', large: '大型', micro: '微型' };
    const flag = countryFlags[company.country] || '';
    const conf = company.revenue.confidence;
    const segColors = {
      consumer: '#4FC3F7', api: '#FFB74D', enterprise: '#81C784'
    };

    let html = `
      <div class="detail-header">
        <div class="detail-color-bar" style="background:${company.color}"></div>
        <div>
          <h2>${company.name} ${company.nameCN !== company.name ? '(' + company.nameCN + ')' : ''}</h2>
          <div class="detail-meta">${flag} ${countryNames[company.country] || company.country} · ${roleNames[company.role] || company.role} · 第 ${company.tier} 梯队
            <span class="conf-dot conf-${conf}" style="margin-left:4px"></span> ${confNames[conf] || conf}
          </div>
        </div>
      </div>`;

    // Key metrics grid
    const tokenEst = TOKEN_DATA.computeTokenConsumption(company);
    html += '<div class="detail-grid">';

    // ARR card
    html += `<div class="detail-card">
      <h4>年化收入 (ARR)</h4>
      <div class="big-number" style="color:${company.color}">${company.revenue.latestARR ? Charts.formatCurrency(company.revenue.latestARR) : 'N/A'}</div>
      <div class="sub-text">截至 ${company.revenue.asOfDate}${company.revenue.notes ? ' · ' + truncate(company.revenue.notes, 60) : ''}</div>
    </div>`;

    // Users card
    const userVal = company.users.mau || company.users.wau;
    html += `<div class="detail-card">
      <h4>${company.users.mau ? '月活用户' : '周活用户'}</h4>
      <div class="big-number">${userVal ? formatLargeNum(userVal) : 'N/A'}</div>
      <div class="sub-text">${company.users.details || ''}</div>
    </div>`;

    // Token consumption card
    html += `<div class="detail-card">
      <h4>日 Token 产出</h4>
      <div class="big-number">${tokenEst ? Charts.formatTokens(tokenEst.dailyTokens) : 'N/A'}</div>
      <div class="sub-text">${tokenEst ? (tokenEst.isOfficial ? '官方数据' : '均价 $' + tokenEst.avgPricePerMToken.toFixed(2) + '/1M tokens · 模型估算') : '数据不足'}</div>
    </div>`;

    // Products card
    html += `<div class="detail-card">
      <h4>产品</h4>
      <div style="font-size:14px;margin-top:6px">${company.products.join(' · ')}</div>
    </div>`;

    html += '</div>';

    // Revenue history chart
    const hist = company.revenue.history.filter(h => h.value > 0);
    if (hist.length >= 2) {
      html += `<div class="detail-card" style="margin-bottom:16px">
        <h4>收入历史 (ARR)</h4>
        <canvas id="detail-revenue-chart" class="detail-sparkline"></canvas>
      </div>`;
    }

    // Revenue mix
    const hasMix = company.revenueMix.segments.some(s => s.pct !== null && s.pct > 0);
    if (hasMix) {
      html += `<div class="detail-card" style="margin-bottom:16px">
        <h4>收入结构 (${company.revenueMix.asOfDate})</h4>
        <div class="detail-mix-bar">`;
      company.revenueMix.segments.forEach(s => {
        if (s.pct && s.pct > 0) {
          html += `<div class="detail-mix-seg" style="width:${s.pct}%;background:${segColors[s.id]}">${s.pct >= 8 ? s.pct + '%' : ''}</div>`;
        }
      });
      html += '</div><div class="detail-mix-legend">';
      company.revenueMix.segments.forEach(s => {
        if (s.pct && s.pct > 0) {
          html += `<div class="detail-mix-legend-item">
            <span class="detail-mix-legend-dot" style="background:${segColors[s.id]}"></span>
            ${s.labelCN || s.label}: ${s.pct}%${s.value ? ' (' + Charts.formatCurrency(s.value) + ')' : ''}
          </div>`;
        }
      });
      html += '</div>';
      if (company.revenueMix.notes) {
        html += `<div style="font-size:11px;color:var(--text-muted);margin-top:6px">${company.revenueMix.notes}</div>`;
      }
      html += '</div>';
    }

    // Per-company Sankey
    html += `<div class="detail-card" style="margin-bottom:16px">
      <h4>Token 收入流向</h4>
      <svg id="detail-sankey-svg" style="width:100%;height:180px"></svg>
    </div>`;

    // Pricing table
    if (company.pricing.length > 0) {
      html += `<div class="detail-card" style="margin-bottom:16px">
        <h4>API 定价 (每 1M tokens)</h4>
        <table class="detail-pricing-table">
          <tr><th>模型</th><th>层级</th><th>输入</th><th>输出</th><th>上下文</th></tr>`;
      company.pricing.forEach(p => {
        html += `<tr>
          <td style="color:${company.color}">${p.model}</td>
          <td style="color:var(--text-muted)">${tierNames[p.tier] || p.tier}</td>
          <td>$${p.input}</td>
          <td>$${p.output}</td>
          <td style="color:var(--text-muted)">${p.context || '-'}</td>
        </tr>`;
      });
      html += '</table>';
      if (company.pricing.some(p => p.note)) {
        html += '<div style="font-size:10px;color:var(--text-muted);margin-top:6px">';
        company.pricing.filter(p => p.note).forEach(p => {
          html += `${p.model}: ${p.note}<br>`;
        });
        html += '</div>';
      }
      html += '</div>';
    }

    // Key facts
    if (company.keyFacts.length > 0) {
      html += `<div class="detail-card">
        <h4>关键事实</h4>
        <ul class="detail-facts">`;
      company.keyFacts.forEach(f => {
        html += `<li>${f}</li>`;
      });
      html += '</ul></div>';
    }

    content.innerHTML = html;
    overlay.classList.remove('hidden');
    modal.classList.add('animate-in');

    // Draw charts after DOM update
    setTimeout(() => {
      drawRevenueChart(company);
      const sankeySvg = document.getElementById('detail-sankey-svg');
      if (sankeySvg) Sankey.renderForCompany(sankeySvg, company);
    }, 50);
  }

  function hide() {
    overlay.classList.add('hidden');
  }

  function drawRevenueChart(company) {
    const canvas = document.getElementById('detail-revenue-chart');
    if (!canvas) return;

    const hist = company.revenue.history.filter(h => h.value > 0);
    if (hist.length < 2) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight || 120;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const maxV = Math.max(...hist.map(d => d.value));
    const minV = 0;
    const pad = { l: 50, r: 10, t: 10, b: 30 };
    const plotW = w - pad.l - pad.r;
    const plotH = h - pad.t - pad.b;

    // Grid lines (Y axis)
    const gridLines = 4;
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#5a5a78';
    ctx.font = '9px -apple-system, sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= gridLines; i++) {
      const y = pad.t + (i / gridLines) * plotH;
      const val = maxV * (1 - i / gridLines);
      ctx.beginPath();
      ctx.moveTo(pad.l, y);
      ctx.lineTo(w - pad.r, y);
      ctx.stroke();
      ctx.fillText(Charts.formatCurrency(val), pad.l - 6, y + 3);
    }

    // Time axis ticks (X axis)
    ctx.textAlign = 'center';
    ctx.fillStyle = '#5a5a78';
    ctx.font = '9px -apple-system, sans-serif';
    hist.forEach((d, i) => {
      const x = pad.l + (i / (hist.length - 1)) * plotW;
      // Tick mark
      ctx.beginPath();
      ctx.moveTo(x, pad.t + plotH);
      ctx.lineTo(x, pad.t + plotH + 4);
      ctx.strokeStyle = '#2a2a3e';
      ctx.stroke();
      // Show label: always show first/last, skip some in middle if too many
      const showLabel = i === 0 || i === hist.length - 1 ||
        (hist.length <= 8) ||
        (hist.length <= 16 && i % 2 === 0) ||
        (hist.length > 16 && i % 3 === 0);
      if (showLabel) {
        ctx.textAlign = i === 0 ? 'left' : (i === hist.length - 1 ? 'right' : 'center');
        ctx.fillText(d.date, x, pad.t + plotH + 14);
      }
    });

    // Plot line
    ctx.beginPath();
    hist.forEach((d, i) => {
      const x = pad.l + (i / (hist.length - 1)) * plotW;
      const y = pad.t + plotH - ((d.value - minV) / (maxV - minV)) * plotH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = company.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Fill
    const lastIdx = hist.length - 1;
    ctx.lineTo(pad.l + plotW, pad.t + plotH);
    ctx.lineTo(pad.l, pad.t + plotH);
    ctx.closePath();
    ctx.fillStyle = company.color + '20';
    ctx.fill();

    // Data points
    hist.forEach((d, i) => {
      const x = pad.l + (i / (hist.length - 1)) * plotW;
      const y = pad.t + plotH - ((d.value - minV) / (maxV - minV)) * plotH;

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = d.confidence === 'confident' || d.confidence === 'official' ? '#00b894' : '#fdcb6e';
      ctx.fill();
    });
  }

  function truncate(str, len) {
    return str.length > len ? str.substring(0, len) + '...' : str;
  }

  function formatLargeNum(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(0) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
    return n.toString();
  }

  return { init, show, hide };
})();
