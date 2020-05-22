export function shouldResize( event ) {
  return 'resize' in event.target.dataset
}
