import { defineStore } from 'pinia'
import {
  collection, onSnapshot,
  query, orderBy, 
  deleteDoc, doc, setDoc, updateDoc
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword
} from 'firebase/auth'
import { db, auth } from '@/js/firebase'

const notesCollectionRef = collection(db, 'users', 'userId1', 'notes')
const notesCollectionQuery = query(notesCollectionRef, orderBy('id', 'desc'))

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return { 
      notes: [
        // {
        //   id: 'id1',
        //   content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem ipsa commodi sint ut ullam culpa nulla molestiae sunt quia qui maxime.'
        // },
        // {
        //   id: 'id2',
        //   content: 'This is a shorter note! Woo!'
        // }
      ],
      loggedIn: true
    }
  },
  actions: {
    addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
          id = currentDate.toString()

      let note = {
        id,
        content: newNoteContent
      }

      // this.notes.unshift(note)

      setDoc(doc(notesCollectionRef, note.id), {
        id: note.id,
        content: note.content
      })
    },
    deleteNote(idToDelete) {
      // this.notes = this.notes.filter(note => note.id !== idToDelete )
      deleteDoc(doc(notesCollectionRef, idToDelete))
    },
    updateNote(id, content) {
      // let index = this.notes.findIndex(note => note.id === id )
      // this.notes[index].content = content
      updateDoc(doc(notesCollectionRef, id), {
        content
      })
    },

    firebaseInit() {
      onSnapshot(notesCollectionQuery, snapshot => {
        let newNotes = []
        snapshot.docs.forEach(doc => {
          newNotes.push({ ...doc.data(), id: doc.id })
        })
        this.notes = newNotes
      })
    },
    firebaseRegister(credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password).then(cred => {
        console.log('cred.user: ', cred.user)
      }).catch(error => {
        console.log(error.message)
      })
    },
    firebaseLogin(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password).then(cred => {
        console.log('cred.user: ', cred.user)
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
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id )[0].content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharactersCount: (state) => {
      let count = 0
      state.notes.forEach(note => {
        count += note.content.length
      })
      return count
    }
  }
})