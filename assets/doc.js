// 一般講義頁的互動：目錄高亮、實作清單勾選（存在這台裝置的瀏覽器裡）。
(function () {
  var toc = document.getElementById("toc");
  var wide = window.matchMedia("(min-width: 900px)");

  // 桌機固定展開目錄；手機預設收合，點了連結後自動收起。
  function syncToc() { if (toc) toc.open = wide.matches; }
  syncToc();
  if (wide.addEventListener) wide.addEventListener("change", syncToc);
  if (toc) {
    toc.addEventListener("click", function (e) {
      if (e.target.closest("a") && !wide.matches) toc.open = false;
    });
  }

  // 目錄高亮目前讀到的章節。
  var links = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  var heads = links
    .map(function (a) { return document.getElementById(decodeURIComponent(a.hash.slice(1))); })
    .filter(Boolean);
  function spy() {
    var current = heads[0];
    for (var i = 0; i < heads.length; i++) {
      if (heads[i].getBoundingClientRect().top <= 120) current = heads[i];
    }
    links.forEach(function (a) {
      a.classList.toggle("on", !!current && decodeURIComponent(a.hash.slice(1)) === current.id);
    });
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; spy(); });
  }, { passive: true });
  spy();

  // 實作清單：勾選狀態存在 localStorage，讀不到也不影響閱讀。
  var KEY = "tasks:" + location.pathname;
  var boxes = Array.prototype.slice.call(document.querySelectorAll("input[data-task]"));
  var count = document.getElementById("task-count");
  var bar = document.getElementById("task-bar");
  var done = {};
  try { done = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { done = {}; }

  function render() {
    var n = boxes.filter(function (b) { return b.checked; }).length;
    if (count) count.textContent = "實作清單：已完成 " + n + " / " + boxes.length;
    if (bar) bar.value = n;
  }
  boxes.forEach(function (b) {
    b.checked = !!done[b.dataset.task];
    b.addEventListener("change", function () {
      if (b.checked) done[b.dataset.task] = 1; else delete done[b.dataset.task];
      try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {}
      render();
    });
  });
  render();
})();
