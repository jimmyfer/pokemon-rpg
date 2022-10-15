import { RouteOne } from '../../../maps/routes/route-one';
import { PokeMapService } from '../../../services/map.service';
import { GameScene, Scene } from '../base-scenes/game-scene';

export class GamePlayScene extends GameScene {
  scene: HTMLElement;
  screen: Scene;

  mapService: PokeMapService;

  constructor(screen: Scene) {
    const scene = document.createElement('div');
    super(screen, scene);
    this.scene = scene;
    this.screen = screen;
    this.mapService = new PokeMapService();
  }

  async startScene(): Promise<void> {
    this.scene.classList.add('gameplay-scene');
    const routeMap = new RouteOne();
    this.mapService.activeMap = routeMap.getMap();
    this.mapService.mapDimensions = routeMap.mapDimensions;
    await this.generateMap();
    this.screen.addScene(this.scene);
  }

  async generateMap(): Promise<void> {
    const gameMap = document.createElement('div');
    gameMap.classList.add('game-map');
    const mapWidth = this.mapService.mapDimensions[0] * 32;
    const mapHeigth = this.mapService.mapDimensions[1] * 32;
    gameMap.style.cssText = `width: ${mapWidth}px; height: ${mapHeigth}px;`;
    const cellContainer = document.createElement('div');
    cellContainer.classList.add('cell-container');
    gameMap.appendChild(cellContainer);
    this.scene.appendChild(gameMap);
    this.mapService.activeMap.forEach(map => {
      map.forEach(map => {
        const cellMap = document.createElement('div');
        cellMap.classList.add('game-cell');
        map.sprites.forEach(sprite => cellMap.classList.add(sprite));
        cellMap.style.cssText =
          'width: 32px; height: 32px; background-color: red;';
        cellContainer.appendChild(cellMap);
      });
    });
  }
}
