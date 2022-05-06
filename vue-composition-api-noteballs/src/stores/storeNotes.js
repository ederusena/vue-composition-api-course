import { defineStore } from 'pinia'
import { collection, onSnapshot, deleteDoc, doc, setDoc } from 'firebase/firestore'
import db from '@/js/firebase'

const notesCollectionRef = collection(db, 'notes')

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
      ]
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

      setDoc(doc(db, 'notes', note.id), {
        id: note.id,
        content: note.content
      })
    },
    deleteNote(idToDelete) {
      // this.notes = this.notes.filter(note => note.id !== idToDelete )
      deleteDoc(doc(db, 'notes', idToDelete))
    },
    updateNote(id, content) {
      let index = this.notes.findIndex(note => note.id === id )
      this.notes[index].content = content
    },

    firebaseInit() {
      onSnapshot(notesCollectionRef, snapshot => {
        let newNotes = []
        snapshot.docs.forEach(doc => {
          newNotes.push({ ...doc.data(), id: doc.id })
        })
        this.notes = newNotes
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