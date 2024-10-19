import Team from "./Team";
import Bowman from "./characters/Bowman";
import Daemon from "./characters/Daemon";
import Magician from "./characters/Magician";
import Swordsman from "./characters/Swordsman";
import Undead from "./characters/Undead";
import Vampire from "./characters/Vampire";
import Character from "./Character";
import PositionedCharacter from "./PositionedCharacter";

/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  while (true) {
    const level = Math.floor(Math.random() * maxLevel + 1);
    const chooseType = Math.floor(Math.random() * allowedTypes.length);
    yield new allowedTypes[chooseType](level);
  }
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей.
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const newGenerator = characterGenerator(allowedTypes, maxLevel);
  const characters = [];
  for (let i = 0; i < characterCount; i += 1) {
    characters.push( newGenerator.next().value );
  }
  return new Team(...characters);
}


function characterType(type) {
  switch(type) {
    case 'bowman': return Bowman;
    case 'daemon': return Daemon;
    case 'magician': return Magician;
    case 'swordsman': return Swordsman;
    case 'undead': return Undead;
    case 'vampire': return Vampire;
    default: return Character;
  }
}

function restoreCharacter({
  level,
  type,
  attack,
  defence,
  move,
  attackDistance,
  health,
}) {
  const characterConstructor = characterType(type);
  return new characterConstructor(level, type, attack, defence, move, attackDistance, health, true);
}

function restorePositionedCharacter({character, position}) {
  return new PositionedCharacter(
    restoreCharacter(character),
    position,
    );
}

export function restoreTeam(arrOfObj) {
  const team = [];
  arrOfObj.forEach(obj => {
    const character = restorePositionedCharacter(obj);
    team.push(character);
  });
  return team;
}

