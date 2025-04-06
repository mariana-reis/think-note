<template>
  <div class="flex bg-black h-screen">
    <div class="bg-zinc-900 w-[516px] p-12 text-white flex flex-col justify-center">
      <div class="absolute top-10">
        <IconLogo />
      </div>
      <h1 class="font-bold text-lg mt-4">
        Crie sua conta gratuita
      </h1>
      <p class="text-zinc-300 text-sm mt-0.5">
        Já tem uma conta?
        <NuxtLink to="/login" class="font-bold text-[#FF00F3]/50 hover:text-[#FF00F3] underline">
          Faça login
        </NuxtLink> 
      </p>
      
      <form @submit.prevent="submit">
        <div class="mt-8">
          <label for="" class="text-zinc-300 block text-sm mb-0.5">
            E-mail
          </label>
          <input
            v-model="email"
            type="email"
            placeholder="user@example.com"
            class="
              w-full block 
              bg-[#27272A]
              border border-[#3F3F46] rounded
              text-white 
              px-4 py-2
              placeholder:text-zinc-500
              text-sm
            "
          />
        </div>
        <div class="mt-6">
          <label for="" class="text-zinc-300 block text-sm mb-0.5">
            Senha
          </label>
          <input
            v-model="password"
            type="password"
            placeholder="********"
            class="
              w-full block 
              bg-[#27272A]
              border border-[#3F3F46] rounded
              text-white 
              px-4 py-2
              placeholder:text-zinc-500
              text-sm
            "
          />
        </div>
        <div>
          <button
            class="w-full mt-4 px-4 py-2 bg-[#FF00F3]/50 hover:bg-[#FF00F3] text-white text-sm font-bold rounded-full flex justify-center items-center space-x-2"
          >
            <span>Criar conta</span>
            <Icon name="i-line-md:login" size="25" />
          </button>
        </div>
      </form>
    </div>
    
    <div class="flex flex-col items-center justify-center text-white w-[916px] text-center">
      <h2 class="text-3xl font-extrabold mb-6 text-[#FF00F3]">
        Bem-vindo ao <span class="text-white">Think</span>Note
      </h2>
      <p class="text-xl mb-4 max-w-md">
        Transforme pensamentos em notas. Capture ideias, organize tarefas e nunca perca insights importantes.
      </p>
      <div class="w-full flex justify-center items-center mt-8">
        <NuxtLink to="/login" class="px-6 py-2 bg-[#FF00F3]/50 hover:bg-[#FF00F3] text-white text-lg font-bold rounded-full">
          Faça login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRegister } from '@/composables/useRegister'
  
  const { email, password, register } = useRegister()
  
  const submit = async (): Promise<void> => {
    await register()
  }
</script>