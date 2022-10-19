import { PokemonMap } from 'app/utilities/map-builder';
import { PokeMapService } from './map.service';

export class MovementService {
  private static instance: MovementService;

  screen: HTMLElement | null = null;

  mapService: PokeMapService;

  playerMoving = false;

  walkVelocity = 3000;

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
    const playerPosition =
      this.mapService.activeMap[playerPositionX][playerPositionY];
    if (playerPosition.playerMovementActive.class !== 'player-up') {
      playerPosition.playerMovementActive.class = 'player-up';
      this.mapService.refreshPlayerCell(playerPosition);
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
    const playerPosition =
      this.mapService.activeMap[playerPositionX][playerPositionY];
    if (playerPosition.playerMovementActive.class !== 'player-front') {
      playerPosition.playerMovementActive.class = 'player-front';
      this.mapService.refreshPlayerCell(playerPosition);
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
    if (
      this.mapService.activeMap[playerPositionX][playerPositionY - 1]
        .allowEntity === true &&
      !this.playerMoving
    ) {
      this.playerMoving = true;

      playerPosition.player = false;

      this.mapService.playerPositionY--;

      const newPlayerPosition =
        this.mapService.activeMap[playerPositionX][
          this.mapService.playerPositionY
        ];

      newPlayerPosition.player = true;

      await this.playerMovementEffect(
        playerPosition,
        newPlayerPosition,
        'left'
      );
    }
  }

  movePlayerRightCell(): void {
    const playerPositionX = this.mapService.playerPositionX;
    const playerPositionY = this.mapService.playerPositionY;
    const playerPosition =
      this.mapService.activeMap[playerPositionX][playerPositionY];
    if (playerPosition.playerMovementActive.class !== 'player-right') {
      playerPosition.playerMovementActive.class = 'player-right';
      this.mapService.refreshPlayerCell(playerPosition);
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

  async playerMovementEffect(
    playerMapPosition: PokemonMap,
    newPlayerMapPosition: PokemonMap,
    movementDirection: string
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
