import {cellXY} from '@/components/table/table.function'
import {$} from '@core/dom'

export class TableSelected {
  static className = 'selected'

  static keyArr = [
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'ArrowLeft',
    'Enter',
    'Tab',
  ]

  constructor( $root, emmiter ) {
    this.$root = $root
    this.cellsSelected = []
    this.cellsSelectedGroup = []
    this.cellsSelectedGroupFix = [] // копия перед выделением
    this.lastSelectedGroupFirstCell = null
    this.emmiter = emmiter
  }

  select( $el ) {
    this.cell = $el
    this.emmiter.$emit( 'selected:cell', $el )
    this.clearSelected()
    this.cellsSelected.push( $el )
    $el.addClass( TableSelected.className )
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

    this.cellsSelected = [...this.cellsSelectedGroupFix]
    // удалить все selected, в последнем выделении
    this.cellsSelectedGroup.forEach( $elClear => {
      if (
        this.cellsSelectedGroupFix
          .findIndex( $elFix => $elFix.$el === $elClear.$el ) === -1
      ) {
        $elClear.removeClass( TableSelected.className )
      }
    }, this )
    this.cellsSelectedGroup = []

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

  onKeydown( event ) {
    const $el = $( event.target )
    const {key, shiftKey} = event
    if ( key === 'Enter' && shiftKey ) {
      return
    }
    if ( key === 'Enter' || key === 'Tab' ) {
      event.preventDefault()
    }

    const cellCoord = cellXY( $el )
    let {rowNumber, colNumber} = cellCoord

    if ( key === 'ArrowUp' ) {
      rowNumber = rowNumber === 1 ? 1 : rowNumber - 1
    } else if ( key === 'ArrowRight' || key === 'Tab' ) {
      colNumber++
    } else if ( key === 'ArrowDown' || key === 'Enter' ) {
      rowNumber++
    } else if ( key === 'ArrowLeft' ) {
      colNumber = colNumber === 1 ? 1 : colNumber - 1
    }

    if ( rowNumber === cellCoord.rowNumber
      && colNumber === cellCoord.colNumber ) {
      return
    }

    const $elNew = this.$root.find(
      `[data-cell-id="${rowNumber}:${colNumber}"]`
    )
    this.select( $elNew )
    $elNew.focus()
  }

  clearSelected() {
    this.cellsSelected.forEach(
      $el => $el.removeClass( TableSelected.className )
    )
    this.cellsSelected = []
    this.cellsSelectedGroup = []
    this.cellsSelectedGroupFix = []
    this.lastSelectedGroupFirstCell = null
  }
}
