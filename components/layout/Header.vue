<template>
  <header>
    <div class="logo">
      <nuxt-link to="/">
        <img src="/img/legalzen-logo.svg" alt="legalzen" loading="lazy" width="150" height="31"/>
      </nuxt-link>
    </div>
    <nav :class="{open: openMenu}">
      <ul>
        <li>
          <span @click="(subMenu) ? subMenu = null : subMenu = 1">Créer une entreprise en ligne</span>
          <ul v-if="subMenu === 1">
            <li>
              <nuxt-link to="/creation/creer-une-sasu-en-ligne">Créer une SASU</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/creation/creer-une-sas-en-ligne">Créer une SAS</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/creation/creer-une-eurl-en-ligne">Créer une EURL</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/creation/creer-une-sarl-en-ligne">Créer une SARL</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/creation/creer-une-sci-en-ligne">Créer une SCI</nuxt-link>
            </li>
          </ul>
        </li>
        <li>
          <nuxt-link to="/modification-entreprise">Modification d'entreprise</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/liquidation-entreprise">Liquidation d'entreprise</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/qui-sommes-nous">Qui sommes-nous</nuxt-link>
        </li>
      </ul>
    </nav>

    <div class="hamburger hamburger--collapse" :class="{'is-active': openMenu}" @click="openMenu = !openMenu">
      <div class="hamburger-box">
        <div class="hamburger-inner"></div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      subMenu: null,
      openMenu: false
    }
  },
  watch: {
    '$route' () {
      this.subMenu = null
    }
  },
}
</script>

<style lang="scss" scoped>
header {
  height: 64px;
  display: flex;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;

  @include desk-1024 {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #FFF;
    z-index: 1;
    border-bottom: 1px solid #E4F0FC;
  }

  .logo {
    width: 228px;
  }

  .hamburger {
    display: none;

    @include desk-1024 {
      display: block;
    }
  }

  nav {
    @include desk-1024 {
      background: #F2F7FC;
      position: fixed;
      right: -320px;
      top: 60px;
      height: 100vh;
      width: 320px;
      transition: 0.5s;
      padding-top: 50px;

      &.open {
        right: 0;
      }
    }
    > ul {
      padding-left: 20px;
      display: flex;
      align-items: center;
      height: 30px;
      list-style-type: none;
      font-size: 14px;
      font-weight: 500;

      @include desk-1024 {
        display: block;
      }

      > li {
        margin-right: 30px;
        position: relative;

        @include phone-600 {
          margin-bottom: 30px;
        }

        a, span {
          color: #405986;
          text-decoration: none;
        }

        span {
          background: url(/img/menu-down.svg) no-repeat center right;
          padding-right: 20px;
          cursor: pointer;
        }

        > ul {
          list-style-type: none;
          position: absolute;
          padding: 10px;
          background: #FFFFFF;
          box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
          top: 30px;
          width: 350px;

          @include desk-1024 {
            position: static;
            background: transparent;
            box-shadow: none;
          }

          > li {
            display: block;
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>
