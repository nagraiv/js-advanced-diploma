/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
export default class Team {
    constructor(...characters) {
        this.members = new Set([...characters]);
    }

    add(character) {
        if (this.members.has(character)) {
            throw new Error('Нельзя повторно добавить персонаж в команду!');
        }
        this.members.add(character);
    }

    addAll(...characters) {
        // characters.forEach(character => this.members.add(character));
        this.members = new Set([...this.members, ...characters]);
    }

    get characters() {
        return Array.from(this.members);
    }
}
