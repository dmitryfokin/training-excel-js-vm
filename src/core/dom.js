class Dom {
  constructor( selector ) {
    this.$el = typeof selector === 'string'
      ? document.querySelector( selector )
      : selector
  }

  html( html ) {
    if ( typeof html === 'string' ) {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html( '' )
    return this
  }

  on( eventType, callback ) {
    this.$el.addEventListener( eventType, callback )
  }

  off( eventType, callback ) {
    this.$el.removeEventListener( eventType, callback )
  }

  get data() {
    return this.$el.dataset
  }

  closest( selector ) {
    return $( this.$el.closest( selector ) )
  }

  get coord() {
    return this.$el.getBoundingClientRect()
  }

  findAll( selector ) {
    const arr = []
    this.$el.querySelectorAll( selector )
      .forEach( $el => arr.push( $( $el ) ) )
    return arr
  }

  find( selector ) {
    return $( this.$el.querySelector( selector ) )
  }

  css( styles = {} ) {
    Object.keys( styles ).forEach( nameStyle => {
      this.$el.style[nameStyle] = styles[nameStyle]
    } )
  }

  addClass( className ) {
    this.$el.classList.add( className )
  }

  removeClass( className ) {
    this.$el.classList.remove( className )
  }

  append( node ) {
    const $node = node instanceof Dom
      ? node.$el
      : node

    if ( Element.prototype.append ) {
      this.$el.append( $node )
    } else {
      this.$el.appendChild( $node )
    }

    return this
  }
}

export function $( selector ) {
  return new Dom( selector )
}

$.create = ( tagName, classes = '' ) => {
  const el = document.createElement( tagName )
  if ( classes ) {
    el.classList.add( classes )
  }
  return $( el )
}
