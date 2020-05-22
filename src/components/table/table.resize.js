import {$} from '@core/dom'

export function resizeHandler( $root, event ) {
  const target = $( event.target )
  target.css( {opacity: 1} )
  const isCol = target.data.resize === 'col'
  const startPosition = isCol ? target.coord.right : target.coord.bottom
  const parent = isCol ?
    target.closest( '[data-excel-type="col"]' ) :
    target.closest( '[data-excel-type="row"]' )

  document.onmousemove = e => {
    if ( isCol ) {
      const delta = e.clientX - startPosition
      target.css( {right: -delta + 'px'} )
    } else {
      const delta = e.clientY - startPosition
      target.css( {bottom: -delta + 'px'} )
    }
  }

  document.onmouseup = e => {
    document.onmousemove = null
    document.onmouseup = null

    target.css( {opacity: null} )

    if ( isCol ) {
      const widthCol = parent.$el.offsetWidth + e.clientX - startPosition
      target.css( {right: 0} )
      parent.css( {width: widthCol + 'px'} )

      $root.findAll(
        `[data-col-number="${parent.data.colNumber}"]`
      )
        .forEach( $cell => {
          $cell.css( {width: widthCol + 'px'} )
        } )
    } else {
      const heightRow = parent.$el.offsetHeight + e.clientY - startPosition
      target.css( {bottom: 0} )
      parent.css( {height: heightRow + 'px'} )
    }
  }
}
