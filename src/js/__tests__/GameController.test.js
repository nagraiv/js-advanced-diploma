// import load from "../GameStateService";

import GameController from "../GameController";
import GamePlay from "../GamePlay";
import GameStateService from "../GameStateService";

jest.mock('../GameStateService');
jest.mock('../GamePlay');

beforeEach(() => {
  jest.resetAllMocks();
});

test('Тестируем восстановление состояния игры при успешной загрузке сохранённого слепка данных', () => {
  const gamePlay = new GamePlay();
  const localStorage = null;
  const stateService = new GameStateService(localStorage);
  const gameCtrl = new GameController(gamePlay, stateService);

  gameCtrl.stateService.load.mockReturnValue({
    "gameLevel": 2,
    "turn": 10,
    "positionedPlayerTeam": [
      {
        "character": {
          "type": "magician",
          "attack": 11,
          "defence": 40,
          "move": 1,
          "attackDistance": 4,
          "health": 100,
          "level": 2
        },
        "position": 8
      },
      {
        "character": {
          "type": "magician",
          "attack": 13,
          "defence": 40,
          "move": 1,
          "attackDistance": 4,
          "health": 91,
          "level": 2
        },
        "position": 25
      },
      {
        "character": {
          "type": "bowman",
          "attack": 25,
          "defence": 25,
          "move": 2,
          "attackDistance": 2,
          "health": 50,
          "level": 1
        },
        "position": 9
      },
      {
        "character": {
          "type": "bowman",
          "attack": 32,
          "defence": 25,
          "move": 2,
          "attackDistance": 2,
          "health": 100,
          "level": 2
        },
        "position": 26
      }
    ],
    "positionedOpponentTeam": [
      {
        "character": {
          "type": "vampire",
          "attack": 32,
          "defence": 25,
          "move": 2,
          "attackDistance": 2,
          "health": 78,
          "level": 2
        },
        "position": 27
      },
      {
        "character": {
          "type": "vampire",
          "attack": 32,
          "defence": 25,
          "move": 2,
          "attackDistance": 2,
          "health": 100,
          "level": 2
        },
        "position": 22
      },
      {
        "character": {
          "type": "daemon",
          "attack": 10,
          "defence": 10,
          "move": 1,
          "attackDistance": 4,
          "health": 50,
          "level": 1
        },
        "position": 63
      },
      {
        "character": {
          "type": "daemon",
          "attack": 10,
          "defence": 10,
          "move": 1,
          "attackDistance": 4,
          "health": 50,
          "level": 1
        },
        "position": 7
      }
    ],
    "activeCharacter": {
      "character": {
        "type": "bowman",
        "attack": 32,
        "defence": 25,
        "move": 2,
        "attackDistance": 2,
        "health": 100,
        "level": 2
      },
      "position": 26
    }
  });
  gameCtrl.onLoadGameClick();
  expect(gameCtrl.gameState.gameLevel).toBe(2);
  expect(gameCtrl.gameState.turn).toBe(10);
  expect(gameCtrl.gameState.positionedOpponentTeam.length).toBe(4);
});

test('Тестируем поведение onLoadGameClick при ошибке в методе load класса GameStateService', () => {

  const gamePlay = new GamePlay();
  const localStorage = null;
  const stateService = new GameStateService(localStorage);
  const gameCtrl = new GameController(gamePlay, stateService);

  gameCtrl.stateService.load.mockReturnValue(new Error('мокаем ошибку'));
  const spy = jest.spyOn(GamePlay, 'showError');

  gameCtrl.onLoadGameClick();
  expect(spy).toHaveBeenCalled();
});
