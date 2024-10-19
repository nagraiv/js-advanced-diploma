import Undead from "../characters/Undead";
import PositionedCharacter from "../PositionedCharacter";
import {calculateDistance} from "../utils";

describe('Должен создаваться персонаж Undead с правильными параметрами', () => {
    it('attack/defence: 40/10', () => {
        const undead = new Undead(1);
        expect(undead).toEqual({
            type: 'undead',
            level: 1,
            health: 50,
            attack: 40,
            defence: 10,
            move: 4,
            attackDistance: 1,
        });
    });
});

describe('Проверяем возможности хода и атаки персонажа Undead', () => {
  const undead = new Undead(1);
  const positionedUndead = new PositionedCharacter(undead, 19);

  it('Undead может передвинуться на 4 клетки', () => {
    const result = undead.move >= calculateDistance(positionedUndead.position, 54);
    expect(result).toBeTruthy();
  });

  it('Undead НЕ может передвинуться на 5 клеток', () => {
    const result = undead.move >= calculateDistance(positionedUndead.position, 62);
    expect(result).toBeFalsy();
  });

  it('Undead может атаковать на 1 клетку', () => {
    const result = undead.attackDistance >= calculateDistance(positionedUndead.position, 27);
    expect(result).toBeTruthy();
  });

  it('Undead НЕ может атаковать на 2 клетки', () => {
    const result = undead.attackDistance >= calculateDistance(positionedUndead.position, 21);
    expect(result).toBeFalsy();
  });
});
