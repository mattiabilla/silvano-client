
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
	  { path: 'teach', component: () => import('pages/teach') },
	  { path: 'learn', component: () => import('pages/learn') },
	  { path: 'questions', component: () => import('pages/questions') },
	  { path: 'teach/classe', component: () => import('pages/classein') },
	  { path: 'learn/classe', component: () => import('pages/classest') },
	  { path: 'tests', component: () => import('pages/tests') },
	  { path: 'tests/test', component: () => import('pages/test') },
	  { path: 'learn/classe/svolgimento', component: () => import('pages/svolgimento') },
	  { path: 'teach/classe/correzione', component: () => import('pages/correzione') },
	  
	  
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
