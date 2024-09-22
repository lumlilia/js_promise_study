import PromiseA from './PromiseA.js';
import PromiseB from './PromiseB.js';
import PromiseC from './PromiseC.js';
import AsyncA from './AsyncA.js';
import CustomConsole from './console.js';
import { writeCode, syntaxHilight } from './code.js';

writeCode();
const code_elements = document.getElementsByTagName( 'code' );
for( const element of code_elements ){
  element.innerHTML = syntaxHilight( element.innerHTML );
};

AsyncA.setAsyncASelect();


const console_clear_button = document.getElementById( 'console-clear-button' );
const promise_a_buttons = document.getElementsByClassName( 'promise-a-buttons' );
const promise_b_buttons = document.getElementsByClassName( 'promise-b-buttons' );
const promise_c_button = document.getElementById( 'promise-c-button' );
const async_a_button = document.getElementById( 'async-a-button' );

console_clear_button.addEventListener( 'click', () => {
  CustomConsole.clear();
} );


promise_a_buttons[0].addEventListener( 'click', () => {
  PromiseA.eventPromiseA();
} );

promise_a_buttons[1].addEventListener( 'click', () => {
  PromiseA.eventPromiseAUseAwait();
} );

for( let i = 0; i < 4; i++ ){
  promise_b_buttons[ i ].addEventListener( 'click', () => {
    PromiseB.eventPromiseB( i );
  } );
}

promise_c_button.addEventListener( 'click', () => {
  PromiseC.eventPromiseC();
} );

async_a_button.addEventListener( 'click', () => {
  AsyncA.eventAsyncA();
} );
