<template>
  <div class="box-header">
    <section>
    <div class="right">
      <div class="logo">
       <a href="/" title="Les tricolores">
       <img loading="lazy" src="/img/logo-in-red.svg" alt="Les Tricolores - Domiciliation en ligne" title="Les Tricolores - Domiciliation en ligne" class="desk" style="width: 19px; height: 31px;"> 
        Les tricolores
      </a>
         
      </div>

      <div class="menu">
        <ul>
          <li>
            <nuxt-link to="/">ACCUEIL</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/">CREATION ENTREPRISE</nuxt-link>
          </li>
           <li>
            <nuxt-link to="/">MODIFICATION ENTREPRISE</nuxt-link>
          </li>
           <li>
            <nuxt-link to="/">LIQUIDATION ENTREPRISE </nuxt-link>
          </li>
           <li>
            <nuxt-link to="/">A PROPOS </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/">BLOG</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/">CONTACT</nuxt-link>
          </li>
          <li>
            <a class="phone" href="">01 85 85 69 47</a>
          </li>
          <li>
                  <a href="#" class="btn btn-client">Espace client</a>

          </li>
        </ul>
      </div>
    </div>
  </section>
  </div>
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
.box-header{
 max-width: 100%;
 width: 100%;
}
section {
  margin: 0 auto;
  position: relative;
  z-index: 4;
  background: #364151;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
    .logo { 
      padding-left: 10px;
      a{
         height: 30px;
      width: 168px;
         display: flex;
      justify-content: space-between;
      align-items: center;
 font-weight: bold;
       color:white;
       text-transform: uppercase;
       text-decoration: none;
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
        font-size: 13px;
        

        li {
          flex: none;
          a {
            color: white;
            text-decoration: none;
            margin: 0 10px;
            font-weight: bold;
          }
          .phone{
            font-size: 20px;
          }
           a.btn-client {
            margin-left: 10px;
            background-color: #f95258;
            padding: 5px 15px;
            display: inline-block;
            color: white;
            text-transform: uppercase;
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }

 
}
</style>
