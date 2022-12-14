import { GameScene, Scene } from '../../base-scenes/game-scene';

export class BattleScene extends GameScene {
  scene: HTMLElement;
  screen: Scene;

  constructor(screen: Scene) {
    const scene = document.createElement('div');
    super(screen, scene);
    this.scene = scene;
    this.screen = screen;
  }

  startScene(): void {
    this.scene.classList.add('gameplay-battle-scene');
    this.screen.addScene(this.scene);
  }
}
