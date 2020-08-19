<template>
  <div>
    <h1>{{ $t('reset_password.title') }}</h1>
    <p>{{ $t('reset_password.text') }}</p>
    <FormulateForm>
      <FormulateInput
        type="email"
        :label="$t('reset_password.email')"
        :placeholder="$t('reset_password.email_placeholder')"
      />
      <FormulateInput type="submit" :label="$t('reset_password.submit')" />
    </FormulateForm>
    <button>{{ $t('reset_password.back') }}</button>
  </div>
</template>

<script>
export default {}
</script>
