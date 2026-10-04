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

const SHAPE_TEMPLATES = {
  // --- 2D / PLANE SHAPES ---
  square: {
    type: 'square',
    name: 'Square',
    category: '2d',
    color: '#2563eb',
    fillColor: 'rgba(37, 99, 235, 0.22)',
    strokeColor: '#2563eb',
    side: 4,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat'
  },
  rectangle: {
    type: 'rectangle',
    name: 'Rectangle',
    category: '2d',
    color: '#059669',
    fillColor: 'rgba(5, 150, 105, 0.22)',
    strokeColor: '#059669',
    width: 4,
    length: 2.5,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat'
  },
  circle: {
    type: 'circle',
    name: 'Circle',
    category: '2d',
    color: '#dc2626',
    fillColor: 'rgba(220, 38, 38, 0.22)',
    strokeColor: '#dc2626',
    radius: 3,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat'
  },
  triangle: {
    type: 'triangle',
    name: 'Triangle',
    category: '2d',
    color: '#ea580c',
    fillColor: 'rgba(234, 88, 12, 0.22)',
    strokeColor: '#ea580c',
    sideA: 3,
    sideB: 4,
    sideC: 5,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat'
  },
  right_triangle: {
    type: 'right_triangle',
    name: 'Right Triangle',
    category: '2d',
    color: '#d97706',
    fillColor: 'rgba(217, 119, 6, 0.22)',
    strokeColor: '#d97706',
    base: 4,
    height: 3,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat'
  },
  equilateral_triangle: {
    type: 'equilateral_triangle',
    name: 'Equilateral Triangle',
    category: '2d',
    color: '#f59e0b',
    fillColor: 'rgba(245, 158, 11, 0.22)',
    strokeColor: '#f59e0b',
    side: 4,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat'
  },
  isosceles_triangle: {
    type: 'isosceles_triangle',
    name: 'Isosceles Triangle',
    category: '2d',
    color: '#e11d48',
    fillColor: 'rgba(225, 29, 72, 0.22)',
    strokeColor: '#e11d48',
    base: 4,
    leg: 5,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat'
  },
  parallelogram: {
    type: 'parallelogram',
    name: 'Parallelogram',
    category: '2d',
    color: '#0284c7',
    fillColor: 'rgba(2, 132, 199, 0.22)',
    strokeColor: '#0284c7',
    base: 5,
    height: 3,
    skew: 1.5,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat'
  },
  rhombus: {
    type: 'rhombus',
    name: 'Rhombus',
    category: '2d',
    color: '#8b5cf6',
    fillColor: 'rgba(139, 92, 246, 0.22)',
    strokeColor: '#8b5cf6',
    diag1: 5,
    diag2: 3.5,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat'
  },
  trapezoid: {
    type: 'trapezoid',
    name: 'Trapezoid',
    category: '2d',
    color: '#4f46e5',
    fillColor: 'rgba(79, 70, 229, 0.22)',
    strokeColor: '#4f46e5',
    topBase: 3,
    bottomBase: 5,
    height: 3,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat'
  },
  kite: {
    type: 'kite',
    name: 'Kite',
    category: '2d',
    color: '#06b6d4',
    fillColor: 'rgba(6, 182, 212, 0.22)',
    strokeColor: '#06b6d4',
    diagX: 4,
    topH: 2,
    bottomH: 3.5,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat'
  },
  pentagon: {
    type: 'pentagon',
    name: 'Pentagon',
    category: '2d',
    color: '#9333ea',
    fillColor: 'rgba(147, 51, 234, 0.22)',
    strokeColor: '#9333ea',
    side: 3,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat'
  },
  hexagon: {
    type: 'hexagon',
    name: 'Hexagon',
    category: '2d',
    color: '#0d9488',
    fillColor: 'rgba(13, 148, 136, 0.22)',
    strokeColor: '#0d9488',
    side: 3,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat'
  },
  regular_polygon: {
    type: 'regular_polygon',
    name: 'Regular Octagon',
    category: '2d',
    color: '#14b8a6',
    fillColor: 'rgba(20, 184, 166, 0.22)',
    strokeColor: '#14b8a6',
    sides: 8,
    side: 2.2,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat'
  },
  semicircle: {
    type: 'semicircle',
    name: 'Semicircle',
    category: '2d',
    color: '#f43f5e',
    fillColor: 'rgba(244, 63, 94, 0.22)',
    strokeColor: '#f43f5e',
    radius: 3,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat'
  },
  ellipse: {
    type: 'ellipse',
    name: 'Ellipse',
    category: '2d',
    color: '#db2777',
    fillColor: 'rgba(219, 39, 119, 0.22)',
    strokeColor: '#db2777',
    radiusX: 4,
    radiusY: 2.5,
    depth: 3,
    height3D: 3,
    solid3DType: 'flat'
  },
  point: {
    type: 'point',
    name: 'Point',
    category: '2d',
    color: '#3b82f6',
    fillColor: 'rgba(59, 130, 246, 0.85)',
    strokeColor: '#1d4ed8',
    radius: 0.35,
    depth: 0.35,
    height3D: 0.35,
    solid3DType: 'flat'
  },
  segment: {
    type: 'segment',
    name: 'Line Segment',
    category: '2d',
    color: '#6366f1',
    fillColor: 'rgba(99, 102, 241, 0.22)',
    strokeColor: '#6366f1',
    length: 6,
    depth: 0.3,
    height3D: 0.3,
    solid3DType: 'flat'
  },
  line: {
    type: 'line',
    name: 'Line',
    category: '2d',
    color: '#10b981',
    fillColor: 'rgba(16, 185, 129, 0.22)',
    strokeColor: '#10b981',
    length: 12,
    depth: 0.3,
    height3D: 0.3,
    solid3DType: 'flat'
  },
  ray: {
    type: 'ray',
    name: 'Ray',
    category: '2d',
    color: '#f97316',
    fillColor: 'rgba(249, 115, 22, 0.22)',
    strokeColor: '#f97316',
    length: 7,
    depth: 0.3,
    height3D: 0.3,
    solid3DType: 'flat'
  },
  angle: {
    type: 'angle',
    name: 'Angle',
    category: '2d',
    color: '#84cc16',
    fillColor: 'rgba(132, 204, 22, 0.22)',
    strokeColor: '#84cc16',
    deg: 45,
    armLength: 5,
    depth: 0.3,
    height3D: 0.3,
    solid3DType: 'flat'
  },

  // --- 3D SHAPES ---
  cube: {
    type: 'cube',
    name: 'Cube',
    category: '3d',
    is3DOnly: true,
    color: '#2563eb',
    fillColor: 'rgba(37, 99, 235, 0.25)',
    strokeColor: '#1d4ed8',
    side: 3.5
  },
  cuboid: {
    type: 'cuboid',
    name: 'Rectangular Prism',
    category: '3d',
    is3DOnly: true,
    color: '#059669',
    fillColor: 'rgba(5, 150, 105, 0.25)',
    strokeColor: '#047857',
    width: 4.5,
    height: 3,
    depth: 3.5
  },
  triangular_prism: {
    type: 'triangular_prism',
    name: 'Triangular Prism',
    category: '3d',
    is3DOnly: true,
    color: '#ea580c',
    fillColor: 'rgba(234, 88, 12, 0.25)',
    strokeColor: '#c2410c',
    side: 4,
    height: 4
  },
  cylinder: {
    type: 'cylinder',
    name: 'Cylinder',
    category: '3d',
    is3DOnly: true,
    color: '#0891b2',
    fillColor: 'rgba(8, 145, 178, 0.25)',
    strokeColor: '#0e7490',
    radius: 2.2,
    height: 4.2
  },
  cone: {
    type: 'cone',
    name: 'Cone',
    category: '3d',
    is3DOnly: true,
    color: '#16a34a',
    fillColor: 'rgba(22, 163, 74, 0.25)',
    strokeColor: '#15803d',
    radius: 2.5,
    height: 4
  },
  sphere: {
    type: 'sphere',
    name: 'Sphere',
    category: '3d',
    is3DOnly: true,
    color: '#0284c7',
    fillColor: 'rgba(2, 132, 199, 0.25)',
    strokeColor: '#0369a1',
    radius: 2.5
  },
  pyramid: {
    type: 'pyramid',
    name: 'Square Pyramid',
    category: '3d',
    is3DOnly: true,
    color: '#d97706',
    fillColor: 'rgba(217, 119, 6, 0.25)',
    strokeColor: '#b45309',
    baseSize: 4,
    height: 4
  },
  tetrahedron: {
    type: 'tetrahedron',
    name: 'Tetrahedron',
    category: '3d',
    is3DOnly: true,
    color: '#ec4899',
    fillColor: 'rgba(236, 72, 153, 0.25)',
    strokeColor: '#db2777',
    radius: 2.8
  },
  torus: {
    type: 'torus',
    name: 'Torus',
    category: '3d',
    is3DOnly: true,
    color: '#8b5cf6',
    fillColor: 'rgba(139, 92, 246, 0.25)',
    strokeColor: '#7c3aed',
    radius: 3,
    tube: 0.9
  }
};

