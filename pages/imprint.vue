<template>
  <div class="container mb-5 mt-5 md:mt-24">
    <div class="card w-full markdown-body">
      <div v-if="content.content" v-html="$md.render(content.content)"></div>
      <div
        v-if="content.contentMore"
        v-html="$md.render(content.contentMore)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Imprint',
  async asyncData() {
    if (!process.server) {
      return { content: {} }
    }
    const client = require('~/plugins/modules/contentful').default()
    if (!client) {
      return { content: {} }
    }
    const { fields } = await client.getEntry('383HaOpwTeaZpMV4nvJVTp')
    return { content: fields }
  },
  data: () => ({}),
  head() {
    return {
      title: this.content.title,
    }
  },
}
</script>
