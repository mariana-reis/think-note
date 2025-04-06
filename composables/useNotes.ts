import { useDebounceFn } from '@vueuse/core'
import Swal from 'sweetalert2'

export interface Note {
  id: number
  text: string
  updatedAt: string
}

export function useNotes() {
  const notes = ref<Note[]>([])
  const selectedNote = ref<Note | null>(null)
  const updatedNote = ref<string>('')
  const textarea = ref<HTMLTextAreaElement | null>(null)

  async function fetchNotes(): Promise<void> {
    try {
      const fetchedNotes = await $fetch<Note[]>('/api/notes')

      fetchedNotes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      notes.value = fetchedNotes

      if (notes.value.length > 0) {
        selectedNote.value = notes.value[0]
        updatedNote.value = selectedNote.value.text
      } else {
        await createNewNote()
      }
    } catch (err) {
      console.error('Error fetching notes:', err)
    }
  }

  function setNote(note: Note): void {
    selectedNote.value = note
    updatedNote.value = note.text
  }

  async function deleteNote(): Promise<void> {
    if (!selectedNote.value) return

    const { isConfirmed } = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação excluirá sua nota permanentemente.',
      icon: 'warning',
      confirmButtonText: 'Sim, excluir',
      showCancelButton: true,
    })

    if (isConfirmed) {
      try {
        await $fetch(`/api/notes/${selectedNote.value.id}`, { method: 'DELETE' })
        notes.value = notes.value.filter(note => note.id !== selectedNote.value?.id)

        if (notes.value.length > 0) {
          selectedNote.value = notes.value[0]
          updatedNote.value = selectedNote.value.text
        } else {
          selectedNote.value = null
          updatedNote.value = ''
        }
      } catch (err) {
        console.error('Error deleting note:', err)
      }
    }
  }

  async function createNewNote(): Promise<void> {
    try {
      const newNote = await $fetch<Note>('/api/notes', { method: 'POST' })
      notes.value.unshift(newNote)
      selectedNote.value = newNote
      updatedNote.value = ''
      setTimeout(() => {
        textarea.value?.focus()
      }, 100)
    } catch (err) {
      console.error('Error creating note:', err)
    }
  }

  async function updateNote(): Promise<void> {
    if (!selectedNote.value) return
    try {
      await $fetch(`/api/notes/${selectedNote.value.id}`, {
        method: 'PATCH',
        body: { updatedNote: updatedNote.value },
      })
    } catch (err) {
      console.error('Error updating note:', err)
    }
  }

  const debouncedFn = useDebounceFn(async () => {
    await updateNote()
  }, 1000)

  const groupedNotes = computed(() => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const last7Days = new Date(today)
    last7Days.setDate(last7Days.getDate() - 7)

    const last30Days = new Date(today)
    last30Days.setDate(last30Days.getDate() - 30)

    const categorizedNotes: Record<string, Note[]> = {}
    const monthlyNotes: Record<string, Note[]> = {}

    notes.value.forEach((note) => {
      const noteDate = new Date(note.updatedAt)
      let category = ''

      if (noteDate.toDateString() === today.toDateString()) {
        category = 'Hoje'
      } else if (noteDate.toDateString() === yesterday.toDateString()) {
        category = 'Ontem'
      } else if (noteDate >= last7Days) {
        category = 'Últimos 7 dias'
      } else if (noteDate >= last30Days) {
        category = 'Últimos 30 dias'
      } else {
        category = noteDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
        if (!monthlyNotes[category]) {
          monthlyNotes[category] = []
        }
        monthlyNotes[category].push(note)
        return
      }

      if (!categorizedNotes[category]) {
        categorizedNotes[category] = []
      }
      categorizedNotes[category].push(note)
    })

    return { categorizedNotes, monthlyNotes }
  })

  return {
    notes,
    selectedNote,
    updatedNote,
    textarea,
    fetchNotes,
    setNote,
    deleteNote,
    createNewNote,
    updateNote,
    debouncedFn,
    groupedNotes,
  }
}
