<template>
  <div class="container max-w-md p-3 md:p-0">
    <Modal>
      <template v-slot:buttons>
        <button @click="hideModal">{{ $t('signup.ok') }}</button>
      </template>
    </Modal>
    <div class="prose lg:prose-lg text-center">
      <h1 class="py-10">{{ $t('signup.title') }}</h1>
    </div>
    <FormulateForm v-model="guest" @submit="localSignUp">
      <FormulateInput
        type="text"
        name="name"
        :label="$t('signup.name')"
        placeholder="Max Mustermann"
        validation="required"
      />
      <FormulateInput
        name="email"
        type="email"
        :label="$t('signup.email')"
        validation="required|email"
        placeholder="max@mustermail.com"
      />
      <FormulateInput
        name="password"
        type="password"
        :label="$t('signup.password')"
        validation="required|password"
        placeholder="******************"
      />
      <FormulateInput
        name="confirm password"
        type="password"
        :label="$t('signup.confirm_password')"
        :validation-rules="{
          passwordMatch: ({ value }) => value === guest.password,
        }"
        :validation-messages="{
          passwordMatch: $t('validation_errors.confirm_password'),
        }"
        validation="bail|required|passwordMatch"
        placeholder="******************"
      />
      <FormulateInput
        type="checkbox"
        :label="$t('signup.accept_terms')"
        validation="required"
      />
      <FormulateInput type="submit" :label="$t('signup.signup')" />
    </FormulateForm>

    <div class="flex flex-col">
      <div>{{ $t('signup.account_exists') }}</div>
      <button class="secondary w-full" @click="$router.push('/auth/login')">
        {{ $t('signup.login') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  auth: false,
  data() {
    return {
      guest: {},
    }
  },
  methods: {
    ...mapMutations('modal', {
      showModal: 'showModal',
      hideModal: 'hideModal',
    }),
    async localSignUp() {
      try {
        await this.$axios.post(`/api/users`, {
          ...this.guest,
          master: this.$config.appMasterKey,
        })
        this.$router.push('/auth/success')
      } catch (error) {
        // this.$errorHandler({ error, type: 'signup' })
        console.error(error)
        this.showModal(error)
      }
    },
  },
}
</script>
