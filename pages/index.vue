<template>
  <div class="flex bg-zinc-900 h-screen overflow-hidden">
    <div class="bg-black w-[340px] p-8 flex flex-col overflow-y-auto sidebar-scroll">
      <div class="sticky -top-[34px] bg-black z-10 pb-4 pt-[20px]">
        <IconLogo />
      </div>      
      <div v-for="(notes, category) in groupedNotes.categorizedNotes" :key="category">
        <p class="text-xs font-bold text-[#C2C2C5] mt-8 mb-4">{{ category }}</p>
        <div class="ml-2 space-y-2">
          <div
            v-for="note in notes"
            :key="note.id"
            class="p-3 cursor-pointer rounded-2xl"
            :class="{ 
              'bg-[#FF00F3]/50': note.id === selectedNote?.id, 
              'hover:bg-[#f163ea44] ': note.id !== selectedNote?.id 
            }"
            @click="setNote(note)"
          >
            <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
              {{ note.text.substring(0, 50) }}
            </h3>
            <p class="text-xs text-[#D6D6D6] truncate">
              {{ new Date(note.updatedAt).toLocaleDateString('pt-BR') }}
            </p>
            <span v-if="note.text.length > 30" class="text-xs text-[#D6D6D6]">
              {{ note.text.substring(0, 30) }} ...
            </span> 
          </div>
        </div>
      </div>

      <div v-for="(notes, month) in groupedNotes.monthlyNotes" :key="month">
        <p class="text-xs font-bold text-[#C2C2C5] mt-8 mb-4">{{ month }}</p>
        <div class="ml-2 space-y-2">
          <div
            v-for="note in notes"
            :key="note.id"
            class="p-3 rounded-lg cursor-pointer"
            :class="{ 
              'bg-[#FF00F3]/50': note.id === selectedNote?.id, 
              'hover:bg-[#f163ea44]': note.id !== selectedNote?.id 
            }"
            @click="setNote(note)"
          >
            <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
              {{ note.text.substring(0, 50) }}
            </h3>
            <p class="text-xs text-[#D6D6D6] truncate">
              {{ new Date(note.updatedAt).toLocaleDateString('pt-BR') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col flex-grow p-8 overflow-hidden">
      <div class="flex justify-between items-center w-full pb-4 border-b border-zinc-700">
        <button class="text-sm text-[#C2C2C5] hover:text-white font-bold flex items-center space-x-2" @click="createNewNote">
          <Icon name="i-material-symbols:edit-square-outline" size="25" />
          <span>Criar Nota</span>
        </button>
        <button @click="deleteNote">
          <Icon name="i-material-symbols:delete-outline" size="25" class="text-[#6D6D73] hover:text-white"/>
        </button>
      </div>

      <div class="flex flex-col flex-grow mt-4">
        <p class="text-[#929292] text-sm mb-5">
          {{
            selectedNote
              ? `${new Date(selectedNote.updatedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })} 
                ${new Date(selectedNote.updatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
              : ''
          }}
        </p>

        <textarea
          ref="textarea"
          v-model="updatedNote"
          class="text-[#D4D4D4] font-playfair w-full bg-transparent focus:outline-none resize-none flex-grow overflow-y-auto custom-scroll"
          placeholder="Digite sua nota aqui..."
          @input="() => { debouncedFn(); if (selectedNote) selectedNote.text = updatedNote }"
        ></textarea>
      </div>
      <div class="absolute right-7 bottom-2">
        <button @click="logout" class="text-zinc-400 hover:text-white text-sm font-bold flex items-center space-x-2">
          <span>Sair</span>
          <Icon name="i-line-md:log-out" class="bg-[#FF00F3]" size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotes } from '@/composables/useNotes'

const {
  selectedNote,
  updatedNote,
  fetchNotes,
  setNote,
  deleteNote,
  createNewNote,
  debouncedFn,
  groupedNotes,
} = useNotes()

definePageMeta({ middleware: ['auth'] })

const jwtCookie = useCookie('AppleNoteJWT')

function logout(): void {
  jwtCookie.value = null
  navigateTo('/login')
}

onMounted(() => {
  fetchNotes()
})
</script>

<style scoped>
.sidebar-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgb(255 0 243 / 0.5) transparent;
}

.sidebar-scroll::-webkit-scrollbar {
  width: 8px;
}

.sidebar-scroll::-webkit-scrollbar-thumb {
  background-color: rgb(255 0 243 / 0.5);
  border-radius: 4px;
}

.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: #555 transparent;
}

.custom-scroll::-webkit-scrollbar {
  width: 6px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 4px;
}
</style>