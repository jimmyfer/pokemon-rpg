import { PokemonMap } from '../utilities/map-builder';

export class PokeMapService {
  private static instance: PokeMapService;

  activeMap: PokemonMap[][] = [];

  mapDimensions: number[] = [];

  playerPositionX: number = 0;
  playerPositionY: number = 0;
  playerBasePosition = '';

  public static getInstance(): PokeMapService {
    if (!this.instance) {
      this.instance = new PokeMapService();
    }

    return this.instance;
  }

  refreshPlayerPosition(
    oldPosition: PokemonMap,
    newPosition: PokemonMap
  ): void {
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
