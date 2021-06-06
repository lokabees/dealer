<template>
  <div class="container max-w-md p-3 md:p-0 flex">
    <div class="m-auto">
      <div class="flex justify-center text-primary my-8">
        <i class="eva-hover">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="inherit"
            class="eva"
          >
            <g data-name="Layer 2">
              <g data-name="checkmark-circle">
                <rect width="24" height="24" opacity="0"></rect>
                <path
                  d="M9.71 11.29a1 1 0 0 0-1.42 1.42l3 3A1 1 0 0 0 12 16a1 1 0 0 0 .72-.34l7-8a1 1 0 0 0-1.5-1.32L12 13.54z"
                ></path>
                <path
                  d="M21 11a1 1 0 0 0-1 1 8 8 0 0 1-8 8A8 8 0 0 1 6.33 6.36 7.93 7.93 0 0 1 12 4a8.79 8.79 0 0 1 1.9.22 1 1 0 1 0 .47-1.94A10.54 10.54 0 0 0 12 2a10 10 0 0 0-7 17.09A9.93 9.93 0 0 0 12 22a10 10 0 0 0 10-10 1 1 0 0 0-1-1z"
                ></path>
              </g>
            </g>
          </svg>
        </i>
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
