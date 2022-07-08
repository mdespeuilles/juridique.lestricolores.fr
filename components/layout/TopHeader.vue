<template>
  <section>
    <div class="right">
      <div class="social">
        <a href="https://www.linkedin.com/in/les-tricolores-9a792517b/?originalSubdomain=fr" target="_blank">
          <img src="/img/linkedin.svg" alt="linkedin" title="linkedin" loading="lazy" width="20" height="20">
        </a>
        <a href="https://twitter.com/LesTricolores" target="_blank">
          <img src="/img/twitter.svg" alt="Twitter" title="Twitter" loading="lazy" width="23" height="18">
        </a>
      </div>

      <div class="menu">
        <ul>
          <li>
            <nuxt-link to="/contact">Contactez-nous</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/blog">Blog</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="left">
      <!--<a href="#" class="link">Se connecter</a>-->
      <a href="tel:+33176411499" class="phone"><span>🇫🇷</span><span>01 85 85 69 47</span></a>
      <nuxt-link to="/login" class="btn" v-if="!$auth.loggedIn">Se connecter</nuxt-link>
      <nuxt-link to="/espace-client" class="btn" v-if="$auth.loggedIn">Mon espace</nuxt-link>
      <a href="#" class="btn logout" v-if="$auth.loggedIn" @click.prevent="logout">Se deconnecter</a>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  background: rgba(249,82,88, .11);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;

  @include desk-1024 {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1;
    padding-left: 20px;
    padding-right: 20px;
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .social {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      width: 100px;
      padding-right: 20px;
      border-right: 1px solid rgba(64, 89, 134, 0.2);

      @include desk-900 {
        justify-content: flex-start;
        width: auto;
      }

      @include phone-600 {
        display: none;
      }

      span {
        font-weight: 700;
        font-size: 14px;
        letter-spacing: 2px;

        @include desk-900 {
          display: none;
        }
      }

      a {
        margin-right: 15px;
      }
    }

    .menu {

      @include phone-600 {
        display: none;
      }

      ul {
        padding-left: 20px;
        display: flex;
        align-items: center;
        height: 30px;
        list-style-type: none;
        font-size: 14px;
        font-weight: 500;

        li {
          margin-right: 30px;
          a {
            color: #405986;
            text-decoration: none;
          }
        }
      }
    }
  }

  .left {
    a.link {
      font-size: 14px;
      color: #405986;
      text-decoration: none;
      margin-right: 20px;
    }

    a.phone {
      color: #405986;
      text-decoration: none;
      margin-right: 20px;

      span:first-child {
        margin-right: 10px;
      }
    }

    a.logout {
      margin-left: 10px;
      background-color: #FFF;
      color: #000;
    }
  }
}
</style>
