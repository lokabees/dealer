<template>
  <div class="container prose max-w-xl mx-auto">
    <h1 class="text-center pt-16">
      {{ $t('shop_registration_wizard.step_4.title') }}
    </h1>
    <p class="text-center pb-8">
      {{ $t('shop_registration_wizard.step_4.text') }}
    </p>
    {{ activeShop.contact }}
    <FormulateForm
      :value="activeShop.contact"
      @input="updateActiveShop({ contact: $event })"
      @submit="submit"
    >
      <FormulateInput
        type="text"
        name="phone"
        :validation-rules="{
          phoneNumber: async function ({ value }) {
            if (!value) return true
            return await isValidPhoneNumber(value)
          },
        }"
        validation="bail|phoneNumber"
        :placeholder="$t('shop_registration_wizard.step_4.phone_placeholder')"
        :label="$t('shop_registration_wizard.step_4.phone')"
        error-behavior="blur"
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
        validation="bail|phoneNumber"
        :label="$t('shop_registration_wizard.step_4.whatsapp')"
        error-behavior="blur"
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
        validation="bail|website"
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
import { mapGetters, mapMutations } from 'vuex'
// import { parsePhoneNumber } from 'libphonenumber-js'
import { PhoneNumberUtil } from 'google-libphonenumber'
export default {
  data() {
    return {
      websiteValidator: new RegExp(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!&'()*+,;=.]+$/
      ),
    }
  },
  computed: {
    ...mapGetters('shops', {
      activeShop: 'activeShop',
    }),
  },
  methods: {
    ...mapMutations('shops', { updateActiveShop: 'updateActiveShop' }),
    isValidPhoneNumber(value) {
      const phoneUtil = PhoneNumberUtil.getInstance()
      return phoneUtil.isValidNumber(phoneUtil.parse(value, 'DE'))
    },
    submit() {
      const contact = {}
      for (const key in this.activeShop.contact) {
        if (this.activeShop.contact[key] !== '')
          contact[key] = this.activeShop.contact[key]
      }
      this.updateActiveShop({ contact })
      this.$emit('submit')
    },
  },
}
</script>
