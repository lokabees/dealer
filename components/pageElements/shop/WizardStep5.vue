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
        type="imageUpload"
        :label="$t('shop_registration_wizard.step_5.shop_photo')"
        upload-url="/api/media/shop"
        @uploaded="updateActiveShopImages({ cover: $event })"
        @delete="removeActiveShopImage('cover')"
      />

      <h2>{{ $t('shop_registration_wizard.step_5.you') }}</h2>
      <p>{{ $t('shop_registration_wizard.step_5.text_you') }}</p>
      <FormulateInput
        type="imageUpload"
        :label="$t('shop_registration_wizard.step_5.you_photo')"
        upload-url="/api/media/shop"
        @uploaded="updateActiveShopImages({ profile: $event })"
        @delete="removeActiveShopImage('profile')"
      />
      <!--
      <h2>{{ $t('shop_registration_wizard.step_5.extra_points') }}</h2>
      <p>{{ $t('shop_registration_wizard.step_5.text_extra_points') }}</p>
      <FormulateInput
        :value="activeShop.videoLink"
        type="text"
        :placeholder="$t('shop_registration_wizard.step_5.yt_link_placeholder')"
        :label="$t('shop_registration_wizard.step_5.yt_link')"
      />
    -->
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
      removeActiveShopImage: 'removeActiveShopImage',
    }),
  },
}
</script>
