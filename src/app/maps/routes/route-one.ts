import { PokeMapService } from '../../services/map.service';
import { MapBuilder, PokemonMap } from '../../core/map-builder/map-builder';

export class RouteOne extends MapBuilder {
  mapService: PokeMapService;

  constructor() {
    super([72, 19]);
    this.mapService = PokeMapService.getInstance();

    this.mapService.playerPositionX = 60;
    this.mapService.playerPositionY = 10;
    this.mapService.playerBasePosition = 'player-down';

    // firsts tree
    this.buildTreeColumn(1, 3, [0, 0], -10, 0, false, false, 2, 2);

    this.buildTreeColumn(1, 6, [3, 0], -10, 0, false, false, 2, 4);

    // seconds tree
    this.buildTreeColumn(1, 5, [0, 2], -27, 0, false, false, 3, 2);

    this.buildTreeColumn(1, 1, [5, 2], -27, 0, false, true, 3, 2);

    // thirds tree
    this.buildTreeColumn(1, 2, [0, 4], -44, 0, false, false, 1, 1);

    // fourds tree
    this.buildTreeColumn(1, 3, [2, 4], -44, 0, false, false, 4, 4);

    // 5
    this.buildTreeColumn(1, 5, [0, 6], -64, 0, true, true, 2, 2);

    console.log(this.map);

    // Vertical gate
    this.buildVerticalGate([0, 6], 0, -22);

    this.buildTreeColumn(1, 4, [0, 9], 0, 0, false, false, 3, 3);

    this.buildTreeColumn(1, 4, [0, 11], -17, 0, false, false, 2, 2);

    this.buildTreeColumn(1, 4, [0, 13], -35, 0, false, false, 3, 3);

    this.buildTreeColumn(1, 4, [0, 14], -22, 0, false, false, 4, 4);

    this.buildTreeColumn(1, 4, [0, 15], -10, 0, false, false, 5, 5);

    this.buildTreeColumn(1, 10, [0, 16], 0, 0, false, false, 6, 6);

    this.buildTreeColumn(1, 10, [0, 17], 10, 0, false, false, 7, 7);

    this.buildTreeColumn(1, 3, [7, 4], 10, 0, false, false, 7, 7);

    this.buildRoad(1, [
      [3, 6],
      [9, 6],
      [3, 8],
      [9, 8],
      [7, 14],
      [9, 14],
      [7, 8],
    ]);
  }

  getMap(): PokemonMap[][] {
    return this.map;
  }
}
