// Magnifying lens for screenshots marked with data-zoom; tap or click opens the full-size image.
(function () {
  var Z = 2.5, L = 240;
  document.querySelectorAll('img[data-zoom]').forEach(function (img) {
    var wrap = document.createElement('button');
    wrap.type = 'button';
    wrap.setAttribute('aria-label', 'Enlarge: ' + img.alt);
    wrap.className = 'mag';
    img.parentNode.insertBefore(wrap, img);
    wrap.appendChild(img);
    var lens = document.createElement('span');
    lens.className = 'mag-lens';
    lens.setAttribute('aria-hidden', 'true');
    lens.style.backgroundImage = 'url("' + img.dataset.zoom + '")';
    wrap.appendChild(lens);
    var hint = document.createElement('span');
    hint.className = 'mag-hint';
    hint.textContent = matchMedia('(hover: none)').matches ? 'Tap to enlarge' : 'Hover to magnify, click to enlarge';
    wrap.parentNode.appendChild(hint);
    new Image().src = img.dataset.zoom;

    wrap.addEventListener('mousemove', function (e) {
      var r = img.getBoundingClientRect();
      var x = Math.max(0, Math.min(r.width, e.clientX - r.left));
      var y = Math.max(0, Math.min(r.height, e.clientY - r.top));
      lens.style.left = (x - L / 2) + 'px';
      lens.style.top = (y - L / 2) + 'px';
      lens.style.backgroundSize = (r.width * Z) + 'px ' + (r.height * Z) + 'px';
      lens.style.backgroundPosition = (L / 2 - x * Z) + 'px ' + (L / 2 - y * Z) + 'px';
    });

    wrap.addEventListener('click', function () {
      var view = document.createElement('div');
      view.className = 'mag-view';
      view.setAttribute('role', 'dialog');
      view.setAttribute('aria-label', img.alt);
      var big = document.createElement('img');
      big.src = img.dataset.zoom;
      big.alt = img.alt;
      var close = document.createElement('button');
      close.type = 'button';
      close.setAttribute('aria-label', 'Close');
      close.textContent = '×';
      view.appendChild(close);
      view.appendChild(big);
      function shut() { view.remove(); document.removeEventListener('keydown', onKey); }
      function onKey(e) { if (e.key === 'Escape') shut(); }
      view.addEventListener('click', shut);
      document.addEventListener('keydown', onKey);
      document.body.appendChild(view);
      close.focus();
    });
  });
})();
