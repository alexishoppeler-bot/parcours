'use strict';
(function() {
  if (!('ontouchstart' in window)) return;

  var dragged = null;
  var offsetX = 0, offsetY = 0;
  var startX = 0, startY = 0;
  var hasMoved = false;

  document.addEventListener('touchstart', function(e) {
    var el = e.target.closest('[draggable="true"], .alphabet-item, .drag-item, .word-chip');
    if (!el) return;
    dragged = el;
    hasMoved = false;
    var touch = e.touches[0];
    var rect = el.getBoundingClientRect();
    startX = touch.clientX;
    startY = touch.clientY;
    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;
    el.style.zIndex = '999';
    el.style.opacity = '0.8';
    var dragStartEvent = new Event('dragstart', { bubbles: true });
    dragStartEvent.dataTransfer = {
      effectAllowed: '',
      setData: function() {},
      getData: function() { return el.dataset.id || el.textContent; }
    };
    el.dispatchEvent(dragStartEvent);
  }, { passive: true });

  document.addEventListener('touchmove', function(e) {
    if (!dragged) return;
    e.preventDefault();
    hasMoved = true;
    var touch = e.touches[0];
    var x = touch.clientX - offsetX;
    var y = touch.clientY - offsetY;
    dragged.style.position = 'fixed';
    dragged.style.left = x + 'px';
    dragged.style.top = y + 'px';
    dragged.style.width = dragged.offsetWidth + 'px';
    dragged.style.pointerEvents = 'none';

    var target = document.elementFromPoint(touch.clientX, touch.clientY);
    document.querySelectorAll('.drag-over, .over, .hover').forEach(function(el) {
      if (el !== target) { el.classList.remove('drag-over', 'over', 'hover'); }
    });
    if (target) {
      var dropZone = target.closest('.drop-zone, .alphabet-list, [data-drop], .droppable');
      if (dropZone) { dropZone.classList.add('drag-over', 'over'); }
    }
  }, { passive: false });

  document.addEventListener('touchend', function(e) {
    if (!dragged) return;
    dragged.style.position = '';
    dragged.style.left = '';
    dragged.style.top = '';
    dragged.style.width = '';
    dragged.style.zIndex = '';
    dragged.style.opacity = '';
    dragged.style.pointerEvents = '';

    if (hasMoved) {
      var touch = e.changedTouches[0];
      var target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target) {
        var dropZone = target.closest('.drop-zone, .alphabet-list, [data-drop], .droppable');
        if (dropZone) {
          dropZone.classList.remove('drag-over', 'over', 'hover');
          var dropEvent = new Event('drop', { bubbles: true });
          dropEvent.dataTransfer = { getData: function() { return dragged.dataset.id || dragged.textContent; } };
          dropZone.dispatchEvent(dropEvent);
        }
      }
      dragged.dispatchEvent(new Event('dragend', { bubbles: true }));
    }

    dragged = null;
    hasMoved = false;
  }, { passive: true });
})();
