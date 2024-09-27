import Vampire from "../characters/Vampire";

describe('Должен создаваться персонаж Vampire с правильными параметрами', () => {
    it('attack/defence: 10/40', () => {
        const zombie = new Vampire(1);
        expect(zombie).toEqual({
            type: 'vampire',
            level: 1,
            health: 50,
            attack: 25,
            defence: 25,
        });
    });
});

