<template>
  <AuthLayout>
    <template #info-section>
      <AuthInfoSection
        title="Comece sua jornada no "
        description="Junte-se a milhares de usuários que já transformaram sua produtividade com o ThinkNote."
        :features="registerFeatures"
        cta-text="Já tenho uma conta"
        cta-link="/login"
        cta-icon="i-mdi:login"
        cta-button-class="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-lg font-bold rounded-full border border-white/20 hover:border-[#FF00F3]/50 transition-all"
        background-gradient="bg-gradient-to-br from-purple-900/10 via-transparent to-[#FF00F3]/10"
        blob1-position="left-20"
        blob1-color="bg-purple-600/20"
        blob2-position="right-20"
        blob2-color="bg-[#FF00F3]/20"
        features-grid-class="grid grid-cols-1 md:grid-cols-2 gap-6"
      />
    </template>

    <template #form>
      <AuthFormWrapper
        title="Crie sua conta gratuita"
        subtitle="Já tem uma conta?"
        link-to="/login"
        link-text="Faça login"
        button-text="Criar minha conta"
        button-icon="i-mdi:account-plus"
        icon-name="i-mdi:rocket-launch"
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
              autocomplete="new-password"
              placeholder="Mínimo 8 caracteres"
              class="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg text-white px-4 py-3 placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF00F3]/50 focus:border-transparent transition-all"
            />
            <p class="text-xs text-zinc-500 mt-2">
              Use pelo menos 8 caracteres com letras e números
            </p>
          </div>
        </template>
      </AuthFormWrapper>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
  import { useRegister } from '@/composables/useRegister'
  
  const { email, password, register } = useRegister()
  
  const registerFeatures = [
    {
      icon: 'i-mdi:check-bold',
      title: '100% Gratuito',
      description: 'Sem taxas ocultas ou limitações'
    },
    {
      icon: 'i-mdi:shield-check',
      title: 'Seguro e Privado',
      description: 'Seus dados protegidos sempre'
    },
    {
      icon: 'i-mdi:speedometer',
      title: 'Super Rápido',
      description: 'Interface ágil e responsiva'
    },
    {
      icon: 'i-mdi:devices',
      title: 'Multi-plataforma',
      description: 'Desktop, tablet e mobile'
    }
  ]
  
  const submit = async (): Promise<void> => {
    await register()
  }
</script>