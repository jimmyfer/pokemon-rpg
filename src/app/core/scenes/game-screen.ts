import { Scene } from '../scenes/base-scenes/game-scene';

export class GameScreen implements Scene {
  private wrappedElement: HTMLElement;
  scene: HTMLElement = document.createElement('div');

  constructor(gameContainer: HTMLElement) {
    this.wrappedElement = gameContainer;
  }

  startScene(): void {
    this.scene.classList.add('game-screen');
    this.wrappedElement.appendChild(this.scene);
  }

  addScene(scene: HTMLElement): void {
    this.scene.appendChild(scene);
  }

  removeScene(): void {
    this.wrappedElement.removeChild(this.scene);
  }
}
