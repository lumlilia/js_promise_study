export default [
// PromiseA
  `// チェックボックスを取得
const promise_a_checkbox = document.getElementById( 'promise-a-checkbox' );


// Promise
const promiseA = () => {
  return new Promise( ( resolve, reject ) => {
    console.log( 'promiseA を開始します' );

    if( !promise_a_checkbox.checked ){
      console.log( 'checkbox は false' );
      reject( 'エラーです' );
    }
    else{
      console.log( 'checkbox は true' );
      resolve( '成功です' );
    }

    console.log( 'promiseA が完了しました' );
  } );
}


// clickイベント(awaitなし)
promise_a_buttons[0].addEventListener( 'click', () => {
  console.log( '========== promiseA ==========' );
  console.log( 'イベント開始' );

  promiseA().then( result => {
    console.log( result );
  } ) .catch( error => {
    console.error( error );
  } ) .finally( () => {
    console.log( 'finally!!' );
  } );

  console.log( 'イベント終了' );
} );


// clickイベント(awaitあり)
promise_a_buttons[1].addEventListener( 'click', async () => {
  console.log( '========== promiseA (await) ==========' );
  console.log( 'イベント開始' );

  await promiseA().then( result => {
    console.log( result );
  } ) .catch( error => {
    console.error( error );
  } ) .finally( () => {
    console.log( 'finally!!' );
  } );

  console.log( 'イベント終了' );
} );`,



// PromiseB
  `// チェックボックスを取得
const checkboxes = document.getElementsByClassName( 'promise-b-checkboxes' );

// Promise
const promiseB = ( count ) => {
  const checkboxes_values = [];
  for( let i = 0; i < 3; i++ ){
    checkboxes_values.push( checkboxes[i].checked );
  };

  return [
    new Promise( ( resolve, reject ) => {
      console.log( \`promiseB-1(\${ count }) を開始します\` );
      setTimeout( () => {
        if( checkboxes_values[ 0 ] ){
          console.log( \`promiseB-1(\${ count }) が完了しました\` );
          resolve( \`1(\${ count })\` );
        }
        else{
          console.error( \`promiseB-1(\${ count }) が完了しました\` );
          reject( \`1(\${ count }) (reject)\` );
        }
      }, 2000 );
    } ), 

    new Promise( ( resolve, reject ) => {
      console.log( \`promiseB-2(\${ count }) を開始します\` );
      setTimeout( () => {
        if( checkboxes_values[ 1 ] ){
          console.log( \`promiseB-2(\${ count }) が完了しました\` );
          resolve( \`2(\${ count })\` );
        }
        else{
          console.error( \`promiseB-2(\${ count }) が完了しました\` );
          reject( \`2(\${ count }) (reject)\` );
        }
      }, 1000 );
    } ),

    new Promise( ( resolve, reject ) => {
      console.log( \`promiseB-3(\${ count }) を開始します\` );
      setTimeout( () => {
        if( checkboxes_values[ 2 ] ){
          console.log( \`promiseB-3(\${ count }) が完了しました\` );
          resolve( \`3(\${ count })\` );
        }
        else{
          console.error( \`promiseB-3(\${ count }) が完了しました\` );
          reject( \`3(\${ count }) (reject)\` );
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
  console.log( \`========== promiseB No.\${ count } (\${ method_names[ button_number ] }) ==========\` );

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
      console.log( \`---------- result: \${ JSON.stringify( result ) } -----------\` );
    }
    else{
      console.log( \`---------- result: \${ result } -----------\` );
    }
  } ) .catch( error => {
    if( typeof result === 'object' ){
      console.error( \`---------- result: \${ JSON.stringify( error ) } ----------\` );
    }
    else{
      console.error( \`---------- result: \${ error } ----------\` );
    }
  } );
}`,


// PromiseC
`// 入力欄を取得
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
  } );
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
          resolve_text = \`then1: \${ before_number } * 2 == \${ values.result }\`;
          break;
        case 2:
          values.result += 10;
          resolve_text = \`then2: \${ before_number } + 10 == \${ values.result }\`;
          break;
        case 3:
          values.result /= 2;
          resolve_text = \`then3: \${ before_number } / 2 == \${ values.result }\`;
          break;
        case 4:
          values.result -= values.initial_value;
          resolve_text = \`then4: \${ before_number } - \${ values.initial_value } == \${ values.result }\`;
          break;
      }

      resolve( resolve_text );
    }, 500 );
  } );
}


let is_running = false;

// イベント用関数
const eventPromiseC = () => {
  if( is_running ){
    return;
  }

  is_running = true;
  console.log( '========== promiseC (プロミスチェーン) ==========' );
  const values = {
    result: input_number.value,
    initial_value: input_number.value
  };

  const promise = promiseC( values.result );

  promise.then( result => {
    console.log( \`\${ result } を 5 にするよ！\` );
    return promiseCCalc( 1, values );
  } )
    .then( result => {
      console.log( result );
      return promiseCCalc( 2, values );
    } )
    .then( result => {
      console.log( result );
      return promiseCCalc( 3, values );
    } )
    .then( result => {
      console.log( result );
      return promiseCCalc( 4, values );
    } )
    .then( result => {
      console.log( result );
      console.log( '---------- プロミスチェーンおしまい ----------' );
      is_running = false;
    } )
    .catch( error => {
      console.error( error );
    } );

  console.log( 'イベントおしまい。Promiseあとは頼んだぞ！' );
};`,


// asyncA
`// セレクトボックスを取得
const select_box = document.getElementById( 'async-a-select' );

// 選択肢のリスト
const animals = [
  'ねこ', 'いぬ', 'たぬき', 'きつね'
];


let is_running = false;

// Promise
const asyncA = async () => {
  const select_value = select_box.value;

  try{
    for( const item of animals ){  // forを使ってPromiseを繰り返すことができます
      const result = await new Promise( ( resolve, reject ) => {  // awaitを付けるのを忘れずに！
        setTimeout( () => {
          if( select_value == item ){
            reject( \`君は\${ item }だ！！\` );  // エラーとしてcatchに飛ばされます
          }
          else{
            resolve( \`君は\${ item }ではないね\` );  // そのまま次の処理に進みます
          }
        }, 500 );
      } );

      console.log( result );
    };
  }
  catch( error ){
    console.error( error );
  }

  console.log( '---------- asyncAおしまい ----------' );
  is_running = false;
};


// イベント用関数
const eventAsyncA = () => {
  if( is_running ){
    return;
  }

  is_running = true;
  console.log( '========== asyncA ==========' );
  const a = asyncA();
  console.log( 'イベントおしまい。asyncくんファイトー！！' );
};`
];
