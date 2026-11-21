// Click-to-enlarge for case study images: opens a full-screen viewer.
// Click the image to toggle between fit-to-screen and full size; Esc, the close button or the backdrop closes it.
(function () {
  var imgs = document.querySelectorAll('main figure img');
  if (!imgs.length || typeof HTMLDialogElement !== 'function') return;

  var dlg = document.createElement('dialog');
  dlg.className = 'lb';
  dlg.innerHTML = '<button class="lb-close" type="button" aria-label="Close">&times;</button>' +
    '<div class="lb-stage"><img alt=""></div><p class="lb-hint">Click the image to zoom</p>';
  document.body.appendChild(dlg);
  var stage = dlg.querySelector('.lb-stage');
  var big = dlg.querySelector('img');
  var hint = dlg.querySelector('.lb-hint');

  function close() { dlg.classList.remove('zoomed'); dlg.close(); }

  imgs.forEach(function (img) {
    img.classList.add('lb-trigger');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    function open() {
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      dlg.classList.remove('zoomed');
      dlg.showModal();
      document.documentElement.style.overflow = 'hidden';
    }
    img.addEventListener('click', open);
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });

  big.addEventListener('click', function (e) {
    e.stopPropagation();
    var r = big.getBoundingClientRect();
    var fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
    var zoomed = dlg.classList.toggle('zoomed');
    hint.textContent = zoomed ? 'Click to fit to screen' : 'Click the image to zoom';
    if (zoomed) {
      stage.scrollLeft = fx * stage.scrollWidth - stage.clientWidth / 2;
      stage.scrollTop = fy * stage.scrollHeight - stage.clientHeight / 2;
    }
  });
  stage.addEventListener('click', function (e) { if (e.target === stage) close(); });
  dlg.querySelector('.lb-close').addEventListener('click', close);
  dlg.addEventListener('close', function () { document.documentElement.style.overflow = ''; });
})();
