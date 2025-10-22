<template>
  <AuthLayout>
    <template #info-section>
      <AuthInfoSection
        title="Bem-vindo ao "
        description="Transforme pensamentos em notas organizadas. Capture ideias, gerencie tarefas e nunca perca insights importantes."
        :features="loginFeatures"
        cta-text="Criar conta grátis"
        cta-link="/register"
        cta-icon="i-mdi:arrow-right"
      />
    </template>

    <template #form>
      <AuthFormWrapper
        title="Acesse sua conta"
        subtitle="Ainda não tem uma conta?"
        link-to="/register"
        link-text="Cadastre-se gratuitamente"
        button-text="Entrar na conta"
        button-icon="i-line-md:login"
        icon-name="i-mdi:login"
        @submit="submit"
      >
        <template #fields>
          <div>
            <label for="email" class="text-zinc-300 block text-sm font-medium mb-2">
              E-mail
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              autocomplete="email"
              placeholder="seu@email.com"
              class="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg text-white px-4 py-3 placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF00F3]/50 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label for="password" class="text-zinc-300 block text-sm font-medium mb-2">
              Senha
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              autocomplete="current-password"
              placeholder="••••••••"
              class="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg text-white px-4 py-3 placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF00F3]/50 focus:border-transparent transition-all"
            />
          </div>
        </template>
      </AuthFormWrapper>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
  import { useAuth } from '@/composables/useAuth'
  
  const { email, password, login } = useAuth()
  
  const loginFeatures = [
    {
      icon: 'i-mdi:lightning-bolt',
      title: 'Rápido e Simples',
      description: 'Capture ideias em segundos'
    },
    {
      icon: 'i-mdi:folder-multiple',
      title: 'Bem Organizado',
      description: 'Categorias e tags inteligentes'
    },
    {
      icon: 'i-mdi:cloud-sync',
      title: 'Sincronizado',
      description: 'Acesse de qualquer lugar'
    }
  ]
  
  const submit = async (): Promise<void> => {
    await login()
  }
</script>