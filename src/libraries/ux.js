import { Screen, } from 'quasar';

export function navSize () {
  if ( Screen.xs ) {
    return 'lg';
  }
  if ( Screen.sm ) {
    return 'lg';
  }
  if ( Screen.md ) {
    return 'lg';
  }
  return 'xl';
}

export function animateCSS ( element, animationName, callback ) {
  const node = document.querySelector( element );
  node.classList.add( 'animated', animationName );

  function handleAnimationEnd () {
    node.classList.remove( 'animated', animationName );
    node.removeEventListener( 'animationend', handleAnimationEnd );

    if ( typeof callback === 'function' ) callback();
  }

  node.addEventListener( 'animationend', handleAnimationEnd );
}
