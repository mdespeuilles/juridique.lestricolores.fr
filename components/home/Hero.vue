<template>
  <section>
    <div class="title">
      <h1 v-html="page.attributes.title"></h1>
      <div class="subtitle" v-html="page.attributes.sub_title"></div>
    </div>

    <div class="img">
      <picture>
        <source :srcset="getImageUrl(page.attributes.image, 335, 313)"
                width="335" height="313"
                media="(max-width: 680px)">
        <img :src="getImageUrl(page.attributes.image, 650, 608)" width="650" height="608" alt="Les tricolores" />
      </picture>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    page: null
  }
}
</script>

<style lang="scss" scoped>
section {
  max-width: 1130px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include desk-1024 {
    flex-direction: column-reverse;
    padding: 0 20px;
    padding-top: 15px;
  }

  .title {
    max-width: 399px;

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

        strong {
          color: #f44336;
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
</style>
