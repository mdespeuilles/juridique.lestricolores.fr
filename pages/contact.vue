<template>
  <section>
    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10499.586292562652!2d2.3461149!3d48.8601826!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9ec286f4cf53c633!2sDomiciliation%20entreprise%20Paris%20%22Les%20Tricolores%22!5e0!3m2!1sfr!2sfr!4v1583845102986!5m2!1sfr!2sfr" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>

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
          15 Rue des Halles,
          75001 Paris
        </div>

        <div>
          <h2>Téléphone</h2>
          Numéro de téléphone : 01 85 85 69 47
          ouvert du Lundi au Vendredi de 8h à 20h sans interruption.
        </div>

        <div>
          <h2>Informations légales</h2>
          Les tricolores
          Siège social : 15 Rue des Halles, 75001 Paris
          Siret : 849 409 313 000 12
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
