// Click any case-study screenshot to view it full size, never larger than its real resolution.
// data-zoom points to a larger file; data-real gives the true pixel width when a file was upscaled.
(function () {
  var imgs = document.querySelectorAll('main .shot img, main img[data-zoom]');
  imgs.forEach(function (img) {
    if (img.closest('a')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'zoomable';
    btn.setAttribute('aria-label', 'Enlarge image: ' + img.alt);
    img.parentNode.insertBefore(btn, img);
    btn.appendChild(img);
    btn.addEventListener('click', function () { open(img); });
  });

  function open(img) {
    var view = document.createElement('div');
    view.className = 'zoom-view';
    view.setAttribute('role', 'dialog');
    view.setAttribute('aria-modal', 'true');
    view.setAttribute('aria-label', img.alt);
    var big = document.createElement('img');
    big.src = img.dataset.zoom || img.currentSrc || img.src;
    big.alt = img.alt;
    big.addEventListener('load', function () {
      var real = +img.dataset.real || big.naturalWidth;
      big.style.width = real + 'px';
    });
    var close = document.createElement('button');
    close.type = 'button';
    close.setAttribute('aria-label', 'Close');
    close.textContent = '×';
    view.appendChild(close);
    view.appendChild(big);
    var last = document.activeElement;
    function shut() {
      view.remove();
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      if (last) last.focus();
    }
    function onKey(e) { if (e.key === 'Escape') shut(); }
    view.addEventListener('click', shut);
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    document.body.appendChild(view);
    close.focus();
  }
})();
