<template>
  <div class="icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      :fill="fill"
      v-html="icon"
    />
  </div>
</template>

<script>
// import VLazy from 'vue-lazy-hydration'

export default {
  name: 'Icon',
  components: {
    // ,
  },
  props: {
    // Name of the icon
    name: {
      type: String,
      default: undefined,
    },
    // Width of the icon
    width: {
      type: [String, Number],
      default: 18,
    },
    // Height of the icon
    height: {
      type: [String, Number],
      default: 18,
    },
    // Fill color of the Icon like #ff0000
    fill: {
      type: String,
      default: 'currentColor',
    },
  },
  computed: {
    icon() {
      // Computed icon name
      // @arg The argument is a string value representing the name of the icon
      return this.getIcon(this.name)
    },
  },
  methods: {
    // @vuese
    // Get name of the icon
    getIcon(name) {
      if (name) {
        try {
          return require('vue-unicons/src/icons')[name].path
        } catch (e) {
          console.log(e)
          // Todo: Bind error handler
        }
      }
    },
  },
}
</script>
