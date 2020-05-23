import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldCell, shouldResize} from '@/components/table/table.function'
import {TableSelected} from '@/components/table/TableSelected'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  constructor( $root ) {
    super( $root, {
      name: 'Table',
      listeners: ['mousedown'],
    } )
  }

  static className = 'excel__table'

  toHTML() {
    return createTable()
  }

  prepare() {
    this.selection = new TableSelected( this.$root )
  }

  init() {
    super.init()

    const $cell = this.$root.find( '[data-cell-id="1:1"]' )
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
}
