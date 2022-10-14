import { PokemonRPG } from "./app/app"

const gameDiv = document.getElementById('pokemonRPG');
const appGame = new PokemonRPG(gameDiv);


appGame.runGame();