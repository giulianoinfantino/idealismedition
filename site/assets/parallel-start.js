/* Aus dem Leser einer Ausgabe kommend (?q=„…“&parallel=1): sobald der erste Treffer steht,
 * dessen Parallelstellen bei Fichte, Schelling und Hegel aufklappen. Einmal, dann nicht wieder. */
(function () {
  'use strict';
  if (!/[?&]parallel=1\b/.test(location.search)) return;
  var fertig = false;
  function versuche() {
    if (fertig) return;
    var k = document.querySelector('.rch-stelle [data-parallel]');
    if (!k) return;
    fertig = true; beobachter.disconnect();
    k.click();
    var art = k.closest('.rch-stelle');
    if (art && art.scrollIntoView) art.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  var beobachter = new MutationObserver(versuche);
  beobachter.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(function () { beobachter.disconnect(); }, 60000);
})();
