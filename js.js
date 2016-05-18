"use strict";
let seaBattle = (function() {
    /* *
     * Игровые поля
     *
     */
    let emptySeaMap = {
        1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    let compSeaMap = {
        1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    let players = {
        "user": "Пользователь",
        "comp": "Компьютер"
    };
    /* * 
     * Список возможных караблей.
     * [nums] - Кол-во караблей на поле
     * [position] - Позиция карабля (1 - вертикально | 2 - горизонтально) {#todo}
     */
    let ships = {
        "Однопалубный": {
            nums: 2,
            position: 1,
            pal: 0
        },
        "Двухпалубный": {
            nums: 2,
            position: 1,
            pal: 1
        },
        // "Трёхпалубный": {
        //     nums: 1,
        //     position: 1
        // },
        // "Четырёхпалубный": {
        //     nums: 1,
        //     position: 1
        // },
    };
    let count = 1;
    return {
        /* * 
         * Рисуем карту и расставляем корабли для пользователя и компьютера
         *
         */
        randerMap: function() {
            let str = '';
            let fullMap = '';
            /* Проходим по пользователем */
            for (let player in players) {
                if (count == 1) {
                    fullMap = emptySeaMap;
                    for (let ship in ships) {
                        let shipsTypes = ships[ship];
                        for (let shipsType in shipsTypes) {
                            let countShip = shipsTypes.nums;
                            let shipPal = shipsTypes.pal;
                            let result = this.randomCell();
                            this.crateMap(result[0], result[1], fullMap, countShip, shipPal);
                        }
                    }
                } else if (count == 2) {
                    fullMap = compSeaMap;
                    for (let ship in ships) {
                        let shipsTypes = ships[ship];
                        for (let shipsType in shipsTypes) {
                            let countShip = shipsTypes.nums;
                            let shipPal = shipsTypes.pal;
                            let result = this.randomCell();
                            this.crateMap(result[0], result[1], fullMap, countShip, shipPal);
                        }
                    }
                }
                let mapSize = Object.keys(fullMap).length;
                /* Пишем имена пользователей в соответствующем блоке */
                let userMap = document.getElementById(player);
                let div = document.createElement('h3');
                div.innerHTML = players[player];
                userMap.appendChild(div);
                /* Проходим по всему полю */
                for (let i = 1; i <= mapSize; i++) {
                    let mapRow = fullMap[i];
                    /* Проходим по строке поля */
                    for (let j = 0; j < mapRow.length; j++) {
                        /* Рисуем клетку */
                        let span = document.createElement('div');
                        span.className = "col-1 " + player + ' act_' + fullMap[i][j];
                        if (fullMap[i][j] == 1) {
                            span.dataset.status = 1;
                        } else {
                            span.dataset.status = 0;
                        }
                        userMap.appendChild(span);
                    }
                }
                count++;
            }
            let hodSection = document.getElementById("hod");
            hodSection.innerHTML =
                'Поля построены, карабли расставлены...';
        },
        crateMap: function(row, cell, pole, dots, pal) {
            let mapSize = Object.keys(emptySeaMap).length;
            for (let i = 1; i <= dots; i++) {
                for (var j = 0; j <= pal; j++) {
                    if (pole[row + j][cell] != 1) {
                        pole[row + j][cell] = 1;
                    }
                }
            }
        },
        /* *
         * Возвращает координаты случайной ячейки [x][y] для расстановки кораблей
         *
         * @param {number} count | Номер игрока (поля)
         * @return {array} cell
         */
        randomCell: function() {
            let row = parseInt(Math.random() * (9 - 1) + 1); // случайная строка
            let cell = parseInt(Math.random() * (10 - 0) + 0); // случайная клетка
            let result = [row, cell];
            return result;
        },
        clickEvent: function() {
            let hodSection = document.getElementById("hod");
            let compCells = document.querySelectorAll('.comp');
            let text = '';
            for (let i = 0; i < compCells.length; i++) {
                compCells[i].addEventListener('click', function() {
                    if (this.dataset.status == 1) {
                        text = "Попал";
                        this.style.backgroundColor = "red";
                    } else {
                        text = "Промах";
                        this.style.backgroundColor = "blue";
                    }
                    hodSection.innerHTML =
                        'Вы произвели выстрел! Результат: <strong>' +
                        text + '</strong>';
                });
            }
        }
    }
}());
seaBattle.randerMap();
seaBattle.clickEvent()