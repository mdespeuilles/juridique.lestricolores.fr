<template>
  <div>
    Fait à
    <span v-if="submission.siege === 'dirigeant'">
      {{ submission.president.ville }}
    </span><br />
    <span>Le {{ today }}</span>
  </div>
</template>

<script>
export default {
  props: {
    submission: null
  },
  computed: {
    today() {
      return this.$dayjs().format("DD/MM/YYYY")
    }
  }
}
</script>
