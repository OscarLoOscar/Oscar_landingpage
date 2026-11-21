import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";
import { RoundedBoxGeometry } from "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/environments/RoomEnvironment.js";
import Matter from "https://cdn.jsdelivr.net/npm/matter-js@0.20.0/+esm";

export function mountHero(root) {
  let disposed = false;
  let animationFrame = 0;
  let observer;
  const listeners = [];

  function listen(target, type, handler) {
    target.addEventListener(type, handler);
    listeners.push(() => target.removeEventListener(type, handler));
  }

  const hero = root;
  const stage = root.querySelector("#gun-stage");
  const shootButton = root.querySelector("#shoot");
  const gunButton = root.querySelector("#gun-hit");
  const clearButton = root.querySelector("#clear");
  const playground = root.querySelector("#playground");
  const countLabel = root.querySelector("#count");
  const status = root.querySelector("#status");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const SKILLS = [
    ["Java", "BACKEND"], ["Spring Boot", "BACKEND"], ["Python", "BACKEND"],
    ["Django", "BACKEND"], ["Microservices", "ARCHITECTURE"], ["REST APIs", "BACKEND"],
    ["PyQt5", "DESKTOP"], ["JavaScript", "FRONTEND"], ["React.js", "FRONTEND"],
    ["SQL", "DATA"], ["PostgreSQL", "DATABASE"], ["MySQL", "DATABASE"], ["Redis", "DATABASE"],
    ["AWS", "EC2 · SES"], ["Docker", "DEVOPS"], ["Git", "VERSION CONTROL"],
    ["GitHub", "COLLABORATION"], ["Git Flow", "WORKFLOW"], ["JUnit 5", "TESTING"],
    ["Mockito", "TESTING"], ["Hamcrest", "TESTING"], ["K6", "PERFORMANCE"],
    ["SonarQube", "CODE QUALITY"], ["reCAPTCHA", "ENTERPRISE"],
    ["Codex", "AI DEVELOPMENT"], ["Cursor", "AI DEVELOPMENT"], ["ChatGPT", "AI"],
    ["Gemini", "AI"], ["Copilot", "AI"], ["Grok Bot", "AUTOMATION"],
    ["Cursor Rules", "AI WORKFLOW"], ["Skills", "REUSABLE WORKFLOWS"], ["MCP", "INTEGRATION"],
    ["Obsidian", "KNOWLEDGE"], ["Task Breakdown", "AGENT WORKFLOW"],
    ["Prompt Design", "AGENT WORKFLOW"], ["AI Research", "RESEARCH"],
    ["Source Checking", "VERIFICATION"], ["Code Review", "QUALITY"],
    ["Vibe Coding", "TRAINING"], ["AI Workshops", "CORPORATE TRAINING"],
    ["AI Literacy", "TRAINING"], ["Live Demos", "TEACHING"],
    ["Learning Materials", "COURSE DESIGN"],
    ["Prompt Atlas", "PROJECT · PROMPT LIBRARY"],
    ["Gemini Notebook", "PROJECT · PROMPT STUDIO"],
    ["Cashline", "PROJECT · EXPENSE TRACKER"]
  ];
  const PALETTE = [
    ["#ff4f98", "#21151b"], ["#ff7c31", "#29180c"], ["#ffe23d", "#25200a"],
    ["#c5f04a", "#202811"], ["#74c7fc", "#152333"], ["#ac8bf5", "#251b3b"],
    ["#202020", "#ffffff"], ["#ffffff", "#1c1c1c"]
  ];
  const OPENING_SKILLS = [0, 2, 24, 32, 39, 8];
  const cards = [];
  let emitted = 0;
  let skillIndex = 0;
  let shotTimer = 0;
  let activeInput = null;
  let openingTimers = [];
  let recoil = 0;
  let renderer;
  let engine;
  let scene;
  let camera;
  let gun;
  let boundaries = [];
  let drag = null;
  let width = 0;
  let height = 0;
  let lastTime = 0;
  let accumulator = 0;
  const muzzlePoint = new THREE.Vector3(-2.25, .18, 0);
  const gunMeshes = [];
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function material(color, roughness = .23) {
    return new THREE.MeshPhysicalMaterial({
      color, roughness, metalness: .08, clearcoat: 1, clearcoatRoughness: .12,
      envMapIntensity: .7
    });
  }

  function roundedBox(size, position, surface, radius = .12) {
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(...size, 4, radius), surface);
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    gun.add(mesh);
    gunMeshes.push(mesh);
    return mesh;
  }

  function printedPanel(text, subtext, position, size) {
    const canvas = document.createElement("canvas");
    canvas.width = 1536;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = '800 228px "Barlow Condensed", sans-serif';
    ctx.fillText(text, 768, 290);
    if (subtext) {
      ctx.font = '500 34px "IBM Plex Mono", monospace';
      ctx.fillText(subtext, 768, 383);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(...size),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false })
    );
    mesh.position.set(...position);
    gun.add(mesh);
  }

  async function makeGun() {
    await document.fonts.load('800 30px "Barlow Condensed"');
    if (disposed) return;
    const orange = material("#f23a00");
    const orangeDark = material("#e74d0c", .3);
    const dark = material("#29292c", .38);
    const silver = material("#c1c2c3", .2);
    const cream = material("#fff8ea", .55);
    gun = new THREE.Group();
    scene.add(gun);

    roundedBox([3.85, 1.5, 1.5], [-.05, .2, 0], orange, .18);
    roundedBox([.28, 1.28, 1.37], [-2.04, .2, 0], orangeDark, .1);
    roundedBox([.08, .42, 1.05], [-2.21, .32, 0], dark, .035);
    roundedBox([.1, .07, 1.08], [-2.27, .09, 0], silver, .025);
    roundedBox([.13, .065, 1.04], [-2.26, .54, 0], silver, .025);
    roundedBox([1.85, .24, 1.24], [.45, 1.03, 0], orangeDark, .08);
    roundedBox([1.65, .12, 1.03], [.45, 1.18, 0], dark, .04);
    for (let i = 0; i < 5; i++) {
      const paper = roundedBox([1.44, .025, .83], [.4, 1.27 + i * .035, 0], cream, .012);
      paper.rotation.y = .015 * (i - 2);
    }
    const grip = roundedBox([.93, 1.82, 1.07], [1.13, -1.2, 0], orange, .16);
    grip.rotation.z = -.2;
    const base = roundedBox([1.17, .35, 1.25], [1.31, -2.02, 0], orangeDark, .1);
    base.rotation.z = -.05;
    roundedBox([.12, .75, .15], [.34, -.91, .66], orangeDark, .055);
    roundedBox([.86, .13, .15], [.7, -1.27, .66], orangeDark, .05);
    roundedBox([.17, .45, .22], [.53, -.65, .1], dark, .05).rotation.z = -.2;

    for (let i = 0; i < 3; i++) {
      const vent = roundedBox([.35, .045, .025], [1.36, .48 - i * .12, .755], orangeDark, .01);
      vent.rotation.z = -.08;
    }
    for (const x of [-1.72, 1.6]) {
      const screw = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, .02, 20), silver);
      screw.rotation.x = Math.PI / 2;
      screw.position.set(x, -.29, .76);
      gun.add(screw);
    }
    printedPanel("PORTFOLIO", "OSCAR LO / IDEAS IN MOTION", [-.3, .21, .762], [2.85, .94]);
    printedPanel("OSCAR", "", [1.1, -1.3, .58], [.63, .24]);
    gun.rotation.set(.02, -.12, .06);
  }

  function createScene() {
    renderer = new THREE.WebGLRenderer({
      canvas: root.querySelector("#gun-canvas"), alpha: true, antialias: true
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = .9;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(34, 1, .1, 60);
    camera.position.set(-4.6, 3.4, 9);
    camera.lookAt(0, -.3, 0);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, .04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();

    scene.add(new THREE.HemisphereLight(0xffffff, 0xa7a0a0, .9));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(-3, 8, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5 });
    key.shadow.normalBias = .025;
    key.shadow.radius = 4;
    key.shadow.blurSamples = 8;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffead5, 1.3);
    fill.position.set(4, 2, -3);
    scene.add(fill);
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 24),
      new THREE.ShadowMaterial({ color: 0x59412e, opacity: .085 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.6;
    floor.receiveShadow = true;
    scene.add(floor);
  }

  function resize() {
    const previousWidth = width;
    const previousHeight = height;
    width = hero.clientWidth;
    height = hero.clientHeight;
    renderer.setSize(stage.clientWidth, stage.clientHeight, false);
    camera.aspect = stage.clientWidth / stage.clientHeight;
    camera.updateProjectionMatrix();
    const { Bodies, Composite, Body } = Matter;
    Composite.remove(engine.world, boundaries);
    const floorY = height - 66;
    boundaries = [
      Bodies.rectangle(width / 2, floorY + 35, width * 3, 70, { isStatic: true, friction: .8 }),
      Bodies.rectangle(-45, height / 2, 90, height * 4, { isStatic: true }),
      Bodies.rectangle(width + 45, height / 2, 90, height * 4, { isStatic: true }),
      Bodies.rectangle(width / 2, -180, width * 3, 90, { isStatic: true })
    ];
    Composite.add(engine.world, boundaries);
    if (previousWidth && (previousWidth !== width || previousHeight !== height)) {
      for (const card of cards) {
        Body.setPosition(card.body, {
          x: Math.max(card.w / 2, Math.min(width - card.w / 2, card.body.position.x * width / previousWidth)),
          y: Math.min(floorY - card.h, card.body.position.y * height / previousHeight)
        });
      }
    }
  }

  function muzzleScreenPosition() {
    gun.updateMatrixWorld(true);
    const projected = gun.localToWorld(muzzlePoint.clone()).project(camera);
    const stageRect = stage.getBoundingClientRect();
    const heroRect = hero.getBoundingClientRect();
    return {
      x: stageRect.left - heroRect.left + (projected.x + 1) / 2 * stageRect.width,
      y: stageRect.top - heroRect.top + (1 - projected.y) / 2 * stageRect.height
    };
  }

  function fire(skill = SKILLS[skillIndex++ % SKILLS.length]) {
    if (document.querySelector("dialog[open]")) return;
    const { Bodies, Body, Composite } = Matter;
    // Bound simultaneous DOM and physics bodies during long presses.
    if (cards.length >= 80) removeCard(cards[0]);
    const mobile = width < 600;
    const [color, ink] = PALETTE[emitted % PALETTE.length];
    const element = document.createElement("div");
    element.className = "skill-card";
    element.setAttribute("aria-label", skill[0] + "，" + skill[1] + "，可拖曳");
    element.style.cssText = `--card-color:${color};--card-ink:${ink};visibility:hidden`;
    const title = document.createElement("strong");
    title.textContent = skill[0];
    title.style.fontSize = mobile ? "22px" : "26px";
    const category = document.createElement("small");
    const label = document.createElement("span");
    label.textContent = skill[1];
    const arrow = document.createElement("span");
    arrow.textContent = "↗";
    arrow.setAttribute("aria-hidden", "true");
    category.append(label, arrow);
    element.append(title, category);
    playground.append(element);

    // The physics body uses the same measured dimensions as the rendered text.
    const cardWidth = Math.ceil(element.offsetWidth);
    const cardHeight = Math.ceil(element.offsetHeight);
    element.style.width = `${cardWidth}px`;
    element.style.height = `${cardHeight}px`;
    element.style.visibility = "";
    const origin = muzzleScreenPosition();
    const body = Bodies.rectangle(origin.x, origin.y, cardWidth, cardHeight, {
      chamfer: { radius: 9 }, restitution: .38, friction: .55, frictionStatic: .9,
      frictionAir: .012, density: .002, label: skill[0]
    });
    Body.setAngle(body, -.18 + Math.random() * .36);
    Body.setVelocity(body, { x: -(mobile ? 6 : 12) - Math.random() * 5, y: -5 - Math.random() * 5 });
    Body.setAngularVelocity(body, (Math.random() - .5) * .16);
    const card = { body, element, w: cardWidth, h: cardHeight };
    cards.push(card);
    Composite.add(engine.world, body);
    element.addEventListener("pointerdown", event => startDrag(event, card));
    emitted++;
    countLabel.textContent = String(emitted);
    recoil = 1;
  }

  function removeCard(card) {
    if (drag?.card === card) releaseDrag();
    Matter.Composite.remove(engine.world, card.body);
    card.element.remove();
    cards.splice(cards.indexOf(card), 1);
  }

  function stopOpening() {
    openingTimers.forEach(clearTimeout);
    openingTimers = [];
  }

  function startFiring(source) {
    if (activeInput || document.querySelector("dialog[open]")) return;
    stopOpening();
    activeInput = source;
    fire();
    shotTimer = setInterval(() => fire(), 180);
    gunButton.classList.add("is-firing");
  }

  function stopFiring() {
    clearInterval(shotTimer);
    shotTimer = 0;
    activeInput = null;
    gunButton.classList.remove("is-firing");
  }

  function clearCards() {
    stopOpening();
    stopFiring();
    releaseDrag();
    [...cards].forEach(removeCard);
    emitted = 0;
    countLabel.textContent = "0";
  }

  function pointInHero(event) {
    const rect = hero.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function startDrag(event, card) {
    if (event.button !== 0 || drag) return;
    event.preventDefault();
    stopFiring();
    const point = pointInHero(event);
    const constraint = Matter.Constraint.create({
      pointA: point, bodyB: card.body,
      pointB: Matter.Vector.sub(point, card.body.position),
      stiffness: .18, damping: .12, length: 0
    });
    Matter.Composite.add(engine.world, constraint);
    Matter.Sleeping.set(card.body, false);
    card.element.setPointerCapture(event.pointerId);
    card.element.classList.add("is-dragging");
    drag = { card, constraint, pointerId: event.pointerId, samples: [{ ...point, time: performance.now() }] };
  }

  function moveDrag(event) {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const point = pointInHero(event);
    drag.constraint.pointA = point;
    const now = performance.now();
    drag.samples.push({ ...point, time: now });
    drag.samples = drag.samples.filter(sample => now - sample.time < 110);
  }

  function releaseDrag(event) {
    if (!drag || (event && drag.pointerId !== event.pointerId)) return;
    const { card, constraint, samples, pointerId } = drag;
    Matter.Composite.remove(engine.world, constraint);
    card.element.classList.remove("is-dragging");
    if (card.element.hasPointerCapture(pointerId)) card.element.releasePointerCapture(pointerId);
    const first = samples[0];
    const last = samples.at(-1);
    const elapsed = last.time - first.time;
    if (elapsed > 0 && performance.now() - last.time < 130) {
      Matter.Body.setVelocity(card.body, {
        x: THREE.MathUtils.clamp((last.x - first.x) / elapsed * 16.667, -28, 28),
        y: THREE.MathUtils.clamp((last.y - first.y) / elapsed * 16.667, -28, 28)
      });
    }
    drag = null;
  }

  function bindControls() {
    for (const button of [shootButton, gunButton]) {
      listen(button, "pointerdown", event => {
        if (event.button !== 0) return;
        event.preventDefault();
        button.setPointerCapture(event.pointerId);
        startFiring("pointer");
      });
      listen(button, "pointerup", stopFiring);
      listen(button, "pointercancel", stopFiring);
      listen(button, "lostpointercapture", stopFiring);
      listen(button, "click", event => {
        if (event.detail === 0) fire();
      });
    }
    listen(gunButton, "pointermove", event => {
      const rect = stage.getBoundingClientRect();
      pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      gunButton.style.cursor = raycaster.intersectObjects(gunMeshes).length ? "pointer" : "default";
    });
    listen(clearButton, "click", clearCards);
    listen(document, "pointermove", moveDrag);
    listen(document, "pointerup", releaseDrag);
    listen(document, "pointercancel", releaseDrag);
    listen(document, "keydown", event => {
      if (event.code !== "Space" || hero.getBoundingClientRect().bottom <= 0 || document.querySelector("dialog[open]")) return;
      if (event.target.closest("a,input,textarea,select,[contenteditable],#clear,[data-dialog],.dialog-close")) return;
      event.preventDefault();
      startFiring("keyboard");
    });
    listen(document, "keyup", event => {
      if (event.code === "Space" && activeInput === "keyboard") {
        event.preventDefault();
        stopFiring();
      }
    });
    listen(window, "blur", () => { stopFiring(); releaseDrag(); });
    listen(document, "visibilitychange", () => {
      if (document.hidden) { stopOpening(); stopFiring(); releaseDrag(); }
      lastTime = 0;
    });

  }

  function animate(time) {
    animationFrame = requestAnimationFrame(animate);
    if (document.hidden || hero.getBoundingClientRect().bottom <= 0) {
      lastTime = 0;
      return;
    }
    const elapsed = lastTime ? Math.min(time - lastTime, 50) : 16.667;
    lastTime = time;
    accumulator += elapsed;
    while (accumulator >= 1000 / 60) {
      Matter.Engine.update(engine, 1000 / 60);
      accumulator -= 1000 / 60;
    }
    recoil *= Math.exp(-elapsed * .014);
    const idle = reducedMotion.matches ? 0 : 1;
    gun.position.y = Math.sin(time * .0012) * .065 * idle;
    gun.position.x = recoil * .11;
    gun.rotation.z = .06 + Math.sin(time * .0008) * .035 * idle - recoil * .045;
    gun.rotation.y = -.12 + Math.sin(time * .00055) * .06 * idle;
    for (const card of cards) {
      const { x, y } = card.body.position;
      const blur = reducedMotion.matches ? 0 : Math.min(2, Math.max(0, card.body.speed - 11) * .1);
      card.element.style.transform = `translate3d(${x - card.w / 2}px,${y - card.h / 2}px,0) rotate(${card.body.angle}rad)`;
      card.element.style.filter = blur > .15 ? `blur(${blur.toFixed(1)}px)` : "";
    }
    renderer.render(scene, camera);
  }

  for (const trigger of root.querySelectorAll("[data-dialog]")) {
    const dialog = root.querySelector("#" + trigger.dataset.dialog);
    listen(trigger, "click", () => {
      stopOpening();
      stopFiring();
      dialog.showModal();
    });
    listen(dialog.querySelector(".dialog-close"), "click", () => dialog.close());
    listen(dialog, "click", event => { if (event.target === dialog) dialog.close(); });
  }

  async function init() {
    try {
      createScene();
      await Promise.all([
        makeGun(),
        document.fonts.load('800 26px "DM Sans"'),
        document.fonts.load('400 8px "IBM Plex Mono"')
      ]);
      if (disposed) return;
      engine = Matter.Engine.create({ enableSleeping: true, positionIterations: 8, velocityIterations: 8 });
      engine.gravity.y = 1.15;
      resize();
      observer = new ResizeObserver(resize);
      observer.observe(hero);
      bindControls();
      shootButton.disabled = false;
      gunButton.disabled = false;
      status.textContent = "";
      hero.dataset.ready = "true";
      animationFrame = requestAnimationFrame(animate);
      if (!reducedMotion.matches) {
        openingTimers = OPENING_SKILLS.map((index, i) => setTimeout(() => fire(SKILLS[index]), 650 + i * 180));
      }
    } catch (error) {
      if (disposed) return;
      status.textContent = "作品槍未能啟動。請確認網絡同瀏覽器 WebGL 支援，再重新整理。";
      console.error(error);
    }
  }
  init();

  return () => {
    disposed = true;
    stopOpening();
    stopFiring();
    if (engine) clearCards();
    cancelAnimationFrame(animationFrame);
    observer?.disconnect();
    listeners.forEach(remove => remove());
    scene?.traverse(object => {
      object.geometry?.dispose();
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach(surface => {
        surface?.map?.dispose();
        surface?.dispose();
      });
    });
    scene?.environment?.dispose();
    renderer?.dispose();
  };
}
