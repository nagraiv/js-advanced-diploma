import Daemon from "../characters/Daemon";
import PositionedCharacter from "../PositionedCharacter";
import {calculateDistance} from "../utils";

describe('Должен создаваться персонаж Daemon с правильными параметрами', () => {
    it('attack/defence: 10/10', () => {
        const daemon = new Daemon(1);
        expect(daemon).toEqual({
            type: 'daemon',
            level: 1,
            health: 50,
            attack: 10,
            defence: 10,
            move: 1,
            attackDistance: 4,
        });
    });
});

describe('Проверяем возможности хода и атаки персонажа Daemon', () => {
  const daemon = new Daemon(1);
  const positionedDaemon = new PositionedCharacter(daemon, 0);

  it('Daemon может передвинуться на 1 клетку', () => {
    const result = daemon.move >= calculateDistance(positionedDaemon.position, 9);
    expect(result).toBeTruthy();
  });

  it('Daemon НЕ может передвинуться на 2 клетки', () => {
    const result = daemon.move >= calculateDistance(positionedDaemon.position, 16);
    expect(result).toBeFalsy();
  });

  it('Daemon может атаковать на 4 клетки', () => {
    const result = daemon.attackDistance >= calculateDistance(positionedDaemon.position, 36);
    expect(result).toBeTruthy();
  });

  it('Daemon НЕ может атаковать на 5 клеток', () => {
    const result = daemon.attackDistance >= calculateDistance(positionedDaemon.position, 37);
    expect(result).toBeFalsy();
  });
});
