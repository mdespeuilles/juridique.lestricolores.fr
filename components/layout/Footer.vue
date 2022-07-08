<template>
  <section>
    <div>
    </div>

    <div class="bottom">
      <div class="social">
        <span>SUIVEZ-NOUS</span>
        <a href="https://www.linkedin.com/in/les-tricolores-9a792517b/?originalSubdomain=fr" target="_blank">
          <img src="/img/linkedin-box.svg" alt="linkedin" title="linkedin" loading="lazy" height="20" width="20">
        </a>
        <a href="https://twitter.com/LesTricolores" target="_blank">
          <img src="/img/twitter-box.svg" alt="Twitter" title="Twitter" loading="lazy" width="23" height="18">
        </a>
      </div>

      <nav>
        <ul>
          <li>
            <nuxt-link to="/page/mentions-legales">Mentions légales</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/page/conditions-generales-de-vente">Condition générales de ventes</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
section {
  min-height: 199px;
  background: #f44336;
  padding-top: 50px;
  padding-bottom: 20px;

  > div {
    max-width: 1280px;
    margin: auto;

    @include desk-1280 {
      max-width: 1024px;
    }

    @include desk-1024 {
      max-width: 90%;
    }

    &.bottom {
      width: 100%;
      padding-top: 42px;
      display: flex;

      @include phone-600 {
        flex-direction: column;
      }

      nav {
        ul {
          padding: 0;
          margin: 0;
          list-style-type: none;
          display: flex;

          @include phone-600 {
            flex-direction: column;
            padding-top: 30px;
          }

          li {
            @include phone-600 {
              margin-bottom: 10px;
            }

            a {
              text-decoration: none;
              color: #FFF;
              margin-right: 10px;
            }
          }
        }
      }

      .social {
        display: flex;
        align-items: center;
        > span {
          font-weight: 800;
          font-size: 14px;
          line-height: 18px;
          letter-spacing: 2px;
          color: #FFF;
          margin-right: 20px;
        }

        a {
          margin-right: 30px;
        }
      }
    }
  }
}
</style>
