import {DOMListener} from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
  constructor( $root, options ) {
    super( $root, options.listeners || [] )
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unSubscribers = []

    this.prepare()
  }

  prepare() {
  }

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  $on( event, fn ) {
    const unsub = this.emitter.subscribe( event, fn )
    this.unSubscribers.push( unsub )
  }

  $emit( event, ...args ) {
    this.emitter.emit( event, ...args )
  }

  destroy() {
    this.removeDOMListeners()
    this.unSubscribers.forEach( fn => fn() )
  }
}
