<template>
  <div>
    <div v-if="context.model.url" class="relative h-64">
      <div>
        <button
          class="absolute top-0 right-0 z-10 bg-white rounded-none"
          @click="deleteImage"
        >
          X
        </button>
      </div>
      <img
        class="absolute top-0 left-0 w-full h-full object-cover"
        :src="context.model.url"
      />
    </div>
    <div v-else>
      <div
        class="relative hover:border-primary cursor-pointer h-64 w-full border-2 border-dashed justify-center flex"
      >
        <input
          :ref="context.uploadUrl"
          type="file"
          multiple
          accept="image/*,.heic"
          class="h-full w-full focus:outline-none opacity-0 z-10 cursor-pointer"
          @change="handleFileChange"
        />
        <div class="absolute top-0 flex h-full max-w-sm items-center z-1 p-2">
          <div v-if="uploading" class="spinner-light w-full" />
          <div v-else>
            <img class="mx-auto w-16 pb-2" src="/img/icons/add-pic.svg" />
            <span class="text-center">{{
              $t('edit_product.upload_product_image')
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      uploading: false,
      error: null,
    }
  },
  methods: {
    deleteImage() {
      this.context.model = {}
      this.$emit('delete')
    },
    async handleFileChange(e) {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      try {
        this.uploading = true
        const image = await this.$axios.$post(this.context.uploadUrl, formData)
        const regex = new RegExp('^([a-zA-Z0-9_.-/:])+.(heic|HEIC)$')
        if (regex.test(image.url)) {
          image.url = image.url.substring(0, image.url.length - 4) + 'jpg'
          image.format = 'jpg'
        }
        this.uploading = false
        this.error = null
        this.context.model = image
        this.$emit('uploaded', image)
      } catch (error) {
        this.$errorHandler(error)
        this.uploading = false
        this.error = this.$t('validation_errors.image_upload')
      }
    },
  },
}
</script>
