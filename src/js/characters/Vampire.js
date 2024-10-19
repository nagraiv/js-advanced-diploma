import Character from "../Character";

export default class Vampire extends Character {
  constructor(
    level,
    type = 'vampire',
    attack = 25,
    defence = 25,
    move = 2,
    attackDistance = 2,
    health = 50,
    isRestored = false,
  ) {
        super(level, type, attack, defence,  move, attackDistance, health, isRestored);
    }
}
