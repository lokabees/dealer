<template>
  <div class="container prose p-2 pb-16">
    <Modal :visible="unsavedChangesModal" :message="$t('user.unsaved_changes')">
      <template v-slot:buttons>
        <button
          :class="{ 'spinner-light': pending.discard }"
          @click="discardChanges"
        >
          {{ $t('user.discard_changes') }}
        </button>
        <button
          :class="{ 'spinner-dark': pending.save }"
          class="primary"
          @click="updateAccount"
        >
          {{ $t('user.save_changes') }}
        </button>
      </template>
    </Modal>
    <h1 class="text-center pt-16">{{ $t('user.title') }}</h1>
    <p class="text-center pb-8">{{ $t('user.text') }}</p>

    <FormulateForm @submit="updateAccount">
      <!--
      <FormulateInput type="image" :label="$t('user.image')" />
    -->
      <FormulateInput
        :value="user.name"
        name="name"
        type="text"
        :label="$t('user.name')"
        :placeholder="$t('user.name_placeholder')"
        validation="required"
        @input="updateUser({ name: $event })"
      />
      <!--
      <FormulateInput
        name="shopRole"
        type="text"
        :label="$t('user.role')"
        :placeholder="$t('user.role_placeholder')"
      />
    -->
      <label class="text-sm font-bold">{{
        $t('user.change_credentials')
      }}</label>
      <p>
        {{ $t('user.change_credentials_text') }}
      </p>

      <!--
      <FormulateInput
        name="email"
        type="text"
        :placeholder="$t('user.email_placeholder')"
        :label="$t('user.email')"
        validation="required|email"
      />
    -->

      <div>
        <span class="text-sm font-bold"> {{ $t('user.better_safe') }}</span>
      </div>
      <FormulateInput
        type="button"
        :label="$t('user.new_password')"
        @click="$router.push('/auth/set-new-password')"
      />

      <FormulateInput
        :class="{ 'spinner-dark': pending.save }"
        input-class="button bg-grey-dark text-white w-full hide-on-spinner"
        type="submit"
        :label="$t('user.submit')"
      />
    </FormulateForm>

    <div class="border-grey-dark border-b my-12" />

    <p>{{ $t('user.newsletter_info') }}</p>

    <FormulateInput
      :value="user.value"
      name="newsletter"
      type="checkbox"
      input-class="toggle-checkbox"
      element-class="toggle flex-none"
      :label="$t('user.newsletter')"
      @input="updateUser({ newsletter: $event })"
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
import { mapMutations, mapGetters } from 'vuex'
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
      // user: { ...clone(this.$store.getters.user) },
      unsavedChanges: false,
      unsavedChangesModal: false,
      pending: { save: false, discard: false },
    }
  },
  beforeRouteLeave(to, from, next) {
    this.nextRoute = to.path
    if (this.unsavedChanges) this.unsavedChangesModal = true
    else next()
  },
  computed: {
    ...mapGetters(['user']),
  },
  watch: {
    user: {
      deep: true,
      handler() {
        this.unsavedChanges = true
      },
    },
  },

  methods: {
    ...mapMutations(['updateUser']),
    async discardChanges() {
      this.pending.discard = true
      try {
        await this.$store.dispatch('getMe')
        this.unsavedChanges = false
        this.$router.push(this.nextRoute)
      } catch (error) {
        this.pending.discard = false
        this.$errorHandler({ prefix: 'user', error })
      }
    },
    deleteAccount() {
      // TODO
      console.log('deleteAccount')
    },
    async updateAccount() {
      this.pending.save = true
      try {
        await this.$axios.$put(`/api/users/${this.user._id}`, this.user)
        this.$router.push('/')
      } catch (error) {
        this.pending.save = false
        this.unsavedChangesModal = false
        this.$errorHandler({ prefix: 'user', error })
      }
    },
  },
}
</script>
