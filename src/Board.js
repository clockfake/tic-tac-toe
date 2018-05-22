import React from 'react';
import {maxCols,maxRows} from './index.js'

export default class Board extends React.Component {
  render() {
    return (
      <table className="game__board">
      <tbody>
      {this.props.cells.map((i,row_index) => {
        return (<tr key = {row_index}>
          {i.map((j,col_index) => {
            let cell_state;
            if (j==1) cell_state = 'game__board-cell--X';
            if (j==2) cell_state = 'game__board-cell--O';
            return (
              <td key={col_index} className={"game__board-cell  "+cell_state} onClick={() => this.props.onClick(row_index,col_index)}></td>
            )
          })}
          </tr>);
      })}
      </tbody>
      </table>
    );
  }
}
