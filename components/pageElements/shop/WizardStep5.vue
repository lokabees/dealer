<template>
  <div class="container prose max-w-xl mx-auto">
    <h1 class="text-center pt-16">
      {{ $t('shop_registration_wizard.step_5.title') }}
    </h1>
    <p class="text-center pb-8">
      {{ $t('shop_registration_wizard.step_5.text') }}
    </p>

    <h2>{{ $t('shop_registration_wizard.step_5.your_shop') }}</h2>
    <p>{{ $t('shop_registration_wizard.step_5.text_shop') }}</p>
    <FormulateForm @submit="$emit('submit')">
      <FormulateInput
        name="coverImage"
        type="image"
        :uploader="uploadCoverImage"
        upload-behavior="delayed"
        :label="$t('shop_registration_wizard.step_5.shop_photo')"
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
        :value="activeShop.videoLink"
        type="text"
        :placeholder="$t('shop_registration_wizard.step_5.yt_link_placeholder')"
        :label="$t('shop_registration_wizard.step_5.yt_link')"
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
export default {
  computed: {
    ...mapGetters('shops', {
      activeShop: 'activeShop',
    }),
  },
  methods: {
    ...mapMutations('shops', {
      updateActiveShopImages: 'updateActiveShopImages',
    }),
    async uploadCoverImage(file, progress, error, options) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const imgLocal = await this.$axios.$post(`/api/media/shop`, formData)
        this.updateActiveShopImages({ cover: imgLocal })
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
        this.updateActiveShopImages({ profile: imgLocal })
      } catch (err) {
        // TODO handle error
        console.error(err)
      }
    },
  },
}
</script>

<style lang="scss">
.formulate-input {
  @apply border-0;

  &[data-classification='file'] {
    .formulate-input-upload-area {
      @apply p-5 border-dashed border-2 relative pb-1/3;

      input {
        // The actual upload element
        @apply absolute top-0 left-0 w-full h-full;

        #file-upload-button {
          @apply hidden;
        }
      }
    }
  }
}
</style>
