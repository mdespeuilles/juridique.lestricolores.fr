<template>
  <div> 
    <master :components="page.attributes.components" :reviews="reviews" :faqs="faqs"/>
  </div>
</template>

<script>
import Hero from "../components/home/Hero";
import Master from "../components/page/master";
const qs = require('qs');
export default {
  components: {Master, Hero},
  async asyncData({ $axios, route, error }) {
    let reviews = []
    let faqs = []
    const query = qs.stringify({
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
    console.log(`/api/home?${query}`)
    let [page] = await Promise.all([
      $axios.get(`/api/home?${query}`),
    ])
    try {
    const getReviews = await $axios.get(`https://api.lestricolores.fr/reviews`)
    reviews = getReviews.data.items;
    } catch (error) {
    }

      try {
    const getFAQ = await $axios.get(`https://api.lestricolores.fr/faqs/home`)
    faqs = getFAQ.data;
    } catch (error) {
    }
    

    if (page.data.data.length === 0) {
      error({ statusCode: 404, message: 'Page non trouvé' });
    }

    return {
      page: page.data.data,
      reviews,
      faqs
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
