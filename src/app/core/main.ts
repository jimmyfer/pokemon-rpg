import { GameScreen } from './scenes/game-screen';
import { BattleScene } from './scenes/gameplay/battle/battle-scene';
import { GamePlayScene } from './scenes/gameplay/gameplay-scene';
import { StartScene } from './scenes/start/start-scene';

export class GameBuilder {
  constructor(gameContainer: HTMLElement) {
    gameContainer.classList.add('game-container');

    const gameScreen = new GameScreen(gameContainer);
    gameScreen.startScene();

    const gameStartScene = new StartScene(gameScreen);
    gameStartScene.startScene();
    gameStartScene.removeScene();

    const gameplayScene = new GamePlayScene(gameScreen);
    gameplayScene.startScene();

    // const battleScene = new BattleScene(gameplayScene);
    // battleScene.startScene();
    // gameplayScene.removeScene();
  }
}
