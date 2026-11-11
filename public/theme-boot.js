(function () {
  try {
    var stored = localStorage.getItem('portfolio-theme-mode');
    var mode = stored === 'light' || stored === 'dark' ? stored : null;
    if (!mode) {
      mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.style.backgroundColor = mode === 'dark' ? '#101018' : '#eff0fa';
    document.documentElement.dataset.bootMode = mode;
  } catch (e) {}
})();
