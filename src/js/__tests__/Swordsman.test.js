import Swordsman from "../characters/Swordsman";

describe('Должен создаваться персонаж Swordsman с правильными параметрами', () => {
    it('attack/defence: 10/40', () => {
        const swordsman = new Swordsman(1);
        expect(swordsman).toEqual({
            type: 'swordsman',
            level: 1,
            health: 50,
            attack: 40,
            defence: 10,
        });
    });
});

// describe('Тестируем функции урона и повышения уровня', () => {
//     it('урон здоровью зависит от защиты', () => {
//         const swordsman = new Swordsman('Арагорн');
//         swordsman.levelUp();
//         swordsman.damage(50);
//         expect(swordsman.health).toBe(56);
//     });
//
//     it('при повышении уровня атака и защита увеличивается на 20%, а здоровье восстанавливается', () => {
//         const swordsman = new Swordsman('Арагорн');
//         swordsman.levelUp();
//         swordsman.damage(70);
//         swordsman.levelUp();
//         expect(swordsman.level).toBe(3);
//         expect(swordsman.health).toBe(100);
//         expect(swordsman.attack).toBeCloseTo(57.6);
//         expect(swordsman.defence).toBeCloseTo(14.4);
//     });
// });