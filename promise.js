import CustumConsole from './console.js';


// promiseA
const promise_a_checkbox = document.getElementById( 'promise-a-checkbox' );

export const promiseA = () => {
  return new Promise( ( resolve, reject ) => {
    CustumConsole.log( 'promiseA を開始します' );
    if( !promise_a_checkbox.checked ){
      CustumConsole.log( 'checkbox は false' );
      reject( 'エラーです' );
    }
    else{
      CustumConsole.log( 'checkbox は true' );
      resolve( '成功です' );
    }

    CustumConsole.log( 'promiseA が完了しました' );
  });
}


// promiseB
const promise_b_checkboxes = document.getElementsByClassName( 'promise-b-checkboxes' );

export const promiseB = ( count ) => {
  const checkboxes = [];
  for( let i = 0; i < 3; i++ ){
    checkboxes.push( promise_b_checkboxes[i].checked );
  };

  return [
    new Promise( ( resolve, reject ) => {
      CustumConsole.log( `promiseB-1(${ count }) を開始します` );
      setTimeout( () => {
        if( checkboxes[ 0 ] ){
          CustumConsole.log( `promiseB-1(${ count }) が完了しました` );
          resolve( `1(${ count })` );
        }
        else{
          CustumConsole.error( `promiseB-1(${ count }) が完了しました` );
          reject( `1(${ count }) (reject)` );
        }
      }, 2000 );
    }), 

    new Promise( ( resolve, reject ) => {
      CustumConsole.log( `promiseB-2(${ count }) を開始します` );
      setTimeout( () => {
        if( checkboxes[ 1 ] ){
          CustumConsole.log( `promiseB-2(${ count }) が完了しました` );
          resolve( `2(${ count })` );
        }
        else{
          CustumConsole.error( `promiseB-2(${ count }) が完了しました` );
          reject( `2(${ count }) (reject)` );
        }
      }, 1000 );
    }),

    new Promise( ( resolve, reject ) => {
      CustumConsole.log( `promiseB-3(${ count }) を開始します` );
      setTimeout( () => {
        if( checkboxes[ 2 ] ){
          CustumConsole.log( `promiseB-3(${ count }) が完了しました` );
          resolve( `3(${ count })` );
        }
        else{
          CustumConsole.error( `promiseB-3(${ count }) が完了しました` );
          reject( `3(${ count }) (reject)` );
        }
      }, 3000 );
    }),
  ];
};
