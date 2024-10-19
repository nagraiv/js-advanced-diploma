import Swordsman from "../characters/Swordsman";
import PositionedCharacter from "../PositionedCharacter";
import {calculateDistance} from "../utils";

describe('Должен создаваться персонаж Swordsman с правильными параметрами', () => {
    it('attack/defence: 10/40', () => {
        const swordsman = new Swordsman(1);
        expect(swordsman).toEqual({
            type: 'swordsman',
            level: 1,
            health: 50,
            attack: 40,
            defence: 10,
            move: 4,
            attackDistance: 1,
        });
    });
});

describe('Проверяем возможности хода и атаки персонажа Swordsman', () => {
  const swordsman = new Swordsman(1);
  const positionedSwordsman = new PositionedCharacter(swordsman, 19);

  it('Swordsman может передвинуться на 4 клетки', () => {
    const result = swordsman.move >= calculateDistance(positionedSwordsman.position, 54);
    expect(result).toBeTruthy();
  });

  it('Swordsman НЕ может передвинуться на 5 клеток', () => {
    const result = swordsman.move >= calculateDistance(positionedSwordsman.position, 62);
    expect(result).toBeFalsy();
  });

  it('Swordsman может атаковать на 1 клетку', () => {
    const result = swordsman.attackDistance >= calculateDistance(positionedSwordsman.position, 27);
    expect(result).toBeTruthy();
  });

  it('Swordsman НЕ может атаковать на 2 клетки', () => {
    const result = swordsman.attackDistance >= calculateDistance(positionedSwordsman.position, 21);
    expect(result).toBeFalsy();
  });
});
