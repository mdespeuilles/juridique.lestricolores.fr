<template>
  <section>
    <div class="img">
      <img src="/img/valid.svg" />
    </div>
    <h2>Vos modifications ont bien été prises en compte</h2>
    <p>
      Vous pouvez consulter l'état d'avancement de votre formalité depuis l'espace client.
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
  min-height: calc(100vh - 300px);
  h2 {
    font-family: Yeseva One;
    font-size: 36px;
    line-height: 50px;
    text-align: center;
    color: #0B2758;
  }
  > p {
    text-align: center;
    margin-bottom: 30px;
  }

  .password {
    text-align: center;
    margin-bottom: 30px;

    label {
      margin-bottom: 10px;
      display: block;
    }
    input {
      margin: auto;
    }
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
    display: flex;
    justify-content: center;
  }
}
</style>
