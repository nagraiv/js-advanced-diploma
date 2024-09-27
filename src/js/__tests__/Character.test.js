import Character from "../Character";
import Swordsman from "../characters/Swordsman";

describe('Нельзя создать персонаж от родительского класса Character', () => {
    it('будет выброшена ошибка', () => {
        expect(() => new Character(3, 'magician')).toThrow('Запрещено создавать персонажи от класса-родителя');
    });
});

describe('Допускается создавать персонажей только от дочерних классов', () => {
    it('ошибки не будет', () => {
        expect(() => new Swordsman()).not.toThrowError();
    });
});

