import { GameBuilder } from "./core/main";

export class PokemonRPG {
    private gameContainer: HTMLDivElement;
    constructor(gameContainer: HTMLElement | null){
        if(gameContainer) {
            if(gameContainer instanceof HTMLDivElement) {
                this.gameContainer = gameContainer;
            } else {
                throw new Error('Game container must be an HTML Div element');
            }
        } else {
            throw new Error('Cant load the game container element');
        }
    }

    runGame() {
        console.log('Game started');
        const game = new GameBuilder(this.gameContainer);
    }

}