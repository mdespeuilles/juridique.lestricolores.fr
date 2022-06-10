<template>
  <section>
    <article>
      <h1>{{ page.attributes.titre }}</h1>
      <div class="date">{{ $dayjs(page.attributes.date).format("DD MMMM YYYY") }}</div>
      <div class="follow">
        <span>SUIVEZ-NOUS</span>
        <a href="#">
          <img src="/img/coeur.svg" />
        </a>
        <a href="https://www.linkedin.com/in/legal-zen/" target="_blank">
          <img src="/img/linkedin.svg" />
        </a>
        <a href="https://twitter.com/legal__zen" target="_blank">
          <img src="/img/twitter.svg" />
        </a>
      </div>

      <div class="img">
        <img :src="getImageUrl(page.attributes.image, 980, 465)" width="980" height="465"/>
      </div>

      <div v-for="component in page.attributes.components">
        <div class="body" v-if="component.__component === 'library.body'">
          <div v-html="component.text"></div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import qs from "qs";

export default {
  async asyncData({ $axios, route, error }) {
    const query = qs.stringify({
      filters: {
        slug: {
          $eq: route.params.slug
        }
      },
      populate: {
        components: {
          populate: ['*'],
        },
        image: {
          populate: '*'
        },
        seo: {
          populate: '*',
          image: true
        }
      }
    }, {
      encodeValuesOnly: true,
    });
    console.log(`/api/articles?${query}`)
    let [page] = await Promise.all([
      $axios.get(`/api/articles?${query}`),
    ])

    //const page = await $axios.get(`/api/page-produits?${query}`)
    if (page.data.data.length === 0) {
      error({ statusCode: 404, message: 'Page non trouvé' });
    }

    return {
      page: page.data.data[0]
    }
  },
  head () {
    return {
      title: (this.page.attributes.seo.title) ? this.page.attributes.seo.title : null,
      meta: [
        { hid: 'description', name: 'description', content: this.page.attributes.seo.description },
        { hid: 'og:description', name: 'og:description', content: this.page.attributes.seo.description },
        { hid: 'og:title', name: 'og:title', content: this.page.attributes.seo.title },
        { hid: 'og:type', name: 'og:type', content: 'website' },
        { hid: 'og:url', name: 'og:url', content: `/${this.$route.params.slug}` }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  max-width: 980px;
  margin: auto;

  h1 {
    text-align: center;
    font-family: Yeseva One;
    font-weight: normal;
    font-size: 48px;
    line-height: 50px;
    color: #0B2758;
    margin-bottom: 25px;
  }

  .date {
    font-size: 12px;
    line-height: 20px;
    color: #405986;
    text-align: center;
    margin-bottom: 17px;
  }

  .body {
    max-width: 780px;
    margin: auto;

    ::v-deep ul {
      padding-left: 20px;
    }

    ::v-deep h2 {
      font-family: Yeseva One;
      font-style: normal;
      font-weight: normal;
      font-size: 36px;
      line-height: 50px;
      color: #0B2758;
      position: relative;
      padding-left: 20px;
      margin-top: 0;
      margin-bottom: 0;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 4px;
        height: 32px;
        background-color: #f44336;
        box-shadow: 0px 0px 10px rgba(40, 111, 235, 0.6);
      }
    }
  }

  .img {
    margin-bottom: 50px;
    img {
      max-width: 100%;
    }
  }

  .follow {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 62px;

    span {
      font-weight: 800;
      font-size: 14px;
      line-height: 18px;
      text-align: right;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #405986;
      margin-right: 15px;
    }

    a {
      margin-right: 15px;
    }
  }
}
</style>
