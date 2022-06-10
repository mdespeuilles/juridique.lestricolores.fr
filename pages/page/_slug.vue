<template>
  <section>
    <article>
      <h1>{{ page.attributes.title }}</h1>


      <div class="body">
        <div v-html="page.attributes.body"></div>
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
    console.log(`/api/pages?${query}`)
    let [page] = await Promise.all([
      $axios.get(`/api/pages?${query}`),
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
    margin-bottom: 50px;
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
        background-color: #286FEB;
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
