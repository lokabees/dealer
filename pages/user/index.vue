<template>
  <div class="container prose p-2">
    <Modal>
      <template v-slot:buttons>
        <button @click="hideModal">{{ $t('login.ok') }}</button>
      </template>
    </Modal>
    <h1 class="text-center pt-16">{{ $t('user.title') }}</h1>
    <p class="text-center pb-8">{{ $t('user.text') }}</p>

    <FormulateForm v-model="user" @submit="updateAccount">
      <FormulateInput type="image" :label="$t('user.image')" />
      <FormulateInput
        name="name"
        type="text"
        :label="$t('user.name')"
        :placeholder="$t('user.name_placeholder')"
        validation="required"
      />
      <FormulateInput
        name="shopRole"
        type="text"
        :label="$t('user.role')"
        :placeholder="$t('user.role_placeholder')"
      />
      <FormulateInput
        name="email"
        type="text"
        :placeholder="$t('user.email_placeholder')"
        :label="$t('user.email')"
        validation="required|email"
      />

      <div>
        <span class="text-sm font-bold"> {{ $t('user.better_safe') }}</span>
      </div>
      <FormulateInput
        type="button"
        :label="$t('user.new_password')"
        @click="$router.push('/auth/set-new-password')"
      />

      <FormulateInput type="submit" :label="$t('user.submit')" />
    </FormulateForm>

    <div class="border-grey-dark border-b my-12" />

    <p>{{ $t('user.newsletter_info') }}</p>
    <FormulateInput
      name="newsletter"
      type="checkbox"
      input-class="toggle-checkbox"
      element-class="toggle flex-none"
      :label="$t('user.newsletter')"
    />

    <div class="border-grey-dark border-b my-12" />

    <div class="text-center">
      <p class="font-bold">{{ $t('user.need_help') }}</p>
      <button class="primary" @click="$router.push('/contact')">
        {{ $t('user.contact') }}
      </button>
      <p>{{ $t('user.delete_info') }}</p>
      <button class="secondary" @click="deleteAccount">
        {{ $t('user.delete_button') }}
      </button>
    </div>
  </div>
</template>

<script>
import { clone } from 'lodash'
import { mapMutations } from 'vuex'
export default {
  async asyncData({ store }) {
    try {
      await store.dispatch('shops/getActiveShop')
    } catch (e) {
      console.error(e)
    }
  },
  data() {
    return {
      user: { ...clone(this.$store.getters.user) },
    }
  },
  methods: {
    ...mapMutations('modal', {
      showModal: 'showModal',
      hideModal: 'hideModal',
    }),
    deleteAccount() {
      // TODO
      console.log('deleteAccount')
    },
    async updateAccount() {
      try {
        console.log(this.user)
        await this.$axios.$put(`/api/users/${this.user._id}`, this.user)
      } catch (error) {
        console.error(error)
        const { data } = error?.response
        this.showModal(error + '\n' + JSON.stringify(data))
      }
    },
  },
}
</script>
