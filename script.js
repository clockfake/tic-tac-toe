var turn_of_X = true;

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
    if((check_col-4+i>=0) && (+check_col+i<20)) {
  	c1=table.rows[check_row].cells[+check_col-4+i];
    c2=table.rows[check_row].cells[+check_col-3+i];
    c3=table.rows[check_row].cells[+check_col-2+i];
    c4=table.rows[check_row].cells[+check_col-1+i];
    c5=table.rows[check_row].cells[+check_col+i];
  	 wincondition(c1,c2,c3,c4,c5);
     }

    //vertical check
    if((check_row-4+i>=0) && (+check_row+i<20)) {
    c1=table.rows[check_row-4+i].cells[check_col];
    c2=table.rows[check_row-3+i].cells[check_col];
    c3=table.rows[check_row-2+i].cells[check_col];
    c4=table.rows[check_row-1+i].cells[check_col];
    c5=table.rows[+check_row+i].cells[check_col];
  	wincondition(c1,c2,c3,c4,c5);
    }

    //diagonal right down check
    if((check_row-4+i>=0) && (+check_row+i<20) && (check_col-4+i>=0) && (+check_col+i<20)) {
    c1=table.rows[check_row-4+i].cells[check_col-4+i];
    c2=table.rows[check_row-3+i].cells[check_col-3+i];
    c3=table.rows[check_row-2+i].cells[check_col-2+i];
    c4=table.rows[check_row-1+i].cells[check_col-1+i];
    c5=table.rows[+check_row+i].cells[+check_col+i];
  	wincondition(c1,c2,c3,c4,c5);
    }

    //diagonal right up check
    if((+check_row+4-i<20) && (check_row-i>=0) && (check_col-4+i>=0) && (+check_col+i<20)) {
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
for (let i=0; i<20; i++) {
	let gaming_field_row = document.createElement("tr");
  for (let j=0; j<20; j++) {
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

for (let i of document.getElementsByTagName('td')) {
	i.onclick=function() {
  	if (this.dataset.checked == 0) {
  		if (turn_of_X) {
      	this.textContent='X';
        this.dataset.checked = 1;
        document.querySelector('.current-turn-flag').textContent = 'O';
      } else {
      	this.textContent='O';
        this.dataset.checked = 2;
        document.querySelector('.current-turn-flag').textContent = 'X';
      }
      checkforwin(i.dataset.row,i.dataset.col);
      turn_of_X = !turn_of_X;
  	}
  }
}
