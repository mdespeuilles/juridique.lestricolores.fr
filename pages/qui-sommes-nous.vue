<template>
  <div class="about">
    <section class="hero">
      <div class="title">
        <h1 v-html="page.attributes.title"></h1>
        <div class="subtitle" v-html="page.attributes.subtitle"></div>
      </div>

      <div class="img">
        <img :src="getImageUrl(page.attributes.image, 428, 361)" width="428" height="361" alt="qui sommes nous"/>
      </div>
    </section>

    <div class="infos" v-html="page.attributes.infos"></div>

    <div class="body">
      <div class="img">
        <img :src="getImageUrl(page.attributes.body_img, 300, 274)" width="300" height="274" alt="notre histoire"/>
      </div>

      <div class="txt" v-html="page.attributes.body"></div>
    </div>
  </div>
</template>
<script>
import Hero from "../components/page/hero";
import qs from "qs";
export default {
  components: {Hero},
  async asyncData({ $axios, route, error }) {
    const query = qs.stringify({
      populate: {
        image: {
          populate: '*'
        },
        body_img: {
          populate: '*'
        },
      }
    }, {
      encodeValuesOnly: true,
    });
    console.log(`/api/about?${query}`)
    let [page] = await Promise.all([
      $axios.get(`/api/about?${query}`),
    ])

    //const page = await $axios.get(`/api/page-produits?${query}`)
    if (page.data.data.length === 0) {
      error({ statusCode: 404, message: 'Page non trouvé' });
    }

    return {
      page: page.data.data
    }
  },
}
</script>

<style lang="scss" scoped>
.about {
  .hero {
    max-width: 1130px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 87px;

    @include desk-1024 {
      flex-direction: column-reverse;
      padding: 0 20px;
      padding-top: 15px;
    }

    .title {
      max-width: 512px;

      h1 {
        ::v-deep p {
          color: #000000;
          font-family: "Yeseva One";
          font-size: 54px;
          font-weight: 400;
          font-style: normal;
          letter-spacing: normal;
          line-height: 50px;
          margin-bottom: 18px;

          @include phone-600 {
            font-size: 34px;
          }

          strong {
            color: #286feb;
          }
        }
      }

      .subtitle {
        font-size: 22px;
        line-height: 32px;
      }
    }

    .img {
      img {
        border-radius: 20px;

        @include desk-1024 {
          max-width: 100%;
          height: auto;
        }
      }
    }
  }

  .infos {
    min-height: 180px;
    background: #F2F7FC;
    display: grid;
    justify-content: center;
    align-items: center;

    ::v-deep {
      text-align: center;
      font-family: Yeseva One;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 30px;
      color: #0B2758;
      margin: 0;
    }
  }

  .body {
    display: flex;
    //justify-content: space-between;
    flex-direction: column;
    align-items: center;
    max-width: 1130px;
    margin: auto;
    padding-top: 75px;
    padding-bottom: 116px;

    @include desk-1024 {
      flex-direction: column;
      padding: 0 20px;
      padding-bottom: 116px;
      padding-top: 75px;
    }

    .img {
      img {
        max-width: 100%;
        height: auto;
      }
    }

    .txt {
      //padding-left: 69px;

      @include desk-1024 {
        padding: 0;
      }
    }
  }
}
</style>
