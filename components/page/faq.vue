<template>
  <section>
    <h2>{{ component.title }}</h2>
    <div class="subtitle">{{ component.sub_title }}</div>

    <div class="faqs">
      <div class="faq" v-for="item in component.faq">
        <h3 @click="toggleQuestion(item.id)">{{ item.title }}</h3>
        <div v-html="item.response" v-if="openQuestion === item.id"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    component: null
  },
  data() {
    return {
      openQuestion: null
    }
  },
  methods: {
    toggleQuestion(qId) {
      if (this.openQuestion === qId) {
        this.openQuestion = null
      }
      else {
        this.openQuestion = qId
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  background-color: #f2f7fc;
  padding-top: 80px;
  padding-bottom: 80px;

  h2 {
    color: #0b2758;
    font-family: "Yeseva One";
    font-size: 48px;
    font-weight: 400;
    line-height: 50px;
    text-align: center;
    margin: 0;
    margin-bottom: 16px;

    @include phone-600 {
      font-size: 38px;
      line-height: 1.2em;
    }
  }

  .subtitle {
    text-align: center;
    max-width: 399px;
    margin: auto;
    margin-bottom: 65px;
  }

  .faqs {
    max-width: 980px;
    margin: auto;

    @include desk-1024 {
      max-width: 90%;
    }

    .faq {
      h3 {
        color: #405986;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 1px;
        height: 70px;
        display: flex;
        align-items: center;
        background: url(/img/menu-down.svg) no-repeat right center;
        border-bottom: 1px solid rgba(64, 89, 134, 0.3);
        margin: 0;
        cursor: pointer;
        padding-right: 20px;
      }
    }
  }
}
</style>
