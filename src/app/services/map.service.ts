import { PokemonMap } from '../utilities/map-builder';

export class PokeMapService {
  private static instance: PokeMapService;

  activeMap: PokemonMap[][] = [];

  mapDimensions: number[] = [];

  public static getInstance(): PokeMapService {
    if (!this.instance) {
      this.instance = new PokeMapService();
    }

    return this.instance;
  }
}
