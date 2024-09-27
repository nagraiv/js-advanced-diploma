import Bowman from "../characters/Bowman";

describe('Должен создаваться персонаж Bowman с правильными параметрами', () => {
    it('attack/defence: 25/25', () => {
        const bowman = new Bowman(1);
        expect(bowman).toEqual({
            type: 'bowman',
            level: 1,
            health: 50,
            attack: 25,
            defence: 25,
        });
    });
});

// describe('Тестируем функции урона и повышения уровня', () => {
//     it('урон здоровью зависит от защиты', () => {
//         const bowman = new Bowman('Легалас');
//         bowman.damage(40);
//         expect(bowman.health).toBe(70);
//     });
//
//     it('при повышении уровня атака и защита увеличивается на 20%, а здоровье восстанавливается', () => {
//         const bowman = new Bowman('Легалас');
//         bowman.levelUp();
//         bowman.damage(40);
//         bowman.levelUp();
//         expect(bowman).toEqual({
//             name: 'Легалас',
//             type: 'Bowman',
//             level: 3,
//             _health: 100,
//             attack: 36,
//             defence: 36,
//         });
//     });
// });