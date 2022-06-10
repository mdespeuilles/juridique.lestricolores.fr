<template>
  <section>
    <h2>Création {{ submission.type }}</h2>
    <p>Créez votre entreprise en toute sécurité</p>

    <div class="reassurance">
      <img src="/img/logos_stripe.svg" />
    </div>
    <div>
      <div class="pay-form">
        <div class="card-content" :class="{ isError: error }" v-if="!completed">
          <div id="card-element" class="MyCardElement"></div>
        </div>
        <div
          id="card-errors"
          class="stripe-error"
          role="alert"
          v-if="error && !completed"
        >
          {{ error | stripeErrorTranslated }}
        </div>
      </div>

      <div class="actions">
        <div class="back" @click="$emit('back')">
          <img src="/img/back.svg" alt="back"/>
        </div>
        <button @click="pay" type="button" v-if="!loading">
          <div v-if="!submission.data.account">Payer {{ submission.data.cartInfo.total.totalTtc|currency }}</div>
          <div v-if="submission.data.account">Payer {{ submission.data.accountAmount|currency }}</div>
        </button>
        <button class="load" disabled type="button" v-if="loading"><span class="ld ld-ring ld-spin"></span>Paiement en cours...</button>
      </div>
    </div>
  </section>
</template>

<script>
//import { loadStripe } from "@stripe/stripe-js"
import {loadStripe} from '@stripe/stripe-js/pure';
const _ = require('lodash')
export default {
  components: {

  },
  props: {
    submission: null
  },
  data() {
    return {
      stripeKey: null,
      completed: false,
      error: null,
      stripe: null,
      loading: false
    }
  },
  methods: {
    pay () {
      this.loading = true
      this.error = null
      this.stripe.createPaymentMethod({
        type: "card",
        card: this.cardElement,
        billing_details: {
          email: this.submission.data.email,
        },
      }).then((result) => {
        console.log(result)
        if (result.error) {
          this.error = result.error.message
          this.loading = false
        }
        else {
          this.$axios.post('/api/order-stripe', {
            paymentMethod: result.paymentMethod,
            amount: (!this.submission.data.account) ? this.submission.data.cartInfo.total.totalTtc : this.submission.data.accountAmount,
            email: this.submission.data.email,
            submission: this.submission,
            discountCode: this.submission.data.cartInfo.discountCode
          }).then(response => {
            if (response.data.error) {
              this.error = response.data.error
              this.loading = false;
            }
            else if (response.data.type === 'StripeCardError') {
              this.error = response.data.raw.message
              this.loading = false;
            }
            else if (response.data.type === 'StripeInvalidRequestError') {
              this.error = "Une erreur inconnue c'est produite."
              this.loading = false;
            }
            else if (response.data.status === 'requires_source_action' || response.data.status === 'requires_action') {
              this.stripe.confirmCardPayment(
                response.data.client_secret
              ).then(result => {
                if (result.error) {
                  this.error = result.error.message
                  this.loading = false;
                }
                else {
                  this.$emit('next')
                  this.loading = false;
                }
              })
            } else {
              this.$emit('next')
              this.loading = false;
            }
          })
        }
      })
    }
  },
  async mounted() {
    this.stripe = await loadStripe(process.env.stripeKey, {
      locale: 'fr'
    });

    this.elements = this.stripe.elements();

    let style = {
      base: {
        padding: 50,
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    };

    this.cardElement = this.elements.create("card", {
      style: style,
      hidePostalCode: true,
    });
    this.cardElement.mount("#card-element");
    this.cardElement.on("change", (event) => {
      if (event.error) {
        this.error = event.error.message;
      } else {
        this.error = null;
      }
    });
  },
  filters: {
    stripeErrorTranslated(msg) {
      let tab = [
        {
          en: "Your card has insufficient funds.",
          fr: "Votre carte ne dispose pas de fonds suffisants.",
        },
        {
          en: "Your card was declined.",
          fr: "Votre carte a été refusée.",
        },
        {
          en: "Your card has expired.",
          fr: "Votre carte a expiré.",
        },
        {
          en: "Your card's security code is incorrect.",
          fr: "Le code de sécurité de votre carte est incorrect.",
        },
        {
          en: "An error occurred while processing your card. Try again in a little bit.",
          fr: "Une erreur s'est produite lors du traitement de votre carte par Stripe. Réessayez un peu plus tard.",
        },
      ];

      tab.forEach((m) => {
        if (m.en === msg) {
          msg = m.fr;
        }
      });

      if (msg.title) {
        msg = "Une erreur s'est produite lors du traitement de votre paiement.";
      }

      return msg;
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .StripeElement {
  box-shadow: 0 2px 8px rgba(106, 106, 106, 0.16);
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
}

section {
  .reassurance {
    max-width: 411px;
    height: 59px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.07);
    border-radius: 10px;
    background-color: #ffffff;
    display: grid;
    place-items: center;
    margin: auto;
    margin-bottom: 25px;
  }

  h2 {
    margin-bottom: 0;
  }

  p {
    text-align: center;
    margin-bottom: 50px;
  }

  .pay-form {
    margin-bottom: 25px;

    #card-errors {
      background-color: #ffe5e5;
      color: #cf1010;
      padding: 5px 10px;
      margin-top: 20px;
      border: 1px solid #cf1010;
      border-radius: 5px;
    }
  }

  .actions {
    button {
      font-size: 18px;
      position: relative;

      &.load {
        padding-left: 40px;
        cursor: not-allowed;
      }

      span {
        position: absolute;
        left: 15px;
        top: 11px;
      }
    }
  }
}
</style>
