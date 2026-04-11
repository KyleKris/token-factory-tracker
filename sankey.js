// Token Factory Tracker - Sankey Diagram Module
// Shows token revenue flow: Companies → Channels → End Uses

const Sankey = (function() {
  const PAD = { top: 20, right: 80, bottom: 20, left: 16 };
  const NODE_W = 14;
  const NODE_GAP = 8;

  function renderForCompany(svgEl, company) {
    const svg = svgEl;
    const bbox = svg.getBoundingClientRect();
    const W = bbox.width || 500;
    const H = bbox.height || 200;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = '';

    const hasMix = company.revenueMix.segments.some(s => s.value && s.value > 0);
    if (!hasMix) {
      const text = createSVG('text', {
        x: W / 2, y: H / 2, fill: '#5a5a78', 'font-size': '12px',
        'text-anchor': 'middle', 'font-family': '-apple-system, sans-serif'
      });
      text.textContent = '暂无收入拆分数据';
      svg.appendChild(text);
      return;
    }

    const channelNodes = [
      { id: 'ch-consumer', label: '2C 消费者', color: '#4FC3F7', value: 0 },
      { id: 'ch-api', label: 'API/开发者', color: '#FFB74D', value: 0 },
      { id: 'ch-enterprise', label: '企业服务', color: '#81C784', value: 0 }
    ];
    const endNodes = [
      { id: 'end-chatbot', label: '聊天助手', color: '#74b9ff', value: 0 },
      { id: 'end-coding', label: '代码生成', color: '#a29bfe', value: 0 },
      { id: 'end-enterprise-app', label: '企业应用', color: '#55efc4', value: 0 },
      { id: 'end-search', label: '搜索/RAG', color: '#ffeaa7', value: 0 },
      { id: 'end-content', label: '内容创作', color: '#fab1a0', value: 0 }
    ];

    const flows1 = [];
    const flows2 = [];

    company.revenueMix.segments.forEach(seg => {
      if (!seg.value || seg.value <= 0) return;
      const chId = 'ch-' + seg.id;
      const ch = channelNodes.find(n => n.id === chId);
      if (ch) {
        ch.value += seg.value;
        flows1.push({ from: 'source', to: chId, value: seg.value, color: company.color });
      }
    });

    const channelToEnd = {
      'ch-consumer': [
        { to: 'end-chatbot', pct: 60 }, { to: 'end-content', pct: 25 }, { to: 'end-search', pct: 15 }
      ],
      'ch-api': [
        { to: 'end-coding', pct: 35 }, { to: 'end-enterprise-app', pct: 25 },
        { to: 'end-chatbot', pct: 20 }, { to: 'end-content', pct: 20 }
      ],
      'ch-enterprise': [
        { to: 'end-enterprise-app', pct: 50 }, { to: 'end-search', pct: 25 },
        { to: 'end-coding', pct: 15 }, { to: 'end-content', pct: 10 }
      ]
    };

    channelNodes.forEach(ch => {
      if (ch.value <= 0) return;
      (channelToEnd[ch.id] || []).forEach(d => {
        const val = ch.value * d.pct / 100;
        const end = endNodes.find(n => n.id === d.to);
        if (end) { end.value += val; flows2.push({ from: ch.id, to: d.to, value: val, color: ch.color }); }
      });
    });

    const activeChannels = channelNodes.filter(n => n.value > 0);
    const activeEnds = endNodes.filter(n => n.value > 0);
    if (activeChannels.length === 0) return;

    const totalRev = activeChannels.reduce((s, n) => s + n.value, 0);
    const sourceNode = [{ id: 'source', label: company.name, color: company.color, value: totalRev }];

    const col1X = PAD.left;
    const col2X = W / 2 - NODE_W / 2;
    const col3X = W - PAD.right - NODE_W;
    const usableH = H - PAD.top - PAD.bottom;

    layoutColumn(sourceNode, col1X, PAD.top, usableH);
    layoutColumn(activeChannels, col2X, PAD.top, usableH);
    layoutColumn(activeEnds, col3X, PAD.top, usableH);

    drawFlows(svg, flows1, sourceNode, activeChannels, col1X + NODE_W, col2X, 0.25);
    drawFlows(svg, flows2, activeChannels, activeEnds, col2X + NODE_W, col3X, 0.18);

    drawNodesWithLabels(svg, sourceNode, 'left', W);
    drawNodesWithLabels(svg, activeChannels, 'center', W);
    drawNodesWithLabels(svg, activeEnds, 'right', W);
  }

  function render(svgEl, companies) {
    const svg = svgEl;
    const bbox = svg.getBoundingClientRect();
    const W = bbox.width || 700;
    const H = bbox.height || 280;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = '';

    // Build nodes and flows from revenue mix data
    const companyNodes = [];
    const channelNodes = [
      { id: 'ch-consumer', label: '2C 消费者', color: '#4FC3F7', value: 0 },
      { id: 'ch-api', label: 'API/开发者', color: '#FFB74D', value: 0 },
      { id: 'ch-enterprise', label: '企业服务', color: '#81C784', value: 0 }
    ];
    const endNodes = [
      { id: 'end-chatbot', label: '聊天助手', color: '#74b9ff', value: 0 },
      { id: 'end-coding', label: '代码生成', color: '#a29bfe', value: 0 },
      { id: 'end-enterprise-app', label: '企业应用', color: '#55efc4', value: 0 },
      { id: 'end-search', label: '搜索/RAG', color: '#ffeaa7', value: 0 },
      { id: 'end-content', label: '内容创作', color: '#fab1a0', value: 0 }
    ];

    const flows1 = []; // company → channel
    const flows2 = []; // channel → end use

    companies.forEach(c => {
      if (!c.revenueMix.segments.some(s => s.value && s.value > 0)) return;
      const totalVal = c.revenueMix.segments.reduce((s, seg) => s + (seg.value || 0), 0);
      if (totalVal <= 0) return;

      companyNodes.push({
        id: 'co-' + c.id,
        label: c.name,
        color: c.color,
        value: totalVal
      });

      c.revenueMix.segments.forEach(seg => {
        if (!seg.value || seg.value <= 0) return;
        const chId = 'ch-' + seg.id;
        const ch = channelNodes.find(n => n.id === chId);
        if (ch) {
          ch.value += seg.value;
          flows1.push({
            from: 'co-' + c.id,
            to: chId,
            value: seg.value,
            color: c.color
          });
        }
      });
    });

    // Channel → End use (estimated distribution)
    const channelToEnd = {
      'ch-consumer': [
        { to: 'end-chatbot', pct: 60 },
        { to: 'end-content', pct: 25 },
        { to: 'end-search', pct: 15 }
      ],
      'ch-api': [
        { to: 'end-coding', pct: 35 },
        { to: 'end-enterprise-app', pct: 25 },
        { to: 'end-chatbot', pct: 20 },
        { to: 'end-content', pct: 20 }
      ],
      'ch-enterprise': [
        { to: 'end-enterprise-app', pct: 50 },
        { to: 'end-search', pct: 25 },
        { to: 'end-coding', pct: 15 },
        { to: 'end-content', pct: 10 }
      ]
    };

    channelNodes.forEach(ch => {
      if (ch.value <= 0) return;
      const dists = channelToEnd[ch.id] || [];
      dists.forEach(d => {
        const val = ch.value * d.pct / 100;
        const end = endNodes.find(n => n.id === d.to);
        if (end) {
          end.value += val;
          flows2.push({
            from: ch.id,
            to: d.to,
            value: val,
            color: ch.color
          });
        }
      });
    });

    // Filter out empty nodes
    const activeCompanies = companyNodes.filter(n => n.value > 0);
    const activeChannels = channelNodes.filter(n => n.value > 0);
    const activeEnds = endNodes.filter(n => n.value > 0);

    if (activeCompanies.length === 0) {
      renderEmptyState(svg, W, H);
      return;
    }

    // Layout columns
    const col1X = PAD.left;
    const col2X = W / 2 - NODE_W / 2;
    const col3X = W - PAD.right - NODE_W;
    const usableH = H - PAD.top - PAD.bottom;

    layoutColumn(activeCompanies, col1X, PAD.top, usableH);
    layoutColumn(activeChannels, col2X, PAD.top, usableH);
    layoutColumn(activeEnds, col3X, PAD.top, usableH);

    // Draw flows (company → channel)
    drawFlows(svg, flows1, activeCompanies, activeChannels, col1X + NODE_W, col2X, 0.2);

    // Draw flows (channel → end use)
    drawFlows(svg, flows2, activeChannels, activeEnds, col2X + NODE_W, col3X, 0.15);

    // Draw nodes
    drawNodes(svg, activeCompanies);
    drawNodes(svg, activeChannels);
    drawNodes(svg, activeEnds);
  }

  function layoutColumn(nodes, x, yStart, height) {
    const total = nodes.reduce((s, n) => s + n.value, 0);
    const gapTotal = (nodes.length - 1) * NODE_GAP;
    const barTotal = height - gapTotal;
    let y = yStart;

    nodes.forEach(n => {
      const h = Math.max(4, (n.value / total) * barTotal);
      n.x = x;
      n.y = y;
      n.w = NODE_W;
      n.h = h;
      n._offset = 0; // for tracking flow position
      n._offsetR = 0;
      y += h + NODE_GAP;
    });
  }

  function drawNodes(svg, nodes) {
    // Determine column position dynamically from the actual layout
    const allX = nodes.map(n => n.x);
    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);

    nodes.forEach(n => {
      const rect = createSVG('rect', {
        x: n.x, y: n.y, width: n.w, height: n.h,
        rx: 3, fill: n.color, opacity: 0.9
      });
      svg.appendChild(rect);

      // Position labels based on which column this node is in
      const isLeftCol = n.x <= minX && minX !== maxX;
      const isRightCol = n.x >= maxX && minX !== maxX;
      let labelX, anchor;

      if (isLeftCol) {
        labelX = n.x + n.w + 6;
        anchor = 'start';
      } else if (isRightCol) {
        labelX = n.x + n.w + 6;
        anchor = 'start';
      } else {
        labelX = n.x + n.w + 6;
        anchor = 'start';
      }

      if (n.h >= 10) {
        const text = createSVG('text', {
          x: labelX, y: n.y + n.h / 2 + 3,
          fill: '#9898b0', 'font-size': '10px',
          'text-anchor': anchor, 'font-family': '-apple-system, sans-serif'
        });
        text.textContent = n.label;
        svg.appendChild(text);

        if (n.value >= 1e6) {
          const valText = createSVG('text', {
            x: labelX, y: n.y + n.h / 2 + 14,
            fill: '#5a5a78', 'font-size': '9px',
            'text-anchor': anchor, 'font-family': '-apple-system, sans-serif'
          });
          valText.textContent = Charts.formatCurrency(n.value);
          svg.appendChild(valText);
        }
      }
    });
  }

  function drawNodesWithLabels(svg, nodes, position, totalW) {
    nodes.forEach(n => {
      const rect = createSVG('rect', {
        x: n.x, y: n.y, width: n.w, height: n.h,
        rx: 3, fill: n.color, opacity: 0.9
      });
      svg.appendChild(rect);

      let labelX, anchor;
      if (position === 'left') {
        labelX = n.x - 6;
        anchor = 'end';
      } else if (position === 'right') {
        labelX = n.x + n.w + 6;
        anchor = 'start';
      } else {
        labelX = n.x + n.w + 6;
        anchor = 'start';
      }

      if (n.h >= 8) {
        const text = createSVG('text', {
          x: labelX, y: n.y + n.h / 2 + 3,
          fill: '#9898b0', 'font-size': '10px',
          'text-anchor': anchor, 'font-family': '-apple-system, sans-serif'
        });
        text.textContent = n.label;
        svg.appendChild(text);

        if (n.value >= 1e6) {
          const valText = createSVG('text', {
            x: labelX, y: n.y + n.h / 2 + 14,
            fill: '#5a5a78', 'font-size': '9px',
            'text-anchor': anchor, 'font-family': '-apple-system, sans-serif'
          });
          valText.textContent = Charts.formatCurrency(n.value);
          svg.appendChild(valText);
        }
      }
    });
  }

  function drawFlows(svg, flows, fromNodes, toNodes, fromX, toX, opacity) {
    flows.forEach(f => {
      const fromNode = fromNodes.find(n => n.id === f.from);
      const toNode = toNodes.find(n => n.id === f.to);
      if (!fromNode || !toNode) return;

      const fromTotal = fromNodes.reduce((s, n) => s + n.value, 0);
      const toTotal = toNodes.reduce((s, n) => s + n.value, 0);

      const fh = (f.value / fromNode.value) * fromNode.h;
      const th = (f.value / toNode.value) * toNode.h;

      const fy = fromNode.y + (fromNode._offsetR || 0);
      const ty = toNode.y + (toNode._offset || 0);

      fromNode._offsetR = (fromNode._offsetR || 0) + fh;
      toNode._offset = (toNode._offset || 0) + th;

      const path = createSVG('path', {
        d: bezierPath(fromX, fy, fh, toX, ty, th),
        fill: f.color,
        opacity: opacity,
        stroke: 'none'
      });

      // Hover tooltip
      const tipGroup = createSVG('g', { style: 'pointer-events:none;display:none' });
      const tipBg = createSVG('rect', { rx: 4, fill: '#16161f', stroke: '#2a2a3e', 'stroke-width': 1 });
      const tipText = createSVG('text', { fill: '#e8e8f0', 'font-size': '11px', 'font-family': '-apple-system, sans-serif' });
      const pctOfFrom = ((f.value / fromNode.value) * 100).toFixed(1);
      tipText.textContent = `${fromNode.label} → ${toNode.label}: ${Charts.formatCurrency(f.value)} (${pctOfFrom}%)`;
      tipGroup.appendChild(tipBg);
      tipGroup.appendChild(tipText);

      path.addEventListener('mouseenter', (e) => {
        path.setAttribute('opacity', opacity + 0.2);
        const cx = (fromX + toX) / 2;
        const cy = (fy + ty) / 2 + (fh + th) / 4;
        tipText.setAttribute('x', cx);
        tipText.setAttribute('y', cy - 4);
        tipText.setAttribute('text-anchor', 'middle');
        const bbox = tipText.getBBox ? tipText.getBBox() : { x: cx - 60, y: cy - 16, width: 120, height: 16 };
        tipBg.setAttribute('x', bbox.x - 6);
        tipBg.setAttribute('y', bbox.y - 2);
        tipBg.setAttribute('width', bbox.width + 12);
        tipBg.setAttribute('height', bbox.height + 4);
        tipGroup.style.display = '';
      });
      path.addEventListener('mouseleave', () => {
        path.setAttribute('opacity', opacity);
        tipGroup.style.display = 'none';
      });

      svg.appendChild(path);
      svg.appendChild(tipGroup);
    });
  }

  function bezierPath(x1, y1, h1, x2, y2, h2) {
    const cx = (x1 + x2) / 2;
    return `M${x1},${y1}
      C${cx},${y1} ${cx},${y2} ${x2},${y2}
      L${x2},${y2 + h2}
      C${cx},${y2 + h2} ${cx},${y1 + h1} ${x1},${y1 + h1}
      Z`;
  }

  function renderEmptyState(svg, W, H) {
    const text = createSVG('text', {
      x: W / 2, y: H / 2,
      fill: '#5a5a78',
      'font-size': '13px',
      'text-anchor': 'middle',
      'font-family': '-apple-system, sans-serif'
    });
    text.textContent = '需要收入拆分数据才能生成 Sankey 图';
    svg.appendChild(text);
  }

  function createSVG(tag, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, v);
    }
    return el;
  }

  return { render, renderForCompany };
})();
