<template>
  <div class="container prose max-w-xl mx-auto">
    <h1>{{ $t('shop_registration_wizard.step_5.title') }}</h1>
    <p>
      {{ $t('shop_registration_wizard.step_5.text') }}
    </p>

    <h2>{{ $t('shop_registration_wizard.step_5.your_store') }}</h2>
    <p>{{ $t('shop_registration_wizard.step_5.text_store') }}</p>
    <FormulateInput
      type="image"
      :label="$t('shop_registration_wizard.step_5.store_photo')"
      validation="mime:image/jpeg,image/png"
    />
    <h2>{{ $t('shop_registration_wizard.step_5.you') }}</h2>
    <p>{{ $t('shop_registration_wizard.step_5.text_you') }}</p>
    <FormulateInput
      type="image"
      :label="$t('shop_registration_wizard.step_5.you_photo')"
      validation="mime:image/jpeg,image/png"
    />
    <h2>{{ $t('shop_registration_wizard.step_5.extra_points') }}</h2>
    <p>{{ $t('shop_registration_wizard.step_5.text_extra_points') }}</p>
    <FormulateInput
      v-model="creatives.videoLink"
      type="text"
      :placeholder="$t('shop_registration_wizard.step_5.yt_link_placeholder')"
      :label="$t('shop_registration_wizard.step_5.yt_link')"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      creatives: {},
    }
  },
}
</script>
