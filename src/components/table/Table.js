import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'

export class Table extends ExcelComponent {
  constructor( $root ) {
    super( $root, {
      name: 'Table',
    } )
  }

  static className = 'excel__table'

  toHTML() {
    return createTable()
  }
}
