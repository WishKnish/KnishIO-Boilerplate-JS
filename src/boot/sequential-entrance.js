import 'vue-sequential-entrance/vue-sequential-entrance.css';

const SequentialEntrance = {
  functional: true,
  render ( createElement, { props, children, } ) {
    const delay = props.delay || 100;
    const duration = props.duration || 500;
    const tag = props.tag || null;
    let animation = props.animation || 'entranceFromRight';

    if ( props.fromTop !== undefined ) animation = 'entranceFromTop';
    if ( props.fromRight !== undefined ) animation = 'entranceFromRight';
    if ( props.fromBottom !== undefined ) animation = 'entranceFromBottom';
    if ( props.fromLeft !== undefined ) animation = 'entranceFromLeft';

    if ( children ) {
      children.forEach( ( child, index ) => {
        if ( child.data ) {
          child.data.staticStyle = {
            opacity: 0,
            animationFillMode: 'forwards',
            animationDelay: `${ index * delay }ms`,
            animationDuration: `${ duration }ms`,
          };
          child.data.staticClass += ` ${ animation }`;
        }
      } );
    }
    if ( tag ) {
      return createElement( tag, children );
    }

    return children;
  },
};

const VueSequentialEntrance = {
  install ( Vue ) {
    Vue.component( 'sequential-entrance', SequentialEntrance );
  },
};

// leave the export, even if you don't use it
export default async ( { Vue, } ) => {
  Vue.use( VueSequentialEntrance );
};
