import { PokemonMap } from '../core/map-builder/map-builder';
import { PlayerMovement } from '../utilities/movement-helper';
import { PokeMapService } from './map.service';

export class MovementService {
  private static instance: MovementService;

  screen: HTMLElement | null = null;

  mapService: PokeMapService;

  playerMoving = false;

  walkVelocity = 60;

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

  async movePlayerUpCell(): Promise<void> {
    const playerPositionX = this.mapService.playerPositionX;
    const playerPositionY = this.mapService.playerPositionY;
    const playerPosition =
      this.mapService.activeMap[playerPositionX][playerPositionY];
    if (playerPosition.playerMovementActive.class !== 'player-up') {
      playerPosition.playerMovementActive.class = 'player-up';
      this.mapService.refreshPlayerCell(playerPosition);
      return;
    }
    await this.checkNextCellIsAvailable(
      playerPositionX,
      playerPositionY,
      PlayerMovement.UP
    );
  }

  async movePlayerDownCell(): Promise<void> {
    const playerPositionX = this.mapService.playerPositionX;
    const playerPositionY = this.mapService.playerPositionY;
    const playerPosition =
      this.mapService.activeMap[playerPositionX][playerPositionY];
    if (playerPosition.playerMovementActive.class !== 'player-down') {
      playerPosition.playerMovementActive.class = 'player-down';
      this.mapService.refreshPlayerCell(playerPosition);
      return;
    }
    await this.checkNextCellIsAvailable(
      playerPositionX,
      playerPositionY,
      PlayerMovement.DOWN
    );
  }

  async movePlayerLeftCell(): Promise<void> {
    const playerPositionX = this.mapService.playerPositionX;
    const playerPositionY = this.mapService.playerPositionY;
    const playerPosition =
      this.mapService.activeMap[playerPositionX][playerPositionY];
    if (playerPosition.playerMovementActive.class !== 'player-left') {
      playerPosition.playerMovementActive.class = 'player-left';
      this.mapService.refreshPlayerCell(playerPosition);
      return;
    }
    await this.checkNextCellIsAvailable(
      playerPositionX,
      playerPositionY,
      PlayerMovement.LEFT
    );
  }

  async movePlayerRightCell(): Promise<void> {
    const playerPositionX = this.mapService.playerPositionX;
    const playerPositionY = this.mapService.playerPositionY;
    const playerPosition =
      this.mapService.activeMap[playerPositionX][playerPositionY];
    if (playerPosition.playerMovementActive.class !== 'player-right') {
      playerPosition.playerMovementActive.class = 'player-right';
      this.mapService.refreshPlayerCell(playerPosition);
      return;
    }
    await this.checkNextCellIsAvailable(
      playerPositionX,
      playerPositionY,
      PlayerMovement.RIGHT
    );
  }

