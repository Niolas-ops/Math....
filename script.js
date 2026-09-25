import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * MathLab - Virtual Math Laboratory
 * Full-Screen Infinite Grid (Desmos-style), Interactive Floating Panels,
 * Draggable Shapes, Dynamic Dimension Inputs & Real-Time Mathematical Properties
 */

// --- Subject Laboratories Configuration (Preserved for Non-Geometry Pages) ---
const LABS_CONFIG = {
  algebra: {
    title: 'Algebra',
    badge: 'Under Construction',
    subtitle: 'Coordinate Geometry, Functions & Linear Systems',
    icon: 'f(x)',
    tag: 'Algebra Laboratory',
    themeColor: '#059669',
    desc: 'Explore polynomial curves, quadratic roots, vertex transformations, and systems of linear equations through interactive graphs.',
    modules: [
      { name: 'Quadratic Parabola Explorer', desc: 'Drag vertex and focus points to explore y = a(x - h)² + k in real-time', status: 'In Design' },
      { name: 'Linear Systems Solver', desc: 'Simultaneously plot intersecting lines with matrix determinant feedback', status: 'Queued' },
      { name: 'Polynomial Roots Visualizer', desc: 'Interactive complex roots and multiplicity factoring manipulatives', status: 'Queued' },
      { name: 'Rational Function Asymptote Map', desc: 'Observe vertical, horizontal, and slant asymptotes dynamically', status: 'Planned' }
    ],
    bgSvg: `<svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="faint-bg-svg">
      <defs>
        <pattern id="algFaintGrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(5, 150, 105, 0.08)" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="600" height="400" fill="url(#algFaintGrid)" />
      <line x1="300" y1="0" x2="300" y2="400" stroke="rgba(5, 150, 105, 0.18)" stroke-width="2" />
      <line x1="0" y1="200" x2="600" y2="200" stroke="rgba(5, 150, 105, 0.18)" stroke-width="2" />
      <path d="M 120 40 Q 300 360 480 40" fill="none" stroke="rgba(5, 150, 105, 0.22)" stroke-width="4" />
      <text x="320" y="50" font-size="28" font-family="'Times New Roman', serif" font-style="italic" fill="rgba(5, 150, 105, 0.12)">x² + 2x = 8</text>
      <text x="80" y="180" font-size="24" font-family="'Times New Roman', serif" font-style="italic" fill="rgba(5, 150, 105, 0.12)">f(x) = ax² + bx + c</text>
      <text x="360" y="320" font-size="22" font-family="'Times New Roman', serif" font-style="italic" fill="rgba(5, 150, 105, 0.12)">y = mx + b</text>
    </svg>`
  },
  trigonometry: {
    title: 'Trigonometry',
    badge: 'Under Construction',
    subtitle: 'Unit Circle, Wave Harmonizers & Angle Ratios',
    icon: 'sin θ',
    tag: 'Trigonometry Laboratory',
    themeColor: '#ea580c',
    desc: 'Interact with the dynamic unit circle, observe sine and cosine wave generation in real-time, and solve triangle ratios visually.',
    modules: [
      { name: 'Dynamic Unit Circle Explorer', desc: 'Interactive angle ray dragging with real-time sin, cos, and tan projections', status: 'In Design' },
      { name: 'Continuous Sine Wave Generator', desc: 'Rotating phasors unfolding into continuous time-domain sine waves', status: 'Queued' },
      { name: 'Trigonometric Identities Proofs', desc: 'Geometric rearrangement proofs for sin²θ + cos²θ = 1 and sum formulas', status: 'Queued' },
      { name: 'Fourier Harmonic Synthesizer', desc: 'Summing sinusoidal harmonics to create square, sawtooth, and audio waves', status: 'Planned' }
    ],
    bgSvg: `<svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="faint-bg-svg">
      <defs>
        <pattern id="trigFaintGrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(234, 88, 12, 0.08)" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="600" height="400" fill="url(#trigFaintGrid)" />
      <circle cx="180" cy="200" r="120" fill="none" stroke="rgba(234, 88, 12, 0.18)" stroke-width="3" />
      <line x1="60" y1="200" x2="600" y2="200" stroke="rgba(234, 88, 12, 0.15)" stroke-width="2" />
      <line x1="180" y1="60" x2="180" y2="340" stroke="rgba(234, 88, 12, 0.15)" stroke-width="2" />
      <path d="M 180 200 C 240 80, 300 320, 360 200 C 420 80, 480 320, 540 200" fill="none" stroke="rgba(234, 88, 12, 0.22)" stroke-width="4" />
      <text x="380" y="100" font-size="28" font-family="'Times New Roman', serif" font-style="italic" fill="rgba(234, 88, 12, 0.12)">sin²θ + cos²θ = 1</text>
      <text x="60" y="100" font-size="26" font-family="'Times New Roman', serif" font-style="italic" fill="rgba(234, 88, 12, 0.12)">tan θ = sin θ / cos θ</text>
    </svg>`
  },
  calculus: {
    title: 'Calculus',
    badge: 'Under Construction',
    subtitle: 'Derivatives, Tangent Slopes & Riemann Integrals',
    icon: '∫ dx',
    tag: 'Calculus Laboratory',
    themeColor: '#9333ea',
    desc: 'Watch limits converge, explore tangent line slopes dynamically as derivatives, and compute Riemann sums under curves visually.',
    modules: [
      { name: 'Tangent Slope & Derivative Zoom', desc: 'Magnify curves to infinitesimal linear secants converging to dy/dx', status: 'In Design' },
      { name: 'Riemann Sum Area Integrator', desc: 'Interactive rectangle partitions (left, midpoint, trapezoid) converging to ∫', status: 'Queued' },
      { name: 'Fundamental Theorem Playground', desc: 'Visual connection between rate-of-change accumulation and curve height', status: 'Queued' },
      { name: 'Taylor Series Polynomial Expander', desc: 'Dynamic polynomial degree expansion fitting arbitrary target functions', status: 'Planned' }
    ],
    bgSvg: `<svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="faint-bg-svg">
      <defs>
        <pattern id="calcFaintGrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(147, 51, 234, 0.08)" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="600" height="400" fill="url(#calcFaintGrid)" />
      <line x1="80" y1="40" x2="80" y2="360" stroke="rgba(147, 51, 234, 0.15)" stroke-width="2" />
      <line x1="40" y1="320" x2="560" y2="320" stroke="rgba(147, 51, 234, 0.15)" stroke-width="2" />
      <path d="M 90 310 C 180 180, 260 280, 360 140 C 440 60, 500 200, 550 280" fill="none" stroke="rgba(147, 51, 234, 0.22)" stroke-width="4" />
      <line x1="260" y1="230" x2="460" y2="50" stroke="rgba(236, 72, 153, 0.25)" stroke-width="3" stroke-dasharray="6 4" />
      <text x="120" y="110" font-size="44" font-family="'Times New Roman', serif" fill="rgba(147, 51, 234, 0.15)">∫ f(x) dx</text>
      <text x="380" y="70" font-size="26" font-family="'Times New Roman', serif" font-style="italic" fill="rgba(147, 51, 234, 0.15)">dy/dx = lim Δx→0</text>
    </svg>`
  },
  probability: {
    title: 'Probability',
    badge: 'Under Construction',
    subtitle: 'Random Variables, Bell Curves & Monte Carlo Simulations',
    icon: 'P(X)',
    tag: 'Probability Laboratory',
    themeColor: '#e11d48',
    desc: 'Simulate dice rolls, coin flips, Poisson processes, and watch the Central Limit Theorem emerge with real-time distribution curves.',
    modules: [
      { name: 'High-speed Dice & Coin Simulator', desc: 'Simulate up to 100,000 trials with instant visual frequency histograms', status: 'In Design' },
      { name: 'Gaussian Bell Curve & Z-Score', desc: 'Interactive mean μ and standard deviation σ interval area calculators', status: 'Queued' },
      { name: 'Galton Board Physics Simulator', desc: 'Dropping pin-grid beads forming a perfect binomial bell distribution', status: 'Queued' },
      { name: 'Bayesian Inference Tree Model', desc: 'Conditional probability update calculators with tree branches and Venn diagrams', status: 'Planned' }
    ],
    bgSvg: `<svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="faint-bg-svg">
      <defs>
        <pattern id="probFaintGrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(225, 29, 72, 0.08)" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="600" height="400" fill="url(#probFaintGrid)" />
      <line x1="50" y1="320" x2="550" y2="320" stroke="rgba(225, 29, 72, 0.15)" stroke-width="2" />
      <path d="M 100 320 C 200 320, 240 80, 300 80 C 360 80, 400 320, 500 320" fill="none" stroke="rgba(225, 29, 72, 0.22)" stroke-width="4" />
      <line x1="300" y1="80" x2="300" y2="320" stroke="rgba(225, 29, 72, 0.15)" stroke-width="2" stroke-dasharray="4 4" />
      <text x="290" y="65" font-size="24" font-weight="bold" fill="rgba(225, 29, 72, 0.15)">μ</text>
      <text x="80" y="160" font-size="28" font-family="'Times New Roman', serif" fill="rgba(225, 29, 72, 0.15)">P(A ∩ B) = P(A) · P(B|A)</text>
      <text x="380" y="240" font-size="26" font-family="'Times New Roman', serif" fill="rgba(225, 29, 72, 0.15)">σ = √(Σ(x - μ)² / N)</text>
    </svg>`
  }
};

// --- GEOMETRY DATA STRUCTURES ---

const SHAPES = {
  square: {
    id: 'square',
    name: 'Square',
    visible: true,
    color: '#2563eb',
    fillColor: 'rgba(37, 99, 235, 0.22)',
    strokeColor: '#2563eb',
    x: 0,
    y: 0,
    y3D: 0,
    z: 0,
    rotation: 0,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat',
    side: 4
  },
  rectangle: {
    id: 'rectangle',
    name: 'Rectangle',
    visible: false,
    color: '#059669',
    fillColor: 'rgba(160, 185, 129, 0.22)',
    strokeColor: '#059669',
    x: 0,
    y: 0,
    y3D: 0,
    z: 0,
    rotation: 0,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat',
    width: 4,
    length: 2
  },
  circle: {
    id: 'circle',
    name: 'Circle',
    visible: false,
    color: '#dc2626',
    fillColor: 'rgba(239, 68, 68, 0.22)',
    strokeColor: '#dc2626',
    x: 0,
    y: 0,
    y3D: 0,
    z: 0,
    rotation: 0,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat',
    radius: 3
  },
  triangle: {
    id: 'triangle',
    name: 'Triangle',
    visible: false,
    color: '#ea580c',
    fillColor: 'rgba(249, 115, 22, 0.22)',
    strokeColor: '#ea580c',
    x: 0,
    y: 0,
    y3D: 0,
    z: 0,
    rotation: 0,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat',
    sideA: 3,
    sideB: 4,
    sideC: 5
  },
  pentagon: {
    id: 'pentagon',
    name: 'Pentagon',
    visible: false,
    color: '#9333ea',
    fillColor: 'rgba(168, 85, 247, 0.22)',
    strokeColor: '#9333ea',
    x: 0,
    y: 0,
    y3D: 0,
    z: 0,
    rotation: 0,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat',
    side: 3
  },
  hexagon: {
    id: 'hexagon',
    name: 'Hexagon',
    visible: false,
    color: '#0d9488',
    fillColor: 'rgba(13, 148, 136, 0.22)',
    strokeColor: '#0d9488',
    x: 0,
    y: 0,
    y3D: 0,
    z: 0,
    rotation: 0,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat',
    side: 3
  },
  ellipse: {
    id: 'ellipse',
    name: 'Ellipse',
    visible: false,
    color: '#db2777',
    fillColor: 'rgba(219, 39, 119, 0.22)',
    strokeColor: '#db2777',
    x: 0,
    y: 0,
    y3D: 0,
    z: 0,
    rotation: 0,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat',
    radiusX: 4,
    radiusY: 2.5
  },
  sphere: {
    id: 'sphere',
    name: 'Sphere',
    is3DOnly: true,
    visible: false,
    color: '#0284c7',
    fillColor: 'rgba(2, 132, 199, 0.25)',
    strokeColor: '#0369a1',
    x: 0,
    y: 0,
    y3D: 0,
    z: 0,
    rotation: 0,
    radius: 2.5
  },
  pyramid: {
    id: 'pyramid',
    name: 'Pyramid',
    is3DOnly: true,
    visible: false,
    color: '#d97706',
    fillColor: 'rgba(217, 119, 6, 0.25)',
    strokeColor: '#b45309',
    x: 0,
    y: 0,
    y3D: 0,
    z: 0,
    rotation: 0,
    baseSize: 4,
    height: 4
  },
  cone: {
    id: 'cone',
    name: 'Cone',
    is3DOnly: true,
    visible: false,
    color: '#16a34a',
    fillColor: 'rgba(22, 163, 74, 0.25)',
    strokeColor: '#15803d',
    x: 0,
    y: 0,
    y3D: 0,
    z: 0,
    rotation: 0,
    radius: 2.5,
    height: 4
  },
  torus: {
    id: 'torus',
    name: 'Torus / Donut',
    is3DOnly: true,
    visible: false,
    color: '#8b5cf6',
    fillColor: 'rgba(139, 92, 246, 0.25)',
    strokeColor: '#7c3aed',
    x: 0,
    y: 0,
    y3D: 0,
    z: 0,
    rotation: 0,
    radius: 3,
    tube: 1
  }
};

// Render order array (last item is drawn on top)
let renderOrder = ['ellipse', 'hexagon', 'pentagon', 'triangle', 'circle', 'rectangle', 'square', 'sphere', 'pyramid', 'cone', 'torus'];

// Active shape ID for Dimensions & Properties panels
let activeShapeId = 'square';

// 2D / 3D Mode & Extrusion State
let currentViewMode = '2d'; // '2d' | '3d'
let extrusionDepth = 3.0;

// Three.js State & Objects
let threeContainer = null;
let threeScene = null;
let threeCamera = null;
let threeRenderer = null;
let threeControls = null;
let threeAnimFrameId = null;
let threeShapeGroup = null;
let threeAxesGroup = null;
let threeDynamicGridGroup = null;
let threeGridHelper = null;
let threeRaycaster = null;
let threeMouse = null;
let threePointerDownPos = { x: 0, y: 0 };
let threeDragStartPos = { x: 0, y: 0, z: 0 };
let is3DDragging = false;
let is3DRotating = false;
let dragged3DShape = null;
let threeDragPlane = null;
let threePlaneIntersection = null;
let threeDragOffset = { x: 0, z: 0 };
let threeRotateStartAngle = 0;
let threeInitialShapeRot = 0;
let lastGridDist = -1;
let lastGridTarget = null;
let lastMaxSceneY = -999;
let lastMinSceneY = 999;
const numberSpriteCache = new Map();

// Infinite Grid Coordinate State (Desmos-like)
const gridState = {
  originX: 0,       // screen pixel X of math (0,0)
  originY: 0,       // screen pixel Y of math (0,0)
  scale: 40,        // pixels per math unit (default 40px)
  isPanning: false,
  panStartX: 0,
  panStartY: 0,
  initialOriginX: 0,
  initialOriginY: 0,
  isDraggingShape: false,
  isRotatingShape: false,
  isResizingShape: false,
  resizeHandleId: null,
  resizeInitialShape: null,
  resizeInitialLocal: { x: 0, y: 0 },
  resizeInitialDist: 1,
  draggedShape: null,
  shapeDragOffsetMathX: 0,
  shapeDragOffsetMathY: 0
};

// DOM References
let canvas = null;
let ctx = null;

// --- Initialize App ---
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function initApp() {
  initCanvas();
  initPanAndZoomEvents();
  initShapeSelectorPanel();
  initGridControls();
  initViewModeToggle();
  initHashRouting();
  renderAllPanels();
  render();
}

// --- Coordinate Conversions ---
function toScreenX(mathX) {
  return gridState.originX + mathX * gridState.scale;
}

function toScreenY(mathY) {
  return gridState.originY - mathY * gridState.scale;
}

function toMathX(screenX) {
  return (screenX - gridState.originX) / gridState.scale;
}

function toMathY(screenY) {
  return (gridState.originY - screenY) / gridState.scale;
}

function getShapeHalfExtents(shape) {
  let halfW = 20;
  let halfH = 20;
  if (!shape) return { halfW, halfH };

  if (shape.id === 'square') {
    halfW = (shape.side * gridState.scale) / 2 + 6;
    halfH = halfW;
  } else if (shape.id === 'rectangle') {
    halfW = (shape.width * gridState.scale) / 2 + 6;
    halfH = (shape.length * gridState.scale) / 2 + 6;
  } else if (shape.id === 'circle') {
    halfW = (shape.radius * gridState.scale) + 6;
    halfH = halfW;
  } else if (shape.id === 'ellipse') {
    halfW = (shape.radiusX * gridState.scale) + 6;
    halfH = (shape.radiusY * gridState.scale) + 6;
  } else if (shape.id === 'triangle') {
    const verts = getTriangleVertices(shape);
    let maxDX = 0;
    let maxDY = 0;
    verts.forEach(v => {
      maxDX = Math.max(maxDX, Math.abs(v.x - shape.x));
      maxDY = Math.max(maxDY, Math.abs(v.y - shape.y));
    });
    halfW = Math.max(20, maxDX * gridState.scale + 6);
    halfH = Math.max(20, maxDY * gridState.scale + 6);
  } else if (shape.id === 'pentagon') {
    const R = (shape.side / (2 * Math.sin(Math.PI / 5))) * gridState.scale;
    halfW = R + 6;
    halfH = R + 6;
  } else if (shape.id === 'hexagon') {
    const R = shape.side * gridState.scale;
    halfW = R + 6;
    halfH = R + 6;
  } else {
    halfW = ((shape.side || 4) * gridState.scale) + 8;
    halfH = halfW;
  }
  return { halfW, halfH };
}

function getShapeResizeHandles(shape) {
  if (!shape || shape.is3DOnly) return [];
  const { halfW, halfH } = getShapeHalfExtents(shape);
  return [
    { id: 'nw', x: -halfW, y: -halfH, cursor: 'nwse-resize' },
    { id: 'n',  x: 0,      y: -halfH, cursor: 'ns-resize' },
    { id: 'ne', x: halfW,  y: -halfH, cursor: 'nesw-resize' },
    { id: 'e',  x: halfW,  y: 0,      cursor: 'ew-resize' },
    { id: 'se', x: halfW,  y: halfH,  cursor: 'nwse-resize' },
    { id: 's',  x: 0,      y: halfH,  cursor: 'ns-resize' },
    { id: 'sw', x: -halfW, y: halfH,  cursor: 'nesw-resize' },
    { id: 'w',  x: -halfW, y: 0,      cursor: 'ew-resize' }
  ];
}

function screenToShapeLocalCoords(shape, screenX, screenY) {
  const cx = toScreenX(shape.x);
  const cy = toScreenY(shape.y);
  const dx = screenX - cx;
  const dy = screenY - cy;
  const rot = shape.rotation || 0;
  const cosR = Math.cos(-rot);
  const sinR = Math.sin(-rot);
  return {
    localX: dx * cosR - dy * sinR,
    localY: dx * sinR + dy * cosR
  };
}

function isRotationHandleClicked(shape, screenX, screenY, hitRadius = 14) {
  if (!shape || !shape.visible || shape.is3DOnly) return false;
  const { halfH } = getShapeHalfExtents(shape);
  const { localX, localY } = screenToShapeLocalCoords(shape, screenX, screenY);
  return Math.hypot(localX - 0, localY - (-halfH - 24)) <= hitRadius;
}

function getResizeHandleAtScreenCoords(shape, screenX, screenY, hitRadius = 10) {
  if (!shape || !shape.visible || shape.is3DOnly) return null;
  const { localX, localY } = screenToShapeLocalCoords(shape, screenX, screenY);
  const handles = getShapeResizeHandles(shape);
  for (const h of handles) {
    if (Math.hypot(localX - h.x, localY - h.y) <= hitRadius) {
      return h;
    }
  }
  return null;
}

function applyShapeResize(shape, screenX, screenY) {
  if (!shape || !gridState.resizeHandleId) return;
  const { localX, localY } = screenToShapeLocalCoords(shape, screenX, screenY);
  const hId = gridState.resizeHandleId;
  const initShape = gridState.resizeInitialShape;
  if (!initShape) return;
  const initDist = gridState.resizeInitialDist || 1;
  const currDist = Math.max(1, Math.hypot(localX, localY));
  const ratio = currDist / initDist;

  switch (shape.id) {
    case 'square': {
      let newSide = shape.side;
      if (hId === 'e' || hId === 'w') {
        newSide = (Math.abs(localX) * 2) / gridState.scale;
      } else if (hId === 'n' || hId === 's') {
        newSide = (Math.abs(localY) * 2) / gridState.scale;
      } else {
        newSide = (Math.max(Math.abs(localX), Math.abs(localY)) * 2) / gridState.scale;
      }
      shape.side = Math.max(0.1, Math.round(newSide * 100) / 100);
      break;
    }
    case 'rectangle': {
      if (hId === 'e' || hId === 'w') {
        shape.width = Math.max(0.1, Math.round(((Math.abs(localX) * 2) / gridState.scale) * 100) / 100);
      } else if (hId === 'n' || hId === 's') {
        shape.length = Math.max(0.1, Math.round(((Math.abs(localY) * 2) / gridState.scale) * 100) / 100);
      } else {
        shape.width = Math.max(0.1, Math.round(((Math.abs(localX) * 2) / gridState.scale) * 100) / 100);
        shape.length = Math.max(0.1, Math.round(((Math.abs(localY) * 2) / gridState.scale) * 100) / 100);
      }
      break;
    }
    case 'circle': {
      let newRadius = shape.radius;
      if (hId === 'e' || hId === 'w') {
        newRadius = Math.abs(localX) / gridState.scale;
      } else if (hId === 'n' || hId === 's') {
        newRadius = Math.abs(localY) / gridState.scale;
      } else {
        newRadius = initShape.radius * ratio;
      }
      shape.radius = Math.max(0.1, Math.round(newRadius * 100) / 100);
      break;
    }
    case 'ellipse': {
      if (hId === 'e' || hId === 'w') {
        shape.radiusX = Math.max(0.1, Math.round((Math.abs(localX) / gridState.scale) * 100) / 100);
      } else if (hId === 'n' || hId === 's') {
        shape.radiusY = Math.max(0.1, Math.round((Math.abs(localY) / gridState.scale) * 100) / 100);
      } else {
        const initLocal = gridState.resizeInitialLocal;
        const ratioX = Math.abs(initLocal.x) > 1 ? Math.abs(localX) / Math.abs(initLocal.x) : ratio;
        const ratioY = Math.abs(initLocal.y) > 1 ? Math.abs(localY) / Math.abs(initLocal.y) : ratio;
        shape.radiusX = Math.max(0.1, Math.round((initShape.radiusX * ratioX) * 100) / 100);
        shape.radiusY = Math.max(0.1, Math.round((initShape.radiusY * ratioY) * 100) / 100);
      }
      break;
    }
    case 'triangle': {
      const safeRatio = Math.max(0.05, ratio);
      shape.sideA = Math.max(0.1, Math.round((initShape.sideA * safeRatio) * 100) / 100);
      shape.sideB = Math.max(0.1, Math.round((initShape.sideB * safeRatio) * 100) / 100);
      shape.sideC = Math.max(0.1, Math.round((initShape.sideC * safeRatio) * 100) / 100);
      break;
    }
    case 'pentagon':
    case 'hexagon': {
      const safeRatio = Math.max(0.05, ratio);
      shape.side = Math.max(0.1, Math.round((initShape.side * safeRatio) * 100) / 100);
      break;
    }
  }

  render();
  updateDimensionsPanelValues();
  renderPropertiesPanel();
}

