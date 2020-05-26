export function shouldResize( event ) {
  return 'resize' in event.target.dataset
}

export function shouldCell( event ) {
  return 'excelType' in event.target.dataset
    && event.target.dataset.excelType === 'cell'
}

export function cellXY( $el ) {
  const [rowNumber, colNumber] = $el.data.cellId.split( ':' ).map( v => +v )
  return {rowNumber, colNumber}
}
