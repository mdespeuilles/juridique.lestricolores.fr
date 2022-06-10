<template>
  <section>
    <h2>Liquidation entreprise</h2>
    <p>Liquidez votre entreprise en toute sécurité</p>

    <div class="box">
      <h3>Date de cessation d’activité</h3>
      <p>Quelle est la date de votre cessation d'activité ?</p>
      <date-picker
        :language="fr"
        :monday-first="true"
        v-model="dateCessation"
        placeholder="Sélectionnez une date..."></date-picker>
    </div>

    <div class="box">
      <h3>Établissement secondaire</h3>
      <p>Avez-vous des établissements secondaires ?</p>

      <div class="select">
        <div :class="{active: (etablissementsSecondaires === 'oui')}" @click="etablissementsSecondaires = 'oui'">Oui</div>
        <div :class="{active: (etablissementsSecondaires === 'non')}" @click="etablissementsSecondaires = 'non'">Non</div>
      </div>

      <div class="row" v-if="etablissementsSecondaires === 'oui'">
        <v-select
          :options="[1,2,3,4,5,6,7,8,9,10]"
          v-model="nbEtablissementSecondaire"
          placeholder="Nombre d'établissements secondaire"></v-select>
      </div>
    </div>

    <div class="box">
      <h3>Licenciement</h3>
      <p>Licenciez-vous des salariés ?</p>

      <div class="select">
        <div :class="{active: (licenciement === 'oui')}" @click="licenciement = 'oui'">Oui</div>
        <div :class="{active: (licenciement === 'non')}" @click="licenciement = 'non'">Non</div>
      </div>

      <div class="row" v-if="licenciement === 'oui'">
        <date-picker
          :language="fr"
          :monday-first="true"
          v-model="dateLicenciement"
          placeholder="Date de licenciement..."></date-picker>
      </div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {
        dateCessation: dateCessation,
        etablissementsSecondaires: etablissementsSecondaires,
        licenciement: licenciement,
        dateLicenciement: dateLicenciement,
        nbEtablissementSecondaire: nbEtablissementSecondaire
      })">Continuer</button>
    </div>
  </section>
</template>

<script>
import {fr} from 'vuejs-datepicker/dist/locale'
export default {
  props: {
    data: null
  },
  data() {
    return {
      fr: fr,
      dateCessation: null,
      etablissementsSecondaires: 'non',
      licenciement: 'non',
      dateLicenciement: null,
      nbEtablissementSecondaire: null
    }
  },
  mounted() {
    if (this.data) {
      this.dateCessation = this.data.dateCessation
      this.etablissementsSecondaires = this.data.etablissementsSecondaires
      this.licenciement = this.data.licenciement
      this.dateLicenciement = this.data.dateLicenciement
      this.nbEtablissementSecondaire = this.data.nbEtablissementSecondaire
    }
  },
  watch: {
    data() {
      this.dateCessation = this.data.dateCessation
      this.etablissementsSecondaires = this.data.etablissementsSecondaires
      this.licenciement = this.data.licenciement
      this.dateLicenciement = this.data.dateLicenciement
      this.nbEtablissementSecondaire = this.data.nbEtablissementSecondaire
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
      margin-bottom: 5px;
    }

    p {
      text-align: center;
      font-size: 14px;
      margin-bottom: 15px;
    }

    .vdp-datepicker {
      max-width: 300px;
      margin: auto;
    }

    .row {
      max-width: 350px;
      margin: auto;
    }

    .select {
      display: flex;
      justify-content: space-between;
      max-width: 260px;
      margin: auto;
      padding-top: 20px;
      margin-bottom: 20px;

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
          border: 1px solid #286FEB;
          box-sizing: border-box;
          box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
