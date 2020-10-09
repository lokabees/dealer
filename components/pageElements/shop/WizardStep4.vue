<template>
  <div class="container prose max-w-xl mx-auto">
    <h1 class="text-center pt-16">
      {{ $t('shop_registration_wizard.step_4.title') }}
    </h1>
    <p class="text-center pb-8">
      {{ $t('shop_registration_wizard.step_4.text') }}
    </p>
    <FormulateForm v-model="shop.contact" @submit="$emit('submit')">
      <FormulateInput
        type="text"
        name="phone"
        :validation-rules="{
          phoneNumber: async function ({ value }) {
            if (!value) return true
            return await isValidPhoneNumber(value)
          },
        }"
        validation="phoneNumber"
        :placeholder="$t('shop_registration_wizard.step_4.phone_placeholder')"
        :label="$t('shop_registration_wizard.step_4.phone')"
      />
      <FormulateInput
        type="text"
        name="whatsapp"
        :placeholder="
          $t('shop_registration_wizard.step_4.whatsapp_placeholder')
        "
        :validation-rules="{
          phoneNumber: async function ({ value }) {
            if (!value) return true
            return await isValidPhoneNumber(value)
          },
        }"
        validation="phoneNumber"
        :label="$t('shop_registration_wizard.step_4.whatsapp')"
      />
      <FormulateInput
        type="text"
        name="email"
        :placeholder="$t('shop_registration_wizard.step_4.email_placeholder')"
        :label="$t('shop_registration_wizard.step_4.email')"
      />
      <FormulateInput
        type="text"
        name="website"
        :validation-rules="{
          website: ({ value }) => {
            if (!value) return true
            return websiteValidator.test(value)
          },
        }"
        validation="website"
        :placeholder="$t('shop_registration_wizard.step_4.website_placeholder')"
        :label="$t('shop_registration_wizard.step_4.website')"
      />
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
import { parsePhoneNumber } from 'libphonenumber-js'
export default {
  props: {
    initialShop: { type: Object, default: () => {}, required: true },
  },
  data() {
    return {
      shop: this.initialShop || {},
      websiteValidator: new RegExp(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!&'()*+,;=.]+$/
      ),
    }
  },
  watch: {
    shop(newShop, oldShop) {
      this.$emit('input', newShop)
    },
  },
  methods: {
    async isValidPhoneNumber(value) {
      const res = await parsePhoneNumber(value).isValid()
      console.log(res)
      return res
    },
  },
}
</script>
