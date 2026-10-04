// ============================================
// THREE.JS — Hero 3D scene
// 3D floating shopping basket + products
// ============================================
(function(){
  const canvas = document.getElementById('threeCanvas');
  if(!canvas || typeof THREE === 'undefined') return;

  const wrap = canvas.parentElement;
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(38, wrap.clientWidth/wrap.clientHeight, 0.1, 100);
  camera.position.set(0, 0.6, 5.2);

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.65));
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(4, 6, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 1; key.shadow.camera.far = 20;
  key.shadow.camera.left = -5; key.shadow.camera.right = 5;
  key.shadow.camera.top = 5; key.shadow.camera.bottom = -5;
  scene.add(key);

  const fill = new THREE.DirectionalLight(0x9db8ff, 0.5);
  fill.position.set(-5, 2, -3);
  scene.add(fill);

  // Group
  const group = new THREE.Group();
  scene.add(group);

  // --- Basket (open wireframe-style basket) ---
  const basketGroup = new THREE.Group();
  const basketMat = new THREE.MeshStandardMaterial({color:0x0b1220, roughness:.55, metalness:.35});
  const basketMatWire = new THREE.MeshStandardMaterial({color:0x8aa9d6, roughness:.4, metalness:.7, wireframe:true});

  const base = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.08, 1.3), basketMat);
  base.position.y = -0.5;
  basketGroup.add(base);

  // Wire basket walls
  for(let i=0;i<12;i++){
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1, 0.008, 6, 60, Math.PI), basketMatWire);
    ring.rotation.x = Math.PI/2;
    ring.scale.set(0.95 - i*0.015, 0.65, 0.65);
    ring.position.y = -0.5 + i*0.08;
    basketGroup.add(ring);
  }

  // Handle
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.025, 10, 40, Math.PI), basketMat);
  handle.rotation.z = Math.PI;
  handle.rotation.x = Math.PI/2;
  handle.position.y = 0.68;
  basketGroup.add(handle);

  basketGroup.position.y = 0.05;
  basketGroup.scale.setScalar(1.05);
  group.add(basketGroup);

  // --- Floating products ---
  const products = [];
  const colors = [0xe26a7a, 0xe08a3a, 0x2f9e6a, 0x3b5a8f, 0xc9a24a, 0x8aa9d6];

  const geos = [
    new THREE.SphereGeometry(0.18, 24, 24),
    new THREE.BoxGeometry(0.28, 0.28, 0.28),
    new THREE.CylinderGeometry(0.14, 0.14, 0.3, 24),
    new THREE.IcosahedronGeometry(0.2, 0),
    new THREE.TorusGeometry(0.16, 0.05, 12, 24),
    new THREE.OctahedronGeometry(0.2),
  ];

  for(let i=0;i<14;i++){
    const geo = geos[i % geos.length];
    const mat = new THREE.MeshStandardMaterial({
      color: colors[i % colors.length],
      roughness: 0.35,
      metalness: 0.35,
    });
    const m = new THREE.Mesh(geo, mat);
    const angle = (i / 14) * Math.PI * 2;
    const radius = 1.6 + Math.random() * 0.6;
    m.position.set(Math.cos(angle) * radius, Math.sin(angle) * 0.9 + 0.3, Math.sin(angle) * radius * 0.5);
    m.castShadow = true;
    m.userData = {
      baseY: m.position.y,
      speed: 0.4 + Math.random() * 0.5,
      spin: (Math.random() - 0.5) * 0.6,
      phase: Math.random() * Math.PI * 2,
    };
    products.push(m);
    group.add(m);
  }

  // --- Ground shadow ---
  const shadowPlane = new THREE.Mesh(
    new THREE.CircleGeometry(2.4, 48),
    new THREE.ShadowMaterial({opacity: 0.15})
  );
  shadowPlane.rotation.x = -Math.PI/2;
  shadowPlane.position.y = -0.9;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  // --- Interaction ---
  let mx = 0, my = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth) * 2 - 1;
    my = (e.clientY / window.innerHeight) * 2 - 1;
  });

  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  const clock = new THREE.Clock();

  const animate = () => {
    const t = clock.getElapsedTime();
    tx += (mx * 0.5 - tx) * 0.05;
    ty += (my * 0.3 - ty) * 0.05;

    group.rotation.y = t * 0.15 + tx * 0.6;
    group.rotation.x = Math.sin(t * 0.3) * 0.06 + ty * 0.3;
    group.position.y = Math.sin(t * 0.6) * 0.05 - scrollY * 0.0006;

    basketGroup.rotation.y = t * 0.4;

    products.forEach(p => {
      p.userData.phase += 0.015;
      p.position.y = p.userData.baseY + Math.sin(p.userData.phase * p.userData.speed * 3) * 0.18;
      p.rotation.x += 0.008 * p.userData.spin;
      p.rotation.y += 0.012 * p.userData.spin;
      p.rotation.z += 0.006 * p.userData.spin;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();

  const onResize = () => {
    if(!wrap.clientWidth) return;
    camera.aspect = wrap.clientWidth / wrap.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  };
  window.addEventListener('resize', onResize);
})();