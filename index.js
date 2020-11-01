'use strict';
console.log('Lets get this game started');

let player = 'circle';

const statusElm = document.querySelector('.status');
const btnElm = document.querySelectorAll('button');

const play = (event) => {
  if (player === 'circle') {
    event.target.classList.toggle('grid--circle');
    player = 'cross';
    statusElm.innerHTML = `<p> HRAJE: <img class="cross" src="cross.svg" alt="krizek" /> 
    </p>`;
    event.target.disabled = true;
  } else if (player === 'cross') {
    event.target.classList.toggle('grid--cross');
    player = 'circle';
    statusElm.innerHTML = `<p> HRAJE: <img class="circle" src="circle.svg" alt="kolecko" /> 
    </p>`;
    event.target.disabled = true;
  }
  if (isWinningMove(event.target)) {
    if (event.target.classList.contains('grid--cross')) {
      confirm('Vyhrává křížek! Sláva vítězům, spustit novou hru poraženým?');
    } else if (event.target.classList.contains('grid--circle')) {
      confirm('Vyhrává kolečko! Sláva vítězům, spustit novou hru poraženým?');
    }
  }
}; //pridat reload//

for (let i = 0; i < btnElm.length; i++) {
  btnElm[i].addEventListener('click', play);
}

const boardSize = 10; // 10x10

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < btnElm.length) {
    if (field === btnElm[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const getField = (row, column) => btnElm[row * boardSize + column];

const getSymbol = (field) => {
  if (field.classList.contains('grid--cross')) {
    return 'cross';
  } else if (field.classList.contains('grid--circle')) {
    return 'circle';
  }
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};
