import {capitalize} from '@core/utils'

export class DOMListener {
  constructor( $root, listeners = [] ) {
    if ( !$root ) {
      throw Error( 'No $root provided for DOMListener' )
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach( action => {
      const method = getMethodName( action )
      if ( !this[method] ) {
        throw new Error( `
        Method ${method} is not implemented in ${this.name || ''} component
        ` )
      }
      this[method] = this[method].bind( this )
      this.$root.on( action, this[method] )
    } )
  }

  removeDOMListeners() {
    this.listeners.forEach( action => {
      const method = getMethodName( action )
      if ( !this[method] ) {
        throw new Error( `
        Method ${method} is not implemented in ${this.name || ''} component
        ` )
      }
      this.$root.off( action, this[method] )
    } )
  }
}

function getMethodName( eventName ) {
  return 'on' + capitalize( eventName )
}
