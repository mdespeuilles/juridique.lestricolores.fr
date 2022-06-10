<template>
  <section>
    <h2>{{ component.title }}</h2>
    <div class="description" v-html="component.description"></div>

    <div class="steps">
      <div class="step" v-for="item in component.step">
        <div class="img">
          <img :src="getImageUrl(item.image, 464, 278)" width="464" height="278" :alt="item.description"/>
        </div>
        <div class="txt">
          <h3 v-html="item.title"></h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    component: null
  }
}
</script>

<style lang="scss" scoped>
section {
  background: #F2F7FC;
  padding-top: 122px;
  padding-bottom: 60px;

  @include phone-600 {
    padding-right: 20px;
    padding-left: 20px;
  }

  h2 {
    text-align: center;
    color: #0b2758;
    font-family: "Yeseva One";
    font-size: 48px;
    font-weight: 400;
    line-height: 50px;
    margin-bottom: 20px;
    margin-top: 0;

    @include phone-600 {
      font-size: 38px;
      line-height: 1.2em;
    }
  }

  .description {
    margin-bottom: 80px;
    ::v-deep p {
      margin: 0;
      text-align: center;
      color: #405986;
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
    }
  }

  .steps {
    max-width: 1086px;
    margin: auto;
    > div.step {
      display: flex;
      justify-content: space-between;
      flex-direction: row-reverse;
      align-items: center;

      @include desk-1024 {
        flex-direction: column;
      }

      &:first-child, &:last-child {
        flex-direction: row;

        @include desk-1024 {
          flex-direction: column;
        }

        > div {
          &.txt {
            h3 {
              text-align: left;
              @include desk-1024 {
                text-align: center;
                margin-top: 30px;
              }
            }

            p {
              text-align: left;
              @include desk-1024 {
                text-align: center;
              }
            }
          }
        }
      }

      > div {
        max-width: 464px;
        &.img {
          img {
            max-width: 100%;
          }
        }

        &.txt {
          h3 {
            text-align: right;
            color: #0b2758;
            font-family: "Yeseva One";
            font-size: 24px;
            font-weight: 400;
            line-height: 30px;
            margin: 0;

            @include desk-1024 {
              text-align: center;
              margin-top: 30px;
            }

            ::v-deep p {
              margin: 0;

              @include desk-1024 {
                text-align: center;
              }

              strong {
                color: #f44336;
              }
            }
          }

          p {
            text-align: right;
            color: #405986;
            font-size: 18px;
            font-weight: 400;
            line-height: 24px;

            @include desk-1024 {
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
