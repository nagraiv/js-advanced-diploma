import Undead from "../characters/Undead";

describe('Должен создаваться персонаж Undead с правильными параметрами', () => {
    it('attack/defence: 40/10', () => {
        const undead = new Undead(1);
        expect(undead).toEqual({
            type: 'undead',
            level: 1,
            health: 50,
            attack: 40,
            defence: 10,
        });
    });
});

// describe('Тестируем функции урона и повышения уровня', () => {
//     it('урон здоровью зависит от защиты', () => {
//         const undead = new Undead('Дракула');
//         undead.damage(80);
//         expect(undead.health).toBe(40);
//     });
//
//     it('при повышении уровня атака и защита увеличивается на 20%, а здоровье восстанавливается', () => {
//         const undead = new Undead('Дракула');
//         undead.damage(99);
//         undead.levelUp();
//         expect(undead).toEqual({
//             name: 'Дракула',
//             type: 'Undead',
//             level: 2,
//             _health: 100,
//             attack: 30,
//             defence: 30,
//         });
//     });
// });