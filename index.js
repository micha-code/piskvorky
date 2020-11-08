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
      setTimeout(() => {
        window.confirm(`Vyhrává hráč s kolečkem! Spustit novou hru?`);
        location.reload();
      }, 100);
    }
    setTimeout(() => {
      window.confirm(`Vyhrává hráč s kolečkem! Spustit novou hru?`);
      location.reload();
    }, 100);
  }
};

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
  // DIAGONALA//
  // Koukni diagonála "pravá"
  let r;
  let c;
  let symbolsInDiaRight = 1;

  // nahoru doprava
  r = origin.row;
  c = origin.column;
  while (
    r > 0 &&
    c < boardSize - 1 &&
    symbol === getSymbol(getField(r - 1, c + 1))
  ) {
    symbolsInDiaRight += 1;
    r -= 1;
    c += 1;
  }

  // dolu doleva
  r = origin.row;
  c = origin.column;
  while (
    r < boardSize - 1 &&
    c > 0 &&
    symbol === getSymbol(getField(r + 1, c - 1))
  ) {
    symbolsInDiaRight += 1;
    r += 1;
    c -= 1;
  }

  if (symbolsInDiaRight >= symbolsToWin) {
    return true;
  }

  // Koukni diagonála "levá"
  let symbolsInDiaLeft = 1;

  // nahoru doleva
  r = origin.row;
  c = origin.column;
  while (
    r > 0 &&
    c < boardSize - 1 &&
    symbol === getSymbol(getField(r - 1, c - 1))
  ) {
    symbolsInDiaLeft += 1;
    r -= 1;
    c -= 1;
  }

  // dolů doprava
  r = origin.row;
  c = origin.column;
  while (
    r < boardSize - 1 &&
    c > 0 &&
    symbol === getSymbol(getField(r + 1, c + 1))
  ) {
    symbolsInDiaLeft += 1;
    r += 1;
    c += 1;
  }

  //KONEC DIAGONALA//
  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};
