<template>
  <section>
    <div class="heading">
      <h1>Découvrez tout sur la création d’entreprise</h1>
    </div>

    <div class="articles">
      <div class="count">
        {{ pagination.total }} articles à découvrir
      </div>

      <div class="grid">
        <Article :article="article.attributes" v-for="article of articles" :key="article.id"/>
      </div>
    </div>
  </section>
</template>
<script>
import Article from "../../components/page/article";
import qs from "qs";
export default {
  components: {Article},
  async asyncData({ $axios, route, error }) {
    const query = qs.stringify({
      populate: {
        image: {
          populate: '*'
        },
      }
    }, {
      encodeValuesOnly: true,
    });
    console.log(`/api/articles?${query}`)
    let [articles] = await Promise.all([
      $axios.get(`/api/articles?${query}`),
    ])

    return {
      articles: articles.data.data,
      pagination: articles.data.meta.pagination
    }
  },
}
</script>

<style lang="scss" scoped>
section {
  .heading {
    height: 238px;
    background: rgba(228, 240, 252, 0.4);
    display: grid;
    place-items: center;

    h1 {
      font-family: Yeseva One;
      font-style: normal;
      font-weight: normal;
      font-size: 36px;
      line-height: 50px;
      text-align: center;
      color: #0B2758;
      max-width: 695px;
    }
  }

  .articles {
    max-width: 1180px;
    margin: auto;
    padding-top: 35px;

    @include desk-1280 {
      max-width: 779px;
    }

    .count {
      font-weight: 800;
      font-size: 22px;
      line-height: 32px;
      color: #0B2758;
      margin-bottom: 20px;
    }

    .grid {
      display: grid;
      grid-gap: 20px;
      grid-template-columns: 1fr 1fr 1fr;
      padding-bottom: 50px;

      @include desk-1280 {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}
</style>
