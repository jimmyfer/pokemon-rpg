export class RoadBuilder {
  generateRoadCellSprites(
    roadIdentifier: number,
    corners: [number, number][]
  ): { cell: [number, number]; sprite: string }[] {
    let cells: { cell: [number, number]; sprite: string }[] = [];
    let cornerCellsWithSprite: { cell: [number, number]; sprite: string[] }[] =
      [];
    corners.forEach(corner => {
      const cordX = corner[0];
      const cordY = corner[1];
      cornerCellsWithSprite.push(this.getCorners(cordX, cordY, corners));
    });
    const sidesCellsWithSprite = this.getSides(cornerCellsWithSprite);
    const cornersData = this.buildSprites(
      cornerCellsWithSprite,
      roadIdentifier,
      'corners'
    );
    console.log(cornersData);
    const sidesData = this.buildSprites(
      sidesCellsWithSprite,
      roadIdentifier,
      'sides'
    );
    console.log(sidesData);
    if (cornersData && sidesData) {
      cells.push(...cornersData, ...sidesData);
    }
    return cells;
  }

  private buildSprites(
    cellsWithSprite: { cell: [number, number]; sprite: string[] }[],
    roadIdentifier: number,
    sides: string
  ): { cell: [number, number]; sprite: string }[] | null {
    if (sides === 'corners') {
      return cellsWithSprite.map(cellWithSprite => {
        const sprites = [...new Set(cellWithSprite.sprite)].join('-');
        let sprite: string = 'floor-1-up-right-corner';
        console.log(sprites);
        switch (sprites) {
          case 'down-right':
            sprite = `floor-${roadIdentifier}-up-left-corner`;
            break;
          case 'right-up':
            sprite = `floor-${roadIdentifier}-down-left-corner`;
            break;
          case 'down-left':
            sprite = `floor-${roadIdentifier}-up-right-corner`;
            break;
          case 'left-up':
            sprite = `floor-${roadIdentifier}-down-right-corner`;
            break;
        }
        return { cell: cellWithSprite.cell, sprite: sprite };
      });
    }
    if (sides === 'sides') {
      return cellsWithSprite.map(cellWithSprite => {
        let sprite: string = cellWithSprite.sprite[0];
        sprite = `floor-${roadIdentifier}-${sprite}-side`;
        return { cell: cellWithSprite.cell, sprite: sprite };
      });
    }
    return null;
  }

  private getCorners(
    cordX: number,
    cordY: number,
    corners: [number, number][]
  ): { cell: [number, number]; sprite: string[] } {
    let sides: string[] = [];
    for (const iterator of corners) {
      const dataX = iterator[0];
      const dataY = iterator[1];
      if (cordX === dataX && cordY === dataY) {
        continue;
      }

      if (cordX === dataX && cordY < dataY) {
        sides.push('right');
      }
      if (cordX === dataX && cordY > dataY) {
        sides.push('left');
      }
      if (cordX < dataX && cordY === dataY) {
        sides.push('down');
      }
      if (cordX > dataX && cordY === dataY) {
        sides.push('up');
      }
    }
    sides.sort();
    return { cell: [cordX, cordY], sprite: sides };
  }

  private getSides(
    corners: { cell: [number, number]; sprite: string[] }[]
  ): { cell: [number, number]; sprite: string[] }[] {
    const alreadyIterated: [string, string][] = [];
    const sides: { cell: [number, number]; sprite: string[] }[] = [];
    corners.forEach(corner => {
      corners.forEach(dataConer => {
        const findedSpriteSide = corner.sprite.find(spriteData =>
          dataConer.sprite.some(sprite => spriteData === sprite)
        );
        const mainCornerCell = JSON.stringify([corner.cell[0], corner.cell[1]]);
        const interateCornerCell = JSON.stringify([
          dataConer.cell[0],
          dataConer.cell[1],
        ]);
        if (mainCornerCell !== interateCornerCell && findedSpriteSide) {
          const iterated = alreadyIterated.some(iteratedCells => {
            return (
              (iteratedCells[0] === mainCornerCell ||
                iteratedCells[0] === interateCornerCell) &&
              (iteratedCells[1] === mainCornerCell ||
                iteratedCells[1] === interateCornerCell)
            );
          });
          alreadyIterated.push([mainCornerCell, interateCornerCell]);
          if (!iterated) {
            if (corner.cell[0] === dataConer.cell[0]) {
              const maxNumber = Math.max(corner.cell[1], dataConer.cell[1]);
              const minNumber = Math.min(corner.cell[1], dataConer.cell[1]);

              for (let index = 1; index < maxNumber - minNumber; index++) {
                sides.push({
                  cell: [corner.cell[0], minNumber + index],
                  sprite: [findedSpriteSide],
                });
              }
            }
            if (corner.cell[1] === dataConer.cell[1]) {
              const maxNumber = Math.max(corner.cell[0], dataConer.cell[0]);
              const minNumber = Math.min(corner.cell[0], dataConer.cell[0]);

              for (let index = 1; index < maxNumber - minNumber; index++) {
                sides.push({
                  cell: [minNumber + index, corner.cell[1]],
                  sprite: [findedSpriteSide],
                });
              }
            }
          }
        }
      });
    });
    return sides;
  }
}
