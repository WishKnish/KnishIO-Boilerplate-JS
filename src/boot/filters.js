import { humanNumber, numberWithCommas, truncateMiddle, } from 'src/libraries/strings';

export default async ( { Vue, } ) => {

  Vue.filter( 'truncateMiddle', function ( value, limit = 6, separator = '…' ) {
    if ( !value ) return '';
    value = value.toString();
    return truncateMiddle( value, limit, separator );
  } );

  Vue.filter( 'numberWithCommas', function ( value ) {
    if ( !value ) return '0';
    value = value.toString();
    return numberWithCommas( value );
  } );

  Vue.filter( 'humanNumber', function ( value, threshold = 1000 ) {
    if ( !value ) return '0';
    value = value.toString();
    return humanNumber( value, threshold );
  } );

  Vue.filter( 'phone', function ( phone ) {
    return phone.replace( /[^0-9]/g, '' )
      .replace( /(\d{3})(\d{3})(\d{4})/, '($1) $2-$3' );
  } );

  Vue.filter( 'slugify', function ( input ) {

    input = input.replace( /^\s+|\s+$/g, '' );
    input = input.toLowerCase();

    let from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    let to = 'aaaaeeeeiiiioooouuuunc------';

    for ( let i = 0, l = from.length; i < l; i++ ) {
      input = input.replace( new RegExp( from.charAt( i ), 'g' ), to.charAt( i ) );
    }

    input = input.replace( /[^a-z0-9 -]/g, '' )
      .replace( /\s+/g, '-' )
      .replace( /-+/g, '-' );

    return input;

  } );
};
