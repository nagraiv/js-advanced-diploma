import Character from "../Character";

export default class Daemon extends Character {
  constructor(
    level,
    type = 'daemon',
    attack = 10,
    defence = 10,
    move = 1,
    attackDistance = 4,
    health = 50,
    isRestored = false,
  ) {
        super(level, type, attack, defence,  move, attackDistance, health, isRestored);
    }
}
