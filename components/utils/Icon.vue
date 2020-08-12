<template>
  <i class="">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      viewBox="0 0 24 24"
      :fill="fill"
      @click="$emit('click')"
      v-html="icon"
    />
  </i>
</template>

<script>
export default {
  name: 'Icon',
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
      return this.getEvaIcon(this.name)
    },
  },
  methods: {
    // @vuese
    // Get name of the icon
    getEvaIcon(name) {
      if (name) {
        try {
          return require('eva-icons/eva').icons[name].contents
        } catch (e) {
          // Todo: Bind error handler
        }
      }
    },
  },
}
</script>
