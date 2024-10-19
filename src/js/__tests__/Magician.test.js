import Magician from "../characters/Magician";
import PositionedCharacter from "../PositionedCharacter";
import {calculateDistance} from "../utils";

describe('Должен создаваться персонаж Magician с правильными параметрами', () => {
    it('attack/defence: 10/40', () => {
        const magician = new Magician(1);
        expect(magician).toEqual({
            type: 'magician',
            level: 1,
            health: 50,
            attack: 10,
            defence: 40,
            move: 1,
            attackDistance: 4,
        });
    });
});

describe('Проверяем возможности хода и атаки персонажа Magician', () => {
  const magician = new Magician(1);
  const positionedMagician = new PositionedCharacter(magician, 11);

  it('Magician может передвинуться на 1 клетку', () => {
    const result = magician.move >= calculateDistance(positionedMagician.position, 2);
    expect(result).toBeTruthy();
  });

  it('Magician НЕ может передвинуться на 2 клетки', () => {
    const result = magician.move >= calculateDistance(positionedMagician.position, 17);
    expect(result).toBeFalsy();
  });

  it('Magician может атаковать на 4 клетки', () => {
    const result = magician.attackDistance >= calculateDistance(positionedMagician.position, 41);
    expect(result).toBeTruthy();
  });

  it('Magician НЕ может атаковать на 5 клеток', () => {
    const result = magician.attackDistance >= calculateDistance(positionedMagician.position, 50);
    expect(result).toBeFalsy();
  });
});
