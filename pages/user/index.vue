<template>
  <div class="container prose">
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
      <p>{{ $t('user.newsletter_info') }}</p>
      <FormulateInput
        name="newsletter"
        type="checkbox"
        :label="$t('user.newsletter')"
      />
      <FormulateInput type="submit" :label="$t('user.submit')" />
    </FormulateForm>
    <p>{{ $t('user.need_help') }}</p>
    <button class="primary" @click="$router.push('/contact')">
      {{ $t('user.contact') }}
    </button>
    <p>{{ $t('user.delete_info') }}</p>
    <button class="secondary" @click="deleteAccount">
      {{ $t('user.delete_button') }}
    </button>
  </div>
</template>

<script>
import { clone } from 'lodash'
import { mapMutations } from 'vuex'
export default {
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
      console.log('deleteAccount')
    },
    async updateAccount() {
      try {
        console.log('update Account')
        await this.$axios.$put(`/api/user/${this.user._id}`)
      } catch (error) {
        console.error(error)
        const { data } = error?.response
        this.showModal(error + '\n' + JSON.stringify(data))
      }
    },
  },
}
</script>
