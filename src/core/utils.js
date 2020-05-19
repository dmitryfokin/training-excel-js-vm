export function capitalize( str ) {
  if ( typeof str !== 'string' ) {
    return ''
  }
  return str.charAt( 0 ).toUpperCase() + str.slice( 1 )
}

export function numberToLiteralColumn( number = 15 ) {
  const arr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split( '' )

  let literal = ''
  literal = number > arr.length
    ? arr[(number - (number % arr.length)) / arr.length - 1]
    : ''
  literal += number % arr.length === 0
    ? arr[arr.length - 1]
    : arr[(number % arr.length) - 1]

  return literal
}
