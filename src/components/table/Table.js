import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldCell, shouldResize} from '@/components/table/table.function'
import {TableSelected} from '@/components/table/TableSelected'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  constructor( $root, options ) {
    super( $root, {
        name: 'Table',
        listeners: ['mousedown', 'keydown', 'input'],
        ...options,
      }
    )
  }

  static
  className = 'excel__table'

  toHTML() {
    return createTable()
  }

  prepare() {
    this.selection = new TableSelected(
      this.$root,
      {
        $emit: this.$emit.bind( this ),
        $on: this.$on.bind( this ),
      }
    )
  }

  init() {
    super.init()

    const $cell = this.$root.find( '[data-cell-id="1:1"]' )
    this.$on(
      'formula:input',
      value => this.selection.cell.text( value ) )
    this.$on(
      'formula:enter',
      () => this.selection.cell.focus()
    )
    this.selection.select( $cell )
  }

  onMousedown( event ) {
    if ( shouldResize( event ) ) {
      resizeHandler( this.$root, event )
    } else if ( shouldCell( event ) ) {
      if ( event.ctrlKey ) {
        this.selection.selectGroupCtrl( $( event.target ) )
      } else if ( event.shiftKey ) {
        this.selection.selectGroupShift( $( event.target ) )
      } else {
        this.selection.select( $( event.target ) )
      }
    }
  }

  onKeydown( event ) {
    if ( shouldCell( event ) ) {
      if ( TableSelected.keyArr.includes( event.key ) ) {
        this.selection.onKeydown( event )
      }
    }
  }

  onInput( event ) {
    if ( shouldCell( event ) ) {
      if ( !TableSelected.keyArr.includes( event.key ) ) {
        const value = event.target.textContent.trim()
        this.$emit( 'cell:input', value )
      }
    }
  }
}
