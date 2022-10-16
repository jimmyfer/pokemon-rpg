import { PokeMapService } from '../../services/map.service';
import { MapBuilder, PokemonMap } from '../../utilities/map-builder';

export class RouteOne extends MapBuilder {
  mapDimensions = [20, 30];
  protected map = this.buildMap(20, 30);

  mapService: PokeMapService;

  constructor() {
    super();
    this.mapService = PokeMapService.getInstance();

    this.mapService.playerPositionX = 9;
    this.mapService.playerPositionY = 14;
    this.mapService.playerBasePosition = 'player-front';

    for (let index = 0; index <= 29; index++) {
      this.map[0][index] = {
        sprites: ['sprite-1', 'sprite-2'],
        allowEntity: false,
        nextCellAvaible: false,
        node: this.map[0][index].node,
        playerMovementActive: this.map[0][index].playerMovementActive,
      };
      this.map[1][index] = {
        sprites: ['sprite-1', 'sprite-3'],
        allowEntity: false,
        nextCellAvaible: false,
        node: this.map[1][index].node,
        playerMovementActive: this.map[0][index].playerMovementActive,
      };
    }

    for (let index = 0; index <= 29; index++) {
      this.map[18][index] = {
        sprites: ['sprite-1', 'sprite-2'],
        allowEntity: false,
        nextCellAvaible: false,
        node: this.map[18][index].node,
        playerMovementActive: this.map[0][index].playerMovementActive,
      };
      this.map[19][index] = {
        sprites: ['sprite-1', 'sprite-3'],
        allowEntity: false,
        nextCellAvaible: false,
        node: this.map[19][index].node,
        playerMovementActive: this.map[0][index].playerMovementActive,
      };

      for (let index = 2; index <= 16; ) {
        this.map[index][0] = {
          sprites: ['sprite-1', 'sprite-2'],
          allowEntity: false,
          nextCellAvaible: false,
          node: this.map[index][0].node,
          playerMovementActive: this.map[0][index].playerMovementActive,
        };
        this.map[index][1] = {
          sprites: ['sprite-1', 'sprite-2'],
          allowEntity: false,
          nextCellAvaible: false,
          node: this.map[index][1].node,
          playerMovementActive: this.map[index][1].playerMovementActive,
        };
        index = index + 2;
      }
      for (let index = 3; index <= 17; ) {
        this.map[index][0] = {
          sprites: ['sprite-1', 'sprite-3'],
          allowEntity: false,
          nextCellAvaible: false,
          node: this.map[index][0].node,
          playerMovementActive: this.map[index][0].playerMovementActive,
        };
        this.map[index][1] = {
          sprites: ['sprite-1', 'sprite-3'],
          allowEntity: false,
          nextCellAvaible: false,
          node: this.map[index][1].node,
          playerMovementActive: this.map[index][1].playerMovementActive,
        };
        index = index + 2;
      }

      for (let index = 2; index <= 16; ) {
        this.map[index][28] = {
          sprites: ['sprite-1', 'sprite-2'],
          allowEntity: false,
          nextCellAvaible: false,
          node: this.map[index][28].node,
          playerMovementActive: this.map[index][28].playerMovementActive,
        };
        this.map[index][29] = {
          sprites: ['sprite-1', 'sprite-2'],
          allowEntity: false,
          nextCellAvaible: false,
          node: this.map[index][29].node,
          playerMovementActive: this.map[index][29].playerMovementActive,
        };
        index = index + 2;
      }
      for (let index = 3; index <= 17; ) {
        this.map[index][28] = {
          sprites: ['sprite-1', 'sprite-3'],
          allowEntity: false,
          nextCellAvaible: false,
          node: this.map[index][28].node,
          playerMovementActive: this.map[index][28].playerMovementActive,
        };
        this.map[index][29] = {
          sprites: ['sprite-1', 'sprite-3'],
          allowEntity: false,
          nextCellAvaible: false,
          node: this.map[index][29].node,
          playerMovementActive: this.map[index][29].playerMovementActive,
        };
        index = index + 2;
      }

      for (let index = 0; index <= 25; index++) {
        this.map[10][index + 2] = {
          sprites: ['sprite-1', 'sprite-4'],
          allowEntity: true,
          nextCellAvaible: false,
          node: this.map[10][index + 2].node,
          playerMovementActive: this.map[10][index + 2].playerMovementActive,
        };
        this.map[11][index + 2] = {
          sprites: ['sprite-1', 'sprite-4'],
          allowEntity: true,
          nextCellAvaible: false,
          node: this.map[11][index + 2].node,
          playerMovementActive: this.map[11][index + 2].playerMovementActive,
        };
        this.map[12][index + 2] = {
          sprites: ['sprite-1', 'sprite-4'],
          allowEntity: true,
          nextCellAvaible: false,
          node: this.map[12][index + 2].node,
          playerMovementActive: this.map[12][index + 2].playerMovementActive,
        };
        this.map[13][index + 2] = {
          sprites: ['sprite-1', 'sprite-4'],
          allowEntity: true,
          nextCellAvaible: false,
          node: this.map[13][index + 2].node,
          playerMovementActive: this.map[13][index + 2].playerMovementActive,
        };
        this.map[14][index + 2] = {
          sprites: ['sprite-1', 'sprite-4'],
          allowEntity: true,
          nextCellAvaible: false,
          node: this.map[14][index + 2].node,
          playerMovementActive: this.map[14][index + 2].playerMovementActive,
        };
        this.map[15][index + 2] = {
          sprites: ['sprite-1', 'sprite-4'],
          allowEntity: true,
          nextCellAvaible: false,
          node: this.map[15][index + 2].node,
          playerMovementActive: this.map[15][index + 2].playerMovementActive,
        };
        this.map[16][index + 2] = {
          sprites: ['sprite-1', 'sprite-4'],
          allowEntity: true,
          nextCellAvaible: false,
          node: this.map[16][index + 2].node,
          playerMovementActive: this.map[16][index + 2].playerMovementActive,
        };
        this.map[17][index + 2] = {
          sprites: ['sprite-1', 'sprite-4'],
          allowEntity: true,
          nextCellAvaible: false,
          node: this.map[17][index + 2].node,
          playerMovementActive: this.map[17][index + 2].playerMovementActive,
        };
      }

      const playerPositionX = this.mapService.playerPositionX;
      const playerPositionY = this.mapService.playerPositionY;
      const playerBasePosition = this.mapService.playerBasePosition;

      this.map[playerPositionX][playerPositionY].player = true;
      this.map[playerPositionX][playerPositionY].playerMovementActive = {
        active: false,
        class: playerBasePosition,
      };
    }
  }

  getMap(): PokemonMap[][] {
    return this.map;
  }
}
