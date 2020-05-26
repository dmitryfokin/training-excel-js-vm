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
    return this
  }

  off( eventType, callback ) {
    this.$el.removeEventListener( eventType, callback )
    return this
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
    return this
  }

  text( text ) {
    if ( typeof text === 'string' ) {
      this.$el.textContent = text.trim()
      return this
    }
    if ( this.$el.tagName.toLowerCase() === 'input' ) {
      return this.$el.value.trim()
    }

    return this.$el.textContent.trim()
  }

  focus() {
    this.$el.focus()
    return this
  }

  addClass( className ) {
    this.$el.classList.add( className )
    return this
  }

  removeClass( className ) {
    this.$el.classList.remove( className )
    return this
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