function getRotationHandleScreenCoords(shape) {
  if (!shape) return { x: 0, y: 0 };
  const { halfH } = getShapeHalfExtents(shape);
  const stem = 24;
  const dist = halfH + stem;
  const sx = toScreenX(shape.x);
  const sy = toScreenY(shape.y);
  const rot = shape.rotation || 0;
  return {
    x: sx + Math.sin(rot) * dist,
    y: sy - Math.cos(rot) * dist
  };
}

function getShapeBoundingRadius(shape) {
  if (!shape) return 2.0;
  switch (shape.id) {
    case 'square': return (shape.side * Math.SQRT2) / 2;
    case 'rectangle': return Math.hypot(shape.width, shape.length) / 2;
    case 'circle': return shape.radius;
    case 'ellipse': return Math.max(shape.radiusX, shape.radiusY);
    case 'triangle': return Math.max(shape.sideA, shape.sideB, shape.sideC) / 1.5;
    case 'pentagon': return shape.side * 0.85;
    case 'hexagon': return shape.side;
    case 'sphere': return shape.radius;
    case 'pyramid': return Math.max(shape.baseSize / 1.4, shape.height);
    case 'cone': return Math.max(shape.radius, shape.height);
    case 'torus': return shape.radius + shape.tube;
    default: return 2.5;
  }
}

// --- Canvas Setup & Resizing ---
function initCanvas() {
  canvas = document.getElementById('geometryCanvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', onWindowResize);
}

function resizeCanvas() {
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Initialize origin to screen center if not set yet
  if (gridState.originX === 0 && gridState.originY === 0) {
    gridState.originX = width / 2;
    gridState.originY = height / 2;
  }
}

function onWindowResize() {
  const oldWidth = canvas ? canvas.clientWidth : window.innerWidth;
  const oldHeight = canvas ? canvas.clientHeight : window.innerHeight;
  resizeCanvas();
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  // Preserve relative origin position on resize
  if (oldWidth > 0 && oldHeight > 0) {
    const relX = gridState.originX / oldWidth;
    const relY = gridState.originY / oldHeight;
    gridState.originX = relX * newWidth;
    gridState.originY = relY * newHeight;
  }
  render();
}

// --- Infinite Grid Pan & Zoom Events ---
function initPanAndZoomEvents() {
  if (!canvas) return;

  // Mouse Wheel Zoom centered on cursor
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    const mathX = toMathX(sx);
    const mathY = toMathY(sy);

    // Zoom factor: 1.12 for zooming in, 1/1.12 for zooming out
    const zoomFactor = e.deltaY < 0 ? 1.12 : (1 / 1.12);
    const newScale = Math.max(0.0001, Math.min(20000, gridState.scale * zoomFactor));

    // Keep point under cursor stationary
    gridState.originX = sx - mathX * newScale;
    gridState.originY = sy + mathY * newScale;
    gridState.scale = newScale;

    render();
  }, { passive: false });

  // Mouse Down
  canvas.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // Only left click
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    const mx = toMathX(sx);
    const my = toMathY(sy);

    // 1. Check if clicked on rotation handle of the active shape
    const activeShape = activeShapeId ? SHAPES[activeShapeId] : null;
    if (activeShape && activeShape.visible && !activeShape.is3DOnly) {
      if (isRotationHandleClicked(activeShape, sx, sy)) {
        gridState.isRotatingShape = true;
        gridState.draggedShape = activeShape;
        canvas.classList.add('rotating-shape');
        return;
      }

      // 2. Check if clicked on resize handle of the active shape
      const hitHandle = getResizeHandleAtScreenCoords(activeShape, sx, sy);
      if (hitHandle) {
        gridState.isResizingShape = true;
        gridState.draggedShape = activeShape;
        gridState.resizeHandleId = hitHandle.id;
        const { localX, localY } = screenToShapeLocalCoords(activeShape, sx, sy);
        gridState.resizeInitialLocal = { x: localX, y: localY };
        gridState.resizeInitialDist = Math.max(1, Math.hypot(localX, localY));
        gridState.resizeInitialShape = JSON.parse(JSON.stringify(activeShape));
        canvas.style.cursor = hitHandle.cursor;
        return;
      }
    }

    // 3. Check if clicked on a visible shape (top-most first)
    const hitShape = getShapeAtMathCoords(mx, my);

    if (hitShape) {
      bringShapeToFront(hitShape.id);
      setActiveShape(hitShape.id);

      if (e.shiftKey) {
        gridState.isRotatingShape = true;
        gridState.draggedShape = hitShape;
        canvas.classList.add('rotating-shape');
      } else {
        gridState.isDraggingShape = true;
        gridState.draggedShape = hitShape;
        gridState.shapeDragOffsetMathX = mx - hitShape.x;
        gridState.shapeDragOffsetMathY = my - hitShape.y;
        canvas.classList.add('dragging-shape');
      }
      render();
      renderAllPanels();
    } else {
      // Background pan
      gridState.isPanning = true;
      gridState.panStartX = sx;
      gridState.panStartY = sy;
      gridState.initialOriginX = gridState.originX;
      gridState.initialOriginY = gridState.originY;
      canvas.classList.add('panning');
    }
  });

  // Mouse Move
  window.addEventListener('mousemove', (e) => {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    const mx = toMathX(sx);
    const my = toMathY(sy);

    // Update cursor readout
    updateCoordsReadout(mx, my);

    if (gridState.isResizingShape && gridState.draggedShape) {
      applyShapeResize(gridState.draggedShape, sx, sy);
    } else if (gridState.isRotatingShape && gridState.draggedShape) {
      const shape = gridState.draggedShape;
      const centerSx = toScreenX(shape.x);
      const centerSy = toScreenY(shape.y);
      const angle = Math.atan2(sx - centerSx, -(sy - centerSy));
      shape.rotation = angle;
      canvas.style.cursor = 'crosshair';
      render();
      renderPropertiesPanel();
    } else if (gridState.isDraggingShape && gridState.draggedShape) {
      gridState.draggedShape.x = mx - gridState.shapeDragOffsetMathX;
      gridState.draggedShape.y = my - gridState.shapeDragOffsetMathY;
      canvas.style.cursor = 'move';
      render();
      updateDimensionsPanelValues();
    } else if (gridState.isPanning) {
      const dx = sx - gridState.panStartX;
      const dy = sy - gridState.panStartY;
      gridState.originX = gridState.initialOriginX + dx;
      gridState.originY = gridState.initialOriginY + dy;
      render();
    } else {
      // Hover feedback
      const activeShape = activeShapeId ? SHAPES[activeShapeId] : null;
      if (activeShape && activeShape.visible && !activeShape.is3DOnly) {
        if (isRotationHandleClicked(activeShape, sx, sy)) {
          canvas.style.cursor = 'crosshair';
          return;
        }
        const hitHandle = getResizeHandleAtScreenCoords(activeShape, sx, sy);
        if (hitHandle) {
          canvas.style.cursor = hitHandle.cursor;
          return;
        }
      }
      const hitShape = getShapeAtMathCoords(mx, my);
      if (hitShape) {
        canvas.style.cursor = e.shiftKey ? 'crosshair' : 'move';
      } else {
        canvas.style.cursor = 'grab';
      }
    }
  });

  // Mouse Up
  window.addEventListener('mouseup', () => {
    if (gridState.isResizingShape) {
      gridState.isResizingShape = false;
      gridState.draggedShape = null;
      gridState.resizeHandleId = null;
      gridState.resizeInitialShape = null;
      updateDimensionsPanelValues();
      renderPropertiesPanel();
    }
    if (gridState.isDraggingShape) {
      gridState.isDraggingShape = false;
      gridState.draggedShape = null;
      if (canvas) canvas.classList.remove('dragging-shape');
    }
    if (gridState.isRotatingShape) {
      gridState.isRotatingShape = false;
      gridState.draggedShape = null;
      if (canvas) canvas.classList.remove('rotating-shape');
    }
    if (gridState.isPanning) {
      gridState.isPanning = false;
      if (canvas) canvas.classList.remove('panning');
    }
  });

  // Touch Support
  let touchStartDist = 0;
  let touchStartScale = 40;

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const sx = touch.clientX - rect.left;
      const sy = touch.clientY - rect.top;
      const mx = toMathX(sx);
      const my = toMathY(sy);

      const activeShape = activeShapeId ? SHAPES[activeShapeId] : null;
      if (activeShape && activeShape.visible && !activeShape.is3DOnly) {
        if (isRotationHandleClicked(activeShape, sx, sy, 22)) {
          gridState.isRotatingShape = true;
          gridState.draggedShape = activeShape;
          return;
        }
        const hitHandle = getResizeHandleAtScreenCoords(activeShape, sx, sy, 18);
        if (hitHandle) {
          gridState.isResizingShape = true;
          gridState.draggedShape = activeShape;
          gridState.resizeHandleId = hitHandle.id;
          const { localX, localY } = screenToShapeLocalCoords(activeShape, sx, sy);
          gridState.resizeInitialLocal = { x: localX, y: localY };
          gridState.resizeInitialDist = Math.max(1, Math.hypot(localX, localY));
          gridState.resizeInitialShape = JSON.parse(JSON.stringify(activeShape));
          return;
        }
      }

      const hitShape = getShapeAtMathCoords(mx, my);
      if (hitShape) {
        gridState.isDraggingShape = true;
        gridState.draggedShape = hitShape;
        gridState.shapeDragOffsetMathX = mx - hitShape.x;
        gridState.shapeDragOffsetMathY = my - hitShape.y;
        bringShapeToFront(hitShape.id);
        setActiveShape(hitShape.id);
        render();
        renderAllPanels();
      } else {
        gridState.isPanning = true;
        gridState.panStartX = sx;
        gridState.panStartY = sy;
        gridState.initialOriginX = gridState.originX;
        gridState.initialOriginY = gridState.originY;
      }
    } else if (e.touches.length === 2) {
      // Pinch to zoom
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      touchStartDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      touchStartScale = gridState.scale;
    }
    e.preventDefault();
  }, { passive: false });

  window.addEventListener('touchmove', (e) => {
    if (!canvas) return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const sx = touch.clientX - rect.left;
      const sy = touch.clientY - rect.top;
      const mx = toMathX(sx);
      const my = toMathY(sy);

      if (gridState.isResizingShape && gridState.draggedShape) {
        applyShapeResize(gridState.draggedShape, sx, sy);
      } else if (gridState.isRotatingShape && gridState.draggedShape) {
        const shape = gridState.draggedShape;
        const centerSx = toScreenX(shape.x);
        const centerSy = toScreenY(shape.y);
        shape.rotation = Math.atan2(sx - centerSx, -(sy - centerSy));
        render();
        renderPropertiesPanel();
      } else if (gridState.isDraggingShape && gridState.draggedShape) {
        gridState.draggedShape.x = mx - gridState.shapeDragOffsetMathX;
        gridState.draggedShape.y = my - gridState.shapeDragOffsetMathY;
        render();
        updateDimensionsPanelValues();
      } else if (gridState.isPanning) {
        gridState.originX = gridState.initialOriginX + (sx - gridState.panStartX);
        gridState.originY = gridState.initialOriginY + (sy - gridState.panStartY);
        render();
      }
    } else if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      if (touchStartDist > 0) {
        const factor = currentDist / touchStartDist;
        const rect = canvas.getBoundingClientRect();
        const midX = (t1.clientX + t2.clientX) / 2 - rect.left;
        const midY = (t1.clientY + t2.clientY) / 2 - rect.top;
        const mx = toMathX(midX);
        const my = toMathY(midY);
        const newScale = Math.max(0.0001, Math.min(20000, touchStartScale * factor));

        gridState.originX = midX - mx * newScale;
        gridState.originY = midY + my * newScale;
        gridState.scale = newScale;
        render();
      }
    }
  }, { passive: false });

  window.addEventListener('touchend', () => {
    gridState.isResizingShape = false;
    gridState.isDraggingShape = false;
    gridState.isRotatingShape = false;
    gridState.draggedShape = null;
    gridState.resizeHandleId = null;
    gridState.resizeInitialShape = null;
    gridState.isPanning = false;
    touchStartDist = 0;
  });
}

function updateCoordsReadout(mx, my) {
  const readout = document.getElementById('gridCoordsReadout');
  if (readout) {
    const signX = mx >= 0 ? '+' : '';
    const signY = my >= 0 ? '+' : '';
    readout.textContent = `(${signX}${mx.toFixed(2)}, ${signY}${my.toFixed(2)})`;
  }
}

// --- Shape Selector Panel Controls (Top-Left) ---
function initShapeSelectorPanel() {
  const shapeIds = Object.keys(SHAPES);
  shapeIds.forEach((id) => {
    const checkbox = document.getElementById(`check_${id}`);
    const itemLabel = document.getElementById(`shapeItem_${id}`);

    if (checkbox) {
      checkbox.checked = SHAPES[id].visible;
      checkbox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        SHAPES[id].visible = isChecked;

        if (isChecked) {
          // When a checkbox is ticked, shape appears at center (0,0)
          SHAPES[id].x = 0;
          SHAPES[id].y = 0;
          bringShapeToFront(id);
          setActiveShape(id);
        } else {
          // If the unchecked shape was active, pick another visible shape
          if (activeShapeId === id) {
            const nextVisible = renderOrder.slice().reverse().find(sid => {
              if (currentViewMode === '2d' && SHAPES[sid].is3DOnly) return false;
              return SHAPES[sid].visible;
            });
            setActiveShape(nextVisible || null);
          }
        }
        updateShapeCountBadge();
        renderAllPanels();
        render();
      });
    }

    if (itemLabel) {
      itemLabel.addEventListener('click', (e) => {
        // If clicking label outside the checkbox, select it as active
        if (e.target !== checkbox) {
          if (SHAPES[id].visible) {
            setActiveShape(id);
            renderAllPanels();
            render();
          }
        }
      });
    }
  });

  updateShapeCountBadge();
}

function updateShapeCountBadge() {
  const badge = document.getElementById('shapeCountBadge');
  if (!badge) return;
  const count = Object.values(SHAPES).filter(s => {
    if (currentViewMode === '2d' && s.is3DOnly) return false;
    return s.visible;
  }).length;
  badge.textContent = `${count} on grid`;
}

function bringShapeToFront(shapeId) {
  const index = renderOrder.indexOf(shapeId);
  if (index !== -1) {
    renderOrder.splice(index, 1);
    renderOrder.push(shapeId);
  }
}

function setActiveShape(shapeId) {
  activeShapeId = shapeId;

  // Highlight active shape in selector
  Object.keys(SHAPES).forEach(id => {
    const item = document.getElementById(`shapeItem_${id}`);
    if (item) {
      if (id === activeShapeId) {
        item.classList.add('active-selected');
      } else {
        item.classList.remove('active-selected');
      }
    }
  });

  renderAllPanels();
}

// --- 2D / 3D Mode Toggle & 3D Toolbar Controls ---
function initViewModeToggle() {
  const btn2D = document.getElementById('btnMode2D');
  const btn3D = document.getElementById('btnMode3D');

  if (btn2D) {
    btn2D.addEventListener('click', () => setViewMode('2d'));
  }
  if (btn3D) {
    btn3D.addEventListener('click', () => setViewMode('3d'));
  }

  init3DControlsUI();
}

function init3DControlsUI() {
  const slider = document.getElementById('geoUiSizeSlider');
  const valLabel = document.getElementById('geoUiSizeVal');
  const btnMin = document.getElementById('btnMinimize3D');
  const btnRestore = document.getElementById('btnRestore3D');

  // 1. UI Size Slider (50% to 100%, default 75%)
  if (slider) {
    slider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10) || 75;
      const scale = val / 100;
      document.documentElement.style.setProperty('--geo-ui-scale', scale);
      if (valLabel) valLabel.textContent = `${val}%`;
    });
  }

  // 2. Global Minimize / Restore Toggle
  const toggleGlobalMinimize = (forceState) => {
    const isMin = typeof forceState === 'boolean'
      ? forceState
      : !document.body.classList.contains('geo-3d-minimized');

    if (isMin) {
      document.body.classList.add('geo-3d-minimized');
      if (btnRestore) btnRestore.style.display = 'inline-flex';
      if (btnMin) {
        const textSpan = btnMin.querySelector('.mini-text');
        const iconSpan = btnMin.querySelector('.mini-icon');
        if (textSpan) textSpan.textContent = 'Restore';
        if (iconSpan) iconSpan.textContent = '+';
      }
    } else {
      document.body.classList.remove('geo-3d-minimized');
      if (btnRestore) btnRestore.style.display = 'none';
      if (btnMin) {
        const textSpan = btnMin.querySelector('.mini-text');
        const iconSpan = btnMin.querySelector('.mini-icon');
        if (textSpan) textSpan.textContent = 'Minimize';
        if (iconSpan) iconSpan.textContent = '−';
      }
    }
  };

  if (btnMin) {
    btnMin.addEventListener('click', () => toggleGlobalMinimize());
  }
  if (btnRestore) {
    btnRestore.addEventListener('click', () => toggleGlobalMinimize(false));
  }

  // 3. External Arrow Toggle Tabs for UI panels
  const panelToggleConfigs = [
    { btnId: 'btnToggleShapeSelector', name: 'Shapes' },
    { btnId: 'btnToggleDimensions', name: 'Dimensions' },
    { btnId: 'btnToggleProperties', name: 'Properties' },
  ];

  panelToggleConfigs.forEach(({ btnId, name }) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const panel = btn.closest('.floating-glass-panel');
        if (panel) {
          const isClosed = panel.classList.toggle('panel-minimized');
          btn.setAttribute('aria-expanded', isClosed ? 'false' : 'true');
          btn.title = isClosed ? `Open ${name} Panel` : `Close ${name} Panel`;
        }
      });
    }
  });
}

function setViewMode(mode) {
  if (currentViewMode === mode) return;
  currentViewMode = mode;

  const btn2D = document.getElementById('btnMode2D');
  const btn3D = document.getElementById('btnMode3D');
  const shapes3dSec = document.getElementById('shapes3dSection');
  const canvasEl = document.getElementById('geometryCanvas');
  const container3d = document.getElementById('threeJsContainer');
  const toolbar3D = document.getElementById('geo3DToolbar');
  const restore3D = document.getElementById('btnRestore3D');

  if (mode === '3d') {
    document.body.classList.add('mode-3d');
    if (btn2D) btn2D.classList.remove('active');
    if (btn3D) btn3D.classList.add('active');
    if (shapes3dSec) shapes3dSec.style.display = 'block';
    if (canvasEl) canvasEl.style.display = 'none';
    if (container3d) container3d.style.display = 'block';
    if (toolbar3D) toolbar3D.style.display = 'inline-flex';

    // Switching from 2D to 3D preserves existing 2D shapes as flat 2D base geometry
    // and lets the user explicitly decide what 3D object to construct.
    Object.values(SHAPES).forEach(s => {
      if (!s.is3DOnly && !s.solid3DType) {
        s.solid3DType = 'flat';
      }
    });

    initThreeScene();
    rebuildThreeShapes();
  } else {
    document.body.classList.remove('mode-3d');
    document.body.classList.remove('geo-3d-minimized');
    if (btn2D) btn2D.classList.add('active');
    if (btn3D) btn3D.classList.remove('active');
    if (shapes3dSec) shapes3dSec.style.display = 'none';
    if (canvasEl) canvasEl.style.display = 'block';
    if (container3d) container3d.style.display = 'none';
    if (toolbar3D) toolbar3D.style.display = 'none';
    if (restore3D) restore3D.style.display = 'none';

    // If active shape is a 3D-only shape, switch to a 2D shape
    if (activeShapeId && SHAPES[activeShapeId] && SHAPES[activeShapeId].is3DOnly) {
      const next2D = renderOrder.slice().reverse().find(sid => !SHAPES[sid].is3DOnly && SHAPES[sid].visible);
      setActiveShape(next2D || 'square');
    }

    disposeThreeScene();
    resizeCanvas();
    render();
  }

  updateShapeCountBadge();
  renderAllPanels();
}

function initDepthSlider() {
  // Depth slider was replaced by number input in Dimensions panel
}

// --- Floating Grid Controls (Zoom & Reset) ---
function initGridControls() {
  const btnZoomIn = document.getElementById('geoZoomInBtn');
  const btnZoomOut = document.getElementById('geoZoomOutBtn');
  const btnReset = document.getElementById('geoResetViewBtn');

  if (btnZoomIn) {
    btnZoomIn.addEventListener('click', () => {
      zoomByCenter(1.25);
    });
  }

  if (btnZoomOut) {
    btnZoomOut.addEventListener('click', () => {
      zoomByCenter(0.8);
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      resetGridOrigin();
    });
  }
}

function zoomByCenter(factor) {
  if (currentViewMode === '3d') {
    if (threeCamera && threeControls) {
      const dir = new THREE.Vector3().subVectors(threeCamera.position, threeControls.target);
      dir.multiplyScalar(factor > 1 ? 0.8 : 1.25);
      threeCamera.position.copy(threeControls.target).add(dir);
      threeControls.update();
    }
    return;
  }

  if (!canvas) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const centerX = width / 2;
  const centerY = height / 2;
  const mathX = toMathX(centerX);
  const mathY = toMathY(centerY);

  const newScale = Math.max(0.0001, Math.min(20000, gridState.scale * factor));
  gridState.originX = centerX - mathX * newScale;
  gridState.originY = centerY + mathY * newScale;
  gridState.scale = newScale;
  render();
}

function resetGridOrigin() {
  if (currentViewMode === '3d') {
    if (threeCamera && threeControls) {
      threeCamera.position.set(14, 12, 18);
      threeControls.target.set(0, 2, 0);
      threeControls.update();
    }
    return;
  }

  if (!canvas) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  gridState.originX = width / 2;
  gridState.originY = height / 2;
  gridState.scale = 40;
  render();
}

// --- Three.js 3D WebGL Scene Engine ---
function initThreeScene() {
  threeContainer = document.getElementById('threeJsContainer');
  if (!threeContainer) return;

  if (threeRenderer) {
    disposeThreeScene();
  }

  // 1. Scene setup with light gray viewport background
  threeScene = new THREE.Scene();
  threeScene.background = new THREE.Color(0xf0f2f5);

  // 2. Camera setup
  const aspect = window.innerWidth / window.innerHeight;
  threeCamera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
  threeCamera.position.set(14, 12, 18);

  // 3. WebGL Renderer
  threeRenderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  threeRenderer.setSize(window.innerWidth, window.innerHeight);
  threeRenderer.shadowMap.enabled = true;
  threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
  threeContainer.appendChild(threeRenderer.domElement);

  // 4. OrbitControls (360-degree rotation, zoom, pan)
  threeControls = new OrbitControls(threeCamera, threeRenderer.domElement);
  threeControls.target.set(0, 2, 0);
  threeControls.enableDamping = true;
  threeControls.dampingFactor = 0.05;
  threeControls.maxPolarAngle = Math.PI; // Full 360 rotation
  threeControls.minDistance = 2;
  threeControls.maxDistance = 600;
  threeControls.update();

  // 5. Lighting: Soft ambient + directional light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  threeScene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.95);
  dirLight.position.set(16, 26, 20);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  threeScene.add(dirLight);

  const secondaryLight = new THREE.DirectionalLight(0xffffff, 0.25);
  secondaryLight.position.set(-16, -10, -16);
  threeScene.add(secondaryLight);

  // 6. Dynamic Infinite 3D Floor Grid on X-Z plane at Y=0
  threeDynamicGridGroup = new THREE.Group();
  threeScene.add(threeDynamicGridGroup);

  // 7. Dynamic Colored Axis Lines from origin with tips & labels
  threeAxesGroup = new THREE.Group();
  threeScene.add(threeAxesGroup);

  lastGridTarget = new THREE.Vector3(9999, 9999, 9999);
  updateDynamicThreeGrid(true);

  threeControls.addEventListener('change', () => {
    updateDynamicThreeGrid();
  });

  // 8. Shape Group container
  threeShapeGroup = new THREE.Group();
  threeScene.add(threeShapeGroup);

  // 9. Raycasting & Interaction Setup (Drag, Rotate, Select)
  threeRaycaster = new THREE.Raycaster();
  threeMouse = new THREE.Vector2();
  threeDragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  threePlaneIntersection = new THREE.Vector3();

  initThreeInteraction();

  // 10. Start Animation Loop
  threeAnimate();
}

