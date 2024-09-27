import {generateTeam} from "./generators";
import Bowman from "./characters/Bowman";
import Magician from "./characters/Magician";
import Swordsman from "./characters/Swordsman";
import Daemon from "./characters/Daemon";
import Undead from "./characters/Undead";
import Vampire from "./characters/Vampire";
import {getPossiblePositionsArray, getRandomElements} from "./utils";
import PositionedCharacter from "./PositionedCharacter";

export default class GameState {
  static players = ['player', 'evil'];

  constructor() {
    this.positionedPlayerTeam = [];
    this.positionedOpponentTeam = [];
    this.turn = 0;
    this.activeCharacter = null;
  }

  /**
   * Инициализирует команды (набор и расстановку персонажей) перед началом уровня
   * @param boardSize - ширина квадратного игрового поля
   * @param gameLevel - уровень игры
   * @param characterCount - количество персонажей в команде
   * */
  initTeams(boardSize, gameLevel, characterCount) {
    const playerTeam = generateTeam( [Bowman, Magician, Swordsman], gameLevel, characterCount );
    const playerTeamPositions = getRandomElements( getPossiblePositionsArray(boardSize, [0, 1]), characterCount );
    this.positionedPlayerTeam = playerTeam
        .characters
        .map( (member, i) => new PositionedCharacter(member, playerTeamPositions[i]) );

    const opponentTeam = generateTeam( [Daemon, Undead, Vampire], gameLevel, characterCount );
    const opponentTeamPositions = getRandomElements( getPossiblePositionsArray(boardSize, [6, 7]), characterCount );
    this.positionedOpponentTeam = opponentTeam
        .characters
        .map( (member, i) => new PositionedCharacter(member, opponentTeamPositions[i]) );

  }

  get allCharacters() {
    return [...this.positionedPlayerTeam, ...this.positionedOpponentTeam];
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
    // TODO: create object
    return null;
  }
}
