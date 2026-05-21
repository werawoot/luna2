"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function FlowlyHeroScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.8, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.AmbientLight(0x9fc6ff, 1.35);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(3.8, 5.4, 5.2);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x2f7dff, 35, 18);
    rimLight.position.set(-4.5, 1.8, 4);
    scene.add(rimLight);

    const panelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x10243c,
      metalness: 0.55,
      roughness: 0.28,
      clearcoat: 0.8,
      clearcoatRoughness: 0.18,
      emissive: 0x071426,
      emissiveIntensity: 0.4
    });

    const accentMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2f7dff,
      metalness: 0.28,
      roughness: 0.2,
      emissive: 0x185ee8,
      emissiveIntensity: 1.1
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x91c3ff,
      transparent: true,
      opacity: 0.18,
      metalness: 0,
      roughness: 0.08,
      transmission: 0.25,
      clearcoat: 1
    });

    const neonLineMaterial = new THREE.MeshBasicMaterial({
      color: 0x5ea0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.72
    });

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.18, 2), neonLineMaterial);
    core.position.set(1.05, 0.54, 0.68);
    core.rotation.set(0.38, -0.25, 0.12);
    group.add(core);

    const dashboard = new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.9, 0.18), panelMaterial);
    dashboard.position.set(0.45, 0.18, 0);
    dashboard.rotation.set(-0.18, -0.32, 0.05);
    group.add(dashboard);

    const frame = new THREE.Mesh(new THREE.BoxGeometry(5.12, 3.2, 0.12), glassMaterial);
    frame.position.copy(dashboard.position);
    frame.position.z -= 0.16;
    frame.rotation.copy(dashboard.rotation);
    group.add(frame);

    const bars: THREE.Mesh[] = [];
    [0.42, 0.7, 0.56, 1.05, 0.84, 1.28, 1.48].forEach((height, index) => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.22, height, 0.16), accentMaterial);
      bar.position.set(-1.55 + index * 0.42, -0.85 + height / 2, 0.28);
      bar.rotation.copy(dashboard.rotation);
      group.add(bar);
      bars.push(bar);
    });

    const statCards: THREE.Mesh[] = [];
    [-1.35, 0, 1.35].forEach((x) => {
      const card = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.48, 0.14), glassMaterial);
      card.position.set(x + 0.45, 1.1, 0.32);
      card.rotation.copy(dashboard.rotation);
      group.add(card);
      statCards.push(card);
    });

    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.95, 0.012, 12, 120),
      new THREE.MeshBasicMaterial({ color: 0x5ea0ff, transparent: true, opacity: 0.58 })
    );
    ring.rotation.set(1.15, 0.08, -0.22);
    orbitGroup.add(ring);

    const verticalRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.72, 0.01, 10, 96),
      new THREE.MeshBasicMaterial({ color: 0x9bc6ff, transparent: true, opacity: 0.48 })
    );
    verticalRing.rotation.set(0.1, 1.18, 0.28);
    verticalRing.position.set(0.7, 0.42, 0.3);
    orbitGroup.add(verticalRing);

    const nodes: THREE.Mesh[] = [];
    for (let index = 0; index < 18; index += 1) {
      const radius = index % 3 === 0 ? 0.07 : 0.045;
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 24, 24),
        index % 3 === 0 ? accentMaterial : glassMaterial
      );
      const angle = (index / 18) * Math.PI * 2;
      node.position.set(Math.cos(angle) * 2.95, Math.sin(angle) * 1.06, 0.52 + Math.sin(angle * 2) * 0.22);
      orbitGroup.add(node);
      nodes.push(node);
    }

    const gridMaterial = new THREE.LineBasicMaterial({ color: 0x5ea0ff, transparent: true, opacity: 0.16 });
    const grid = new THREE.GridHelper(9, 18, 0x5ea0ff, 0x5ea0ff);
    grid.material = gridMaterial;
    grid.position.set(0, -2.05, -1.25);
    grid.rotation.x = 0.04;
    scene.add(grid);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(120 * 3);
    for (let index = 0; index < 120; index += 1) {
      particlePositions[index * 3] = (Math.random() - 0.5) * 9;
      particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 5;
      particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({ color: 0x9bc6ff, size: 0.026, transparent: true, opacity: 0.55 })
    );
    scene.add(particles);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      const compact = width < 720;
      const desktop = width >= 1024;
      const wide = width >= 1440;
      group.scale.setScalar(compact ? 0.82 : desktop ? (wide ? 1.2 : 1.08) : 0.95);
      group.position.set(compact ? -0.78 : desktop ? (wide ? 1.82 : 1.48) : 0.82, compact ? 1.62 : desktop ? 0.02 : 0.6, 0);
      orbitGroup.scale.setScalar(compact ? 0.88 : desktop ? (wide ? 1.22 : 1.08) : 1);
      orbitGroup.position.set(compact ? -0.78 : desktop ? (wide ? 1.62 : 1.34) : 0.7, compact ? 1.54 : desktop ? 0 : 0.52, 0);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    let animationId = 0;
    const startedAt = performance.now();

    const animate = () => {
      const time = (performance.now() - startedAt) / 1000;
      group.rotation.y = Math.sin(time * 0.35) * 0.08;
      group.rotation.x = Math.sin(time * 0.22) * 0.025;
      core.rotation.x = time * 0.22;
      core.rotation.y = time * 0.34;
      orbitGroup.rotation.z = time * 0.08;
      verticalRing.rotation.z = time * -0.12;
      particles.rotation.y = time * 0.025;
      bars.forEach((bar, index) => {
        bar.scale.y = 0.92 + Math.sin(time * 1.5 + index * 0.55) * 0.08;
      });
      nodes.forEach((node, index) => {
        node.scale.setScalar(0.92 + Math.sin(time * 1.8 + index) * 0.15);
      });
      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      renderer.dispose();
      particlesGeometry.dispose();
      dashboard.geometry.dispose();
      frame.geometry.dispose();
      ring.geometry.dispose();
      verticalRing.geometry.dispose();
      core.geometry.dispose();
      grid.geometry.dispose();
      [...bars, ...statCards, ...nodes].forEach((mesh) => mesh.geometry.dispose());
      panelMaterial.dispose();
      accentMaterial.dispose();
      glassMaterial.dispose();
      neonLineMaterial.dispose();
      gridMaterial.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