function threeAnimate() {
  threeAnimFrameId = requestAnimationFrame(threeAnimate);
  if (threeControls) threeControls.update();
  if (currentViewMode === '3d') {
    updateDynamicThreeGrid();
  }
  if (threeRenderer && threeScene && threeCamera) {
    threeRenderer.render(threeScene, threeCamera);
  }
}

function getCachedNumberSprite(num, colorHex) {
  const key = `${num}_${colorHex}`;
  let texture = numberSpriteCache.get(key);
  if (!texture) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 256, 128);

    ctx.font = 'bold 52px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // White outline halo for high contrast against any geometry or grid line
    ctx.lineWidth = 7;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.strokeText(String(num), 128, 64);

    // Colored text fill
    ctx.fillStyle = colorHex || '#475569';
    ctx.fillText(String(num), 128, 64);

    texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    numberSpriteCache.set(key, texture);
  }
  const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(1.1, 0.55, 1);
  return sprite;
}

function updateDynamicThreeGrid(force = false) {
  if (!threeCamera || !threeControls || !threeDynamicGridGroup || !threeAxesGroup) return;

  const camDist = threeCamera.position.distanceTo(threeControls.target);
  const target = threeControls.target;

  // Calculate maximum top and bottom Y among all visible 3D shapes
  let maxSceneY = 0;
  let minSceneY = 0;
  if (typeof SHAPES === 'object' && SHAPES !== null) {
    Object.values(SHAPES).forEach(s => {
      if (!s.visible) return;
      const b = getShape3DBoundsAnalytical(s);
      if (b.worldMaxY > maxSceneY) maxSceneY = b.worldMaxY;
      if (b.worldMinY < minSceneY) minSceneY = b.worldMinY;
    });
  }

  // Throttle updates unless camera distance, target, or shape height has changed noticeably
  const sceneYDelta = Math.abs(maxSceneY - lastMaxSceneY) + Math.abs(minSceneY - lastMinSceneY);
  if (!force && lastGridDist > 0 && lastGridTarget) {
    const distDelta = Math.abs(camDist - lastGridDist);
    const targetDelta = target.distanceTo(lastGridTarget);
    if (distDelta < Math.max(0.8, camDist * 0.04) && targetDelta < 1.0 && sceneYDelta < 0.2) {
      return;
    }
  }

  lastGridDist = camDist;
  lastMaxSceneY = maxSceneY;
  lastMinSceneY = minSceneY;
  if (!lastGridTarget) lastGridTarget = new THREE.Vector3();
  lastGridTarget.copy(target);

  // 1. Calculate adaptive minor and major intervals using 1-2-5 scale
  const roughStep = Math.max(0.2, camDist / 25);
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const ratio = roughStep / magnitude;

  let minorStep = magnitude;
  if (ratio < 1.5) minorStep = 1 * magnitude;
  else if (ratio < 3.5) minorStep = 2 * magnitude;
  else if (ratio < 7.5) minorStep = 5 * magnitude;
  else minorStep = 10 * magnitude;

  if (minorStep < 1 && camDist > 10) minorStep = 1;
  else if (minorStep < 0.5) minorStep = 0.5;

  // Major step is a clean 5x multiple (or 10 for 2)
  let majorStep = minorStep === 2 ? 10 : (minorStep === 0.5 ? 2.5 : minorStep * 5);

  // 2. Screen-space distance calculation to prevent label collision
  const vFovRad = (threeCamera.fov * Math.PI) / 180;
  const viewportH = (threeRenderer && threeRenderer.domElement && threeRenderer.domElement.clientHeight) || window.innerHeight || 800;
  const pixelsPerUnit = viewportH / (2 * camDist * Math.tan(vFovRad / 2));

  // Determine label step ensuring >= 50-70px screen distance between adjacent labels
  const minLabelScreenPx = 52;
  const labelCandidates = [minorStep, minorStep * 2, majorStep, majorStep * 2, majorStep * 5, majorStep * 10, majorStep * 20];
  let labelStep = majorStep;
  for (const cand of labelCandidates) {
    if (cand * pixelsPerUnit >= minLabelScreenPx) {
      labelStep = cand;
      break;
    }
  }

  // 3. Grid extent expanding to infinity with zoom
  const extent = Math.max(50, Math.ceil((camDist * 2.8) / majorStep) * majorStep);
  const axisLen = extent;

  // Y-axis extends dynamically above the tallest object with a comfortable margin
  const yMargin = Math.max(4.0, maxSceneY * 0.18);
  const yAxisTop = Math.max(axisLen, maxSceneY + yMargin);
  const yNegMargin = Math.max(4.0, Math.abs(minSceneY) * 0.18);
  const yAxisBottom = Math.min(-axisLen, minSceneY - yNegMargin);

  // Clear existing dynamic grid lines and axis elements
  while (threeDynamicGridGroup.children.length > 0) {
    const child = threeDynamicGridGroup.children[0];
    threeDynamicGridGroup.remove(child);
    disposeThreeObject(child);
  }
  while (threeAxesGroup.children.length > 0) {
    const child = threeAxesGroup.children[0];
    threeAxesGroup.remove(child);
    disposeThreeObject(child);
  }

  // --- Dynamic Grid Lines on Y=0 plane (Clear Major/Minor Hierarchy) ---
  const minorPoints = [];
  const majorPoints = [];

  for (let x = -extent; x <= extent; x += minorStep) {
    const isMajor = Math.abs(Math.round(x / minorStep) % Math.round(majorStep / minorStep)) === 0;
    if (isMajor) {
      majorPoints.push(new THREE.Vector3(x, 0, -extent), new THREE.Vector3(x, 0, extent));
    } else {
      minorPoints.push(new THREE.Vector3(x, 0, -extent), new THREE.Vector3(x, 0, extent));
    }
  }

  for (let z = -extent; z <= extent; z += minorStep) {
    const isMajor = Math.abs(Math.round(z / minorStep) % Math.round(majorStep / minorStep)) === 0;
    if (isMajor) {
      majorPoints.push(new THREE.Vector3(-extent, 0, z), new THREE.Vector3(extent, 0, z));
    } else {
      minorPoints.push(new THREE.Vector3(-extent, 0, z), new THREE.Vector3(extent, 0, z));
    }
  }

  if (minorPoints.length > 0) {
    const minorGeom = new THREE.BufferGeometry().setFromPoints(minorPoints);
    const minorMat = new THREE.LineBasicMaterial({ color: 0xcbd5e1, transparent: true, opacity: 0.5 });
    threeDynamicGridGroup.add(new THREE.LineSegments(minorGeom, minorMat));
  }

  if (majorPoints.length > 0) {
    const majorGeom = new THREE.BufferGeometry().setFromPoints(majorPoints);
    const majorMat = new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.85 });
    threeDynamicGridGroup.add(new THREE.LineSegments(majorGeom, majorMat));
  }

  // --- Dynamic Axis Lines (X: Red, Y: Green, Z: Blue) ---
  const axisShaftRadius = Math.max(0.045, camDist * 0.002);
  const coneRadius = Math.max(0.18, camDist * 0.008);
  const coneHeight = Math.max(0.7, camDist * 0.028);
  const axisLabelScale = Math.max(1.5, camDist * 0.055);

  const redMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const greenMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
  const blueMat = new THREE.MeshBasicMaterial({ color: 0x2563eb });

  // X Axis (Red) spanning -axisLen to +axisLen
  const geomX = new THREE.CylinderGeometry(axisShaftRadius, axisShaftRadius, 2 * axisLen, 16);
  geomX.rotateZ(-Math.PI / 2);
  threeAxesGroup.add(new THREE.Mesh(geomX, redMat));

  // +X Tip Cone & Label
  const coneGeomXPos = new THREE.ConeGeometry(coneRadius, coneHeight, 16);
  coneGeomXPos.rotateZ(-Math.PI / 2);
  coneGeomXPos.translate(axisLen + coneHeight / 2, 0, 0);
  threeAxesGroup.add(new THREE.Mesh(coneGeomXPos, redMat));
  const lblXPos = createAxisLabelSprite('+X', '#ef4444');
  lblXPos.scale.set(axisLabelScale, axisLabelScale, 1);
  lblXPos.position.set(axisLen + coneHeight + axisLabelScale * 0.5, 0, 0);
  threeAxesGroup.add(lblXPos);

  // -X Tip Cone & Label
  const coneGeomXNeg = new THREE.ConeGeometry(coneRadius, coneHeight, 16);
  coneGeomXNeg.rotateZ(Math.PI / 2);
  coneGeomXNeg.translate(-axisLen - coneHeight / 2, 0, 0);
  threeAxesGroup.add(new THREE.Mesh(coneGeomXNeg, redMat));
  const lblXNeg = createAxisLabelSprite('−X', '#ef4444');
  lblXNeg.scale.set(axisLabelScale, axisLabelScale, 1);
  lblXNeg.position.set(-axisLen - coneHeight - axisLabelScale * 0.5, 0, 0);
  threeAxesGroup.add(lblXNeg);

  // Y Axis (Green) spanning yAxisBottom to yAxisTop (Adapting dynamically to object height)
  const totalY = yAxisTop - yAxisBottom;
  const geomY = new THREE.CylinderGeometry(axisShaftRadius, axisShaftRadius, totalY, 16);
  geomY.translate(0, yAxisBottom + totalY / 2, 0);
  threeAxesGroup.add(new THREE.Mesh(geomY, greenMat));

  // +Y Tip Cone & Label
  const coneGeomYPos = new THREE.ConeGeometry(coneRadius, coneHeight, 16);
  coneGeomYPos.translate(0, yAxisTop + coneHeight / 2, 0);
  threeAxesGroup.add(new THREE.Mesh(coneGeomYPos, greenMat));
  const lblYPos = createAxisLabelSprite('+Y', '#10b981');
  lblYPos.scale.set(axisLabelScale, axisLabelScale, 1);
  lblYPos.position.set(0, yAxisTop + coneHeight + axisLabelScale * 0.5, 0);
  threeAxesGroup.add(lblYPos);

  // -Y Tip Cone & Label
  const coneGeomYNeg = new THREE.ConeGeometry(coneRadius, coneHeight, 16);
  coneGeomYNeg.rotateX(Math.PI);
  coneGeomYNeg.translate(0, yAxisBottom - coneHeight / 2, 0);
  threeAxesGroup.add(new THREE.Mesh(coneGeomYNeg, greenMat));
  const lblYNeg = createAxisLabelSprite('−Y', '#10b981');
  lblYNeg.scale.set(axisLabelScale, axisLabelScale, 1);
  lblYNeg.position.set(0, yAxisBottom - coneHeight - axisLabelScale * 0.5, 0);
  threeAxesGroup.add(lblYNeg);

  // Z Axis (Blue) spanning -axisLen to +axisLen
  const geomZ = new THREE.CylinderGeometry(axisShaftRadius, axisShaftRadius, 2 * axisLen, 16);
  geomZ.rotateX(Math.PI / 2);
  threeAxesGroup.add(new THREE.Mesh(geomZ, blueMat));

  // +Z Tip Cone & Label
  const coneGeomZPos = new THREE.ConeGeometry(coneRadius, coneHeight, 16);
  coneGeomZPos.rotateX(Math.PI / 2);
  coneGeomZPos.translate(0, 0, axisLen + coneHeight / 2);
  threeAxesGroup.add(new THREE.Mesh(coneGeomZPos, blueMat));
  const lblZPos = createAxisLabelSprite('+Z', '#2563eb');
  lblZPos.scale.set(axisLabelScale, axisLabelScale, 1);
  lblZPos.position.set(0, 0, axisLen + coneHeight + axisLabelScale * 0.5);
  threeAxesGroup.add(lblZPos);

  // -Z Tip Cone & Label
  const coneGeomZNeg = new THREE.ConeGeometry(coneRadius, coneHeight, 16);
  coneGeomZNeg.rotateX(-Math.PI / 2);
  coneGeomZNeg.translate(0, 0, -axisLen - coneHeight / 2);
  threeAxesGroup.add(new THREE.Mesh(coneGeomZNeg, blueMat));
  const lblZNeg = createAxisLabelSprite('−Z', '#2563eb');
  lblZNeg.scale.set(axisLabelScale, axisLabelScale, 1);
  lblZNeg.position.set(0, 0, -axisLen - coneHeight - axisLabelScale * 0.5);
  threeAxesGroup.add(lblZNeg);

  // --- Dynamic Numbered Tick Marks & Labels on All 3 Axes ---
  // Major ticks are visibly stronger/larger (2.8x) than minor ticks
  const minorTickArm = Math.max(0.14, Math.min(0.4, camDist * 0.009));
  const majorTickArm = Math.max(0.38, minorTickArm * 2.8);

  // Scale of numeric sprites dynamically maintains ~24px screen height for clarity
  const labelWorldH = Math.max(0.35, 24 / Math.max(1, pixelsPerUnit));
  const labelWorldW = labelWorldH * 2.0;

  // Origin Marker Label
  const originSprite = getCachedNumberSprite('0', '#475569');
  originSprite.scale.set(labelWorldW, labelWorldH, 1);
  originSprite.position.set(majorTickArm + labelWorldW * 0.45, 0.05, majorTickArm + labelWorldH * 0.85);
  threeAxesGroup.add(originSprite);

  // X Axis Ticks & Numbers (-axisLen to +axisLen)
  const minorTickPointsX = [];
  const majorTickPointsX = [];
  const startX = Math.ceil(-axisLen / minorStep) * minorStep;
  for (let i = startX; i <= axisLen; i += minorStep) {
    if (Math.abs(i) < 0.001) continue;
    const isMajor = Math.abs(Math.round(i / minorStep) % Math.round(majorStep / minorStep)) === 0;
    const arm = isMajor ? majorTickArm : minorTickArm;
    if (isMajor) {
      majorTickPointsX.push(new THREE.Vector3(i, 0, -arm), new THREE.Vector3(i, 0, arm));
    } else {
      minorTickPointsX.push(new THREE.Vector3(i, 0, -arm), new THREE.Vector3(i, 0, arm));
    }

    // Number label at labelStep intervals
    if (Math.abs(Math.round(i / minorStep) % Math.round(labelStep / minorStep)) === 0) {
      const val = Math.round(i * 100) / 100;
      const str = val > 0 ? `+${val}` : `${val}`;
      const numSprite = getCachedNumberSprite(str, '#ef4444');
      numSprite.scale.set(labelWorldW, labelWorldH, 1);
      numSprite.position.set(i, 0.05, majorTickArm + labelWorldH * 0.85);
      threeAxesGroup.add(numSprite);
    }
  }

  if (minorTickPointsX.length > 0) {
    threeAxesGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(minorTickPointsX), new THREE.LineBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.55 })));
  }
  if (majorTickPointsX.length > 0) {
    threeAxesGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(majorTickPointsX), new THREE.LineBasicMaterial({ color: 0xef4444, transparent: true, opacity: 1.0 })));
  }

  // Y Axis Ticks & Numbers (yAxisBottom to yAxisTop, negative to positive)
  const minorTickPointsY = [];
  const majorTickPointsY = [];
  const startY = Math.ceil(yAxisBottom / minorStep) * minorStep;
  for (let j = startY; j <= yAxisTop; j += minorStep) {
    if (Math.abs(j) < 0.001) continue;
    const isMajor = Math.abs(Math.round(j / minorStep) % Math.round(majorStep / minorStep)) === 0;
    const arm = isMajor ? majorTickArm : minorTickArm;
    if (isMajor) {
      majorTickPointsY.push(new THREE.Vector3(-arm, j, 0), new THREE.Vector3(arm, j, 0));
    } else {
      minorTickPointsY.push(new THREE.Vector3(-arm, j, 0), new THREE.Vector3(arm, j, 0));
    }

    if (Math.abs(Math.round(j / minorStep) % Math.round(labelStep / minorStep)) === 0) {
      const val = Math.round(j * 100) / 100;
      const str = val > 0 ? `+${val}` : `${val}`;
      const numSprite = getCachedNumberSprite(str, '#10b981');
      numSprite.scale.set(labelWorldW, labelWorldH, 1);
      numSprite.position.set(majorTickArm + labelWorldW * 0.45, j, 0);
      threeAxesGroup.add(numSprite);
    }
  }

  if (minorTickPointsY.length > 0) {
    threeAxesGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(minorTickPointsY), new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.55 })));
  }
  if (majorTickPointsY.length > 0) {
    threeAxesGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(majorTickPointsY), new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 1.0 })));
  }

  // Z Axis Ticks & Numbers (-axisLen to +axisLen, negative to positive)
  const minorTickPointsZ = [];
  const majorTickPointsZ = [];
  const startZ = Math.ceil(-axisLen / minorStep) * minorStep;
  for (let k = startZ; k <= axisLen; k += minorStep) {
    if (Math.abs(k) < 0.001) continue;
    const isMajor = Math.abs(Math.round(k / minorStep) % Math.round(majorStep / minorStep)) === 0;
    const arm = isMajor ? majorTickArm : minorTickArm;
    if (isMajor) {
      majorTickPointsZ.push(new THREE.Vector3(-arm, 0, k), new THREE.Vector3(arm, 0, k));
    } else {
      minorTickPointsZ.push(new THREE.Vector3(-arm, 0, k), new THREE.Vector3(arm, 0, k));
    }

    if (Math.abs(Math.round(k / minorStep) % Math.round(labelStep / minorStep)) === 0) {
      const val = Math.round(k * 100) / 100;
      const str = val > 0 ? `+${val}` : `${val}`;
      const numSprite = getCachedNumberSprite(str, '#2563eb');
      numSprite.scale.set(labelWorldW, labelWorldH, 1);
      numSprite.position.set(majorTickArm + labelWorldW * 0.45, 0.05, k);
      threeAxesGroup.add(numSprite);
    }
  }

  if (minorTickPointsZ.length > 0) {
    threeAxesGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(minorTickPointsZ), new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.55 })));
  }
  if (majorTickPointsZ.length > 0) {
    threeAxesGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(majorTickPointsZ), new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 1.0 })));
  }
}

function getCameraRelativeGroundDelta(dxScreen, dyScreen, refPoint) {
  if (!threeCamera) return new THREE.Vector3(0, 0, 0);

  // Extract camera basis in world space
  const camRight = new THREE.Vector3();
  const camUp = new THREE.Vector3();
  const camDir = new THREE.Vector3();
  threeCamera.matrixWorld.extractBasis(camRight, camUp, camDir);

  // Project camera screen-right and screen-up onto the ground plane (X-Z)
  const rightXZ = new THREE.Vector3(camRight.x, 0, camRight.z);
  const upXZ = new THREE.Vector3(camUp.x, 0, camUp.z);

  if (rightXZ.lengthSq() > 1e-6) rightXZ.normalize();
  if (upXZ.lengthSq() > 1e-6) upXZ.normalize();

  // Distance from camera to shape determines sensitivity
  const dist = threeCamera.position.distanceTo(refPoint || new THREE.Vector3(0, 0, 0));
  const factor = Math.max(0.005, dist * 0.0022);

  // dxScreen is right (+), dyScreen is down (+), so -dyScreen is screen UP
  const moveVec = new THREE.Vector3();
  moveVec.addScaledVector(rightXZ, dxScreen * factor);
  moveVec.addScaledVector(upXZ, -dyScreen * factor);

  return moveVec;
}

function createAxisNumberSprite(num, colorHex) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = colorHex || '#64748b';
  ctx.font = 'bold 50px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(num), 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(0.65, 0.65, 1);
  return sprite;
}

function createAxisLabelSprite(label, colorHex) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = colorHex;
  ctx.font = 'bold italic 72px "Times New Roman", Times, Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(1.5, 1.5, 1);
  return sprite;
}

function createShapeLabelSprite(text, isHighlighted) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 72;
  const ctx = canvas.getContext('2d');

  // Background rounded pill
  ctx.fillStyle = isHighlighted ? 'rgba(37, 99, 235, 0.95)' : 'rgba(15, 23, 42, 0.78)';
  const r = 16;
  const x = 6, y = 6, w = 244, h = 60;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = isHighlighted ? '#ffffff' : 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 36);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(3.4, 0.95, 1);
  return sprite;
}

let is3DHeightDragging = false;
let threeHeightDragStartH = 3;
let threeHeightDragStartY = 0;

function createRectangularPyramidGeometry(width, length, height) {
  const geom = new THREE.BufferGeometry();
  const w2 = width / 2;
  const l2 = length / 2;
  const h = Math.max(0.001, height);

  const positions = [
    // Base (2 triangles, normal down/up)
    -w2, 0, -l2,   w2, 0,  l2,   w2, 0, -l2,
    -w2, 0, -l2,  -w2, 0,  l2,   w2, 0,  l2,
    // Side 1 (North)
    -w2, 0, -l2,   w2, 0, -l2,   0, h, 0,
    // Side 2 (East)
     w2, 0, -l2,   w2, 0,  l2,   0, h, 0,
    // Side 3 (South)
     w2, 0,  l2,  -w2, 0,  l2,   0, h, 0,
    // Side 4 (West)
    -w2, 0,  l2,  -w2, 0, -l2,   0, h, 0
  ];

  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.computeVertexNormals();
  return geom;
}

function createTriangularPyramidGeometry(shape, height) {
  const geom = new THREE.BufferGeometry();
  const verts = getTriangleVertices({ ...shape, x: 0, y: 0 });
  const h = Math.max(0.001, height);

  const x0 = verts[0].x, z0 = -verts[0].y;
  const x1 = verts[1].x, z1 = -verts[1].y;
  const x2 = verts[2].x, z2 = -verts[2].y;

  const positions = [
    // Base (both directions)
    x0, 0, z0,  x1, 0, z1,  x2, 0, z2,
    x0, 0, z0,  x2, 0, z2,  x1, 0, z1,
    // Side 1
    x0, 0, z0,  x1, 0, z1,  0, h, 0,
    // Side 2
    x1, 0, z1,  x2, 0, z2,  0, h, 0,
    // Side 3
    x2, 0, z2,  x0, 0, z0,  0, h, 0
  ];

  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.computeVertexNormals();
  return geom;
}

function createEllipticalConeGeometry(rx, ry, height, segments = 64) {
  const geom = new THREE.BufferGeometry();
  const positions = [];
  const h = Math.max(0.001, height);

  for (let i = 0; i < segments; i++) {
    const a1 = (i / segments) * Math.PI * 2;
    const a2 = ((i + 1) / segments) * Math.PI * 2;

    const x1 = rx * Math.cos(a1);
    const z1 = -ry * Math.sin(a1);
    const x2 = rx * Math.cos(a2);
    const z2 = -ry * Math.sin(a2);

    // Base triangle
    positions.push(0, 0, 0,  x2, 0, z2,  x1, 0, z1);
    // Side triangle to apex
    positions.push(x1, 0, z1,  x2, 0, z2,  0, h, 0);
  }

  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.computeVertexNormals();
  return geom;
}

function createGizmoPillSprite(text, colorHex) {
  const canvas = document.createElement('canvas');
  canvas.width = 110;
  canvas.height = 48;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = colorHex || '#3b82f6';
  const r = 10;
  ctx.beginPath();
  ctx.moveTo(r, 4);
  ctx.arcTo(106, 4, 106, 44, r);
  ctx.arcTo(106, 44, 4, 44, r);
  ctx.arcTo(4, 44, 4, 4, r);
  ctx.arcTo(4, 4, 106, 4, r);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 55, 24);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(0.85, 0.42, 1);
  return sprite;
}

