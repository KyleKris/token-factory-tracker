// Token Factory Tracker - Main App Controller

(function() {
  'use strict';

  const STATE = {
    activeLayer: 'revenue',
    hoveredCompany: null,
    canvasW: 0,
    canvasH: 0
  };

  // Layers that use treemap as primary visualization
  const TREEMAP_LAYERS = { revenue: true, tokenEcon: true };
  // Layers that use chart view instead of treemap
  const CHART_VIEW_LAYERS = { revenueMix: true, pricing: true, growth: true, revenueFlow: true };

  function getLayerColor(company) {
    return company.color;
  }

  // ---- Value functions for treemap sizing ----
  function getValueFn(layer) {
    switch (layer) {
      case 'revenue': return c => c.revenue.latestARR || 0;
      case 'tokenEcon': return c => {
        const est = TOKEN_DATA.computeTokenConsumption(c);
        return est ? est.dailyTokens : 0;
      };
      default: return c => c.revenue.latestARR || 0;
    }
  }

  // ---- Label functions ----
  function getLabelFn(layer) {
    switch (layer) {
      case 'revenue':
        return c => ({
          name: c.name,
          sub: c.revenue.latestARR ? Charts.formatCurrency(c.revenue.latestARR) + ' ARR' : '无数据',
          detail: c.revenue.asOfDate
        });
      case 'tokenEcon':
        return c => {
          const est = TOKEN_DATA.computeTokenConsumption(c);
          return {
            name: c.name,
            sub: est ? Charts.formatTokens(est.dailyTokens) + ' tokens/天' : '无数据',
            detail: est && est.isOfficial ? '官方数据' : (est ? '估算' : '')
          };
        };
      default:
        return c => ({ name: c.name, sub: '', detail: '' });
    }
  }

  // ---- Init ----
  function init() {
    document.getElementById('update-badge').textContent = '更新: ' + TOKEN_DATA.meta.lastUpdated;
    const canvas = document.getElementById('treemap-canvas');
    Treemap.init(canvas);
    Tooltip.init();
    Detail.init();
    renderCompanyTags();
    bindControls();
    resizeAndRender();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeAndRender, 150);
    });
    bindCanvasEvents(canvas);
  }

  function renderCompanyTags() {
    const container = document.getElementById('company-tags');
    const countryFlags = { US: '🇺🇸', CN: '🇨🇳', FR: '🇫🇷' };
    let html = '';
    TOKEN_DATA.companies.forEach(c => {
      html += `<div class="company-tag" data-id="${c.id}">
        <span class="tag-dot" style="background:${c.color}"></span>
        <span class="tag-flag">${countryFlags[c.country] || ''}</span>
        ${c.nameCN || c.name}
      </div>`;
    });
    container.innerHTML = html;

    container.querySelectorAll('.company-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const company = TOKEN_DATA.companies.find(c => c.id === tag.dataset.id);
        if (company) Detail.show(company);
      });
      tag.addEventListener('mouseenter', () => { STATE.hoveredCompany = tag.dataset.id; renderViz(); });
      tag.addEventListener('mouseleave', () => { STATE.hoveredCompany = null; renderViz(); });
    });
  }

  function bindControls() {
    document.getElementById('controls').addEventListener('click', (e) => {
      const layerBtn = e.target.closest('.layer-btn');
      if (layerBtn) {
        document.querySelectorAll('.layer-btn').forEach(b => b.classList.remove('active'));
        layerBtn.classList.add('active');
        STATE.activeLayer = layerBtn.dataset.layer;
        renderViz();
      }
    });
  }

  function bindCanvasEvents(canvas) {
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const hit = Treemap.hitTest(e.clientX - rect.left, e.clientY - rect.top);
      if (hit) {
        Treemap.setHovered(hit.index);
        Tooltip.show(hit.company, e.clientX, e.clientY);
        canvas.style.cursor = 'pointer';
      } else {
        Treemap.setHovered(-1);
        Tooltip.hide();
        canvas.style.cursor = 'default';
      }
      Treemap.draw(getLayerColor, getLabelFn(STATE.activeLayer));
    });
    canvas.addEventListener('mouseleave', () => {
      Treemap.setHovered(-1); Tooltip.hide();
      Treemap.draw(getLayerColor, getLabelFn(STATE.activeLayer));
    });
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const hit = Treemap.hitTest(e.clientX - rect.left, e.clientY - rect.top);
      if (hit) Detail.show(hit.company);
    });
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const hit = Treemap.hitTest(touch.clientX - rect.left, touch.clientY - rect.top);
      if (hit) Detail.show(hit.company);
    }, { passive: false });
  }

  function resizeAndRender() {
    const vizArea = document.getElementById('viz-area');
    STATE.canvasW = vizArea.clientWidth - 24;
    STATE.canvasH = Math.max(300, Math.min(STATE.canvasW * 0.45, 480));
    renderViz();
  }

  function renderViz() {
    const canvas = document.getElementById('treemap-canvas');
    const chartView = document.getElementById('chart-view');
    const statsContent = document.getElementById('stats-content');
    const companies = TOKEN_DATA.companies;
    const layer = STATE.activeLayer;
    const isTreemap = TREEMAP_LAYERS[layer];
    const isChartView = CHART_VIEW_LAYERS[layer];

    if (isTreemap) {
      canvas.style.display = 'block';
      chartView.classList.add('hidden');
      Treemap.layout(companies, getValueFn(layer), STATE.canvasW, STATE.canvasH);
      Treemap.draw(getLayerColor, getLabelFn(layer));
    } else {
      canvas.style.display = 'none';
      chartView.classList.remove('hidden');
      Charts.renderChartView(chartView, layer, companies);
    }

    // Stats panel
    Charts.renderStats(statsContent, layer, companies);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
