<template>
  <section>
    <div class="txt">
      <h1 v-html="page.title_page"></h1>
      <p>{{ page.sub_title }}</p>

      <div class="description" v-html="page.description"></div>
      <span>{{ page.price }}</span>

      <div class="form">
        <input type="email" placeholder="Votre adresse e-mail" v-model="email"/>
        <button @click="start">Démarrer</button>
      </div>
    </div>
    <div class="img">
      <img :src="getImageUrl(page.image, 414, 427)" width="414" height="427" :alt="page.sub_title"/>
      <div class="blue-title">
        <strong>Simple, Rapide &</strong> <br /><strong>100% en ligne</strong>
      </div>

      <div class="small">Soyez satisfaits ou remboursés</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    page: null,
    email: null
  },
  methods: {
    start() {
      this.$cookies.set('email', this.email)
      this.$router.push({
        path: `/creation-entreprise/${this.page.type}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  max-width: 980px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 140px;
  padding-top: 70px;

  @include desk-1024 {
    flex-direction: column-reverse;
  }

  @include phone-600 {
    max-width: 95%;
  }

  > div {
    &.txt {
      h1 {
        font-family: Yeseva One;
        font-weight: normal;
        font-size: 54px;
        line-height: 50px;
        color: #0B2758;
        margin-bottom: 20px;

        @include phone-600 {
          font-size: 44px;
          text-align: center;
        }

        ::v-deep p {
          margin: 0;

          @include phone-600 {
            text-align: center;
          }
        }

        ::v-deep strong {
          color: #f44336;
        }
      }

      > p {
        font-size: 24px;
        line-height: 32px;
        max-width: 399px;
        margin-top: 0;

        @include phone-600 {
          text-align: center;
        }
      }

      .description {
        ::v-deep * {
          font-size: 18px;
          line-height: 24px;
          color: #0B2758;

          @include phone-600 {
            text-align: center;
          }

          strong {
            background-color: #F2F7FC;
            font-weight: normal;
          }
        }

        ::v-deep p {
          margin-bottom: 10px;
        }
      }

      > span {
        font-size: 12px;
        line-height: 24px;
        font-weight: bold;
        color: #0B2758;

        @include phone-600 {
          display: block;
          text-align: center;
        }
      }

      .form {
        padding-top: 10px;

        @include phone-600 {
          display: flex;
          flex-direction: column;
        }

        input {
          border: 1px solid #405986;
          box-sizing: border-box;
          border-radius: 100px;
          width: 309px;
          height: 40px;
          padding: 0 23px;
          margin-right: 10px;

          @include phone-600 {
            margin: auto;
            margin-bottom: 20px;
          }
        }

        button {
          @include phone-600 {
            width: 260px;
            margin: auto;
          }
        }
      }
    }
    &.img {
      position: relative;
      @include desk-1024 {
        display: none;
      }
      > div.blue-title {
        position: absolute;
        bottom: -71px;
        right: 0;
        text-align: right;

        strong {
          font-weight: 800;
          font-size: 32px;
          color: #FFF;
          line-height: 61px;
          background-color: #f44336;
          display: inline-block;
          padding: 0 30px;
        }
      }

      .small {
        position: absolute;
        right: 50px;
        bottom: -90px;
        font-size: 12px;
      }
    }
  }
}
</style>
