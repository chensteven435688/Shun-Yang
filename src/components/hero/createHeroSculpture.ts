import {
  AmbientLight,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SRGBColorSpace,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
  CatmullRomCurve3,
  type Material,
  type Object3D,
} from "three";
import { HERO3D, HERO_COLORS, type Hero3DMode } from "@/lib/hero3d";

export type HeroSculptureHandle = {
  setPointer: (nx: number, ny: number) => void;
  setScroll: (t: number) => void;
  resize: (width: number, height: number) => void;
  setVisible: (visible: boolean) => void;
  setDocumentHidden: (hidden: boolean) => void;
  dispose: () => void;
};

type Options = {
  canvas: HTMLCanvasElement;
  mode: Exclude<Hero3DMode, "static">;
  onReady?: () => void;
};

function disposeObject(object: Object3D) {
  object.traverse((child) => {
    const mesh = child as Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const material = mesh.material as Material | Material[] | undefined;
    if (Array.isArray(material)) material.forEach((m) => m.dispose());
    else material?.dispose();
  });
}

function createLambdaBlade(
  side: "left" | "right",
  material: MeshStandardMaterial
) {
  const geo = new BoxGeometry(0.26, 2.45, 0.055);
  const mesh = new Mesh(geo, material);
  mesh.position.x = side === "left" ? -0.48 : 0.48;
  mesh.position.y = 0.05;
  mesh.rotation.z = side === "left" ? 0.42 : -0.42;
  mesh.rotation.y = side === "left" ? 0.22 : -0.22;
  mesh.rotation.x = side === "left" ? -0.06 : 0.06;
  return mesh;
}

function createWaveFilament(gold: number) {
  const points: Vector3[] = [];
  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    const y = -1.15 + t * 2.3;
    const x = Math.sin(t * Math.PI * 4) * 0.08;
    const z = Math.cos(t * Math.PI * 3) * 0.06;
    points.push(new Vector3(x, y, z));
  }
  const curve = new CatmullRomCurve3(points);
  const geo = new TubeGeometry(curve, 64, 0.012, 6, false);
  const mat = new MeshStandardMaterial({
    color: gold,
    metalness: 0.85,
    roughness: 0.28,
    emissive: new Color(gold),
    emissiveIntensity: 0.18,
  });
  return new Mesh(geo, mat);
}

function createParticles(count: number) {
  const geo = new BufferGeometry();
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 4.5;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2.4;
  }
  geo.setAttribute("position", new BufferAttribute(positions, 3));
  const mat = new PointsMaterial({
    color: HERO_COLORS.cream,
    size: 0.018,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
  });
  return new Points(geo, mat);
}

