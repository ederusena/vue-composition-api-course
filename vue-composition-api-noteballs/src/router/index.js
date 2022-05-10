import { createRouter, createWebHashHistory } from 'vue-router'
import { useStoreNotes } from '@/stores/storeNotes'
import ViewNotes from '@/views/ViewNotes.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewAuth from '@/views/ViewAuth.vue'

const routes = [
  {
    path: '/',
    name: 'notes',
    component: ViewNotes
  },
  {
    path: '/editNote/:id',
    name: 'edit-note',
    component: ViewEditNote
  },
  {
    path: '/stats',
    name: 'stats',
    component: ViewStats
  },
  {
    path: '/auth',
    name: 'auth',
    component: ViewAuth
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// navigation guards
router.beforeEach(async (to, from, next) => {
  const storeNotes = useStoreNotes()
  if (!storeNotes.loggedIn && to.name !== 'auth') {
    next('/auth')
  }
  else if (storeNotes.loggedIn && to.name === 'auth') {
    next('/')
  }
  else {
    next()
  }
})


export default router