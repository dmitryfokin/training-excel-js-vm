import {numberToLiteralColumn} from '@core/utils'

function getRow( rowInfo, rowData ) {
  return `
    <div class="row" data-row-number="${rowInfo || 0}" data-excel-type="row">
      <div class="row-info">
        ${rowInfo || ''}
        ${rowInfo
    ? `<div class="row-resize" data-resize="row"></div>`
    : ''}
       </div>
      <div class="row-data">${rowData}</div>
    </div> 
  `
}

function getCol( _, i ) {
  return `
    <div class="column" data-col-number="${i + 1}"  data-excel-type="col">
      ${numberToLiteralColumn( i + 1 )}
      <div class="col-resize" data-resize="col"></div>
    </div>`
}

function getCell( _, i ) {
  return `
    <div 
      class="cell" 
      contenteditable = "" 
      data-col-number="${i + 1}" 
      data-excel-type="cell"
    ></div>
  `
}

export function createTable(
  rowsCount = 15,
  colsCount = 28
) {
  const htmlColumns = new Array( colsCount )
    .fill( '' )
    .map( getCol )
    .join( '' )
  const htmlCells = new Array( colsCount )
    .fill( '' )
    .map( getCell )
    .join( '' )

  const arrRow = [getRow( null, htmlColumns )]
  for ( let i = 1; i <= rowsCount; i++ ) {
    arrRow.push( getRow( i, htmlCells ) )
  }

  return arrRow.join( '' )
}