function getShape3DBoundsAnalytical(shape) {
  if (!shape) {
    return { localMinX: -1, localMaxX: 1, localMinY: 0, localMaxY: 3, localMinZ: -1, localMaxZ: 1, halfX: 1, halfZ: 1, worldMinY: 0, worldMaxY: 3 };
  }

  const posY = shape.y3D || 0;
  const is2D = !shape.is3DOnly;
  const solidType = is2D ? (shape.solid3DType || 'flat') : 'solid';

  let localMinX = -1.5, localMaxX = 1.5;
  let localMinZ = -1.5, localMaxZ = 1.5;
  let localMinY = 0, localMaxY = 0.05;

  if (is2D && solidType === 'flat') {
    localMinY = 0;
    localMaxY = 0.05;
  } else if (is2D && (solidType === 'extrude' || solidType === 'pyramid')) {
    localMinY = 0;
    localMaxY = Math.max(0.1, shape.height3D !== undefined ? shape.height3D : (shape.depth !== undefined ? shape.depth : 3));
  } else if (is2D && solidType === 'sphere') {
    const r = Math.max(0.1, shape.radius || 2);
    localMinY = 0;
    localMaxY = r * 2;
  } else {
    // 3D-only native solids
    switch (shape.id) {
      case 'sphere': {
        const r = Math.max(0.1, shape.radius || 2);
        localMinY = 0;
        localMaxY = r * 2;
        break;
      }
      case 'pyramid': {
        localMinY = 0;
        localMaxY = Math.max(0.1, shape.height || 4);
        break;
      }
      case 'cone': {
        localMinY = 0;
        localMaxY = Math.max(0.1, shape.height || 4);
        break;
      }
      case 'torus': {
        const tr = Math.max(0.1, shape.tube || 0.6);
        localMinY = 0;
        localMaxY = tr * 2;
        break;
      }
      default: {
        localMinY = 0;
        localMaxY = 3;
      }
    }
  }

  // Base X and Z dimensions
  switch (shape.id) {
    case 'square': {
      const s = (shape.side || 4) / 2;
      localMinX = -s; localMaxX = s;
      localMinZ = -s; localMaxZ = s;
      break;
    }
    case 'rectangle': {
      const w = (shape.width || 4) / 2;
      const l = (shape.length || 6) / 2;
      localMinX = -w; localMaxX = w;
      localMinZ = -l; localMaxZ = l;
      break;
    }
    case 'circle': {
      const r = shape.radius || 2.5;
      localMinX = -r; localMaxX = r;
      localMinZ = -r; localMaxZ = r;
      break;
    }
    case 'ellipse': {
      const rx = shape.radiusX || 3;
      const ry = shape.radiusY || 2;
      localMinX = -rx; localMaxX = rx;
      localMinZ = -ry; localMaxZ = ry;
      break;
    }
    case 'triangle': {
      try {
        const verts = getTriangleVertices({ ...shape, x: 0, y: 0 });
        const xs = verts.map(v => v.x);
        const zs = verts.map(v => -v.y);
        localMinX = Math.min(...xs); localMaxX = Math.max(...xs);
        localMinZ = Math.min(...zs); localMaxZ = Math.max(...zs);
      } catch (e) {
        localMinX = -2; localMaxX = 2;
        localMinZ = -2; localMaxZ = 2;
      }
      break;
    }
    case 'pentagon': {
      const s = (shape.side || 3) * 0.9;
      localMinX = -s; localMaxX = s;
      localMinZ = -s; localMaxZ = s;
      break;
    }
    case 'hexagon': {
      const s = shape.side || 3;
      localMinX = -s; localMaxX = s;
      localMinZ = -s; localMaxZ = s;
      break;
    }
    case 'sphere': {
      const r = shape.radius || 2;
      localMinX = -r; localMaxX = r;
      localMinZ = -r; localMaxZ = r;
      break;
    }
    case 'pyramid': {
      const b = (shape.baseSize || 4) / 2;
      localMinX = -b; localMaxX = b;
      localMinZ = -b; localMaxZ = b;
      break;
    }
    case 'cone': {
      const r = shape.radius || 2.5;
      localMinX = -r; localMaxX = r;
      localMinZ = -r; localMaxZ = r;
      break;
    }
    case 'torus': {
      const R = (shape.radius || 3) + (shape.tube || 0.6);
      localMinX = -R; localMaxX = R;
      localMinZ = -R; localMaxZ = R;
      break;
    }
  }

  const halfX = Math.max(Math.abs(localMinX), Math.abs(localMaxX), 0.6);
  const halfZ = Math.max(Math.abs(localMinZ), Math.abs(localMaxZ), 0.6);

  return {
    localMinX, localMaxX,
    localMinY, localMaxY,
    localMinZ, localMaxZ,
    halfX, halfZ,
    worldMinY: posY + localMinY,
    worldMaxY: posY + localMaxY
  };
}

function buildTranslationGizmo(shape) {
  const gizmoRoot = new THREE.Group();
  gizmoRoot.userData = { isGizmoRoot: true, shapeId: shape.id };

  const posX = shape.x || 0;
  const posY = shape.y3D || 0;
  const posZ = shape.z !== undefined ? shape.z : 0;
  gizmoRoot.position.set(posX, posY, posZ);

  // Use actual 3D bounding dimensions to position gizmo arrows safely outside the object
  const bounds = getShape3DBoundsAnalytical(shape);
  const halfX = bounds.halfX;
  const halfZ = bounds.halfZ;
  const localMinY = bounds.localMinY;
  const localMaxY = bounds.localMaxY;

  const arrowLength = 1.6;
  const shaftRadius = 0.045;
  const coneRadius = 0.16;
  const coneHeight = 0.55;
  const shaftLen = arrowLength - coneHeight;

  const redMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.28, roughness: 0.3 });
  const greenMat = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.28, roughness: 0.3 });
  const blueMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, emissive: 0x2563eb, emissiveIntensity: 0.28, roughness: 0.3 });

  function createArrow(axis, dir, mat, labelStr) {
    const arrowGroup = new THREE.Group();
    arrowGroup.userData = { isMoveGizmo: true, axis, dir, shapeId: shape.id };

    const shaftGeom = new THREE.CylinderGeometry(shaftRadius, shaftRadius, shaftLen, 12);
    const coneGeom = new THREE.ConeGeometry(coneRadius, coneHeight, 16);

    const shaft = new THREE.Mesh(shaftGeom, mat.clone());
    const cone = new THREE.Mesh(coneGeom, mat.clone());
    shaft.userData = { isMoveGizmo: true, axis, dir, shapeId: shape.id };
    cone.userData = { isMoveGizmo: true, axis, dir, shapeId: shape.id };

    let lblPos = new THREE.Vector3();

    if (axis === 'x') {
      const margin = 0.6;
      const startX = (halfX + margin) * dir;
      shaftGeom.rotateZ(-Math.PI / 2 * dir);
      coneGeom.rotateZ(-Math.PI / 2 * dir);
      shaft.position.set(startX + (shaftLen / 2) * dir, 0, 0);
      cone.position.set(startX + (shaftLen + coneHeight / 2) * dir, 0, 0);
      lblPos.set(startX + (arrowLength + 0.45) * dir, 0, 0);
    } else if (axis === 'y') {
      const margin = 0.75;
      if (dir > 0) {
        // +Y arrow starts safely above the top of the object
        const startY = localMaxY + margin;
        shaft.position.set(0, startY + shaftLen / 2, 0);
        cone.position.set(0, startY + shaftLen + coneHeight / 2, 0);
        lblPos.set(0, startY + arrowLength + 0.45, 0);
      } else {
        // -Y arrow starts safely below the bottom of the object
        const startY = localMinY - margin;
        shaftGeom.rotateX(Math.PI);
        coneGeom.rotateX(Math.PI);
        shaft.position.set(0, startY - shaftLen / 2, 0);
        cone.position.set(0, startY - shaftLen - coneHeight / 2, 0);
        lblPos.set(0, startY - arrowLength - 0.45, 0);
      }
    } else if (axis === 'z') {
      const margin = 0.6;
      const startZ = (halfZ + margin) * dir;
      shaftGeom.rotateX(Math.PI / 2 * dir);
      coneGeom.rotateX(Math.PI / 2 * dir);
      shaft.position.set(0, 0, startZ + (shaftLen / 2) * dir);
      cone.position.set(0, 0, startZ + (shaftLen + coneHeight / 2) * dir);
      lblPos.set(0, 0, startZ + (arrowLength + 0.45) * dir);
    }

    arrowGroup.add(shaft);
    arrowGroup.add(cone);

    const lbl = createGizmoPillSprite(labelStr, axis === 'x' ? '#ef4444' : (axis === 'y' ? '#10b981' : '#2563eb'));
    lbl.position.copy(lblPos);
    arrowGroup.add(lbl);

    return arrowGroup;
  }

  // +X / -X Arrows (Red)
  gizmoRoot.add(createArrow('x', 1, redMat, '+X'));
  gizmoRoot.add(createArrow('x', -1, redMat, '−X'));

  // +Y / -Y Arrows (Green)
  gizmoRoot.add(createArrow('y', 1, greenMat, '+Y'));
  gizmoRoot.add(createArrow('y', -1, greenMat, '−Y'));

  // +Z / -Z Arrows (Blue)
  gizmoRoot.add(createArrow('z', 1, blueMat, '+Z'));
  gizmoRoot.add(createArrow('z', -1, blueMat, '−Z'));

  return gizmoRoot;
}

let isGizmoTranslating = false;
let gizmoDragAxis = null;
let gizmoDragDir = 1;
let gizmoDragStartPos = { x: 0, y: 0, z: 0 };
let gizmoPointerStart = { x: 0, y: 0 };
let gizmoDraggedShape = null;

function initThreeInteraction() {
  if (!threeRenderer) return;

  threeRenderer.domElement.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || !threeCamera || !threeShapeGroup) return;
    const rect = threeRenderer.domElement.getBoundingClientRect();
    threeMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    threeMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    threePointerDownPos.x = e.clientX;
    threePointerDownPos.y = e.clientY;

    threeRaycaster.setFromCamera(threeMouse, threeCamera);
    const intersects = threeRaycaster.intersectObjects(threeShapeGroup.children, true);

    if (intersects.length > 0) {
      let isMoveGizmo = false;
      let moveAxis = null;
      let moveDir = 1;
      let isGizmo = false;
      let isHeightHandle = false;
      let shapeId = null;

      for (const hit of intersects) {
        let curr = hit.object;
        while (curr && curr !== threeShapeGroup) {
          if (curr.userData && curr.userData.isMoveGizmo) {
            isMoveGizmo = true;
            moveAxis = curr.userData.axis;
            moveDir = curr.userData.dir;
            shapeId = curr.userData.shapeId;
            break;
          }
          if (curr.userData && curr.userData.isHeightHandle) {
            isHeightHandle = true;
            shapeId = curr.userData.shapeId;
            break;
          }
          if (curr.userData && curr.userData.isRotationGizmo) {
            isGizmo = true;
            shapeId = curr.userData.shapeId;
            break;
          }
          if (curr.userData && curr.userData.shapeId) {
            shapeId = curr.userData.shapeId;
            break;
          }
          curr = curr.parent;
        }
        if (shapeId) break;
      }

      if (shapeId && SHAPES[shapeId]) {
        const shape = SHAPES[shapeId];
        setActiveShape(shapeId);
        if (threeControls) threeControls.enabled = false;

        if (isMoveGizmo) {
          isGizmoTranslating = true;
          gizmoDragAxis = moveAxis;
          gizmoDragDir = moveDir;
          gizmoDraggedShape = shape;
          gizmoDragStartPos = {
            x: shape.x || 0,
            y: shape.y3D !== undefined ? shape.y3D : 0,
            z: shape.z !== undefined ? shape.z : 0
          };
          gizmoPointerStart = { x: e.clientX, y: e.clientY };
          return;
        } else if (isHeightHandle) {
          is3DHeightDragging = true;
          dragged3DShape = shape;
          threeHeightDragStartH = shape.height3D !== undefined ? shape.height3D : (shape.depth !== undefined ? shape.depth : 3);
          threeHeightDragStartY = e.clientY;
        } else if (isGizmo || e.shiftKey) {
          is3DRotating = true;
          dragged3DShape = shape;
          threeInitialShapeRot = shape.rotation || 0;
          threePointerDownPos.x = e.clientX;
          threePointerDownPos.y = e.clientY;
          threeDragPlane.constant = -(shape.y3D || 0);
          if (threeRaycaster.ray.intersectPlane(threeDragPlane, threePlaneIntersection)) {
            threeRotateStartAngle = Math.atan2(threePlaneIntersection.x - shape.x, threePlaneIntersection.z - (shape.z || 0));
          }
        } else {
          is3DDragging = true;
          dragged3DShape = shape;
          threeDragStartPos = {
            x: shape.x || 0,
            y: shape.y3D !== undefined ? shape.y3D : 0,
            z: shape.z !== undefined ? shape.z : 0
          };
          threePointerDownPos.x = e.clientX;
          threePointerDownPos.y = e.clientY;
          threeDragPlane.constant = -(shape.y3D || 0);
          if (threeRaycaster.ray.intersectPlane(threeDragPlane, threePlaneIntersection)) {
            threeDragOffset.x = threePlaneIntersection.x - shape.x;
            threeDragOffset.z = threePlaneIntersection.z - (shape.z || 0);
          }
        }

        rebuildThreeShapes();
        renderAllPanels();
        return;
      }
    }

    // Clicked background: camera OrbitControls handles it
    if (threeControls) threeControls.enabled = true;
  });

  window.addEventListener('pointermove', (e) => {
    if (currentViewMode !== '3d' || !threeRenderer || !threeCamera || !threeShapeGroup) return;

    const rect = threeRenderer.domElement.getBoundingClientRect();
    threeMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    threeMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (isGizmoTranslating && gizmoDraggedShape) {
      const dx = e.clientX - gizmoPointerStart.x;
      const dy = e.clientY - gizmoPointerStart.y;
      const refPos = new THREE.Vector3(gizmoDragStartPos.x, gizmoDragStartPos.y, gizmoDragStartPos.z);
      const moveVec = getCameraRelativeGroundDelta(dx, dy, refPos);

      if (gizmoDragAxis === 'x') {
        gizmoDraggedShape.x = Math.round((gizmoDragStartPos.x + moveVec.x) * 10) / 10;
      } else if (gizmoDragAxis === 'y') {
        const dist = threeCamera.position.distanceTo(refPos);
        const factor = Math.max(0.005, dist * 0.0022);
        gizmoDraggedShape.y3D = Math.round((gizmoDragStartPos.y - dy * factor) * 10) / 10;
        updateDynamicThreeGrid(true);
      } else if (gizmoDragAxis === 'z') {
        gizmoDraggedShape.z = Math.round((gizmoDragStartPos.z + moveVec.z) * 10) / 10;
      }

      const curX = gizmoDraggedShape.x;
      const curY = gizmoDraggedShape.y3D || 0;
      const curZ = gizmoDraggedShape.z || 0;

      const mesh = threeShapeGroup.children.find(m => m.userData && m.userData.shapeId === gizmoDraggedShape.id && !m.userData.isGizmoRoot);
      if (mesh) mesh.position.set(curX, curY, curZ);

      const gizmo = threeShapeGroup.children.find(m => m.userData && m.userData.isGizmoRoot && m.userData.shapeId === gizmoDraggedShape.id);
      if (gizmo) gizmo.position.set(curX, curY, curZ);

      updateDimensionsPanelValues();
      renderPropertiesPanel();
      return;
    } else if (is3DHeightDragging && dragged3DShape) {
      const dy = threeHeightDragStartY - e.clientY;
      const newH = Math.max(0.1, Math.round((threeHeightDragStartH + dy * 0.04) * 10) / 10);
      dragged3DShape.height3D = newH;
      dragged3DShape.depth = newH;
      rebuildThreeShapes();
      updateDynamicThreeGrid(true);
      renderPropertiesPanel();
      updateDimensionsPanelValues();
    } else if (is3DDragging && dragged3DShape) {
      const dx = e.clientX - threePointerDownPos.x;
      const dy = e.clientY - threePointerDownPos.y;
      const refPos = new THREE.Vector3(threeDragStartPos.x, threeDragStartPos.y, threeDragStartPos.z);
      const moveVec = getCameraRelativeGroundDelta(dx, dy, refPos);

      dragged3DShape.x = Math.round((threeDragStartPos.x + moveVec.x) * 10) / 10;
      dragged3DShape.z = Math.round((threeDragStartPos.z + moveVec.z) * 10) / 10;
      const curX = dragged3DShape.x;
      const curY = dragged3DShape.y3D || 0;
      const curZ = dragged3DShape.z || 0;
      const mesh = threeShapeGroup.children.find(m => m.userData && m.userData.shapeId === dragged3DShape.id && !m.userData.isGizmoRoot);
      if (mesh) mesh.position.set(curX, curY, curZ);
      const gizmo = threeShapeGroup.children.find(m => m.userData && m.userData.isGizmoRoot && m.userData.shapeId === dragged3DShape.id);
      if (gizmo) gizmo.position.set(curX, curY, curZ);
      updateDimensionsPanelValues();
      renderPropertiesPanel();
    } else if (is3DRotating && dragged3DShape) {
      threeRaycaster.setFromCamera(threeMouse, threeCamera);
      threeDragPlane.constant = -(dragged3DShape.y3D || 0);
      if (threeRaycaster.ray.intersectPlane(threeDragPlane, threePlaneIntersection)) {
        const currentAngle = Math.atan2(threePlaneIntersection.x - dragged3DShape.x, threePlaneIntersection.z - (dragged3DShape.z || 0));
        const deltaAngle = currentAngle - threeRotateStartAngle;
        dragged3DShape.rotation = threeInitialShapeRot + deltaAngle;
        const mesh = threeShapeGroup.children.find(m => m.userData && m.userData.shapeId === dragged3DShape.id && !m.userData.isGizmoRoot);
        if (mesh) {
          mesh.rotation.y = dragged3DShape.rotation;
        }
        renderPropertiesPanel();
      }
    } else if (e.target === threeRenderer.domElement) {
      threeRaycaster.setFromCamera(threeMouse, threeCamera);
      const intersects = threeRaycaster.intersectObjects(threeShapeGroup.children, true);
      if (intersects.length > 0) {
        let isMoveGizmo = false;
        let isGizmo = false;
        let isHeight = false;
        let curr = intersects[0].object;
        while (curr && curr !== threeShapeGroup) {
          if (curr.userData && curr.userData.isMoveGizmo) {
            isMoveGizmo = true;
            break;
          }
          if (curr.userData && curr.userData.isHeightHandle) {
            isHeight = true;
            break;
          }
          if (curr.userData && curr.userData.isRotationGizmo) {
            isGizmo = true;
            break;
          }
          curr = curr.parent;
        }
        if (isMoveGizmo) {
          threeRenderer.domElement.style.cursor = 'pointer';
        } else if (isHeight) {
          threeRenderer.domElement.style.cursor = 'ns-resize';
        } else if (isGizmo || e.shiftKey) {
          threeRenderer.domElement.style.cursor = 'crosshair';
        } else {
          threeRenderer.domElement.style.cursor = 'move';
        }
      } else {
        threeRenderer.domElement.style.cursor = 'default';
      }
    }
  });

  window.addEventListener('pointerup', (e) => {
    if (currentViewMode !== '3d') return;

    if (isGizmoTranslating && gizmoDraggedShape) {
      const moveDist = Math.hypot(e.clientX - gizmoPointerStart.x, e.clientY - gizmoPointerStart.y);
      if (moveDist < 6) {
        // Quick click on arrow: translate precisely by 1.0 unit along specified axis
        if (gizmoDragAxis === 'x') {
          gizmoDraggedShape.x = Math.round(((gizmoDragStartPos.x || 0) + gizmoDragDir * 1.0) * 10) / 10;
        } else if (gizmoDragAxis === 'y') {
          gizmoDraggedShape.y3D = Math.round(((gizmoDragStartPos.y || 0) + gizmoDragDir * 1.0) * 10) / 10;
        } else if (gizmoDragAxis === 'z') {
          gizmoDraggedShape.z = Math.round(((gizmoDragStartPos.z || 0) + gizmoDragDir * 1.0) * 10) / 10;
        }
      }
      isGizmoTranslating = false;
      gizmoDraggedShape = null;
      if (threeControls) threeControls.enabled = true;
      rebuildThreeShapes();
      updateDimensionsPanelValues();
      renderPropertiesPanel();
      return;
    }

    if (is3DDragging || is3DRotating || is3DHeightDragging) {
      is3DDragging = false;
      is3DRotating = false;
      is3DHeightDragging = false;
      dragged3DShape = null;
      if (threeControls) threeControls.enabled = true;
      rebuildThreeShapes();
      renderAllPanels();
    }
  });
}

