import {generateTeam} from "./generators";
import Bowman from "./characters/Bowman";
import Magician from "./characters/Magician";
import Swordsman from "./characters/Swordsman";
import Daemon from "./characters/Daemon";
import Undead from "./characters/Undead";
import Vampire from "./characters/Vampire";
import {calculateDistance, calculateMove, getPossiblePositionsArray, getRandomElements} from "./utils";
import PositionedCharacter from "./PositionedCharacter";

export default class GameState {
  static players = ['player', 'evil'];

  constructor(
    gameLevel = 1,
    turn = 0,
    positionedPlayerTeam = [],
    positionedOpponentTeam = [],
    activeCharacter = null,
    ) {
    this.gameLevel = gameLevel;
    this.turn = turn;
    this.positionedPlayerTeam = positionedPlayerTeam;
    this.positionedOpponentTeam = positionedOpponentTeam;
    this.activeCharacter = activeCharacter;
  }

  /**
   * Инициализирует команды (набор и расстановку персонажей) перед началом уровня
   * @param characterCount - количество персонажей в команде
   * */
  initTeams(characterCount) {
    // если уровень выше первого, то часть персонажей в команде игрока перешли с прошлого уровня
    const previousLevelCharacters = this.positionedPlayerTeam
      .map(positionedCharacter => positionedCharacter.character);
    previousLevelCharacters.forEach(character => character.levelUp());

    const playerTeam = generateTeam(
      [Bowman, Magician, Swordsman],
      this.gameLevel,
      characterCount - previousLevelCharacters.length
    );
    const playerTeamPositions = getRandomElements( getPossiblePositionsArray([0, 1]), characterCount );
    this.positionedPlayerTeam = [...previousLevelCharacters, ...playerTeam.characters]
        .map( (member, i) => new PositionedCharacter(member, playerTeamPositions[i]) );

    const opponentTeam = generateTeam( [Daemon, Undead, Vampire], this.gameLevel, characterCount );
    const opponentTeamPositions = getRandomElements( getPossiblePositionsArray([6, 7]), characterCount );
    this.positionedOpponentTeam = opponentTeam
        .characters
        .map( (member, i) => new PositionedCharacter(member, opponentTeamPositions[i]) );
  }

  get allCharacters() {
    return [...this.positionedPlayerTeam, ...this.positionedOpponentTeam];
  }

  get allCharacterPositions() {
    return this.allCharacters.map(character => character.position);
  }

  get currentGameState() {
    return this.allCharacters.map(el => ({
      character: el.character.type,
      health: el.character.health,
      attack: el.character.attack,
      position: el.position,
    }));
  }

  checkWinOrLoose() {
    return new Promise((resolve, reject) => {
      if (!this.positionedPlayerTeam.length) {
        reject({gameOver: true});
      }
      if (!this.positionedOpponentTeam.length) {
        reject({nextLevel: true});
      }
      this.passTheTurn();
      resolve('game is going on!');
    });
  }

  passTheTurn() {
    this.turn += 1;
    console.log('The turn is passed! ', this.turn);
  }

  calculateDamage(targetCharacter, attacker = this.activeCharacter) {
    return Math.floor(Math.max(attacker.character.attack - targetCharacter.character.defence, attacker.character.attack * 0.1));
  }

  chooseOpponentTurn() {
    return new Promise((resolve, reject) => {
      console.log('chooseOpponentTurn\nturn: ', this.turn);
      console.table(this.currentGameState);
      if ( this.isPlayerTurn() ) reject("It's a player turn now, evil team can't move!");
      if ( this.positionedOpponentTeam.length === 0 ) reject("Evil team is empty!");
      // проверяем, может ли какой-нибудь персонаж команды атаковать кого-то из противника
      let targetArr = [];
      this.positionedOpponentTeam.forEach(positionedCharacter => {
        targetArr.push({
          attacker: positionedCharacter,
          currentIndex: positionedCharacter.position,
          target: this.positionedPlayerTeam
            .find(el => positionedCharacter.character.attackDistance >= calculateDistance(positionedCharacter.position, el.position))
        } );
      });
      // выбираем персонажа, который нанесёт максимальный урон
      const bestAttack = targetArr
        .reduce((acc, val) => {
          if (!val.target) return acc;
          const damage = this.calculateDamage(val.target, val.attacker);
          if (damage > acc.damage) {
            val.damage = damage;
            return val;
          } else {
            return acc;
          }
        }, {damage: 0});
      if (bestAttack.damage > 0) {
        console.log("Let's attack!");
        resolve({
          move: false,
          attack: true,
          ...bestAttack
        });
      } else {
        // если атака невозможна - передвигаемся ближе к противнику
        console.log("Let's move!");
        // находим персонажа с сильнейшей атакой - он будет двигаться ближе к противнику
        this.positionedOpponentTeam
          .sort((a, b) => b.character.attack - a.character.attack);
        const leader = this.positionedOpponentTeam[0];
        const nearestCharacter = this.positionedPlayerTeam
          .reduce((acc, val) => {
            const distance = calculateDistance(leader.position, val.position);
            if (distance < acc.distance) {
              return {
                distance,
                target: val,
              }
            } else {
              return acc;
            }
          }, {distance: +Infinity});
        const bestMove = {
          currentIndex: leader.position,
          characterToMove: leader,
          newIndex: calculateMove(leader.position, nearestCharacter.target.position, leader.character.move, this.allCharacterPositions),
        };
        resolve({
          attack: false,
          move: true,
          ...bestMove
        });
      }
    });
  }

  isPlayerTurn() {
    return GameState.players[this.turn % 2] === 'player';
  }

  isOpponentCharacter(positionedCharacter) {
    return this.positionedOpponentTeam.includes( positionedCharacter );
  }

  isActiveCharacter() {
    return this.activeCharacter !== null;
  }

  setActiveCharacter(positionedCharacter) {
    this.activeCharacter = positionedCharacter;
  }

  unsetActiveCharacter() {
    this.activeCharacter = null;
  }

  static from(object) {
    return {
      gameLevel: object.gameLevel,
      turn: object.turn,
      positionedPlayerTeam: object.positionedPlayerTeam,
      positionedOpponentTeam: object.positionedOpponentTeam,
      activeCharacter: object.activeCharacter,
    };
  }
}
