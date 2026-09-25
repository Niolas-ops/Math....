/**
 * MathLab - Virtual Math Laboratory
 * Interactive Geometry Canvas, Dragging, Resizing, and Mathematical Properties Engine
 */

(function () {
  'use strict';

  // --- Configuration & Constants ---
  const GRID_SIZE = 24; // 1 unit = 24 pixels
  const HANDLE_RADIUS = 7;
  const MIN_SHAPE_SIZE = 36; // Minimum 1.5 units

  // Shape Definitions
  const SHAPES = {
    square: {
      id: 'square',
      name: 'Square',
      visible: true,
      color: '#2563eb', // Blue
      fill: 'rgba(37, 99, 235, 0.22)',
      stroke: '#2563eb',
      x: 80,
      y: 70,
      width: 120,
      height: 120,
      type: 'square'
    },
    rectangle: {
      id: 'rectangle',
      name: 'Rectangle',
      visible: true,
      color: '#059669', // Green
      fill: 'rgba(16, 185, 129, 0.22)',
      stroke: '#059669',
      x: 260,
      y: 70,
      width: 168,
      height: 96,
      type: 'rectangle'
    },
    circle: {
      id: 'circle',
      name: 'Circle',
      visible: true,
      color: '#dc2626', // Red
      fill: 'rgba(239, 68, 68, 0.22)',
      stroke: '#dc2626',
      x: 100,
      y: 250,
      width: 120,
      height: 120,
      type: 'circle'
    },
    triangle: {
      id: 'triangle',
      name: 'Triangle',
      visible: true,
      color: '#ea580c', // Orange
      fill: 'rgba(249, 115, 22, 0.22)',
      stroke: '#ea580c',
      x: 280,
      y: 230,
      width: 144,
      height: 120,
      type: 'triangle'
    },
    pentagon: {
      id: 'pentagon',
      name: 'Pentagon',
      visible: false,
      color: '#9333ea', // Purple
      fill: 'rgba(168, 85, 247, 0.22)',
      stroke: '#9333ea',
      x: 140,
      y: 160,
      width: 130,
      height: 130,
      type: 'pentagon'
    },
    hexagon: {
      id: 'hexagon',
      name: 'Hexagon',
      visible: false,
      color: '#0d9488', // Teal
      fill: 'rgba(20, 184, 166, 0.22)',
      stroke: '#0d9488',
      x: 320,
      y: 160,
      width: 140,
      height: 130,
      type: 'hexagon'
    },
    ellipse: {
      id: 'ellipse',
      name: 'Ellipse',
      visible: false,
      color: '#db2777', // Pink
      fill: 'rgba(236, 72, 153, 0.22)',
      stroke: '#db2777',
      x: 220,
      y: 220,
      width: 168,
      height: 100,
      type: 'ellipse'
    }
  };

  // Rendering order (top-most shape rendered last)
  let renderOrder = ['square', 'rectangle', 'circle', 'triangle', 'pentagon', 'hexagon', 'ellipse'];
  let selectedShapeId = 'square';

  // Interaction State
  let isDragging = false;
  let isResizing = false;
  let activeShape = null;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let initialWidth = 0;
  let initialHeight = 0;
  let resizeStartX = 0;
  let resizeStartY = 0;

  // DOM Elements
  let canvas, ctx;
  let toastEl, toastTimeout;

  // --- Initialize App ---
  document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initSidebarControls();
    initTabNavigation();
    initTopControls();
    updatePropertiesPanel();
    requestAnimationFrame(render);
  });

  function initCanvas() {
    canvas = document.getElementById('geometryCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    toastEl = document.getElementById('toastNotification');

    resizeCanvas();
    window.addEventListener('resize', () => {
      resizeCanvas();
      render();
    });

    // Pointer / Mouse events
    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    // Touch events for mobile/tablet support
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
  }

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Set actual canvas resolution for high-DPI displays
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    
    // Scale context back down to CSS dimensions
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // --- Category Tabs Navigation ---
  function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const geometryPanel = document.getElementById('geometryPanel');
    const comingSoonPanel = document.getElementById('comingSoonPanel');

    const comingSoonData = {
      algebra: {
        title: 'Algebra Laboratory',
        icon: 'x²',
        badge: 'Coming in Phase 2',
        desc: 'Explore polynomial graphing, systems of linear equations, factoring, and function transformations with interactive visual graphs and balance scales.'
      },
      trigonometry: {
        title: 'Trigonometry Laboratory',
        icon: 'sin θ',
        badge: 'Coming in Phase 2',
        desc: 'Interact with the dynamic unit circle, observe sine and cosine wave generation in real-time, and solve triangle ratios visually.'
      },
      calculus: {
        title: 'Calculus Laboratory',
        icon: '∫ dx',
        badge: 'Coming in Phase 3',
        desc: 'Watch limits converge, explore tangent line slopes dynamically as derivatives, and compute Riemann sums under curves visually.'
      },
      probability: {
        title: 'Probability & Statistics',
        icon: 'P(A)',
        badge: 'Coming in Phase 3',
        desc: 'Simulate dice rolls, coin flips, Poisson processes, and watch the Central Limit Theorem emerge with real-time distribution curves.'
      }
    };

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-tab');
        if (category === 'geometry') {
          geometryPanel.classList.add('active');
          comingSoonPanel.classList.remove('active');
          resizeCanvas();
          render();
        } else {
          geometryPanel.classList.remove('active');
          comingSoonPanel.classList.add('active');

          const data = comingSoonData[category] || {
            title: `${category.charAt(0).toUpperCase() + category.slice(1)} Laboratory`,
            icon: '∑',
            badge: 'Coming Soon',
            desc: 'Interactive visual models for this mathematical discipline are currently in development.'
          };

          document.getElementById('comingSoonTitle').textContent = data.title;
          document.getElementById('comingSoonIcon').textContent = data.icon;
          document.getElementById('comingSoonBadge').textContent = data.badge;
          document.getElementById('comingSoonDesc').textContent = data.desc;
        }
      });
    });

    const returnBtn = document.getElementById('returnToGeometryBtn');
    if (returnBtn) {
      returnBtn.addEventListener('click', () => {
        const geoTab = document.querySelector('.tab-btn[data-tab="geometry"]');
        if (geoTab) geoTab.click();
      });
    }
  }

  // --- Top Controls (2D / 3D & Reset) ---
  function initTopControls() {
    const toggle2d = document.getElementById('toggle2D');
    const toggle3d = document.getElementById('toggle3D');
    const resetBtn = document.getElementById('resetCanvasBtn');

    if (toggle3d) {
      toggle3d.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('3D mode coming soon in Phase 2!');
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        // Reset positions
        SHAPES.square.x = 80; SHAPES.square.y = 70; SHAPES.square.width = 120; SHAPES.square.height = 120;
        SHAPES.rectangle.x = 260; SHAPES.rectangle.y = 70; SHAPES.rectangle.width = 168; SHAPES.rectangle.height = 96;
        SHAPES.circle.x = 100; SHAPES.circle.y = 250; SHAPES.circle.width = 120; SHAPES.circle.height = 120;
        SHAPES.triangle.x = 280; SHAPES.triangle.y = 230; SHAPES.triangle.width = 144; SHAPES.triangle.height = 120;
        SHAPES.pentagon.x = 140; SHAPES.pentagon.y = 160; SHAPES.pentagon.width = 130; SHAPES.pentagon.height = 130;
        SHAPES.hexagon.x = 320; SHAPES.hexagon.y = 160; SHAPES.hexagon.width = 140; SHAPES.hexagon.height = 130;
        SHAPES.ellipse.x = 220; SHAPES.ellipse.y = 220; SHAPES.ellipse.width = 168; SHAPES.ellipse.height = 100;

        updatePropertiesPanel();
        render();
        showToast('Canvas shapes repositioned.');
      });
    }
  }

  function showToast(message) {
    if (!toastEl) return;
    toastEl.querySelector('.toast-text').textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2500);
  }

  // --- Sidebar Controls ---
  function initSidebarControls() {
    const shapeItems = document.querySelectorAll('.shape-item');

    shapeItems.forEach((item) => {
      const shapeId = item.getAttribute('data-shape');
      const checkbox = item.querySelector('.shape-checkbox');

      // Set initial checkbox state
      if (checkbox && SHAPES[shapeId]) {
        checkbox.checked = SHAPES[shapeId].visible;
      }

      // Checkbox click
      if (checkbox) {
        checkbox.addEventListener('change', (e) => {
          const shape = SHAPES[shapeId];
          if (shape) {
            shape.visible = e.target.checked;
            if (shape.visible) {
              selectShape(shapeId);
            } else if (selectedShapeId === shapeId) {
              // Select another visible shape if possible
              const firstVisible = renderOrder.find((id) => SHAPES[id].visible);
              if (firstVisible) {
                selectShape(firstVisible);
              } else {
                selectedShapeId = null;
                updatePropertiesPanel();
              }
            }
            updateActiveShapesCount();
            render();
          }
        });
      }

      // Item click (select shape)
      item.addEventListener('click', (e) => {
        if (e.target !== checkbox) {
          const shape = SHAPES[shapeId];
          if (shape && !shape.visible && checkbox) {
            // If currently hidden, clicking activates it
            checkbox.checked = true;
            shape.visible = true;
            updateActiveShapesCount();
          }
          selectShape(shapeId);
          render();
        }
      });
    });

    updateActiveShapesCount();
    highlightSelectedItemInSidebar();
  }

  function selectShape(shapeId) {
    selectedShapeId = shapeId;
    if (shapeId) {
      // Move to top of render order
      renderOrder = renderOrder.filter((id) => id !== shapeId);
      renderOrder.push(shapeId);
    }
    highlightSelectedItemInSidebar();
    updatePropertiesPanel();
  }

  function highlightSelectedItemInSidebar() {
    document.querySelectorAll('.shape-item').forEach((item) => {
      const id = item.getAttribute('data-shape');
      if (id === selectedShapeId) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
  }

  function updateActiveShapesCount() {
    const activeCount = Object.values(SHAPES).filter((s) => s.visible).length;
    const badge = document.getElementById('activeShapesCount');
    if (badge) {
      badge.textContent = `${activeCount} visible`;
    }
  }

  // --- Shape Properties Math Engine ---
  function updatePropertiesPanel() {
    const badgeEl = document.getElementById('infoShapeBadge');
    const metric1Label = document.getElementById('metric1Label');
    const metric1Value = document.getElementById('metric1Value');
    const metric2Label = document.getElementById('metric2Label');
    const metric2Value = document.getElementById('metric2Value');
    const metric3Label = document.getElementById('metric3Label');
    const metric3Value = document.getElementById('metric3Value');
    const helperEl = document.getElementById('infoHelperText');

    if (!selectedShapeId || !SHAPES[selectedShapeId] || !SHAPES[selectedShapeId].visible) {
      if (badgeEl) badgeEl.textContent = 'None';
      if (metric1Label) metric1Label.textContent = 'Side / Radius:';
      if (metric1Value) metric1Value.textContent = '—';
      if (metric2Label) metric2Label.textContent = 'Area:';
      if (metric2Value) metric2Value.textContent = '—';
      if (metric3Label) metric3Label.textContent = 'Perimeter:';
      if (metric3Value) metric3Value.textContent = '—';
      if (helperEl) helperEl.textContent = 'Check a shape above or click one on the canvas to inspect its mathematical properties.';
      return;
    }

    const shape = SHAPES[selectedShapeId];
    if (badgeEl) {
      badgeEl.textContent = shape.name;
      badgeEl.style.borderColor = shape.color;
      badgeEl.style.color = shape.color;
    }

    // Convert pixel measurements to math units (1 unit = 24px)
    const w = shape.width / GRID_SIZE;
    const h = shape.height / GRID_SIZE;

    let area = 0;
    let perimeter = 0;

    switch (shape.type) {
      case 'square': {
        const side = Number(w.toFixed(1));
        area = (side * side).toFixed(1);
        perimeter = (4 * side).toFixed(1);

        metric1Label.textContent = 'Side:';
        metric1Value.textContent = `${side} units`;
        metric2Label.textContent = 'Area:';
        metric2Value.textContent = `${area} sq units`;
        metric3Label.textContent = 'Perimeter:';
        metric3Value.textContent = `${perimeter} units`;
        helperEl.textContent = 'Formula: Area = s² | Perimeter = 4s';
        break;
      }
      case 'rectangle': {
        const widthUnit = Number(w.toFixed(1));
        const heightUnit = Number(h.toFixed(1));
        area = (widthUnit * heightUnit).toFixed(1);
        perimeter = (2 * (widthUnit + heightUnit)).toFixed(1);

        metric1Label.textContent = 'Dimensions:';
        metric1Value.textContent = `${widthUnit} × ${heightUnit} units`;
        metric2Label.textContent = 'Area:';
        metric2Value.textContent = `${area} sq units`;
        metric3Label.textContent = 'Perimeter:';
        metric3Value.textContent = `${perimeter} units`;
        helperEl.textContent = 'Formula: Area = w × h | Perimeter = 2(w + h)';
        break;
      }
      case 'circle': {
        const radius = Number((Math.min(w, h) / 2).toFixed(1));
        area = (Math.PI * radius * radius).toFixed(1);
        perimeter = (2 * Math.PI * radius).toFixed(1);

        metric1Label.textContent = 'Radius:';
        metric1Value.textContent = `${radius} units`;
        metric2Label.textContent = 'Area:';
        metric2Value.textContent = `${area} sq units`;
        metric3Label.textContent = 'Circumference:';
        metric3Value.textContent = `${perimeter} units`;
        helperEl.textContent = 'Formula: Area = πr² | Circumference = 2πr';
        break;
      }
      case 'triangle': {
        const base = Number(w.toFixed(1));
        const height = Number(h.toFixed(1));
        area = (0.5 * base * height).toFixed(1);
        // Isosceles perimeter approximation
        const leg = Math.sqrt(Math.pow(base / 2, 2) + Math.pow(height, 2));
        perimeter = (base + 2 * leg).toFixed(1);

        metric1Label.textContent = 'Base × Height:';
        metric1Value.textContent = `${base} × ${height} units`;
        metric2Label.textContent = 'Area:';
        metric2Value.textContent = `${area} sq units`;
        metric3Label.textContent = 'Perimeter:';
        metric3Value.textContent = `~${perimeter} units`;
        helperEl.textContent = 'Formula: Area = ½ × base × height';
        break;
      }
      case 'pentagon': {
        const radius = Number((Math.min(w, h) / 2).toFixed(1));
        // Regular pentagon side = 2 * r * sin(π / 5)
        const side = Number((2 * radius * Math.sin(Math.PI / 5)).toFixed(1));
        area = ((5 / 2) * radius * radius * Math.sin((2 * Math.PI) / 5)).toFixed(1);
        perimeter = (5 * side).toFixed(1);

        metric1Label.textContent = 'Side (regular):';
        metric1Value.textContent = `~${side} units`;
        metric2Label.textContent = 'Area:';
        metric2Value.textContent = `~${area} sq units`;
        metric3Label.textContent = 'Perimeter:';
        metric3Value.textContent = `~${perimeter} units`;
        helperEl.textContent = 'Formula: Area = ½ × Perimeter × Apothem';
        break;
      }
      case 'hexagon': {
        const radius = Number((Math.min(w, h) / 2).toFixed(1));
        const side = radius;
        area = ((3 * Math.sqrt(3) / 2) * side * side).toFixed(1);
        perimeter = (6 * side).toFixed(1);

        metric1Label.textContent = 'Side (regular):';
        metric1Value.textContent = `${side} units`;
        metric2Label.textContent = 'Area:';
        metric2Value.textContent = `~${area} sq units`;
        metric3Label.textContent = 'Perimeter:';
        metric3Value.textContent = `${perimeter} units`;
        helperEl.textContent = 'Formula: Area = (3√3 / 2) × s² | P = 6s';
        break;
      }
      case 'ellipse': {
        const a = Number((w / 2).toFixed(1));
        const b = Number((h / 2).toFixed(1));
        area = (Math.PI * a * b).toFixed(1);
        // Ramanujan approximation for ellipse perimeter
        const hVal = Math.pow(a - b, 2) / Math.pow(a + b, 2);
        perimeter = (Math.PI * (a + b) * (1 + (3 * hVal) / (10 + Math.sqrt(4 - 3 * hVal)))).toFixed(1);

        metric1Label.textContent = 'Axes (a, b):';
        metric1Value.textContent = `${a}, ${b} units`;
        metric2Label.textContent = 'Area:';
        metric2Value.textContent = `${area} sq units`;
        metric3Label.textContent = 'Circumference:';
        metric3Value.textContent = `~${perimeter} units`;
        helperEl.textContent = 'Formula: Area = π × a × b';
        break;
      }
    }
  }

  // --- Rendering Loop ---
  function render() {
    if (!ctx || !canvas) return;
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Graph Paper Grid
    drawGrid(width, height);

    // 2. Draw Visible Shapes
    renderOrder.forEach((shapeId) => {
      const shape = SHAPES[shapeId];
      if (shape && shape.visible) {
        drawShape(shape, shapeId === selectedShapeId);
      }
    });
  }

  function drawGrid(width, height) {
    ctx.save();

    // Minor grid lines (1 unit = 24px)
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#e9eef4';
    ctx.beginPath();
    for (let x = 0; x <= width; x += GRID_SIZE) {
      if (x % (GRID_SIZE * 5) !== 0) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }
    }
    for (let y = 0; y <= height; y += GRID_SIZE) {
      if (y % (GRID_SIZE * 5) !== 0) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
    }
    ctx.stroke();

    // Major grid lines (every 5 units = 120px)
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (let x = 0; x <= width; x += GRID_SIZE * 5) {
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, height);
    }
    for (let y = 0; y <= height; y += GRID_SIZE * 5) {
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(width, y + 0.5);
    }
    ctx.stroke();

    // Optional coordinate axis markers at top & left
    ctx.font = '10px -apple-system, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    for (let x = GRID_SIZE * 5; x < width; x += GRID_SIZE * 5) {
      const units = x / GRID_SIZE;
      ctx.fillText(`${units}`, x + 0.5, 6);
    }

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    for (let y = GRID_SIZE * 5; y < height; y += GRID_SIZE * 5) {
      const units = y / GRID_SIZE;
      ctx.fillText(`${units}`, 6, y + 0.5);
    }

    ctx.restore();
  }

  function drawShape(shape, isSelected) {
    ctx.save();

    const { x, y, width, height, stroke, fill, type } = shape;

    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = isSelected ? 2.5 : 2;

    ctx.beginPath();

    switch (type) {
      case 'square':
        // Keep proportional square
        ctx.rect(x, y, width, height);
        break;

      case 'rectangle':
        ctx.rect(x, y, width, height);
        break;

      case 'circle': {
        const radius = Math.min(width, height) / 2;
        const cx = x + width / 2;
        const cy = y + height / 2;
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        break;
      }

      case 'triangle': {
        ctx.moveTo(x + width / 2, y);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x, y + height);
        ctx.closePath();
        break;
      }

      case 'pentagon': {
        const cx = x + width / 2;
        const cy = y + height / 2;
        const radius = Math.min(width, height) / 2;
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const px = cx + radius * Math.cos(angle);
          const py = cy + radius * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        break;
      }

      case 'hexagon': {
        const cx = x + width / 2;
        const cy = y + height / 2;
        const radius = Math.min(width, height) / 2;
        for (let i = 0; i < 6; i++) {
          const angle = (i * 2 * Math.PI) / 6;
          const px = cx + radius * Math.cos(angle);
          const py = cy + radius * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        break;
      }

      case 'ellipse': {
        const cx = x + width / 2;
        const cy = y + height / 2;
        ctx.ellipse(cx, cy, width / 2, height / 2, 0, 0, Math.PI * 2);
        break;
      }
    }

    ctx.fill();
    ctx.stroke();

    // If selected, draw selection adornments and resize handle
    if (isSelected) {
      drawSelectionAdornments(shape);
    }

    ctx.restore();
  }

  function drawSelectionAdornments(shape) {
    const { x, y, width, height, stroke, name } = shape;

    // Outer subtle dashed bounding frame
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(x - 4, y - 4, width + 8, height + 8);
    ctx.restore();

    // Measurement badge above shape
    const unitW = (width / GRID_SIZE).toFixed(1);
    const unitH = (height / GRID_SIZE).toFixed(1);
    const label = shape.type === 'circle' 
      ? `r = ${(Math.min(width, height) / (2 * GRID_SIZE)).toFixed(1)} u` 
      : `${unitW} × ${unitH} u`;

    ctx.save();
    ctx.font = '11px -apple-system, sans-serif';
    const textMetrics = ctx.measureText(label);
    const badgeW = textMetrics.width + 12;
    const badgeH = 18;
    const badgeX = x + (width - badgeW) / 2;
    const badgeY = y - 26;

    // Badge background
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 4);
    ctx.fill();
    ctx.stroke();

    // Badge text
    ctx.fillStyle = stroke;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, badgeX + badgeW / 2, badgeY + badgeH / 2);
    ctx.restore();

    // Resize Handle at bottom-right corner
    const handleX = x + width;
    const handleY = y + height;

    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(handleX, handleY, HANDLE_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Inner center dot
    ctx.fillStyle = stroke;
    ctx.beginPath();
    ctx.arc(handleX, handleY, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // --- Hit Testing ---
  function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function isOverHandle(shape, pos) {
    const handleX = shape.x + shape.width;
    const handleY = shape.y + shape.height;
    const distSq = Math.pow(pos.x - handleX, 2) + Math.pow(pos.y - handleY, 2);
    return distSq <= Math.pow(HANDLE_RADIUS + 5, 2);
  }

  function isInsideShape(shape, pos) {
    const { x, y, width, height, type } = shape;

    switch (type) {
      case 'square':
      case 'rectangle':
        return pos.x >= x && pos.x <= x + width && pos.y >= y && pos.y <= y + height;

      case 'circle': {
        const radius = Math.min(width, height) / 2;
        const cx = x + width / 2;
        const cy = y + height / 2;
        const distSq = Math.pow(pos.x - cx, 2) + Math.pow(pos.y - cy, 2);
        return distSq <= Math.pow(radius, 2);
      }

      case 'triangle': {
        // Point inside triangle test
        const x1 = x + width / 2, y1 = y;
        const x2 = x + width, y2 = y + height;
        const x3 = x, y3 = y + height;
        const denom = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3);
        const a = ((y2 - y3) * (pos.x - x3) + (x3 - x2) * (pos.y - y3)) / denom;
        const b = ((y3 - y1) * (pos.x - x3) + (x1 - x3) * (pos.y - y3)) / denom;
        const c = 1 - a - b;
        return a >= 0 && a <= 1 && b >= 0 && b <= 1 && c >= 0 && c <= 1;
      }

      case 'pentagon':
      case 'hexagon': {
        const sides = type === 'pentagon' ? 5 : 6;
        const cx = x + width / 2;
        const cy = y + height / 2;
        const radius = Math.min(width, height) / 2;
        const dist = Math.hypot(pos.x - cx, pos.y - cy);
        return dist <= radius;
      }

      case 'ellipse': {
        const cx = x + width / 2;
        const cy = y + height / 2;
        const rx = width / 2;
        const ry = height / 2;
        return (
          Math.pow(pos.x - cx, 2) / Math.pow(rx, 2) +
          Math.pow(pos.y - cy, 2) / Math.pow(ry, 2) <= 1
        );
      }
    }
    return false;
  }

  // --- Pointer Event Handlers ---
  function onPointerDown(e) {
    const pos = getMousePos(e);

    // 1. Check if clicked on resize handle of the selected shape first
    if (selectedShapeId && SHAPES[selectedShapeId] && SHAPES[selectedShapeId].visible) {
      const currentSelected = SHAPES[selectedShapeId];
      if (isOverHandle(currentSelected, pos)) {
        isResizing = true;
        activeShape = currentSelected;
        resizeStartX = pos.x;
        resizeStartY = pos.y;
        initialWidth = currentSelected.width;
        initialHeight = currentSelected.height;
        canvas.style.cursor = 'nwse-resize';
        return;
      }
    }

    // 2. Check if clicked inside any visible shape (from top-most z-order)
    for (let i = renderOrder.length - 1; i >= 0; i--) {
      const shapeId = renderOrder[i];
      const shape = SHAPES[shapeId];
      if (!shape.visible) continue;

      if (isInsideShape(shape, pos)) {
        isDragging = true;
        activeShape = shape;
        dragOffsetX = pos.x - shape.x;
        dragOffsetY = pos.y - shape.y;
        selectShape(shapeId);
        canvas.style.cursor = 'grabbing';
        render();
        return;
      }
    }

    // Clicked on empty canvas space
  }

  function onPointerMove(e) {
    const pos = getMousePos(e);

    if (isResizing && activeShape) {
      const deltaX = pos.x - resizeStartX;
      const deltaY = pos.y - resizeStartY;

      let newWidth = Math.max(MIN_SHAPE_SIZE, initialWidth + deltaX);
      let newHeight = Math.max(MIN_SHAPE_SIZE, initialHeight + deltaY);

      // Enforce 1:1 aspect ratio for regular shapes
      if (activeShape.type === 'square' || activeShape.type === 'circle' || 
          activeShape.type === 'pentagon' || activeShape.type === 'hexagon') {
        const side = Math.max(newWidth, newHeight);
        newWidth = side;
        newHeight = side;
      }

      activeShape.width = Math.round(newWidth);
      activeShape.height = Math.round(newHeight);

      updatePropertiesPanel();
      render();
      return;
    }

    if (isDragging && activeShape) {
      activeShape.x = Math.round(pos.x - dragOffsetX);
      activeShape.y = Math.round(pos.y - dragOffsetY);

      // Keep within reasonable canvas boundaries
      const maxW = canvas.parentElement.clientWidth;
      const maxH = canvas.parentElement.clientHeight;
      activeShape.x = Math.max(0, Math.min(maxW - 30, activeShape.x));
      activeShape.y = Math.max(0, Math.min(maxH - 30, activeShape.y));

      updatePropertiesPanel();
      render();
      return;
    }

    // Hover cursor feedback
    if (!isDragging && !isResizing) {
      if (selectedShapeId && SHAPES[selectedShapeId] && SHAPES[selectedShapeId].visible) {
        if (isOverHandle(SHAPES[selectedShapeId], pos)) {
          canvas.style.cursor = 'nwse-resize';
          return;
        }
      }

      let hovered = false;
      for (let i = renderOrder.length - 1; i >= 0; i--) {
        const shape = SHAPES[renderOrder[i]];
        if (shape.visible && isInsideShape(shape, pos)) {
          canvas.style.cursor = 'grab';
          hovered = true;
          break;
        }
      }

      if (!hovered) {
        canvas.style.cursor = 'crosshair';
      }
    }
  }

  function onPointerUp() {
    if (isDragging || isResizing) {
      isDragging = false;
      isResizing = false;
      activeShape = null;
      canvas.style.cursor = 'crosshair';
      updatePropertiesPanel();
      render();
    }
  }

  // --- Touch Support ---
  function onTouchStart(e) {
    if (e.touches.length === 1) {
      e.preventDefault();
      onPointerDown(e);
    }
  }

  function onTouchMove(e) {
    if (e.touches.length === 1) {
      e.preventDefault();
      onPointerMove(e);
    }
  }

  function onTouchEnd(e) {
    onPointerUp();
  }
})();