function rebuildThreeShapes() {
  if (!threeShapeGroup || currentViewMode !== '3d') return;

  // Clear existing meshes & labels
  while (threeShapeGroup.children.length > 0) {
    const child = threeShapeGroup.children[0];
    threeShapeGroup.remove(child);
    disposeThreeObject(child);
  }

  Object.values(SHAPES).forEach(shape => {
    if (!shape.visible) return;

    const isActive = shape.id === activeShapeId;
    let geom = null;
    const is2DShape = !shape.is3DOnly;
    const solidType = is2DShape ? (shape.solid3DType || 'flat') : 'solid';
    const solidHeight = Math.max(0.1, shape.height3D !== undefined ? shape.height3D : (shape.depth !== undefined ? shape.depth : 3));
    let labelY = 0.85;
    let displayName = shape.name;
    let cornerVerts = null;

    if (is2DShape && solidType === 'flat') {
      // Preserve as 2D base geometry lying flat on the 3D X-Z grid plane
      displayName = `${shape.name} (Base)`;
      labelY = 0.85;

      switch (shape.id) {
        case 'square': {
          const s = shape.side;
          const sq = new THREE.Shape();
          sq.moveTo(-s / 2, -s / 2);
          sq.lineTo(s / 2, -s / 2);
          sq.lineTo(s / 2, s / 2);
          sq.lineTo(-s / 2, s / 2);
          sq.closePath();
          geom = new THREE.ShapeGeometry(sq);
          geom.rotateX(-Math.PI / 2);
          geom.translate(0, 0.02, 0);
          cornerVerts = [
            { x: -s / 2, z: -s / 2 },
            { x: s / 2, z: -s / 2 },
            { x: s / 2, z: s / 2 },
            { x: -s / 2, z: s / 2 }
          ];
          break;
        }
        case 'rectangle': {
          const w = shape.width;
          const l = shape.length;
          const rect = new THREE.Shape();
          rect.moveTo(-w / 2, -l / 2);
          rect.lineTo(w / 2, -l / 2);
          rect.lineTo(w / 2, l / 2);
          rect.lineTo(-w / 2, l / 2);
          rect.closePath();
          geom = new THREE.ShapeGeometry(rect);
          geom.rotateX(-Math.PI / 2);
          geom.translate(0, 0.02, 0);
          cornerVerts = [
            { x: -w / 2, z: -l / 2 },
            { x: w / 2, z: -l / 2 },
            { x: w / 2, z: l / 2 },
            { x: -w / 2, z: l / 2 }
          ];
          break;
        }
        case 'circle': {
          geom = new THREE.CircleGeometry(shape.radius, 64);
          geom.rotateX(-Math.PI / 2);
          geom.translate(0, 0.02, 0);
          break;
        }
        case 'triangle': {
          const verts = getTriangleVertices({ ...shape, x: 0, y: 0 });
          const tri = new THREE.Shape();
          tri.moveTo(verts[0].x, verts[0].y);
          tri.lineTo(verts[1].x, verts[1].y);
          tri.lineTo(verts[2].x, verts[2].y);
          tri.closePath();
          geom = new THREE.ShapeGeometry(tri);
          geom.rotateX(-Math.PI / 2);
          geom.translate(0, 0.02, 0);
          cornerVerts = verts.map(v => ({ x: v.x, z: -v.y }));
          break;
        }
        case 'pentagon': {
          const verts = getRegularPolygonVertices(0, 0, 5, shape.side);
          const poly = new THREE.Shape();
          poly.moveTo(verts[0].x, verts[0].y);
          for (let i = 1; i < verts.length; i++) poly.lineTo(verts[i].x, verts[i].y);
          poly.closePath();
          geom = new THREE.ShapeGeometry(poly);
          geom.rotateX(-Math.PI / 2);
          geom.translate(0, 0.02, 0);
          cornerVerts = verts.map(v => ({ x: v.x, z: -v.y }));
          break;
        }
        case 'hexagon': {
          const verts = getRegularPolygonVertices(0, 0, 6, shape.side);
          const poly = new THREE.Shape();
          poly.moveTo(verts[0].x, verts[0].y);
          for (let i = 1; i < verts.length; i++) poly.lineTo(verts[i].x, verts[i].y);
          poly.closePath();
          geom = new THREE.ShapeGeometry(poly);
          geom.rotateX(-Math.PI / 2);
          geom.translate(0, 0.02, 0);
          cornerVerts = verts.map(v => ({ x: v.x, z: -v.y }));
          break;
        }
        case 'ellipse': {
          const rx = Math.max(0.1, shape.radiusX);
          const ry = Math.max(0.1, shape.radiusY);
          const ell = new THREE.Shape();
          ell.absellipse(0, 0, rx, ry, 0, Math.PI * 2, false, 0);
          geom = new THREE.ShapeGeometry(ell, 64);
          geom.rotateX(-Math.PI / 2);
          geom.translate(0, 0.02, 0);
          break;
        }
      }
    } else if (is2DShape && solidType === 'extrude') {
      // Extruded Prism or Cylinder
      labelY = solidHeight + 0.9;
      switch (shape.id) {
        case 'square': {
          const s = shape.side;
          geom = new THREE.BoxGeometry(s, solidHeight, s);
          geom.translate(0, solidHeight / 2, 0);
          displayName = Math.abs(solidHeight - s) < 1e-4 ? 'Cube' : 'Square Prism';
          break;
        }
        case 'rectangle': {
          const w = shape.width;
          const l = shape.length;
          geom = new THREE.BoxGeometry(w, solidHeight, l);
          geom.translate(0, solidHeight / 2, 0);
          displayName = 'Rect Prism';
          break;
        }
        case 'circle': {
          const r = shape.radius;
          geom = new THREE.CylinderGeometry(r, r, solidHeight, 48);
          geom.translate(0, solidHeight / 2, 0);
          displayName = 'Cylinder';
          break;
        }
        case 'triangle': {
          const verts = getTriangleVertices({ ...shape, x: 0, y: 0 });
          const triShape = new THREE.Shape();
          triShape.moveTo(verts[0].x, verts[0].y);
          triShape.lineTo(verts[1].x, verts[1].y);
          triShape.lineTo(verts[2].x, verts[2].y);
          triShape.closePath();
          geom = new THREE.ExtrudeGeometry(triShape, { depth: solidHeight, bevelEnabled: false });
          geom.rotateX(-Math.PI / 2);
          displayName = 'Tri Prism';
          break;
        }
        case 'pentagon': {
          const verts = getRegularPolygonVertices(0, 0, 5, shape.side);
          const polyShape = new THREE.Shape();
          polyShape.moveTo(verts[0].x, verts[0].y);
          for (let i = 1; i < verts.length; i++) polyShape.lineTo(verts[i].x, verts[i].y);
          polyShape.closePath();
          geom = new THREE.ExtrudeGeometry(polyShape, { depth: solidHeight, bevelEnabled: false });
          geom.rotateX(-Math.PI / 2);
          displayName = 'Pent Prism';
          break;
        }
        case 'hexagon': {
          const verts = getRegularPolygonVertices(0, 0, 6, shape.side);
          const polyShape = new THREE.Shape();
          polyShape.moveTo(verts[0].x, verts[0].y);
          for (let i = 1; i < verts.length; i++) polyShape.lineTo(verts[i].x, verts[i].y);
          polyShape.closePath();
          geom = new THREE.ExtrudeGeometry(polyShape, { depth: solidHeight, bevelEnabled: false });
          geom.rotateX(-Math.PI / 2);
          displayName = 'Hex Prism';
          break;
        }
        case 'ellipse': {
          const rx = Math.max(0.1, shape.radiusX);
          const ry = Math.max(0.1, shape.radiusY);
          const ellipseShape = new THREE.Shape();
          ellipseShape.absellipse(0, 0, rx, ry, 0, Math.PI * 2, false, 0);
          geom = new THREE.ExtrudeGeometry(ellipseShape, { depth: solidHeight, bevelEnabled: false, curveSegments: 36 });
          geom.rotateX(-Math.PI / 2);
          displayName = 'Elliptical Cyl';
          break;
        }
      }
    } else if (is2DShape && solidType === 'pyramid') {
      // Pyramid or Cone constructed from 2D base
      labelY = solidHeight + 0.9;
      switch (shape.id) {
        case 'square': {
          const s = shape.side;
          geom = new THREE.ConeGeometry(s / Math.SQRT2, solidHeight, 4);
          geom.rotateY(Math.PI / 4);
          geom.translate(0, solidHeight / 2, 0);
          displayName = 'Square Pyramid';
          break;
        }
        case 'rectangle': {
          geom = createRectangularPyramidGeometry(shape.width, shape.length, solidHeight);
          displayName = 'Rect Pyramid';
          break;
        }
        case 'circle': {
          const r = shape.radius;
          geom = new THREE.ConeGeometry(r, solidHeight, 48);
          geom.translate(0, solidHeight / 2, 0);
          displayName = 'Cone';
          break;
        }
        case 'triangle': {
          geom = createTriangularPyramidGeometry(shape, solidHeight);
          displayName = 'Tri Pyramid';
          break;
        }
        case 'pentagon': {
          const circumRadius = shape.side / (2 * Math.sin(Math.PI / 5));
          geom = new THREE.ConeGeometry(circumRadius, solidHeight, 5);
          geom.rotateY(-Math.PI / 2);
          geom.translate(0, solidHeight / 2, 0);
          displayName = 'Pent Pyramid';
          break;
        }
        case 'hexagon': {
          geom = new THREE.ConeGeometry(shape.side, solidHeight, 6);
          geom.rotateY(-Math.PI / 2);
          geom.translate(0, solidHeight / 2, 0);
          displayName = 'Hex Pyramid';
          break;
        }
        case 'ellipse': {
          geom = createEllipticalConeGeometry(shape.radiusX, shape.radiusY, solidHeight);
          displayName = 'Elliptical Cone';
          break;
        }
      }
    } else if (is2DShape && solidType === 'sphere') {
      // Sphere constructed from Circle base
      const r = Math.max(0.1, shape.radius);
      geom = new THREE.SphereGeometry(r, 48, 36);
      geom.translate(0, r, 0);
      labelY = r * 2 + 0.9;
      displayName = 'Sphere';
    } else {
      // Native 3D-only shapes
      switch (shape.id) {
        case 'sphere': {
          const r = Math.max(0.1, shape.radius);
          geom = new THREE.SphereGeometry(r, 36, 24);
          geom.translate(0, r, 0);
          labelY = r * 2 + 0.9;
          displayName = 'Sphere';
          break;
        }
        case 'pyramid': {
          const b = Math.max(0.1, shape.baseSize);
          const h = Math.max(0.1, shape.height);
          geom = new THREE.ConeGeometry(b / Math.SQRT2, h, 4);
          geom.rotateY(Math.PI / 4);
          geom.translate(0, h / 2, 0);
          labelY = h + 0.9;
          displayName = 'Pyramid';
          break;
        }
        case 'cone': {
          const r = Math.max(0.1, shape.radius);
          const h = Math.max(0.1, shape.height);
          geom = new THREE.ConeGeometry(r, h, 48);
          geom.translate(0, h / 2, 0);
          labelY = h + 0.9;
          displayName = 'Cone';
          break;
        }
        case 'torus': {
          const R = Math.max(0.5, shape.radius);
          const r = Math.max(0.1, shape.tube);
          geom = new THREE.TorusGeometry(R, r, 24, 48);
          geom.rotateX(Math.PI / 2);
          geom.translate(0, r, 0);
          labelY = r * 2 + 0.9;
          displayName = 'Torus';
          break;
        }
      }
    }

    if (!geom) return;

    // Semi-transparent material with active emissive glow
    const isFlat = is2DShape && solidType === 'flat';
    const mat = new THREE.MeshStandardMaterial({
      color: shape.color,
      transparent: true,
      opacity: isActive ? (isFlat ? 0.78 : 0.88) : (isFlat ? 0.55 : 0.65),
      roughness: isFlat ? 0.4 : 0.25,
      metalness: isFlat ? 0.05 : 0.12,
      side: THREE.DoubleSide
    });

    if (isActive) {
      mat.emissive = new THREE.Color(0x2563eb);
      mat.emissiveIntensity = isFlat ? 0.2 : 0.28;
    }

    const mesh = new THREE.Mesh(geom, mat);
    const posX = shape.x || 0;
    const posY = shape.y3D || 0;
    const posZ = shape.z !== undefined ? shape.z : 0;
    mesh.position.set(posX, posY, posZ);
    mesh.rotation.y = shape.rotation || 0;
    mesh.castShadow = !isFlat;
    mesh.receiveShadow = true;
    mesh.userData = { shapeId: shape.id };

    // Edges geometry highlight line
    const edgesGeom = new THREE.EdgesGeometry(geom, isFlat ? 10 : 22);
    const edgeMat = new THREE.LineBasicMaterial({
      color: isActive ? 0x2563eb : (shape.strokeColor || shape.color),
      linewidth: isActive ? 3 : 1.5,
      transparent: true,
      opacity: isActive ? 1.0 : 0.8
    });
    const edgeLine = new THREE.LineSegments(edgesGeom, edgeMat);
    mesh.add(edgeLine);

    // If flat 2D shape, add small corner vertex markers
    if (isFlat && cornerVerts) {
      const vGeom = new THREE.SphereGeometry(0.11, 16, 16);
      const vMat = new THREE.MeshStandardMaterial({
        color: isActive ? 0x2563eb : 0x64748b,
        roughness: 0.3,
        metalness: 0.4
      });
      cornerVerts.forEach(pt => {
        const dot = new THREE.Mesh(vGeom, vMat);
        dot.position.set(pt.x, 0.04, pt.z);
        mesh.add(dot);
      });
    }

    // Floating shape name label
    const labelSprite = createShapeLabelSprite(displayName, isActive);
    labelSprite.position.set(0, labelY, 0);
    mesh.add(labelSprite);

    // If active and an extruded solid or pyramid, add interactive height handle at top
    if (isActive && (solidType === 'extrude' || solidType === 'pyramid')) {
      const handleGeom = new THREE.SphereGeometry(0.2, 16, 16);
      const handleMat = new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        emissive: 0x1d4ed8,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8
      });
      const handleMesh = new THREE.Mesh(handleGeom, handleMat);
      handleMesh.position.set(0, solidHeight + 0.12, 0);
      handleMesh.userData = { isHeightHandle: true, shapeId: shape.id };

      const stemGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.22, 8);
      const stemMat = new THREE.MeshBasicMaterial({ color: 0x2563eb });
      const stemMesh = new THREE.Mesh(stemGeom, stemMat);
      stemMesh.position.set(0, solidHeight, 0);
      stemMesh.userData = { isHeightHandle: true, shapeId: shape.id };

      mesh.add(stemMesh);
      mesh.add(handleMesh);
    }

    // If active, add 3D rotation gizmo around the shape
    if (isActive) {
      const shapeR = Math.max(1.8, getShapeBoundingRadius(shape) + 0.6);
      const gizmoGeom = new THREE.TorusGeometry(shapeR, 0.07, 16, 64);
      gizmoGeom.rotateX(Math.PI / 2);
      gizmoGeom.translate(0, 0.05, 0);

      const gizmoMat = new THREE.MeshBasicMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0.92
      });
      const gizmoMesh = new THREE.Mesh(gizmoGeom, gizmoMat);
      gizmoMesh.userData = { isRotationGizmo: true, shapeId: shape.id };

      const handleGeom = new THREE.SphereGeometry(0.2, 16, 16);
      const handleMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa });
      [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].forEach(a => {
        const h = new THREE.Mesh(handleGeom, handleMat);
        h.position.set(shapeR * Math.cos(a), 0.05, shapeR * Math.sin(a));
        h.userData = { isRotationGizmo: true, shapeId: shape.id };
        gizmoMesh.add(h);
      });
      mesh.add(gizmoMesh);
    }

    threeShapeGroup.add(mesh);

    // If active, add interactive translation movement gizmo
    if (isActive) {
      const transGizmo = buildTranslationGizmo(shape);
      threeShapeGroup.add(transGizmo);
    }
  });
}

function disposeThreeObject(obj) {
  if (!obj) return;
  if (obj.geometry) obj.geometry.dispose();
  if (obj.material) {
    if (Array.isArray(obj.material)) {
      obj.material.forEach(m => {
        if (m.map) m.map.dispose();
        m.dispose();
      });
    } else {
      if (obj.material.map) obj.material.map.dispose();
      obj.material.dispose();
    }
  }
  if (obj.children) {
    obj.children.forEach(child => disposeThreeObject(child));
  }
}

function disposeThreeScene() {
  if (threeAnimFrameId) {
    cancelAnimationFrame(threeAnimFrameId);
    threeAnimFrameId = null;
  }
  if (threeControls) {
    threeControls.dispose();
    threeControls = null;
  }
  if (threeShapeGroup) {
    disposeThreeObject(threeShapeGroup);
    threeShapeGroup = null;
  }
  if (threeAxesGroup) {
    disposeThreeObject(threeAxesGroup);
    threeAxesGroup = null;
  }
  if (threeGridHelper) {
    disposeThreeObject(threeGridHelper);
    threeGridHelper = null;
  }
  if (threeRenderer) {
    threeRenderer.dispose();
    if (threeRenderer.domElement && threeRenderer.domElement.parentNode) {
      threeRenderer.domElement.parentNode.removeChild(threeRenderer.domElement);
    }
    threeRenderer = null;
  }
  threeScene = null;
  threeCamera = null;
}

// --- Hit Testing Shapes on Grid ---
function getShapeAtMathCoords(mx, my) {
  // Iterate in reverse render order (top-most first)
  for (let i = renderOrder.length - 1; i >= 0; i--) {
    const shapeId = renderOrder[i];
    const shape = SHAPES[shapeId];
    if (!shape || !shape.visible) continue;

    if (isPointInsideShape(shape, mx, my)) {
      return shape;
    }
  }
  return null;
}

function isPointInsideShape(shape, mx, my) {
  let dx = mx - shape.x;
  let dy = my - shape.y;

  // Account for shape rotation around center
  if (shape.rotation) {
    const cos = Math.cos(-shape.rotation);
    const sin = Math.sin(-shape.rotation);
    const rx = dx * cos - dy * sin;
    const ry = dx * sin + dy * cos;
    dx = rx;
    dy = ry;
  }
  const localMx = shape.x + dx;
  const localMy = shape.y + dy;

  switch (shape.id) {
    case 'square': {
      const half = shape.side / 2;
      return Math.abs(dx) <= half && Math.abs(dy) <= half;
    }
    case 'rectangle': {
      const halfW = shape.width / 2;
      const halfL = shape.length / 2;
      return Math.abs(dx) <= halfW && Math.abs(dy) <= halfL;
    }
    case 'circle': {
      return Math.hypot(dx, dy) <= shape.radius;
    }
    case 'ellipse': {
      const rx = Math.max(0.01, shape.radiusX);
      const ry = Math.max(0.01, shape.radiusY);
      return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
    }
    case 'triangle': {
      const verts = getTriangleVertices(shape);
      return isPointInPolygon(localMx, localMy, verts);
    }
    case 'pentagon': {
      const verts = getRegularPolygonVertices(shape.x, shape.y, 5, shape.side);
      return isPointInPolygon(localMx, localMy, verts);
    }
    case 'hexagon': {
      const verts = getRegularPolygonVertices(shape.x, shape.y, 6, shape.side);
      return isPointInPolygon(localMx, localMy, verts);
    }
    default:
      return false;
  }
}

// Triangle Vertices Calculation (Law of Cosines, Centered at (shape.x, shape.y))
function getTriangleVertices(shape) {
  const a = shape.sideA;
  const b = shape.sideB;
  const c = shape.sideC;

  // Validate triangle inequality
  if (a + b <= c || a + c <= b || b + c <= a) {
    // Fallback equilateral for visual stability if invalid
    return getRegularPolygonVertices(shape.x, shape.y, 3, Math.max(1, a));
  }

  // Base is side c along horizontal axis
  // Vertex 1: (0, 0)
  // Vertex 2: (c, 0)
  // Vertex 3: (xC, yC) where xC = (c² + b² - a²) / (2c)
  const xC = (c * c + b * b - a * a) / (2 * c);
  const yC = Math.sqrt(Math.max(0, b * b - xC * xC));

  // Centroid of the triangle
  const centroidX = (0 + c + xC) / 3;
  const centroidY = (0 + 0 + yC) / 3;

  // Center around (shape.x, shape.y)
  return [
    { x: shape.x + (0 - centroidX), y: shape.y + (0 - centroidY) },
    { x: shape.x + (c - centroidX), y: shape.y + (0 - centroidY) },
    { x: shape.x + (xC - centroidX), y: shape.y + (yC - centroidY) }
  ];
}

// Regular Polygon Vertices (Pentagon, Hexagon)
function getRegularPolygonVertices(cx, cy, n, side) {
  const R = side / (2 * Math.sin(Math.PI / n));
  const vertices = [];
  // Rotate slightly so flat side or point is upright
  const startAngle = -Math.PI / 2;
  for (let i = 0; i < n; i++) {
    const angle = startAngle + (i * 2 * Math.PI) / n;
    vertices.push({
      x: cx + R * Math.cos(angle),
      y: cy + R * Math.sin(angle)
    });
  }
  return vertices;
}

