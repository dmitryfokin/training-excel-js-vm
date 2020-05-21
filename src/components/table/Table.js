import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
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

  onMousedown( event ) {
    const target = $( event.target )
    const isCol = target.data.resize === 'col'
    const startPosition = isCol ? target.coord.right : target.coord.bottom
    const parent = isCol
      ? target.closest( '[data-excel-type="col"]' )
      : target.closest( '[data-excel-type="row"]' )

    if ( 'resize' in target.data ) {
      target.$el.style.opacity = 1

      document.onmousemove = e => {
        if ( isCol ) {
          const delta = e.clientX - startPosition
          target.$el.style.right = -delta + 'px'
        } else {
          const delta = e.clientY - startPosition
          target.$el.style.bottom = -delta + 'px'
        }
      }

      document.onmouseup = e => {
        document.onmousemove = null
        document.onmouseup = null

        target.$el.style.removeProperty( 'opacity' )

        if ( isCol ) {
          const delta = e.clientX - startPosition
          target.$el.style.right = 0
          parent.$el.style.width = parent.$el.offsetWidth + delta + 'px'

          this.$root.$el.querySelectorAll(
            `[data-col-number="${parent.data.colNumber}"]`
          )
            .forEach( $cell => {
              $cell.style.width = parent.$el.style.width
            } )
        } else {
          const delta = e.clientY - startPosition
          target.$el.style.bottom = 0
          parent.$el.style.height = parent.$el.offsetHeight + delta + 'px'
        }
      }
    }
  }
}

