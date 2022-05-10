import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '@/js/firebase'

import { useStoreNotes } from '@/stores/storeNotes'

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return { 
      loggedIn: false,
      userId: null,
      userEmail: null
    }
  },
  actions: {
    firebaseInit() {
      onAuthStateChanged(auth, user => {
        console.log('user status changed: ', user)
        if (user) {
          this.router.push('/')
          this.loggedIn = true
          this.userId = user.uid
          this.userEmail = user.email
        }
        else {
          const storeNotes = useStoreNotes()
          storeNotes.stopGettingNotes()

          this.router.replace('/auth')
          this.notes = []
          this.loggedIn = false
          this.userId = null
          this.userEmail = null
        }
      })
    },
    firebaseRegister(credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password).then(cred => {
        // console.log('cred.user: ', cred.user)
      }).catch(error => {
        console.log(error.message)
      })
    },
    firebaseLogin(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password).then(cred => {
        // console.log('cred.user: ', cred.user)
      }).catch(error => {
        console.log(error.message)
      })
    },
    firebaseLogout() {
      signOut(auth).then(() => {
        console.log('User signed out')
      }).catch(error => {
        console.log('error.message: ', error.message)
      })
    }
  }
})