<template>
  <section>
    <h2>Liquidation entreprise</h2>
    <p>Liquidez votre entreprise en toute sécurité</p>

    <div class="box">
      <h3>Compotes de clôtures de liquidation</h3>
      <div class="row">
        <label>Date de clôture</label>
        <date-picker
          :language="fr"
          :monday-first="true"
          v-model="dateCloture"
          :disabledDates="{from: new Date(this.submission.dateCessation)}"
          placeholder="Sélectionnez une date..."></date-picker>
      </div>

      <div class="row">
        <label>Montant de l'actif</label>
        <input type="number" v-model="actif" />
      </div>

      <div class="row">
        <label>Montant du passif</label>
        <input type="number" v-model="passif" />
      </div>

      <div class="row">
        <label>Montant restant après de la banque</label>
        <input type="number" v-model="montantBanque" />
      </div>

      <div class="row">
        <label>Montant du capital qui a été remboursé auprès des associés</label>
        <input type="number" v-model="montantRembourse" />
      </div>

      <div class="row">
        <label>Solde de liquidation</label>
        <input type="number" v-model="soldeLiquidation" />
      </div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {
        dateCloture: dateCloture,
        actif: actif,
        passif: passif,
        montantBanque: montantBanque,
        montantRembourse: montantRembourse,
        soldeLiquidation: soldeLiquidation
      })">Continuer</button>
    </div>
  </section>
</template>

<script>
import {fr} from 'vuejs-datepicker/dist/locale'
export default {
  props: {
    data: null,
    submission: null
  },
  data() {
    return {
      fr: fr,
      dateCloture: null,
      actif: null,
      passif: null,
      montantBanque: null,
      montantRembourse: null,
      soldeLiquidation: null
    }
  },
  mounted() {
    if (this.data) {
      this.dateCloture = this.data.dateCloture
      this.actif = this.data.actif
      this.passif = this.data.passif
      this.montantBanque = this.data.montantBanque
      this.montantRembourse = this.data.montantRembourse
      this.soldeLiquidation = this.data.soldeLiquidation
    }
  },
  watch: {
    data() {
      this.dateCloture = this.data.dateCloture
      this.actif = this.data.actif
      this.passif = this.data.passif
      this.montantBanque = this.data.montantBanque
      this.montantRembourse = this.data.montantRembourse
      this.soldeLiquidation = this.data.soldeLiquidation
    },
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
    margin-bottom: 78px;
  }

  .box {
    width: 524px;
    min-height: 194px;
    border: 1px solid rgba(64, 89, 134, 0.3);
    box-sizing: border-box;
    border-radius: 5px;
    padding-bottom: 30px;
    margin: auto;
    margin-bottom: 35px;

    h3 {
      text-align: center;
      font-family: Yeseva One;
      font-size: 28px;
      color: #0B2758;
      margin-bottom: 30px;
      max-width: 95%;
    }

    p {
      text-align: center;
      font-size: 14px;
      margin-bottom: 15px;
    }

    .vdp-datepicker {
      max-width: 300px;
      margin: auto;
      margin-bottom: 15px;
    }

    .row {
      max-width: 300px;
      margin: auto;
      margin-bottom: 15px;
    }

    .select {
      display: flex;
      justify-content: space-between;
      max-width: 260px;
      margin: auto;
      padding-top: 20px;

      > div {
        width: 120px;
        height: 70px;
        display: grid;
        place-items: center;
        background: #FFFFFF;
        border: 1px solid #FFF;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
        border-radius: 10px;
        cursor: pointer;

        &.active {
          background: #E4F0FC;
          border: 1px solid #f44336;
          box-sizing: border-box;
          box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
