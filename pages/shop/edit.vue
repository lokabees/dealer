<template>
  <div>
    <h1>edit shop</h1>
    <button class="primary" @click="save">Save</button>
  </div>
</template>

<script>
export default {
  methods: {
    save() {
      this.$router.push('/')
    },
  },
}
</script>