const SHAPE_LIBRARY_ITEMS = [
  // 2D Shapes
  { type: 'square', name: 'Square', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><rect x="3" y="3" width="14" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
  { type: 'rectangle', name: 'Rectangle', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><rect x="2" y="4.5" width="16" height="11" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
  { type: 'circle', name: 'Circle', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
  { type: 'triangle', name: 'Triangle', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><polygon points="10,2.5 18,17.5 2,17.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
  { type: 'right_triangle', name: 'Right Triangle', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><polygon points="3,3 3,17 17,17" fill="none" stroke="currentColor" stroke-width="2"/><path d="M 3 12 L 8 12 L 8 17" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>' },
  { type: 'equilateral_triangle', name: 'Equilateral', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><polygon points="10,2.5 18,17.5 2,17.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="10" cy="11.5" r="1.5" fill="currentColor"/></svg>' },
  { type: 'isosceles_triangle', name: 'Isosceles', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><polygon points="10,2 16,18 4,18" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
  { type: 'parallelogram', name: 'Parallelogram', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><polygon points="6,4 18,4 14,16 2,16" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
  { type: 'rhombus', name: 'Rhombus', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><polygon points="10,2 18,10 10,18 2,10" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
  { type: 'trapezoid', name: 'Trapezoid', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><polygon points="5,4.5 15,4.5 18,16.5 2,16.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
  { type: 'kite', name: 'Kite', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><polygon points="10,2 17,7.5 10,18 3,7.5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="3" y1="7.5" x2="17" y2="7.5" stroke="currentColor" stroke-width="1.2" stroke-dasharray="1.5 1.5"/><line x1="10" y1="2" x2="10" y2="18" stroke="currentColor" stroke-width="1.2" stroke-dasharray="1.5 1.5"/></svg>' },
  { type: 'pentagon', name: 'Pentagon', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><polygon points="10,2 18,8 15,17 5,17 2,8" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
  { type: 'hexagon', name: 'Hexagon', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><polygon points="10,2 17,6 17,14 10,18 3,14 3,6" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
  { type: 'regular_polygon', name: 'Octagon', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><polygon points="6,2 14,2 18,6 18,14 14,18 6,18 2,14 2,6" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
  { type: 'semicircle', name: 'Semicircle', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><path d="M 2 13 A 8 8 0 0 1 18 13 Z" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
  { type: 'ellipse', name: 'Ellipse', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><ellipse cx="10" cy="10" rx="8" ry="5" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
  { type: 'point', name: 'Point', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><circle cx="10" cy="10" r="3.5" fill="currentColor"/></svg>' },
  { type: 'segment', name: 'Segment', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" stroke-width="2"/><circle cx="3" cy="10" r="2.2" fill="currentColor"/><circle cx="17" cy="10" r="2.2" fill="currentColor"/></svg>' },
  { type: 'line', name: 'Line', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" stroke-width="2"/><polygon points="2,10 6,7 6,13" fill="currentColor"/><polygon points="18,10 14,7 14,13" fill="currentColor"/></svg>' },
  { type: 'ray', name: 'Ray', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" stroke-width="2"/><circle cx="3" cy="10" r="2.2" fill="currentColor"/><polygon points="18,10 14,7 14,13" fill="currentColor"/></svg>' },
  { type: 'angle', name: 'Angle', category: '2d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><path d="M 17 15 L 4 15 L 14 5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M 9 15 A 5 5 0 0 0 7.5 11.5" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>' },

  // 3D Shapes
  { type: 'cube', name: 'Cube', category: '3d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><path d="M10 2 L17 6 L17 14 L10 18 L3 14 L3 6 Z M10 2 L10 18 M3 6 L10 10 L17 6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>' },
  { type: 'cuboid', name: 'Cuboid / Prism', category: '3d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><path d="M11 2 L18 5 L18 13 L11 16 L2 13 L2 5 Z M11 2 L11 16 M2 5 L11 9 L18 5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>' },
  { type: 'triangular_prism', name: 'Tri Prism', category: '3d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><polygon points="3,16 15,16 9,8" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="7,11 19,11 13,3" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="3" y1="16" x2="7" y2="11" stroke="currentColor" stroke-width="1.3"/><line x1="15" y1="16" x2="19" y2="11" stroke="currentColor" stroke-width="1.3"/><line x1="9" y1="8" x2="13" y2="3" stroke="currentColor" stroke-width="1.3"/></svg>' },
  { type: 'cylinder', name: 'Cylinder', category: '3d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><ellipse cx="10" cy="5" rx="6" ry="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 5 v10 c0 1.4 2.7 2.5 6 2.5 s6 -1.1 6 -2.5 v-10" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>' },
  { type: 'cone', name: 'Cone', category: '3d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><path d="M10 2 L4 14.5 c0 1.4 2.7 2.5 6 2.5 s6 -1.1 6 -2.5 Z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>' },
  { type: 'sphere', name: 'Sphere', category: '3d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="10" cy="10" rx="7.5" ry="3" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 2"/></svg>' },
  { type: 'pyramid', name: 'Pyramid', category: '3d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><path d="M10 2 L2 15 L12 18 L18 13 Z M10 2 L12 18" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>' },
  { type: 'tetrahedron', name: 'Tetrahedron', category: '3d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><path d="M10 2 L2 16 L18 16 Z M10 2 L10 16 M10 16 L13 9" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>' },
  { type: 'torus', name: 'Torus', category: '3d', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><ellipse cx="10" cy="10" rx="7.5" ry="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="10" cy="10" rx="3.5" ry="2" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>' }
];

const INSTANCE_PALETTES = [
  '#2563eb', // Blue
  '#059669', // Emerald
  '#dc2626', // Red
  '#ea580c', // Orange
  '#9333ea', // Purple
  '#0d9488', // Teal
  '#db2777', // Pink
  '#0284c7', // Sky
  '#d97706', // Amber
  '#16a34a', // Green
  '#8b5cf6', // Violet
  '#4f46e5'  // Indigo
];

const rgbaCache = new Map();
function hexToRgba(hex, alpha) {
  const key = `${hex}_${alpha}`;
  let cached = rgbaCache.get(key);
  if (cached) return cached;
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  cached = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  rgbaCache.set(key, cached);
  return cached;
}

function getShapeColorForInstance(type, instanceIndex) {
  const template = SHAPE_TEMPLATES[type];
  if (!template) return '#2563eb';
  if (instanceIndex === 0) return template.color;
  const typeIndex = Object.keys(SHAPE_TEMPLATES).indexOf(type);
  const colorIndex = (Math.max(0, typeIndex) + instanceIndex * 3) % INSTANCE_PALETTES.length;
  return INSTANCE_PALETTES[colorIndex];
}

function getShapeType(shape) {
  if (!shape) return '';
  return shape.type || (typeof shape.id === 'string' ? shape.id.replace(/_\d+$/, '') : '');
}

let shapeCounter = 1;

// Active shape instances dictionary
const SHAPES = {
  square_1: {
    ...SHAPE_TEMPLATES.square,
    id: 'square_1',
    type: 'square',
    name: 'Square 1',
    visible: true,
    x: 0,
    y: 0,
    y3D: 0,
    z: 0,
    rotation: 0
  }
};

// Render order array (last item is drawn on top)
let renderOrder = ['square_1'];

// Active shape ID for Dimensions & Properties panels - default null so no gizmos are shown initially
let activeShapeId = null;

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
let threeNeedsRender = true;
let threePointerMoveHandler = null;
let threePointerUpHandler = null;
const numberSpriteCache = new Map();
const axisLabelTextureCache = new Map();
const gizmoPillTextureCache = new Map();
const shapeLabelTextureCache = new Map();

// Infinite Grid Coordinate State (Desmos-like)
const gridState = {
  originX: 0,       // screen pixel X of math (0,0)
  originY: 0,       // screen pixel Y of math (0,0)
  scale: 40,        // pixels per math unit (default 40px)
  showGraph: true,  // Graph visibility toggle state (ON / OFF)
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
  resizeInitialTriangleVerts: null,
  resizeInitialLocal: { x: 0, y: 0 },
  resizeInitialDist: 1,
  draggedShape: null,
  shapeDragOffsetMathX: 0,
  shapeDragOffsetMathY: 0
};

// Centralized Visual Theme Object
const GRAPH_THEME = {
  light: {
    primary: '#111111',
    secondary: '#475569',
    gridMinor: 'rgba(15, 23, 42, 0.06)',
    gridMajor: 'rgba(15, 23, 42, 0.16)',
    axis: '#111111',
    label: '#111111',
    tick: '#111111',
    selection: '#0284c7',
    background: '#ffffff',
    surface: '#f8fafc',
    shapeDefaultStroke: '#111111',
    shapeDefaultFill: 'rgba(17, 17, 17, 0.08)',
    construction: '#d97706',
    mathText: '#111111',
    axisX: '#ef4444',
    axisY: '#10b981',
    axisZ: '#2563eb'
  },
  dark: {
    primary: '#f8fafc',
    secondary: '#94a3b8',
    gridMinor: 'rgba(255, 255, 255, 0.07)',
    gridMajor: 'rgba(255, 255, 255, 0.18)',
    axis: '#f8fafc',
    label: '#f8fafc',
    tick: '#f8fafc',
    selection: '#3BB8DB',
    background: '#020618',
    surface: '#0f172a',
    shapeDefaultStroke: '#f8fafc',
    shapeDefaultFill: 'rgba(248, 250, 252, 0.12)',
    construction: '#facc15',
    mathText: '#f8fafc',
    axisX: '#ef4444',
    axisY: '#10b981',
    axisZ: '#2563eb'
  }
};

function getRelativeLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function hexToRgb(hex) {
  let c = String(hex).replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  if (isNaN(num)) return { r: 128, g: 128, b: 128 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function getContrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const L1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const L2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function setGraphVisibility(visible) {
  gridState.showGraph = !!visible;
  const btnOn = document.getElementById('btnGraphOn');
  const btnOff = document.getElementById('btnGraphOff');
  const quickBtn = document.getElementById('geoGraphQuickBtn');

  if (btnOn) btnOn.classList.toggle('active', gridState.showGraph);
  if (btnOff) btnOff.classList.toggle('active', !gridState.showGraph);
  if (quickBtn) quickBtn.classList.toggle('active', gridState.showGraph);

  if (threeDynamicGridGroup) {
    threeDynamicGridGroup.visible = gridState.showGraph;
  }
  if (threeAxesGroup) {
    threeAxesGroup.visible = gridState.showGraph;
  }
  threeNeedsRender = true;

  if (currentViewMode === '2d' && ctx && canvas) {
    render();
  }
}

// DOM References & Interactive State
let canvas = null;
let ctx = null;
let geometryInitialized = false;

// Shape Library Search & Category state
let currentLibCategory = 'all';
let currentLibSearch = '';

// 3D Height Dragging state
let is3DHeightDragging = false;
let threeHeightDragStartH = 3;
let threeHeightDragStartY = 0;

// 3D Gizmo Dragging state
let isGizmoTranslating = false;
let gizmoDragAxis = null;
let gizmoDragDir = 1;
let gizmoDragStartPos = { x: 0, y: 0, z: 0 };
let gizmoPointerStart = { x: 0, y: 0 };
let gizmoDraggedShape = null;
let isPointerDownOn3DBackground = false;
let pointerDown3DScreen = { x: 0, y: 0 };

// --- Visual Appearance Theme System (Dark Mode / Light Mode) ---
let currentTheme = 'dark';
try {
  const saved = localStorage.getItem('mathlab_theme');
  if (saved === 'light' || saved === 'dark') {
    currentTheme = saved;
  }
} catch (e) {}

let threeSceneAmbientLight = null;
let threeSceneDirLight = null;
let threeSceneSecondaryLight = null;

function initThemeSystem() {
  try {
    const saved = localStorage.getItem('mathlab_theme');
    if (saved === 'light' || saved === 'dark') {
      currentTheme = saved;
    }
  } catch (e) {}

  applyTheme(currentTheme, false);

  const navDarkBtn = document.getElementById('btnNavThemeDark');
  const navLightBtn = document.getElementById('btnNavThemeLight');
  const geoDarkBtn = document.getElementById('btnGeoThemeDark');
  const geoLightBtn = document.getElementById('btnGeoThemeLight');

  if (navDarkBtn) {
    navDarkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      applyTheme('dark', true);
    });
  }
  if (navLightBtn) {
    navLightBtn.addEventListener('click', (e) => {
      e.preventDefault();
      applyTheme('light', true);
    });
  }
  if (geoDarkBtn) {
    geoDarkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      applyTheme('dark', true);
    });
  }
  if (geoLightBtn) {
    geoLightBtn.addEventListener('click', (e) => {
      e.preventDefault();
      applyTheme('light', true);
    });
  }
}

function applyTheme(theme, save = true) {
  currentTheme = theme === 'light' ? 'light' : 'dark';
  if (save) {
    try {
      localStorage.setItem('mathlab_theme', currentTheme);
    } catch (e) {}
  }

  const isDark = currentTheme === 'dark';
  document.body.classList.toggle('theme-dark', isDark);
  document.body.classList.toggle('theme-light', !isDark);

  const navDarkBtn = document.getElementById('btnNavThemeDark');
  const navLightBtn = document.getElementById('btnNavThemeLight');
  const geoDarkBtn = document.getElementById('btnGeoThemeDark');
  const geoLightBtn = document.getElementById('btnGeoThemeLight');

  if (navDarkBtn) navDarkBtn.classList.toggle('active', isDark);
  if (navLightBtn) navLightBtn.classList.toggle('active', !isDark);
  if (geoDarkBtn) geoDarkBtn.classList.toggle('active', isDark);
  if (geoLightBtn) geoLightBtn.classList.toggle('active', !isDark);

  // If 3D scene exists, dynamically update background, lighting & materials
  if (threeScene) {
    threeScene.background = new THREE.Color(isDark ? 0x020618 : 0xffffff);
    if (threeSceneAmbientLight) {
      threeSceneAmbientLight.color.setHex(isDark ? 0xdbeafe : 0xffffff);
      threeSceneAmbientLight.intensity = isDark ? 0.65 : 0.85;
    }
    if (threeSceneSecondaryLight) {
      threeSceneSecondaryLight.color.setHex(isDark ? 0x3bb8db : 0xffffff);
      threeSceneSecondaryLight.intensity = isDark ? 0.45 : 0.25;
    }
    updateDynamicThreeGrid(true);
    rebuildThreeShapes();
    threeNeedsRender = true;
  }

  // If 2D canvas is active, re-render with active theme
  if (ctx && canvas && currentViewMode === '2d') {
    render();
  }
}

// --- Startup Error Reporting (Visual error overlay on crash) ---
function showStartupError(error) {
  const message = error instanceof Error
    ? `${error.name}: ${error.message}\n${error.stack || ''}`
    : String(error);

  let panel = document.getElementById('mathLabStartupErrorPanel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'mathLabStartupErrorPanel';
    panel.style.cssText = `
      position: fixed;
      left: 20px;
      right: 20px;
      bottom: 20px;
      z-index: 999999;
      padding: 16px;
      background: #fff1f2;
      border: 2px solid #ef4444;
      border-radius: 10px;
      color: #991b1b;
      font-family: monospace;
      white-space: pre-wrap;
    `;
    document.body.appendChild(panel);
  }
  panel.textContent = 'MathLab startup error:\n\n' + message;
}

window.addEventListener('error', (event) => {
  if (event.error) {
    console.error('[MathLab global error]', event.error);
    showStartupError(event.error);
  }
});

// Lazy geometry initialization guard - only initialize when entering Geometry
function ensureGeometryInitialized() {
  if (geometryInitialized) return;
  geometryInitialized = true;

  try {
    initCanvas();
    initPanAndZoomEvents();
    initShapeSelectorPanel();
    initGridControls();
    initViewModeToggle();
    renderAllPanels();
    render();
  } catch (error) {
    console.error('[MathLab geometry init error]', error);
    showStartupError(error);
  }
}

function initApp() {
  try {
    initThemeSystem();
    initHashRouting();
  } catch (error) {
    console.error('[MathLab startup error]', error);
    showStartupError(error);
  }
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

  const type = getShapeType(shape);
  if (type === 'square') {
    halfW = (shape.side * gridState.scale) / 2 + 6;
    halfH = halfW;
  } else if (type === 'rectangle') {
    halfW = (shape.width * gridState.scale) / 2 + 6;
    halfH = (shape.length * gridState.scale) / 2 + 6;
  } else if (type === 'circle') {
    halfW = (shape.radius * gridState.scale) + 6;
    halfH = halfW;
  } else if (type === 'ellipse') {
    halfW = (shape.radiusX * gridState.scale) + 6;
    halfH = (shape.radiusY * gridState.scale) + 6;
  } else if (type === 'triangle') {
    const verts = getTriangleVertices(shape);
    let maxDX = 0;
    let maxDY = 0;
    verts.forEach(v => {
      maxDX = Math.max(maxDX, Math.abs(v.x - shape.x));
      maxDY = Math.max(maxDY, Math.abs(v.y - shape.y));
    });
    halfW = Math.max(20, maxDX * gridState.scale + 6);
    halfH = Math.max(20, maxDY * gridState.scale + 6);
  } else if (type === 'pentagon') {
    const R = (shape.side / (2 * Math.sin(Math.PI / 5))) * gridState.scale;
    halfW = R + 6;
    halfH = R + 6;
  } else if (type === 'hexagon') {
    const R = shape.side * gridState.scale;
    halfW = R + 6;
    halfH = R + 6;
  } else if (type === 'line' || type === 'segment') {
    halfW = ((shape.length || 6) * gridState.scale) / 2 + 6;
    halfH = 12;
  } else if (type === 'ray') {
    halfW = ((shape.length || 7) * gridState.scale) + 6;
    halfH = 12;
  } else if (type === 'point') {
    halfW = Math.max(12, (shape.radius || 0.35) * gridState.scale + 6);
    halfH = halfW;
  } else {
    halfW = ((shape.side || 4) * gridState.scale) + 8;
    halfH = halfW;
  }
  return { halfW, halfH };
}

// Shape-specific handles system (PART 19)
function getShapeResizeHandles(shape) {
  if (!shape || shape.is3DOnly) return [];
  const type = getShapeType(shape);
  const scale = gridState.scale;

  // Point: no resize handles (PART 18)
  if (type === 'point') {
    return [];
  }

  // Line / Segment: 2 endpoint handles (PART 15 & 16)
  if (type === 'line' || type === 'segment') {
    const len = (shape.length || 6) * scale;
    return [
      { id: 'start', x: -len / 2, y: 0, cursor: 'grab' },
      { id: 'end',   x: len / 2,  y: 0, cursor: 'grab' }
    ];
  }

  // Ray: origin handle + direction handle (PART 17)
  if (type === 'ray') {
    const len = (shape.length || 7) * scale;
    return [
      { id: 'origin', x: 0,   y: 0, cursor: 'move' },
      { id: 'dir',    x: len, y: 0, cursor: 'grab' }
    ];
  }

  // Circle: single radial resize handle (PART 11)
  if (type === 'circle') {
    const r = shape.radius * scale;
    return [
      { id: 'radius', x: r, y: 0, cursor: 'ew-resize' }
    ];
  }

  // Ellipse: 4 axis handles + 4 corner handles (PART 12)
  if (type === 'ellipse') {
    const rx = shape.radiusX * scale;
    const ry = shape.radiusY * scale;
    return [
      { id: 'e',  x: rx,  y: 0,   cursor: 'ew-resize' },
      { id: 'w',  x: -rx, y: 0,   cursor: 'ew-resize' },
      { id: 'n',  x: 0,   y: -ry, cursor: 'ns-resize' },
      { id: 's',  x: 0,   y: ry,  cursor: 'ns-resize' },
      { id: 'ne', x: rx,  y: -ry, cursor: 'nesw-resize' },
      { id: 'nw', x: -rx, y: -ry, cursor: 'nwse-resize' },
      { id: 'se', x: rx,  y: ry,  cursor: 'nwse-resize' },
      { id: 'sw', x: -rx, y: ry,  cursor: 'nesw-resize' }
    ];
  }

  // Triangle: vertex handles for actual calculated vertices (PART 14)
  if (type === 'triangle') {
    const verts = getTriangleVertices(shape);
    return verts.map((v, idx) => ({
      id: `v${idx}`,
      x: (v.x - shape.x) * scale,
      y: -(v.y - shape.y) * scale,
      cursor: 'crosshair'
    }));
  }

  // Regular Polygons: vertex handles (PART 13)
  if (type === 'hexagon') {
    const verts = getRegularPolygonVertices(shape.x, shape.y, 6, shape.side);
    return verts.map((v, idx) => ({
      id: `v${idx}`,
      x: (v.x - shape.x) * scale,
      y: -(v.y - shape.y) * scale,
      cursor: 'crosshair'
    }));
  }

  if (type === 'pentagon') {
    const verts = getRegularPolygonVertices(shape.x, shape.y, 5, shape.side);
    return verts.map((v, idx) => ({
      id: `v${idx}`,
      x: (v.x - shape.x) * scale,
      y: -(v.y - shape.y) * scale,
      cursor: 'crosshair'
    }));
  }

  // Rectangle / Square: 8 handles on edges and corners
  let halfW = 20;
  let halfH = 20;
  if (type === 'square') {
    halfW = (shape.side * scale) / 2;
    halfH = halfW;
  } else if (type === 'rectangle') {
    halfW = (shape.width * scale) / 2;
    halfH = (shape.length * scale) / 2;
  } else {
    const ext = getShapeHalfExtents(shape);
    halfW = ext.halfW - 6;
    halfH = ext.halfH - 6;
  }

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
  const type = getShapeType(shape);
  // Point, circle, segment, line, ray do not use rotation stem knob
  if (type === 'point' || type === 'circle' || type === 'line' || type === 'segment' || type === 'ray') {
    return false;
  }
  let halfH = 20;
  if (type === 'square') {
    halfH = (shape.side * gridState.scale) / 2 + 4;
  } else if (type === 'rectangle') {
    halfH = (shape.length * gridState.scale) / 2 + 4;
  } else {
    halfH = getShapeHalfExtents(shape).halfH;
  }
  const { localX, localY } = screenToShapeLocalCoords(shape, screenX, screenY);
  return Math.hypot(localX - 0, localY - (-halfH - 22)) <= hitRadius;
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

// ANCHOR-BASED RESIZING (PARTS 7-19)
// Dragging one handle moves only that boundary/vertex, keeping the opposite anchor completely fixed!
function applyShapeResize(shape, screenX, screenY, skipRender = false) {
  if (!shape || !gridState.resizeHandleId) return;
  const hId = gridState.resizeHandleId;
  const init = gridState.resizeInitialShape;
  if (!init) return;

  const type = getShapeType(shape);
  const rot = init.rotation || 0;
  const scale = gridState.scale;

  // Convert current mouse screen position to local coordinates relative to INITIAL shape center
  const initCenterSx = toScreenX(init.x);
  const initCenterSy = toScreenY(init.y);
  const dx = screenX - initCenterSx;
  const dy = screenY - initCenterSy;
  const cosR = Math.cos(-rot);
  const sinR = Math.sin(-rot);
  const localX = dx * cosR - dy * sinR;
  const localY = dx * sinR + dy * cosR;

  // Current mouse in world math coordinates
  const mx = toMathX(screenX);
  const my = toMathY(screenY);

  if (type === 'line' || type === 'segment') {
    // PART 15 & 16: Two endpoints A and B. Dragging A moves A while B stays fixed; dragging B moves B while A stays fixed.
    const L0 = init.length || 6;
    const ax0 = init.x - (L0 / 2) * Math.cos(rot);
    const ay0 = init.y - (L0 / 2) * Math.sin(rot);
    const bx0 = init.x + (L0 / 2) * Math.cos(rot);
    const by0 = init.y + (L0 / 2) * Math.sin(rot);

    if (hId === 'end') {
      // Endpoint A (ax0, ay0) is the fixed anchor!
      const vX = mx - ax0;
      const vY = my - ay0;
      const newLen = Math.max(0.4, Math.hypot(vX, vY));
      const newRot = Math.atan2(vY, vX);
      shape.length = Math.round(newLen * 100) / 100;
      shape.rotation = newRot;
      shape.x = ax0 + (newLen / 2) * Math.cos(newRot);
      shape.y = ay0 + (newLen / 2) * Math.sin(newRot);
    } else if (hId === 'start') {
      // Endpoint B (bx0, by0) is the fixed anchor!
      const vX = bx0 - mx;
      const vY = by0 - my;
      const newLen = Math.max(0.4, Math.hypot(vX, vY));
      const newRot = Math.atan2(by0 - my, bx0 - mx);
      shape.length = Math.round(newLen * 100) / 100;
      shape.rotation = newRot;
      shape.x = bx0 - (newLen / 2) * Math.cos(newRot);
      shape.y = by0 - (newLen / 2) * Math.sin(newRot);
    }
  } else if (type === 'ray') {
    // PART 17: Origin A + Direction B
    const ax0 = init.x;
    const ay0 = init.y;
    if (hId === 'dir') {
      // Origin A stays fixed! Direction and length update
      const vX = mx - ax0;
      const vY = my - ay0;
      const newLen = Math.max(0.5, Math.hypot(vX, vY));
      const newRot = Math.atan2(vY, vX);
      shape.length = Math.round(newLen * 100) / 100;
      shape.rotation = newRot;
    } else if (hId === 'origin') {
      // Moving origin
      shape.x = mx;
      shape.y = my;
    }
  } else if (type === 'circle') {
    // PART 11: Radial resize handle. Center remains FIXED.
    const newR = Math.max(0.2, Math.hypot(localX, localY) / scale);
    shape.radius = Math.round(newR * 100) / 100;
  } else if (type === 'square') {
    // PART 10: Square preserves aspect ratio 1:1.
    // Dragging right -> anchor = left edge. Square expands right.
    const s0 = init.side;
    let sNew = s0;
    let deltaLocalX = 0;
    let deltaLocalY = 0;

    if (hId === 'e') {
      sNew = Math.max(0.2, (localX + (s0 * scale) / 2) / scale);
      deltaLocalX = ((sNew - s0) * scale) / 2;
    } else if (hId === 'w') {
      sNew = Math.max(0.2, ((s0 * scale) / 2 - localX) / scale);
      deltaLocalX = -((sNew - s0) * scale) / 2;
    } else if (hId === 'n') {
      sNew = Math.max(0.2, ((s0 * scale) / 2 - localY) / scale);
      deltaLocalY = -((sNew - s0) * scale) / 2;
    } else if (hId === 's') {
      sNew = Math.max(0.2, (localY + (s0 * scale) / 2) / scale);
      deltaLocalY = ((sNew - s0) * scale) / 2;
    } else if (hId === 'ne') {
      const sx = (localX + (s0 * scale) / 2) / scale;
      const sy = ((s0 * scale) / 2 - localY) / scale;
      sNew = Math.max(0.2, Math.max(sx, sy));
      deltaLocalX = ((sNew - s0) * scale) / 2;
      deltaLocalY = -((sNew - s0) * scale) / 2;
    } else if (hId === 'nw') {
      const sx = ((s0 * scale) / 2 - localX) / scale;
      const sy = ((s0 * scale) / 2 - localY) / scale;
      sNew = Math.max(0.2, Math.max(sx, sy));
      deltaLocalX = -((sNew - s0) * scale) / 2;
      deltaLocalY = -((sNew - s0) * scale) / 2;
    } else if (hId === 'se') {
      const sx = (localX + (s0 * scale) / 2) / scale;
      const sy = (localY + (s0 * scale) / 2) / scale;
      sNew = Math.max(0.2, Math.max(sx, sy));
      deltaLocalX = ((sNew - s0) * scale) / 2;
      deltaLocalY = ((sNew - s0) * scale) / 2;
    } else if (hId === 'sw') {
      const sx = ((s0 * scale) / 2 - localX) / scale;
      const sy = (localY + (s0 * scale) / 2) / scale;
      sNew = Math.max(0.2, Math.max(sx, sy));
      deltaLocalX = -((sNew - s0) * scale) / 2;
      deltaLocalY = ((sNew - s0) * scale) / 2;
    }

    shape.side = Math.round(sNew * 100) / 100;
    const cosWorld = Math.cos(rot);
    const sinWorld = Math.sin(rot);
    const deltaSx = deltaLocalX * cosWorld - deltaLocalY * sinWorld;
    const deltaSy = deltaLocalX * sinWorld + deltaLocalY * cosWorld;
    shape.x = init.x + deltaSx / scale;
    shape.y = init.y - deltaSy / scale;
  } else if (type === 'rectangle') {
    // PART 9: Rectangle. Dragging RIGHT -> anchor = LEFT edge. Dragging TOP -> anchor = BOTTOM edge.
    const w0 = init.width;
    const h0 = init.length;
    let wNew = w0;
    let hNew = h0;
    let deltaLocalX = 0;
    let deltaLocalY = 0;

    if (hId === 'e') {
      wNew = Math.max(0.2, (localX + (w0 * scale) / 2) / scale);
      deltaLocalX = ((wNew - w0) * scale) / 2;
    } else if (hId === 'w') {
      wNew = Math.max(0.2, ((w0 * scale) / 2 - localX) / scale);
      deltaLocalX = -((wNew - w0) * scale) / 2;
    } else if (hId === 'n') {
      hNew = Math.max(0.2, ((h0 * scale) / 2 - localY) / scale);
      deltaLocalY = -((hNew - h0) * scale) / 2;
    } else if (hId === 's') {
      hNew = Math.max(0.2, (localY + (h0 * scale) / 2) / scale);
      deltaLocalY = ((hNew - h0) * scale) / 2;
    } else if (hId === 'ne') {
      wNew = Math.max(0.2, (localX + (w0 * scale) / 2) / scale);
      hNew = Math.max(0.2, ((h0 * scale) / 2 - localY) / scale);
      deltaLocalX = ((wNew - w0) * scale) / 2;
      deltaLocalY = -((hNew - h0) * scale) / 2;
    } else if (hId === 'nw') {
      wNew = Math.max(0.2, ((w0 * scale) / 2 - localX) / scale);
      hNew = Math.max(0.2, ((h0 * scale) / 2 - localY) / scale);
      deltaLocalX = -((wNew - w0) * scale) / 2;
      deltaLocalY = -((hNew - h0) * scale) / 2;
    } else if (hId === 'se') {
      wNew = Math.max(0.2, (localX + (w0 * scale) / 2) / scale);
      hNew = Math.max(0.2, (localY + (h0 * scale) / 2) / scale);
      deltaLocalX = ((wNew - w0) * scale) / 2;
      deltaLocalY = ((hNew - h0) * scale) / 2;
    } else if (hId === 'sw') {
      wNew = Math.max(0.2, ((w0 * scale) / 2 - localX) / scale);
      hNew = Math.max(0.2, (localY + (h0 * scale) / 2) / scale);
      deltaLocalX = -((wNew - w0) * scale) / 2;
      deltaLocalY = ((hNew - h0) * scale) / 2;
    }

    shape.width = Math.round(wNew * 100) / 100;
    shape.length = Math.round(hNew * 100) / 100;
    const cosWorld = Math.cos(rot);
    const sinWorld = Math.sin(rot);
    const deltaSx = deltaLocalX * cosWorld - deltaLocalY * sinWorld;
    const deltaSy = deltaLocalX * sinWorld + deltaLocalY * cosWorld;
    shape.x = init.x + deltaSx / scale;
    shape.y = init.y - deltaSy / scale;
  } else if (type === 'ellipse') {
    // PART 12: Ellipse axis and corner handles
    const rx0 = init.radiusX;
    const ry0 = init.radiusY;
    let rxNew = rx0;
    let ryNew = ry0;
    let deltaLocalX = 0;
    let deltaLocalY = 0;

    if (hId === 'e') {
      rxNew = Math.max(0.2, (localX + rx0 * scale) / (2 * scale));
      deltaLocalX = (rxNew - rx0) * scale;
    } else if (hId === 'w') {
      rxNew = Math.max(0.2, (rx0 * scale - localX) / (2 * scale));
      deltaLocalX = -(rxNew - rx0) * scale;
    } else if (hId === 'n') {
      ryNew = Math.max(0.2, ((ry0 * scale) - localY) / (2 * scale));
      deltaLocalY = -(ryNew - ry0) * scale;
    } else if (hId === 's') {
      ryNew = Math.max(0.2, (localY + ry0 * scale) / (2 * scale));
      deltaLocalY = (ryNew - ry0) * scale;
    } else {
      const initDist = Math.max(1, Math.hypot(rx0 * scale, ry0 * scale));
      const currDist = Math.hypot(localX, localY);
      const ratio = Math.max(0.1, currDist / initDist);
      rxNew = rx0 * ratio;
      ryNew = ry0 * ratio;
    }

    shape.radiusX = Math.round(rxNew * 100) / 100;
    shape.radiusY = Math.round(ryNew * 100) / 100;
    const cosWorld = Math.cos(rot);
    const sinWorld = Math.sin(rot);
    const deltaSx = deltaLocalX * cosWorld - deltaLocalY * sinWorld;
    const deltaSy = deltaLocalX * sinWorld + deltaLocalY * cosWorld;
    shape.x = init.x + deltaSx / scale;
    shape.y = init.y - deltaSy / scale;
  } else if (type === 'triangle') {
    // PART 14: Triangle vertex dragging using actual vertices
    const initVerts = gridState.resizeInitialTriangleVerts || getTriangleVertices(init);
    let v0 = { ...initVerts[0] };
    let v1 = { ...initVerts[1] };
    let v2 = { ...initVerts[2] };

    if (hId === 'v0') v0 = { x: mx, y: my };
    else if (hId === 'v1') v1 = { x: mx, y: my };
    else if (hId === 'v2') v2 = { x: mx, y: my };

    const sideA = Math.hypot(v1.x - v2.x, v1.y - v2.y);
    const sideB = Math.hypot(v0.x - v2.x, v0.y - v2.y);
    const sideC = Math.hypot(v0.x - v1.x, v0.y - v1.y);

    // Validate triangle inequality: sum of any two sides must exceed the third
    if (sideA + sideB > sideC + 0.1 && sideA + sideC > sideB + 0.1 && sideB + sideC > sideA + 0.1) {
      shape.sideA = Math.round(sideA * 100) / 100;
      shape.sideB = Math.round(sideB * 100) / 100;
      shape.sideC = Math.round(sideC * 100) / 100;
      shape.x = (v0.x + v1.x + v2.x) / 3;
      shape.y = (v0.y + v1.y + v2.y) / 3;
    }
  } else if (type === 'hexagon') {
    // PART 13: Hexagon vertex dragging with opposite vertex anchored
    const vIdx = parseInt(hId.replace('v', ''), 10);
    const initVerts = getRegularPolygonVertices(init.x, init.y, 6, init.side);
    if (!isNaN(vIdx) && initVerts[vIdx]) {
      const oppIdx = (vIdx + 3) % 6;
      const oppVert = initVerts[oppIdx];
      const dist = Math.hypot(mx - oppVert.x, my - oppVert.y);
      const newR = Math.max(0.4, dist / 2);
      shape.side = Math.round(newR * 100) / 100;
      shape.x = (mx + oppVert.x) / 2;
      shape.y = (my + oppVert.y) / 2;
    }
  } else if (type === 'pentagon') {
    const dist = Math.hypot(mx - init.x, my - init.y);
    const R = Math.max(0.4, dist);
    const newSide = R * 2 * Math.sin(Math.PI / 5);
    shape.side = Math.round(newSide * 100) / 100;
  }

  if (!skipRender) {
    render();
    updateDimensionsPanelValues();
    renderPropertiesPanel();
  }
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
  switch (getShapeType(shape)) {
    case 'square': return (shape.side * Math.SQRT2) / 2;
    case 'rectangle': return Math.hypot(shape.width, shape.length) / 2;
    case 'circle': return shape.radius;
    case 'semicircle': return shape.radius;
    case 'ellipse': return Math.max(shape.radiusX, shape.radiusY);
    case 'triangle': return Math.max(shape.sideA, shape.sideB, shape.sideC) / 1.5;
    case 'right_triangle': return Math.hypot(shape.base || 4, shape.height || 3) / 1.5;
    case 'equilateral_triangle': return (shape.side || 4) / Math.sqrt(3);
    case 'isosceles_triangle': return Math.max(shape.base || 4, shape.leg || 5) / 1.5;
    case 'parallelogram': return Math.hypot((shape.base || 5) + (shape.skew || 1.5), shape.height || 3) / 2;
    case 'rhombus': return Math.max(shape.diag1 || 5, shape.diag2 || 3.5) / 2;
    case 'trapezoid': return Math.hypot(shape.bottomBase || 5, shape.height || 3) / 2;
    case 'kite': return Math.max(shape.diagX || 4, (shape.topH || 2) + (shape.bottomH || 3.5)) / 2;
    case 'pentagon': return shape.side * 0.85;
    case 'hexagon': return shape.side;
    case 'regular_polygon': return (shape.side || 2.2) / (2 * Math.sin(Math.PI / (shape.sides || 8)));
    case 'point': return 0.8;
    case 'segment':
    case 'line':
    case 'ray': return (shape.length || 6) / 2;
    case 'angle': return shape.armLength || 5;
    case 'cube': return ((shape.side || 3.5) * Math.SQRT2) / 2;
    case 'cuboid': return Math.hypot(shape.width || 4.5, shape.depth || 3.5) / 2;
    case 'triangular_prism': return (shape.side || 4) / Math.sqrt(3);
    case 'cylinder': return Math.hypot(shape.radius || 2.2, (shape.height || 4.2) / 2);
    case 'sphere': return shape.radius || 2.5;
    case 'pyramid': return Math.max((shape.baseSize || 4) / 1.4, shape.height || 4);
    case 'cone': return Math.max(shape.radius || 2.5, shape.height || 4);
    case 'tetrahedron': return shape.radius || 2.8;
    case 'torus': return (shape.radius || 3) + (shape.tube || 0.9);
    default: return 2.5;
  }
}

// --- Canvas Setup, Resolution & Coalesced Frame Scheduling ---
let cachedCanvasRect = null;
let cachedClientWidth = 0;
let cachedClientHeight = 0;
let cachedDpr = 1;
let resizeRafId = null;
let interactionRafId = null;
let pendingRender2D = false;
let pendingUpdateDims = false;
let pendingUpdateProps = false;
let lastCanvasCursor = '';
let cachedCoordsReadoutEl = null;
let lastCoordsReadoutText = '';

function getCanvasRect() {
  if (!canvas) return { left: 0, top: 0, width: 0, height: 0 };
  if (!cachedCanvasRect || cachedCanvasRect.width === 0) {
    cachedCanvasRect = canvas.getBoundingClientRect();
  }
  return cachedCanvasRect;
}

function setCanvasCursor(cursorVal) {
  if (!canvas || lastCanvasCursor === cursorVal) return;
  lastCanvasCursor = cursorVal;
  canvas.style.cursor = cursorVal;
}

function flushInteractionFrame() {
  if (interactionRafId !== null) {
    cancelAnimationFrame(interactionRafId);
    interactionRafId = null;
  }
  const doRender = pendingRender2D;
  const doDims = pendingUpdateDims;
  const doProps = pendingUpdateProps;
  pendingRender2D = false;
  pendingUpdateDims = false;
  pendingUpdateProps = false;

  if (doRender) render();
  if (doDims) updateDimensionsPanelValues();
  if (doProps) renderPropertiesPanel();
}

function scheduleInteractionFrame(needRender = true, needDims = false, needProps = false) {
  if (needRender) pendingRender2D = true;
  if (needDims) pendingUpdateDims = true;
  if (needProps) pendingUpdateProps = true;

  if (interactionRafId === null) {
    interactionRafId = requestAnimationFrame(() => {
      interactionRafId = null;
      flushInteractionFrame();
    });
  }
}

function initCanvas() {
  canvas = document.getElementById('geometryCanvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d', { alpha: false });
  resizeCanvas();
  window.addEventListener('resize', onWindowResize, { passive: true });
}

function resizeCanvas() {
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const targetW = Math.floor(width * dpr);
  const targetH = Math.floor(height * dpr);

  cachedDpr = dpr;
  cachedClientWidth = width;
  cachedClientHeight = height;

  // Only reallocate GPU canvas backing buffer if physical pixel dimensions changed
  if (canvas.width !== targetW || canvas.height !== targetH) {
    canvas.width = targetW;
    canvas.height = targetH;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  cachedCanvasRect = canvas.getBoundingClientRect();

  // Initialize origin to screen center if not set yet
  if (gridState.originX === 0 && gridState.originY === 0) {
    gridState.originX = width / 2;
    gridState.originY = height / 2;
  }
}

function onWindowResize() {
  if (resizeRafId !== null) return;
  const oldWidth = cachedClientWidth || (canvas ? canvas.clientWidth : window.innerWidth);
  const oldHeight = cachedClientHeight || (canvas ? canvas.clientHeight : window.innerHeight);

  resizeRafId = requestAnimationFrame(() => {
    resizeRafId = null;
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    resizeCanvas();

    // Preserve relative origin position on resize
    if (oldWidth > 0 && oldHeight > 0) {
      const relX = gridState.originX / oldWidth;
      const relY = gridState.originY / oldHeight;
      gridState.originX = relX * newWidth;
      gridState.originY = relY * newHeight;
    }

    if (threeRenderer && threeCamera) {
      threeCamera.aspect = newWidth / Math.max(1, newHeight);
      threeCamera.updateProjectionMatrix();
      threeRenderer.setSize(newWidth, newHeight);
      threeNeedsRender = true;
    }

    if (currentViewMode === '2d') {
      render();
    }
  });
}

// --- Infinite Grid Pan & Zoom Events ---
function initPanAndZoomEvents() {
  if (!canvas) return;

  // Mouse Wheel Zoom centered on cursor
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    cachedCanvasRect = canvas.getBoundingClientRect();
    const sx = e.clientX - cachedCanvasRect.left;
    const sy = e.clientY - cachedCanvasRect.top;

    const mathX = toMathX(sx);
    const mathY = toMathY(sy);

    // Zoom factor: 1.12 for zooming in, 1/1.12 for zooming out
    const zoomFactor = e.deltaY < 0 ? 1.12 : (1 / 1.12);
    const newScale = Math.max(0.0001, Math.min(20000, gridState.scale * zoomFactor));

    // Keep point under cursor stationary
    gridState.originX = sx - mathX * newScale;
    gridState.originY = sy + mathY * newScale;
    gridState.scale = newScale;

    scheduleInteractionFrame(true, false, false);
  }, { passive: false });

  // Mouse Down
  canvas.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // Only left click
    cachedCanvasRect = canvas.getBoundingClientRect();
    const sx = e.clientX - cachedCanvasRect.left;
    const sy = e.clientY - cachedCanvasRect.top;
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
        if (getShapeType(activeShape) === 'triangle') {
          gridState.resizeInitialTriangleVerts = getTriangleVertices(activeShape);
        }
        setCanvasCursor(hitHandle.cursor);
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
    if (!canvas || currentViewMode !== '2d') return;
    const rect = getCanvasRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    const mx = toMathX(sx);
    const my = toMathY(sy);

    // Update cursor readout
    updateCoordsReadout(mx, my);

    if (gridState.isResizingShape && gridState.draggedShape) {
      applyShapeResize(gridState.draggedShape, sx, sy, true);
      scheduleInteractionFrame(true, true, true);
    } else if (gridState.isRotatingShape && gridState.draggedShape) {
      const shape = gridState.draggedShape;
      const centerSx = toScreenX(shape.x);
      const centerSy = toScreenY(shape.y);
      const angle = Math.atan2(sx - centerSx, -(sy - centerSy));
      shape.rotation = angle;
      setCanvasCursor('crosshair');
      scheduleInteractionFrame(true, false, true);
    } else if (gridState.isDraggingShape && gridState.draggedShape) {
      gridState.draggedShape.x = mx - gridState.shapeDragOffsetMathX;
      gridState.draggedShape.y = my - gridState.shapeDragOffsetMathY;
      setCanvasCursor('move');
      scheduleInteractionFrame(true, true, false);
    } else if (gridState.isPanning) {
      const dx = sx - gridState.panStartX;
      const dy = sy - gridState.panStartY;
      gridState.originX = gridState.initialOriginX + dx;
      gridState.originY = gridState.initialOriginY + dy;
      scheduleInteractionFrame(true, false, false);
    } else {
      // Hover feedback
      const activeShape = activeShapeId ? SHAPES[activeShapeId] : null;
      if (activeShape && activeShape.visible && !activeShape.is3DOnly) {
        if (isRotationHandleClicked(activeShape, sx, sy)) {
          setCanvasCursor('crosshair');
          return;
        }
        const hitHandle = getResizeHandleAtScreenCoords(activeShape, sx, sy);
        if (hitHandle) {
          setCanvasCursor(hitHandle.cursor);
          return;
        }
      }
      const hitShape = getShapeAtMathCoords(mx, my);
      if (hitShape) {
        setCanvasCursor(e.shiftKey ? 'crosshair' : 'move');
      } else {
        setCanvasCursor('grab');
      }
    }
  }, { passive: true });

  // Mouse Up
  window.addEventListener('mouseup', () => {
    flushInteractionFrame();
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
      const dx = gridState.originX - gridState.initialOriginX;
      const dy = gridState.originY - gridState.initialOriginY;
      if (Math.hypot(dx, dy) < 4) {
        if (activeShapeId !== null) {
          setActiveShape(null);
          render();
        }
      }
      gridState.isPanning = false;
      if (canvas) {
        canvas.classList.remove('panning');
        render();
      }
    }
  });

  // Touch Support
  let touchStartDist = 0;
  let touchStartScale = 40;

  canvas.addEventListener('touchstart', (e) => {
    cachedCanvasRect = canvas.getBoundingClientRect();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const sx = touch.clientX - cachedCanvasRect.left;
      const sy = touch.clientY - cachedCanvasRect.top;
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
    if (!canvas || currentViewMode !== '2d') return;
    const rect = getCanvasRect();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const sx = touch.clientX - rect.left;
      const sy = touch.clientY - rect.top;
      const mx = toMathX(sx);
      const my = toMathY(sy);

      if (gridState.isResizingShape && gridState.draggedShape) {
        applyShapeResize(gridState.draggedShape, sx, sy, true);
        scheduleInteractionFrame(true, true, true);
      } else if (gridState.isRotatingShape && gridState.draggedShape) {
        const shape = gridState.draggedShape;
        const centerSx = toScreenX(shape.x);
        const centerSy = toScreenY(shape.y);
        shape.rotation = Math.atan2(sx - centerSx, -(sy - centerSy));
        scheduleInteractionFrame(true, false, true);
      } else if (gridState.isDraggingShape && gridState.draggedShape) {
        gridState.draggedShape.x = mx - gridState.shapeDragOffsetMathX;
        gridState.draggedShape.y = my - gridState.shapeDragOffsetMathY;
        scheduleInteractionFrame(true, true, false);
      } else if (gridState.isPanning) {
        gridState.originX = gridState.initialOriginX + (sx - gridState.panStartX);
        gridState.originY = gridState.initialOriginY + (sy - gridState.panStartY);
        scheduleInteractionFrame(true, false, false);
      }
    } else if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      if (touchStartDist > 0) {
        const factor = currentDist / touchStartDist;
        const midX = (t1.clientX + t2.clientX) / 2 - rect.left;
        const midY = (t1.clientY + t2.clientY) / 2 - rect.top;
        const mx = toMathX(midX);
        const my = toMathY(midY);
        const newScale = Math.max(0.0001, Math.min(20000, touchStartScale * factor));

        gridState.originX = midX - mx * newScale;
        gridState.originY = midY + my * newScale;
        gridState.scale = newScale;
        scheduleInteractionFrame(true, false, false);
      }
    }
  }, { passive: false });

  window.addEventListener('touchend', () => {
    flushInteractionFrame();
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
  if (!cachedCoordsReadoutEl) {
    cachedCoordsReadoutEl = document.getElementById('gridCoordsReadout');
  }
  if (cachedCoordsReadoutEl) {
    const signX = mx >= 0 ? '+' : '';
    const signY = my >= 0 ? '+' : '';
    const nextText = `(${signX}${mx.toFixed(2)}, ${signY}${my.toFixed(2)})`;
    if (nextText !== lastCoordsReadoutText) {
      lastCoordsReadoutText = nextText;
      cachedCoordsReadoutEl.textContent = nextText;
    }
  }
}

// --- Shape Selector Panel & Multi-Instance Shape Management ---
function addShapeInstance(type, options = {}) {
  const template = SHAPE_TEMPLATES[type];
  if (!template) return null;

  shapeCounter++;
  const id = `${type}_${shapeCounter}`;
  const sameTypeCount = Object.values(SHAPES).filter(s => getShapeType(s) === type).length;
  const instanceNum = sameTypeCount + 1;
  const name = `${template.name} ${instanceNum}`;

  const color = getShapeColorForInstance(type, sameTypeCount);
  const fillColor = hexToRgba(color, 0.22);
  const strokeColor = color;

  const totalShapes = Object.keys(SHAPES).length;
  const offset = totalShapes > 0 ? ((totalShapes % 6) * 1.5) : 0;

  const newShape = {
    ...template,
    id,
    type,
    name,
    visible: true,
    color,
    fillColor,
    strokeColor,
    x: options.x !== undefined ? options.x : offset,
    y: options.y !== undefined ? options.y : -offset,
    y3D: options.y3D !== undefined ? options.y3D : 0,
    z: options.z !== undefined ? options.z : offset,
    rotation: options.rotation !== undefined ? options.rotation : 0,
    depth: options.depth !== undefined ? options.depth : 3,
    height3D: options.height3D !== undefined ? options.height3D : 3,
    solid3DType: options.solid3DType !== undefined ? options.solid3DType : 'flat',
    ...options
  };

  SHAPES[id] = newShape;
  renderOrder.push(id);
  setActiveShape(id);
  updateShapeSelectorUI();
  if (currentViewMode === '3d') {
    rebuildThreeShapes();
  } else {
    render();
  }
  return newShape;
}

function removeShapeInstance(shapeId) {
  if (!SHAPES[shapeId]) return;
  delete SHAPES[shapeId];

  const idx = renderOrder.indexOf(shapeId);
  if (idx !== -1) {
    renderOrder.splice(idx, 1);
  }

  if (activeShapeId === shapeId) {
    setActiveShape(null);
  }

  updateShapeSelectorUI();
  if (currentViewMode === '3d') {
    rebuildThreeShapes();
  } else {
    render();
  }
}

const shapeItemDomCache = new Map();

function createShapeSelectorItemElements(id) {
  const item = document.createElement('div');
  item.className = 'floating-shape-item';
  item.id = `shapeItem_${id}`;
  item.setAttribute('data-id', id);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'shape-checkbox-input';
  checkbox.id = `check_${id}`;

  checkbox.addEventListener('change', (e) => {
    e.stopPropagation();
    const shape = SHAPES[id];
    if (!shape) return;
    shape.visible = checkbox.checked;
    if (shape.visible) {
      bringShapeToFront(id);
      setActiveShape(id);
    } else {
      if (activeShapeId === id) {
        setActiveShape(null);
      } else {
        renderAllPanels();
      }
    }
    updateShapeCountBadge();
    if (currentViewMode === '3d') {
      rebuildThreeShapes();
    } else {
      render();
    }
  });

  const dot = document.createElement('span');
  dot.className = 'shape-color-indicator';

  const label = document.createElement('span');
  label.className = 'shape-item-label';

  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.className = 'shape-delete-btn';
  delBtn.innerHTML = '&times;';

  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    removeShapeInstance(id);
  });

  item.addEventListener('click', (e) => {
    if (e.target !== checkbox && e.target !== delBtn) {
      const shape = SHAPES[id];
      if (!shape) return;
      if (!shape.visible) {
        shape.visible = true;
        checkbox.checked = true;
        updateShapeCountBadge();
      }
      bringShapeToFront(id);
      setActiveShape(id);
      if (currentViewMode === '3d') {
        rebuildThreeShapes();
      } else {
        render();
      }
    }
  });

  item.appendChild(checkbox);
  item.appendChild(dot);
  item.appendChild(label);
  item.appendChild(delBtn);

  return { item, checkbox, dot, label, delBtn };
}

function updateShapeSelectorUI() {
  const listEl = document.getElementById('shapeSelectorList');
  if (!listEl) return;

  const countBadge = document.getElementById('graphCountIndicator');
  const visibleShapes = Object.values(SHAPES).filter(s => {
    if (currentViewMode === '2d' && s.is3DOnly) return false;
    return true;
  });
  if (countBadge) {
    const nextCountText = `${visibleShapes.length} ${visibleShapes.length === 1 ? 'shape' : 'shapes'}`;
    if (countBadge.textContent !== nextCountText) {
      countBadge.textContent = nextCountText;
    }
  }
  updateShapeCountBadge();

  // Prune removed shapes from cache
  for (const cachedId of shapeItemDomCache.keys()) {
    if (!SHAPES[cachedId]) {
      shapeItemDomCache.delete(cachedId);
    }
  }

  const displayIds = [];
  for (let i = renderOrder.length - 1; i >= 0; i--) {
    const id = renderOrder[i];
    const shape = SHAPES[id];
    if (!shape) continue;
    if (currentViewMode === '2d' && shape.is3DOnly) continue;
    displayIds.push(id);
  }

  if (displayIds.length === 0) {
    if (!listEl.querySelector('.no-shapes-msg')) {
      listEl.innerHTML = '<div class="no-shapes-msg">No shapes on graph.<br>Click a shape in the library above to add.</div>';
    }
    return;
  }

  let needsOrderSync = listEl.children.length !== displayIds.length;

  for (let i = 0; i < displayIds.length; i++) {
    const id = displayIds[i];
    const shape = SHAPES[id];
    let entry = shapeItemDomCache.get(id);
    if (!entry) {
      entry = createShapeSelectorItemElements(id);
      shapeItemDomCache.set(id, entry);
      needsOrderSync = true;
    }

    const { item, checkbox, dot, label, delBtn } = entry;
    item.classList.toggle('active-selected', id === activeShapeId);
    if (checkbox.checked !== !!shape.visible) {
      checkbox.checked = !!shape.visible;
    }
    const toggleAria = `Toggle ${shape.name}`;
    if (checkbox.getAttribute('aria-label') !== toggleAria) {
      checkbox.setAttribute('aria-label', toggleAria);
    }
    if (dot.dataset.color !== shape.color) {
      dot.dataset.color = shape.color;
      dot.style.backgroundColor = shape.color;
    }
    if (label.textContent !== shape.name) {
      label.textContent = shape.name;
    }
    const delTitle = `Delete ${shape.name}`;
    if (delBtn.title !== delTitle) {
      delBtn.title = delTitle;
      delBtn.setAttribute('aria-label', delTitle);
    }

    if (!needsOrderSync && listEl.children[i] !== item) {
      needsOrderSync = true;
    }
  }

  if (needsOrderSync) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < displayIds.length; i++) {
      frag.appendChild(shapeItemDomCache.get(displayIds[i]).item);
    }
    listEl.textContent = '';
    listEl.appendChild(frag);
  }
}

function initShapeLibrary() {
  const container = document.getElementById('shapeLibraryGrid');
  const tabs = document.querySelectorAll('.category-tab');
  const searchInput = document.getElementById('shapeSearchInput');
  const libButtonCache = new Map();

  function getCachedLibButton(item) {
    let btn = libButtonCache.get(item.type);
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-lib-shape';
      btn.setAttribute('data-type', item.type);
      btn.title = `Add new ${item.name} to graph`;
      btn.innerHTML = `
        <span class="lib-shape-icon" aria-hidden="true">${item.svg}</span>
        <span class="lib-shape-name">${item.name}</span>
      `;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        addShapeInstance(item.type);
      });
      libButtonCache.set(item.type, btn);
    }
    return btn;
  }

  function renderLibrary() {
    if (!container) return;

    const q = currentLibSearch.trim().toLowerCase();
    const filtered = SHAPE_LIBRARY_ITEMS.filter(item => {
      const matchCat = currentLibCategory === 'all' || item.category === currentLibCategory;
      const matchSearch = !q || item.name.toLowerCase().includes(q) || item.type.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = '<div class="no-shapes-msg">No shapes match your search.</div>';
      return;
    }

    const frag = document.createDocumentFragment();

    if (currentLibCategory === 'all' && !q) {
      // Group visually into 2D and 3D
      const items2D = filtered.filter(i => i.category === '2d');
      const items3D = filtered.filter(i => i.category === '3d');

      if (items2D.length > 0) {
        const group2D = document.createElement('div');
        group2D.className = 'shape-lib-group';
        const title2D = document.createElement('div');
        title2D.className = 'shape-lib-group-title';
        title2D.textContent = '2D Plane Shapes';
        group2D.appendChild(title2D);
        const grid2D = document.createElement('div');
        grid2D.className = 'shape-lib-group-items';
        items2D.forEach(item => grid2D.appendChild(getCachedLibButton(item)));
        group2D.appendChild(grid2D);
        frag.appendChild(group2D);
      }

      if (items3D.length > 0) {
        const group3D = document.createElement('div');
        group3D.className = 'shape-lib-group';
        const title3D = document.createElement('div');
        title3D.className = 'shape-lib-group-title';
        title3D.textContent = '3D Solid Shapes';
        group3D.appendChild(title3D);
        const grid3D = document.createElement('div');
        grid3D.className = 'shape-lib-group-items';
        items3D.forEach(item => grid3D.appendChild(getCachedLibButton(item)));
        group3D.appendChild(grid3D);
        frag.appendChild(group3D);
      }
    } else {
      const grid = document.createElement('div');
      grid.className = 'shape-lib-group-items';
      filtered.forEach(item => grid.appendChild(getCachedLibButton(item)));
      frag.appendChild(grid);
    }

    container.textContent = '';
    container.appendChild(frag);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentLibCategory = tab.getAttribute('data-category') || 'all';
      renderLibrary();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentLibSearch = e.target.value || '';
      renderLibrary();
    });
  }

  renderLibrary();
}

function initShapeSelectorPanel() {
  initShapeLibrary();
  updateShapeSelectorUI();
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
  const listEl = document.getElementById('shapeSelectorList');
  if (listEl) {
    const items = listEl.querySelectorAll('.floating-shape-item');
    items.forEach(item => {
      const id = item.getAttribute('data-id');
      if (id === activeShapeId) {
        item.classList.add('active-selected');
      } else {
        item.classList.remove('active-selected');
      }
    });
  }

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

// --- Floating Grid Controls (Zoom & Reset & Graph Visibility) ---
function initGridControls() {
  const btnZoomIn = document.getElementById('geoZoomInBtn');
  const btnZoomOut = document.getElementById('geoZoomOutBtn');
  const btnReset = document.getElementById('geoResetViewBtn');
  const btnGraphOn = document.getElementById('btnGraphOn');
  const btnGraphOff = document.getElementById('btnGraphOff');
  const btnQuickGraph = document.getElementById('geoGraphQuickBtn');

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

  if (btnGraphOn) {
    btnGraphOn.addEventListener('click', () => {
      setGraphVisibility(true);
    });
  }

  if (btnGraphOff) {
    btnGraphOff.addEventListener('click', () => {
      setGraphVisibility(false);
    });
  }

  if (btnQuickGraph) {
    btnQuickGraph.addEventListener('click', () => {
      setGraphVisibility(!gridState.showGraph);
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
      threeNeedsRender = true;
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
      threeNeedsRender = true;
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

// Helper to create BufferGeometry directly from flat coordinate array without allocating THREE.Vector3 instances
function createLineBufferGeometryFromCoords(coords) {
  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(coords, 3));
  return geom;
}

// --- Three.js 3D WebGL Scene Engine ---
function initThreeScene() {
  threeContainer = document.getElementById('threeJsContainer');
  if (!threeContainer) return;

  if (threeRenderer) {
    disposeThreeScene();
  }

  // 1. Scene setup with theme viewport background
  const isDark = currentTheme === 'dark';
  threeScene = new THREE.Scene();
  threeScene.background = new THREE.Color(isDark ? 0x020618 : 0xffffff);

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

  // 5. Lighting: Ambient + directional + subtle mathematical rim light
  threeSceneAmbientLight = new THREE.AmbientLight(isDark ? 0xdbeafe : 0xffffff, isDark ? 0.65 : 0.85);
  threeScene.add(threeSceneAmbientLight);

  threeSceneDirLight = new THREE.DirectionalLight(0xffffff, 0.95);
  threeSceneDirLight.position.set(16, 26, 20);
  threeSceneDirLight.castShadow = true;
  threeSceneDirLight.shadow.mapSize.width = 2048;
  threeSceneDirLight.shadow.mapSize.height = 2048;
  threeScene.add(threeSceneDirLight);

  threeSceneSecondaryLight = new THREE.DirectionalLight(isDark ? 0x3bb8db : 0xffffff, isDark ? 0.45 : 0.25);
  threeSceneSecondaryLight.position.set(-16, -10, -16);
  threeScene.add(threeSceneSecondaryLight);

  // 6. Dynamic Infinite 3D Floor Grid on X-Z plane at Y=0
  threeDynamicGridGroup = new THREE.Group();
  threeScene.add(threeDynamicGridGroup);

  // 7. Dynamic Colored Axis Lines from origin with tips & labels
  threeAxesGroup = new THREE.Group();
  threeScene.add(threeAxesGroup);

  lastGridTarget = new THREE.Vector3(9999, 9999, 9999);
  updateDynamicThreeGrid(true);

  threeControls.addEventListener('change', () => {
    threeNeedsRender = true;
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

  // 10. Start Animation Loop (ensure no duplicate loop exists)
  if (threeAnimFrameId) {
    cancelAnimationFrame(threeAnimFrameId);
    threeAnimFrameId = null;
  }
  threeNeedsRender = true;
  threeAnimate();
}

function threeAnimate() {
  if (currentViewMode !== '3d' || !threeRenderer || !threeScene || !threeCamera) {
    threeAnimFrameId = null;
    return;
  }
  threeAnimFrameId = requestAnimationFrame(threeAnimate);
  if (document.hidden) return;

  if (threeControls) {
    threeControls.update();
  }

  const isInteracting3D = isGizmoTranslating || is3DHeightDragging || is3DDragging || is3DRotating;
  if (threeNeedsRender || isInteracting3D) {
    threeNeedsRender = false;
    threeRenderer.render(threeScene, threeCamera);
  }
}

function getCachedNumberSprite(num, colorHex) {
  const isDark = currentTheme === 'dark';
  const key = `${num}_${colorHex}_${currentTheme}`;
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

    // High contrast outline halo against any geometry or grid line
    ctx.lineWidth = 7;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isDark ? 'rgba(9, 13, 22, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    ctx.strokeText(String(num), 128, 64);

    // Colored text fill
    ctx.fillStyle = colorHex || (isDark ? '#e2e8f0' : '#475569');
    ctx.fillText(String(num), 128, 64);

    texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.userData = { isCached: true };
    numberSpriteCache.set(key, texture);
  }
  const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(1.1, 0.55, 1);
  return sprite;
}

function updateDynamicThreeGrid(force = false) {
  if (!threeCamera || !threeControls || !threeDynamicGridGroup || !threeAxesGroup) return;

  threeDynamicGridGroup.visible = !!gridState.showGraph;
  threeAxesGroup.visible = !!gridState.showGraph;

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
  threeNeedsRender = true;

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
  const minorCoords = [];
  const majorCoords = [];
  const majorRatio = Math.round(majorStep / minorStep);

  for (let x = -extent; x <= extent; x += minorStep) {
    const isMajor = Math.abs(Math.round(x / minorStep) % majorRatio) === 0;
    if (isMajor) {
      majorCoords.push(x, 0, -extent, x, 0, extent);
    } else {
      minorCoords.push(x, 0, -extent, x, 0, extent);
    }
  }

  for (let z = -extent; z <= extent; z += minorStep) {
    const isMajor = Math.abs(Math.round(z / minorStep) % majorRatio) === 0;
    if (isMajor) {
      majorCoords.push(-extent, 0, z, extent, 0, z);
    } else {
      minorCoords.push(-extent, 0, z, extent, 0, z);
    }
  }

  const isDark = currentTheme === 'dark';
  if (minorCoords.length > 0) {
    const minorGeom = createLineBufferGeometryFromCoords(minorCoords);
    const minorMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x1e293b : 0xcbd5e1,
      transparent: true,
      opacity: isDark ? 0.65 : 0.5
    });
    threeDynamicGridGroup.add(new THREE.LineSegments(minorGeom, minorMat));
  }

  if (majorCoords.length > 0) {
    const majorGeom = createLineBufferGeometryFromCoords(majorCoords);
    const majorMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x334155 : 0x64748b,
      transparent: true,
      opacity: isDark ? 0.95 : 0.85
    });
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

  const labelRatio = Math.round(labelStep / minorStep);

  // X Axis Ticks & Numbers (-axisLen to +axisLen)
  const minorTickCoordsX = [];
  const majorTickCoordsX = [];
  const startX = Math.ceil(-axisLen / minorStep) * minorStep;
  for (let i = startX; i <= axisLen; i += minorStep) {
    if (Math.abs(i) < 0.001) continue;
    const isMajor = Math.abs(Math.round(i / minorStep) % majorRatio) === 0;
    const arm = isMajor ? majorTickArm : minorTickArm;
    if (isMajor) {
      majorTickCoordsX.push(i, 0, -arm, i, 0, arm);
    } else {
      minorTickCoordsX.push(i, 0, -arm, i, 0, arm);
    }

    // Number label at labelStep intervals
    if (Math.abs(Math.round(i / minorStep) % labelRatio) === 0) {
      const val = Math.round(i * 100) / 100;
      const str = val > 0 ? `+${val}` : `${val}`;
      const numSprite = getCachedNumberSprite(str, '#ef4444');
      numSprite.scale.set(labelWorldW, labelWorldH, 1);
      numSprite.position.set(i, 0.05, majorTickArm + labelWorldH * 0.85);
      threeAxesGroup.add(numSprite);
    }
  }

  if (minorTickCoordsX.length > 0) {
    threeAxesGroup.add(new THREE.LineSegments(createLineBufferGeometryFromCoords(minorTickCoordsX), new THREE.LineBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.55 })));
  }
  if (majorTickCoordsX.length > 0) {
    threeAxesGroup.add(new THREE.LineSegments(createLineBufferGeometryFromCoords(majorTickCoordsX), new THREE.LineBasicMaterial({ color: 0xef4444, transparent: true, opacity: 1.0 })));
  }

  // Y Axis Ticks & Numbers (yAxisBottom to yAxisTop, negative to positive)
  const minorTickCoordsY = [];
  const majorTickCoordsY = [];
  const startY = Math.ceil(yAxisBottom / minorStep) * minorStep;
  for (let j = startY; j <= yAxisTop; j += minorStep) {
    if (Math.abs(j) < 0.001) continue;
    const isMajor = Math.abs(Math.round(j / minorStep) % majorRatio) === 0;
    const arm = isMajor ? majorTickArm : minorTickArm;
    if (isMajor) {
      majorTickCoordsY.push(-arm, j, 0, arm, j, 0);
    } else {
      minorTickCoordsY.push(-arm, j, 0, arm, j, 0);
    }

    if (Math.abs(Math.round(j / minorStep) % labelRatio) === 0) {
      const val = Math.round(j * 100) / 100;
      const str = val > 0 ? `+${val}` : `${val}`;
      const numSprite = getCachedNumberSprite(str, '#10b981');
      numSprite.scale.set(labelWorldW, labelWorldH, 1);
      numSprite.position.set(majorTickArm + labelWorldW * 0.45, j, 0);
      threeAxesGroup.add(numSprite);
    }
  }

  if (minorTickCoordsY.length > 0) {
    threeAxesGroup.add(new THREE.LineSegments(createLineBufferGeometryFromCoords(minorTickCoordsY), new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.55 })));
  }
  if (majorTickCoordsY.length > 0) {
    threeAxesGroup.add(new THREE.LineSegments(createLineBufferGeometryFromCoords(majorTickCoordsY), new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 1.0 })));
  }

  // Z Axis Ticks & Numbers (-axisLen to +axisLen, negative to positive)
  const minorTickCoordsZ = [];
  const majorTickCoordsZ = [];
  const startZ = Math.ceil(-axisLen / minorStep) * minorStep;
  for (let k = startZ; k <= axisLen; k += minorStep) {
    if (Math.abs(k) < 0.001) continue;
    const isMajor = Math.abs(Math.round(k / minorStep) % majorRatio) === 0;
    const arm = isMajor ? majorTickArm : minorTickArm;
    if (isMajor) {
      majorTickCoordsZ.push(-arm, 0, k, arm, 0, k);
    } else {
      minorTickCoordsZ.push(-arm, 0, k, arm, 0, k);
    }

    if (Math.abs(Math.round(k / minorStep) % labelRatio) === 0) {
      const val = Math.round(k * 100) / 100;
      const str = val > 0 ? `+${val}` : `${val}`;
      const numSprite = getCachedNumberSprite(str, '#2563eb');
      numSprite.scale.set(labelWorldW, labelWorldH, 1);
      numSprite.position.set(majorTickArm + labelWorldW * 0.45, 0.05, k);
      threeAxesGroup.add(numSprite);
    }
  }

  if (minorTickCoordsZ.length > 0) {
    threeAxesGroup.add(new THREE.LineSegments(createLineBufferGeometryFromCoords(minorTickCoordsZ), new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.55 })));
  }
  if (majorTickCoordsZ.length > 0) {
    threeAxesGroup.add(new THREE.LineSegments(createLineBufferGeometryFromCoords(majorTickCoordsZ), new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 1.0 })));
  }
}

