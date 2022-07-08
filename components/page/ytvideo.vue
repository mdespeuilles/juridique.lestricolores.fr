<template>
  <section>
    <div>
      <client-only>
        <!-- <LazyYoutube maxWidth="800px" :src="component.youtube_url" ref="youtube"/> -->
      </client-only>
    </div>
  </section>
</template>

<script>
// import { LazyYoutube } from "vue-lazytube";
export default {
  components: {
    // LazyYoutube
  },
  props: {
    component: null
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 64px 0;
  > div {
    display: flex;
    justify-content: center;
  }
}
</style>