  async checkNextCellIsAvailable(
    playerPositionX: number,
    playerPositionY: number,
    movementDirection: PlayerMovement
  ): Promise<void> {
    const playerPosition =
      this.mapService.activeMap[playerPositionX][playerPositionY];
    let newPlayerPosition;
    if (
      movementDirection === PlayerMovement.LEFT &&
      this.mapService.activeMap[playerPositionX][playerPositionY - 1]
        .allowEntity &&
      !this.playerMoving
    ) {
      this.mapService.playerPositionY--;
      newPlayerPosition =
        this.mapService.activeMap[playerPositionX][
          this.mapService.playerPositionY
        ];
      try {
        const borderMap =
          this.mapService.activeMap[playerPositionX][
            this.mapService.playerPositionY - 8
          ];
        const opositeBorderMap =
          this.mapService.activeMap[playerPositionX][
            this.mapService.playerPositionY + 9
          ];
        this.checkIfScreenShouldNotMove(
          movementDirection,
          borderMap,
          opositeBorderMap
        );
      } catch {}
    }

    if (
      movementDirection === PlayerMovement.RIGHT &&
      this.mapService.activeMap[playerPositionX][playerPositionY + 1]
        .allowEntity &&
      !this.playerMoving
    ) {
      this.mapService.playerPositionY++;
      newPlayerPosition =
        this.mapService.activeMap[playerPositionX][
          this.mapService.playerPositionY
        ];
      try {
        const borderMap =
          this.mapService.activeMap[playerPositionX][
            this.mapService.playerPositionY + 8
          ];
        const opositeBorderMap =
          this.mapService.activeMap[playerPositionX][
            this.mapService.playerPositionY - 9
          ];
        this.checkIfScreenShouldNotMove(
          movementDirection,
          borderMap,
          opositeBorderMap
        );
      } catch {}
    }

    if (
      movementDirection === PlayerMovement.UP &&
      this.mapService.activeMap[playerPositionX - 1][playerPositionY]
        .allowEntity &&
      !this.playerMoving
    ) {
      this.mapService.playerPositionX--;
      newPlayerPosition =
        this.mapService.activeMap[this.mapService.playerPositionX][
          playerPositionY
        ];

      try {
        const borderMap =
          this.mapService.activeMap[this.mapService.playerPositionX - 8][
            playerPositionY
          ];
        const opositeBorderMap =
          this.mapService.activeMap[this.mapService.playerPositionX + 9][
            playerPositionY
          ];
        this.checkIfScreenShouldNotMove(
          movementDirection,
          borderMap,
          opositeBorderMap
        );
      } catch {}
    }

    if (
      movementDirection === PlayerMovement.DOWN &&
      this.mapService.activeMap[playerPositionX + 1][playerPositionY]
        .allowEntity &&
      !this.playerMoving
    ) {
      this.mapService.playerPositionX++;
      newPlayerPosition =
        this.mapService.activeMap[this.mapService.playerPositionX][
          playerPositionY
        ];
      try {
        const borderMap =
          this.mapService.activeMap[this.mapService.playerPositionX + 8][
            playerPositionY
          ];
        const opositeBorderMap =
          this.mapService.activeMap[this.mapService.playerPositionX - 9][
            playerPositionY
          ];

        this.checkIfScreenShouldNotMove(
          movementDirection,
          borderMap,
          opositeBorderMap
        );
      } catch {}
    }

    if (newPlayerPosition) {
      this.playerMoving = true;
      playerPosition.player = false;
      newPlayerPosition.player = true;
      await this.playerMovementEffect(
        playerPosition,
        newPlayerPosition,
        movementDirection
      );
    }
  }

  checkIfScreenShouldNotMove(
    movementDirection: PlayerMovement,
    borderMap: PokemonMap | null,
    opositeBorderMap: PokemonMap | null
  ): void {
    if (borderMap !== undefined && opositeBorderMap !== undefined) {
      this.mapService.movementListener.newPlayerMove(movementDirection);
    }
  }

  async playerMovementEffect(
    playerMapPosition: PokemonMap,
    newPlayerMapPosition: PokemonMap,
    movementDirection: PlayerMovement
  ): Promise<void> {
    playerMapPosition.playerMovementActive.class = `player-${movementDirection}-active`;
    this.mapService.refreshPlayerCell(playerMapPosition);
    setTimeout(() => {
      playerMapPosition.playerMovementActive.class = `player-${movementDirection}-active-two`;
      this.mapService.refreshPlayerCell(playerMapPosition);
      setTimeout(() => {
        playerMapPosition.playerMovementActive.class = `player-${movementDirection}-active-thre`;
        this.mapService.refreshPlayerCell(playerMapPosition);
        setTimeout(() => {
          newPlayerMapPosition.playerMovementActive.class = `player-${movementDirection}`;
          this.mapService.refreshPlayerPosition(
            playerMapPosition,
            newPlayerMapPosition
          );
          this.playerMoving = false;
        }, this.walkVelocity);
      }, this.walkVelocity);
    }, this.walkVelocity);
  }
}