// Reusable THREE.Vector3 temporaries for 3D camera-relative ground movement
const _camRight = new THREE.Vector3();
const _camUp = new THREE.Vector3();
const _camDir = new THREE.Vector3();
const _rightXZ = new THREE.Vector3();
const _upXZ = new THREE.Vector3();
const _moveVec = new THREE.Vector3();
const _defaultRefPt = new THREE.Vector3(0, 0, 0);
const _tempRefPos = new THREE.Vector3();

function getCameraRelativeGroundDelta(dxScreen, dyScreen, refPoint) {
  if (!threeCamera) return _moveVec.set(0, 0, 0);

  // Extract camera basis in world space
  threeCamera.matrixWorld.extractBasis(_camRight, _camUp, _camDir);

  // Project camera screen-right and screen-up onto the ground plane (X-Z)
  _rightXZ.set(_camRight.x, 0, _camRight.z);
  _upXZ.set(_camUp.x, 0, _camUp.z);

  if (_rightXZ.lengthSq() > 1e-6) _rightXZ.normalize();
  if (_upXZ.lengthSq() > 1e-6) _upXZ.normalize();

  // Distance from camera to shape determines sensitivity
  const dist = threeCamera.position.distanceTo(refPoint || _defaultRefPt);
  const factor = Math.max(0.005, dist * 0.0022);

  // dxScreen is right (+), dyScreen is down (+), so -dyScreen is screen UP
  _moveVec.set(0, 0, 0);
  _moveVec.addScaledVector(_rightXZ, dxScreen * factor);
  _moveVec.addScaledVector(_upXZ, -dyScreen * factor);

  return _moveVec;
}