// Point-in-polygon ray-casting algorithm
function isPointInPolygon(px, py, vertices) {
  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i].x;
    const yi = vertices[i].y;
    const xj = vertices[j].x;
    const yj = vertices[j].y;

    const intersect = ((yi > py) !== (yj > py)) &&
      (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// --- HTML5 Canvas Infinite Grid & Shape Rendering ---
function render() {
  if (currentViewMode === '3d') {
    rebuildThreeShapes();
    return;
  }

  if (!ctx || !canvas) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // 1. Draw Infinite Grid & Axes (Desmos style)
  drawInfiniteGrid(width, height);

  // 2. Draw Shapes in Render Order (skip 3D-only shapes on 2D canvas)
  for (let i = 0; i < renderOrder.length; i++) {
    const shapeId = renderOrder[i];
    const shape = SHAPES[shapeId];
    if (shape && shape.visible && !shape.is3DOnly) {
      const isActive = shape.id === activeShapeId;
      drawShape(shape, isActive);
    }
  }
}

// Draw Desmos-style Grid Lines, Axis Lines & Tick Labels
function drawInfiniteGrid(width, height) {
  const xMin = toMathX(0);
  const xMax = toMathX(width);
  const yMin = toMathY(height);
  const yMax = toMathY(0);

  // Determine nice grid unit step (1, 2, 5 * 10^k)
  const targetPixels = 80;
  const roughStep = targetPixels / gridState.scale;
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const ratio = roughStep / magnitude;

  let majorStep = magnitude;
  if (ratio < 1.5) majorStep = 1 * magnitude;
  else if (ratio < 3.5) majorStep = 2 * magnitude;
  else if (ratio < 7.5) majorStep = 5 * magnitude;
  else majorStep = 10 * magnitude;

  // Subdivisions: 5 minor divisions per major step
  const minorStep = majorStep / 5;

  ctx.save();

  // --- Minor Grid Lines ---
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.06)';

  ctx.beginPath();
  const startMinorX = Math.floor(xMin / minorStep) * minorStep;
  for (let x = startMinorX; x <= xMax; x += minorStep) {
    const sx = Math.round(toScreenX(x)) + 0.5;
    ctx.moveTo(sx, 0);
    ctx.lineTo(sx, height);
  }

  const startMinorY = Math.floor(yMin / minorStep) * minorStep;
  for (let y = startMinorY; y <= yMax; y += minorStep) {
    const sy = Math.round(toScreenY(y)) + 0.5;
    ctx.moveTo(0, sy);
    ctx.lineTo(width, sy);
  }
  ctx.stroke();

  // --- Major Grid Lines (Darker lines every 5 units / major steps) ---
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.14)';

  ctx.beginPath();
  const startMajorX = Math.floor(xMin / majorStep) * majorStep;
  for (let x = startMajorX; x <= xMax; x += majorStep) {
    const sx = Math.round(toScreenX(x)) + 0.5;
    ctx.moveTo(sx, 0);
    ctx.lineTo(sx, height);
  }

  const startMajorY = Math.floor(yMin / majorStep) * majorStep;
  for (let y = startMajorY; y <= yMax; y += majorStep) {
    const sy = Math.round(toScreenY(y)) + 0.5;
    ctx.moveTo(0, sy);
    ctx.lineTo(width, sy);
  }
  ctx.stroke();

  // --- Main Axis Lines (X and Y) ---
  const screenOriginX = Math.round(gridState.originX) + 0.5;
  const screenOriginY = Math.round(gridState.originY) + 0.5;

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#334155';

  ctx.beginPath();
  // X axis (horizontal line y=0)
  ctx.moveTo(0, screenOriginY);
  ctx.lineTo(width, screenOriginY);
  // Y axis (vertical line x=0)
  ctx.moveTo(screenOriginX, 0);
  ctx.lineTo(screenOriginX, height);
  ctx.stroke();

  // --- Axis Tick Labels (Desmos-like dynamic numbers) ---
  ctx.font = '500 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#64748b';

  // Determine label position pinning if axes are off screen
  const axisLabelPosY = Math.max(22, Math.min(height - 10, screenOriginY + 16));
  const axisLabelPosX = Math.max(34, Math.min(width - 12, screenOriginX - 8));

  // X Axis Labels
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  for (let x = startMajorX; x <= xMax; x += majorStep) {
    // Avoid drawing directly on origin intersection
    if (Math.abs(x) < majorStep * 0.05) continue;
    const sx = toScreenX(x);
    if (sx < 25 || sx > width - 25) continue;

    // Small tick notch on axis
    if (screenOriginY >= 0 && screenOriginY <= height) {
      ctx.beginPath();
      ctx.moveTo(sx, screenOriginY - 4);
      ctx.lineTo(sx, screenOriginY + 4);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.fillText(formatGridNumber(x), sx, axisLabelPosY);
  }

  // Y Axis Labels
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  for (let y = startMajorY; y <= yMax; y += majorStep) {
    if (Math.abs(y) < majorStep * 0.05) continue;
    const sy = toScreenY(y);
    if (sy < 20 || sy > height - 20) continue;

    // Small tick notch on axis
    if (screenOriginX >= 0 && screenOriginX <= width) {
      ctx.beginPath();
      ctx.moveTo(screenOriginX - 4, sy);
      ctx.lineTo(screenOriginX + 4, sy);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.fillText(formatGridNumber(y), axisLabelPosX, sy);
  }

  // Origin "0" label
  if (screenOriginX >= 15 && screenOriginX <= width - 15 &&
      screenOriginY >= 15 && screenOriginY <= height - 15) {
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('0', screenOriginX - 6, screenOriginY + 5);
  }

  ctx.restore();
}

// Clean number formatting for tick marks (avoids floating point artifacts)
function formatGridNumber(val) {
  if (Math.abs(val) >= 10000 || (Math.abs(val) > 0 && Math.abs(val) < 0.001)) {
    return val.toExponential(1);
  }
  // Round to up to 4 significant digits without trailing zeros
  const rounded = Number(val.toPrecision(6));
  return String(rounded);
}

// Draw an individual Shape onto Canvas
function drawShape(shape, isActive) {
  ctx.save();

  const sx = toScreenX(shape.x);
  const sy = toScreenY(shape.y);

  // Apply rotation transformation around shape's center
  if (shape.rotation) {
    ctx.translate(sx, sy);
    ctx.rotate(shape.rotation);
    ctx.translate(-sx, -sy);
  }

  // Active shape selection glow/outline
  if (isActive) {
    ctx.shadowColor = 'rgba(37, 99, 235, 0.55)';
    ctx.shadowBlur = 14;
  }

  ctx.fillStyle = shape.fillColor;
  ctx.strokeStyle = isActive ? '#2563eb' : shape.strokeColor;
  ctx.lineWidth = isActive ? 2.5 : 2;

  let labelText = '';

  switch (shape.id) {
    case 'square': {
      const s = shape.side * gridState.scale;
      ctx.beginPath();
      ctx.rect(sx - s / 2, sy - s / 2, s, s);
      ctx.fill();
      ctx.stroke();
      labelText = `${shape.side} × ${shape.side}`;
      break;
    }
    case 'rectangle': {
      const w = shape.width * gridState.scale;
      const l = shape.length * gridState.scale;
      ctx.beginPath();
      ctx.rect(sx - w / 2, sy - l / 2, w, l);
      ctx.fill();
      ctx.stroke();
      labelText = `${shape.width} × ${shape.length}`;
      break;
    }
    case 'circle': {
      const r = shape.radius * gridState.scale;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Radius reference line from center to right
      ctx.beginPath();
      ctx.setLineDash([3, 3]);
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + r, sy);
      ctx.strokeStyle = shape.strokeColor;
      ctx.stroke();
      ctx.setLineDash([]);

      labelText = `r = ${shape.radius}`;
      break;
    }
    case 'ellipse': {
      const rx = shape.radiusX * gridState.scale;
      const ry = shape.radiusY * gridState.scale;
      ctx.beginPath();
      ctx.ellipse(sx, sy, Math.max(1, rx), Math.max(1, ry), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      labelText = `${shape.radiusX} × ${shape.radiusY}`;
      break;
    }
    case 'triangle': {
      const verts = getTriangleVertices(shape);
      ctx.beginPath();
      for (let i = 0; i < verts.length; i++) {
        const vx = toScreenX(verts[i].x);
        const vy = toScreenY(verts[i].y);
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      labelText = `${shape.sideA}, ${shape.sideB}, ${shape.sideC}`;
      break;
    }
    case 'pentagon': {
      const verts = getRegularPolygonVertices(shape.x, shape.y, 5, shape.side);
      ctx.beginPath();
      for (let i = 0; i < verts.length; i++) {
        const vx = toScreenX(verts[i].x);
        const vy = toScreenY(verts[i].y);
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      labelText = `Side: ${shape.side}`;
      break;
    }
    case 'hexagon': {
      const verts = getRegularPolygonVertices(shape.x, shape.y, 6, shape.side);
      ctx.beginPath();
      for (let i = 0; i < verts.length; i++) {
        const vx = toScreenX(verts[i].x);
        const vy = toScreenY(verts[i].y);
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      labelText = `Side: ${shape.side}`;
      break;
    }
  }

  // Draw Center Point Indicator
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = isActive ? '#2563eb' : shape.color;
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Draw Dimension Badge on Shape (matching ASCII summary: [2×4])
  if (labelText) {
    drawDimensionBadge(sx, sy - 8, labelText, shape.color);
  }

  // If active, draw clean selection indicator corners & rotation handle
  if (isActive) {
    drawActiveSelectionIndicators(shape, sx, sy);
  }

  ctx.restore();
}

// Draw centered dimension text tag on shape
function drawDimensionBadge(x, y, text, themeColor) {
  ctx.save();
  ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const textWidth = ctx.measureText(text).width;
  const paddingX = 7;
  const paddingY = 3.5;
  const badgeWidth = textWidth + paddingX * 2;
  const badgeHeight = 18;

  // Background pill
  ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
  ctx.strokeStyle = 'rgba(203, 213, 225, 0.9)';
  ctx.lineWidth = 1;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 1;

  ctx.beginPath();
  ctx.roundRect(x - badgeWidth / 2, y - badgeHeight / 2, badgeWidth, badgeHeight, 6);
  ctx.fill();
  ctx.stroke();

  // Text
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = '#1e293b';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
  ctx.restore();
}

// Subtle dashed selection boundary, rotation handle, and resize handles for active shape
function drawActiveSelectionIndicators(shape, sx, sy) {
  ctx.save();
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);

  const { halfW, halfH } = getShapeHalfExtents(shape);

  // 1. Dashed bounding box
  ctx.beginPath();
  ctx.roundRect(sx - halfW, sy - halfH, halfW * 2, halfH * 2, 6);
  ctx.stroke();

  // 2. Rotation handle stem & handle knob
  const stem = 24;
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.moveTo(sx, sy - halfH);
  ctx.lineTo(sx, sy - halfH - stem);
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Handle circle (rotation)
  ctx.beginPath();
  ctx.arc(sx, sy - halfH - stem, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Handle center dot
  ctx.beginPath();
  ctx.arc(sx, sy - halfH - stem, 2, 0, Math.PI * 2);
  ctx.fillStyle = '#2563eb';
  ctx.fill();

  // 3. Resize handles (8 square handles on corners and edges)
  const handles = getShapeResizeHandles(shape);
  const handleSize = 7.5;
  const halfS = handleSize / 2;
  ctx.setLineDash([]);
  handles.forEach(h => {
    const hx = sx + h.x;
    const hy = sy + h.y;
    ctx.beginPath();
    ctx.rect(hx - halfS, hy - halfS, handleSize, handleSize);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  ctx.restore();
}

// --- DIMENSIONS PANEL (Bottom-Left) ---
function renderAllPanels() {
  renderDimensionsPanel();
  renderPropertiesPanel();
}

function build3DPositionControlsHtml(shape) {
  const posX = shape.x || 0;
  const posY = shape.y3D || 0;
  const posZ = shape.z !== undefined ? shape.z : 0;

  return `
    <div class="dim-section-box">
      <div class="dim-section-header">
        <span class="dim-section-label">3D Position (Coordinates):</span>
        <button type="button" class="dim-center-btn" id="btnResetPosOrigin" title="Reset to Origin (0,0,0)">
          (0, 0, 0)
        </button>
      </div>

      <div class="dim-pos-grid">
        <!-- X Axis -->
        <div class="pos-input-col">
          <div class="pos-axis-header">
            <span class="pos-badge badge-x">X</span>
          </div>
          <div class="pos-control-row">
            <button type="button" class="pos-step-btn" data-axis="x" data-dir="-1" title="Step -0.5 units">−</button>
            <input type="number" id="input_pos_x" class="pos-number-input" step="0.5" value="${posX.toFixed(1)}" />
            <button type="button" class="pos-step-btn" data-axis="x" data-dir="1" title="Step +0.5 units">+</button>
          </div>
        </div>

        <!-- Y Axis -->
        <div class="pos-input-col">
          <div class="pos-axis-header">
            <span class="pos-badge badge-y">Y</span>
          </div>
          <div class="pos-control-row">
            <button type="button" class="pos-step-btn" data-axis="y" data-dir="-1" title="Step -0.5 units">−</button>
            <input type="number" id="input_pos_y" class="pos-number-input" step="0.5" value="${posY.toFixed(1)}" />
            <button type="button" class="pos-step-btn" data-axis="y" data-dir="1" title="Step +0.5 units">+</button>
          </div>
        </div>

        <!-- Z Axis -->
        <div class="pos-input-col">
          <div class="pos-axis-header">
            <span class="pos-badge badge-z">Z</span>
          </div>
          <div class="pos-control-row">
            <button type="button" class="pos-step-btn" data-axis="z" data-dir="-1" title="Step -0.5 units">−</button>
            <input type="number" id="input_pos_z" class="pos-number-input" step="0.5" value="${posZ.toFixed(1)}" />
            <button type="button" class="pos-step-btn" data-axis="z" data-dir="1" title="Step +0.5 units">+</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function attach3DPositionControlListeners(shape) {
  const syncPos = () => {
    const posX = shape.x || 0;
    const posY = shape.y3D || 0;
    const posZ = shape.z !== undefined ? shape.z : 0;
    if (currentViewMode === '3d' && threeShapeGroup) {
      const mesh = threeShapeGroup.children.find(m => m.userData && m.userData.shapeId === shape.id && !m.userData.isGizmoRoot);
      if (mesh) mesh.position.set(posX, posY, posZ);
      const gizmo = threeShapeGroup.children.find(m => m.userData && m.userData.isGizmoRoot && m.userData.shapeId === shape.id);
      if (gizmo) gizmo.position.set(posX, posY, posZ);
    }
    updateDimensionsPanelValues();
    renderPropertiesPanel();
  };

  ['x', 'y', 'z'].forEach(axis => {
    const input = document.getElementById(`input_pos_${axis}`);
    if (input) {
      input.addEventListener('input', () => {
        const val = parseFloat(input.value);
        if (!isNaN(val)) {
          if (axis === 'x') shape.x = val;
          else if (axis === 'y') shape.y3D = val;
          else if (axis === 'z') shape.z = val;
          syncPos();
        }
      });
      input.addEventListener('change', () => {
        const val = parseFloat(input.value);
        if (!isNaN(val)) {
          input.value = val.toFixed(1);
        }
      });
    }
  });

  // Step buttons (+ / - 0.5)
  const stepBtns = document.querySelectorAll('.pos-step-btn');
  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const axis = btn.getAttribute('data-axis');
      const dir = parseFloat(btn.getAttribute('data-dir')) || 1;
      const step = 0.5 * dir;
      if (axis === 'x') shape.x = Math.round(((shape.x || 0) + step) * 10) / 10;
      else if (axis === 'y') shape.y3D = Math.round(((shape.y3D || 0) + step) * 10) / 10;
      else if (axis === 'z') shape.z = Math.round(((shape.z !== undefined ? shape.z : 0) + step) * 10) / 10;
      syncPos();
    });
  });

  // Reset to Origin (0,0,0) button
  const btnResetOrigin = document.getElementById('btnResetPosOrigin');
  const resetHandler = () => {
    shape.x = 0;
    shape.y3D = 0;
    shape.z = 0;
    shape.y = 0;
    syncPos();
  };
  if (btnResetOrigin) btnResetOrigin.addEventListener('click', resetHandler);
}

function renderDimensionsPanel() {
  const badge = document.getElementById('dimActiveShapeTag');
  const body = document.getElementById('dimensionsBody');
  const panelTitle = document.getElementById('dimPanelTitle');
  const panelIcon = document.getElementById('dimPanelIcon');
  if (!body) return;

  const shape = activeShapeId ? SHAPES[activeShapeId] : null;

  if (!shape || !shape.visible) {
    if (badge) badge.textContent = 'None';
    if (panelTitle) panelTitle.textContent = currentViewMode === '3d' ? '3D Construction' : 'Dimensions';
    if (panelIcon) panelIcon.textContent = currentViewMode === '3d' ? '🏗️' : '📏';
    body.innerHTML = `
      <div class="no-active-shape-msg">
        Select a shape from the Shapes panel to view &amp; edit dimensions.
      </div>
    `;
    return;
  }

  const is3D = currentViewMode === '3d';

  if (is3D && !shape.is3DOnly) {
    // Dedicated 3D Construction & Modeling Environment for 2D Base Shapes
    if (panelIcon) panelIcon.textContent = '🏗️';
    if (panelTitle) panelTitle.textContent = '3D Construction';

    const solidType = shape.solid3DType || 'flat';
    let typeTagLabel = 'Flat Base';
    if (solidType === 'extrude') {
      typeTagLabel = shape.id === 'circle' ? 'Cylinder' : (shape.id === 'square' && Math.abs((shape.height3D || 3) - shape.side) < 1e-4 ? 'Cube' : 'Prism');
    } else if (solidType === 'pyramid') {
      typeTagLabel = (shape.id === 'circle' || shape.id === 'ellipse') ? 'Cone' : 'Pyramid';
    } else if (solidType === 'sphere') {
      typeTagLabel = 'Sphere';
    }

    if (badge) badge.textContent = `${shape.name} · ${typeTagLabel}`;

    // Compute base area & summary
    let baseArea = 0;
    let baseSummary = '';
    let baseInputsHtml = '';

    switch (shape.id) {
      case 'square': {
        baseArea = shape.side * shape.side;
        baseSummary = `Side: ${shape.side} units · Base Area: ${formatMetric(baseArea)} sq units`;
        baseInputsHtml = `
          <div class="dim-input-row">
            <label class="dim-label" for="dim_square_side">Base Side:</label>
            <div class="dim-control-wrap">
              <input type="number" id="dim_square_side" class="dim-number-input" min="0.001" step="any" value="${shape.side}" />
              <span class="dim-unit">units</span>
            </div>
          </div>
        `;
        break;
      }
      case 'rectangle': {
        baseArea = shape.width * shape.length;
        baseSummary = `Width: ${shape.width}, Length: ${shape.length} · Base Area: ${formatMetric(baseArea)} sq units`;
        baseInputsHtml = `
          <div class="dim-input-row">
            <label class="dim-label" for="dim_rect_width">Base Width:</label>
            <div class="dim-control-wrap">
              <input type="number" id="dim_rect_width" class="dim-number-input" min="0.001" step="any" value="${shape.width}" />
              <span class="dim-unit">units</span>
            </div>
          </div>
          <div class="dim-input-row">
            <label class="dim-label" for="dim_rect_length">Base Length:</label>
            <div class="dim-control-wrap">
              <input type="number" id="dim_rect_length" class="dim-number-input" min="0.001" step="any" value="${shape.length}" />
              <span class="dim-unit">units</span>
            </div>
          </div>
        `;
        break;
      }
      case 'circle': {
        baseArea = Math.PI * shape.radius * shape.radius;
        baseSummary = `Radius: ${shape.radius} units · Base Area: ${formatMetric(baseArea)} sq units`;
        baseInputsHtml = `
          <div class="dim-input-row">
            <label class="dim-label" for="dim_circle_radius">Base Radius:</label>
            <div class="dim-control-wrap">
              <input type="number" id="dim_circle_radius" class="dim-number-input" min="0.001" step="any" value="${shape.radius}" />
              <span class="dim-unit">units</span>
            </div>
          </div>
        `;
        break;
      }
      case 'triangle': {
        const a = shape.sideA, b = shape.sideB, c = shape.sideC;
        const s = (a + b + c) / 2;
        const rad = s * (s - a) * (s - b) * (s - c);
        baseArea = rad > 0 ? Math.sqrt(rad) : 0;
        baseSummary = `Sides: ${a}, ${b}, ${c} · Base Area: ${formatMetric(baseArea)} sq units`;
        baseInputsHtml = `
          <div class="dim-input-row">
            <label class="dim-label" for="dim_tri_a">Side A:</label>
            <div class="dim-control-wrap">
              <input type="number" id="dim_tri_a" class="dim-number-input" min="0.001" step="any" value="${shape.sideA}" />
              <span class="dim-unit">units</span>
            </div>
          </div>
          <div class="dim-input-row">
            <label class="dim-label" for="dim_tri_b">Side B:</label>
            <div class="dim-control-wrap">
              <input type="number" id="dim_tri_b" class="dim-number-input" min="0.001" step="any" value="${shape.sideB}" />
              <span class="dim-unit">units</span>
            </div>
          </div>
          <div class="dim-input-row">
            <label class="dim-label" for="dim_tri_c">Side C:</label>
            <div class="dim-control-wrap">
              <input type="number" id="dim_tri_c" class="dim-number-input" min="0.001" step="any" value="${shape.sideC}" />
              <span class="dim-unit">units</span>
            </div>
          </div>
        `;
        break;
      }
      case 'pentagon': {
        const s = shape.side;
        baseArea = (5 / 4) * s * s / Math.tan(Math.PI / 5);
        baseSummary = `Side: ${s} units · Base Area: ${formatMetric(baseArea)} sq units`;
        baseInputsHtml = `
          <div class="dim-input-row">
            <label class="dim-label" for="dim_poly_side">Side:</label>
            <div class="dim-control-wrap">
              <input type="number" id="dim_poly_side" class="dim-number-input" min="0.001" step="any" value="${shape.side}" />
              <span class="dim-unit">units</span>
            </div>
          </div>
        `;
        break;
      }
      case 'hexagon': {
        const s = shape.side;
        baseArea = ((3 * Math.sqrt(3)) / 2) * s * s;
        baseSummary = `Side: ${s} units · Base Area: ${formatMetric(baseArea)} sq units`;
        baseInputsHtml = `
          <div class="dim-input-row">
            <label class="dim-label" for="dim_poly_side">Side:</label>
            <div class="dim-control-wrap">
              <input type="number" id="dim_poly_side" class="dim-number-input" min="0.001" step="any" value="${shape.side}" />
              <span class="dim-unit">units</span>
            </div>
          </div>
        `;
        break;
      }
      case 'ellipse': {
        baseArea = Math.PI * shape.radiusX * shape.radiusY;
        baseSummary = `Radius X: ${shape.radiusX}, Radius Y: ${shape.radiusY} · Base Area: ${formatMetric(baseArea)} sq units`;
        baseInputsHtml = `
          <div class="dim-input-row">
            <label class="dim-label" for="dim_ellipse_rx">Radius X:</label>
            <div class="dim-control-wrap">
              <input type="number" id="dim_ellipse_rx" class="dim-number-input" min="0.001" step="any" value="${shape.radiusX}" />
              <span class="dim-unit">units</span>
            </div>
          </div>
          <div class="dim-input-row">
            <label class="dim-label" for="dim_ellipse_ry">Radius Y:</label>
            <div class="dim-control-wrap">
              <input type="number" id="dim_ellipse_ry" class="dim-number-input" min="0.001" step="any" value="${shape.radiusY}" />
              <span class="dim-unit">units</span>
            </div>
          </div>
        `;
        break;
      }
    }

    const currentHeight = shape.height3D !== undefined ? shape.height3D : (shape.depth !== undefined ? shape.depth : 3);

    // Transformation options
    const optFlat = `
      <button type="button" class="construction-opt-btn ${solidType === 'flat' ? 'active' : ''}" data-type="flat" id="opt_flat">
        <span class="opt-icon">⬚</span>
        <span class="opt-label">Flat Base</span>
      </button>
    `;
    const optExtrude = `
      <button type="button" class="construction-opt-btn ${solidType === 'extrude' ? 'active' : ''}" data-type="extrude" id="opt_extrude">
        <span class="opt-icon">▤</span>
        <span class="opt-label">${shape.id === 'circle' ? 'Extrude (Cyl)' : 'Add Height'}</span>
      </button>
    `;
    const optPyramid = `
      <button type="button" class="construction-opt-btn ${solidType === 'pyramid' ? 'active' : ''}" data-type="pyramid" id="opt_pyramid">
        <span class="opt-icon">▲</span>
        <span class="opt-label">${shape.id === 'circle' || shape.id === 'ellipse' ? 'Cone' : 'Pyramid'}</span>
      </button>
    `;
    const optSphere = shape.id === 'circle' ? `
      <button type="button" class="construction-opt-btn ${solidType === 'sphere' ? 'active' : ''}" data-type="sphere" id="opt_sphere">
        <span class="opt-icon">●</span>
        <span class="opt-label">Sphere</span>
      </button>
    ` : '';

    // Parameters section
    let paramsSectionHtml = '';
    if (solidType === 'flat') {
      paramsSectionHtml = '';
    } else if (solidType === 'extrude' || solidType === 'pyramid') {
      const heightLabel = solidType === 'pyramid' ? 'Apex Height (h):' : 'Height / Depth (h):';
      paramsSectionHtml = `
        <div class="dim-section-box">
          <div class="dim-section-header">
            <span class="dim-section-label">${heightLabel}</span>
            <span class="dim-unit">units</span>
          </div>
          <div class="dim-slider-row">
            <input type="range" id="dim_3d_height_slider" class="dim-range-slider"
                   min="0.1" max="10" step="0.1" value="${currentHeight}" />
            <input type="number" id="dim_3d_height_num" class="dim-number-input"
                   min="0.001" step="any" value="${currentHeight}" />
          </div>
          <div class="dim-preset-pills">
            <span class="preset-label">Presets:</span>
            <button type="button" class="preset-pill" data-val="1">h=1</button>
            <button type="button" class="preset-pill" data-val="2">h=2</button>
            <button type="button" class="preset-pill" data-val="3">h=3</button>
            <button type="button" class="preset-pill" data-val="4">h=4</button>
            <button type="button" class="preset-pill" data-val="5">h=5</button>
            ${shape.id === 'square' && solidType === 'extrude' ? `
              <button type="button" class="preset-pill highlight" data-val="${shape.side}">Cube (h=s)</button>
            ` : ''}
          </div>
        </div>
      `;
    } else if (solidType === 'sphere') {
      paramsSectionHtml = '';
    }

    body.innerHTML = `
      <div class="dim-section-box">
        <div class="dim-section-header">
          <span class="dim-section-label">2D Base Shape:</span>
          <span class="dim-section-val">${shape.name}</span>
        </div>
        <div class="dim-base-params-summary">${baseSummary}</div>
        <button type="button" class="dim-toggle-base-btn" id="btnToggleBaseInputs">
          Edit Base Dimensions ▾
        </button>
        <div class="dim-base-inputs-drawer" id="baseInputsDrawer" style="display: none;">
          ${baseInputsHtml}
        </div>
      </div>

      <div class="dim-section-box">
        <div class="dim-section-title">3D Transformation:</div>
        <div class="construction-options-grid">
          ${optFlat}
          ${optExtrude}
          ${optPyramid}
          ${optSphere}
        </div>
      </div>

      ${paramsSectionHtml}

      ${build3DPositionControlsHtml(shape)}

      <div class="dim-footer-note">
        <span id="shapePosLabel">Pos: (${shape.x.toFixed(1)}, ${(shape.y3D || 0).toFixed(1)}, ${(shape.z !== undefined ? shape.z : 0).toFixed(1)})</span>
        <div class="dim-footer-actions">
          <button type="button" class="dim-center-btn" id="btnCenterShape" title="Center shape at (0,0,0)">
            Center (0,0,0)
          </button>
          ${solidType !== 'flat' ? `
            <button type="button" class="dim-center-btn reset-flat-btn" id="btnResetToFlat" title="Reset to Flat 2D Base">
              Revert to 2D
            </button>
          ` : ''}
        </div>
      </div>

      <div id="triangleWarning" style="display: none;" class="dim-warning-msg">
        Invalid triangle: sum of any two sides must exceed the third.
      </div>
    `;

    attach3DConstructionListeners(shape);
    attach3DPositionControlListeners(shape);
    return;
  }

  // 2D View Mode or 3D-only Shapes
  if (panelIcon) panelIcon.textContent = is3D ? '📐' : '📏';
  if (panelTitle) panelTitle.textContent = is3D ? '3D Dimensions' : 'Dimensions';
  if (badge) badge.textContent = shape.name;

  let inputsHtml = '';

  switch (shape.id) {
    case 'square':
      inputsHtml = `
        <div class="dim-input-row">
          <label class="dim-label" for="dim_square_side">Side:</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_square_side" class="dim-number-input"
                   min="0.001" step="any" value="${shape.side}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
      `;
      break;

    case 'rectangle':
      inputsHtml = `
        <div class="dim-input-row">
          <label class="dim-label" for="dim_rect_width">Width:</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_rect_width" class="dim-number-input"
                   min="0.001" step="any" value="${shape.width}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
        <div class="dim-input-row">
          <label class="dim-label" for="dim_rect_length">Length:</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_rect_length" class="dim-number-input"
                   min="0.001" step="any" value="${shape.length}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
      `;
      break;

    case 'circle':
      inputsHtml = `
        <div class="dim-input-row">
          <label class="dim-label" for="dim_circle_radius">Radius:</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_circle_radius" class="dim-number-input"
                   min="0.001" step="any" value="${shape.radius}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
      `;
      break;

    case 'triangle':
      inputsHtml = `
        <div class="dim-input-row">
          <label class="dim-label" for="dim_tri_a">Side A:</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_tri_a" class="dim-number-input"
                   min="0.001" step="any" value="${shape.sideA}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
        <div class="dim-input-row">
          <label class="dim-label" for="dim_tri_b">Side B:</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_tri_b" class="dim-number-input"
                   min="0.001" step="any" value="${shape.sideB}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
        <div class="dim-input-row">
          <label class="dim-label" for="dim_tri_c">Side C:</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_tri_c" class="dim-number-input"
                   min="0.001" step="any" value="${shape.sideC}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
      `;
      break;

    case 'pentagon':
    case 'hexagon':
      inputsHtml = `
        <div class="dim-input-row">
          <label class="dim-label" for="dim_poly_side">Side:</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_poly_side" class="dim-number-input"
                   min="0.001" step="any" value="${shape.side}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
      `;
      break;

    case 'ellipse':
      inputsHtml = `
        <div class="dim-input-row">
          <label class="dim-label" for="dim_ellipse_rx">Radius X (a):</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_ellipse_rx" class="dim-number-input"
                   min="0.001" step="any" value="${shape.radiusX}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
        <div class="dim-input-row">
          <label class="dim-label" for="dim_ellipse_ry">Radius Y (b):</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_ellipse_ry" class="dim-number-input"
                   min="0.001" step="any" value="${shape.radiusY}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
      `;
      break;

    case 'sphere':
      inputsHtml = `
        <div class="dim-input-row">
          <label class="dim-label" for="dim_sphere_radius">Radius (r):</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_sphere_radius" class="dim-number-input"
                   min="0.001" step="any" value="${shape.radius}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
      `;
      break;

    case 'pyramid':
      inputsHtml = `
        <div class="dim-input-row">
          <label class="dim-label" for="dim_pyramid_base">Base Side (b):</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_pyramid_base" class="dim-number-input"
                   min="0.001" step="any" value="${shape.baseSize}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
        <div class="dim-input-row">
          <label class="dim-label" for="dim_pyramid_height">Height (h):</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_pyramid_height" class="dim-number-input"
                   min="0.001" step="any" value="${shape.height}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
      `;
      break;

    case 'cone':
      inputsHtml = `
        <div class="dim-input-row">
          <label class="dim-label" for="dim_cone_radius">Radius (r):</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_cone_radius" class="dim-number-input"
                   min="0.001" step="any" value="${shape.radius}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
        <div class="dim-input-row">
          <label class="dim-label" for="dim_cone_height">Height (h):</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_cone_height" class="dim-number-input"
                   min="0.001" step="any" value="${shape.height}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
      `;
      break;

    case 'torus':
      inputsHtml = `
        <div class="dim-input-row">
          <label class="dim-label" for="dim_torus_radius">Radius (R):</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_torus_radius" class="dim-number-input"
                   min="0.001" step="any" value="${shape.radius}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
        <div class="dim-input-row">
          <label class="dim-label" for="dim_torus_tube">Tube (r):</label>
          <div class="dim-control-wrap">
            <input type="number" id="dim_torus_tube" class="dim-number-input"
                   min="0.001" step="any" value="${shape.tube}" />
            <span class="dim-unit">units</span>
          </div>
        </div>
      `;
      break;
  }

  const posControlsHtml = is3D ? build3DPositionControlsHtml(shape) : '';

  body.innerHTML = `
    ${inputsHtml}
    ${posControlsHtml}
    <div class="dim-footer-note">
      <span id="shapePosLabel">${is3D ? `Pos: (${shape.x.toFixed(1)}, ${(shape.y3D || 0).toFixed(1)}, ${(shape.z !== undefined ? shape.z : 0).toFixed(1)})` : `Center: (${shape.x.toFixed(1)}, ${shape.y.toFixed(1)})`}</span>
      <button type="button" class="dim-center-btn" id="btnCenterShape" title="${is3D ? 'Center shape at (0,0,0)' : 'Center shape at (0,0)'}">
        ${is3D ? 'Center (0,0,0)' : 'Center at (0,0)'}
      </button>
    </div>
    <div id="triangleWarning" style="display: none;" class="dim-warning-msg">
      Invalid triangle: sum of any two sides must exceed the third.
    </div>
  `;

  attachDimensionInputListeners(shape);
  if (is3D) {
    attach3DPositionControlListeners(shape);
  }
}

function attach3DConstructionListeners(shape) {
  // Center shape button
  const btnCenter = document.getElementById('btnCenterShape');
  if (btnCenter) {
    btnCenter.addEventListener('click', () => {
      shape.x = 0;
      shape.y = 0;
      rebuildThreeShapes();
      updateDimensionsPanelValues();
      renderPropertiesPanel();
    });
  }

  // Revert to 2D flat base button
  const btnReset = document.getElementById('btnResetToFlat');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      shape.solid3DType = 'flat';
      rebuildThreeShapes();
      renderDimensionsPanel();
      renderPropertiesPanel();
    });
  }

  // Toggle base dimensions drawer button
  const btnToggleDrawer = document.getElementById('btnToggleBaseInputs');
  const drawer = document.getElementById('baseInputsDrawer');
  if (btnToggleDrawer && drawer) {
    btnToggleDrawer.addEventListener('click', () => {
      const isHidden = drawer.style.display === 'none';
      drawer.style.display = isHidden ? 'flex' : 'none';
      btnToggleDrawer.textContent = isHidden ? 'Hide Base Dimensions ▴' : 'Edit Base Dimensions ▾';
    });
  }

  // Transformation options buttons
  const optBtns = document.querySelectorAll('.construction-opt-btn');
  optBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetType = btn.getAttribute('data-type');
      shape.solid3DType = targetType;
      rebuildThreeShapes();
      renderDimensionsPanel();
      renderPropertiesPanel();
    });
  });

  // Height slider & number input
  const heightSlider = document.getElementById('dim_3d_height_slider');
  const heightNum = document.getElementById('dim_3d_height_num');

  const onHeightUpdate = (val) => {
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      shape.height3D = parsed;
      shape.depth = parsed;
      if (heightSlider && document.activeElement !== heightSlider) heightSlider.value = parsed;
      if (heightNum && document.activeElement !== heightNum) heightNum.value = parsed;
      rebuildThreeShapes();
      renderPropertiesPanel();
    }
  };

  if (heightSlider) {
    heightSlider.addEventListener('input', () => onHeightUpdate(heightSlider.value));
  }
  if (heightNum) {
    heightNum.addEventListener('input', () => onHeightUpdate(heightNum.value));
    heightNum.addEventListener('change', () => onHeightUpdate(heightNum.value));
  }

  // Height presets
  const presetPills = document.querySelectorAll('.preset-pill');
  presetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const val = parseFloat(pill.getAttribute('data-val'));
      if (!isNaN(val)) {
        onHeightUpdate(val);
      }
    });
  });

  // Base input listeners (in drawer)
  const handleInputUpdate = (inputEl, property) => {
    if (!inputEl) return;
    const updateVal = () => {
      const parsed = parseFloat(inputEl.value);
      if (!isNaN(parsed) && parsed > 0) {
        shape[property] = parsed;

        if (shape.id === 'triangle') {
          const a = shape.sideA;
          const b = shape.sideB;
          const c = shape.sideC;
          const warnEl = document.getElementById('triangleWarning');
          if (warnEl) {
            warnEl.style.display = (a + b <= c || a + c <= b || b + c <= a) ? 'block' : 'none';
          }
        }

        rebuildThreeShapes();
        renderPropertiesPanel();
      }
    };
    inputEl.addEventListener('input', updateVal);
    inputEl.addEventListener('change', updateVal);
  };

  switch (shape.id) {
    case 'square':
      handleInputUpdate(document.getElementById('dim_square_side'), 'side');
      break;
    case 'rectangle':
      handleInputUpdate(document.getElementById('dim_rect_width'), 'width');
      handleInputUpdate(document.getElementById('dim_rect_length'), 'length');
      break;
    case 'circle':
      handleInputUpdate(document.getElementById('dim_circle_radius'), 'radius');
      break;
    case 'triangle':
      handleInputUpdate(document.getElementById('dim_tri_a'), 'sideA');
      handleInputUpdate(document.getElementById('dim_tri_b'), 'sideB');
      handleInputUpdate(document.getElementById('dim_tri_c'), 'sideC');
      break;
    case 'pentagon':
    case 'hexagon':
      handleInputUpdate(document.getElementById('dim_poly_side'), 'side');
      break;
    case 'ellipse':
      handleInputUpdate(document.getElementById('dim_ellipse_rx'), 'radiusX');
      handleInputUpdate(document.getElementById('dim_ellipse_ry'), 'radiusY');
      break;
  }
}

function attachDimensionInputListeners(shape) {
  const btnCenter = document.getElementById('btnCenterShape');
  if (btnCenter) {
    btnCenter.addEventListener('click', () => {
      shape.x = 0;
      shape.y = 0;
      render();
      if (currentViewMode === '3d') {
        rebuildThreeShapes();
      }
      updateDimensionsPanelValues();
      renderPropertiesPanel();
    });
  }

  const handleInputUpdate = (inputEl, property) => {
    if (!inputEl) return;
    const updateVal = () => {
      const parsed = parseFloat(inputEl.value);
      if (!isNaN(parsed) && parsed > 0) {
        shape[property] = parsed;

        if (shape.id === 'triangle') {
          const a = shape.sideA;
          const b = shape.sideB;
          const c = shape.sideC;
          const warnEl = document.getElementById('triangleWarning');
          if (warnEl) {
            warnEl.style.display = (a + b <= c || a + c <= b || b + c <= a) ? 'block' : 'none';
          }
        }

        render();
        if (currentViewMode === '3d') {
          rebuildThreeShapes();
        }
        renderPropertiesPanel();
      }
    };

    inputEl.addEventListener('input', updateVal);
    inputEl.addEventListener('change', updateVal);
  };

  switch (shape.id) {
    case 'square':
      handleInputUpdate(document.getElementById('dim_square_side'), 'side');
      break;
    case 'rectangle':
      handleInputUpdate(document.getElementById('dim_rect_width'), 'width');
      handleInputUpdate(document.getElementById('dim_rect_length'), 'length');
      break;
    case 'circle':
      handleInputUpdate(document.getElementById('dim_circle_radius'), 'radius');
      break;
    case 'triangle':
      handleInputUpdate(document.getElementById('dim_tri_a'), 'sideA');
      handleInputUpdate(document.getElementById('dim_tri_b'), 'sideB');
      handleInputUpdate(document.getElementById('dim_tri_c'), 'sideC');
      break;
    case 'pentagon':
    case 'hexagon':
      handleInputUpdate(document.getElementById('dim_poly_side'), 'side');
      break;
    case 'ellipse':
      handleInputUpdate(document.getElementById('dim_ellipse_rx'), 'radiusX');
      handleInputUpdate(document.getElementById('dim_ellipse_ry'), 'radiusY');
      break;
    case 'sphere':
      handleInputUpdate(document.getElementById('dim_sphere_radius'), 'radius');
      break;
    case 'pyramid':
      handleInputUpdate(document.getElementById('dim_pyramid_base'), 'baseSize');
      handleInputUpdate(document.getElementById('dim_pyramid_height'), 'height');
      break;
    case 'cone':
      handleInputUpdate(document.getElementById('dim_cone_radius'), 'radius');
      handleInputUpdate(document.getElementById('dim_cone_height'), 'height');
      break;
    case 'torus':
      handleInputUpdate(document.getElementById('dim_torus_radius'), 'radius');
      handleInputUpdate(document.getElementById('dim_torus_tube'), 'tube');
      break;
  }
}

function updateDimensionsPanelValues() {
  const shape = activeShapeId ? SHAPES[activeShapeId] : null;
  if (!shape) return;
  const posLabel = document.getElementById('shapePosLabel');
  if (posLabel) {
    if (currentViewMode === '3d') {
      const zVal = shape.z !== undefined ? shape.z : 0;
      const y3DVal = shape.y3D !== undefined ? shape.y3D : 0;
      posLabel.textContent = `Pos: (${shape.x.toFixed(1)}, ${y3DVal.toFixed(1)}, ${zVal.toFixed(1)})`;
    } else {
      posLabel.textContent = `Center: (${shape.x.toFixed(1)}, ${shape.y.toFixed(1)})`;
    }
  }

  const setInputVal = (id, val) => {
    const el = document.getElementById(id);
    if (el && document.activeElement !== el) {
      el.value = typeof val === 'number' ? (Math.round(val * 100) / 100) : val;
    }
  };

  // Sync 3D numeric position inputs if present
  setInputVal('input_pos_x', shape.x || 0);
  setInputVal('input_pos_y', shape.y3D || 0);
  setInputVal('input_pos_z', shape.z !== undefined ? shape.z : 0);

  // 3D Height inputs if active
  const curH = shape.height3D !== undefined ? shape.height3D : (shape.depth !== undefined ? shape.depth : 3);
  setInputVal('dim_3d_height_slider', curH);
  setInputVal('dim_3d_height_num', curH);

  switch (shape.id) {
    case 'square':
      setInputVal('dim_square_side', shape.side);
      break;
    case 'rectangle':
      setInputVal('dim_rect_width', shape.width);
      setInputVal('dim_rect_length', shape.length);
      break;
    case 'circle':
      setInputVal('dim_circle_radius', shape.radius);
      break;
    case 'triangle':
      setInputVal('dim_tri_a', shape.sideA);
      setInputVal('dim_tri_b', shape.sideB);
      setInputVal('dim_tri_c', shape.sideC);
      break;
    case 'pentagon':
    case 'hexagon':
      setInputVal('dim_poly_side', shape.side);
      break;
    case 'ellipse':
      setInputVal('dim_ellipse_rx', shape.radiusX);
      setInputVal('dim_ellipse_ry', shape.radiusY);
      break;
    case 'sphere':
      setInputVal('dim_sphere_radius', shape.radius);
      break;
    case 'pyramid':
      setInputVal('dim_pyramid_base', shape.baseSize);
      setInputVal('dim_pyramid_height', shape.height);
      break;
    case 'cone':
      setInputVal('dim_cone_radius', shape.radius);
      setInputVal('dim_cone_height', shape.height);
      break;
    case 'torus':
      setInputVal('dim_torus_radius', shape.radius);
      setInputVal('dim_torus_tube', shape.tube);
      break;
  }
}

// --- PROPERTIES / CALCULATOR PANEL (Bottom-Right) ---
function renderPropertiesPanel() {
  const badge = document.getElementById('propActiveShapeTag');
  const body = document.getElementById('propertiesBody');
  const propTitle = document.getElementById('propPanelTitle');
  const propIcon = document.getElementById('propPanelIcon');
  if (!body) return;

  const shape = activeShapeId ? SHAPES[activeShapeId] : null;

  if (!shape || !shape.visible) {
    if (badge) badge.textContent = 'None';
    if (propTitle) propTitle.textContent = 'Properties';
    if (propIcon) propIcon.textContent = '📊';
    body.innerHTML = `
      <div class="no-active-shape-msg">
        Select a shape from the Shapes panel to view properties.
      </div>
    `;
    return;
  }

  let rows = [];
  let formulaText = '';
  const is3D = currentViewMode === '3d';

  if (is3D) {
    const is2DShape = !shape.is3DOnly;
    const solidType = is2DShape ? (shape.solid3DType || 'flat') : 'solid';
    const depth = Math.max(0.001, shape.height3D !== undefined ? shape.height3D : (shape.depth !== undefined ? shape.depth : 3));

    if (propTitle) propTitle.textContent = solidType === 'flat' ? 'Base Properties' : '3D Solid Properties';

    if (is2DShape && solidType === 'flat') {
      // 2D Base Shape preserved in 3D Mode
      if (badge) badge.textContent = `${shape.name} (Base)`;

      let baseArea = 0;
      let perimeter = 0;

      switch (shape.id) {
        case 'square': {
          const s = shape.side;
          baseArea = s * s;
          perimeter = 4 * s;
          rows = [
            { label: 'Shape Type:', value: `${shape.name} (Flat 2D Base)` },
            { label: 'Side (s):', value: `${formatMetric(s)} units` },
            { label: 'Base Area (B):', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Perimeter (P):', value: `${formatMetric(perimeter)} units` },
            { label: 'Height (h):', value: '0.00 units (Flat)' },
            { label: 'Volume (V):', value: '0.00 cu units (Planar)' }
          ];
          formulaText = '2D Square Base: Area = s²  |  Perimeter = 4s  |  Select "Add Height" or "Pyramid" to construct a 3D solid.';
          break;
        }
        case 'rectangle': {
          const w = shape.width;
          const l = shape.length;
          baseArea = w * l;
          perimeter = 2 * (w + l);
          rows = [
            { label: 'Shape Type:', value: `${shape.name} (Flat 2D Base)` },
            { label: 'Width (w):', value: `${formatMetric(w)} units` },
            { label: 'Length (l):', value: `${formatMetric(l)} units` },
            { label: 'Base Area (B):', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Perimeter (P):', value: `${formatMetric(perimeter)} units` },
            { label: 'Height (h):', value: '0.00 units (Flat)' },
            { label: 'Volume (V):', value: '0.00 cu units (Planar)' }
          ];
          formulaText = '2D Rectangle Base: Area = w × l  |  Perimeter = 2(w+l)  |  Select "Add Height" or "Pyramid" to construct a 3D solid.';
          break;
        }
        case 'circle': {
          const r = shape.radius;
          baseArea = Math.PI * r * r;
          perimeter = 2 * Math.PI * r;
          rows = [
            { label: 'Shape Type:', value: `${shape.name} (Flat 2D Base)` },
            { label: 'Radius (r):', value: `${formatMetric(r)} units` },
            { label: 'Base Area (B):', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Circumference:', value: `${formatMetric(perimeter)} units` },
            { label: 'Height (h):', value: '0.00 units (Flat)' },
            { label: 'Volume (V):', value: '0.00 cu units (Planar)' }
          ];
          formulaText = '2D Circular Base: Area = πr²  |  Select "Extrude (Cyl)", "Cone", or "Sphere" to construct a 3D solid.';
          break;
        }
        case 'triangle': {
          const a = shape.sideA, b = shape.sideB, c = shape.sideC;
          perimeter = a + b + c;
          const s = perimeter / 2;
          const rad = s * (s - a) * (s - b) * (s - c);
          baseArea = rad > 0 ? Math.sqrt(rad) : 0;
          rows = [
            { label: 'Shape Type:', value: `${shape.name} (Flat 2D Base)` },
            { label: 'Sides:', value: `${formatMetric(a)}, ${formatMetric(b)}, ${formatMetric(c)}` },
            { label: 'Base Area (B):', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Perimeter (P):', value: `${formatMetric(perimeter)} units` },
            { label: 'Height (h):', value: '0.00 units (Flat)' },
            { label: 'Volume (V):', value: '0.00 cu units (Planar)' }
          ];
          formulaText = '2D Triangular Base: Area = √(s(s-a)(s-b)(s-c))  |  Select "Add Height" or "Pyramid" to construct a 3D solid.';
          break;
        }
        case 'pentagon': {
          const s = shape.side;
          perimeter = 5 * s;
          const apothem = s / (2 * Math.tan(Math.PI / 5));
          baseArea = (5 / 2) * s * apothem;
          rows = [
            { label: 'Shape Type:', value: `${shape.name} (Flat 2D Base)` },
            { label: 'Side (s):', value: `${formatMetric(s)} units` },
            { label: 'Base Area (B):', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Perimeter (P):', value: `${formatMetric(perimeter)} units` },
            { label: 'Height (h):', value: '0.00 units (Flat)' },
            { label: 'Volume (V):', value: '0.00 cu units (Planar)' }
          ];
          formulaText = '2D Pentagon Base: Area = ½ × Perimeter × Apothem  |  Select "Add Height" or "Pyramid" to construct a 3D solid.';
          break;
        }
        case 'hexagon': {
          const s = shape.side;
          perimeter = 6 * s;
          baseArea = ((3 * Math.sqrt(3)) / 2) * s * s;
          rows = [
            { label: 'Shape Type:', value: `${shape.name} (Flat 2D Base)` },
            { label: 'Side (s):', value: `${formatMetric(s)} units` },
            { label: 'Base Area (B):', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Perimeter (P):', value: `${formatMetric(perimeter)} units` },
            { label: 'Height (h):', value: '0.00 units (Flat)' },
            { label: 'Volume (V):', value: '0.00 cu units (Planar)' }
          ];
          formulaText = '2D Hexagon Base: Area = ((3√3)/2)s²  |  Select "Add Height" or "Pyramid" to construct a 3D solid.';
          break;
        }
        case 'ellipse': {
          const a = shape.radiusX, b = shape.radiusY;
          baseArea = Math.PI * a * b;
          const hParam = Math.pow(a - b, 2) / Math.pow(a + b, 2);
          perimeter = Math.PI * (a + b) * (1 + (3 * hParam) / (10 + Math.sqrt(4 - 3 * hParam)));
          rows = [
            { label: 'Shape Type:', value: `${shape.name} (Flat 2D Base)` },
            { label: 'Radius X (a):', value: `${formatMetric(a)} units` },
            { label: 'Radius Y (b):', value: `${formatMetric(b)} units` },
            { label: 'Base Area (B):', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Circumference:', value: `${formatMetric(perimeter)} units` },
            { label: 'Height (h):', value: '0.00 units (Flat)' },
            { label: 'Volume (V):', value: '0.00 cu units (Planar)' }
          ];
          formulaText = '2D Elliptical Base: Area = πab  |  Select "Add Height" or "Cone" to construct a 3D solid.';
          break;
        }
      }
    } else if (is2DShape && solidType === 'extrude') {
      // Extruded 3D Prism or Cylinder
      switch (shape.id) {
        case 'square': {
          const s = shape.side;
          const baseArea = s * s;
          const volume = baseArea * depth;
          const surfaceArea = 2 * baseArea + 4 * s * depth;
          const isCube = Math.abs(s - depth) < 1e-4;

          if (badge) badge.textContent = isCube ? 'Cube' : 'Square Prism';
          rows = [
            { label: 'Base Side (s):', value: `${formatMetric(s)} units` },
            { label: 'Height (h):', value: `${formatMetric(depth)} units` },
            { label: 'Base Area:', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Volume:', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area:', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = isCube ? 'Volume = s³  |  Surface Area = 6s²' : 'Volume = s²h  |  Surface Area = 2s² + 4sh';
          break;
        }

        case 'rectangle': {
          const w = shape.width;
          const l = shape.length;
          const baseArea = w * l;
          const volume = baseArea * depth;
          const surfaceArea = 2 * (w * l + w * depth + l * depth);

          if (badge) badge.textContent = 'Rectangular Prism';
          rows = [
            { label: 'Width (w):', value: `${formatMetric(w)} units` },
            { label: 'Length (l):', value: `${formatMetric(l)} units` },
            { label: 'Height (h):', value: `${formatMetric(depth)} units` },
            { label: 'Base Area:', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Volume:', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area:', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = 'Volume = w × l × h  |  Surface Area = 2(wl + wh + lh)';
          break;
        }

        case 'circle': {
          const r = shape.radius;
          const baseArea = Math.PI * r * r;
          const lateralArea = 2 * Math.PI * r * depth;
          const volume = baseArea * depth;
          const surfaceArea = 2 * baseArea + lateralArea;

          if (badge) badge.textContent = 'Cylinder';
          rows = [
            { label: 'Radius (r):', value: `${formatMetric(r)} units` },
            { label: 'Height (h):', value: `${formatMetric(depth)} units` },
            { label: 'Base Area:', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Lateral Area:', value: `${formatMetric(lateralArea)} sq units` },
            { label: 'Volume:', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area:', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = 'Volume = πr²h  |  Surface Area = 2πr² + 2πrh';
          break;
        }

        case 'triangle': {
          const a = shape.sideA, b = shape.sideB, c = shape.sideC;
          const perimeter = a + b + c;
          const s = perimeter / 2;
          const radicand = s * (s - a) * (s - b) * (s - c);
          const isValid = (a + b > c) && (a + c > b) && (b + c > a) && radicand > 0;
          const baseArea = isValid ? Math.sqrt(radicand) : 0;
          const volume = baseArea * depth;
          const surfaceArea = 2 * baseArea + perimeter * depth;

          if (badge) badge.textContent = 'Triangular Prism';
          rows = [
            { label: 'Base Sides:', value: `${formatMetric(a)}, ${formatMetric(b)}, ${formatMetric(c)}` },
            { label: 'Height (h):', value: `${formatMetric(depth)} units` },
            { label: 'Base Area:', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Volume:', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area:', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = 'Volume = (Base Area) × h  |  Surface Area = 2(Base Area) + (a+b+c)h';
          break;
        }

        case 'pentagon': {
          const s = shape.side;
          const apothem = s / (2 * Math.tan(Math.PI / 5));
          const baseArea = (5 / 2) * s * apothem;
          const volume = baseArea * depth;
          const surfaceArea = 2 * baseArea + 5 * s * depth;

          if (badge) badge.textContent = 'Pentagonal Prism';
          rows = [
            { label: 'Base Side (s):', value: `${formatMetric(s)} units` },
            { label: 'Height (h):', value: `${formatMetric(depth)} units` },
            { label: 'Base Area:', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Volume:', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area:', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = 'Volume = (Base Area) × h  |  Surface Area = 2(Base Area) + 5sh';
          break;
        }

        case 'hexagon': {
          const s = shape.side;
          const baseArea = ((3 * Math.sqrt(3)) / 2) * s * s;
          const volume = baseArea * depth;
          const surfaceArea = 2 * baseArea + 6 * s * depth;

          if (badge) badge.textContent = 'Hexagonal Prism';
          rows = [
            { label: 'Base Side (s):', value: `${formatMetric(s)} units` },
            { label: 'Height (h):', value: `${formatMetric(depth)} units` },
            { label: 'Base Area:', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Volume:', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area:', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = 'Volume = ((3√3)/2)s² × h  |  Surface Area = 3√3s² + 6sh';
          break;
        }

        case 'ellipse': {
          const a = shape.radiusX, b = shape.radiusY;
          const baseArea = Math.PI * a * b;
          const hParam = Math.pow(a - b, 2) / Math.pow(a + b, 2);
          const perimeter = Math.PI * (a + b) * (1 + (3 * hParam) / (10 + Math.sqrt(4 - 3 * hParam)));
          const volume = baseArea * depth;
          const surfaceArea = 2 * baseArea + perimeter * depth;

          if (badge) badge.textContent = 'Elliptical Cylinder';
          rows = [
            { label: 'Radius X (a):', value: `${formatMetric(a)} units` },
            { label: 'Radius Y (b):', value: `${formatMetric(b)} units` },
            { label: 'Height (h):', value: `${formatMetric(depth)} units` },
            { label: 'Base Area:', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Volume:', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area:', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = 'Volume = πabh  |  Surface Area = 2πab + (Perimeter) × h';
          break;
        }
      }
    } else if (is2DShape && solidType === 'pyramid') {
      // Pyramid or Cone constructed from 2D Base
      switch (shape.id) {
        case 'square': {
          const s = shape.side;
          const baseArea = s * s;
          const slant = Math.hypot(depth, s / 2);
          const volume = (1 / 3) * baseArea * depth;
          const surfaceArea = baseArea + 2 * s * slant;

          if (badge) badge.textContent = 'Square Pyramid';
          rows = [
            { label: 'Base Side (s):', value: `${formatMetric(s)} units` },
            { label: 'Height (h):', value: `${formatMetric(depth)} units` },
            { label: 'Slant Height (sₗ):', value: `${formatMetric(slant)} units` },
            { label: 'Base Area (B):', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Volume (V):', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area (A):', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = 'Volume = ⅓s²h  |  Surface Area = s² + 2s × sₗ  (sₗ = √(h² + (s/2)²))';
          break;
        }

        case 'rectangle': {
          const w = shape.width;
          const l = shape.length;
          const baseArea = w * l;
          const slantL = Math.hypot(depth, w / 2);
          const slantW = Math.hypot(depth, l / 2);
          const volume = (1 / 3) * baseArea * depth;
          const surfaceArea = baseArea + l * slantL + w * slantW;

          if (badge) badge.textContent = 'Rectangular Pyramid';
          rows = [
            { label: 'Width (w):', value: `${formatMetric(w)} units` },
            { label: 'Length (l):', value: `${formatMetric(l)} units` },
            { label: 'Height (h):', value: `${formatMetric(depth)} units` },
            { label: 'Base Area (B):', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Volume (V):', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area (A):', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = 'Volume = ⅓wlh  |  Surface Area = wl + l·s_l + w·s_w';
          break;
        }

        case 'circle': {
          const r = shape.radius;
          const baseArea = Math.PI * r * r;
          const slant = Math.hypot(r, depth);
          const volume = (1 / 3) * Math.PI * r * r * depth;
          const surfaceArea = Math.PI * r * (r + slant);

          if (badge) badge.textContent = 'Cone';
          rows = [
            { label: 'Radius (r):', value: `${formatMetric(r)} units` },
            { label: 'Height (h):', value: `${formatMetric(depth)} units` },
            { label: 'Slant Height (s):', value: `${formatMetric(slant)} units` },
            { label: 'Base Area (B):', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Volume (V):', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area (A):', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = 'Volume = ⅓πr²h  |  Surface Area = πr(r + s)  (s = √(r² + h²))';
          break;
        }

        case 'triangle': {
          const a = shape.sideA, b = shape.sideB, c = shape.sideC;
          const perimeter = a + b + c;
          const s = perimeter / 2;
          const radicand = s * (s - a) * (s - b) * (s - c);
          const baseArea = radicand > 0 ? Math.sqrt(radicand) : 0;
          const inradius = perimeter > 0 ? (2 * baseArea) / perimeter : 0;
          const slant = Math.hypot(depth, inradius);
          const volume = (1 / 3) * baseArea * depth;
          const surfaceArea = baseArea + 0.5 * perimeter * slant;

          if (badge) badge.textContent = 'Triangular Pyramid';
          rows = [
            { label: 'Base Sides:', value: `${formatMetric(a)}, ${formatMetric(b)}, ${formatMetric(c)}` },
            { label: 'Height (h):', value: `${formatMetric(depth)} units` },
            { label: 'Base Area (B):', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Volume (V):', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area (A):', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = 'Volume = ⅓(Base Area) × h  |  Surface Area = B + ½ × Perimeter × sₗ';
          break;
        }

        case 'pentagon': {
          const s = shape.side;
          const apothem = s / (2 * Math.tan(Math.PI / 5));
          const baseArea = (5 / 2) * s * apothem;
          const slant = Math.hypot(depth, apothem);
          const volume = (1 / 3) * baseArea * depth;
          const surfaceArea = baseArea + 2.5 * s * slant;

          if (badge) badge.textContent = 'Pentagonal Pyramid';
          rows = [
            { label: 'Base Side (s):', value: `${formatMetric(s)} units` },
            { label: 'Height (h):', value: `${formatMetric(depth)} units` },
            { label: 'Base Area (B):', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Volume (V):', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area (A):', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = 'Volume = ⅓(Base Area) × h  |  Surface Area = B + ⁵⁄₂s × sₗ';
          break;
        }

        case 'hexagon': {
          const s = shape.side;
          const apothem = (s * Math.sqrt(3)) / 2;
          const baseArea = ((3 * Math.sqrt(3)) / 2) * s * s;
          const slant = Math.hypot(depth, apothem);
          const volume = (1 / 3) * baseArea * depth;
          const surfaceArea = baseArea + 3 * s * slant;

          if (badge) badge.textContent = 'Hexagonal Pyramid';
          rows = [
            { label: 'Base Side (s):', value: `${formatMetric(s)} units` },
            { label: 'Height (h):', value: `${formatMetric(depth)} units` },
            { label: 'Base Area (B):', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Volume (V):', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area (A):', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = 'Volume = ⅓(Base Area) × h  |  Surface Area = B + 3s × sₗ';
          break;
        }

        case 'ellipse': {
          const a = shape.radiusX, b = shape.radiusY;
          const baseArea = Math.PI * a * b;
          const volume = (1 / 3) * baseArea * depth;

          if (badge) badge.textContent = 'Elliptical Cone';
          rows = [
            { label: 'Radius X (a):', value: `${formatMetric(a)} units` },
            { label: 'Radius Y (b):', value: `${formatMetric(b)} units` },
            { label: 'Height (h):', value: `${formatMetric(depth)} units` },
            { label: 'Base Area (B):', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Volume (V):', value: `${formatMetric(volume)} cu units` }
          ];
          formulaText = 'Volume = ⅓πabh  |  Elliptical Cone formed from Ellipse Base';
          break;
        }
      }
    } else if (is2DShape && solidType === 'sphere') {
      // Sphere constructed from Circle Base
      const r = shape.radius;
      const diameter = 2 * r;
      const volume = (4 / 3) * Math.PI * Math.pow(r, 3);
      const surfaceArea = 4 * Math.PI * r * r;

      if (badge) badge.textContent = 'Sphere';
      rows = [
        { label: 'Radius (r):', value: `${formatMetric(r)} units` },
        { label: 'Diameter (d):', value: `${formatMetric(diameter)} units` },
        { label: 'Volume (V):', value: `${formatMetric(volume)} cu units` },
        { label: 'Surface Area (A):', value: `${formatMetric(surfaceArea)} sq units` }
      ];
      formulaText = 'Volume = ⁴⁄₃πr³  |  Surface Area = 4πr²  |  Formed from Circle Base';
    } else {
      // Native 3D Solids
      switch (shape.id) {
        case 'sphere': {
          const r = shape.radius;
          const diameter = 2 * r;
          const volume = (4 / 3) * Math.PI * Math.pow(r, 3);
          const surfaceArea = 4 * Math.PI * r * r;

          if (badge) badge.textContent = 'Sphere';
          rows = [
            { label: 'Radius (r):', value: `${formatMetric(r)} units` },
            { label: 'Diameter (d):', value: `${formatMetric(diameter)} units` },
            { label: 'Volume (V):', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area (A):', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = 'Volume = ⁴⁄₃πr³  |  Surface Area = 4πr²  |  Diameter = 2r';
          break;
        }

        case 'pyramid': {
          const b = shape.baseSize;
          const h = shape.height;
          const baseArea = b * b;
          const slantHeight = Math.hypot(h, b / 2);
          const volume = (1 / 3) * baseArea * h;
          const surfaceArea = baseArea + 2 * b * slantHeight;

          if (badge) badge.textContent = 'Square Pyramid';
          rows = [
            { label: 'Base Side (b):', value: `${formatMetric(b)} units` },
            { label: 'Height (h):', value: `${formatMetric(h)} units` },
            { label: 'Slant Height (s):', value: `${formatMetric(slantHeight)} units` },
            { label: 'Base Area (B):', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Volume (V):', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area (A):', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = 'Volume = ⅓b²h  |  Surface Area = b² + 2bs  (s = √(h² + (b/2)²))';
          break;
        }

        case 'cone': {
          const r = shape.radius;
          const h = shape.height;
          const slantHeight = Math.hypot(r, h);
          const baseArea = Math.PI * r * r;
          const volume = (1 / 3) * Math.PI * r * r * h;
          const surfaceArea = Math.PI * r * (r + slantHeight);

          if (badge) badge.textContent = 'Cone';
          rows = [
            { label: 'Radius (r):', value: `${formatMetric(r)} units` },
            { label: 'Height (h):', value: `${formatMetric(h)} units` },
            { label: 'Slant Height (s):', value: `${formatMetric(slantHeight)} units` },
            { label: 'Base Area (B):', value: `${formatMetric(baseArea)} sq units` },
            { label: 'Volume (V):', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area (A):', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = 'Volume = ⅓πr²h  |  Surface Area = πr(r + s)  (s = √(r² + h²))';
          break;
        }

        case 'torus': {
          const R = shape.radius;
          const r = shape.tube;
          const volume = 2 * Math.PI * Math.PI * R * r * r;
          const surfaceArea = 4 * Math.PI * Math.PI * R * r;

          if (badge) badge.textContent = 'Torus / Donut';
          rows = [
            { label: 'Major Radius (R):', value: `${formatMetric(R)} units` },
            { label: 'Tube Radius (r):', value: `${formatMetric(r)} units` },
            { label: 'Volume (V):', value: `${formatMetric(volume)} cu units` },
            { label: 'Surface Area (A):', value: `${formatMetric(surfaceArea)} sq units` }
          ];
          formulaText = 'Volume = 2π²Rr²  |  Surface Area = 4π²Rr';
          break;
        }
      }
    }
  } else {
    // 2D Geometry Calculations
    if (propTitle) propTitle.textContent = 'Properties';
    if (badge) badge.textContent = shape.name;

    switch (shape.id) {
      case 'square': {
        const s = shape.side;
        const area = s * s;
        const perimeter = 4 * s;
        const diagonal = s * Math.SQRT2;

        rows = [
          { label: 'Side:', value: `${formatMetric(s)} units` },
          { label: 'Area:', value: `${formatMetric(area)} sq units` },
          { label: 'Perimeter:', value: `${formatMetric(perimeter)} units` },
          { label: 'Diagonal:', value: `${formatMetric(diagonal)} units` }
        ];
        formulaText = 'Area = s²  |  Perimeter = 4s  |  Diagonal = s√2';
        break;
      }

      case 'rectangle': {
        const w = shape.width;
        const l = shape.length;
        const area = w * l;
        const perimeter = 2 * (w + l);
        const diagonal = Math.hypot(w, l);

        rows = [
          { label: 'Width:', value: `${formatMetric(w)} units` },
          { label: 'Length:', value: `${formatMetric(l)} units` },
          { label: 'Area:', value: `${formatMetric(area)} sq units` },
          { label: 'Perimeter:', value: `${formatMetric(perimeter)} units` },
          { label: 'Diagonal:', value: `${formatMetric(diagonal)} units` }
        ];
        formulaText = 'Area = w × l  |  Perimeter = 2(w + l)  |  Diagonal = √(w² + l²)';
        break;
      }

      case 'circle': {
        const r = shape.radius;
        const diameter = 2 * r;
        const area = Math.PI * r * r;
        const circumference = 2 * Math.PI * r;

        rows = [
          { label: 'Radius:', value: `${formatMetric(r)} units` },
          { label: 'Diameter:', value: `${formatMetric(diameter)} units` },
          { label: 'Area:', value: `${formatMetric(area)} sq units` },
          { label: 'Circumference:', value: `${formatMetric(circumference)} units` }
        ];
        formulaText = 'Area = πr²  |  Circumference = 2πr  |  Diameter = 2r';
        break;
      }

      case 'triangle': {
        const a = shape.sideA;
        const b = shape.sideB;
        const c = shape.sideC;

        const perimeter = a + b + c;
        const s = perimeter / 2;
        const radicand = s * (s - a) * (s - b) * (s - c);
        const isValid = (a + b > c) && (a + c > b) && (b + c > a) && radicand > 0;
        const area = isValid ? Math.sqrt(radicand) : 0;

        let triType = 'Scalene';
        if (Math.abs(a - b) < 1e-4 && Math.abs(b - c) < 1e-4) {
          triType = 'Equilateral';
        } else if (Math.abs(a - b) < 1e-4 || Math.abs(b - c) < 1e-4 || Math.abs(a - c) < 1e-4) {
          triType = 'Isosceles';
        }

        const sorted = [a, b, c].sort((x, y) => x - y);
        const diff = sorted[0] * sorted[0] + sorted[1] * sorted[1] - sorted[2] * sorted[2];
        if (Math.abs(diff) < 0.05 * sorted[2] * sorted[2]) {
          triType = 'Right Triangle';
        }

        rows = [
          { label: 'Sides:', value: `${formatMetric(a)}, ${formatMetric(b)}, ${formatMetric(c)}` },
          { label: 'Area:', value: `${formatMetric(area)} sq units` },
          { label: 'Perimeter:', value: `${formatMetric(perimeter)} units` },
          { label: 'Type:', value: triType }
        ];
        formulaText = "Heron's Formula: Area = √(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2";
        break;
      }

      case 'pentagon': {
        const s = shape.side;
        const perimeter = 5 * s;
        const apothem = s / (2 * Math.tan(Math.PI / 5));
        const area = (5 / 2) * s * apothem;

        rows = [
          { label: 'Side:', value: `${formatMetric(s)} units` },
          { label: 'Area:', value: `${formatMetric(area)} sq units` },
          { label: 'Perimeter:', value: `${formatMetric(perimeter)} units` },
          { label: 'Apothem:', value: `${formatMetric(apothem)} units` },
          { label: 'Interior Angle:', value: '108°' }
        ];
        formulaText = 'Area = ½ × Perimeter × Apothem  |  Apothem = s / (2 tan(36°))';
        break;
      }

      case 'hexagon': {
        const s = shape.side;
        const perimeter = 6 * s;
        const apothem = (s * Math.sqrt(3)) / 2;
        const area = ((3 * Math.sqrt(3)) / 2) * s * s;
        const longDiagonal = 2 * s;

        rows = [
          { label: 'Side:', value: `${formatMetric(s)} units` },
          { label: 'Area:', value: `${formatMetric(area)} sq units` },
          { label: 'Perimeter:', value: `${formatMetric(perimeter)} units` },
          { label: 'Apothem:', value: `${formatMetric(apothem)} units` },
          { label: 'Interior Angle:', value: '120°' },
          { label: 'Long Diagonal:', value: `${formatMetric(longDiagonal)} units` }
        ];
        formulaText = 'Area = (3√3 / 2) × s²  |  Perimeter = 6s';
        break;
      }

      case 'ellipse': {
        const a = shape.radiusX;
        const b = shape.radiusY;
        const area = Math.PI * a * b;

        const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
        const circumference = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
        const major = Math.max(a, b);
        const minor = Math.min(a, b);
        const eccentricity = Math.sqrt(1 - (minor * minor) / (major * major));

        rows = [
          { label: 'Radius X (a):', value: `${formatMetric(a)} units` },
          { label: 'Radius Y (b):', value: `${formatMetric(b)} units` },
          { label: 'Area:', value: `${formatMetric(area)} sq units` },
          { label: 'Circumference:', value: `${formatMetric(circumference)} units` },
          { label: 'Eccentricity (e):', value: formatMetric(eccentricity) }
        ];
        formulaText = 'Area = π · a · b  |  Eccentricity = √(1 - b²/a²)';
        break;
      }
    }
  }

  if (is3D) {
    const posX = (shape.x || 0).toFixed(1);
    const posY = (shape.y3D || 0).toFixed(1);
    const posZ = (shape.z !== undefined ? shape.z : 0).toFixed(1);
    rows.unshift({ label: 'Position (X, Y, Z):', value: `(${posX}, ${posY}, ${posZ})` });
  }

  body.innerHTML = `
    ${rows.map(r => `
      <div class="prop-metric-row">
        <span class="prop-metric-label">${r.label}</span>
        <span class="prop-metric-value">${r.value}</span>
      </div>
    `).join('')}
  `;
}

function formatMetric(val) {
  if (isNaN(val)) return '—';
  // If whole integer, show integer, else 2 decimal places
  if (Math.abs(val - Math.round(val)) < 1e-4) {
    return String(Math.round(val));
  }
  return val.toFixed(2);
}

// --- HASH ROUTING (Routing Between Home and Dedicated Laboratories) ---
function initHashRouting() {
  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange();
}

function handleRouteChange() {
  const rawHash = (window.location.hash || '').replace(/^#/, '').toLowerCase().trim();
  const homeView = document.getElementById('homeView');
  const labView = document.getElementById('labView');
  const geometryWorkspace = document.getElementById('geometryWorkspace');
  const placeholderWorkspace = document.getElementById('placeholderWorkspace');
  const labPageTitle = document.getElementById('labPageTitle');
  const labBadge = document.getElementById('labBadge');
  const labSubjectSubtitle = document.getElementById('labSubjectSubtitle');

  // Route to Home View
  if (!rawHash || rawHash === 'home' || (!LABS_CONFIG[rawHash] && rawHash !== 'geometry')) {
    document.body.classList.remove('geometry-mode');
    if (homeView) homeView.classList.add('active');
    if (labView) labView.classList.remove('active');
    if (currentViewMode === '3d') {
      disposeThreeScene();
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    return;
  }

  // Switch to Lab View
  if (homeView) homeView.classList.remove('active');
  if (labView) labView.classList.add('active');

  if (rawHash === 'geometry') {
    // Enable Full-Screen Desmos-like geometry mode
    document.body.classList.add('geometry-mode');
    if (geometryWorkspace) geometryWorkspace.classList.add('active');
    if (placeholderWorkspace) placeholderWorkspace.classList.remove('active');

    setTimeout(() => {
      if (currentViewMode === '3d') {
        initThreeScene();
        rebuildThreeShapes();
      } else {
        resizeCanvas();
        render();
      }
    }, 30);
  } else {
    // Non-Geometry Category Labs (Algebra, Trigonometry, etc.)
    document.body.classList.remove('geometry-mode');
    if (geometryWorkspace) geometryWorkspace.classList.remove('active');
    if (placeholderWorkspace) placeholderWorkspace.classList.add('active');
    if (currentViewMode === '3d') {
      disposeThreeScene();
    }

    const config = LABS_CONFIG[rawHash];
    if (config) {
      if (labPageTitle) labPageTitle.textContent = config.title;
      if (labBadge) labBadge.textContent = config.badge;
      if (labSubjectSubtitle) labSubjectSubtitle.textContent = config.subtitle;
      renderPlaceholderLab(config);
    }
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
}

function renderPlaceholderLab(config) {
  const heading = document.getElementById('constructionHeading');
  const desc = document.getElementById('constructionDesc');
  const iconBubble = document.getElementById('constructionIconBubble');
  const iconChar = document.getElementById('constructionIconChar');
  const tag = document.getElementById('constructionTag');
  const artBg = document.getElementById('placeholderArtBg');
  const modulesList = document.getElementById('upcomingModulesList');
  const modulesTitle = document.getElementById('placeholderModulesTitle');

  if (heading) heading.textContent = 'This lab is under construction. Check back soon!';
  if (desc) desc.textContent = config.desc;
  if (iconChar) iconChar.textContent = config.icon;
  if (tag) tag.textContent = `${config.title} Laboratory`;
  if (modulesTitle) modulesTitle.textContent = `${config.title} Modules`;

  if (artBg && config.bgSvg) {
    artBg.innerHTML = config.bgSvg;
  }

  if (iconBubble && config.themeColor) {
    iconBubble.style.borderColor = config.themeColor;
    iconBubble.style.color = config.themeColor;
  }

  if (modulesList && config.modules) {
    modulesList.innerHTML = config.modules.map(mod => `
      <div class="upcoming-module-item">
        <div class="module-item-header">
          <span class="module-item-name">${mod.name}</span>
          <span class="module-status-badge">${mod.status}</span>
        </div>
        <p class="module-item-desc">${mod.desc}</p>
      </div>
    `).join('');
  }
}
