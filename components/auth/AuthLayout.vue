<template>
  <div class="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
    <div class="flex flex-col lg:flex-row min-h-screen">
      <div class="lg:hidden w-full bg-gradient-to-br from-[#FF00F3]/10 to-purple-900/10 p-6 sm:p-8 text-white text-center">
        <div class="max-w-md mx-auto">
          <div class="inline-block p-3 bg-gradient-to-br from-[#FF00F3]/20 to-purple-600/20 rounded-xl backdrop-blur-sm mb-4">
            <Icon name="i-mdi:note-text" size="48" class="text-[#FF00F3]" />
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold mb-3">
            <span class="text-white">Think</span>
            <span class="text-[#FF00F3]">Note</span>
          </h2>
          <p class="text-sm sm:text-base text-zinc-300">
            Transforme pensamentos em notas organizadas
          </p>
        </div>
      </div>

      <slot name="info-section" />

      <div class="w-full lg:w-2/5 xl:w-[516px] bg-black/50 backdrop-blur-sm p-6 sm:p-8 md:p-12 text-white flex flex-col justify-center relative">
        <div class="max-w-md mx-auto w-full mt-16 sm:mt-0">
          <slot name="form" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>