<template>
  <div class="container prose max-w-xl mx-auto">
    <Modal
      :visible="modal"
      :message="$t('shop_registration_wizard.step_2.has_validation_errors')"
    >
      <template v-slot:buttons
        ><button @click="modal = false">
          {{ $t('shop_registration_wizard.step_2.ok') }}
        </button></template
      ></Modal
    >
    <h1 class="text-center pt-16">
      {{ $t('shop_registration_wizard.step_2.title') }}
    </h1>
    <p class="text-center pb-8">
      {{ $t('shop_registration_wizard.step_2.text') }}
    </p>
    <FormulateForm @submit-raw="validation($event)" @submit="$emit('submit')">
      <FormulateInput :create="true" type="openingHours" />

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

<script>
export default {
  data() {
    return {
      modal: false,
    }
  },
  methods: {
    async validation(validation) {
      if (await validation.hasValidationErrors()) this.modal = true
    },
  },
}
</script>
