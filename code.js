import code_texts from './code_texts.js';

const hilight_list = {
  stringcode: {
    reg: new RegExp( '(?<=`[^\n]*?)(\\\$\{[^\n]*?\})(?=[^\n]*?`)', 'g' ),
    color: '#dd5000',
    argc: 1,
  },
  string: {
    reg: new RegExp( '(?<!^.*\/\/.*)((\'|`)[^\n]*?(\'|`))', 'gm' ),
    color: '#008000',
    argc: 1,
  },
  comment: {
    reg: new RegExp( '(\/\/[^\n]*?$)', 'gm' ),
    color: '#808080',
    argc: 1,
  },
  func: {
    reg: new RegExp( '(?<=^| )(if|else|for|while|switch|try|catch|finally)(?=( |\\\()|\\\{)', 'gm' ),
    color: '#0050dd',
    argc: 1,
  },
  etc: {
    reg: new RegExp( '(?<=^| )((const|let|return|async|await|new) )', 'gm' ),
    color: '#dd5000',
    argc: 1,
  },
};


export const syntaxHilight = ( text ) => {
  let t = text;
  for( let key in hilight_list ){
    if( key == 'stringcode' ){

    }
    t = t.replace(
      hilight_list[ key ].reg, 
      `<span style="color:${ hilight_list[ key ].color };">$${ hilight_list[ key ].argc }</span>`
    );
    if( key == 'stringcode' ){
    }
    else if( key == 'string' ){
    }
  }

  return t;
};


export const writeCode = () => {
  const sample_pres = document.getElementsByClassName( 'sample-pres' );

  for( let i = 0; i < sample_pres.length; i++ ){
    if( !code_texts[ i ] ){
      break;
    }
    const t = code_texts[ i ];

    const c = document.createElement( 'code' );
    c.innerHTML = t;
    sample_pres[ i ].appendChild( c );
  }
};
