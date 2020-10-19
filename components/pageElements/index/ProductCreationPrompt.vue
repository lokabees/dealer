<template>
  <div class="bg-warning-light bg-opacity-25 sm:flex py-10">
    <div class="flex flex-1" @click="$emit('hide')">
      <button class="ml-auto sm:hidden">X</button>
    </div>
    <div class="flex-initial max-w-lg text-center text-warning m-auto prose">
      <span class="font-bold">{{
        $t('dashboard.product_creation_prompt.title')
      }}</span
      ><br />
      <span>{{ $t('dashboard.product_creation_prompt.text') }}</span
      ><br />
      <button
        class="bg-warning text-white py-2 mt-2"
        @click="$router.push('/products/add')"
      >
        {{ $t('dashboard.product_creation_prompt.button') }}
      </button>
    </div>
    <div class="hidden sm:flex flex-1 items-center text-grey-dark">
      <button class="ml-auto" @click="$emit('hide')">X</button>
    </div>
  </div>
</template>
