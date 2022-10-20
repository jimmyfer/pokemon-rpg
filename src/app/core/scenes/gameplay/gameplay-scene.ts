import { PlayerMovement } from '../../../utilities/movement-helper';
import { RouteOne } from '../../../maps/routes/route-one';
import { PokeMapService } from '../../../services/map.service';
import { GameScene, Scene } from '../base-scenes/game-scene';

export class GamePlayScene extends GameScene {
  scene: HTMLElement;
  screen: Scene;

  absoluteLeft = -224;
  absoluteTop = -64;

  mapService: PokeMapService;

  constructor(screen: Scene) {
    const scene = document.createElement('div');
    super(screen, scene);
    this.scene = scene;
    this.screen = screen;
    this.mapService = PokeMapService.getInstance();

    this.mapService.movementListener.subscribe((movement: PlayerMovement) => {
      this.refreshGameScreen(movement);
    });
  }

  async startScene(): Promise<void> {
    this.scene.classList.add('gameplay-scene');
    const routeMap = new RouteOne();
    console.log(this.mapService.activeMap[0]);
    this.mapService.activeMap = routeMap.getMap();
    this.mapService.mapDimensions = routeMap.mapDimensions;

    console.log(this.mapService.activeMap);
    await this.generateMap();
    this.screen.addScene(this.scene);
  }

  async generateMap(): Promise<void> {
    const gameMap = document.createElement('div');
    gameMap.classList.add('game-map');
    const mapWidth = this.mapService.mapDimensions[1] * 32;
    const mapHeigth = this.mapService.mapDimensions[0] * 32;
    gameMap.style.cssText = `width: ${mapWidth}px; height: ${mapHeigth}px;left: ${this.absoluteLeft}px;top: ${this.absoluteTop}px;`;
    const cellContainer = document.createElement('div');
    cellContainer.classList.add('cell-container');
    gameMap.appendChild(cellContainer);
    this.scene.appendChild(gameMap);
    this.mapService.activeMap.forEach(map => {
      map.forEach(map => {
        map.sprites.forEach(sprite => {
          const cellSprite = document.createElement('div');
          cellSprite.classList.add(sprite);
          map.node.appendChild(cellSprite);
        });
        if (map.player && map.playerMovementActive) {
          const playerSprite = document.createElement('div');
          playerSprite.classList.add('player');
          playerSprite.classList.add('player-base');
          playerSprite.classList.add(map.playerMovementActive.class);
          map.node.appendChild(playerSprite);
        }
        cellContainer.appendChild(map.node);
      });
    });
  }

  refreshGameScreen(movement: PlayerMovement) {
    if (movement === PlayerMovement.RIGHT) {
      this.absoluteLeft = this.absoluteLeft - 32;
      (
        this.scene.firstChild as HTMLDivElement
      ).style.left = `${this.absoluteLeft}px`;
    }
    if (movement === PlayerMovement.LEFT) {
      this.absoluteLeft = this.absoluteLeft + 32;
      (
        this.scene.firstChild as HTMLDivElement
      ).style.left = `${this.absoluteLeft}px`;
    }
    if (movement === PlayerMovement.UP) {
      this.absoluteTop = this.absoluteTop + 32;
      (
        this.scene.firstChild as HTMLDivElement
      ).style.top = `${this.absoluteTop}px`;
    }
    if (movement === PlayerMovement.DOWN) {
      this.absoluteTop = this.absoluteTop - 32;
      (
        this.scene.firstChild as HTMLDivElement
      ).style.top = `${this.absoluteTop}px`;
    }
  }
}
