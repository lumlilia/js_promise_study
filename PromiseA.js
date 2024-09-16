import CustomConsole from './console.js';


const checkbox = document.getElementById( 'promise-a-checkbox' );

// Promise
const promiseA = () => {
  return new Promise( ( resolve, reject ) => {
    CustomConsole.log( 'promiseA を開始します' );
    if( !checkbox.checked ){
      CustomConsole.log( 'checkbox は false' );
      reject( 'エラーです' );
    }
    else{
      CustomConsole.log( 'checkbox は true' );
      resolve( '成功です' );
    }

    CustomConsole.log( 'promiseA が完了しました' );
  });
}


// イベント用関数
const eventPromiseA = () => {
  CustomConsole.log( '========== promiseA ==========' );
  CustomConsole.log( 'イベント開始' );
  promiseA().then( result => {
    CustomConsole.log( result );
  }) .catch( error => {
    CustomConsole.error( error );
  }) .finally( () => {
    CustomConsole.log( 'finally!!' );
  });
  CustomConsole.log( 'イベント終了' );
}


// イベント用関数 (awaitあり)
const eventPromiseAUseAwait = async () => {
  CustomConsole.log( '========== promiseA (await) ==========' );
  CustomConsole.log( 'イベント開始' );
  await promiseA().then( result => {
    CustomConsole.log( result );
  }) .catch( error => {
    CustomConsole.error( error );
  }) .finally( () => {
    CustomConsole.log( 'finally!!' );
  });
  CustomConsole.log( 'イベント終了' );
}


export default {
  eventPromiseA,
  eventPromiseAUseAwait
};
