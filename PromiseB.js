import CustomConsole from './console.js';

const checkboxes = document.getElementsByClassName( 'promise-b-checkboxes' );

// Promise
const promiseB = ( count ) => {
  const checkboxes_values = [];
  for( let i = 0; i < 3; i++ ){
    checkboxes_values.push( checkboxes[i].checked );
  };

  return [
    new Promise( ( resolve, reject ) => {
      CustomConsole.log( `promiseB-1(${ count }) を開始します` );
      setTimeout( () => {
        if( checkboxes_values[ 0 ] ){
          CustomConsole.log( `promiseB-1(${ count }) が完了しました` );
          resolve( `1(${ count })` );
        }
        else{
          CustomConsole.error( `promiseB-1(${ count }) が完了しました` );
          reject( `1(${ count }) (reject)` );
        }
      }, 2000 );
    } ), 

    new Promise( ( resolve, reject ) => {
      CustomConsole.log( `promiseB-2(${ count }) を開始します` );
      setTimeout( () => {
        if( checkboxes_values[ 1 ] ){
          CustomConsole.log( `promiseB-2(${ count }) が完了しました` );
          resolve( `2(${ count })` );
        }
        else{
          CustomConsole.error( `promiseB-2(${ count }) が完了しました` );
          reject( `2(${ count }) (reject)` );
        }
      }, 1000 );
    } ),

    new Promise( ( resolve, reject ) => {
      CustomConsole.log( `promiseB-3(${ count }) を開始します` );
      setTimeout( () => {
        if( checkboxes_values[ 2 ] ){
          CustomConsole.log( `promiseB-3(${ count }) が完了しました` );
          resolve( `3(${ count })` );
        }
        else{
          CustomConsole.error( `promiseB-3(${ count }) が完了しました` );
          reject( `3(${ count }) (reject)` );
        }
      }, 3000 );
    } ),
  ];
};


let count = -1;
const method_names = [
  'all', 'allSettled', 'any', 'race'
];

// イベント用関数
const eventPromiseB = ( button_number ) => {
  count++;
  CustomConsole.log( `========== promiseB No.${ count } (${ method_names[ button_number ] }) ==========` );

  let promises;
  switch( button_number ){
    case 0:
      promises = Promise.all(promiseB( count ));
      break;
    case 1:
      promises = Promise.allSettled(promiseB( count ));
      break;
    case 2:
      promises = Promise.any(promiseB( count ));
      break;
    case 3:
      promises = Promise.race(promiseB( count ));
      break;
  }

  promises.then( result => {
    if( typeof result === 'object' ){
      CustomConsole.log( `---------- result: ${ JSON.stringify( result ) } -----------` );
    }
    else{
      CustomConsole.log( `---------- result: ${ result } -----------` );
    }
  } ).catch( error => {
    if( typeof result === 'object' ){
      CustomConsole.error( `---------- result: ${ JSON.stringify( error ) } ----------` );
    }
    else{
      CustomConsole.error( `---------- result: ${ error } ----------` );
    }
  } );
}


export default {
  eventPromiseB
}
