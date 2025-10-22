<template>
  <div class="hidden lg:flex lg:w-3/5 xl:flex-1 flex-col items-center justify-center text-white text-center p-8 relative overflow-hidden">
    <div :class="['absolute inset-0', backgroundGradient]"></div>
    <div :class="['absolute top-20 w-72 h-72 rounded-full blur-3xl', blob1Position, blob1Color]"></div>
    <div :class="['absolute bottom-20 w-96 h-96 rounded-full blur-3xl', blob2Position, blob2Color]"></div>

    <div class="relative z-10 max-w-2xl">
      <div class="mb-8">
        <div class="inline-block mb-6">
          <IconLogo />
        </div>
      </div>

      <h2 class="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
        {{ title }}
        <span class="text-white">Think</span>
        <span class="bg-gradient-to-r from-[#FF00F3] to-purple-400 bg-clip-text text-transparent">Note</span>
      </h2>

      <p class="text-xl md:text-2xl mb-8 text-zinc-300 leading-relaxed">
        {{ description }}
      </p>

      <div :class="['mt-12 text-left', featuresGridClass]">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="flex items-start space-x-4 p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#FF00F3]/50 transition-all"
        >
          <div class="flex-shrink-0 w-10 h-10 bg-[#FF00F3]/20 rounded-lg flex items-center justify-center">
            <Icon :name="feature.icon" size="20" class="text-[#FF00F3]" />
          </div>
          <div>
            <h3 class="font-semibold mb-1">{{ feature.title }}</h3>
            <p class="text-sm text-zinc-400">{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <div class="mt-12">
        <NuxtLink 
          :to="ctaLink"
          :class="ctaButtonClass"
        >
          <span>{{ ctaText }}</span>
          <Icon :name="ctaIcon" size="24" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Feature {
    icon: string
    title: string
    description: string
  }
  
  interface Props {
    title: string
    description: string
    features: Feature[]
    ctaText: string
    ctaLink: string
    ctaIcon?: string
    ctaButtonClass?: string
    backgroundGradient?: string
    blob1Position?: string
    blob1Color?: string
    blob2Position?: string
    blob2Color?: string
    featuresGridClass?: string
  }
  
  withDefaults(defineProps<Props>(), {
    ctaIcon: 'i-mdi:arrow-right',
    ctaButtonClass: 'inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#FF00F3] to-[#CC00C2] hover:from-[#FF00F3]/90 hover:to-[#CC00C2]/90 text-white text-lg font-bold rounded-full shadow-lg shadow-[#FF00F3]/30 hover:shadow-[#FF00F3]/50 transition-all',
    backgroundGradient: 'bg-gradient-to-br from-[#FF00F3]/10 via-transparent to-purple-900/10',
    blob1Position: 'right-20',
    blob1Color: 'bg-[#FF00F3]/20',
    blob2Position: 'left-20',
    blob2Color: 'bg-purple-600/20',
    featuresGridClass: 'grid grid-cols-1 md:grid-cols-3 gap-6'
  })
</script>