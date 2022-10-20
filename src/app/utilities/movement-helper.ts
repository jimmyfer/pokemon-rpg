export enum PlayerMovement {
  UP = 'up',
  LEFT = 'left',
  RIGHT = 'right',
  DOWN = 'down',
}

export class MovementSubject {
  private movementFns: ((movement: PlayerMovement) => void)[];

  constructor() {
    this.movementFns = [];
  }

  subscribe(fn: (movement: PlayerMovement) => void): void {
    this.movementFns.push(fn);
  }

  newPlayerMove(movement: PlayerMovement) {
    this.movementFns.forEach(movementFn => movementFn(movement));
  }
}
