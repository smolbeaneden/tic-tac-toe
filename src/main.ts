import './style.css'

class Controller {
    boardSize: number;
    turn: number;
    board: Array<Array<number>>;
    cells: HTMLCollectionOf<Element>;

    constructor() {
        this.boardSize = 2;
        this.turn = 1;
        this.board = [];
        this.cells = document.getElementsByClassName('cell');

        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].textContent = "";
        }
        for (let i = 0; i <= this.boardSize; i++) {
            this.board[i] = [];
            for (let j = 0; j <= this.boardSize; j++) {
                this.board[i][j] = 0;
            }
        }
        console.log(this.board);
        this.hoverColor();
        this.removeListeners();
        this.getPlace()
    }

    getPlace(): void {
        for (let i: number = 0; i < this.cells.length; i++) {
            this.cells[i].addEventListener('click', () => { // כשמגדירים את הקונטרולר מחדש אז הevent listener לא נמחק ולכן שומר על הערכים הקודמים של הלוח, ולא את החדשים. לכן צריך לאפס את הevent listeners כל פעם כשנגמר משחק או כשלוחצים new game
                if (this.checkEmpty(i)) {
                    this.clickAction(i);
                }
            })
        }
    }

    clickAction(num: number): void {
        this.cells[num].innerHTML = this.getTurn(this.turn);
        this.board[Math.floor(num / 3)][num % 3] = this.turn;
        console.log(this.board);
        let winner = this.cellValue(this.checkWin());
        if (winner !== "") {
            alert(`${winner} won!`);
            this.removeListeners();
        } else {
            let tie = true;
            for (let i = 0; i < this.cells.length; i++) {
                if (this.checkEmpty(i)) {
                    tie = false;
                }
            }
            if (tie) {
                alert("it's a tie!");
                this.removeListeners();
            }
        }
        this.turn *= -1;
        this.hoverColor();
    }

    hoverColor(): void {
        const values: Record<string, string> = {
            X: "#bfddb9",
            O: "#d196a8"
        }
        document.documentElement.style.setProperty("--cell-hover-color", values[this.getTurn(this.turn)]);
    }

    boardValue(value: string): number {
        const values: Record<string, number> = {
            "X": 1,
            "O": -1
        };
        return values[value];
    }

    checkEmpty(num: number): boolean {
        let cellValue = this.cells[num].textContent;
        return cellValue === "" ? true : false;
    }
    getTurn(num: number = -1 | 1): string {
        if (num == -1) {
            return "O";
        }
        if (num == 1) {
            return "X";
        }
        throw Error;
    }
    cellValue(num: number = 1 | -1 | 0):  string {
        if (num == -1) {
            return "O";
        }
        if (num == 1) {
            return "X";
        }
        if (num == 0) {
            return "";
        }
        throw Error;
    }

    checkWin() {
        let row: Array<number> = [], column: Array<number> = [];
        let diagonal1: Array<number> = [], diagonal2: Array<number> = [];
        console.log(this.board);
        for (let i = 0; i <= this.boardSize; i++) {
            diagonal1.push(this.board[i][i]);
            diagonal2.push(this.board[i][this.boardSize - i]);
            row = [];
            column = [];
            for (let j = 0; j <= this.boardSize; j++) {
                row.push(this.board[i][j]);
                column.push(this.board[j][i]);
            }
            if (Math.abs(row[0] + row[1] + row[2]) == 3) {
                return row[0];
            }
            if (Math.abs(column[0] + column[1] + column[2]) == 3) {
                return column[0];
            }
        }
        if (Math.abs(diagonal1[0] + diagonal1[1] + diagonal1[2]) == 3) {
            return diagonal1[0];
        }
        if (Math.abs(diagonal2[0] + diagonal2[1] + diagonal2[2]) == 3) {
            return diagonal2[0];
        }
        return 0;
    }

    removeListeners() {
        for (let i = 0; i < this.cells.length; i++) {
            let old_element = this.cells[i];
            let new_element = old_element.cloneNode(true);
            old_element.parentNode.replaceChild(new_element, old_element);
        }
    }
}

const start = () => {
    const controller : Controller = new Controller();
};

document.getElementById("newGame")?.addEventListener("click", start);
start();