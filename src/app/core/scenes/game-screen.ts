import { MovementService } from '../../services/movement.service';
import { Scene } from '../scenes/base-scenes/game-scene';

export class GameScreen implements Scene {
  private wrappedElement: HTMLElement;
  scene: HTMLElement = document.createElement('div');

  movementService: MovementService;

  constructor(gameContainer: HTMLElement) {
    this.wrappedElement = gameContainer;
    this.movementService = MovementService.getInstance();
  }

  startScene(): void {
    this.scene.classList.add('game-screen');
    this.scene.tabIndex = 0;
    this.wrappedElement.appendChild(this.scene);
    this.movementService.watchScreenKeys(this.scene);
  }

  addScene(scene: HTMLElement): void {
    this.scene.appendChild(scene);
  }

  removeScene(): void {
    this.wrappedElement.removeChild(this.scene);
  }
}
