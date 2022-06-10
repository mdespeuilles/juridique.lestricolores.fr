<template>
  <section>
    <div class="img">
      <img src="/img/valid.svg" />
    </div>
    <h2>Votre demande a été transmise à nos formalistes</h2>
    <p>
      Votre référence dossier est le <strong>{{ submission.reference }}</strong>.
      <br /><br />
      Vous pouvez suivre l'avancement de votre dossier depuis l'espace client
    </p>

    <div class="actions">
      <nuxt-link class="btn" to="/espace-client">Espace client</nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    submission: null
  }
}
</script>

<style lang="scss" scoped>
section {
  h2 {
    margin-bottom: 0;
  }
  > p {
    text-align: center;
    margin-bottom: 30px;
  }

  .img {
    width: 90px;
    height: 90px;
    background: #FFFFFF;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
    border-radius: 50%;
    display: grid;
    place-items: center;
    margin: auto;
    margin-top: 50px;
  }

  .actions {
    a {
      color:  #FFF !important;
    }
  }
}
</style>
