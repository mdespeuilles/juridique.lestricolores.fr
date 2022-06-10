<template>
  <section>
    <master />
  </section>
</template>


<script>
import Master from "../../components/form/master";
export default {
  components: {
    Master
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
section {
  max-width: 880px;
  margin: auto;
  padding-top: 30px;
  min-height: calc(100vh - 353px);
}
</style>
