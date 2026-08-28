import {
  CanvasTexture,
  LinearFilter,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  RepeatWrapping,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { drawMonogramTile } from './monogramTexture';

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;

  uniform sampler2D uTexture;
  uniform vec2 uRepeat;
  uniform vec2 uPointer;
  uniform float uAspect;
  uniform float uTime;
  uniform float uPress;
  uniform vec3 uInk;
  uniform vec3 uSignal;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    vec2 delta = uv - uPointer;
    delta.x *= uAspect;
    float dist = length(delta);

    // Pressure: the plate flexes under the pointer.
    float press = exp(-dist * 5.2) * uPress;
    float angle = atan(delta.y, delta.x) + press * 1.35;
    vec2 warp = vec2(cos(angle), sin(angle)) * press * 0.085;

    // Ambient drift, slow enough to read as material, not as animation.
    warp += vec2(
      sin(uv.y * 7.0 + uTime * 0.24),
      cos(uv.x * 6.0 - uTime * 0.19)
    ) * 0.0032;

    float mask = texture2D(uTexture, (uv + warp) * uRepeat).a;

    // Keep the lattice away from the type: fade top, bottom and left edge.
    float band = smoothstep(0.0, 0.22, uv.y) * smoothstep(1.0, 0.72, uv.y);
    float side = smoothstep(0.0, 0.28, uv.x);

    float alpha = mask * band * side * (0.11 + press * 0.62);
    vec3 colour = mix(uInk, uSignal, clamp(press * 1.6, 0.0, 1.0));

    gl_FragColor = vec4(colour, alpha);
  }
`;

const INK = new Vector3(0.04, 0.04, 0.035);
const SIGNAL = new Vector3(0.13, 0.27, 1.0);

export function createLattice(canvas) {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: 'low-power',
  });
  renderer.setClearAlpha(0);

  const dpr = Math.min(window.devicePixelRatio || 1, 1.4);
  renderer.setPixelRatio(dpr);

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const tile = drawMonogramTile(512, 4);
  const texture = new CanvasTexture(tile);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;

  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      uTexture: { value: texture },
      uRepeat: { value: new Vector2(4, 3) },
      uPointer: { value: new Vector2(0.5, 0.5) },
      uAspect: { value: 1 },
      uTime: { value: 0 },
      uPress: { value: 0 },
      uInk: { value: INK },
      uSignal: { value: SIGNAL },
    },
  });

  const mesh = new Mesh(geometry, material);
  mesh.frustumCulled = false;
  scene.add(mesh);

  const pointer = new Vector2(0.5, 0.62);
  const target = new Vector2(0.5, 0.62);
  let press = 0;
  let pressTarget = 0;
  let frame = 0;
  let running = false;
  let last = 0;
  let width = 1;
  let height = 1;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    renderer.setSize(width, height, false);
    material.uniforms.uAspect.value = width / height;
    // One monogram roughly every 130 css pixels, whatever the viewport.
    material.uniforms.uRepeat.value.set(
      Math.max(3, width / 300),
      Math.max(3, height / 300),
    );
  }

  function render(now) {
    if (!running) return;
    frame = requestAnimationFrame(render);
    const delta = Math.min((now - last) / 1000 || 0, 0.05);
    last = now;

    pointer.lerp(target, 0.075);
    press += (pressTarget - press) * 0.06;

    material.uniforms.uTime.value += delta;
    material.uniforms.uPointer.value.copy(pointer);
    material.uniforms.uPress.value = press;

    renderer.render(scene, camera);
  }

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    frame = requestAnimationFrame(render);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(frame);
  }

  function setPointer(x, y) {
    target.set(x, y);
    pressTarget = 1;
  }

  function releasePointer() {
    pressTarget = 0;
  }

  function dispose() {
    stop();
    geometry.dispose();
    material.dispose();
    texture.dispose();
    renderer.dispose();
    renderer.forceContextLoss?.();
  }

  resize();
  renderer.render(scene, camera);

  return { start, stop, resize, setPointer, releasePointer, dispose };
}
