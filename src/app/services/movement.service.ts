import { PokeMapService } from './map.service';

export class MovementService {
  private static instance: MovementService;

  screen: HTMLElement | null = null;

  mapService: PokeMapService;

  playerMoving = false;

  constructor() {
    this.mapService = PokeMapService.getInstance();
  }

  public static getInstance(): MovementService {
    if (!this.instance) {
      this.instance = new MovementService();
    }

    return this.instance;
  }

  watchScreenKeys(screen: HTMLElement): void {
    this.screen = screen;
    screen.addEventListener(
      'keydown',
      e => {
        this.checkMovement(e);
      },
      true
    );
  }

  private checkMovement(key: KeyboardEvent): void {
    if (key.code === 'KeyW' || key.code === 'ArrowUp') {
      this.movePlayerUpCell();
    }

    if (key.code === 'KeyS' || key.code === 'ArrowDown') {
      this.movePlayerDownCell();
    }

    if (key.code === 'KeyD' || key.code === 'ArrowRight') {
      this.movePlayerRightCell();
    }

    if (key.code === 'KeyA' || key.code === 'ArrowLeft') {
      this.movePlayerLeftCell();
    }
  }

  movePlayerUpCell(): void {
    const playerPositionX = this.mapService.playerPositionX;
    const playerPositionY = this.mapService.playerPositionY;
    if (this.mapService.playerBasePosition !== 'player-up') {
      this.mapService.playerBasePosition = 'player-up';
      return;
    }
    if (
      this.mapService.activeMap[playerPositionX - 1][playerPositionY]
        .allowEntity === true &&
      !this.playerMoving
    ) {
      const oldPlayerPosition =
        this.mapService.activeMap[playerPositionX][playerPositionY];
      this.playerMoving = true;
      oldPlayerPosition.player = false;
      oldPlayerPosition.playerMovementActive.class = '';
      this.mapService.playerPositionX--;
      const newPlayerPosition =
        this.mapService.activeMap[this.mapService.playerPositionX][
          playerPositionY
        ];
      newPlayerPosition.player = true;
      newPlayerPosition.playerMovementActive.class = 'player-up';
      this.mapService.refreshPlayerPosition(
        oldPlayerPosition,
        newPlayerPosition
      );
      this.playerMoving = false;
    }
  }

  movePlayerDownCell(): void {
    const playerPositionX = this.mapService.playerPositionX;
    const playerPositionY = this.mapService.playerPositionY;
    if (this.mapService.playerBasePosition !== 'player-front') {
      this.mapService.playerBasePosition = 'player-front';
      return;
    }
    if (
      this.mapService.activeMap[playerPositionX + 1][playerPositionY]
        .allowEntity === true &&
      !this.playerMoving
    ) {
      const oldPlayerPosition =
        this.mapService.activeMap[playerPositionX][playerPositionY];
      this.playerMoving = true;
      oldPlayerPosition.player = false;
      oldPlayerPosition.playerMovementActive.class = '';
      this.mapService.playerPositionX++;
      const newPlayerPosition =
        this.mapService.activeMap[this.mapService.playerPositionX][
          playerPositionY
        ];
      newPlayerPosition.player = true;
      newPlayerPosition.playerMovementActive.class = 'player-front';
      this.mapService.refreshPlayerPosition(
        oldPlayerPosition,
        newPlayerPosition
      );
      this.playerMoving = false;
    }
  }

  movePlayerLeftCell(): void {
    const playerPositionX = this.mapService.playerPositionX;
    const playerPositionY = this.mapService.playerPositionY;
    if (this.mapService.playerBasePosition !== 'player-left') {
      this.mapService.playerBasePosition = 'player-left';
      return;
    }
    if (
      this.mapService.activeMap[playerPositionX][playerPositionY - 1]
        .allowEntity === true &&
      !this.playerMoving
    ) {
      const oldPlayerPosition =
        this.mapService.activeMap[playerPositionX][playerPositionY];
      this.playerMoving = true;
      oldPlayerPosition.player = false;
      oldPlayerPosition.playerMovementActive.class = '';
      this.mapService.playerPositionY--;
      const newPlayerPosition =
        this.mapService.activeMap[playerPositionX][
          this.mapService.playerPositionY
        ];
      newPlayerPosition.player = true;
      newPlayerPosition.playerMovementActive.class = 'player-left';
      this.mapService.refreshPlayerPosition(
        oldPlayerPosition,
        newPlayerPosition
      );
      this.playerMoving = false;
    }
  }

  movePlayerRightCell(): void {
    const playerPositionX = this.mapService.playerPositionX;
    const playerPositionY = this.mapService.playerPositionY;
    if (this.mapService.playerBasePosition !== 'player-right') {
      this.mapService.playerBasePosition = 'player-right';
      return;
    }
    if (
      this.mapService.activeMap[playerPositionX][playerPositionY + 1]
        .allowEntity === true &&
      !this.playerMoving
    ) {
      const oldPlayerPosition =
        this.mapService.activeMap[playerPositionX][playerPositionY];
      this.playerMoving = true;
      oldPlayerPosition.player = false;
      oldPlayerPosition.playerMovementActive.class = '';
      this.mapService.playerPositionY++;
      const newPlayerPosition =
        this.mapService.activeMap[playerPositionX][
          this.mapService.playerPositionY
        ];
      newPlayerPosition.player = true;
      newPlayerPosition.playerMovementActive.class = 'player-right';
      this.mapService.refreshPlayerPosition(
        oldPlayerPosition,
        newPlayerPosition
      );
      this.playerMoving = false;
    }
  }
}
