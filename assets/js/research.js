/* Progressive enhancement for the research site. Content is rendered by Jekyll. */
(() => {
  'use strict';

  document.querySelectorAll('[data-publications]').forEach(section => {
    const papers = [...section.querySelectorAll('.paper')];
    const buttons = [...section.querySelectorAll('[data-filter]')];
    const count = section.querySelector('.filter-count');
    const empty = section.querySelector('.empty-state');
    const controls = section.querySelector('.filter-bar');
    if (!controls || !count) return;

    buttons.forEach(button => button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let visible = 0;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      papers.forEach(paper => {
        const show = filter === 'all' ||
          (filter === 'first' && paper.dataset.first === 'true') ||
          filter === paper.dataset.type;
        paper.hidden = !show;
        if (show) visible++;
      });
      count.textContent = `${visible} publication${visible === 1 ? '' : 's'}`;
      if (empty) empty.hidden = visible !== 0;
    }));
    controls.hidden = false;
  });

  const canvas = document.querySelector('#inference-field');
  if (!canvas) return;
  let context;
  try { context = canvas.getContext('2d'); } catch { return; }
  if (!context) return;

  const slider = document.querySelector('#observation');
  const toggle = document.querySelector('#motion-toggle');
  const controls = document.querySelector('.art-controls');
  const fallback = document.querySelector('.field-fallback');
  if (!slider || !toggle || !controls) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = !reducedMotion.matches;
  let inView = true;
  let observed = Number(slider.value);
  let width = 640;
  let height = 440;
  let time = 0;
  let lastTime = 0;
  let lastPaint = 0;
  let frame = null;

  // This is illustrative inference geometry, not experimental performance data.
  function surface(x, y) {
    const shift = observed * .53;
    return 1.02 * Math.exp(-((x - shift - .1) ** 2 / .88 + (y + .17) ** 2 / 1.65)) +
      .53 * Math.exp(-((x + 1.18 + shift * .15) ** 2 / .4 + (y - .63) ** 2 / .54));
  }

  function project(x, y, z) {
    return {
      x: width * .5 + (x * .76 - y * .65) * width * .153,
      y: height * .60 + (x * .24 + y * .27) * height * .22 - z * height * .49
    };
  }

  function line(points, color, weight = 1, dash = []) {
    context.beginPath();
    points.forEach((point, index) => index ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y));
    context.strokeStyle = color;
    context.lineWidth = weight;
    context.setLineDash(dash);
    context.stroke();
    context.setLineDash([]);
  }

  const graph = [
    {x: -2.18, y: -1.6, label: 'x₁'},
    {x: -1.58, y: 1.76, label: 'x₂'},
    {x: 1.95, y: 1.15, label: 'x₃'},
    {x: 2.3, y: -1.1, label: 'x₄'},
    {x: -.48, y: -1.55, label: 'f₁', factor: true},
    {x: .35, y: 1.65, label: 'f₂', factor: true},
    {x: 1.85, y: -.33, label: 'f₃', factor: true}
  ];
  const edges = [[0, 4], [1, 4], [1, 5], [2, 5], [2, 6], [3, 6], [4, 6]];

  function draw() {
    context.clearRect(0, 0, width, height);
    for (let a = -2.4; a <= 2.401; a += .4) {
      line([project(a, -2.2, 0), project(a, 2.2, 0)], 'rgba(108,122,151,.15)', .6);
      line([project(-2.4, a, 0), project(2.4, a, 0)], 'rgba(108,122,151,.15)', .6);
    }
    line([project(-2.4, -2.2, 0), project(2.4, -2.2, 0), project(2.4, 2.2, 0),
      project(-2.4, 2.2, 0), project(-2.4, -2.2, 0)], 'rgba(143,155,183,.3)', .7);

    for (let a = 2.24; a >= -2.241; a -= .115) {
      const points = [];
      for (let b = -2.3; b <= 2.301; b += .04) points.push(project(b, a, surface(b, a)));
      line(points, 'rgba(181,185,255,.59)', .7);
    }
    for (let a = -2.3; a <= 2.301; a += .16) {
      const points = [];
      for (let b = 2.24; b >= -2.241; b -= .04) points.push(project(a, b, surface(a, b)));
      line(points, 'rgba(181,185,255,.26)', .65);
    }

    const nodes = graph.map(node => ({...node, ...project(node.x, node.y, .015)}));
    edges.forEach(([a, b], index) => {
      const first = nodes[a], second = nodes[b];
      line([first, second], 'rgba(211,217,235,.48)', .8, [2, 5]);
      const progress = (time * .095 + index * .163) % 1;
      context.beginPath();
      context.arc(first.x + (second.x - first.x) * progress,
        first.y + (second.y - first.y) * progress, 2.1, 0, Math.PI * 2);
      context.fillStyle = '#d8dcff';
      context.fill();
    });
    nodes.forEach(node => {
      context.fillStyle = '#0b111d';
      context.strokeStyle = node.factor ? '#b5b9ff' : '#d2d9e9';
      context.lineWidth = 1.05;
      context.beginPath();
      if (node.factor) context.rect(node.x - 4.5, node.y - 4.5, 9, 9);
      else context.arc(node.x, node.y, 5.8, 0, Math.PI * 2);
      context.fill();
      context.stroke();
      context.fillStyle = '#c5cddd';
      context.font = '12px Segoe UI, Arial, sans-serif';
      context.textAlign = 'center';
      context.fillText(node.label, node.x, node.y + 23);
    });

    const peak = project(observed * .53 + .1, -.17, 1.01);
    const labelY = Math.max(30, peak.y - 42);
    context.beginPath();
    context.arc(peak.x, peak.y, 3.5, 0, Math.PI * 2);
    context.fillStyle = '#eff1f6';
    context.fill();
    line([{x: peak.x + 8, y: peak.y - 10}, {x: peak.x + 35, y: labelY},
      {x: peak.x + 94, y: labelY}], 'rgba(206,212,232,.65)', .7);
    context.font = '12px Segoe UI, Arial, sans-serif';
    context.textAlign = 'left';
    context.fillStyle = '#d1d6e5';
    context.fillText('Posterior belief', peak.x + 39, labelY - 9);
  }

  function loop(timestamp) {
    frame = null;
    if (!enabled || !inView || document.hidden) return;
    if (lastTime) time += Math.min((timestamp - lastTime) / 1000, .08);
    lastTime = timestamp;
    if (!lastPaint || timestamp - lastPaint >= 1000 / 30) {
      draw();
      lastPaint = timestamp;
    }
    frame = requestAnimationFrame(loop);
  }

  function syncMotion() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    lastTime = lastPaint = 0;
    toggle.textContent = enabled ? 'Pause motion' : 'Play motion';
    toggle.setAttribute('aria-pressed', String(enabled));
    if (enabled && inView && !document.hidden) frame = requestAnimationFrame(loop);
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    draw();
  }

  canvas.hidden = false;
  if (fallback) fallback.hidden = true;
  controls.hidden = false;
  slider.addEventListener('input', () => { observed = Number(slider.value); draw(); });
  toggle.addEventListener('click', () => { enabled = !enabled; syncMotion(); });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) { enabled = false; syncMotion(); }
  });
  document.addEventListener('visibilitychange', syncMotion);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      syncMotion();
    }).observe(canvas);
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize);
  resize();
  syncMotion();
})();