export function createHeroSculpture({
  canvas,
  mode,
  onReady,
}: Options): HeroSculptureHandle {
  const scene = new Scene();
  scene.background = null;

  const camera = new PerspectiveCamera(36, 1, 0.1, 40);
  camera.position.set(0, 0.15, 5.2);

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: mode === "full",
    powerPreference: "high-performance",
    failIfMajorPerformanceCaveat: false,
  });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = SRGBColorSpace;

  const dprCap = HERO3D.dpr[mode];
  const setSize = (width: number, height: number) => {
    const w = Math.max(1, width);
    const h = Math.max(1, height);
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };

  const root = new Group();
  scene.add(root);

  const bladeMat = new MeshStandardMaterial({
    color: HERO_COLORS.metal,
    metalness: 0.92,
    roughness: 0.32,
  });
  const bladeMatB = bladeMat.clone();
  bladeMatB.color = new Color(HERO_COLORS.metalDark);
  bladeMatB.metalness = 0.88;
  bladeMatB.roughness = 0.38;

  root.add(createLambdaBlade("left", bladeMat));
  root.add(createLambdaBlade("right", bladeMatB));

  const filament = createWaveFilament(HERO_COLORS.gold);
  root.add(filament);

  // Thin orbital ring (torus-like ellipse via line of points as thin tube)
  const orbitPts: Vector3[] = [];
  for (let i = 0; i <= 64; i++) {
    const a = (i / 64) * Math.PI * 2;
    orbitPts.push(new Vector3(Math.cos(a) * 1.55, Math.sin(a) * 0.95, Math.sin(a) * 0.2));
  }
  const orbitCurve = new CatmullRomCurve3(orbitPts, true);
  const orbitGeo = new TubeGeometry(orbitCurve, 96, 0.006, 5, true);
  const orbitMat = new MeshStandardMaterial({
    color: HERO_COLORS.cream,
    metalness: 0.7,
    roughness: 0.4,
    transparent: true,
    opacity: 0.45,
  });
  const orbit = new Mesh(orbitGeo, orbitMat);
  orbit.rotation.x = 0.55;
  orbit.rotation.z = 0.15;
  root.add(orbit);

  let particles: Points | null = null;
  if (HERO3D.particles[mode] > 0) {
    particles = createParticles(HERO3D.particles[mode]);
    scene.add(particles);
  }

  const ambient = new AmbientLight(HERO_COLORS.cream, 0.28);
  const key = new DirectionalLight(0xffffff, 1.15);
  key.position.set(2.4, 3.2, 4.2);
  const fill = new DirectionalLight(0xa8b4c4, 0.45);
  fill.position.set(-3.2, 0.4, 1.6);
  const rim = new DirectionalLight(HERO_COLORS.gold, 0.55);
  rim.position.set(-1.2, 2.4, -3.2);
  scene.add(ambient, key, fill, rim);

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let scrollT = 0;
  let visible = true;
  let docHidden = false;
  let raf = 0;
  let running = false;
  let disposed = false;
  let readyFired = false;
  const spin = HERO3D.spin[mode];
  const pointerStrength = HERO3D.pointer[mode];

  const shouldRun = () => visible && !docHidden && !disposed;

  const renderFrame = (time: number) => {
    if (!shouldRun()) {
      running = false;
      raf = 0;
      return;
    }

    const t = time * 0.001;
    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;

    root.rotation.y = t * spin + pointer.x * pointerStrength;
    root.rotation.x = pointer.y * pointerStrength * 0.65 + scrollT * 0.25;
    root.position.y = Math.sin(t * 0.35) * 0.04 - scrollT * 0.15;
    orbit.rotation.z = t * spin * 0.35;
    filament.rotation.y = Math.sin(t * 0.5) * 0.08;

    if (particles) {
      particles.rotation.y = t * 0.02;
    }

    renderer.render(scene, camera);

    if (!readyFired) {
      readyFired = true;
      onReady?.();
    }

    raf = requestAnimationFrame(renderFrame);
  };

  const ensureLoop = () => {
    if (disposed || running || !shouldRun()) return;
    running = true;
    raf = requestAnimationFrame(renderFrame);
  };

  const handle: HeroSculptureHandle = {
    setPointer(nx, ny) {
      if (pointerStrength <= 0) return;
      pointer.tx = Math.max(-1, Math.min(1, nx));
      pointer.ty = Math.max(-1, Math.min(1, ny));
    },
    setScroll(t) {
      scrollT = Math.max(0, Math.min(1, t));
    },
    resize(width, height) {
      setSize(width, height);
      if (shouldRun()) {
        renderer.render(scene, camera);
      }
    },
    setVisible(next) {
      visible = next;
      if (next) ensureLoop();
    },
    setDocumentHidden(hidden) {
      docHidden = hidden;
      if (!hidden) ensureLoop();
    },
    dispose() {
      disposed = true;
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      disposeObject(root);
      if (particles) disposeObject(particles);
      renderer.dispose();
      try {
        renderer.forceContextLoss();
      } catch {
        // ignore
      }
    },
  };

  setSize(canvas.clientWidth || 1, canvas.clientHeight || 1);
  ensureLoop();

  return handle;
}
