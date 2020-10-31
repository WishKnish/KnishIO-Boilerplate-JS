const routes = [
  {
    path: '/',
    component: () => import('../layouts/Master.vue'),
    props: ( route ) => ( {
      anchorTarget: route.hash,
    } ),
    children: [
      {
        name: 'home',
        path: '/',
        component: () => import('../pages/Home.vue'),
      },
      {
        name: 'about',
        path: 'about',
        component: () => import( '../pages/About.vue' ),
      },
      {
        name: 'login',
        path: 'login',
        props: ( route ) => ( { redirect: route.params.redirect, } ),
        component: () => import( '../pages/Login.vue' ),
      },
      {
        path: 'profile',
        component: () => import('../pages/Profile/Index.vue'),
        props: ( route ) => ( { slide: route.path, } ),
        children: [
          {
            name: 'profile',
            path: '/',
            component: () => import('../pages/Profile/Dashboard.vue'),
          },
        ],
      },
    ],
  },
];

// Always leave this as last one
if ( process.env.MODE !== 'ssr' ) {
  routes.push(
    {
      path: '/',
      component: () => import('../layouts/Master.vue'),
      children: [
        {

          path: '*',
          component: () => import( 'pages/Error404.vue' ),
        },
      ],
    }
  );
}

export default routes;
