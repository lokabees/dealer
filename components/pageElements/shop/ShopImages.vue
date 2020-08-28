<template>
  <div class="container prose max-w-xl mx-auto">
    <h1>{{ $t('shop_registration_wizard.step_5.title') }}</h1>
    <p>
      {{ $t('shop_registration_wizard.step_5.text') }}
    </p>

    <h2>{{ $t('shop_registration_wizard.step_5.your_store') }}</h2>
    <p>{{ $t('shop_registration_wizard.step_5.text_store') }}</p>
    <FormulateForm @submit="submit">
      <FormulateInput
        name="coverImage"
        type="image"
        :uploader="uploadCoverImage"
        upload-behavior="delayed"
        :label="$t('shop_registration_wizard.step_5.store_photo')"
        validation="mime:image/jpeg,image/png"
      />
      <h2>{{ $t('shop_registration_wizard.step_5.you') }}</h2>
      <p>{{ $t('shop_registration_wizard.step_5.text_you') }}</p>
      <FormulateInput
        name="profileImage"
        type="image"
        upload-behavior="delayed"
        :uploader="uploadProfileImage"
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
      <FormulateInput
        type="submit"
        :label="$t('shop_registration_wizard.next')"
      />
    </FormulateForm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      creatives: {},
    }
  },
  methods: {
    async uploadCoverImage(file, progress, error, options) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const imgLocal = await this.$axios.$post(`/api/media/shop`, formData)
        this.creatives.cover = imgLocal
      } catch (err) {
        // TODO handle error
        console.error(err)
      }
    },
    async uploadProfileImage(file, progress, error, options) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const imgLocal = await this.$axios.$post(`/api/media/shop`, formData)
        this.creatives.profile = imgLocal
      } catch (err) {
        // TODO handle error
        console.error(err)
      }
    },
    submit() {
      this.$emit('submit', this.creatives)
    },
  },
}
</script>
