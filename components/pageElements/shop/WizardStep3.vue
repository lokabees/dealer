<template>
  <div class="container prose max-w-xl mx-auto">
    <h1 class="text-center pt-16">
      {{ $t('shop_registration_wizard.step_3.title') }}
    </h1>
    <p class="text-center pb-8">
      {{ $t('shop_registration_wizard.step_3.text') }}
    </p>
    <FormulateForm @submit="$emit('submit')">
      <FormulateInput type="deliveryOptions" />

      <div class="flex">
        <div class="w-1/2 pr-1">
          <FormulateInput
            input-class="secondary w-full"
            type="button"
            :label="$t('shop_registration_wizard.back')"
            @click="$emit('back')"
          />
        </div>
        <div class="w-1/2 pl-1">
          <FormulateInput
            type="submit"
            :label="$t('shop_registration_wizard.next')"
          />
        </div>
      </div>
    </FormulateForm>
  </div>
</template>
