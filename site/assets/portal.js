/* Buehne der Startseite: der Zeiger fuehrt einen Lichtkegel (--lx, --ly) und neigt die drei Bilder
   leicht zu sich hin (--rx, --ry); das Bild im Rahmen weicht ein wenig zurueck (--dx, --dy), so dass
   es hinter dem Glas zu liegen scheint. Nur mit Maus oder Stift und nur, wo Bewegung erwuenscht ist;
   ohne dieses Skript steht die Buehne still und vollstaendig da. */
(function () {
  'use strict';
  var buehne = document.querySelector('.ei-buehne');
  if (!buehne) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(pointer: fine)').matches) return;

  var rahmen = [].slice.call(buehne.querySelectorAll('.ei-rahmen'));
  var NEIGUNG = 5, TIEFE = 9;           // Grad, Pixel: genug, um es zu spueren, nicht genug, um es zu sehen
  var x = null, y = null, wartet = false;

  function male() {
    wartet = false;
    var b = buehne.getBoundingClientRect();
    if (x == null) {
      buehne.style.removeProperty('--lx'); buehne.style.removeProperty('--ly');
      rahmen.forEach(function (r) { ['--rx', '--ry', '--dx', '--dy'].forEach(function (k) { r.style.removeProperty(k); }); });
      return;
    }
    buehne.style.setProperty('--lx', ((x - b.left) / b.width * 100).toFixed(1) + '%');
    buehne.style.setProperty('--ly', ((y - b.top) / b.height * 100).toFixed(1) + '%');
    rahmen.forEach(function (r) {
      var q = r.getBoundingClientRect();
      var dx = Math.max(-1, Math.min(1, (x - (q.left + q.width / 2)) / (b.width / 2)));
      var dy = Math.max(-1, Math.min(1, (y - (q.top + q.height / 2)) / (b.height / 2)));
      r.style.setProperty('--ry', (dx * NEIGUNG).toFixed(2) + 'deg');
      r.style.setProperty('--rx', (-dy * NEIGUNG).toFixed(2) + 'deg');
      r.style.setProperty('--dx', (-dx * TIEFE).toFixed(1) + 'px');
      r.style.setProperty('--dy', (-dy * TIEFE).toFixed(1) + 'px');
    });
  }
  function plane() { if (!wartet) { wartet = true; requestAnimationFrame(male); } }

  buehne.addEventListener('pointermove', function (e) { x = e.clientX; y = e.clientY; plane(); });
  buehne.addEventListener('pointerleave', function () { x = y = null; plane(); });
})();
