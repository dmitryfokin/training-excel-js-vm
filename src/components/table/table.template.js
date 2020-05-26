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


function getCell( rowNumber ) {
  return function( _, colNumber ) {
    return `
    <div 
      class="cell" 
      contenteditable = "" 
      data-col-number="${colNumber + 1}" 
      data-row-number="${rowNumber}" 
      data-cell-id="${rowNumber}:${colNumber + 1}" 
      data-excel-type="cell"
    ></div>
  `
  }
}

export function createTable(
  rowsCount = 15,
  colsCount = 28
) {
  const htmlColumns = new Array( colsCount )
    .fill( '' )
    .map( getCol )
    .join( '' )

  const arrRow = [getRow( null, htmlColumns )]
  for ( let rowNumber = 1; rowNumber <= rowsCount; rowNumber++ ) {
    const htmlCells = new Array( colsCount )
      .fill( '' )
      .map( getCell( rowNumber ) )
      .join( '' )

    arrRow.push( getRow( rowNumber, htmlCells ) )
  }

  return arrRow.join( '' )
}
