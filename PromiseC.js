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


// 計算用の関数
const promiseCCalc = ( count, values ) => {
  let before_number = values.result;
  let resolve_text = '';

  return new Promise( ( resolve, reject ) => {
    setTimeout( () => {
      switch( count ){
        case 1:
          values.result *= 2;
          resolve_text = `then1: ${ before_number } * 2 == ${ values.result }`;
          break;
        case 2:
          values.result += 10;
          resolve_text = `then2: ${ before_number } + 10 == ${ values.result }`;
          break;
        case 3:
          values.result /= 2;
          resolve_text = `then3: ${ before_number } / 2 == ${ values.result }`;
          break;
        case 4:
          values.result -= values.initial_value;
          resolve_text = `then4: ${ before_number } - ${ values.initial_value } == ${ values.result }`;
          break;
      }

      resolve( resolve_text );
    }, 500 );
  });
}


let is_running = false;

// イベント用関数
const eventPromiseC = () => {
  if( is_running ){
    return;
  }

  is_running = true;
  CustomConsole.log( '========== promiseC (プロミスチェーン) ==========' );
  const values = {
    result: input_number.value,
    initial_value: input_number.value
  };

  const promise = promiseC( values.result );

  promise.then( result => {
    CustomConsole.log( `${ result } を 5 にするよ！` );
    return promiseCCalc( 1, values );
  })
  .then( result => {
    CustomConsole.log( result );
    return promiseCCalc( 2, values );
  })
  .then( result => {
    CustomConsole.log( result );
    return promiseCCalc( 3, values );
  })
  .then( result => {
    CustomConsole.log( result );
    return promiseCCalc( 4, values );
  }).then( result => {
    CustomConsole.log( result );
    CustomConsole.log( '---------- プロミスチェーンおしまい ----------' );
    is_running = false;
  })
  .catch( error => {
    CustomConsole.error( error );
  });

  CustomConsole.log( 'イベントおしまい。Promiseあとは頼んだぞ！' );
};


export default {
  eventPromiseC
};
