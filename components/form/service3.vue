<template>
  <section>
    <h2>
      Protégez votre société avec<br />
      <strong>le Service Obligations Juridiques</strong>
    </h2>
    <p>
      On vous accompagne au quotidien pour rester 100% conforme (Impôts, URSSAF, TVA,... ). Une erreur est vite arrivée : jusqu’à 3000 € d’amende en cas de non-publication des comptes annuels.
    </p>

    <div class="offres">
      <div>
        <div class="img">
          <img src="/img/assurance.svg" />
        </div>

        <strong>Assistance administrative</strong>
        <span>
          Gestion des courriers administratifs, aide aux déclarations, alerte anti arnaque...
        </span>
      </div>

      <div>
        <div class="img">
          <img src="/img/ag.svg" />
        </div>

        <strong>Assemblée Générale</strong>
        <span>
          Convocation des associés, rédaction du procès-verbal, approbation des comptes...
        </span>
      </div>

      <div>
        <div class="img">
          <img src="/img/registres.svg" />
        </div>

        <strong>Registres obligatoires</strong>

        <span>
          Registre des bénéficiaires effectifs, registre des mouvements de titres, registre des AG...
        </span>
      </div>
    </div>

    <p><strong>30 jours gratuits</strong> puis 279,90 € HT / an sans engagement</p>

    <div class="actions">
      <button @click="subscribe()">Continuer</button>
    </div>

    <div class="actions">
      <a href="#" @click.prevent="$emit('next')">Non merci.</a>
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
      serviceJuridiquePlan: "planAnnuel"
    }
  },
  methods: {
    async subscribe() {
      let price = 'price_1KP6lQ4AhU35Y3inY5XgI1Zf'

      let response = await this.$axios.post('/api/order-create-subscription', {
        uuid: this.submission.uuid,
        item: price,
        service: 'ServiceObligatoires',
      })

      console.log(response.data.id)

      this.$emit('next')
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  h2 {
    strong {
      color: #286FEB;
    }
  }

  p {
    max-width: 658px;
    margin: auto;
    text-align: center;
    margin-bottom: 50px;

    strong {
      color: #286FEB;
    }
  }

  .offres {
    width: 894px;
    height: 259px;
    background: #FFFFFF;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
    border-radius: 5px;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    position: relative;
    padding-top: 30px;
    margin-bottom: 50px;

    &:after {
      position: absolute;
      top: 50px;
      height: 150px;
      width: 1px;
      background: #286FEB;
      content: "";
      left: 33%;
    }

    &:before {
      position: absolute;
      top: 50px;
      height: 150px;
      width: 1px;
      background: #286FEB;
      content: "";
      right: 33%;
    }

    > div {
      text-align: center;
      width: 220px;

      .img {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: #E4F0FC;
        margin: auto;
        margin-bottom: 25px;
        display: grid;
        place-items: center;
      }

      strong {
        display: block;
        height: 38px;
        margin-bottom: 5px;
      }

      span {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }

  .plans {
    display: flex;
    justify-content: space-between;
    max-width: 710px;
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;

    &.planMensuel {
      > div {
        &.switch {
          > span {
            right: 4px;
            left: initial;
          }
        }
      }
    }

    > div {
      width: 300px;
      &.plan {

        &.plan2 {
          text-align: right;
        }

        &.active {
          span {
            color: #286FEB;
            font-weight: 700;

            &.info {
              color: #000
            }
          }
        }

        span {
          color: rgba(64, 89, 134, 0.5);

          &.info {
            color: #000;
            font-weight: 700;
          }
        }
      }

      &.switch {
        width: 55px;
        height: 30px;
        border: 1px solid #286FEB;
        box-sizing: border-box;
        border-radius: 100px;
        position: relative;
        cursor: pointer;

        > span {
          width: 24px;
          height: 24px;
          position: absolute;
          top: 2px;
          left: 4px;

          background: #286FEB;
          border-radius: 100px;
        }
      }
    }
  }
}
</style>
