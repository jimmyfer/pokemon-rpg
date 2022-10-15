import { MapBuilder, PokemonMap } from '../../utilities/map-builder';

export class RouteOne extends MapBuilder {
  mapDimensions = [30, 20];
  protected map = this.buildMap(30, 20);

  constructor() {
    super();
    this.map[this.playerPositionX][this.playerPositionY].player = true;
    for (let index = 0; index <= 29; index++) {
      this.map[index][0] = {
        sprites: ['sprite-1', 'sprite-2'],
        allowEntity: false,
        nextCellAvaible: false,
      };
      this.map[index][1] = {
        sprites: ['sprite-1', 'sprite-3'],
        allowEntity: false,
        nextCellAvaible: false,
      };
    }

    for (let index = 0; index <= 29; index++) {
      this.map[index][18] = {
        sprites: ['sprite-1', 'sprite-2'],
        allowEntity: false,
        nextCellAvaible: false,
      };
      this.map[index][19] = {
        sprites: ['sprite-1', 'sprite-3'],
        allowEntity: false,
        nextCellAvaible: false,
      };
    }

    for (let index = 0; index <= 15; index++) {
      this.map[0][index + 2] = {
        sprites: ['sprite-1', 'sprite-2'],
        allowEntity: false,
        nextCellAvaible: false,
      };
      this.map[0][index + 3] = {
        sprites: ['sprite-1', 'sprite-3'],
        allowEntity: false,
        nextCellAvaible: false,
      };
    }

    for (let index = 0; index <= 15; index++) {
      this.map[1][index + 2] = {
        sprites: ['sprite-1', 'sprite-2'],
        allowEntity: false,
        nextCellAvaible: false,
      };
      this.map[1][index + 3] = {
        sprites: ['sprite-1', 'sprite-3'],
        allowEntity: false,
        nextCellAvaible: false,
      };
    }

    for (let index = 0; index <= 15; index++) {
      this.map[28][index + 2] = {
        sprites: ['sprite-1', 'sprite-2'],
        allowEntity: false,
        nextCellAvaible: false,
      };
      this.map[28][index + 3] = {
        sprites: ['sprite-1', 'sprite-3'],
        allowEntity: false,
        nextCellAvaible: false,
      };
    }

    for (let index = 0; index <= 15; index++) {
      this.map[29][index + 2] = {
        sprites: ['sprite-1', 'sprite-2'],
        allowEntity: false,
        nextCellAvaible: false,
      };
      this.map[29][index + 3] = {
        sprites: ['sprite-1', 'sprite-3'],
        allowEntity: false,
        nextCellAvaible: false,
      };
    }

    for (let index = 2; index <= 27; index++) {
      this.map[index][11] = {
        sprites: ['sprite-1', 'sprite-4'],
        allowEntity: true,
        nextCellAvaible: false,
      };
      this.map[index][12] = {
        sprites: ['sprite-1', 'sprite-4'],
        allowEntity: true,
        nextCellAvaible: false,
      };
      this.map[index][13] = {
        sprites: ['sprite-1', 'sprite-4'],
        allowEntity: true,
        nextCellAvaible: false,
      };
      this.map[index][14] = {
        sprites: ['sprite-1', 'sprite-4'],
        allowEntity: true,
        nextCellAvaible: false,
      };
      this.map[index][15] = {
        sprites: ['sprite-1', 'sprite-4'],
        allowEntity: true,
        nextCellAvaible: false,
      };
      this.map[index][16] = {
        sprites: ['sprite-1', 'sprite-4'],
        allowEntity: true,
        nextCellAvaible: false,
      };
      this.map[index][17] = {
        sprites: ['sprite-1', 'sprite-4'],
        allowEntity: true,
        nextCellAvaible: false,
      };
    }
  }

  getMap(): PokemonMap[][] {
    return this.map;
  }
}
