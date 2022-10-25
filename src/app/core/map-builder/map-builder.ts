import { RoadBuilder } from './workers/road';

export interface SpriteData {
  class: string;
  leftDesface: number;
  topDesface: number;
  zIndex: number;
}
export interface PokemonMap {
  sprites: (SpriteData | null)[];
  allowEntity?: boolean;
  player?: boolean;
  playerMovementActive: {
    active: boolean;
    class: string;
  };
  nextCellAvaible?: boolean;
  node: HTMLElement;
  index?: [number, number];
}

export abstract class MapBuilder extends RoadBuilder {
  protected map: PokemonMap[][] = [];

  mapDimensions: number[];

  constructor(mapDimensions: number[]) {
    super();
    this.mapDimensions = mapDimensions;
    const [xCells, yCells] = mapDimensions;
    this.map = this.buildMap(xCells, yCells);
  }

  buildMap(xCells: number, yCells: number): PokemonMap[][] {
    return new Array<null>(xCells).fill(null).map((_, indexA) =>
      new Array<null>(yCells).fill(null).map((_, indexB) => ({
        sprites: [
          {
            class: 'base-sprite-1',
            leftDesface: 0,
            topDesface: 0,
            zIndex: 1,
          },
        ],
        allowEntity: true,
        node: this.buildCell(),
        playerMovementActive: {
          active: false,
          class: '',
        },
        index: [indexA, indexB],
      }))
    );
  }

  buildCell(): HTMLElement {
    const cellMap = document.createElement('div');
    cellMap.classList.add('game-cell');
    cellMap.style.cssText = 'width: 32px; height: 32px;';
    return cellMap;
  }

  buildRoad(roadIdentifier: number, corners: [number, number][]): void {
    const roadData = this.generateRoadCellSprites(roadIdentifier, corners);
    roadData.forEach(roadData => {
      this.map[roadData.cell[0]][roadData.cell[1]] = {
        sprites: [
          ...this.map[roadData.cell[0]][roadData.cell[1]].sprites,
          {
            class: roadData.sprite,
            leftDesface: 0,
            topDesface: 0,
            zIndex: 3,
          },
        ],
        allowEntity: true,
        nextCellAvaible: false,
        node: this.map[roadData.cell[0]][roadData.cell[1]].node,
        playerMovementActive:
          this.map[roadData.cell[0]][roadData.cell[1]].playerMovementActive,
        index: this.map[roadData.cell[0]][roadData.cell[1]].index,
      };
    });
  }

  buildVerticalGate(
    startPosition: number[],
    leftDesface: number,
    topDesface: number
  ) {
    const [xCells, yCells] = startPosition;
    function sprite(column: string) {
      return [
        {
          class: `gate-1-${column}-up-corner`,
          leftDesface,
          topDesface,
          zIndex: 4,
        },
        {
          class: `gate-1-${column}-center-up`,
          leftDesface,
          topDesface,
          zIndex: 4,
        },
        {
          class: `gate-1-${column}-center-center`,
          leftDesface,
          topDesface,
          zIndex: 4,
        },
        {
          class: `gate-1-${column}-center-down`,
          leftDesface,
          topDesface,
          zIndex: 4,
        },
        {
          class: `gate-1-${column}-down-corner`,
          leftDesface,
          topDesface,
          zIndex: 4,
        },
      ];
    }

    for (let index = 0; index <= 4; index++) {
      this.map[index + xCells][yCells] = {
        sprites: [
          ...this.map[index + xCells][yCells].sprites,
          sprite('left')[index],
        ],
        allowEntity: false,
        nextCellAvaible: false,
        node: this.map[index + xCells][yCells].node,
        playerMovementActive:
          this.map[index + xCells][yCells].playerMovementActive,
        index: this.map[index + xCells][yCells].index,
      };

      this.map[index + xCells][yCells + 1] = {
        sprites: [
          ...this.map[index + xCells][yCells + 1].sprites,
          sprite('mid')[index],
        ],
        allowEntity: false,
        nextCellAvaible: false,
        node: this.map[index + xCells][yCells + 1].node,
        playerMovementActive:
          this.map[index + xCells][yCells + 1].playerMovementActive,
        index: this.map[index + xCells][yCells + 1].index,
      };

      this.map[index + xCells][yCells + 2] = {
        sprites: [
          ...this.map[index + xCells][yCells + 2].sprites,
          sprite('right')[index],
        ],
        allowEntity: false,
        nextCellAvaible: false,
        node: this.map[index + xCells][yCells + 2].node,
        playerMovementActive:
          this.map[index + xCells][yCells + 2].playerMovementActive,
        index: this.map[index + xCells][yCells + 2].index,
      };
    }
  }

  buildTreeColumn(
    treeIdentifier: number,
    columnNumber: number,
    startPosition: number[],
    leftDesface: number,
    topDesface: number,
    allowLeftSideEntity: boolean,
    allowRightSideEntity: boolean,
    leftSideZindex: number,
    rightSideZindex: number
  ): void {
    const [xCells, yCells] = startPosition;
    for (let index = 0; index <= columnNumber; index++) {
      const sprites = [
        index !== 0
          ? {
              class: `tree-${treeIdentifier}-left-down-corner`,
              leftDesface,
              topDesface,
              zIndex: leftSideZindex,
            }
          : null,
        index !== columnNumber
          ? {
              class: `tree-${treeIdentifier}-left-up-corner`,
              leftDesface,
              topDesface,
              zIndex: leftSideZindex,
            }
          : null,
      ];
      this.map[index + xCells][yCells] = {
        sprites: [...this.map[index + xCells][yCells].sprites, ...sprites],
        allowEntity: allowLeftSideEntity,
        nextCellAvaible: false,
        node: this.map[index + xCells][yCells].node,
        playerMovementActive:
          this.map[index + xCells][yCells].playerMovementActive,
        index: this.map[index + xCells][yCells].index,
      };
    }

    for (let index = 0; index <= columnNumber; index++) {
      const sprites = [
        index !== 0
          ? {
              class: `tree-${treeIdentifier}-right-down-corner`,
              leftDesface,
              topDesface,
              zIndex: rightSideZindex,
            }
          : null,
        index !== columnNumber
          ? {
              class: `tree-${treeIdentifier}-right-up-corner`,
              leftDesface,
              topDesface,
              zIndex: rightSideZindex,
            }
          : null,
      ];
      this.map[index + xCells][yCells + 1] = {
        sprites: [...this.map[index + xCells][yCells + 1].sprites, ...sprites],
        allowEntity: allowRightSideEntity,
        nextCellAvaible: false,
        node: this.map[index + xCells][yCells + 1].node,
        playerMovementActive:
          this.map[index + xCells][yCells + 1].playerMovementActive,
        index: this.map[index + xCells][yCells + 1].index,
      };
    }
  }

  // buildCellRow(
  //   rowBuild: {
  //     affectedRow: number;
  //     sprites: string[];
  //     allowEntity: boolean;
  //     nextCellAvaible: boolean;
  //     rowsAffected: number;
  //   }[], map: PokemonMap[][]
  // ): PokemonMap {
  //   let rowsAffected = rowBuild[0].rowsAffected;
  //   const allRowsAffectedAreSimilar = rowBuild.every( row => {
  //     const similarRow = rowsAffected === row.affectedRow;
  //     rowsAffected = rowsAffected;
  //     return similarRow;
  //   })

  //   if(allRowsAffectedAreSimilar) {
  //     for (let index = 0; index <= rowsAffected; index++) {
  //       rowBuild.forEach( row => {

  //     }
  //   }
  // }
}
