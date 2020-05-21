import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'

export class Table extends ExcelComponent {
  constructor( $root ) {
    super( $root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup'],
    } )

    this.onMousemove = this.onMousemove.bind( this )
  }

  static className = 'excel__table'

  toHTML() {
    return createTable()
  }

  onMousedown( event ) {
    event.stopPropagation()
    event.preventDefault()
    if ( 'resize' in event.target.dataset ) {
      event.target.style.opacity = 1
      const resizeCol = event.target.dataset.resize === 'col'
      this.resizeSettings = {
        resizeCol: resizeCol,
        mouseStart: resizeCol ? event.clientX : event.clientY,
        $el: event.target,
      }
      this.$root.on( 'mousemove', this.onMousemove )
    }
  }

  onMouseup( event ) {
    event.stopPropagation()
    event.preventDefault()

    if ( this.resizeSettings ) {
      this.$root.off( 'mousemove', this.onMousemove )
      this.resizeSettings.resizeTable = true
      this.resizeSettings.$el.style.removeProperty( 'opacity' )
      resizing( this.resizeSettings, event )
      this.resizeSettings = null
    }
  }

  onMousemove( event ) {
    event.stopPropagation()
    event.preventDefault()

    resizing( this.resizeSettings, event )
  }
}

function resizing( resizeSettings, event ) {
  const resizeCol = resizeSettings.resizeCol
  const xy = resizeCol ? event.clientX : event.clientY

  if ( resizeSettings.resizeTable ) {
    const $elParent = resizeCol
      ? resizeSettings.$el.closest( '[data-excel-type="col"]' )
      : resizeSettings.$el.closest( '[data-excel-type="row"]' )
    const heightStart = resizeCol
      ? $elParent.offsetWidth
      : $elParent.offsetHeight
    $elParent.style[resizeCol ? 'width' : 'height'] =
      (+heightStart + xy - resizeSettings.mouseStart) + 'px'

    resizeSettings.$el.style[resizeCol ? 'right' : 'bottom'] = 0
  } else {
    resizeSettings.$el.style[resizeCol ? 'right' : 'bottom'] =
      (resizeSettings.mouseStart - xy) + 'px'
  }
}
