import { defineStore } from 'pinia'
import {
  collection, onSnapshot,
  query, orderBy, 
  deleteDoc, doc, setDoc, updateDoc
} from 'firebase/firestore'
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'

let notesCollectionRef = null
let notesCollectionQuery = null

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
      loading: false
    }
  },
  actions: {
    initNotes() {
      const storeAuth = useStoreAuth()

      notesCollectionRef = collection(db, 'users', storeAuth.userId, 'notes')
      notesCollectionQuery = query(notesCollectionRef, orderBy('id', 'desc'))
      this.getNotes()
    },
    getNotes() {
      this.loading = true
      onSnapshot(notesCollectionQuery, snapshot => {
        let newNotes = []
        snapshot.docs.forEach(doc => {
          newNotes.push({ ...doc.data(), id: doc.id })
        })
        this.notes = newNotes
        this.loading = false
      })
    },
    addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
          id = currentDate.toString()

      let note = {
        id,
        content: newNoteContent
      }

      setDoc(doc(notesCollectionRef, note.id), {
        id: note.id,
        content: note.content
      })
    },
    deleteNote(idToDelete) {
      deleteDoc(doc(notesCollectionRef, idToDelete))
    },
    updateNote(id, content) {
      updateDoc(doc(notesCollectionRef, id), {
        content
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