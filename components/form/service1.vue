<template>
  <section>
    <h2>
      Les <strong>services essentiels</strong><br />
      pour bien gérer votre société
    </h2>
    <p>
      Gérer son entreprise implique de suivre sa comptabilité et de respecter un certain nombre d'obligations légales. Dans les deux pages suivantes, on vous présente deux services pour partir du bon pied.
    </p>

    <div class="offres">
      <div>
        <div class="img">
          <img src="/img/comptastart.svg" />
        </div>

        <strong>Zenstart</strong>
      </div>

      <div>
        <div class="img">
          <img src="/img/service-juridique.svg" />
        </div>

        <strong>Service Obligations <br />Juridiques</strong>
      </div>
    </div>

    <div class="plans" :class="serviceJuridiquePlan">
      <div class="plan" :class="{ active: serviceJuridiquePlan === 'planAnnuel' }">
        <span>37,50 € HT/mois (plan annuel)</span>
        <br />
        <span class="info"><img src="/img/storm.svg" /> économisez 150 € /an</span>
      </div>
      <div class="switch" @click="togglePlan()">
        <span></span>
      </div>

      <div class="plan plan2" :class="{ active: serviceJuridiquePlan === 'planMensuel' }">
        <span>49,90 € HT/mois (plan mensuel)</span>
      </div>
    </div>

    <p>Dans les deux cas, vous bénéficierez de <strong>30 jours gratuits</strong></p>

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
    togglePlan() {
      console.log(this.serviceJuridiquePlan)
      if (this.serviceJuridiquePlan === "planAnnuel") {
        this.serviceJuridiquePlan = "planMensuel"
      }
      else {
        if (this.serviceJuridiquePlan === "planMensuel") {
          this.serviceJuridiquePlan = "planAnnuel"
        }
      }
      console.log(this.serviceJuridiquePlan)
    },
    async subscribe() {
      let price = 'price_1KP6lQ4AhU35Y3inY5XgI1Zf'

      if (this.serviceJuridiquePlan === "planMensuel") {
        price = 'price_1KP6lQ4AhU35Y3inY5XgI1Zf'
      }
      else {
        if (this.serviceJuridiquePlan === "planMensuel") {
          price = 'price_1KP6lQ4AhU35Y3inY5XgI1Zf'
        }
      }
      let response = await this.$axios.post('/api/order-create-subscription', {
        uuid: this.submission.uuid,
        item: price,
        service: 'ServiceJuridique',
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
      color: #f44336;
    }
  }

  p {
    max-width: 658px;
    margin: auto;
    text-align: center;
    margin-bottom: 50px;

    strong {
      color: #f44336;
    }
  }

  .offres {
    width: 613px;
    height: 178px;
    background: #FFFFFF;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
    border-radius: 5px;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;

    &:after {
      position: absolute;
      top: 35px;
      height: 110px;
      width: 1px;
      background: #f44336;
      content: "";
    }

    > div {
      text-align: center;
      width: 180px;

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
            color: #f44336;
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
        border: 1px solid #f44336;
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

          background: #f44336;
          border-radius: 100px;
        }
      }
    }
  }
}
</style>
