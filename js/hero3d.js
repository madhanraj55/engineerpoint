// 3D Three.js & GSAP Hero Animation
(function () {
  function main() {
    const hero = document.getElementById("hero");
    const canvas = document.getElementById("stage");
    if (!hero || !canvas) return;

    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ok = false;
    try {
      ok = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch (_) {}

    if (!ok || !window.THREE || !window.gsap || calm) {
      document.body.classList.add("static");
      return;
    }

    const mobile = innerWidth < 768;
    const N = mobile ? 900 : 2600;
    const R = new THREE.WebGLRenderer({ canvas, antialias: !mobile, alpha: true });
    R.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));

    const S = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(50, 1, 0.1, 100);

    const size = () => {
      R.setSize(innerWidth, innerHeight);
      cam.aspect = innerWidth / innerHeight;
      cam.updateProjectionMatrix();
    };
    size();
    addEventListener("resize", size);

    S.add(new THREE.AmbientLight(0x223355, 0.8));
    const pl = new THREE.PointLight(0x1677ff, 60, 30);
    pl.position.set(-4, 3, 5);
    S.add(pl);

    const pv = new THREE.PointLight(0x7955ff, 40, 30);
    pv.position.set(5, -2, 4);
    S.add(pv);

    const D = new THREE.Group();
    const metal = new THREE.MeshStandardMaterial({ color: 0xaab4c4, metalness: 0.9, roughness: 0.3 });

    const mon = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.6, 0.18), metal);
    mon.position.y = 1.2;
    D.add(mon);

    const sc = document.createElement("canvas");
    sc.width = 512;
    sc.height = 300;
    const sx = sc.getContext("2d");
    const tex = new THREE.CanvasTexture(sc);

    const screen = new THREE.Mesh(new THREE.PlaneGeometry(4.1, 2.3), new THREE.MeshBasicMaterial({ map: tex }));
    screen.position.set(0, 1.2, 0.1);
    D.add(screen);

    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.9), metal);
    stand.position.y = -0.4;
    D.add(stand);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.9, 0.08), metal);
    base.position.y = -0.85;
    D.add(base);

    const kb = new THREE.Mesh(
      new THREE.BoxGeometry(3, 0.1, 1),
      new THREE.MeshStandardMaterial({ color: 0x10141c, metalness: 0.6, roughness: 0.4, emissive: 0x1677ff, emissiveIntensity: 0 })
    );
    kb.position.set(0, -1.1, 1.6);
    D.add(kb);

    const ms = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.5), metal);
    ms.position.set(2.1, -1.1, 1.6);
    D.add(ms);

    S.add(D);

    const code = [
      '<section class="hero">',
      "const future = build();",
      "def transform_business():",
      "SELECT solutions FROM digital_future;",
      "fun buildFuture() { }",
      '<?php echo "Innovation"; ?>',
      ".growth{animation:innovate}",
      "React · Flutter · Java · API"
    ];

    const snips = code.map((t, i) => {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 64;
      const x = c.getContext("2d");
      x.fillStyle = "rgba(5,15,35,.8)";
      x.fillRect(0, 0, 512, 64);
      x.strokeStyle = "#00d9ff";
      x.strokeRect(1, 1, 510, 62);
      x.fillStyle = "#7fe7ff";
      x.font = "26px monospace";
      x.fillText(t, 14, 40);

      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true }));
      sp.scale.set(3, 0.375, 1);
      sp.userData = {
        a: (i / code.length) * Math.PI * 2,
        r: 6 + Math.random() * 3,
        y: (Math.random() - 0.5) * 5
      };
      S.add(sp);
      return sp;
    });

    const tc = document.createElement("canvas");
    tc.width = 1400;
    tc.height = 200;
    const tx = tc.getContext("2d");
    tx.fillStyle = "#fff";
    tx.font = '900 112px "Orbitron", Eurostile, sans-serif';
    tx.textAlign = "center";
    tx.textBaseline = "middle";
    tx.fillText("ENGINEERPOINT", 700, 100);

    const px = tx.getImageData(0, 0, 1400, 200).data;
    const pts = [];
    for (let y = 0; y < 200; y += 2) {
      for (let x = 0; x < 1400; x += 2) {
        if (px[(y * 1400 + x) * 4 + 3] > 128) {
          pts.push([(x - 700) / 75, -(y - 100) / 75]);
        }
      }
    }

    const A = new Float32Array(N * 3);
    const B = new Float32Array(N * 3);
    const P = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);

    for (let i = 0; i < N; i++) {
      const r = 3 + Math.random() * 7;
      const a = Math.random() * 6.283;
      const h = (Math.random() - 0.5) * 7;
      A[i * 3] = Math.cos(a) * r;
      A[i * 3 + 1] = h;
      A[i * 3 + 2] = Math.sin(a) * r;

      const q = pts[(Math.random() * pts.length) | 0] || [0, 0];
      B[i * 3] = q[0];
      B[i * 3 + 1] = q[1] + 0.5;
      B[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

      const c = new THREE.Color().setHSL(0.58 + Math.random() * 0.15, 1, 0.6);
      col.set([c.r, c.g, c.b], i * 3);
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(P, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));

    const cloud = new THREE.Points(
      g,
      new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    S.add(cloud);

    let target = 0;
    let p = 0;

    if (window.ScrollTrigger) {
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "+=550%",
        pin: true,
        scrub: true,
        onUpdate: (s) => (target = s.progress)
      });
    }

    const sm = (a, b, x) => {
      x = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return x * x * (3 - 2 * x);
    };

    const ui = {
      intro: hero.querySelector(".intro"),
      cap: hero.querySelector(".cap"),
      rev: hero.querySelector(".reveal")
    };

    const caps = [
      [0.36, "HTML · CSS · JS · PHP · PYTHON · KOTLIN · SQL"],
      [0.52, "DESIGN"],
      [0.58, "DEVELOPMENT"],
      [0.64, "INTELLIGENCE"],
      [0.70, "INTEGRATION"],
      [0.76, "GROWTH"]
    ];

    let t = 0;
    let vis = true;
    document.addEventListener("visibilitychange", () => (vis = !document.hidden));

    function frame() {
      requestAnimationFrame(frame);
      if (!vis) return;
      t += 0.01;
      p += (target - p) * 0.08;

      const on = sm(0.04, 0.22, p);
      const conv = sm(0.62, 0.88, p);
      const fly = sm(0.2, 0.5, p) * (1 - sm(0.5, 0.58, p));

      cam.position.set(Math.sin(t * 0.3) * 0.3, 0.4, 9 - 5 * sm(0, 0.2, p) + 9 * sm(0.55, 0.85, p));
      cam.lookAt(0, 0.4, 0);

      D.position.z = -6 * sm(0.62, 0.9, p);
      D.position.y = -0.3 * conv;
      D.rotation.y = Math.sin(t * 0.4) * 0.05;

      kb.material.emissiveIntensity = on * 1.2;

      sx.fillStyle = "#04101f";
      sx.fillRect(0, 0, 512, 300);
      sx.fillStyle = `rgba(0,160,255,${0.15 + 0.5 * on})`;
      sx.fillRect(0, 0, 512, 300 * on);

      sx.font = "16px monospace";
      sx.fillStyle = "#9fe9ff";
      for (let i = 0; i < 12; i++) {
        sx.fillText(code[(i + ((t * 3) | 0)) % 8], 14, 24 + i * 22);
      }
      tex.needsUpdate = true;

      snips.forEach((s) => {
        const k = fly;
        const a = s.userData.a + t * 0.6 * (1 - k) + k * 6;
        const r = s.userData.r * (1 - k);
        s.position.set(Math.cos(a) * r, s.userData.y * (1 - k) + 1.2 * k, Math.sin(a) * r * 0.6);
        s.material.opacity = sm(0.14, 0.24, p) * (1 - sm(0.46, 0.52, p));
      });

      const ar = g.attributes.position.array;
      const e = conv;
      const sp = sm(0.5, 0.62, p);
      const cs = Math.cos(t * 0.3);
      const sn = Math.sin(t * 0.3);
      const m = 1 - sp * 0.8;

      for (let i = 0; i < N; i++) {
        const i3 = i * 3;
        const ax = (A[i3] * cs - A[i3 + 2] * sn) * m;
        const az = (A[i3] * sn + A[i3 + 2] * cs) * m;
        const ay = A[i3 + 1] * m + Math.sin(t * 0.5 + i) * 0.1;
        ar[i3] = ax + (B[i3] - ax) * e;
        ar[i3 + 1] = ay + (B[i3 + 1] - ay) * e;
        ar[i3 + 2] = az + (B[i3 + 2] - az) * e;
      }
      g.attributes.position.needsUpdate = true;

      if (ui.intro) {
        ui.intro.style.opacity = 1 - sm(0.03, 0.1, p);
        ui.intro.style.pointerEvents = p > 0.08 ? "none" : "auto";
      }

      let c = "";
      caps.forEach((x) => {
        if (p >= x[0]) c = x[1];
      });
      if (ui.cap) {
        ui.cap.textContent = p > 0.34 && p < 0.8 ? c : "";
      }

      if (ui.rev) {
        ui.rev.style.opacity = sm(0.86, 0.94, p);
      }

      R.render(S, cam);
    }

    frame();
  }

  let d = 0;
  const run = function () {
    if (!d) {
      d = 1;
      main();
    }
  };

  if (document.fonts && document.fonts.load) {
    document.fonts.load('900 112px "Orbitron"').then(run, run);
    setTimeout(run, 2500);
  } else {
    run();
  }
})();
