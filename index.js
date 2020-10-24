'use strict';
console.log('Lets get this game started');

let player = 'circle';

const statusElm = document.querySelector('.status');
const btnElm = document.querySelectorAll('button');
console.log(statusElm);
console.log(btnElm);

const play = (event) => {
  if (player === 'circle') {
    event.target.classList.toggle('grid--circle');
    player = 'cross';
    statusElm.innerHTML = `<p> HRAJE: <img class="cross" src="cross.svg" alt="Cross" /> 
    </p>`;
    event.target.disabled = true;
  } else if ((player = 'cross')) {
    event.target.classList.toggle('grid--cross');
    player = 'circle';
    statusElm.innerHTML = `<p> HRAJE: <img class="circle" src="circle.svg" alt="Circle" /> 
    </p>`;
    event.target.disabled = true;
  }
};

for (let i = 0; i < btnElm.length; i++) {
  btnElm[i].addEventListener('click', play);
}
