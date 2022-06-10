<template>
  <section>
    <div class="img">
      <img src="/img/valid.svg" />
    </div>
    <h2>Félicitation, votre paiement de {{ submission.data.cartInfo.total.totalTtc|currency }}<br />
      a été réalisé avec succès</h2>
    <p>
      Votre référence dossier est le <strong>{{ submission.reference }}</strong>.
      <br /><br />
      Afin de pouvoir suivre l'avancement de votre dossier, merci de choisir un mot de passe. Il vous permettera de vous connecter à votre espace client.
    </p>

    <div class="password">
      <label>Définir votre mot de passe :</label>
      <input type="password" v-model="password" placeholder="Choisir un mot de passe...">
    </div>

    <div class="actions">
      <button @click="goToNext">Continuer</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    submission: null
  },
  data() {
    return {
      password: null
    }
  },
  methods: {
    async goToNext() {
      const response = await this.$axios.post('/api/auth/local/register', {
        username: this.submission.data.email,
        email: this.submission.data.email,
        password: this.password
      }).catch(err => {
        console.log(err)
      })

      this.$axios.post('/api/submissions-attach', {
        email: this.submission.data.email,
        uuid: this.submission.uuid
      })

      this.$emit('next')
    }
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
}
</style>
