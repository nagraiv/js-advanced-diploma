import Character from "../Character";

export default class Magician extends Character {
  constructor(
    level,
    type = 'magician',
    attack = 10,
    defence = 40,
    move = 1,
    attackDistance = 4,
    health = 50,
    isRestored = false,
  ) {
        super(level, type, attack, defence,  move, attackDistance, health, isRestored);
    }
}
