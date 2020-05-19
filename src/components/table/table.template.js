import {numberToLiteralColumn} from '@core/utils'

function getRow( rowInfo, rowData ) {
  return `
    <div class="row">
      <div class="row-info">${rowInfo || ''}</div>
      <div class="row-data">${rowData}</div>
    </div>&gt;&lt; 
  `
}

function getCol( _, i ) {
  return `<div class="column">${numberToLiteralColumn( i + 1 )}</div>`
}

function getCell() {
  return `<div class="cell" contenteditable = ""></div>`
}

export function createTable( rowsCount = 15, columsCount = 28 ) {
  const htmlColumns = new Array( columsCount )
    .fill( '' )
    .map( getCol )
    .join( '' )
  const htmlCells = new Array( columsCount )
    .fill( '' )
    .map( getCell )
    .join( '' )

  const arrRow = [getRow( null, htmlColumns )]
  for ( let i = 1; i <= rowsCount; i++ ) {
    arrRow.push( getRow( i, htmlCells ) )
  }

  return arrRow.join( '' )
}
