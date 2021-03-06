import { Quasar, } from 'quasar';

export default async () => {
  const langIso = 'en-us'; // ... some logic to determine it (use Cookies Plugin?)

  try {
    await import(`quasar/lang/${ langIso }`)
      .then( ( lang ) => {
        Quasar.lang.set( lang.default );
      } );
  } catch ( err ) {
    // Requested Quasar Language Pack does not exists,
    // let's not break the app, so catching error
  }
};
