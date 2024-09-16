import CustomConsole from './console.js';

const input_number = document.getElementById( 'promise-c-number' );

// Promise
const promiseC = ( value ) => {
  return new Promise( ( resolve, reject ) => {
    if( value < 1 || value > 100 ){
      reject( '1から100までの数値にしてください' );
    }
    else{
      resolve( value );
    }
  });
};


// イベント用関数
const eventPromiseC = () => {
  CustomConsole.log( '========== promiseC (プロミスチェーン) ==========' );
  const value = input_number.value;

  const promise = promiseC( value );

  promise.then( result => {
    const num = result * 2;
    CustomConsole.log( `then1: ${ result } * 2 == ${ num }`);
    return num;
  })
  .then( result => {
    const num = result + 10;
    CustomConsole.log( `then2: ${ result } + 10 == ${ num }`);
    return num;
  })
  .then( result => {
    const num = result / 2;
    CustomConsole.log( `then3: ${ result } / 2 == ${ num }`);
    return num;
  })
  .then( result => {
    const num = result - value;
    CustomConsole.log( `then4: ${ result } - ${ value } == ${ num }`);
  })
  .catch( error => {
    CustomConsole.error( error );
  });
};


export default {
  eventPromiseC
};
