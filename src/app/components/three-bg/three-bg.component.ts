import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-bg',
  standalone: true,
  imports: [],
  template: `<div #canvasContainer id="three-canvas-container"></div>`,
  styleUrls: ['./three-bg.component.css']
})
export class ThreeBgComponent implements OnInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private mesh!: THREE.Mesh;

  ngOnInit(): void {
    this.initThreeJs();
    this.animate();
  }

  private initThreeJs() {
    const container = this.canvasContainer.nativeElement;

    this.scene = new THREE.Scene();
    // Add subtle fog to blend into the background
    this.scene.fog = new THREE.FogExp2(0x000000, 0.001);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.z = 1000;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);

    // Create a dynamic, flowing wireframe torus knot
    const geometry = new THREE.TorusKnotGeometry(400, 100, 256, 32, 2, 3);

    // Create an energetic material using the Orangish-Red theme
    const material = new THREE.MeshBasicMaterial({
      color: 0xff4500, // Orange Red
      wireframe: true,
      transparent: true,
      opacity: 0.15, // Keep it subtle so it doesn't overpower the UI
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    if (this.mesh) {
      // Gentle, abstract rotation
      this.mesh.rotation.x += 0.001;
      this.mesh.rotation.y += 0.0015;
      this.mesh.rotation.z += 0.0005;

      // Subtle scaling effect to simulate breathing/morphing
      const scale = 1 + Math.sin(Date.now() * 0.001) * 0.05;
      this.mesh.scale.set(scale, scale, scale);
    }

    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
