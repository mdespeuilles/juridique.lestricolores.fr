<template>
  <section>
    service
  </section>
</template>

<script>
export default {
  data() {
    return {
      submission: {
        data: {},
        id: null,
        uuid: null
      }
    }
  },
  mounted() {
    this.$axios.get(`/api/submissions-uuid/${this.$route.params.uuid}`).then(response => {
      this.submission.data = response.data.data
      this.submission.id = response.data.id
      this.submission.uuid = response.data.uuid
    })
  }
}
</script>
