// Token Factory Tracker - Treemap Module
// Squarified treemap algorithm (Bruls, Huizing & van Wijk)

const Treemap = (function() {
  let rects = [];
  let canvas, ctx;
  let hoveredIdx = -1;
  const PAD = 2;

  function init(canvasEl) {
    canvas = canvasEl;
    ctx = canvas.getContext('2d');
  }

  // Squarify algorithm
  function squarify(items, x, y, w, h) {
    if (items.length === 0) return [];
    if (items.length === 1) {
      return [{ x, y, w, h, data: items[0] }];
    }
    const results = [];
    _squarifyStep(items.slice().sort((a, b) => b._value - a._value), x, y, w, h, results);
    return results;
  }

  function _squarifyStep(items, x, y, w, h, results) {
    if (items.length === 0) return;
    if (items.length === 1) {
      results.push({ x, y, w, h, data: items[0] });
      return;
    }
    const total = items.reduce((s, d) => s + d._value, 0);
    if (total <= 0) return;

    const isWide = w >= h;
    let row = [items[0]];
    let rowSum = items[0]._value;

    for (let i = 1; i < items.length; i++) {
      const newSum = rowSum + items[i]._value;
      if (_worstRatio(row, rowSum, isWide ? h : w, total) >=
          _worstRatio([...row, items[i]], newSum, isWide ? h : w, total)) {
        row.push(items[i]);
        rowSum = newSum;
      } else {
        break;
      }
    }

    // Layout the row
    const rowFrac = rowSum / total;
    const rowSize = isWide ? w * rowFrac : h * rowFrac;
    let offset = 0;

    for (const item of row) {
      const frac = item._value / rowSum;
      const segSize = (isWide ? h : w) * frac;
      if (isWide) {
        results.push({ x: x + offset * 0, y: y + offset, w: rowSize, h: segSize, data: item });
        // Actually layout along the shorter side
      } else {
        results.push({ x: x + offset, y, w: segSize, h: rowSize, data: item });
      }
      offset += segSize;
    }

    // Fix: layout properly
    results.length -= row.length;
    offset = 0;
    for (const item of row) {
      const frac = item._value / rowSum;
      if (isWide) {
        const segH = h * frac;
        results.push({ x, y: y + offset, w: rowSize, h: segH, data: item });
        offset += segH;
      } else {
        const segW = w * frac;
        results.push({ x: x + offset, y, w: segW, h: rowSize, data: item });
        offset += segW;
      }
    }

    // Recurse on remaining
    const remaining = items.slice(row.length);
    if (remaining.length > 0) {
      if (isWide) {
        _squarifyStep(remaining, x + rowSize, y, w - rowSize, h, results);
      } else {
        _squarifyStep(remaining, x, y + rowSize, w, h - rowSize, results);
      }
    }
  }

  function _worstRatio(row, rowSum, sideLen, total) {
    const rowArea = (rowSum / total) * sideLen * sideLen;
    if (rowArea <= 0) return Infinity;
    let worst = 0;
    for (const item of row) {
      const frac = item._value / rowSum;
      const itemArea = rowArea * (rowSum / total);
      const itemH = sideLen * frac;
      const itemW = rowArea / sideLen;
      const r = Math.max(itemH / itemW, itemW / itemH);
      worst = Math.max(worst, r);
    }
    return worst;
  }

  function layout(companies, valueFn, width, height) {
    // Set canvas size with DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Prepare data
    const items = companies
      .map(c => ({ ...c, _value: valueFn(c) || 0 }))
      .filter(c => c._value > 0)
      .sort((a, b) => b._value - a._value);

    if (items.length === 0) {
      rects = [];
      return;
    }

    rects = squarify(items, PAD, PAD, width - PAD * 2, height - PAD * 2);
  }

  function draw(colorFn, labelFn) {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, w, h);

    rects.forEach((r, i) => {
      const isHovered = i === hoveredIdx;
      const color = colorFn(r.data);
      const confColor = getConfColor(r.data.revenue?.confidence);

      // Fill
      ctx.fillStyle = color;
      ctx.fillRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);

      // Hover overlay
      if (isHovered) {
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fillRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
      }

      // Border
      ctx.strokeStyle = isHovered ? '#ffffff' : '#0a0a0f';
      ctx.lineWidth = isHovered ? 2 : 1.5;
      ctx.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);

      // Confidence indicator (left border)
      if (confColor) {
        ctx.fillStyle = confColor;
        ctx.fillRect(r.x + 1, r.y + 1, 3, r.h - 2);
      }

      // Labels — centered in block (stock heatmap style)
      if (r.w > 50 && r.h > 30) {
        const labels = labelFn(r.data);
        ctx.save();
        ctx.beginPath();
        ctx.rect(r.x + 4, r.y + 4, r.w - 8, r.h - 8);
        ctx.clip();
        ctx.textAlign = 'center';

        const cx = r.x + r.w / 2;
        const fontSize = Math.min(16, Math.max(10, Math.min(r.w / 7, r.h / 4)));
        const subSize = Math.max(9, fontSize - 2);
        const detailSize = Math.max(9, fontSize - 3);

        // Calculate total text block height for vertical centering
        let lines = 1;
        if (r.h > 48 && labels.sub) lines++;
        if (r.h > 65 && labels.detail) lines++;
        const lineH = fontSize + 4;
        const blockH = fontSize + (lines > 1 ? (subSize + 4) : 0) + (lines > 2 ? (detailSize + 4) : 0);
        let ty = r.y + (r.h - blockH) / 2 + fontSize;

        // Company name
        ctx.font = `600 ${fontSize}px -apple-system, sans-serif`;
        ctx.fillStyle = isContrastDark(color) ? '#ffffff' : '#0a0a0f';
        ctx.fillText(labels.name, cx, ty);

        // Sub label
        if (r.h > 48 && labels.sub) {
          ty += subSize + 4;
          ctx.font = `400 ${subSize}px -apple-system, sans-serif`;
          ctx.fillStyle = isContrastDark(color) ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.6)';
          ctx.fillText(labels.sub, cx, ty);
        }

        // Third line
        if (r.h > 65 && labels.detail) {
          ty += detailSize + 4;
          ctx.font = `400 ${detailSize}px -apple-system, sans-serif`;
          ctx.fillStyle = isContrastDark(color) ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)';
          ctx.fillText(labels.detail, cx, ty);
        }

        ctx.restore();
      } else if (r.w > 30 && r.h > 16) {
        // Compact label — centered
        ctx.save();
        ctx.textAlign = 'center';
        ctx.font = '500 9px -apple-system, sans-serif';
        ctx.fillStyle = isContrastDark(color) ? '#ffffff' : '#0a0a0f';
        const shortName = labelFn(r.data).name;
        if (shortName.length <= r.w / 6) {
          ctx.fillText(shortName, r.x + r.w / 2, r.y + r.h / 2 + 3);
        }
        ctx.restore();
      }
    });
  }

  function hitTest(x, y) {
    for (let i = 0; i < rects.length; i++) {
      const r = rects[i];
      if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
        return { index: i, rect: r, company: r.data };
      }
    }
    return null;
  }

  function setHovered(idx) {
    hoveredIdx = idx;
  }

  function getRects() { return rects; }

  // Helpers
  function getConfColor(conf) {
    const map = {
      'official': '#00b894',
      'confident': '#00b894',
      'reported': '#fdcb6e',
      'likely': '#fdcb6e',
      'estimated': '#e17055'
    };
    return map[conf] || '#e17055';
  }

  function isContrastDark(hex) {
    if (!hex || hex[0] !== '#') return true;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
  }

  return { init, layout, draw, hitTest, setHovered, getRects };
})();
