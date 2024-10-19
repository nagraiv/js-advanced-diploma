import Character from "../Character";

export default class Swordsman extends Character {
  constructor(
    level,
    type = 'swordsman',
    attack = 40,
    defence = 10,
    move = 4,
    attackDistance = 1,
    health = 50,
    isRestored = false,
  ) {
        super(level, type, attack, defence,  move, attackDistance, health, isRestored);
    }
}
