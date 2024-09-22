import CustomConsole from './console.js';


const select_box = document.getElementById( 'async-a-select' );
const animals = [
  'ねこ', 'いぬ', 'たぬき', 'きつね'
];

const setAsyncASelect = () => {
  if( select_box.childElementCount ){
    return;
  }

  animals.forEach( item => {
    const new_option = document.createElement( 'option' );
    new_option.value = item;
    new_option.innerHTML = item;
    select_box.appendChild( new_option );
  } );
}


let is_running = false;

const asyncA = async () => {
  const select_value = select_box.value;

  try{
    for( const item of animals ){
      const result = await new Promise( ( resolve, reject ) => {
        setTimeout( () => {
          if( select_value == item ){
            reject( `君は${ item }だ！！` );
          }
          else{
            resolve( `君は${ item }ではないね` );
          }
        }, 500 );
      } );
      CustomConsole.log( result );
    };
  }
  catch( error ){
    CustomConsole.error( error );
  }

  CustomConsole.log( '---------- asyncAおしまい ----------' );
  is_running = false;
};


const eventAsyncA = () => {
  if( is_running ){
    return;
  }

  is_running = true;
  CustomConsole.log( '========== asyncA ==========' );
  const a = asyncA();
  CustomConsole.log( 'イベントおしまい。asyncくんファイトー！！' );
}


export default {
  setAsyncASelect,
  eventAsyncA,
};
