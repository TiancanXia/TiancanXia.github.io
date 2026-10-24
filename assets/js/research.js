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
})();
