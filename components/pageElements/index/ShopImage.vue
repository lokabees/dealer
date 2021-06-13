<template>
  <div>
    <div
      v-if="value && value.url && value.url !== 'cdn-link'"
      class="h-full bg-primary-light"
    >
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
        :src="value.url"
      />
    </div>
    <div v-else>
      <div class="cursor-pointer h-full w-full justify-center flex">
        <input
          :ref="uploadUrl"
          type="file"
          multiple
          accept="image/*,.heic"
          class="
            absolute
            h-full
            w-full
            focus:outline-none
            opacity-0
            z-10
            cursor-pointer
          "
          @change="handleFileChange"
        />
        <div class="absolute top-0 flex h-full max-w-sm items-center z-1 p-2">
          <div v-if="uploading" class="spinner-light w-full" />
          <div v-else>
            <img class="mx-auto w-16 pb-2" src="/img/icons/add-pic.svg" />
            <span class="text-center">{{
              $t('general.picture_upload_placeholder')
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
    value: {
      type: Object,
      default: () => {},
    },
    uploadUrl: {
      type: String,
      default: null,
      required: true,
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
      this.$emit('delete')
    },
    async handleFileChange(e) {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      try {
        this.uploading = true
        const image = await this.$axios.$post(this.uploadUrl, formData)
        const regex = new RegExp('^([a-zA-Z0-9_.-/:])+.(heic|HEIC)$')
        if (regex.test(image.url)) {
          image.url = image.url.substring(0, image.url.length - 4) + 'jpg'
          image.format = 'jpg'
        }
        this.uploading = false
        this.error = null
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
