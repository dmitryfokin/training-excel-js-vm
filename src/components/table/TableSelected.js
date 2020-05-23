import {cellXY} from '@/components/table/table.function'

export class TableSelected {
  static className = 'selected'

  constructor( $root ) {
    this.$root = $root
    this.cellsSelected = []
    this.cellsSelectedGroup = []
    this.cellsSelectedGroupFix = [] // копия перед выделением
    this.lastSelectedGroupFirstCell = null
  }

  select( $el ) {
    this.cell = $el
    this.clearSelected()
    this.cellsSelected.push( $el )
    $el.addClass( TableSelected.className )
    console.log( this.cellsSelected )
  }

  selectGroupCtrl( $el ) {
    this.cell = $el
    this.cellsSelected.push( $el )
    $el.addClass( TableSelected.className )
  }

  selectGroupShift( $el ) {
    if ( this.lastSelectedGroupFirstCell !== this.cell ) {
      this.cellsSelectedGroup = []
      this.lastSelectedGroupFirstCell = this.cell
      this.cellsSelectedGroupFix = [...this.cellsSelected]
    }

    // удалить все selected, в последнем выделении
    this.cellsSelectedGroup.forEach( $elClear => {
      console.log( this.cellsSelectedGroupFix )
      console.log( this.cellsSelectedGroupFix.includes( $elClear ) )
      console.log( $elClear )
      if ( !this.cellsSelectedGroupFix.includes( $elClear ) ) {
        $elClear.removeClass( TableSelected.className )
      }
    } )

    const cellCoordFirst = cellXY( this.cell )
    const cellCoordLast = cellXY( $el )

    // 1. проверим что долбанули по тойже ячейке
    if ( cellCoordFirst.rowNumber === cellCoordLast.rowNumber
      && cellCoordFirst.colNumber === cellCoordLast.colNumber ) {
      return
    }

    // 2. ищем в какую сторону рисуем
    const firstNumberRow = cellCoordFirst.rowNumber < cellCoordLast.rowNumber
      ? cellCoordFirst.rowNumber
      : cellCoordLast.rowNumber
    const lastNumberRow = cellCoordFirst.rowNumber < cellCoordLast.rowNumber
      ? cellCoordLast.rowNumber
      : cellCoordFirst.rowNumber
    const firstNumberCol = cellCoordFirst.colNumber < cellCoordLast.colNumber
      ? cellCoordFirst.colNumber
      : cellCoordLast.colNumber
    const lastNumberCol = cellCoordFirst.colNumber < cellCoordLast.colNumber
      ? cellCoordLast.colNumber
      : cellCoordFirst.colNumber

    for ( let rowNumber = firstNumberRow;
          rowNumber <= lastNumberRow;
          rowNumber++ ) {
      for ( let colNumber = firstNumberCol;
            colNumber <= lastNumberCol;
            colNumber++ ) {
        const $currentEl = this.$root
          .find( `[data-cell-id="${rowNumber}:${colNumber}"]` )

        this.cellsSelected.push( $currentEl )
        this.cellsSelectedGroup.push( $currentEl )
        $currentEl.addClass( TableSelected.className )
      }
    }
  }

  clearSelected() {
    this.cellsSelected.forEach(
      $el => $el.removeClass( TableSelected.className )
    )
    this.cellsSelected = []
  }
}
