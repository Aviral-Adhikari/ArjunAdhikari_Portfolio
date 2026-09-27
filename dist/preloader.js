(() => {
  const loader = document.querySelector('.site-preloader');
  if (!loader) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const minimum = reducedMotion ? 80 : 2200;
  let closed = false;

  function closeLoader() {
    if (closed) return;
    closed = true;
    loader.classList.add('is-hidden');
    document.documentElement.classList.remove('preload-active');
    window.setTimeout(() => loader.remove(), reducedMotion ? 20 : 520);
  }

  function scheduleClose() {
    const remaining = Math.max(0, minimum - performance.now());
    window.setTimeout(closeLoader, remaining);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleClose, { once: true });
  else scheduleClose();
  window.setTimeout(closeLoader, 3200);
})();
