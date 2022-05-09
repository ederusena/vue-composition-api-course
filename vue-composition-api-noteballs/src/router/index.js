import { createRouter, createWebHashHistory } from 'vue-router'
import { useStoreNotes } from '@/stores/storeNotes'
import ViewNotes from '@/views/ViewNotes.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewAuth from '@/views/ViewAuth.vue'
import { nextTick } from 'vue'

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
  console.log('beforeEach')
  console.log('to: ', to)
  console.log('storeNotes.loggedIn: ', storeNotes.loggedIn)
  next()
})


export default router