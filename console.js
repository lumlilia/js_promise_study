export default class{
  static #console_box = document.getElementById( 'console-box' );
  static #LOG_MAX_COUNT = 50;

  static clear = () => {
    while( this.#console_box.childElementCount > 0 ){
      this.#console_box.removeChild( this.#console_box.firstElementChild );
    }
  };

  static #checkLogCount = ( new_count ) => {
    const element_count = this.#console_box.childElementCount + new_count;
    if( element_count > this.#LOG_MAX_COUNT ){
      for( let i = ( element_count - this.#LOG_MAX_COUNT ); i > 0; i-- ){
        this.#console_box.removeChild( this.#console_box.firstElementChild );
      }
    }
  };

  static #addLogs = ( new_data, err_flag = false ) => {
    let data = new_data;
    if( typeof data === 'object' ){
      data = JSON.stringify( new_data );
    }
    const p_element = document.createElement( 'p' );
    const code_element = document.createElement( 'code' );
    code_element.innerHTML = data;
    p_element.appendChild( code_element );
    if( err_flag ){
      p_element.style.color = 'red';
    }
    this.#console_box.appendChild( p_element );
  };

  static log = ( ...args ) => {
    const argc = args.length;
    this.#checkLogCount( argc );
    for( let data of args ){
      console.log( data );
      this.#addLogs( data );
    }
    this.#console_box.scrollTo( { top: 10000 } );
  };

  static error = ( ...args ) => {
    const argc = args.length;
    this.#checkLogCount( argc );
    for( let data of args ){
      console.error( data );
      this.#addLogs( data, true );
    }
    this.#console_box.scrollTo( { top: 10000 } );
  };
}
