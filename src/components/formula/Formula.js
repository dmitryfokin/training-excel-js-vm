import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor( $root, options ) {
    super( $root, {
      name: 'Formula',
      listeners: [
        'input',
        'keydown',
      ],
      ...options,
    } )
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div 
        class="input" 
        contenteditable 
        spellcheck="false" 
        data-formula-input=""
        >
      </div>
    `
  }

  init() {
    super.init()

    this.$f = $( document.querySelector( '[data-formula-input=""]' ) )

    this.$on(
      'selected:cell',
      $el => this.$f.text( $el.text() )
    )

    this.$on(
      'cell:input',
      value => this.$f.text( value )
    )
  }

  onInput( event ) {
    if ( event.key === 'Enter' && !event.shiftKey ) {
      return
    }

    this.$emit( 'formula:input', $( event.target ).text() )
  }

  onKeydown( event ) {
    if ( (event.key === 'Enter' && !event.shiftKey)
      || event.key === 'Tab' ) {
      event.preventDefault()
      this.$emit( 'formula:enter' )
    }
  }
}
