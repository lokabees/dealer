<template>
  <div>
    <div>
      <label class="text-sm font-bold">{{ label }}</label>
    </div>
    <div v-if="image" class="bg-primary relative h-64">
      <div>
        <button
          class="absolute top-0 right-0 z-10 bg-white rounded-none"
          @click="image = null"
        >
          X
        </button>
      </div>
      <img
        class="absolute top-0 left-0 w-full h-full object-cover"
        :src="getImageSrc()"
      />
    </div>
    <div v-else>
      <div
        class="relative hover:border-primary h-64 w-full border-2 border-dashed justify-center flex"
      >
        <input
          :ref="uploadUrl"
          type="file"
          multiple
          accept="image/*,.heic"
          class="h-full w-full focus:outline-none opacity-0 z-10"
          @change="handleFileChange"
        />
        <div class="absolute top-0 flex h-full w-1/2 items-center z-1">
          <div v-if="uploading" class="spinner-light w-full" />
          <div v-else>
            <img class="mx-auto w-16" src="/img/icons/add-pic.svg" />
            <span class="mx-auto text-center">{{
              $t('edit_product.upload_product_image')
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <label class="text-danger text-sm font-bold">{{ error }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
      default: null,
    },
    uploadUrl: {
      type: String,
      required: true,
      default: null,
    },
    value: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      uploading: false,
      file: null,
      image: this.value,
      error: null,
    }
  },
  methods: {
    getImageSrc() {
      if (this.image) return this.image.url
      if (this.value) return this.value.url
    },
    async handleFileChange(e) {
      this.file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', this.file)
      try {
        this.uploading = true
        this.image = await this.$axios.$post(this.uploadUrl, formData)
        const regex = new RegExp('^([a-zA-Z0-9_.-/:])+.(heic|HEIC)$')
        if (regex.test(this.image.url))
          this.image.url =
            this.image.url.substring(0, this.image.url.length - 4) + 'jpg'
        this.uploading = false
        this.error = null
        this.$emit('uploaded', this.image)
      } catch (error) {
        this.$errorHandler(error)
        this.uploading = false
        this.error = this.$t('validation_errors.image_upload')
      }
    },
  },
}
</script>
