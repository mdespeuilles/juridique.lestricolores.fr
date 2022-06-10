<template>
  <section>
    <h2>{{ component.title }}</h2>
    <div class="subtitle">
      <p>Choisissez l'offre qui vous convient parmi nos trois propositions</p>
    </div>

    <div class="products">
      <div v-for="item in component.product" :class="item.color">
        <div class="icon">
          <img :src="getImageUrl(item.icon)" width="80" height="53" :alt="item.title"/>
        </div>
        <div class="price">{{ item.amount }} €<sup> HT</sup></div>
        <div class="sub_title">{{ item.sub_title }}</div>
        <h3>{{ item.title }}</h3>

        <ul>
          <li v-for="i in parseDescription(item.content)">{{ i }}</li>
        </ul>

        <nuxt-link :to="item.link" class="btn">Souscrire</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    component: null
  },
  methods: {
    parseDescription(value) {
      return value.split('\n')
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  padding-top: 60px;
  padding-bottom: 60px;
  h2 {
    color: #0b2758;
    font-family: "Yeseva One";
    font-size: 48px;
    font-weight: 400;
    line-height: 50px;
    text-align: center;
    margin: 0;

    @include phone-600 {
      font-size: 38px;
      line-height: 1.2em;
    }
  }

  div.subtitle {
    margin-bottom: 104px;
    p {
      text-align: center;
    }
  }

  .products {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1006px;
    margin: auto;

    @include desk-1024 {
      flex-direction: column;
    }

    > div {
      width: 302px;
      min-height: 419px;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.07);
      border-radius: 10px;
      background-color: #ffffff;
      position: relative;
      padding-top: 90px;
      padding-left: 22px;
      padding-right: 22px;
      position: relative;
      padding-bottom: 50px;

      @include desk-1024 {
        margin: auto;
        margin-bottom: 150px;
      }

      &.light {
        border-top: 11px solid #e4f0fc;

        .icon {
          border: 2px solid #e4f0fc;
        }
      }

      &.normal {
        border-top: 11px solid #f44336;
        .icon {
          border: 2px solid #f44336;
        }
      }

      &.dark {
        border-top: 11px solid #405986;
        .icon {
          border: 2px solid #405986;
        }
      }

      .icon {
        width: 120px;
        height: 120px;
        border: 2px solid #f44336;
        background-color: #ffffff;
        display: grid;
        place-items: center;
        border-radius: 50%;
        position: absolute;
        top: -65px;
        left: 0;
        right: 0;
        margin: auto;
      }

      ul {
        padding: 0;
        list-style-type: none;
        li {
          background: url("/img/check.svg") no-repeat left top;
          padding-left: 28px;
          color: #405986;
          font-size: 14px;
          font-weight: 400;
          line-height: 16px;
          margin-bottom: 17px;
        }
      }

      .price {
        color: #0b2758;
        font-family: "Yeseva One";
        font-size: 34px;
        font-weight: 400;
        line-height: 50px;
        text-align: center;

        sup {
          font-family: Montserrat;
          font-size: 18px;
          font-weight: 400;
          font-style: normal;
          letter-spacing: normal;
          line-height: 24px;
        }
      }

      .sub_title {
        color: #405986;
        font-size: 12px;
        font-weight: 400;
        line-height: 24px;
        text-align: center;
      }

      h3 {
        color: #0b2758;
        font-family: "Yeseva One";
        font-size: 24px;
        font-weight: 400;
        text-align: center;
        line-height: 40px;
        margin-top: 0;
      }

      a.btn {
        position: absolute;
        bottom: -20px;
        left: 0;
        right: 0;
        margin: auto;
        max-width: 156px;
        text-align: center;
      }
    }
  }
}
</style>
