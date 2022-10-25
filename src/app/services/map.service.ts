import { MovementSubject } from '../utilities/movement-helper';
import { PokemonMap } from '../core/map-builder/map-builder';

export class PokeMapService {
  private static instance: PokeMapService;

  activeMap: PokemonMap[][] = [];

  mapDimensions: number[] = [];

  playerPositionX: number = 0;
  playerPositionY: number = 0;
  playerBasePosition = '';

  movementListener = new MovementSubject();

  public static getInstance(): PokeMapService {
    if (!this.instance) {
      this.instance = new PokeMapService();
    }

    return this.instance;
  }

  refreshPlayerCell(position: PokemonMap): void {
    position.node.childNodes.forEach(node => {
      if ((node as HTMLElement).classList.contains('player')) {
        node.remove();
        const playerSprite = document.createElement('div');
        playerSprite.classList.add('player');
        playerSprite.classList.add('player-base');
        playerSprite.classList.add(position.playerMovementActive.class);
        position.node.appendChild(playerSprite);
      }
    });
  }

  refreshPlayerPosition(
    oldPosition: PokemonMap,
    newPosition: PokemonMap
  ): void {
    oldPosition.playerMovementActive.class = '';
    oldPosition.node.childNodes.forEach(node => {
      if ((node as HTMLElement).classList.contains('player')) {
        node.remove();
      }
    });
    const playerSprite = document.createElement('div');
    playerSprite.classList.add('player');
    playerSprite.classList.add('player-base');
    playerSprite.classList.add(newPosition.playerMovementActive.class);
    newPosition.node.appendChild(playerSprite);
  }
}
