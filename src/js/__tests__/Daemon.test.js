import Daemon from "../characters/Daemon";

describe('Должен создаваться персонаж Daemon с правильными параметрами', () => {
    it('attack/defence: 10/10', () => {
        const daemon = new Daemon(1);
        expect(daemon).toEqual({
            type: 'daemon',
            level: 1,
            health: 50,
            attack: 10,
            defence: 10,
        });
    });
});

// describe('Тестируем функции урона и повышения уровня', () => {
//     it('урон здоровью зависит от защиты', () => {
//         const daemon = new Daemon('Люцифер');
//         daemon.damage(50);
//         expect(daemon.health).toBe(70);
//     });
//
//     it('при повышении уровня атака и защита увеличивается на 20%, а здоровье восстанавливается', () => {
//         const daemon = new Daemon('Люцифер');
//         daemon.levelUp();
//         daemon.damage(40);
//         daemon.levelUp();
//         daemon.health = 25;
//         daemon.levelUp();
//         expect(daemon.level).toBe(4);
//         expect(daemon.health).toBe(100);
//         expect(daemon.attack).toBeCloseTo(17.28);
//         expect(daemon.defence).toBeCloseTo(69.12);
//     });
// });