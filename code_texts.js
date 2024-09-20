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
  });
}


// clickイベント(awaitなし)
promise_a_buttons[0].addEventListener( 'click', () => {
  console.log( '========== promiseA ==========' );
  console.log( 'イベント開始' );

  promiseA().then( result => {
    console.log( result );
  }) .catch( error => {
    console.error( error );
  }) .finally( () => {
    console.log( 'finally!!' );
  });

  console.log( 'イベント終了' );
});


// clickイベント(awaitあり)
promise_a_buttons[1].addEventListener( 'click', async () => {
  console.log( '========== promiseA (await) ==========' );
  console.log( 'イベント開始' );

  await promiseA().then( result => {
    console.log( result );
  }) .catch( error => {
    console.error( error );
  }) .finally( () => {
    console.log( 'finally!!' );
  });

  console.log( 'イベント終了' );
});`,



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
    }), 

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
    }),

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
    }),
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
  }) .catch( error => {
    if( typeof result === 'object' ){
      console.error( \`---------- result: \${ JSON.stringify( error ) } ----------\` );
    }
    else{
      console.error( \`---------- result: \${ error } ----------\` );
    }
  });
}`,



// promiseC
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
  });
};


// イベント用関数
const eventPromiseC = () => {
  console.log( '========== promiseC (プロミスチェーン) ==========' );
  const value = input_number.value;

  const promise = promiseC( value );

  promise.then( result => {
    const num = result * 2;
    console.log( \`then1: \${ result } * 2 == \${ num }\`);
    return num;
  })
  .then( result => {
    const num = result + 10;
    console.log( \`then2: \${ result } + 10 == \${ num }\`);
    return num;
  })
  .then( result => {
    const num = result / 2;
    console.log( \`then3: \${ result } / 2 == \${ num }\`);
    return num;
  })
  .then( result => {
    const num = result - value;
    console.log( \`then4: \${ result } - \${ value } == \${ num }\`);
  })
  .catch( error => {
    console.error( error );
  });
};`
];
