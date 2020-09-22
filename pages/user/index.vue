<template>
  <div class="container prose">
    <h1 class="text-center pt-16">{{ $t('user.title') }}</h1>
    <p class="text-center pb-8">{{ $t('user.text') }}</p>
    <FormulateForm v-model="user">
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
export default {
  data() {
    return {
      user: {},
    }
  },
  methods: {
    deleteAccount() {
      console.log('deleteAccount')
    },
  },
}
</script>
