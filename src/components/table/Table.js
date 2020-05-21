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

    if ( 'resize' in target.data ) {
      const isCol = target.data.resize === 'col'
      const parent = isCol
        ? target.closest( '[data-excel-type="col"]' )
        : target.closest( '[data-excel-type="row"]' )

      const cellsCol = isCol
        ? this.$root.$el.querySelectorAll(
          `[data-col-number="${parent.data.colNumber}"]`
        )
        : null
      target.$el.style.opacity = 1

      let startTime = new Date()
      console.log( startTime )

      document.onmousemove = e => {
        if ( new Date() - startTime < 200 ) {
          return
        }
        // console.log( new Date() - startTime )
        startTime = new Date()

        if ( isCol ) {
          const delta = e.clientX - parent.coord.right
          parent.$el.style.width = parent.$el.offsetWidth + delta + 'px'

          console.log( 'move' )

          cellsCol.forEach( $cell => {
            $cell.style.width = parent.$el.style.width
          } )
        } else {
          const delta = e.clientY - parent.coord.bottom
          parent.$el.style.height = parent.$el.offsetHeight + delta + 'px'
        }
      }

      document.onmouseup = e => {
        document.onmousemove = null
        document.onmouseup = null

        target.$el.style.removeProperty( 'opacity' )

        if ( isCol ) {
          const delta = e.clientX - parent.coord.right
          target.$el.style.right = 0
          parent.$el.style.width = parent.$el.offsetWidth + delta + 'px'

          cellsCol.forEach( $cell => {
            $cell.style.width = parent.$el.style.width
          } )
        } else {
          const delta = e.clientY - parent.coord.bottom
          target.$el.style.bottom = 0
          parent.$el.style.height = parent.$el.offsetHeight + delta + 'px'
        }
      }
    }
  }
}
