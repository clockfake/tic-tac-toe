import React from 'react';
import Board from './Board.js';
import {maxCols,maxRows} from './index.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    let initialArray = Array(maxRows);
    for (let i = 0; i<initialArray.length; i++) {
    	initialArray[i] = new Array(maxCols).fill(0);
    }
    this.state= {
      cells: initialArray.slice(),
      history: [],
      turnOfX: true,
      winner: null
    }
  }

  handleClick(row_index,col_index) {
    let cells = this.state.cells.slice();
    if ((cells[row_index][col_index] > 0)||(this.state.winner)) return;
    cells[row_index][col_index] = this.state.turnOfX ? 1 : 2;
    let winner = checkforwin(cells,row_index,col_index) ? this.state.turnOfX : null;
    let history = this.state.history.slice();
    history.push([row_index,col_index]);
    this.setState({
      cells: cells,
      history: history,
      turnOfX: !this.state.turnOfX,
      winner: winner
    });
  }

  handlePrev() {
    if (this.state.history.length == 0) return;
    let cells = this.state.cells.slice();
    let history = this.state.history.slice();
    let lastCell = history.pop();
    cells[lastCell[0]][lastCell[1]] = 0;
    this.setState({
      cells: cells,
      history: history,
      turnOfX: !this.state.turnOfX,
      winner: null
    });
  }

  render() {
    let message = '';
    if (this.state.winner) {message = 'Winner is ' + (this.state.turnOfX? 'O':'X')} else {
      message = 'Current turn is ' + (this.state.turnOfX? 'X':'O');
    };
    return (
      <div className="game__board">
        <Board cells={this.state.cells} onClick={(row_index,col_index) => this.handleClick(row_index,col_index)} />
        <div className="game__turn-helper">
          {message}
        </div>
        <button className="game__to-prev-turn" onClick={() => this.handlePrev()}>Go to previous turn</button>
      </div>
    );
  }
}

function checkforwin(board,check_row,check_col) {
	for (let i=0;i<5;i++) {
  	let c1;
    let c2;
    let c3;
    let c4;
    let c5;
  	//horisontal check
    if((check_col-4+i>=0) && (+check_col+i<maxCols)) {
  	c1=board[check_row][+check_col-4+i];
    c2=board[check_row][+check_col-3+i];
    c3=board[check_row][+check_col-2+i];
    c4=board[check_row][+check_col-1+i];
    c5=board[check_row][+check_col+i];
  	 if (wincondition(c1,c2,c3,c4,c5)) return true;
     }

    //vertical check
    if((check_row-4+i>=0) && (+check_row+i<maxRows)) {
    c1=board[check_row-4+i][check_col];
    c2=board[check_row-3+i][check_col];
    c3=board[check_row-2+i][check_col];
    c4=board[check_row-1+i][check_col];
    c5=board[+check_row+i][check_col];
    	if (wincondition(c1,c2,c3,c4,c5)) return true;
    }

    //diagonal right down check
    if((check_row-4+i>=0) && (+check_row+i<maxRows) && (check_col-4+i>=0) && (+check_col+i<maxCols)) {
    c1=board[check_row-4+i][check_col-4+i];
    c2=board[check_row-3+i][check_col-3+i];
    c3=board[check_row-2+i][check_col-2+i];
    c4=board[check_row-1+i][check_col-1+i];
    c5=board[+check_row+i][+check_col+i];
  	 if (wincondition(c1,c2,c3,c4,c5)) return true;
    }

    //diagonal right up check
    if((+check_row+4-i<maxRows) && (check_row-i>=0) && (check_col-4+i>=0) && (+check_col+i<maxCols)) {
    c1=board[+check_row+4-i][check_col-4+i];
    c2=board[+check_row+3-i][check_col-3+i];
    c3=board[+check_row+2-i][check_col-2+i];
    c4=board[+check_row+1-i][check_col-1+i];
    c5=board[check_row-i][+check_col+i];
  	 if (wincondition(c1,c2,c3,c4,c5)) return true;
    }
  }
  return false;
}

function wincondition(cell1,cell2,cell3,cell4,cell5) {
	if ((cell1 == cell2) &&
  (cell1 == cell3) &&
  (cell1 == cell4) &&
  (cell1 == cell5)) {
  	return true;
  }
  return false;
}
