<template>
  <section>
    <hero :page="page.attributes"/>
    <master :components="page.attributes.components"/>
  </section>
</template>

<script>
import Hero from "../../components/page/hero";
import ThreeSteps from "../../components/page/three-steps";
import Master from "../../components/page/master";
const qs = require('qs');
export default {
  components: {Master, ThreeSteps, Hero},
  async asyncData({ $axios, route, error }) {
    const query = qs.stringify({
      filters: {
        slug: {
          $eq: route.params.slug,
        },
      },
      populate: {
        components: {
          populate: ['*'],
        },
        image: {
          populate: '*'
        },
        seo: {
          populate: '*'
        }
      }
    }, {
      encodeValuesOnly: true,
    });
    console.log(`/api/page-produits?${query}`)
    let [page] = await Promise.all([
      $axios.get(`/api/page-produits?${query}`),
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
