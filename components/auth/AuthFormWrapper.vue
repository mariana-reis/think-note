<template>
  <div>
    <div class="flex center items-center gap-4 mb-5">
      <Icon :name="iconName" size="54" class="text-[#FF00F3]" />
      <h1 class="font-bold text-2xl sm:text-3xl mb-2 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
        {{ title }}
      </h1>
    </div>

    <p class="text-zinc-400 text-sm sm:text-base">
      {{ subtitle }}
      <NuxtLink 
        :to="linkTo"
        class="font-semibold text-[#FF00F3] hover:text-[#FF00F3]/80 underline underline-offset-2 transition-colors"
      >
        {{ linkText }}
      </NuxtLink>
    </p>

    <form @submit.prevent="onSubmit" class="mt-8 space-y-5">
      <slot name="fields" />

      <button
        type="submit"
        :disabled="disabled"
        class="w-full px-4 py-3 bg-gradient-to-r from-[#FF00F3] to-[#CC00C2] hover:from-[#FF00F3]/90 hover:to-[#CC00C2]/90 text-white text-sm font-semibold rounded-lg flex justify-center items-center space-x-2 transition-all shadow-lg shadow-[#FF00F3]/20 hover:shadow-[#FF00F3]/40 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{{ buttonText }}</span>
        <Icon :name="buttonIcon" size="20" />
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    title: string
    subtitle: string
    linkTo: string
    linkText: string
    buttonText: string
    buttonIcon: string
    iconName: string
    disabled?: boolean
  }
  
  interface Emits {
    (e: 'submit'): void
  }
  
  defineProps<Props>()
  const emit = defineEmits<Emits>()
  
  const onSubmit = () => {
    emit('submit')
  }
</script>