import {calcTileType, getCharacterTooltip} from "../utils";
import Magician from "../characters/Magician";

describe('Тестируем функцию calcTileType', () => {
    it('левый верхний угол', () => {
        expect(calcTileType(0, 5)).toBe('top-left');
    });

    it('правый верхний угол', () => {
        expect(calcTileType(5, 6)).toBe('top-right');
    });

    it('верхний край', () => {
        expect(calcTileType(3, 10)).toBe('top');
    });

    it('левый нижний угол', () => {
        expect(calcTileType(12, 4)).toBe('bottom-left');
    });

    it('правый нижний угол', () => {
        expect(calcTileType(63, 8)).toBe('bottom-right');
    });

    it('левый край', () => {
        expect(calcTileType(16, 8)).toBe('left');
    });

    it('правый край', () => {
        expect(calcTileType(17, 6)).toBe('right');
    });

    it('нижний край', () => {
        expect(calcTileType(14, 4)).toBe('bottom');
    });

    it('НЕ крайняя клетка поля', () => {
        expect(calcTileType(47, 10)).toBe('center');
    });
});


describe('Тестируем функцию getCharacterTooltip', () => {
    it('метод формирует строку правильного формата', () => {
        const hero = new Magician(1);
        const result = getCharacterTooltip(hero);
        expect(result).toBe('🎖1 ⚔10 🛡40 ❤50');
    });
});