/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  constructor(
    level,
    type = 'generic',
    attack = 0,
    defence = 0,
    move = 0,
    attackDistance = 0,
    health = 50,
    isRestored = false,
  ) {
    this.type = type;
    this.attack = attack;
    this.defence = defence;
    this.move = move;
    this.attackDistance = attackDistance;
    this.health = health;

    if (isRestored) {
      // при загрузке сохранённой игры все параметры персонажа восстанавливаем как есть
      this.level = level;
    } else {
      // при генерации персонажа требуемого уровня повышаем его характеристики по формуле
      this.level = 1;
      for (let i = 1; i < level; i += 1) {
        this.levelUp();
      }
    }

    if (new.target.name === 'Character') throw new Error('Запрещено создавать персонажи от класса-родителя');
  }

  levelUp() {
    this.level += 1;
    this.attack = Math.floor( Math.max(this.attack, this.attack * (80 + this.health) / 100) );
    this.health += 80;
    if (this.health > 100) {
      this.health = 100;
    }
  }
}