function createAxisNumberSprite(num, colorHex) {
  return getCachedNumberSprite(num, colorHex);
}

function createAxisLabelSprite(label, colorHex) {
  const key = `${label}_${colorHex}`;
  let texture = axisLabelTextureCache.get(key);
  if (!texture) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = colorHex;
    ctx.font = 'bold italic 72px "Times New Roman", Times, Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 64, 64);

    texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.userData = { isCached: true };
    axisLabelTextureCache.set(key, texture);
  }
  const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(1.5, 1.5, 1);
  return sprite;
}

function createShapeLabelSprite(text, isHighlighted) {
  const isDark = currentTheme === 'dark';
  const key = `${text}_${isHighlighted ? 1 : 0}_${currentTheme}`;
  let texture = shapeLabelTextureCache.get(key);
  if (!texture) {
    if (shapeLabelTextureCache.size >= 64) {
      const oldestKey = shapeLabelTextureCache.keys().next().value;
      const oldestTex = shapeLabelTextureCache.get(oldestKey);
      if (oldestTex) oldestTex.dispose();
      shapeLabelTextureCache.delete(oldestKey);
    }

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 72;
    const ctx = canvas.getContext('2d');

    // Background rounded pill
    if (isHighlighted) {
      ctx.fillStyle = isDark ? '#3BB8DB' : '#0284c7';
    } else {
      ctx.fillStyle = isDark ? 'rgba(2, 6, 24, 0.92)' : 'rgba(255, 255, 255, 0.95)';
    }

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

    ctx.strokeStyle = isHighlighted ? (isDark ? '#3BB8DB' : '#ffffff') : (isDark ? 'rgba(59, 184, 219, 0.4)' : 'rgba(203, 213, 225, 0.9)');
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = isHighlighted ? (isDark ? '#020618' : '#ffffff') : (isDark ? '#ffffff' : '#0f172a');
    ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 36);

    texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.userData = { isCached: true };
    shapeLabelTextureCache.set(key, texture);
  }
  const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(3.4, 0.95, 1);
  return sprite;
}

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
  const key = `${text}_${colorHex || '#3b82f6'}`;
  let texture = gizmoPillTextureCache.get(key);
  if (!texture) {
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

    texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.userData = { isCached: true };
    gizmoPillTextureCache.set(key, texture);
  }
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
  const shapeType = getShapeType(shape);

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
    switch (shapeType) {
      case 'sphere': {
        const r = Math.max(0.1, shape.radius || 2);
        localMinY = 0;
        localMaxY = r * 2;
        break;
      }
      case 'cube': {
        const s = Math.max(0.1, shape.side || 3.5);
        localMinY = 0;
        localMaxY = s;
        break;
      }
      case 'cuboid': {
        const h = Math.max(0.1, shape.height || 3);
        localMinY = 0;
        localMaxY = h;
        break;
      }
      case 'triangular_prism': {
        const h = Math.max(0.1, shape.height || 4);
        localMinY = 0;
        localMaxY = h;
        break;
      }
      case 'cylinder': {
        const h = Math.max(0.1, shape.height || 4.2);
        localMinY = 0;
        localMaxY = h;
        break;
      }
      case 'tetrahedron': {
        const r = Math.max(0.1, shape.radius || 2.8);
        localMinY = 0;
        localMaxY = r * 1.6;
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
  switch (shapeType) {
    case 'square': {
      const s = (shape.side || 4) / 2;
      localMinX = -s; localMaxX = s;
      localMinZ = -s; localMaxZ = s;
      break;
    }
    case 'cube': {
      const s = (shape.side || 3.5) / 2;
      localMinX = -s; localMaxX = s;
      localMinZ = -s; localMaxZ = s;
      break;
    }
    case 'cuboid': {
      const w = (shape.width || 4.5) / 2;
      const d = (shape.depth || 3.5) / 2;
      localMinX = -w; localMaxX = w;
      localMinZ = -d; localMaxZ = d;
      break;
    }
    case 'triangular_prism': {
      const s = shape.side || 4;
      const r = s / Math.sqrt(3);
      localMinX = -r; localMaxX = r;
      localMinZ = -r; localMaxZ = r;
      break;
    }
    case 'cylinder': {
      const r = shape.radius || 2.2;
      localMinX = -r; localMaxX = r;
      localMinZ = -r; localMaxZ = r;
      break;
    }
    case 'tetrahedron': {
      const r = shape.radius || 2.8;
      localMinX = -r; localMaxX = r;
      localMinZ = -r; localMaxZ = r;
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
    case 'semicircle': {
      const r = shape.radius || 3;
      localMinX = -r; localMaxX = r;
      localMinZ = 0; localMaxZ = r;
      break;
    }
    case 'ellipse': {
      const rx = shape.radiusX || 3;
      const ry = shape.radiusY || 2;
      localMinX = -rx; localMaxX = rx;
      localMinZ = -ry; localMaxZ = ry;
      break;
    }
    case 'right_triangle':
    case 'equilateral_triangle':
    case 'isosceles_triangle':
    case 'parallelogram':
    case 'rhombus':
    case 'trapezoid':
    case 'kite':
    case 'regular_polygon': {
      try {
        const verts = get2DShapePolygonVertices({ ...shape, x: 0, y: 0 });
        if (verts && verts.length > 0) {
          const xs = verts.map(v => v.x);
          const zs = verts.map(v => -v.y);
          localMinX = Math.min(...xs); localMaxX = Math.max(...xs);
          localMinZ = Math.min(...zs); localMaxZ = Math.max(...zs);
        }
      } catch (e) {
        localMinX = -2; localMaxX = 2;
        localMinZ = -2; localMaxZ = 2;
      }
      break;
    }
    case 'point': {
      localMinX = -0.5; localMaxX = 0.5;
      localMinZ = -0.5; localMaxZ = 0.5;
      break;
    }
    case 'segment':
    case 'line':
    case 'ray': {
      const len = (shape.length || 6) / 2;
      localMinX = -len; localMaxX = len;
      localMinZ = -0.5; localMaxZ = 0.5;
      break;
    }
    case 'angle': {
      const arm = shape.armLength || 5;
      localMinX = -0.5; localMaxX = arm;
      localMinZ = -arm; localMaxZ = 0.5;
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

    const shaft = new THREE.Mesh(shaftGeom, mat);
    const cone = new THREE.Mesh(coneGeom, mat);
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

let pending3DPanelFrame = 0;
function schedule3DPanelUpdate() {
  if (pending3DPanelFrame) return;
  pending3DPanelFrame = requestAnimationFrame(() => {
    pending3DPanelFrame = 0;
    updateDimensionsPanelValues();
    renderPropertiesPanel();
  });
}

function initThreeInteraction() {
  if (!threeRenderer) return;

  if (threePointerMoveHandler) {
    window.removeEventListener('pointermove', threePointerMoveHandler);
    threePointerMoveHandler = null;
  }
  if (threePointerUpHandler) {
    window.removeEventListener('pointerup', threePointerUpHandler);
    threePointerUpHandler = null;
  }

  let cached3DRect = null;

  threeRenderer.domElement.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || !threeCamera || !threeShapeGroup) return;
    cached3DRect = threeRenderer.domElement.getBoundingClientRect();
    const rect = cached3DRect;
    threeMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    threeMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    threePointerDownPos.x = e.clientX;
    threePointerDownPos.y = e.clientY;
    pointerDown3DScreen.x = e.clientX;
    pointerDown3DScreen.y = e.clientY;
    isPointerDownOn3DBackground = false;

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
          threeNeedsRender = true;
          return;
        } else if (isHeightHandle) {
          is3DHeightDragging = true;
          dragged3DShape = shape;
          threeHeightDragStartH = shape.height !== undefined ? shape.height : (shape.height3D !== undefined ? shape.height3D : (shape.depth !== undefined ? shape.depth : 3));
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
    isPointerDownOn3DBackground = true;
    if (threeControls) threeControls.enabled = true;
  });

  threePointerMoveHandler = (e) => {
    if (currentViewMode !== '3d' || !threeRenderer || !threeCamera || !threeShapeGroup) return;

    const rect = cached3DRect || threeRenderer.domElement.getBoundingClientRect();
    threeMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    threeMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (isGizmoTranslating && gizmoDraggedShape) {
      const dx = e.clientX - gizmoPointerStart.x;
      const dy = e.clientY - gizmoPointerStart.y;
      _tempRefPos.set(gizmoDragStartPos.x, gizmoDragStartPos.y, gizmoDragStartPos.z);
      const moveVec = getCameraRelativeGroundDelta(dx, dy, _tempRefPos);

      if (gizmoDragAxis === 'x') {
        gizmoDraggedShape.x = Math.round((gizmoDragStartPos.x + moveVec.x) * 10) / 10;
      } else if (gizmoDragAxis === 'y') {
        const dist = threeCamera.position.distanceTo(_tempRefPos);
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

      threeNeedsRender = true;
      schedule3DPanelUpdate();
      return;
    } else if (is3DHeightDragging && dragged3DShape) {
      const dy = threeHeightDragStartY - e.clientY;
      const newH = Math.max(0.1, Math.round((threeHeightDragStartH + dy * 0.04) * 10) / 10);
      if (dragged3DShape.height3D !== newH) {
        if (dragged3DShape.height !== undefined) {
          dragged3DShape.height = newH;
        }
        dragged3DShape.height3D = newH;
        dragged3DShape.depth = newH;
        rebuildThreeShapes();
        updateDynamicThreeGrid(true);
        schedule3DPanelUpdate();
      }
    } else if (is3DDragging && dragged3DShape) {
      const dx = e.clientX - threePointerDownPos.x;
      const dy = e.clientY - threePointerDownPos.y;
      _tempRefPos.set(threeDragStartPos.x, threeDragStartPos.y, threeDragStartPos.z);
      const moveVec = getCameraRelativeGroundDelta(dx, dy, _tempRefPos);

      dragged3DShape.x = Math.round((threeDragStartPos.x + moveVec.x) * 10) / 10;
      dragged3DShape.z = Math.round((threeDragStartPos.z + moveVec.z) * 10) / 10;
      const curX = dragged3DShape.x;
      const curY = dragged3DShape.y3D || 0;
      const curZ = dragged3DShape.z || 0;
      const mesh = threeShapeGroup.children.find(m => m.userData && m.userData.shapeId === dragged3DShape.id && !m.userData.isGizmoRoot);
      if (mesh) mesh.position.set(curX, curY, curZ);
      const gizmo = threeShapeGroup.children.find(m => m.userData && m.userData.isGizmoRoot && m.userData.shapeId === dragged3DShape.id);
      if (gizmo) gizmo.position.set(curX, curY, curZ);
      threeNeedsRender = true;
      schedule3DPanelUpdate();
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
        threeNeedsRender = true;
        schedule3DPanelUpdate();
      }
    } else if (e.target === threeRenderer.domElement && e.buttons === 0) {
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
  };

  threePointerUpHandler = (e) => {
    cached3DRect = null;
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

    if (isPointerDownOn3DBackground) {
      const dist = Math.hypot(e.clientX - pointerDown3DScreen.x, e.clientY - pointerDown3DScreen.y);
      if (dist < 5) {
        // Clicked empty space in 3D: deselect shape and immediately hide all gizmos!
        if (activeShapeId !== null) {
          setActiveShape(null);
          rebuildThreeShapes();
          renderAllPanels();
        }
      }
      isPointerDownOn3DBackground = false;
    }
  };

  window.addEventListener('pointermove', threePointerMoveHandler, { passive: true });
  window.addEventListener('pointerup', threePointerUpHandler);
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
    const shapeType = getShapeType(shape);
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

      switch (shapeType) {
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
        case 'semicircle': {
          const r = Math.max(0.1, shape.radius || 3);
          const semi = new THREE.Shape();
          semi.absarc(0, 0, r, 0, Math.PI, false);
          semi.closePath();
          geom = new THREE.ShapeGeometry(semi, 48);
          geom.rotateX(-Math.PI / 2);
          geom.translate(0, 0.02, 0);
          break;
        }
        case 'point': {
          const r = Math.max(0.2, (shape.radius || 0.35) * 0.9);
          geom = new THREE.SphereGeometry(r, 20, 20);
          geom.translate(0, r, 0);
          labelY = r * 2 + 0.6;
          break;
        }
        case 'segment':
        case 'line':
        case 'ray': {
          const len = shape.length || 6;
          geom = new THREE.CylinderGeometry(0.08, 0.08, len, 16);
          geom.rotateZ(Math.PI / 2);
          geom.translate(0, 0.04, 0);
          break;
        }
        case 'angle': {
          const arm = shape.armLength || 5;
          const arm1 = new THREE.CylinderGeometry(0.08, 0.08, arm, 16);
          arm1.rotateZ(Math.PI / 2);
          arm1.translate(arm / 2, 0.04, 0);
          geom = arm1;
          break;
        }
        case 'right_triangle':
        case 'equilateral_triangle':
        case 'isosceles_triangle':
        case 'parallelogram':
        case 'rhombus':
        case 'trapezoid':
        case 'kite':
        case 'regular_polygon': {
          const verts = get2DShapePolygonVertices({ ...shape, x: 0, y: 0 });
          if (verts && verts.length >= 3) {
            const poly = new THREE.Shape();
            poly.moveTo(verts[0].x, verts[0].y);
            for (let i = 1; i < verts.length; i++) poly.lineTo(verts[i].x, verts[i].y);
            poly.closePath();
            geom = new THREE.ShapeGeometry(poly);
            geom.rotateX(-Math.PI / 2);
            geom.translate(0, 0.02, 0);
            cornerVerts = verts.map(v => ({ x: v.x, z: -v.y }));
          }
          break;
        }
      }
    } else if (is2DShape && solidType === 'extrude') {
      // Extruded Prism or Cylinder
      labelY = solidHeight + 0.9;
      switch (shapeType) {
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
      switch (shapeType) {
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
      switch (shapeType) {
        case 'cube': {
          const s = Math.max(0.1, shape.side || 3.5);
          geom = new THREE.BoxGeometry(s, s, s);
          geom.translate(0, s / 2, 0);
          labelY = s + 0.9;
          displayName = 'Cube';
          break;
        }
        case 'cuboid': {
          const w = Math.max(0.1, shape.width || 4.5);
          const h = Math.max(0.1, shape.height || 3);
          const d = Math.max(0.1, shape.depth || 3.5);
          geom = new THREE.BoxGeometry(w, h, d);
          geom.translate(0, h / 2, 0);
          labelY = h + 0.9;
          displayName = 'Cuboid';
          break;
        }
        case 'triangular_prism': {
          const s = Math.max(0.1, shape.side || 4);
          const h = Math.max(0.1, shape.height || 4);
          const triVerts = getEquilateralTriangleVertices({ x: 0, y: 0, side: s });
          const triShape = new THREE.Shape();
          triShape.moveTo(triVerts[0].x, triVerts[0].y);
          triShape.lineTo(triVerts[1].x, triVerts[1].y);
          triShape.lineTo(triVerts[2].x, triVerts[2].y);
          triShape.closePath();
          geom = new THREE.ExtrudeGeometry(triShape, { depth: h, bevelEnabled: false });
          geom.rotateX(-Math.PI / 2);
          labelY = h + 0.9;
          displayName = 'Tri Prism';
          break;
        }
        case 'cylinder': {
          const r = Math.max(0.1, shape.radius || 2.2);
          const h = Math.max(0.1, shape.height || 4.2);
          geom = new THREE.CylinderGeometry(r, r, h, 48);
          geom.translate(0, h / 2, 0);
          labelY = h + 0.9;
          displayName = 'Cylinder';
          break;
        }
        case 'tetrahedron': {
          const r = Math.max(0.1, shape.radius || 2.8);
          geom = new THREE.TetrahedronGeometry(r);
          geom.translate(0, r * 0.8, 0);
          labelY = r * 1.6 + 0.9;
          displayName = 'Tetrahedron';
          break;
        }
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
    const isDark = currentTheme === 'dark';
    const isFlat = is2DShape && solidType === 'flat';

    let meshColor = '';
    let edgeColor = '';
    if (shape.hasCustomColor) {
      meshColor = shape.customColor;
      edgeColor = isActive ? (isDark ? '#3bb8db' : '#0284c7') : shape.customColor;
    } else {
      // Default mathematical graphics color: Light = black (#111111), Dark = white (#f8fafc)
      meshColor = isDark ? '#f8fafc' : '#111111';
      edgeColor = isActive ? (isDark ? '#3bb8db' : '#0284c7') : (isDark ? '#f8fafc' : '#111111');
    }

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(meshColor),
      transparent: true,
      opacity: isActive ? (isFlat ? 0.85 : 0.90) : (isFlat ? 0.65 : 0.72),
      roughness: isFlat ? 0.35 : 0.20,
      metalness: isFlat ? 0.08 : 0.22,
      side: THREE.DoubleSide
    });

    if (isActive) {
      mat.emissive = new THREE.Color(isDark ? 0x3bb8db : 0x0284c7);
      mat.emissiveIntensity = isFlat ? 0.25 : 0.35;
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
      color: new THREE.Color(edgeColor),
      linewidth: isActive ? 3 : 1.5,
      transparent: true,
      opacity: isActive ? 1.0 : (isDark ? 0.90 : 0.85)
    });
    const edgeLine = new THREE.LineSegments(edgesGeom, edgeMat);
    mesh.add(edgeLine);

    // If flat 2D shape, add small corner vertex markers
    if (isFlat && cornerVerts) {
      const vGeom = new THREE.SphereGeometry(0.11, 16, 16);
      const vMat = new THREE.MeshStandardMaterial({
        color: isActive ? (isDark ? 0x3bb8db : 0x0284c7) : (isDark ? 0x64748b : 0x94a3b8),
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

    // If active and has vertical height, add interactive height handle at top
    const bounds = getShape3DBoundsAnalytical(shape);
    const topY = bounds.localMaxY;
    const canAdjustHeight = (is2DShape && (solidType === 'extrude' || solidType === 'pyramid')) ||
      (!is2DShape && (shapeType === 'pyramid' || shapeType === 'cone' || shapeType === 'cylinder' || shapeType === 'cuboid' || shapeType === 'triangular_prism'));

    if (isActive && canAdjustHeight && topY > 0.2) {
      const handleGeom = new THREE.SphereGeometry(0.18, 16, 16);
      const handleMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x3bb8db : 0x0284c7,
        emissive: isDark ? 0x0284c7 : 0x0369a1,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8
      });
      const handleMesh = new THREE.Mesh(handleGeom, handleMat);
      handleMesh.position.set(0, topY + 0.16, 0);
      handleMesh.userData = { isHeightHandle: true, shapeId: shape.id };

      const stemGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.22, 8);
      const stemMat = new THREE.MeshBasicMaterial({ color: isDark ? 0x3bb8db : 0x0284c7 });
      const stemMesh = new THREE.Mesh(stemGeom, stemMat);
      stemMesh.position.set(0, topY + 0.06, 0);
      stemMesh.userData = { isHeightHandle: true, shapeId: shape.id };

      mesh.add(stemMesh);
      mesh.add(handleMesh);
    }

    // If active, add 3D rotation gizmo around the shape (subtle, clean, proportional)
    if (isActive) {
      const shapeR = Math.max(1.15, getShapeBoundingRadius(shape) + 0.18);
      const gizmoGeom = new THREE.TorusGeometry(shapeR, 0.03, 16, 64);
      gizmoGeom.rotateX(Math.PI / 2);
      gizmoGeom.translate(0, 0.04, 0);

      const gizmoMat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.45
      });
      const gizmoMesh = new THREE.Mesh(gizmoGeom, gizmoMat);
      gizmoMesh.userData = { isRotationGizmo: true, shapeId: shape.id };

      const handleGeom = new THREE.SphereGeometry(0.08, 16, 16);
      const handleMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.75 });
      [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].forEach(a => {
        const h = new THREE.Mesh(handleGeom, handleMat);
        h.position.set(shapeR * Math.cos(a), 0.04, shapeR * Math.sin(a));
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
  threeNeedsRender = true;
}

function disposeThreeObject(obj) {
  if (!obj) return;
  if (obj.geometry) obj.geometry.dispose();
  if (obj.material) {
    if (Array.isArray(obj.material)) {
      obj.material.forEach(m => {
        if (m.map && (!m.map.userData || !m.map.userData.isCached)) m.map.dispose();
        m.dispose();
      });
    } else {
      if (obj.material.map && (!obj.material.map.userData || !obj.material.map.userData.isCached)) {
        obj.material.map.dispose();
      }
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
  if (pending3DPanelFrame) {
    cancelAnimationFrame(pending3DPanelFrame);
    pending3DPanelFrame = 0;
  }
  if (threePointerMoveHandler) {
    window.removeEventListener('pointermove', threePointerMoveHandler);
    threePointerMoveHandler = null;
  }
  if (threePointerUpHandler) {
    window.removeEventListener('pointerup', threePointerUpHandler);
    threePointerUpHandler = null;
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
  if (threeDynamicGridGroup) {
    disposeThreeObject(threeDynamicGridGroup);
    threeDynamicGridGroup = null;
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

function getRightTriangleVertices(shape) {
  const b = shape.base || 4;
  const h = shape.height || 3;
  const cx = shape.x || 0;
  const cy = shape.y || 0;
  return [
    { x: cx - b / 3, y: cy - h / 3 },
    { x: cx + (2 * b) / 3, y: cy - h / 3 },
    { x: cx - b / 3, y: cy + (2 * h) / 3 }
  ];
}

function getEquilateralTriangleVertices(shape) {
  const s = shape.side || 4;
  const h = (s * Math.sqrt(3)) / 2;
  const cx = shape.x || 0;
  const cy = shape.y || 0;
  return [
    { x: cx, y: cy + (2 * h) / 3 },
    { x: cx - s / 2, y: cy - h / 3 },
    { x: cx + s / 2, y: cy - h / 3 }
  ];
}

function getIsoscelesTriangleVertices(shape) {
  const b = shape.base || 4;
  const leg = shape.leg || 5;
  const h = Math.sqrt(Math.max(0.1, leg * leg - (b * b) / 4));
  const cx = shape.x || 0;
  const cy = shape.y || 0;
  return [
    { x: cx, y: cy + (2 * h) / 3 },
    { x: cx - b / 2, y: cy - h / 3 },
    { x: cx + b / 2, y: cy - h / 3 }
  ];
}

function getParallelogramVertices(shape) {
  const b = shape.base || 5;
  const h = shape.height || 3;
  const s = shape.skew !== undefined ? shape.skew : 1.5;
  const cx = shape.x || 0;
  const cy = shape.y || 0;
  return [
    { x: cx - b / 2 - s / 2, y: cy - h / 2 },
    { x: cx + b / 2 - s / 2, y: cy - h / 2 },
    { x: cx + b / 2 + s / 2, y: cy + h / 2 },
    { x: cx - b / 2 + s / 2, y: cy + h / 2 }
  ];
}

function getRhombusVertices(shape) {
  const d1 = shape.diag1 || 5;
  const d2 = shape.diag2 || 3.5;
  const cx = shape.x || 0;
  const cy = shape.y || 0;
  return [
    { x: cx, y: cy - d2 / 2 },
    { x: cx + d1 / 2, y: cy },
    { x: cx, y: cy + d2 / 2 },
    { x: cx - d1 / 2, y: cy }
  ];
}

function getTrapezoidVertices(shape) {
  const a = shape.topBase || 3;
  const b = shape.bottomBase || 5;
  const h = shape.height || 3;
  const cx = shape.x || 0;
  const cy = shape.y || 0;
  return [
    { x: cx - a / 2, y: cy + h / 2 },
    { x: cx + a / 2, y: cy + h / 2 },
    { x: cx + b / 2, y: cy - h / 2 },
    { x: cx - b / 2, y: cy - h / 2 }
  ];
}

function getKiteVertices(shape) {
  const w = shape.diagX || 4;
  const top = shape.topH || 2;
  const bot = shape.bottomH || 3.5;
  const cx = shape.x || 0;
  const cy = shape.y || 0;
  return [
    { x: cx, y: cy + top },
    { x: cx + w / 2, y: cy },
    { x: cx, y: cy - bot },
    { x: cx - w / 2, y: cy }
  ];
}

function get2DShapePolygonVertices(shape) {
  const type = getShapeType(shape);
  switch (type) {
    case 'triangle': return getTriangleVertices(shape);
    case 'right_triangle': return getRightTriangleVertices(shape);
    case 'equilateral_triangle': return getEquilateralTriangleVertices(shape);
    case 'isosceles_triangle': return getIsoscelesTriangleVertices(shape);
    case 'parallelogram': return getParallelogramVertices(shape);
    case 'rhombus': return getRhombusVertices(shape);
    case 'trapezoid': return getTrapezoidVertices(shape);
    case 'kite': return getKiteVertices(shape);
    case 'pentagon': return getRegularPolygonVertices(shape.x || 0, shape.y || 0, 5, shape.side || 3);
    case 'hexagon': return getRegularPolygonVertices(shape.x || 0, shape.y || 0, 6, shape.side || 3);
    case 'regular_polygon': return getRegularPolygonVertices(shape.x || 0, shape.y || 0, shape.sides || 8, shape.side || 2.2);
    default: return null;
  }
}

function distToSegment(p, v, w) {
  const l2 = (v.x - w.x) * (v.x - w.x) + (v.y - w.y) * (v.y - w.y);
  if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)));
}

// Precise Shape Hitboxes (PARTS 20, 21, 22)
// Hit testing follows actual geometry with ~8-10px user tolerance
function isPointInsideShape(shape, mx, my) {
  const tolerance = Math.max(0.2, 10 / gridState.scale);
  const shapeType = getShapeType(shape);

  if (shapeType === 'point') {
    return Math.hypot(mx - shape.x, my - shape.y) <= Math.max(0.35, (shape.radius || 0.35) + tolerance);
  }

  // Account for shape rotation around center
  let dx = mx - shape.x;
  let dy = my - shape.y;
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

  // Segment: distance from point to line segment <= tolerance
  if (shapeType === 'segment') {
    const len = shape.length || 6;
    const clampedX = Math.max(-len / 2, Math.min(len / 2, dx));
    return Math.hypot(dx - clampedX, dy) <= tolerance;
  }

  // Line: thin tolerance around line path
  if (shapeType === 'line') {
    const len = shape.length || 12;
    const clampedX = Math.max(-len / 2 - tolerance, Math.min(len / 2 + tolerance, dx));
    return Math.abs(dy) <= tolerance && Math.abs(dx) <= (len / 2 + tolerance);
  }

  // Ray: origin (0,0) towards (+len, 0)
  if (shapeType === 'ray') {
    const len = shape.length || 7;
    const clampedX = Math.max(0, Math.min(len, dx));
    return Math.hypot(dx - clampedX, dy) <= tolerance;
  }

  if (shapeType === 'circle') {
    return Math.hypot(dx, dy) <= (shape.radius + tolerance);
  }

  if (shapeType === 'semicircle') {
    const r = (shape.radius || 3) + tolerance;
    return Math.hypot(dx, dy) <= r && dy >= -tolerance;
  }

  if (shapeType === 'ellipse') {
    const rx = Math.max(0.01, shape.radiusX);
    const ry = Math.max(0.01, shape.radiusY);
    const normDist = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);
    const tolFactor = 1 + tolerance / Math.min(rx, ry);
    return normDist <= tolFactor * tolFactor;
  }

  if (shapeType === 'square') {
    const half = shape.side / 2;
    return Math.abs(dx) <= (half + tolerance) && Math.abs(dy) <= (half + tolerance);
  }

  if (shapeType === 'rectangle') {
    const halfW = shape.width / 2;
    const halfL = shape.length / 2;
    return Math.abs(dx) <= (halfW + tolerance) && Math.abs(dy) <= (halfL + tolerance);
  }

  const polyVerts = get2DShapePolygonVertices(shape);
  if (polyVerts && polyVerts.length > 0) {
    if (isPointInPolygon(localMx, localMy, polyVerts)) return true;
    for (let i = 0; i < polyVerts.length; i++) {
      const p1 = polyVerts[i];
      const p2 = polyVerts[(i + 1) % polyVerts.length];
      if (distToSegment({ x: localMx, y: localMy }, p1, p2) <= tolerance) {
        return true;
      }
    }
    return false;
  }

  // 3D / other shapes
  switch (shapeType) {
    case 'angle': {
      return Math.hypot(dx, dy) <= ((shape.armLength || 5) + tolerance) && (Math.abs(dy) <= tolerance || Math.abs(dx) <= (shape.armLength || 5));
    }
    case 'cube': {
      const half = (shape.side || 3.5) / 2;
      return Math.abs(dx) <= (half + tolerance) && Math.abs(dy) <= (half + tolerance);
    }
    case 'cuboid': {
      const halfW = (shape.width || 4.5) / 2;
      const halfD = (shape.depth || 3.5) / 2;
      return Math.abs(dx) <= (halfW + tolerance) && Math.abs(dy) <= (halfD + tolerance);
    }
    case 'triangular_prism': {
      const verts = getEquilateralTriangleVertices({ ...shape, side: shape.side || 4 });
      return isPointInPolygon(localMx, localMy, verts);
    }
    case 'cylinder':
    case 'sphere':
    case 'cone': {
      return Math.hypot(dx, dy) <= ((shape.radius || 2.5) + tolerance);
    }
    case 'pyramid': {
      const half = (shape.baseSize || 4) / 2;
      return Math.abs(dx) <= (half + tolerance) && Math.abs(dy) <= (half + tolerance);
    }
    case 'tetrahedron': {
      return Math.hypot(dx, dy) <= ((shape.radius || 2.8) + tolerance);
    }
    case 'torus': {
      return Math.hypot(dx, dy) <= ((shape.radius || 3) + (shape.tube || 0.9) + tolerance);
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
  const width = cachedClientWidth || canvas.clientWidth;
  const height = cachedClientHeight || canvas.clientHeight;

  // 1. Draw Infinite Grid & Axes (Desmos style; fills full background)
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
  const isDark = currentTheme === 'dark';
  const theme = GRAPH_THEME[currentTheme];
  const xMin = toMathX(0);
  const xMax = toMathX(width);
  const yMin = toMathY(height);
  const yMax = toMathY(0);

  // Background clear/fill to ensure no white flash or bleed
  ctx.save();
  ctx.fillStyle = theme.background;
  ctx.fillRect(0, 0, width, height);

  // PART 24, 25, 26: If Graph visibility is toggled OFF, skip drawing grid lines, axes, ticks and numbers
  if (!gridState.showGraph) {
    ctx.restore();
    return;
  }

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

  // --- Minor Grid Lines ---
  ctx.lineWidth = 1;
  ctx.strokeStyle = theme.gridMinor;

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

  // --- Major Grid Lines ---
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = theme.gridMajor;

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

  ctx.lineWidth = 1.75;
  ctx.strokeStyle = theme.axis;

  ctx.beginPath();
  // X axis (horizontal line y=0)
  ctx.moveTo(0, screenOriginY);
  ctx.lineTo(width, screenOriginY);
  // Y axis (vertical line x=0)
  ctx.moveTo(screenOriginX, 0);
  ctx.lineTo(screenOriginX, height);
  ctx.stroke();

  // --- Axis Tick Notches & Labels (Desmos-like dynamic numbers) ---
  // PART 1: Light = black (#111111), Dark = white (#f8fafc)
  ctx.font = '500 11px "Inter", system-ui, sans-serif';
  ctx.fillStyle = theme.label;

  // Determine label position pinning if axes are off screen
  const axisLabelPosY = Math.max(22, Math.min(height - 10, screenOriginY + 16));
  const axisLabelPosX = Math.max(34, Math.min(width - 12, screenOriginX - 8));

  const drawXTicks = screenOriginY >= 0 && screenOriginY <= height;
  const drawYTicks = screenOriginX >= 0 && screenOriginX <= width;
  if (drawXTicks || drawYTicks) {
    ctx.beginPath();
    ctx.strokeStyle = theme.tick;
    ctx.lineWidth = 1.5;
    if (drawXTicks) {
      for (let x = startMajorX; x <= xMax; x += majorStep) {
        if (Math.abs(x) < majorStep * 0.05) continue;
        const sx = toScreenX(x);
        if (sx < 25 || sx > width - 25) continue;
        ctx.moveTo(sx, screenOriginY - 4);
        ctx.lineTo(sx, screenOriginY + 4);
      }
    }
    if (drawYTicks) {
      for (let y = startMajorY; y <= yMax; y += majorStep) {
        if (Math.abs(y) < majorStep * 0.05) continue;
        const sy = toScreenY(y);
        if (sy < 20 || sy > height - 20) continue;
        ctx.moveTo(screenOriginX - 4, sy);
        ctx.lineTo(screenOriginX + 4, sy);
      }
    }
    ctx.stroke();
  }

  // X Axis Labels
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  for (let x = startMajorX; x <= xMax; x += majorStep) {
    // Avoid drawing directly on origin intersection
    if (Math.abs(x) < majorStep * 0.05) continue;
    const sx = toScreenX(x);
    if (sx < 25 || sx > width - 25) continue;
    ctx.fillText(formatGridNumber(x), sx, axisLabelPosY);
  }

  // Y Axis Labels
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  for (let y = startMajorY; y <= yMax; y += majorStep) {
    if (Math.abs(y) < majorStep * 0.05) continue;
    const sy = toScreenY(y);
    if (sy < 20 || sy > height - 20) continue;
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

  const isDark = currentTheme === 'dark';
  const theme = GRAPH_THEME[currentTheme];

  // PART 1 & 2 & 5: Determine shape stroke and fill colors
  // If user selected a custom color, it is preserved across themes.
  // Otherwise, default to Black in Light Mode (#111111) and White in Dark Mode (#f8fafc).
  let strokeColor = '';
  let fillColor = '';

  if (shape.hasCustomColor) {
    strokeColor = shape.customColor;
    fillColor = hexToRgba(shape.customColor, 0.22);
  } else {
    strokeColor = theme.shapeDefaultStroke;
    fillColor = theme.shapeDefaultFill;
  }

  // Active shape selection glow
  if (isActive) {
    ctx.shadowColor = isDark ? 'rgba(59, 184, 219, 0.65)' : 'rgba(2, 132, 199, 0.55)';
    ctx.shadowBlur = isDark ? 16 : 12;
  }

  ctx.fillStyle = fillColor;
  ctx.strokeStyle = isActive ? theme.selection : strokeColor;
  ctx.lineWidth = isActive ? 2.5 : 2;

  let labelText = '';

  switch (getShapeType(shape)) {
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
    case 'right_triangle':
    case 'equilateral_triangle':
    case 'isosceles_triangle':
    case 'parallelogram':
    case 'rhombus':
    case 'trapezoid':
    case 'kite':
    case 'regular_polygon': {
      const verts = get2DShapePolygonVertices(shape);
      if (verts && verts.length > 0) {
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

        const st = getShapeType(shape);
        if (st === 'right_triangle') {
          const sqSize = 10;
          const v0x = toScreenX(verts[0].x);
          const v0y = toScreenY(verts[0].y);
          ctx.beginPath();
          ctx.rect(v0x, v0y - sqSize, sqSize, sqSize);
          ctx.strokeStyle = shape.strokeColor;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          labelText = `${shape.base} × ${shape.height}`;
        } else if (st === 'rhombus') {
          labelText = `d₁=${shape.diag1}, d₂=${shape.diag2}`;
        } else if (st === 'parallelogram') {
          labelText = `b=${shape.base}, h=${shape.height}`;
        } else if (st === 'trapezoid') {
          labelText = `a=${shape.topBase}, b=${shape.bottomBase}, h=${shape.height}`;
        } else if (st === 'kite') {
          labelText = `d=${shape.diagX}`;
        } else if (st === 'equilateral_triangle') {
          labelText = `s = ${shape.side}`;
        } else if (st === 'isosceles_triangle') {
          labelText = `b=${shape.base}, leg=${shape.leg}`;
        } else if (st === 'regular_polygon') {
          labelText = `n=${shape.sides || 8}, s=${shape.side}`;
        }
      }
      break;
    }
    case 'semicircle': {
      const r = (shape.radius || 3) * gridState.scale;
      ctx.beginPath();
      ctx.arc(sx, sy, r, Math.PI, 0, false);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      labelText = `r = ${shape.radius || 3}`;
      break;
    }
    case 'point': {
      const r = Math.max(4, (shape.radius || 0.35) * gridState.scale);
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? theme.selection : strokeColor;
      ctx.fill();
      ctx.strokeStyle = isDark ? '#020618' : '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      labelText = `(${shape.x.toFixed(1)}, ${shape.y.toFixed(1)})`;
      break;
    }
    case 'segment': {
      const len = (shape.length || 6) * gridState.scale;
      ctx.beginPath();
      ctx.moveTo(sx - len / 2, sy);
      ctx.lineTo(sx + len / 2, sy);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(sx - len / 2, sy, 4, 0, Math.PI * 2);
      ctx.arc(sx + len / 2, sy, 4, 0, Math.PI * 2);
      ctx.fillStyle = strokeColor;
      ctx.fill();
      labelText = `L = ${shape.length || 6}`;
      break;
    }
    case 'line': {
      const len = (shape.length || 12) * gridState.scale;
      ctx.beginPath();
      ctx.moveTo(sx - len / 2, sy);
      ctx.lineTo(sx + len / 2, sy);
      ctx.stroke();
      const arr = 8;
      ctx.beginPath();
      ctx.moveTo(sx - len / 2, sy);
      ctx.lineTo(sx - len / 2 + arr, sy - arr / 2);
      ctx.lineTo(sx - len / 2 + arr, sy + arr / 2);
      ctx.closePath();
      ctx.moveTo(sx + len / 2, sy);
      ctx.lineTo(sx + len / 2 - arr, sy - arr / 2);
      ctx.lineTo(sx + len / 2 - arr, sy + arr / 2);
      ctx.closePath();
      ctx.fillStyle = strokeColor;
      ctx.fill();
      labelText = `Line`;
      break;
    }
    case 'ray': {
      const len = (shape.length || 7) * gridState.scale;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + len, sy);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(sx, sy, 4, 0, Math.PI * 2);
      ctx.fillStyle = strokeColor;
      ctx.fill();
      const arr = 8;
      ctx.beginPath();
      ctx.moveTo(sx + len, sy);
      ctx.lineTo(sx + len - arr, sy - arr / 2);
      ctx.lineTo(sx + len - arr, sy + arr / 2);
      ctx.closePath();
      ctx.fillStyle = strokeColor;
      ctx.fill();
      labelText = `Ray`;
      break;
    }
    case 'angle': {
      const len = (shape.armLength || 5) * gridState.scale;
      const rad = ((shape.deg || 45) * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(sx + len, sy);
      ctx.lineTo(sx, sy);
      ctx.lineTo(sx + len * Math.cos(-rad), sy + len * Math.sin(-rad));
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(sx, sy, 22, -rad, 0);
      ctx.strokeStyle = isActive ? theme.selection : (isDark ? '#38bdf8' : '#2563eb');
      ctx.stroke();
      labelText = `${shape.deg || 45}°`;
      break;
    }
    case 'cube': {
      const s = (shape.side || 3.5) * gridState.scale;
      ctx.beginPath();
      ctx.rect(sx - s / 2, sy - s / 2, s, s);
      ctx.fill();
      ctx.stroke();
      labelText = `Cube ${shape.side}³`;
      break;
    }
    case 'cuboid': {
      const w = (shape.width || 4.5) * gridState.scale;
      const d = (shape.depth || 3.5) * gridState.scale;
      ctx.beginPath();
      ctx.rect(sx - w / 2, sy - d / 2, w, d);
      ctx.fill();
      ctx.stroke();
      labelText = `${shape.width} × ${shape.height} × ${shape.depth}`;
      break;
    }
    case 'triangular_prism': {
      const verts = getEquilateralTriangleVertices({ ...shape, side: shape.side || 4 });
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
      labelText = `Tri Prism`;
      break;
    }
    case 'cylinder': {
      const r = (shape.radius || 2.2) * gridState.scale;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      labelText = `Cylinder r=${shape.radius}`;
      break;
    }
    case 'cone': {
      const r = (shape.radius || 2.5) * gridState.scale;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      labelText = `Cone r=${shape.radius}`;
      break;
    }
    case 'sphere': {
      const r = (shape.radius || 2.5) * gridState.scale;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      labelText = `Sphere r=${shape.radius}`;
      break;
    }
    case 'pyramid': {
      const s = (shape.baseSize || 4) * gridState.scale;
      ctx.beginPath();
      ctx.rect(sx - s / 2, sy - s / 2, s, s);
      ctx.fill();
      ctx.stroke();
      labelText = `Pyramid`;
      break;
    }
    case 'tetrahedron': {
      const r = (shape.radius || 2.8) * gridState.scale;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      labelText = `Tetrahedron`;
      break;
    }
    case 'torus': {
      const R = (shape.radius || 3) * gridState.scale;
      const r = (shape.tube || 0.9) * gridState.scale;
      ctx.beginPath();
      ctx.arc(sx, sy, R + r, 0, Math.PI * 2);
      ctx.arc(sx, sy, Math.max(2, R - r), 0, Math.PI * 2, true);
      ctx.fill();
      ctx.stroke();
      labelText = `Torus`;
      break;
    }
  }

  // Draw Center Point Indicator
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = isActive ? theme.selection : strokeColor;
  ctx.fill();
  ctx.strokeStyle = isDark ? '#020618' : '#ffffff';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Draw Dimension Badge on Shape (matching ASCII summary: [2×4])
  if (labelText) {
    drawDimensionBadge(sx, sy - 8, labelText, shape.color);
  }

  // If active, draw clean shape-aware selection indicators
  if (isActive) {
    drawActiveSelectionIndicators(shape, sx, sy);
  }

  ctx.restore();
}

// Safe rounded rectangle drawing helper (with fallback for browsers without ctx.roundRect)
function drawRoundedRect(context, x, y, width, height, radius = 6) {
  if (typeof context.roundRect === 'function') {
    context.roundRect(x, y, width, height, radius);
    return;
  }
  if (typeof context.quadraticCurveTo !== 'function') {
    context.rect(x, y, width, height);
    return;
  }
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r);
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  context.lineTo(x + r, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
}

const badgeTextWidthCache = new Map();

// Draw centered dimension text tag on shape
function drawDimensionBadge(x, y, text, themeColor) {
  const isDark = currentTheme === 'dark';
  ctx.save();
  ctx.font = '600 11px "Inter", "STIX Two Text", sans-serif';
  let textWidth = badgeTextWidthCache.get(text);
  if (textWidth === undefined) {
    textWidth = ctx.measureText(text).width;
    if (badgeTextWidthCache.size > 256) badgeTextWidthCache.clear();
    badgeTextWidthCache.set(text, textWidth);
  }
  const paddingX = 8;
  const badgeWidth = textWidth + paddingX * 2;
  const badgeHeight = 19;

  // Background pill
  ctx.fillStyle = isDark ? 'rgba(2, 6, 24, 0.92)' : 'rgba(255, 255, 255, 0.94)';
  ctx.strokeStyle = isDark ? 'rgba(59, 184, 219, 0.4)' : 'rgba(203, 213, 225, 0.9)';
  ctx.lineWidth = 1;
  ctx.shadowColor = isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.08)';
  ctx.shadowBlur = isDark ? 6 : 4;
  ctx.shadowOffsetY = 1;

  ctx.beginPath();
  drawRoundedRect(ctx, x - badgeWidth / 2, y - badgeHeight / 2, badgeWidth, badgeHeight, 6);
  ctx.fill();
  ctx.stroke();

  // Text: Light Mode = Black (#111111), Dark Mode = White (#ffffff)
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = isDark ? '#ffffff' : '#111111';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
  ctx.restore();
}

// Shape-Aware Selection Visuals (PART 23)
// Replaces generic rectangular box with exact shape-specific boundaries
function drawActiveSelectionIndicators(shape, sx, sy) {
  const isDark = currentTheme === 'dark';
  const theme = GRAPH_THEME[currentTheme];
  const selectColor = theme.selection;
  const type = getShapeType(shape);

  ctx.save();
  ctx.strokeStyle = selectColor;
  ctx.lineWidth = 1.6;
  ctx.setLineDash([4, 4]);

  const handles = getShapeResizeHandles(shape);
  const handleSize = 7.5;
  const halfS = handleSize / 2;

  // Point: subtle highlight ring around point, no bounding box
  if (type === 'point') {
    const r = Math.max(9, (shape.radius || 0.35) * gridState.scale + 6);
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    return;
  }

  // Segment & Line: highlight line itself + 2 endpoint knobs (A and B)
  if (type === 'line' || type === 'segment') {
    ctx.setLineDash([]);
    handles.forEach(h => {
      const hx = sx + h.x;
      const hy = sy + h.y;
      ctx.beginPath();
      ctx.arc(hx, hy, 5, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#020618' : '#ffffff';
      ctx.fill();
      ctx.strokeStyle = selectColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(hx, hy, 2, 0, Math.PI * 2);
      ctx.fillStyle = selectColor;
      ctx.fill();
    });
    ctx.restore();
    return;
  }

  // Ray: highlight origin + direction knob
  if (type === 'ray') {
    ctx.setLineDash([]);
    handles.forEach(h => {
      const hx = sx + h.x;
      const hy = sy + h.y;
      ctx.beginPath();
      ctx.arc(hx, hy, 5, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#020618' : '#ffffff';
      ctx.fill();
      ctx.strokeStyle = selectColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(hx, hy, 2, 0, Math.PI * 2);
      ctx.fillStyle = selectColor;
      ctx.fill();
    });
    ctx.restore();
    return;
  }

  // Circle: dashed circle around circle + radial handle knob
  if (type === 'circle') {
    const r = shape.radius * gridState.scale;
    ctx.beginPath();
    ctx.arc(sx, sy, r + 4, 0, Math.PI * 2);
    ctx.stroke();

    ctx.setLineDash([]);
    handles.forEach(h => {
      const hx = sx + h.x + 4;
      const hy = sy + h.y;
      ctx.beginPath();
      ctx.arc(hx, hy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? selectColor : '#ffffff';
      ctx.fill();
      ctx.strokeStyle = selectColor;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    ctx.restore();
    return;
  }

  // Ellipse: dashed ellipse + 8 handles
  if (type === 'ellipse') {
    const rx = shape.radiusX * gridState.scale + 4;
    const ry = shape.radiusY * gridState.scale + 4;
    ctx.beginPath();
    ctx.ellipse(sx, sy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.setLineDash([]);
    handles.forEach(h => {
      const hx = sx + h.x;
      const hy = sy + h.y;
      ctx.beginPath();
      ctx.rect(hx - halfS, hy - halfS, handleSize, handleSize);
      ctx.fillStyle = isDark ? selectColor : '#ffffff';
      ctx.fill();
      ctx.strokeStyle = isDark ? '#020618' : selectColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
    ctx.restore();
    return;
  }

  // Triangle: dashed triangle around vertices + 3 vertex handles
  if (type === 'triangle') {
    const verts = getTriangleVertices(shape);
    ctx.beginPath();
    for (let i = 0; i < verts.length; i++) {
      const vx = toScreenX(verts[i].x);
      const vy = toScreenY(verts[i].y);
      if (i === 0) ctx.moveTo(vx, vy);
      else ctx.lineTo(vx, vy);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.setLineDash([]);
    handles.forEach(h => {
      const hx = sx + h.x;
      const hy = sy + h.y;
      ctx.beginPath();
      ctx.arc(hx, hy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? selectColor : '#ffffff';
      ctx.fill();
      ctx.strokeStyle = isDark ? '#020618' : selectColor;
      ctx.lineWidth = 1.8;
      ctx.stroke();
    });
    ctx.restore();
    return;
  }

  // Regular Polygons: dashed polygon around vertices + vertex handles
  if (type === 'pentagon' || type === 'hexagon' || type === 'regular_polygon') {
    const n = type === 'pentagon' ? 5 : (type === 'hexagon' ? 6 : (shape.sides || 8));
    const verts = getRegularPolygonVertices(shape.x, shape.y, n, shape.side);
    ctx.beginPath();
    for (let i = 0; i < verts.length; i++) {
      const vx = toScreenX(verts[i].x);
      const vy = toScreenY(verts[i].y);
      if (i === 0) ctx.moveTo(vx, vy);
      else ctx.lineTo(vx, vy);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.setLineDash([]);
    handles.forEach(h => {
      const hx = sx + h.x;
      const hy = sy + h.y;
      ctx.beginPath();
      ctx.arc(hx, hy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? selectColor : '#ffffff';
      ctx.fill();
      ctx.strokeStyle = isDark ? '#020618' : selectColor;
      ctx.lineWidth = 1.8;
      ctx.stroke();
    });
    ctx.restore();
    return;
  }

  // Rectangle / Square / Polygons: dashed boundary box + rotation handle + 8 resize handles
  let halfW = 20;
  let halfH = 20;
  if (type === 'square') {
    halfW = (shape.side * gridState.scale) / 2 + 4;
    halfH = halfW;
  } else if (type === 'rectangle') {
    halfW = (shape.width * gridState.scale) / 2 + 4;
    halfH = (shape.length * gridState.scale) / 2 + 4;
  } else {
    const ext = getShapeHalfExtents(shape);
    halfW = ext.halfW;
    halfH = ext.halfH;
  }

  ctx.beginPath();
  drawRoundedRect(ctx, sx - halfW, sy - halfH, halfW * 2, halfH * 2, 4);
  ctx.stroke();

  // Rotation handle stem & knob
  const stem = 22;
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.moveTo(sx, sy - halfH);
  ctx.lineTo(sx, sy - halfH - stem);
  ctx.strokeStyle = selectColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(sx, sy - halfH - stem, 5.5, 0, Math.PI * 2);
  ctx.fillStyle = isDark ? '#020618' : '#ffffff';
  ctx.fill();
  ctx.strokeStyle = selectColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(sx, sy - halfH - stem, 2, 0, Math.PI * 2);
  ctx.fillStyle = selectColor;
  ctx.fill();

  // Resize handles
  handles.forEach(h => {
    const hx = sx + h.x;
    const hy = sy + h.y;
    ctx.beginPath();
    ctx.rect(hx - halfS, hy - halfS, handleSize, handleSize);
    ctx.fillStyle = isDark ? selectColor : '#ffffff';
    ctx.fill();
    ctx.strokeStyle = isDark ? '#020618' : selectColor;
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
  if (!body) return;

  const shape = activeShapeId ? SHAPES[activeShapeId] : null;

  if (!shape || !shape.visible) {
    if (badge) badge.textContent = 'None';
    if (panelTitle) panelTitle.textContent = currentViewMode === '3d' ? '3D Construction' : 'Dimensions';
    body.innerHTML = `
      <div class="no-active-shape-msg">
        Select a shape from the Shapes panel to view &amp; edit dimensions.
      </div>
    `;
    return;
  }

  const is3D = currentViewMode === '3d';
  const shapeType = getShapeType(shape);

  if (is3D && !shape.is3DOnly) {
    // Dedicated 3D Construction & Modeling Environment for 2D Base Shapes
    if (panelTitle) panelTitle.textContent = '3D Construction';

    const solidType = shape.solid3DType || 'flat';
    let typeTagLabel = 'Flat Base';
    if (solidType === 'extrude') {
      typeTagLabel = shapeType === 'circle' ? 'Cylinder' : (shapeType === 'square' && Math.abs((shape.height3D || 3) - shape.side) < 1e-4 ? 'Cube' : 'Prism');
    } else if (solidType === 'pyramid') {
      typeTagLabel = (shapeType === 'circle' || shapeType === 'ellipse') ? 'Cone' : 'Pyramid';
    } else if (solidType === 'sphere') {
      typeTagLabel = 'Sphere';
    }

    if (badge) badge.textContent = `${shape.name} · ${typeTagLabel}`;

    // Compute base area & summary
    let baseArea = 0;
    let baseSummary = '';
    let baseInputsHtml = '';

    switch (shapeType) {
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
        <span class="opt-label">${shapeType === 'circle' ? 'Extrude (Cyl)' : 'Add Height'}</span>
      </button>
    `;
    const optPyramid = `
      <button type="button" class="construction-opt-btn ${solidType === 'pyramid' ? 'active' : ''}" data-type="pyramid" id="opt_pyramid">
        <span class="opt-icon">▲</span>
        <span class="opt-label">${shapeType === 'circle' || shapeType === 'ellipse' ? 'Cone' : 'Pyramid'}</span>
      </button>
    `;
    const optSphere = shapeType === 'circle' ? `
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
            ${shapeType === 'square' && solidType === 'extrude' ? `
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
            Center
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
  if (panelTitle) panelTitle.textContent = is3D ? '3D Dimensions' : 'Dimensions';
  if (badge) badge.textContent = shape.name;

  let inputsHtml = '';

  switch (shapeType) {
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
        ${is3D ? 'Center' : 'Center at (0,0)'}
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

        if (getShapeType(shape) === 'triangle') {
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

  switch (getShapeType(shape)) {
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

        if (getShapeType(shape) === 'triangle') {
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

  switch (getShapeType(shape)) {
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

  switch (getShapeType(shape)) {
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
  if (!body) return;

  const shape = activeShapeId ? SHAPES[activeShapeId] : null;

  if (!shape || !shape.visible) {
    if (badge) badge.textContent = 'None';
    if (propTitle) propTitle.textContent = 'Properties';
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
  const shapeType = getShapeType(shape);

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

      switch (shapeType) {
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
      switch (shapeType) {
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
      switch (shapeType) {
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
      switch (shapeType) {
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

    switch (shapeType) {
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

  const existingRows = body.children;
  if (
    existingRows.length === rows.length &&
    existingRows.length > 0 &&
    existingRows[0].classList.contains('prop-metric-row')
  ) {
    for (let i = 0; i < rows.length; i++) {
      const rowEl = existingRows[i];
      const lblEl = rowEl.firstElementChild;
      const valEl = rowEl.lastElementChild;
      if (lblEl && lblEl.textContent !== rows[i].label) lblEl.textContent = rows[i].label;
      if (valEl && valEl.textContent !== rows[i].value) valEl.textContent = rows[i].value;
    }
    return;
  }

  const frag = document.createDocumentFragment();
  for (let i = 0; i < rows.length; i++) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'prop-metric-row';
    const lblSpan = document.createElement('span');
    lblSpan.className = 'prop-metric-label';
    lblSpan.textContent = rows[i].label;
    const valSpan = document.createElement('span');
    valSpan.className = 'prop-metric-value';
    valSpan.textContent = rows[i].value;
    rowDiv.appendChild(lblSpan);
    rowDiv.appendChild(valSpan);
    frag.appendChild(rowDiv);
  }
  body.textContent = '';
  body.appendChild(frag);
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
  window.addEventListener('hashchange', () => {
    console.log('[MathLab Routing] hashchange detected:', window.location.hash);
    handleRouteChange();
  });

  // Direct click handler on all hash navigation links (category cards, back buttons, brand logo)
  // Ensures reliable navigation across all browser/iframe environments
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetHash = link.getAttribute('href');
      if (targetHash) {
        console.log('[MathLab Navigation] Anchor link clicked:', targetHash);
        if (window.location.hash !== targetHash) {
          window.location.hash = targetHash;
        } else {
          handleRouteChange();
        }
      }
    });
  });

  console.log('[MathLab Routing] Initial hash routing, current hash:', window.location.hash);
  handleRouteChange();
}

function handleRouteChange() {
  const rawHash = (window.location.hash || '').replace(/^#/, '').toLowerCase().trim();
  console.log('[MathLab Routing] Handling route:', rawHash || '(home)');

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
    if (geometryWorkspace) geometryWorkspace.classList.remove('active');
    if (placeholderWorkspace) placeholderWorkspace.classList.remove('active');
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

    // Lazy initialize geometry systems on demand
    ensureGeometryInitialized();

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

// --- Start Application (Ensures all functions, variables, and configs are fully defined) ---
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
