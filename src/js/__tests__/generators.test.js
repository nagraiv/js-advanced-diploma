import {characterGenerator, generateTeam} from "../generators";
import Bowman from "../characters/Bowman";
import Magician from "../characters/Magician";
import Swordsman from "../characters/Swordsman";
import {expectedError} from "@babel/core/lib/errors/rewrite-stack-trace";

describe('Тестируем characterGenerator', () => {
    it('генератор бесконечно выдаёт персонажей допустимых типов и уровней', () => {
        const allowedTypes = [Bowman, Magician, Swordsman];
        const maxLevel = 3;
        const testGenerator = characterGenerator(allowedTypes, maxLevel);
        const veryBigNumber = 10;
        const testCharacters = [];
        for (let i = 0; i < veryBigNumber; i += 1) {
            testCharacters.push( testGenerator.next().value );
        }
        expect(testGenerator.next().done).toBeFalsy();

        const charactersTypesArr = Array.from(
            new Set(
                testCharacters.map(member => member.type)
            )
        );
        const allowedTypesArr = allowedTypes.map( type => type.name.toLowerCase() );
        expect(allowedTypesArr).toEqual(expect.arrayContaining(charactersTypesArr));

        const checkLevel = testCharacters.reduce( (acc, cur) => acc < cur.level ? cur.level : acc, -Infinity );
        expect(maxLevel).toBeGreaterThanOrEqual(checkLevel);
    });
});

describe('Тестируем generateTeam', () => {
    it('команда содержит заданное число персонажей', () => {
        const characterCount = 5;
        const playerTeam = generateTeam( [Bowman, Magician, Swordsman], 3, characterCount );
        expect(playerTeam.characters.length).toBe(characterCount);
    });
});