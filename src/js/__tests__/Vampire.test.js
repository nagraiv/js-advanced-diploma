import Vampire from "../characters/Vampire";
import PositionedCharacter from "../PositionedCharacter";
import {calculateDistance} from "../utils";

describe('Должен создаваться персонаж Vampire с правильными параметрами', () => {
    it('attack/defence: 10/40', () => {
        const zombie = new Vampire(1);
        expect(zombie).toEqual({
            type: 'vampire',
            level: 1,
            health: 50,
            attack: 25,
            defence: 25,
            move: 2,
            attackDistance: 2,
        });
    });
});

describe('Проверяем возможности хода и атаки персонажа Vampire', () => {
  const vampire = new Vampire(1);
  const positionedVampire = new PositionedCharacter(vampire, 34);

  it('Vampire может передвинуться на 2 клетки', () => {
    const result = vampire.move >= calculateDistance(positionedVampire.position, 52);
    expect(result).toBeTruthy();
  });

  it('Vampire НЕ может передвинуться на 3 клетки', () => {
    const result = vampire.move >= calculateDistance(positionedVampire.position, 45);
    expect(result).toBeFalsy();
  });

  it('Vampire может атаковать на 2 клетки', () => {
    const result = vampire.attackDistance >= calculateDistance(positionedVampire.position, 28);
    expect(result).toBeTruthy();
  });

  it('Vampire НЕ может атаковать на 3 клетки', () => {
    const result = vampire.attackDistance >= calculateDistance(positionedVampire.position, 13);
    expect(result).toBeFalsy();
  });
});

