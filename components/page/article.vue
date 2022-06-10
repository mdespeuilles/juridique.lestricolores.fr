<template>
  <section>
    <nuxt-link :to="`/blog/${article.slug}`">
      <img :src="getImageUrl(article.image, 380, 163)" width="380" height="163"/>
    </nuxt-link>
    <div>
      <h2>
        <nuxt-link :to="`/blog/${article.slug}`">{{ article.titre }}</nuxt-link>
      </h2>
      <div class="date">{{ $dayjs(article.date).format("DD MMMM YYYY") }}</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    article: null
  }
}
</script>

<style lang="scss" scoped>
section {
  width: 380px;
  height: 282px;

  background: #FFFFFF;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
  border-radius: 5px;
  position: relative;

  > div {
    padding: 16px 20px;
    h2 {
      font-weight: 800;
      font-size: 18px;
      line-height: 1.4em;
      color: #0B2758;
      margin: 0;
      margin-bottom: 35px;

      a {
        text-decoration: none;
        color: #0B2758;
      }
    }

    .date {
      font-size: 12px;
      line-height: 20px;
      color: #405986;
      position: absolute;
      bottom: 10px;
    }
  }
}
</style>
