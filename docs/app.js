(() => {
  const tablist = document.querySelector('.edition-tabs');
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));

  function selectTab(index, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
  }

  tabs.forEach((tab, index) => {
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    panels[index].tabIndex = 0;
    tab.addEventListener('click', () => selectTab(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = 1 - index;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectTab(next, true);
      }
    });
  });
  selectTab(location.hash === '#modular-panel' ? 1 : 0);
  tablist.hidden = false;
  document.querySelectorAll('a[href="#modular-panel"], a[href="#complete-panel"]').forEach(link => {
    link.addEventListener('click', () => {
      selectTab(panels.findIndex(panel => '#' + panel.id === link.getAttribute('href')));
    });
  });
  window.addEventListener('hashchange', () => {
    const index = panels.findIndex(panel => '#' + panel.id === location.hash);
    if (index !== -1) selectTab(index);
  });
})();
