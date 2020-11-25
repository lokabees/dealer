<template>
  <div class="container max-w-md p-3 md:p-0 flex">
    <div class="m-auto">
      <div class="flex justify-center text-primary my-8">
        <icon name="checkmark-circle-outline" height="100" width="100" />
      </div>
      <div class="prose lg:prose-lg">
        <h2 class="leading-tight">{{ $t('product_success.title') }}</h2>
        <p>{{ $t('product_success.paragraph_1') }}</p>
        <p>{{ $t('product_success.paragraph_2') }}</p>
        <div class="w-full flex">
          <button
            class="py-1 mx-auto text-primary font-bold normal-case"
            @click="$router.push('/products/add')"
          >
            {{ $t('product_success.add_another_product') }}
          </button>
        </div>
      </div>

      <button class="primary w-full mt-8" @click="$router.push('/')">
        {{ $t('product_success.back') }}
      </button>
    </div>
  </div>
</template>
