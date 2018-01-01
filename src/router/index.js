import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// Components
import Dashboard from '@/components/Dashboard'
import NewTutor from '@/components/NewTutor'
import ViewTutor from '@/components/ViewTutor'
import EditTutor from '@/components/EditTutor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-',
      component: NewTutor
    },
    {
      path: '/edit/:vunetid',
      name: 'edit-tutor',
      component: EditTutor
    },
    {
      path: '/:vunetid',
      name: 'view-tutor',
      component: ViewTutor
    }
  ]
})
