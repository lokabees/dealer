<template>
  <div class="flex flex-col min-h-screen bg-primary-lightest">
    <Navigation class="md:block sticky top-0 z-30 bg-primary-lightest" />
    <Nuxt class="h-full" />
    <Footer class="mt-auto" />
    <ErrorModal />
    <CookiesConsent />
  </div>
</template>
