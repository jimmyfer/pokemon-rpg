import { GameScene, Scene } from '../base-scenes/game-scene';

export class StartScene extends GameScene {
  scene;
  screen: Scene;

  constructor(screen: Scene) {
    const scene = document.createElement('div');
    super(screen, scene);
    this.scene = scene;
    this.screen = screen;
  }

  startScene(): void {
    this.scene.classList.add('start-scene');
    this.screen.addScene(this.scene);
  }
}
