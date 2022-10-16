export interface PokemonMap {
  sprites: string[];
  allowEntity?: boolean;
  player?: boolean;
  playerMovementActive: {
    active: boolean;
    class: string;
  };
  nextCellAvaible?: boolean;
  node: HTMLElement;
}

export abstract class MapBuilder {
  protected map: PokemonMap[][] = [];

  buildMap(xCells: number, yCells: number): PokemonMap[][] {
    return new Array<null>(xCells).fill(null).map(() =>
      new Array<null>(yCells).fill(null).map(() => ({
        sprites: ['sprite-1'],
        allowEntity: true,
        node: this.buildCell(),
        playerMovementActive: {
          active: false,
          class: '',
        },
      }))
    );
  }

  buildCell(): HTMLElement {
    const cellMap = document.createElement('div');
    cellMap.classList.add('game-cell');
    cellMap.style.cssText = 'width: 32px; height: 32px;';
    return cellMap;
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
