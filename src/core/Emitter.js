export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // Уведомляем о событии подписчиков, если они есть
  emit( event, ...args ) {
    if ( !Array.isArray( this.listeners[event] ) ) {
      return false
    }
    this.listeners[event].forEach( fn => fn( ...args ) )
    return true
  }

  // Подвиска на уведомление новым слушателем
  subscribe( event, fn ) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push( fn )
    return () => {
      this.listeners[event] =
        this.listeners[event].filter( listener => listener !== fn )
    }
  }
}
