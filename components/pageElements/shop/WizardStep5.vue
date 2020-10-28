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
      <div class="relative w-full flex justify-center">
        <FormulateInput
          class="w-full"
          name="coverImage"
          type="image"
          :uploader="uploadCoverImage"
          upload-behavior="delayed"
          :label="$t('shop_registration_wizard.step_5.shop_photo')"
          validation="mime:image/jpeg,image/png"
          element-class="relative h-64 w-full preview-image border-2 border-dashed "
          input-class="absolute top-0 left-0 h-full w-full z-20 opacity-0"
        />
        <div class="absolute top-0 flex h-full w-1/2 items-center z-1">
          <div>
            <img class="mx-auto" src="/img/icons/add-pic.svg" />
            <span class="mx-auto text-center">{{
              $t('dashboard.upload_cover_image')
            }}</span>
          </div>
        </div>
      </div>

      <h2>{{ $t('shop_registration_wizard.step_5.you') }}</h2>
      <p>{{ $t('shop_registration_wizard.step_5.text_you') }}</p>
      <div class="relative w-full flex justify-center">
        <FormulateInput
          class="w-full"
          name="profileImage"
          type="image"
          upload-behavior="delayed"
          :uploader="uploadProfileImage"
          :label="$t('shop_registration_wizard.step_5.you_photo')"
          validation="mime:image/jpeg,image/png"
          element-class="relative h-64 w-full preview-image border-2 border-dashed"
          input-class="absolute top-0 left-0 h-full w-full z-20 opacity-0"
        />
        <div class="absolute top-0 flex h-full w-1/2 items-center z-1">
          <div>
            <img class="mx-auto" src="/img/icons/add-pic.svg" />
            <span class="mx-auto text-center">{{
              $t('dashboard.upload_profile_image')
            }}</span>
          </div>
        </div>
      </div>
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
            :class="{ 'spinner-dark': pending }"
            input-class="button bg-grey-dark text-white w-full hide-on-spinner"
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
  props: {
    pending: {
      type: Boolean,
      default: false,
    },
  },
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
.preview-image img {
  @apply bg-black absolute h-full w-full object-cover top-0 left-0 m-0 z-10;
}
.preview-image .formulate-file-image-preview {
  @apply h-64;
}
.preview-image .formulate-files {
  @apply m-0;
}
.preview-image li {
  @apply m-0;
}
</style>
