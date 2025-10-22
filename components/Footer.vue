<template>
  <footer class="bg-black/20 backdrop-blur-sm border-t border-zinc-800/20">
    <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
      <div class="flex items-center gap-3">
        <IconLogo class="h-6" />
      </div>

      <div class="flex flex-col md:flex-row items-center gap-2 text-zinc-500 text-xs md:text-sm">
        <span>© {{ currentYear }} ThinkNote. Todos os direitos reservados.</span>
        <span class="hidden md:inline text-zinc-600">•</span>
        <span>
          Desenvolvido por 
          <NuxtLink
            to="https://github.com/mariana-reis" 
            target="_blank" 
            rel="noopener noreferrer"
            class="hover:text-[#FF00F3] transition-colors"
          >
            Mariana Silva
          </NuxtLink>
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  const currentYear = new Date().getFullYear()
</script>
