<template>
  <section>
    <h1>Choisissez votre statut</h1>

    <div>
      <nuxt-link to="/creation-entreprise/sasu">SASU</nuxt-link>
      <nuxt-link to="/creation-entreprise/sas">SAS</nuxt-link>
      <nuxt-link to="/creation-entreprise/eurl">EURL</nuxt-link>
      <nuxt-link to="/creation-entreprise/sarl">SARL</nuxt-link>
      <nuxt-link to="/creation-entreprise/sci">SCI</nuxt-link>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  max-width: 781px;
  margin: auto;
  padding-top: 30px;
  padding-bottom: 220px;

  @include desk-900 {
    max-width: 95%;
  }

  h1 {
    font-family: 'Yeseva One';
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 50px;
    text-align: center;
    color: #0B2758;
    margin-bottom: 94px;
  }

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;

    @include desk-900 {
      grid-template-columns: 1fr 1fr;
    }

    @include phone-600 {
      grid-template-columns: 1fr;
      width: 247px;
      margin: auto;
    }

    a {
      width: 247px;
      height: 70px;
      left: 250px;
      top: 301px;

      background: #FFFFFF;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      border-radius: 10px;
      display: grid;
      place-items: center;
      text-decoration: none;
      font-weight: 400;
      font-size: 16px;
      color: #405986;
    }
  }
}
</style>
