import themes from "./themes";
import {calculateDistance, getCharacterTooltip} from "./utils";
import GameState from "./GameState";
import GamePlay from "./GamePlay";
import cursors from "./cursors";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.gameState = new GameState();
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    let gameLevel = 1;
    let characterCount = gameLevel + 2;
    this.gamePlay.drawUi( themes.setTheme(gameLevel) );

    this.gameState.initTeams(this.gamePlay.boardSize, gameLevel, characterCount);

    this.gamePlay.redrawPositions(this.gameState.allCharacters);

    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  onCellClick(index) {
    if ( !this.gameState.isPlayerTurn() ) return;
    const positionedCharacter = this.gameState.allCharacters
        .find(member => member.position === index);
    if (!positionedCharacter) return;

    if ( this.gameState.isActiveCharacter() ) {
      // 1. выбираем другого активного персонажа
      if ( !this.gameState.isOpponentCharacter(positionedCharacter) ) {
        this.gamePlay.deselectCell( this.gameState.activeCharacter.position );
        this.gamePlay.selectCell(index);
        this.gameState.setActiveCharacter(positionedCharacter);
      }
    } else {
      //  ситуация, когда активный ещё не выбран
      if ( this.gameState.isOpponentCharacter(positionedCharacter) ) {
        GamePlay.showError('Выберите персонажа из своей команды, который будет ходить!');
      } else {
        this.gamePlay.selectCell(index);
        this.gameState.setActiveCharacter(positionedCharacter);
      }
    }
  }

  onCellEnter(index) {
    const positionedCharacter = this.gameState.allCharacters
        .find(member => member.position === index);

    if (positionedCharacter) {
      // в любом случае показываем всплывающую подсказку об игроке
      this.gamePlay.showCellTooltip( getCharacterTooltip(positionedCharacter.character) , index );
      if ( this.gameState.isActiveCharacter() ) {
        // если уже выбран активный игрок
        if ( this.gameState.isOpponentCharacter(positionedCharacter) ) {
          // и навели курсор на персонажа противника
          if ( this.gameState.activeCharacter.character.attackDistance >= calculateDistance(this.gamePlay.boardSize, this.gameState.activeCharacter.position, index) ) {
            // если дистанция позволяет поразить противника - курсор прицел и подсвечиваем поле красным
            this.gamePlay.selectCell(index, 'red');
            this.gamePlay.setCursor(cursors.crosshair);
          } else {
            // противник дальше, чем радиус поражения - курсор запрещено
            this.gamePlay.setCursor(cursors.notallowed);
          }
        } else {
          if ( this.gameState.activeCharacter !== positionedCharacter ) {
            // если курсор на другом персонаже своей команды - курсор указатель
            this.gamePlay.setCursor(cursors.pointer);
          }
        }
      } else {
        // если нет активного игрока и навели курсор на персонажа свой команды - курсор указатель
        if ( !this.gameState.isOpponentCharacter(positionedCharacter) ) {
          this.gamePlay.setCursor(cursors.pointer);
        }
      }
    } else {
      if ( !this.gameState.isActiveCharacter() ) return; // если нет активного игрока и навели на пустое поле - ничего не делать
      // проверяем возможность перемещения на указанную клетку
      if (this.gameState.activeCharacter.character.move >= calculateDistance(this.gamePlay.boardSize, this.gameState.activeCharacter.position, index)) {
        // если можем перейти на эту клетку - курсор указатель и подсвечиваем поле зелёным
        this.gamePlay.selectCell(index, 'green');
        this.gamePlay.setCursor(cursors.pointer);
      } else {
        // иначе действие невозможно - курсор notallowed
        this.gamePlay.setCursor(cursors.notallowed);
      }
    }

    // if ( this.gameState.isActiveCharacter() ) {
    //   // console.log(calculateDistance(this.gamePlay.boardSize, this.gameState.activeCharacter.position, index));
    //   if ( this.gameState.activeCharacter === positionedCharacter ) {
    //     // наводим курсор на активного персонажа - всплывающая подсказка, курсор auto
    //     this.gamePlay.showCellTooltip( getCharacterTooltip(positionedCharacter.character) , index );
    //   } else {
    //     if ( positionedCharacter && !this.gameState.isOpponentCharacter(positionedCharacter) ) {
    //       // навели курсор на другого персонажа своей команды - всплывающая подсказка, курсор pointer
    //       this.gamePlay.setCursor(cursors.pointer);
    //       this.gamePlay.showCellTooltip( getCharacterTooltip(positionedCharacter.character) , index );
    //     }
    //     if ( positionedCharacter && this.gameState.isOpponentCharacter(positionedCharacter) ) {
    //       // навели курсор на персонажа противника - всплывающая подсказка, курсор
    //       if ( this.gameState.activeCharacter.character.attackDistance >= calculateDistance(this.gamePlay.boardSize, this.gameState.activeCharacter.position, index) ) {
    //         // если дистанция позволяет поразить противника - курсор прицел и подсвечиваем поле красным
    //         this.gamePlay.selectCell(index, 'red');
    //         this.gamePlay.setCursor(cursors.crosshair);
    //         this.gamePlay.showCellTooltip( getCharacterTooltip(positionedCharacter.character) , index );
    //       } else {
    //         this.gamePlay.setCursor(cursors.notallowed);
    //         this.gamePlay.showCellTooltip( getCharacterTooltip(positionedCharacter.character) , index );
    //       }
    //     }
    //     if (!positionedCharacter) {
    //       // навели курсор на пустое поле
    //       if (this.gameState.activeCharacter.character.move >= calculateDistance(this.gamePlay.boardSize, this.gameState.activeCharacter.position, index)) {
    //         // если можем перейти на эту клетку - курсор указатель и подсвечиваем поле зелёным
    //         this.gamePlay.selectCell(index, 'green');
    //         this.gamePlay.setCursor(cursors.pointer);
    //       } else {
    //         // иначе действие невозможно
    //         this.gamePlay.setCursor(cursors.notallowed);
    //       }
    //     }
    //   }
    // } else {
    //   // активный персонаж ещё не выбран
    //   if (!positionedCharacter) return;
    //   this.gamePlay.showCellTooltip( getCharacterTooltip(positionedCharacter.character) , index );
    // }
  }

  onCellLeave(index) {
    if ( this.gameState.isActiveCharacter() && index !== this.gameState.activeCharacter.position ) {
      this.gamePlay.deselectCell(index);
    }
    this.gamePlay.hideCellTooltip(index);
    this.gamePlay.setCursor(cursors.auto);
  }
}
