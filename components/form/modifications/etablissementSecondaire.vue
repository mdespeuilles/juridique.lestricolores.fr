<template>
  <section>
    <h2>Etablissement secondaire</h2>
    <p>Souaitez-vous ouvrir, fermer ou transferer un établissement secondaire ?</p>

    <div class="select">
      <div :class="{active: wantEtablissementSecondaire}" @click="wantEtablissementSecondaire = true">Oui</div>
      <div :class="{active: !wantEtablissementSecondaire}" @click="wantEtablissementSecondaire = false">Non</div>
    </div>

    <div class="form" v-if="wantEtablissementSecondaire === true">

      <div class="select big">
        <div :class="{active: actionEtablissementSecondaire === 'add'}" @click="actionEtablissementSecondaire = 'add'">Ouverture</div>
        <div :class="{active: actionEtablissementSecondaire === 'close'}" @click="actionEtablissementSecondaire = 'close'">Fermeture</div>
        <div :class="{active: actionEtablissementSecondaire === 'transfert'}" @click="actionEtablissementSecondaire = 'transfert'">Transfert</div>
      </div>

      <div>
        <div>
          <label>Adresse :</label>
          <client-only>
            <vue-google-autocomplete
              id="etablissementSecondaire"
              placeholder=""
              v-model="etablissementSecondaire.adresse"
              country="fr"
              v-on:placechanged="getAddressData">
            </vue-google-autocomplete>
          </client-only>
        </div>

        <div>
          <label>Code postale</label>
          <input type="text" v-model="etablissementSecondaire.codePostal" />
        </div>

        <div>
          <label>Ville</label>
          <input type="text" v-model="etablissementSecondaire.ville" />
        </div>
      </div>

      <div v-if="actionEtablissementSecondaire === 'transfert'">
        <h3>Ancien établissement secondaire</h3>
        <div>
          <label>Ancienne adresse :</label>
          <client-only>
            <vue-google-autocomplete
              id="ancientEtablissementSecondaire"
              placeholder=""
              v-model="ancientEtablissementSecondaire.adresse"
              country="fr"
              v-on:placechanged="getAddressData2">
            </vue-google-autocomplete>
          </client-only>
        </div>

        <div>
          <label>Code postale</label>
          <input type="text" v-model="ancientEtablissementSecondaire.codePostal" />
        </div>

        <div>
          <label>Ville</label>
          <input type="text" v-model="ancientEtablissementSecondaire.ville" />
        </div>
      </div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {
        etablissementSecondaire: etablissementSecondaire,
        ancientEtablissementSecondaire: ancientEtablissementSecondaire,
        wantEtablissementSecondaire: wantEtablissementSecondaire,
        actionEtablissementSecondaire: actionEtablissementSecondaire
      })">Continuer</button>
    </div>
  </section>
</template>

<script>
export default {
  components: {
    VueGoogleAutocomplete: () => import('vue-google-autocomplete')
  },
  props: {
    data: null
  },
  data() {
    return {
      addressSearchResults: [],
      actionEtablissementSecondaire: 'add',
      wantEtablissementSecondaire: false,
      etablissementSecondaire: {
        adresse: null,
        codePostal: null,
        ville: null
      },
      ancientEtablissementSecondaire: {
        adresse: null,
        codePostal: null,
        ville: null
      }
    }
  },
  methods: {
    getAddressData(addressData, placeResultData, id) {
      this.etablissementSecondaire.codePostal = addressData.postal_code
      this.etablissementSecondaire.ville = addressData.locality
      this.etablissementSecondaire.adresse = placeResultData.name
    },
    getAddressData2(addressData, placeResultData, id) {
      this.ancientEtablissementSecondaire.codePostal = addressData.postal_code
      this.ancientEtablissementSecondaire.ville = addressData.locality
      this.ancientEtablissementSecondaire.adresse = placeResultData.name
    }
  },
  mounted() {
    if (this.data) {
      if (this.data.actionEtablissementSecondaire) this.actionEtablissementSecondaire = this.data.actionEtablissementSecondaire
      if (this.data.etablissementSecondaire) this.etablissementSecondaire = this.data.etablissementSecondaire
      if (this.data.ancientEtablissementSecondaire) this.ancientEtablissementSecondaire = this.data.ancientEtablissementSecondaire
      if (this.data.wantEtablissementSecondaire) this.wantEtablissementSecondaire = this.data.wantEtablissementSecondaire
    }
  },
  watch: {
    data() {
      if (this.data) {
        if (this.data.actionEtablissementSecondaire) this.actionEtablissementSecondaire = this.data.actionEtablissementSecondaire
        if (this.data.etablissementSecondaire) this.etablissementSecondaire = this.data.etablissementSecondaire
        if (this.data.ancientEtablissementSecondaire) this.ancientEtablissementSecondaire = this.data.ancientEtablissementSecondaire
        if (this.data.wantEtablissementSecondaire) this.wantEtablissementSecondaire = this.data.wantEtablissementSecondaire
      }
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
    margin-bottom: 50px;
  }
  .select {
    display: flex;
    justify-content: space-between;
    max-width: 260px;
    margin: auto;
    margin-bottom: 50px;

    &.big {
      max-width: 100%;
    }

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

  .form {
    max-width: 400px;
    margin: auto;
    margin-bottom: 30px;
  }
}
</style>
