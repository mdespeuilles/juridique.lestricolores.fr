<template>
  <section>
    <h2>Transfert de siège sociale</h2>
    <p>Souaitez-vous changer faire un transfert de siège social de votre entreprise ?</p>

    <div class="select">
      <div :class="{active: wantSiegeSocial}" @click="wantSiegeSocial = true">Oui</div>
      <div :class="{active: !wantSiegeSocial}" @click="wantSiegeSocial = false">Non</div>
    </div>

    <div class="form" v-if="wantSiegeSocial === true">
      <div>
        <label>Nouvelle adresse :</label>
        <client-only>
          <vue-google-autocomplete
            :id="`${index}`"
            placeholder=""
            v-model="nouveauSiege.adresse"
            country="fr"
            v-on:placechanged="getAddressData">
          </vue-google-autocomplete>
        </client-only>
      </div>

      <div>
        <label>Code postale</label>
        <input type="text" v-model="nouveauSiege.codePostal" />
      </div>

      <div>
        <label>Ville</label>
        <input type="text" v-model="nouveauSiege.ville" />
      </div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {nouveauSiege: nouveauSiege, wantSiegeSocial: wantSiegeSocial})">Continuer</button>
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
      wantSiegeSocial: false,
      nouveauSiege: {
        adresse: null,
        codePostal: null,
        ville: null
      }
    }
  },
  methods: {
    getAddressData(addressData, placeResultData, id) {
      this.nouveauSiege.codePostal = addressData.postal_code
      this.nouveauSiege.ville = addressData.locality
      this.nouveauSiege.adresse = placeResultData.name
    }
  },
  mounted() {
    if (this.data) {
      if (this.data.nouveauSiege) this.nouveauSiege = this.data.nouveauSiege
      if (this.data.wantSiegeSocial) this.wantSiegeSocial = this.data.wantSiegeSocial
    }
  },
  watch: {
    data() {
      if (this.data) {
        if (this.data.nouveauSiege) this.nouveauSiege = this.data.nouveauSiege
        if (this.data.wantSiegeSocial) this.wantSiegeSocial = this.data.wantSiegeSocial
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

  .form {
    max-width: 400px;
    margin: auto;
    margin-bottom: 30px;
  }
}
</style>
