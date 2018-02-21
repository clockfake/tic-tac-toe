var turn_of_X = true;
var maxrows = 25;
var maxcols = 25;

function wincondition(cell1,cell2,cell3,cell4,cell5) {

	if ((cell1.dataset.checked == cell2.dataset.checked) &&
  (cell1.dataset.checked == cell3.dataset.checked) &&
  (cell1.dataset.checked == cell4.dataset.checked) &&
  (cell1.dataset.checked == cell5.dataset.checked)) {
  	let alertstr='Congratz, '+cell1.textContent+'-player, you won!';
     alert(alertstr);
     location.reload();
     }
}

function checkforwin(check_row,check_col) {
	for (let i=0;i<5;i++) {
  	let c1;
    let c2;
    let c3;
    let c4;
    let c5;
  	let table=document.querySelector('.gaming-field-table');
  	//horisontal check
    if((check_col-4+i>=0) && (+check_col+i<maxcols)) {
  	c1=table.rows[check_row].cells[+check_col-4+i];
    c2=table.rows[check_row].cells[+check_col-3+i];
    c3=table.rows[check_row].cells[+check_col-2+i];
    c4=table.rows[check_row].cells[+check_col-1+i];
    c5=table.rows[check_row].cells[+check_col+i];
  	 wincondition(c1,c2,c3,c4,c5);
     }

    //vertical check
    if((check_row-4+i>=0) && (+check_row+i<maxrows)) {
    c1=table.rows[check_row-4+i].cells[check_col];
    c2=table.rows[check_row-3+i].cells[check_col];
    c3=table.rows[check_row-2+i].cells[check_col];
    c4=table.rows[check_row-1+i].cells[check_col];
    c5=table.rows[+check_row+i].cells[check_col];
  	wincondition(c1,c2,c3,c4,c5);
    }

    //diagonal right down check
    if((check_row-4+i>=0) && (+check_row+i<maxrows) && (check_col-4+i>=0) && (+check_col+i<maxcols)) {
    c1=table.rows[check_row-4+i].cells[check_col-4+i];
    c2=table.rows[check_row-3+i].cells[check_col-3+i];
    c3=table.rows[check_row-2+i].cells[check_col-2+i];
    c4=table.rows[check_row-1+i].cells[check_col-1+i];
    c5=table.rows[+check_row+i].cells[+check_col+i];
  	wincondition(c1,c2,c3,c4,c5);
    }

    //diagonal right up check
    if((+check_row+4-i<maxrows) && (check_row-i>=0) && (check_col-4+i>=0) && (+check_col+i<maxcols)) {
    c1=table.rows[+check_row+4-i].cells[check_col-4+i];
    c2=table.rows[+check_row+3-i].cells[check_col-3+i];
    c3=table.rows[+check_row+2-i].cells[check_col-2+i];
    c4=table.rows[+check_row+1-i].cells[check_col-1+i];
    c5=table.rows[check_row-i].cells[+check_col+i];
  	wincondition(c1,c2,c3,c4,c5);
    }
  }
}

let gaming_field_table = document.createElement("table");
for (let i=0; i<maxrows; i++) {
	let gaming_field_row = document.createElement("tr");
  for (let j=0; j<maxcols; j++) {
  	let gaming_field_cell = document.createElement("td");
    gaming_field_cell.className = 'gaming-cell';
    gaming_field_cell.dataset.checked = 0;
    gaming_field_cell.dataset.row=i;
    gaming_field_cell.dataset.col=j;
    gaming_field_row.append(gaming_field_cell);
  }
  gaming_field_table.append(gaming_field_row);
}
gaming_field_table.classList.add('gaming-field-table');
document.querySelector('.gaming-field').append(gaming_field_table);

document.querySelector('.gaming-field-table').onclick = function(event) {
		let clickedcell = event.target;
		if ((clickedcell.tagName != 'TD') || (clickedcell.dataset.checked > 0)) return;
  	if (turn_of_X) {
    	clickedcell.textContent='X';
      clickedcell.dataset.checked = 1;
      document.querySelector('.current-turn-flag').textContent = 'O';
    } else {
    	clickedcell.textContent='O';
      clickedcell.dataset.checked = 2;
      document.querySelector('.current-turn-flag').textContent = 'X';
      }
    checkforwin(clickedcell.dataset.row,clickedcell.dataset.col);
    turn_of_X = !turn_of_X;
}

document.querySelector('.refresh').onclick = function() {
		location.reload();
}
