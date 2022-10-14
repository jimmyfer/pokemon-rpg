export interface Scene {
  startScene(scene: HTMLElement): void;
  addScene(scene: HTMLElement): void;
}

export abstract class GameScene implements Scene {
  scene: HTMLElement;
  screen: Scene;

  constructor(screen: Scene, scene: HTMLElement) {
    this.screen = screen;
    this.scene = scene;
  }

  startScene(scene: HTMLElement): void {
    this.screen.addScene(scene);
  }

  addScene(scene: HTMLElement) {
    this.scene.appendChild(scene);
  }

  removeScene(): void {
    this.scene.remove();
  }
}
