// Token Factory Tracker - Tooltip Module

const Tooltip = (function() {
  let tipEl;

  function init() {
    tipEl = document.getElementById('tooltip');
  }

  function show(company, x, y) {
    if (!tipEl) return;
    tipEl.classList.remove('hidden');

    const countryFlags = { US: '🇺🇸', CN: '🇨🇳', FR: '🇫🇷' };
    const flag = countryFlags[company.country] || '';
    const conf = company.revenue.confidence;

    let html = `
      <div class="tip-header">
        <span class="tip-color" style="background:${company.color}"></span>
        <span class="tip-name">${company.name}</span>
        <span class="tip-country">${flag} ${company.country}</span>
        <span class="conf-dot conf-${conf}" title="${conf}" style="margin-left:auto"></span>
      </div>`;

    // Revenue
    if (company.revenue.latestARR) {
      html += tipRow('年化收入', Charts.formatCurrency(company.revenue.latestARR),
        `截至 ${company.revenue.asOfDate}`);
    }

    // Full year revenue
    if (company.revenue.fullYear2025) {
      html += tipRow('FY2025 收入', Charts.formatCurrency(company.revenue.fullYear2025));
    }

    // Revenue mix top segment
    const topSeg = company.revenueMix.segments
      .filter(s => s.pct !== null)
      .sort((a, b) => (b.pct || 0) - (a.pct || 0))[0];
    if (topSeg && topSeg.pct) {
      html += tipRow('主要渠道', `${topSeg.label} (${topSeg.pct}%)`);
    }

    // Flagship pricing
    const flagship = company.pricing.find(p => p.tier === 'flagship');
    if (flagship) {
      html += tipRow('旗舰模型价格', `$${flagship.input}/$${flagship.output}/1M`,
        flagship.model);
    }

    // Users
    if (company.users.mau) {
      html += tipRow('月活用户', formatLargeNumber(company.users.mau));
    } else if (company.users.wau) {
      html += tipRow('周活用户', formatLargeNumber(company.users.wau));
    }

    // Token consumption estimate
    const tokenEst = TOKEN_DATA.computeTokenConsumption(company);
    if (tokenEst) {
      html += tipRow('日 Token 产出', Charts.formatTokens(tokenEst.dailyTokens),
        tokenEst.isOfficial ? '官方' : '估算');
    }

    // Growth
    const hist = company.revenue.history.filter(h => h.type === 'arr');
    if (hist.length >= 2) {
      const latest = hist[hist.length - 1];
      const prev = hist[Math.max(0, hist.length - 3)];
      const months = monthDiff(prev.date, latest.date);
      if (months > 0 && prev.value > 0) {
        const growth = ((latest.value / prev.value - 1) * 100).toFixed(0);
        const cls = growth > 0 ? 'positive' : 'negative';
        html += `<div class="tip-row">
          <span class="tip-label">增长 (${months}个月)</span>
          <span class="tip-value ${cls}">${growth > 0 ? '+' : ''}${growth}%</span>
        </div>`;
      }
    }

    tipEl.innerHTML = html;
    positionTooltip(x, y);
  }

  function hide() {
    if (tipEl) tipEl.classList.add('hidden');
  }

  function positionTooltip(x, y) {
    const rect = tipEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = x + 16;
    let top = y - 10;

    if (left + rect.width > vw - 10) left = x - rect.width - 16;
    if (top + rect.height > vh - 10) top = vh - rect.height - 10;
    if (top < 10) top = 10;

    tipEl.style.left = left + 'px';
    tipEl.style.top = top + 'px';
  }

  function tipRow(label, value, sub) {
    return `<div class="tip-row">
      <span class="tip-label">${label}</span>
      <span class="tip-value">${value}${sub ? ' <span style="font-size:10px;color:var(--text-muted)">' + sub + '</span>' : ''}</span>
    </div>`;
  }

  function formatLargeNumber(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(0) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
    return n.toString();
  }

  function monthDiff(d1, d2) {
    const [y1, m1] = d1.split('-').map(Number);
    const [y2, m2] = d2.split('-').map(Number);
    return (y2 - y1) * 12 + (m2 - m1);
  }

  return { init, show, hide };
})();
