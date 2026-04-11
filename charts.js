// Token Factory Tracker - Charts & Stats Panel Module (Chinese UI)

const Charts = (function() {
  const segColors = { consumer: '#4FC3F7', api: '#FFB74D', enterprise: '#81C784' };
  const segLabels = { consumer: '2C 消费者', api: 'API/开发者', enterprise: '企业/平台' };

  function renderStats(container, layer, companies) {
    container.innerHTML = '';
    switch (layer) {
      case 'revenue': renderRevenueStats(container, companies); break;
      case 'revenueMix': renderMixStats(container, companies); break;
      case 'pricing': renderPricingStats(container, companies); break;
      case 'tokenEcon': renderTokenEconStats(container, companies); break;
      case 'growth': renderGrowthStats(container, companies); break;
      case 'revenueFlow': renderRevenueFlowStats(container, companies); break;
    }
  }

  // ==== Revenue sidebar: ranking + insights (no duplication with treemap) ====
  function renderRevenueStats(container, companies) {
    const sorted = companies.filter(c => c.revenue.latestARR).sort((a, b) => b.revenue.latestARR - a.revenue.latestARR);
    const maxVal = sorted.length ? sorted[0].revenue.latestARR : 1;
    let html = '<div class="stats-section"><h3>收入排名 (ARR)</h3>';
    sorted.forEach((c, i) => {
      const pct = (c.revenue.latestARR / maxVal * 100).toFixed(1);
      html += rankItem(c, i + 1, pct, formatCurrency(c.revenue.latestARR), c.revenue.confidence);
    });
    const noData = companies.filter(c => !c.revenue.latestARR);
    if (noData.length) {
      html += '<div style="margin-top:10px;padding-top:8px;border-top:1px solid var(--border)">';
      html += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">无直接 AI ARR 数据</div>';
      noData.forEach(c => html += rankItem(c, '-', 0, 'N/A', 'estimated', 0.5));
      html += '</div>';
    }
    html += '</div>';
    html += renderInsights('revenue', sorted);
    container.innerHTML = html;
    bindClicks(container);
  }

  // ==== Revenue Mix sidebar: aggregate segment totals (main area shows per-company bars) ====
  function renderMixStats(container, companies) {
    const withMix = companies.filter(c => c.revenueMix.segments.some(s => s.value && s.value > 0));
    const channels = ['consumer', 'api', 'enterprise'];
    const channelLabels = { consumer: '2C 消费者主导', api: 'API/开发者主导', enterprise: '企业服务主导' };

    // Group companies by dominant channel
    let html = '<div class="stats-section"><h3>渠道主导分类</h3>';
    html += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:8px">按最大收入渠道分组</div>';
    channels.forEach(ch => {
      const group = withMix.filter(c => {
        const segs = c.revenueMix.segments.filter(s => s.pct != null && s.pct > 0);
        if (!segs.length) return false;
        const max = segs.reduce((a, b) => (a.pct > b.pct ? a : b));
        return max.id === ch;
      });
      if (!group.length) return;
      html += `<div style="margin-bottom:10px">
        <div style="font-size:11px;color:var(--text-muted);display:flex;align-items:center;gap:4px;margin-bottom:4px">
          <span style="width:8px;height:8px;border-radius:2px;background:${segColors[ch]}"></span>${channelLabels[ch]}</div>`;
      group.forEach(c => {
        const seg = c.revenueMix.segments.find(s => s.id === ch);
        html += `<div class="rank-item" data-id="${c.id}" style="padding:2px 4px">
          <span style="width:6px;height:6px;border-radius:50%;background:${c.color};flex-shrink:0"></span>
          <span class="rank-name" style="font-size:12px">${c.nameCN || c.name}</span>
          <span class="rank-value" style="font-size:12px">${seg ? seg.pct + '%' : ''}</span>
        </div>`;
      });
      html += '</div>';
    });
    html += '</div>';

    // API percentage ranking
    html += '<div class="stats-section"><h3>各公司 API 占比</h3>';
    [...withMix].sort((a, b) => {
      const aApi = a.revenueMix.segments.find(s => s.id === 'api');
      const bApi = b.revenueMix.segments.find(s => s.id === 'api');
      return (bApi?.pct || 0) - (aApi?.pct || 0);
    }).forEach(c => {
      const apiSeg = c.revenueMix.segments.find(s => s.id === 'api');
      if (!apiSeg || !apiSeg.pct) return;
      html += `<div class="rank-item" data-id="${c.id}" style="padding:3px 4px">
        <span style="width:8px;height:8px;border-radius:50%;background:${c.color};flex-shrink:0"></span>
        <span class="rank-name">${c.nameCN || c.name}</span>
        <div class="rank-bar-container"><div class="rank-bar" style="width:${apiSeg.pct}%;background:${segColors.api}"></div></div>
        <span class="rank-value">${apiSeg.pct}%</span>
      </div>`;
    });
    html += '</div>';
    html += renderInsights('revenueMix', withMix);
    container.innerHTML = html;
    bindClicks(container);
  }

  // ==== Pricing sidebar: tier summary + price range (main area shows full comparison) ====
  function renderPricingStats(container, companies) {
    const byTier = {};
    companies.forEach(c => c.pricing.forEach(p => {
      if (!byTier[p.tier]) byTier[p.tier] = [];
      byTier[p.tier].push({ ...p, company: c });
    }));

    let html = '<div class="stats-section"><h3>价格区间摘要</h3>';
    ['flagship', 'mid', 'reasoning', 'budget'].forEach(tier => {
      const models = byTier[tier];
      if (!models || models.length === 0) return;
      const tierLabels = { flagship: '旗舰', mid: '中端', reasoning: '推理', budget: '经济' };
      const maxOut = Math.max(...models.map(m => m.output));
      const minOut = Math.min(...models.map(m => m.output));
      const avgOut = models.reduce((s, m) => s + m.output, 0) / models.length;
      html += `<div style="margin-bottom:12px">
        <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;margin-bottom:4px">${tierLabels[tier] || tier} (${models.length}个模型)</div>
        <div style="display:flex;justify-content:space-between;font-size:12px">
          <span>输出价格范围</span><span>$${minOut.toFixed(2)} — $${maxOut.toFixed(2)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted)">
          <span>平均</span><span>$${avgOut.toFixed(2)}/1M tokens</span>
        </div>
      </div>`;
    });
    html += '</div>';

    // Cheapest vs most expensive
    const allModels = [];
    companies.forEach(c => c.pricing.forEach(p => allModels.push({ ...p, company: c })));
    allModels.sort((a, b) => a.output - b.output);
    html += '<div class="stats-section"><h3>最便宜 vs 最贵</h3>';
    if (allModels.length >= 2) {
      const cheapest = allModels[0];
      const priciest = allModels[allModels.length - 1];
      html += `<div style="font-size:12px;margin-bottom:8px">
        <div style="color:var(--green)">最便宜: ${cheapest.company.name} ${cheapest.model} — $${cheapest.output}/1M</div>
        <div style="color:var(--orange);margin-top:4px">最贵: ${priciest.company.name} ${priciest.model} — $${priciest.output}/1M</div>
        <div style="color:var(--text-muted);margin-top:4px">差距: ${(priciest.output / cheapest.output).toFixed(0)}x</div>
      </div>`;
    }
    html += '</div>';
    html += renderInsights('pricing', allModels);
    container.innerHTML = html;
  }

  // ==== Token Economics sidebar: prominent metrics ====
  function renderTokenEconStats(container, companies) {
    // Token output ranking
    const items = companies
      .map(c => { const est = TOKEN_DATA.computeTokenConsumption(c); return est ? { company: c, ...est } : null; })
      .filter(Boolean)
      .sort((a, b) => b.dailyTokens - a.dailyTokens);
    const maxTokens = items.length ? items[0].dailyTokens : 1;

    let html = '<div class="stats-section"><h3>日 Token 产出排名</h3>';
    html += '<div style="font-size:10px;color:var(--text-muted);margin-bottom:8px">★ = 官方数据，其余为估算</div>';
    items.forEach((item, i) => {
      const pct = (item.dailyTokens / maxTokens * 100).toFixed(1);
      const label = formatTokens(item.dailyTokens) + '/天';
      const official = item.isOfficial ? ' ★' : '';
      html += `<div class="rank-item" data-id="${item.company.id}">
        <span class="rank-position">${i + 1}</span>
        <span class="rank-name">${item.company.nameCN || item.company.name}</span>
        <div class="rank-bar-container"><div class="rank-bar" style="width:${pct}%;background:${item.company.color}"></div></div>
        <span class="rank-value">${label}${official}</span>
      </div>`;
    });
    html += '</div>';

    // MAU ranking
    const mauItems = companies
      .map(c => ({ company: c, mau: c.users.mau || c.users.wau || 0, isMau: !!c.users.mau }))
      .filter(i => i.mau > 0)
      .sort((a, b) => b.mau - a.mau);
    const maxMau = mauItems.length ? mauItems[0].mau : 1;
    html += '<div class="stats-section"><h3>用户规模排名</h3>';
    mauItems.forEach((item, i) => {
      const pct = (item.mau / maxMau * 100).toFixed(1);
      const label = item.mau >= 1e9 ? (item.mau / 1e9).toFixed(1) + 'B' : item.mau >= 1e6 ? (item.mau / 1e6).toFixed(0) + 'M' : (item.mau / 1e3).toFixed(0) + 'K';
      html += `<div class="rank-item" data-id="${item.company.id}">
        <span class="rank-position">${i + 1}</span>
        <span class="rank-name">${item.company.nameCN || item.company.name}</span>
        <div class="rank-bar-container"><div class="rank-bar" style="width:${pct}%;background:${item.company.color}"></div></div>
        <span class="rank-value">${label} ${item.isMau ? 'MAU' : 'WAU'}</span>
      </div>`;
    });
    html += '</div>';

    // Tokens per user estimate
    const perUserItems = items
      .map(i => {
        const mau = i.company.users.mau || i.company.users.wau;
        if (!mau) return null;
        const tokensPerUser = i.dailyTokens * 1e6 / mau; // tokens per user per day
        return { company: i.company, tokensPerUser, mau };
      })
      .filter(Boolean)
      .sort((a, b) => b.tokensPerUser - a.tokensPerUser);
    if (perUserItems.length > 0) {
      const maxTpu = perUserItems[0].tokensPerUser;
      html += '<div class="stats-section"><h3>人均日 Token 估算</h3>';
      perUserItems.forEach((item, i) => {
        const pct = (item.tokensPerUser / maxTpu * 100).toFixed(1);
        const label = item.tokensPerUser >= 1e6 ? (item.tokensPerUser / 1e6).toFixed(1) + 'M' : item.tokensPerUser >= 1e3 ? (item.tokensPerUser / 1e3).toFixed(0) + 'K' : item.tokensPerUser.toFixed(0);
        html += `<div class="rank-item" data-id="${item.company.id}">
          <span class="rank-position">${i + 1}</span>
          <span class="rank-name">${item.company.nameCN || item.company.name}</span>
          <div class="rank-bar-container"><div class="rank-bar" style="width:${pct}%;background:${item.company.color}"></div></div>
          <span class="rank-value">${label}</span>
        </div>`;
      });
      html += '</div>';
    }
    html += renderInsights('tokenEcon', items);
    container.innerHTML = html;
    bindClicks(container);
  }

  // ==== Growth sidebar: growth ranking ====
  function renderGrowthStats(container, companies) {
    const items = calcGrowth(companies);
    let html = '<div class="stats-section"><h3>年化增长率排名</h3>';
    html += '<div style="font-size:10px;color:var(--text-muted);margin-bottom:8px">基于 ARR 变化轨迹</div>';
    const maxGrowth = items.length ? Math.max(...items.map(i => Math.abs(i.growth))) : 1;
    items.forEach((item, i) => {
      const pct = (Math.abs(item.growth) / maxGrowth * 100).toFixed(1);
      const growthPct = (item.growth * 100).toFixed(0);
      const color = item.growth > 2 ? '#00b894' : item.growth > 1 ? '#00cec9' : item.growth > 0.5 ? '#fdcb6e' : '#e17055';
      html += `<div class="rank-item" data-id="${item.company.id}">
        <span class="rank-position">${i + 1}</span>
        <span class="rank-name">${item.company.nameCN || item.company.name}</span>
        <div class="rank-bar-container"><div class="rank-bar" style="width:${pct}%;background:${color}"></div></div>
        <span class="rank-value" style="color:${color}">${growthPct > 0 ? '+' : ''}${growthPct}%</span>
      </div>`;
    });
    html += '</div>';
    html += renderInsights('growth', items);
    container.innerHTML = html;
    bindClicks(container);
  }

  // ==== Grouped stats (by country / tier) ====
  function renderGroupedStats(container, layer, companies, mode, defs) {
    const groups = {};
    companies.forEach(c => {
      const key = mode === 'country' ? c.country : c.tier;
      if (!groups[key]) groups[key] = [];
      groups[key].push(c);
    });

    const names = mode === 'country' ? defs.COUNTRY_NAMES : defs.TIER_NAMES;
    const colors = mode === 'country' ? defs.COUNTRY_COLORS : defs.TIER_COLORS;
    const title = mode === 'country' ? '按国家分组' : '按数据层级分组';
    const valueFn = layer === 'revenue'
      ? c => c.revenue.latestARR || 0
      : c => { const e = TOKEN_DATA.computeTokenConsumption(c); return e ? e.dailyTokens : 0; };
    const fmtFn = layer === 'revenue' ? formatCurrency : v => formatTokens(v) + '/天';

    let html = `<div class="stats-section"><h3>${title}</h3>`;
    for (const [key, list] of Object.entries(groups).sort((a, b) => {
      const aTotal = a[1].reduce((s, c) => s + valueFn(c), 0);
      const bTotal = b[1].reduce((s, c) => s + valueFn(c), 0);
      return bTotal - aTotal;
    })) {
      const total = list.reduce((s, c) => s + valueFn(c), 0);
      const sorted = list.sort((a, b) => valueFn(b) - valueFn(a));
      html += `<div style="margin-bottom:14px;padding:10px;background:var(--bg-tertiary);border-radius:6px;border-left:3px solid ${colors[key]}">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px">
          <span style="font-size:13px;font-weight:600;color:${colors[key]}">${names[key] || key}</span>
          <span style="font-size:13px;font-weight:600">${fmtFn(total)}</span>
        </div>
        <div style="font-size:11px;color:var(--text-secondary)">`;
      sorted.forEach(c => {
        const v = valueFn(c);
        html += `<div class="rank-item" data-id="${c.id}" style="padding:2px 0">
          <span style="width:6px;height:6px;border-radius:50%;background:${c.color};flex-shrink:0"></span>
          <span class="rank-name">${c.nameCN || c.name}</span>
          <span class="rank-value">${v > 0 ? fmtFn(v) : 'N/A'}</span>
        </div>`;
      });
      html += '</div></div>';
    }
    html += '</div>';
    container.innerHTML = html;
    bindClicks(container);
  }

  // ==== Chart views (main area, not sidebar) ====
  function renderChartView(container, layer, companies) {
    container.innerHTML = '';
    switch (layer) {
      case 'revenueMix': renderMixChartView(container, companies); break;
      case 'pricing': renderPricingChartView(container, companies); break;
      case 'growth': renderGrowthChartView(container, companies); break;
      case 'revenueFlow': renderRevenueFlowChartView(container, companies); break;
    }
  }

  function renderMixChartView(container, companies) {
    const hasMixData = c => c.revenueMix.segments.some(s => s.pct != null && s.pct > 0);
    const withMix = companies.filter(hasMixData)
      .sort((a, b) => {
        const aRev = a.revenueMix.totalAtTime || a.revenue.latestARR || 0;
        const bRev = b.revenueMix.totalAtTime || b.revenue.latestARR || 0;
        return bRev - aRev;
      });
    const withoutMix = companies.filter(c => !hasMixData(c));
    const maxRev = withMix.length ? Math.max(...withMix.map(c => c.revenueMix.totalAtTime || c.revenue.latestARR || 0)) : 1;
    let html = '<div style="display:flex;gap:10px;margin-bottom:10px;font-size:11px;color:var(--text-muted)">';
    for (const [id, color] of Object.entries(segColors)) {
      html += `<span><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${color}"></span> ${segLabels[id]}</span>`;
    }
    html += '</div><div class="chart-grid">';
    withMix.forEach(c => {
      const totalRev = c.revenueMix.totalAtTime || c.revenue.latestARR || 0;
      const barWidthPct = totalRev > 0 ? (totalRev / maxRev * 100).toFixed(1) : 5;
      html += `<div class="chart-row mix-hover-row" data-id="${c.id}">
        <div class="chart-row-name" style="color:${c.color}">${c.nameCN || c.name}</div>
        <div style="flex:1;position:relative">
          <div class="chart-row-bar" style="width:${barWidthPct}%">`;
      const tipParts = [];
      c.revenueMix.segments.forEach(s => {
        if (s.pct && s.pct > 0)
          html += `<div style="width:${s.pct}%;background:${segColors[s.id]};height:100%"></div>`;
        if (s.pct != null)
          tipParts.push(`<span style="display:inline-flex;align-items:center;gap:3px"><span style="width:6px;height:6px;border-radius:1px;background:${segColors[s.id]}"></span>${segLabels[s.id]} ${s.pct}%</span>`);
      });
      html += `</div>
          <div class="mix-tooltip" data-tip="${encodeURIComponent(tipParts.join('|'))}" style="display:none;position:absolute;top:-4px;left:-60px;transform:translateY(-100%);background:var(--bg-card);border:1px solid var(--border);border-radius:6px;padding:5px 10px;font-size:11px;white-space:nowrap;z-index:10;pointer-events:none"></div>
        </div>
        <div class="chart-row-value">${totalRev > 0 ? formatCurrency(totalRev) : c.revenueMix.asOfDate}</div></div>`;
    });
    if (withoutMix.length) {
      html += '<div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border)">';
      withoutMix.forEach(c => {
        html += `<div class="chart-row" data-id="${c.id}">
          <div class="chart-row-name" style="color:${c.color}">${c.nameCN || c.name}</div>
          <div style="flex:1;color:var(--text-muted);font-size:11px;padding:0 12px">未披露收入结构</div>
          <div class="chart-row-value" style="color:var(--text-muted)">${c.revenue.latestARR ? formatCurrency(c.revenue.latestARR) : 'N/A'}</div></div>`;
      });
      html += '</div>';
    }
    html += '</div>';
    container.innerHTML = html;
    // Hover on entire row to show all segments
    container.querySelectorAll('.mix-hover-row').forEach(row => {
      const tip = row.querySelector('.mix-tooltip');
      if (!tip) return;
      const parts = decodeURIComponent(tip.dataset.tip).split('|');
      row.addEventListener('mouseenter', () => {
        tip.innerHTML = parts.join('<span style="margin:0 6px;color:var(--text-muted)">·</span>');
        tip.style.display = 'block';
      });
      row.addEventListener('mouseleave', () => { tip.style.display = 'none'; });
    });
    container.querySelectorAll('.chart-row[data-id]').forEach(el => el.addEventListener('click', () => {
      const co = TOKEN_DATA.companies.find(c => c.id === el.dataset.id); if (co) Detail.show(co);
    }));
  }

  function renderPricingChartView(container, companies) {
    const allModels = [];
    companies.forEach(c => c.pricing.forEach(p => allModels.push({ ...p, company: c })));
    allModels.sort((a, b) => b.output - a.output);
    const maxPrice = Math.max(...allModels.map(m => m.output));
    let html = '<div style="display:flex;gap:10px;margin-bottom:10px;font-size:11px;color:var(--text-muted)">';
    html += '<span><span style="display:inline-block;width:8px;height:8px;background:var(--blue);border-radius:1px;opacity:0.7"></span> 输入</span>';
    html += '<span><span style="display:inline-block;width:8px;height:8px;background:var(--orange);border-radius:1px;opacity:0.8"></span> 输出</span>';
    html += '</div><div class="chart-grid">';
    allModels.forEach(m => {
      const inW = (m.input / maxPrice * 100).toFixed(1);
      const outW = (m.output / maxPrice * 100).toFixed(1);
      html += `<div class="chart-row" data-id="${m.company.id}">
        <div class="chart-row-name" style="font-size:11px">
          <span style="color:${m.company.color}">${m.company.nameCN || m.company.name}</span><br>
          <span style="color:var(--text-muted);font-size:10px">${m.model}</span>
        </div>
        <div class="chart-row-bar" style="gap:2px;background:var(--bg-tertiary);border-radius:4px">
          <div style="width:${inW}%;background:var(--blue);height:100%;opacity:0.7;border-radius:3px 0 0 3px"></div>
          <div style="width:${outW}%;background:var(--orange);height:100%;opacity:0.8;border-radius:0 3px 3px 0"></div>
        </div>
        <div class="chart-row-value">$${m.input}/$${m.output}</div>
      </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  }

  function renderGrowthChartView(container, companies) {
    const items = calcGrowth(companies);
    let html = '<div class="chart-grid">';
    items.forEach(item => {
      const hist = item.company.revenue.history.filter(h => h.type === 'arr');
      if (hist.length < 2) return;
      const growthPct = (item.growth * 100).toFixed(0);
      const color = item.growth > 2 ? '#00b894' : item.growth > 1 ? '#00cec9' : '#fdcb6e';
      html += `<div class="chart-row" data-id="${item.company.id}" style="flex-direction:column;align-items:stretch;padding:10px 14px">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
          <span style="color:${item.company.color};font-weight:500">${item.company.nameCN || item.company.name}</span>
          <span style="font-size:12px"><span style="color:${color};font-weight:600">${growthPct > 0 ? '+' : ''}${growthPct}%</span> · ${formatCurrency(item.latestARR)} ARR</span>
        </div>
        <canvas class="sparkline" data-company="${item.company.id}" width="600" height="50" style="width:100%;height:50px"></canvas>
      </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
    container.querySelectorAll('.chart-row[data-id]').forEach(el => el.addEventListener('click', () => {
      const co = TOKEN_DATA.companies.find(c => c.id === el.dataset.id); if (co) Detail.show(co);
    }));
    setTimeout(() => drawSparklines(items), 50);
  }

  function drawSparklines(items) {
    items.forEach(item => {
      const el = document.querySelector(`.sparkline[data-company="${item.company.id}"]`);
      if (!el) return;
      const ctx = el.getContext('2d');
      const hist = item.company.revenue.history.filter(h => h.type === 'arr');
      if (hist.length < 2) return;
      const dpr = window.devicePixelRatio || 1;
      const w = el.clientWidth, h = el.clientHeight || 50;
      el.width = w * dpr; el.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const maxV = Math.max(...hist.map(d => d.value));
      const pad = 4;
      const plotH = h - 14;

      // Precompute points
      const pts = hist.map((d, i) => ({
        x: pad + (i / (hist.length - 1)) * (w - pad * 2),
        y: plotH - (d.value / maxV) * (plotH - pad),
        date: d.date, value: d.value
      }));

      function drawBase(highlightIdx) {
        ctx.clearRect(0, 0, w, h);
        // Time axis labels
        ctx.fillStyle = '#5a5a78'; ctx.font = '9px -apple-system, sans-serif';
        hist.forEach((d, i) => {
          const x = pts[i].x;
          const show = i === 0 || i === hist.length - 1 || hist.length <= 6 || (hist.length <= 12 && i % 2 === 0) || (hist.length > 12 && i % 3 === 0);
          if (show) {
            ctx.textAlign = i === 0 ? 'left' : (i === hist.length - 1 ? 'right' : 'center');
            ctx.fillText(d.date, x, h - 1);
            ctx.beginPath(); ctx.moveTo(x, plotH); ctx.lineTo(x, plotH + 3);
            ctx.strokeStyle = '#2a2a3e'; ctx.lineWidth = 1; ctx.stroke();
          }
        });
        // Line + fill
        ctx.textAlign = 'left';
        ctx.beginPath();
        pts.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
        ctx.strokeStyle = item.company.color; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.lineTo(pts[pts.length - 1].x, plotH); ctx.lineTo(pts[0].x, plotH); ctx.closePath();
        ctx.fillStyle = item.company.color + '18'; ctx.fill();
        // Data point dots
        pts.forEach((p, i) => {
          ctx.beginPath(); ctx.arc(p.x, p.y, i === highlightIdx ? 4 : 2, 0, Math.PI * 2);
          ctx.fillStyle = i === highlightIdx ? '#fff' : item.company.color;
          ctx.fill();
        });
        // Highlight tooltip
        if (highlightIdx >= 0 && highlightIdx < pts.length) {
          const p = pts[highlightIdx];
          const label = `${p.date}  ${formatCurrency(p.value)}`;
          ctx.font = '600 10px -apple-system, sans-serif';
          const tw = ctx.measureText(label).width;
          const tx = Math.min(Math.max(p.x - tw / 2, 2), w - tw - 2);
          const ty = Math.max(p.y - 10, 12);
          ctx.fillStyle = 'rgba(22,22,31,0.9)';
          ctx.fillRect(tx - 4, ty - 10, tw + 8, 14);
          ctx.fillStyle = '#e8e8f0';
          ctx.textAlign = 'left';
          ctx.fillText(label, tx, ty);
        }
      }

      drawBase(-1);

      // Hover interaction
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        let closest = 0, minDist = Infinity;
        pts.forEach((p, i) => { const d = Math.abs(p.x - mx); if (d < minDist) { minDist = d; closest = i; } });
        drawBase(closest);
      });
      el.addEventListener('mouseleave', () => drawBase(-1));
    });
  }

  // ==== Revenue Flow chart view + stats (#10) ====
  function renderRevenueFlowChartView(container, companies) {
    container.innerHTML = '<svg id="flow-sankey-svg" style="width:100%;height:480px"></svg>';
    setTimeout(() => {
      const svg = document.getElementById('flow-sankey-svg');
      if (svg) Sankey.render(svg, companies);
    }, 50);
  }

  function renderRevenueFlowStats(container, companies) {
    const totals = { consumer: 0, api: 0, enterprise: 0 };
    companies.forEach(c => c.revenueMix.segments.forEach(s => {
      if (s.value && totals[s.id] !== undefined) totals[s.id] += s.value;
    }));
    const grandTotal = Object.values(totals).reduce((s, v) => s + v, 0);

    let html = '<div class="stats-section"><h3>Token 总收入</h3>';
    html += `<div style="font-size:28px;font-weight:700;color:var(--accent-light);margin:8px 0">${formatCurrency(grandTotal)}</div>`;
    html += '<div style="font-size:11px;color:var(--text-muted)">基于已知收入拆分的公司汇总</div></div>';

    // Channel breakdown
    html += '<div class="stats-section"><h3>收入渠道占比</h3>';
    const channels = [
      { id: 'consumer', label: '2C 消费者', color: segColors.consumer },
      { id: 'api', label: 'API/开发者', color: segColors.api },
      { id: 'enterprise', label: '企业/平台', color: segColors.enterprise }
    ];
    html += '<div style="display:flex;height:24px;border-radius:6px;overflow:hidden;margin:8px 0">';
    channels.forEach(ch => {
      const pct = grandTotal > 0 ? (totals[ch.id] / grandTotal * 100).toFixed(1) : 0;
      html += `<div style="width:${pct}%;background:${ch.color};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:rgba(0,0,0,0.8)">${pct >= 8 ? pct + '%' : ''}</div>`;
    });
    html += '</div>';
    channels.forEach(ch => {
      const pct = grandTotal > 0 ? (totals[ch.id] / grandTotal * 100).toFixed(1) : 0;
      html += `<div style="display:flex;justify-content:space-between;font-size:12px;padding:3px 0">
        <span><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${ch.color};margin-right:4px"></span>${ch.label}</span>
        <span>${formatCurrency(totals[ch.id])} (${pct}%)</span>
      </div>`;
    });
    html += '</div>';

    // End use breakdown (estimated from Sankey logic)
    const endUses = [
      { label: '聊天助手', color: '#74b9ff', pcts: { consumer: 60, api: 20, enterprise: 0 } },
      { label: '代码生成', color: '#a29bfe', pcts: { consumer: 0, api: 35, enterprise: 15 } },
      { label: '企业应用', color: '#55efc4', pcts: { consumer: 0, api: 25, enterprise: 50 } },
      { label: '搜索/RAG', color: '#ffeaa7', pcts: { consumer: 15, api: 0, enterprise: 25 } },
      { label: '内容创作', color: '#fab1a0', pcts: { consumer: 25, api: 20, enterprise: 10 } }
    ];
    const endValues = endUses.map(eu => {
      let val = 0;
      val += totals.consumer * eu.pcts.consumer / 100;
      val += totals.api * eu.pcts.api / 100;
      val += totals.enterprise * eu.pcts.enterprise / 100;
      return { ...eu, value: val };
    }).sort((a, b) => b.value - a.value);
    const maxEnd = endValues.length ? endValues[0].value : 1;

    html += '<div class="stats-section"><h3>终端用途分布</h3>';
    html += '<div style="font-size:10px;color:var(--text-muted);margin-bottom:8px">基于渠道→用途估算模型</div>';
    endValues.forEach(eu => {
      const pct = (eu.value / maxEnd * 100).toFixed(1);
      const share = grandTotal > 0 ? (eu.value / grandTotal * 100).toFixed(1) : 0;
      html += `<div style="display:flex;align-items:center;gap:6px;padding:4px 0">
        <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${eu.color};flex-shrink:0"></span>
        <span style="font-size:12px;width:60px;flex-shrink:0">${eu.label}</span>
        <div class="rank-bar-container"><div class="rank-bar" style="width:${pct}%;background:${eu.color}"></div></div>
        <span style="font-size:11px;color:var(--text-secondary);width:50px;text-align:right;flex-shrink:0">${share}%</span>
      </div>`;
    });
    html += '</div>';

    html += renderInsights('revenueFlow', companies);
    container.innerHTML = html;
  }

  // ==== Growth calculation ====
  function calcGrowth(companies) {
    return companies.map(c => {
      const hist = c.revenue.history.filter(h => h.type === 'arr' || h.type === 'quarterly-ann');
      if (hist.length < 2) return null;
      const latest = hist[hist.length - 1];
      const sixMonthsAgo = new Date(latest.date + '-01');
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      const target = sixMonthsAgo.toISOString().substring(0, 7);
      let prev = hist[0];
      for (const h of hist) { if (h.date <= target) prev = h; }
      if (!prev || prev.value <= 0) return null;
      const months = monthDiff(prev.date, latest.date);
      if (months <= 0) return null;
      return { company: c, growth: Math.pow(latest.value / prev.value, 12 / months) - 1, latestARR: latest.value, period: `${prev.date} → ${latest.date}` };
    }).filter(Boolean).sort((a, b) => b.growth - a.growth);
  }

  // ==== Insights ====
  function renderInsights(layer, data) {
    let text = '';
    switch (layer) {
      case 'revenue':
        text = `<strong>Anthropic</strong> 在2026年4月以$30B ARR超越OpenAI ($25B)，主要驱动力来自API收入爆发，尤其是Cursor、Claude Code等代码工具的贡献。`;
        break;
      case 'revenueMix':
        text = `<strong>核心差异：</strong>Anthropic API主导（68%），OpenAI消费者主导（46%），Microsoft企业主导（60%）。这反映了根本不同的商业路径。`;
        break;
      case 'pricing':
        text = `<strong>定价跨度超100倍</strong>——从DeepSeek V3的$0.27/1M到Claude Opus 4.6的$15/1M。中国厂商（DeepSeek、豆包、Qwen）集中在低端；推理模型（o4、Opus）在高端。`;
        break;
      case 'tokenEcon':
        text = `Token产出量反映<strong>"走量 vs 高毛利"</strong>的策略差异。字节豆包以120万亿日token产出遥遥领先（官方数据），低价策略换取规模。`;
        break;
      case 'growth':
        if (data.length >= 1 && data[0].company) {
          text = `<strong>${data[0].company.nameCN || data[0].company.name}</strong>年化增长率最高。AI收入市场处于超高速增长阶段，头部公司在数月内实现ARR翻倍甚至翻数倍。`;
        }
        break;
      case 'revenueFlow':
        text = `全球AI Token收入已超<strong>$1000亿</strong>。企业/平台渠道占比最大（60%+），反映AI商业化主要由B2B驱动。API/开发者渠道增长最快，代码生成成为关键用途。`;
        break;
    }
    return `<div class="stats-section"><div class="insights-box"><p>${text}</p></div></div>`;
  }

  // ==== Helpers ====
  function rankItem(c, pos, pct, value, conf, opacity) {
    return `<div class="rank-item" data-id="${c.id}" ${opacity ? `style="opacity:${opacity}"` : ''}>
      <span class="rank-position">${pos}</span>
      <span class="rank-name">${c.nameCN || c.name}</span>
      <div class="rank-bar-container"><div class="rank-bar" style="width:${pct}%;background:${c.color}"></div></div>
      <span class="rank-value">${value}</span>
      <span class="rank-conf conf-dot conf-${conf}" title="${conf}"></span>
    </div>`;
  }

  function bindClicks(container) {
    container.querySelectorAll('.rank-item[data-id],.mix-chart-item[data-id]').forEach(el => {
      el.addEventListener('click', () => {
        const co = TOKEN_DATA.companies.find(c => c.id === el.dataset.id);
        if (co) Detail.show(co);
      });
    });
  }

  function formatCurrency(v) {
    if (v == null) return 'N/A';
    if (v >= 1e12) return '$' + (v / 1e12).toFixed(1) + 'T';
    if (v >= 1e9) return '$' + (v / 1e9).toFixed(1) + 'B';
    if (v >= 1e6) return '$' + (v / 1e6).toFixed(0) + 'M';
    if (v >= 1e3) return '$' + (v / 1e3).toFixed(0) + 'K';
    return '$' + v.toFixed(0);
  }

  function formatTokens(m) {
    if (m >= 1e6) return (m / 1e6).toFixed(1) + 'T';
    if (m >= 1e3) return (m / 1e3).toFixed(1) + 'B';
    return m.toFixed(0) + 'M';
  }

  function monthDiff(d1, d2) {
    const [y1, m1] = d1.split('-').map(Number);
    const [y2, m2] = d2.split('-').map(Number);
    return (y2 - y1) * 12 + (m2 - m1);
  }

  return { renderStats, renderChartView, formatCurrency, formatTokens };
})();
