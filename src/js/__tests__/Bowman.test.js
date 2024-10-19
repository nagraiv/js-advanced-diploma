import Bowman from "../characters/Bowman";
import PositionedCharacter from "../PositionedCharacter";
import {calculateDistance} from "../utils";

describe('Должен создаваться персонаж Bowman с правильными параметрами', () => {
    it('attack/defence: 25/25', () => {
        const bowman = new Bowman(1);
        expect(bowman).toEqual({
            type: 'bowman',
            level: 1,
            health: 50,
            attack: 25,
            defence: 25,
            move: 2,
            attackDistance: 2,
        });
    });
});

describe('Проверяем возможности хода и атаки персонажа Bowman', () => {
  const bowman = new Bowman(1);
  const positionedBowman = new PositionedCharacter(bowman, 9);

  it('Bowman может передвинуться на 2 клетки', () => {
    const result = bowman.move >= calculateDistance(positionedBowman.position, 11);
    expect(result).toBeTruthy();
  });

  it('Bowman НЕ может передвинуться на 3 клетки', () => {
    const result = bowman.move >= calculateDistance(positionedBowman.position, 12);
    expect(result).toBeFalsy();
  });

  it('Bowman может атаковать на 2 клетки', () => {
    const result = bowman.attackDistance >= calculateDistance(positionedBowman.position, 25);
    expect(result).toBeTruthy();
  });

  it('Bowman НЕ может атаковать на 4 клетки', () => {
    const result = bowman.attackDistance >= calculateDistance(positionedBowman.position, 41);
    expect(result).toBeFalsy();
  });
});
