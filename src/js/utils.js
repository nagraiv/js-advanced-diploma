import GamePlay from "./GamePlay";

/**
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index, boardSize = GamePlay.boardSize) {
  if (index === 0) return 'top-left';
  if (index === boardSize-1) return 'top-right';
  if ( (index + 1) % boardSize**2 === 0 ) return 'bottom-right';
  if ( (index + boardSize) % boardSize**2 === 0 ) return 'bottom-left';
  if (index / boardSize < 1) return 'top';
  if (index % boardSize === 0) return 'left';
  if ( (index + 1) % boardSize === 0) return 'right';
  if ( (index + boardSize) / boardSize**2 >= 1 ) return 'bottom';
  return 'center';
}

/**
 * @param array - массив элементов, из которых надо выбирать
 * @param count - сколько элементов хотим получить
 * @returns - массив из случайных неповторяющихся элементов
 * */
export function getRandomElements(array, count) {
  let w = array.length, t, i;
  if (count > w) throw new Error('Количество разных случайных значений не может превышать количества всех элементов в массиве');
  // Применяем алгоритм Фишера – Йетса
  while (w) {
    i = Math.floor(Math.random() * w--);
    t = array[w];
    array[w] = array[i];
    array[i] = t;
  }
  // Возвращаем первые n элементов
  return array.slice(0, count);
}

/**
 * @param columnArray - массив с индексами столбцов, в которых могут располагаться персонажи
 * @param boardSize - число, ширина квадратного игрового поля
 * @returns - массив координат в линейном представлении игрового поля
 * */
export function getPossiblePositionsArray(columnArray, boardSize = GamePlay.boardSize) {
  return Array(boardSize)
      .fill(columnArray)
      .map( ([a, b], index) => [a + index * boardSize, b + index * boardSize] )
      .flat();
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}

export function getCharacterTooltip(character) {
  return `\u{1F396}${character.level} \u{2694}${character.attack} \u{1F6E1}${character.defence} \u{2764}${character.health}`;
}

/**
 * @param index1 - позиция на игровом поле
 * @param index2 - позиция на игровом поле
 * @param boardSize - число, ширина квадратного игрового поля
 * @returns - расстояние мужду двумя позициями на игровом поле
 * */
export function calculateDistance(index1, index2, boardSize = GamePlay.boardSize) {
  return Math.max( Math.abs( index1 % boardSize - index2 % boardSize ),
      Math.abs( Math.floor(index1 / boardSize) - Math.floor(index2 / boardSize) ) );
}

/**
 * @param index1 - позиция персонажа, который будет ходить
 * @param index2 - позиция ближайшего игрока противника
 * @param move - дистанция хода
 * @param forbidden - занятые клетки игрового поля
 * @param boardSize - число, ширина квадратного игрового поля
 * @returns - индекс поля, куда передвинется персонаж
 * */
export function calculateMove(index1, index2, move, forbidden = [], boardSize = GamePlay.boardSize) {
  // все клетки игрового поля, куда может перейти персонаж
  const area = [];
  for (let i = 0; i < boardSize ** 2; i += 1) {
    if (!forbidden.includes(i) && move >= calculateDistance(index1, i)) {
      area.push({
        field: i,
        distance: calculateDistance(i, index2),
      });
    }
  }
  // фильтруем поля, расположенные ближе всего к персонажу противника
  const flatArea = area.map(el => el.distance);
  const minDist = Math.min(...flatArea);
  const minDistArea = area.filter(el => el.distance === minDist);
  // случайным образом выбираем поле из тех, где расстояние до соперника минимально
  const randIndex = Math.floor( Math.random() * minDistArea.length );
  return minDistArea[randIndex].field;
}
