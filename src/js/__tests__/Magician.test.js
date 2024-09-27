import Magician from "../characters/Magician";

describe('Должен создаваться персонаж Magician с правильными параметрами', () => {
    it('attack/defence: 10/40', () => {
        const magician = new Magician(1);
        expect(magician).toEqual({
            type: 'magician',
            level: 1,
            health: 50,
            attack: 10,
            defence: 40,
        });
    });
});

// describe('Тестируем функции урона и повышения уровня', () => {
//     it('урон здоровью зависит от защиты', () => {
//         const magician = new Magician('Гендальф');
//         magician.damage(100);
//         expect(magician.health).toBe(40);
//     });
//
//     it('при повышении уровня атака и защита увеличивается на 20%, а здоровье восстанавливается', () => {
//         const magician = new Magician('Гендальф');
//         magician.levelUp();
//         magician.damage(40);
//         magician.levelUp();
//         magician.health = 25;
//         magician.levelUp();
//         magician.damage(200);
//         magician.levelUp();
//         expect(magician.level).toBe(5);
//         expect(magician.health).toBe(100);
//         expect(magician.attack).toBeCloseTo(20.736);
//         expect(magician.defence).toBeCloseTo(82.944);
//     });
// });