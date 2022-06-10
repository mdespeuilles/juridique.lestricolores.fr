<template>
  <section>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.4530201824964!2d2.321644515674739!3d48.86863987928848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e32d1c5bb01%3A0xbf79009e02f2697!2s20%20Rue%20Royale%2C%2075008%20Paris!5e0!3m2!1sfr!2sfr!4v1647503085532!5m2!1sfr!2sfr" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>

    <div class="content">
      <div class="form">
        <h1>Envoyez nous un message</h1>
        <p>
          Vous pouvez nous contacter pour tout ce qui concerne nos services. Nous vous contacterons dès que possible.
        </p>

        <div class="success" v-if="success">
          Merci pour votre message. Nous reviendrons vers vous dans les plus brefs délais.
        </div>
        <form id="form" @submit.prevent="submit">
          <div>
            <label>Votre nom</label>
            <input type="text" required v-model="nom" />
          </div>

          <div>
            <label>Votre email</label>
            <input type="email" required v-model="email" />
          </div>

          <div>
            <label>Votre téléphone</label>
            <input type="text" required v-model="phone" />
          </div>

          <div>
            <label>Votre message</label>
            <textarea v-model="message"></textarea>
          </div>

          <div class="action">
            <button type="submit">Envoyer</button>
          </div>
        </form>
      </div>
      <div class="txt">
        <div>
          <h2>Adresse postale</h2>
          20 Rue Royale,
          75008 Paris
        </div>

        <div>
          <h2>Téléphone</h2>
          Numéro de téléphone : 01 76 41 14 99
          ouvert du Lundi au Vendredi de 8h à 20h sans interruption.
        </div>

        <div>
          <h2>Informations légales</h2>
          Legalzen
          Siège social : 20 Rue Royale, 75008 Paris
          Siret : 904 493 418 000 19
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      nom: null,
      email: null,
      phone: null,
      message: null,
      success: false
    }
  },
  methods: {
    submit() {
      this.$axios.post('/api/contactform', {
        name: this.nom,
        email: this.email,
        message: this.message,
        phone: this.phone
      }).then(response => {
        this.success = true
        this.nom = null
        this.email = null
        this.message = null
        this.phone = null
      })
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  .content {
    max-width: 1024px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 80px 0;

    @include desk-1024 {
      flex-direction: column;
    }

    .form {
      max-width: 400px;

      @include phone-600 {
        max-width: 95%;
      }

      h1 {
        font-family: Yeseva One;
        font-weight: normal;
        font-size: 30px;
      }

      p {
        max-width: 408px;
        margin-bottom: 30px;
      }

      .success {
        color: green;
        background: #0080001f;
        padding: 5px 10px;
        margin-bottom: 20px;
      }

      form {
        label {
          display: block;
          margin-bottom: 10px;
          margin-top: 15px;
        }

        .action {
          display: flex;
          justify-content: center;
          max-width: 400px;
          padding-top: 30px;
        }
      }
    }

    .txt {
      max-width: 400px;
      @include phone-600 {
        max-width: 95%;
      }
      > div {
        margin-bottom: 30px;
        h2 {
          font-family: Yeseva One;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
