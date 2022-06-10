<template>
  <section>
    <h2>Liquidation entreprise</h2>
    <p>Liquidez votre entreprise en toute sécurité</p>

    <div class="box" v-if="liquidateur">
      <h3>Liquidateur de la société</h3>
      <p>Qui sera le liquidateur de la société ?</p>
      <div class="row">
        <div>
          <label>Civilité</label>
          <v-select :options="['Mme', 'M', 'Société']" v-model="liquidateur.civilite" ></v-select>
        </div>
        <div v-if="liquidateur.civilite === 'Société'">
          <label>Dénomination social</label>
          <input type="text" name="raison_social" v-model="liquidateur.raisonSociale"/>
        </div>
        <div v-else>
          <label>Nom</label>
          <input type="text" name="lastName" v-model="liquidateur.nom"/>
        </div>
      </div>

      <div class="row" v-if="liquidateur.civilite === 'Société'">
        <div>
          <label>Nom du représentant légal </label>
          <input type="text" v-model="liquidateur.nom"/>
        </div>
        <div>
          <label>Prénom du représentant légal</label>
          <input type="text" v-model="liquidateur.prenom"/>
        </div>
      </div>

      <div class="row" v-else>
        <div>
          <label>Prénom</label>
          <input type="text" v-model="liquidateur.prenom"/>
        </div>
        <div>
          <label>Ville de naissance</label>
          <input type="text" v-model="liquidateur.villeNaissance"/>
        </div>
      </div>

      <div class="row">
        <div v-if="liquidateur.civilite === 'Société'">
          <label>Numéro SIREN</label>
          <input type="text" name="siren" v-model="liquidateur.siren"/>
        </div>
        <div v-else>
          <label>Date de naissance</label>
          <input type="date" name="birthdate" v-model="liquidateur.dateDeNaissance"/>
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" v-model="liquidateur.email"/>
        </div>
      </div>

      <div class="row full">
        <div>
          <label v-if="liquidateur.civilite === 'Société'">Adresse du siège social</label>
          <label v-else>Adresse</label>
          <client-only>
            <vue-google-autocomplete
              id="actionnaire_adresse"
              placeholder=""
              v-model="liquidateur.adresse"
              country="fr"
              v-on:placechanged="getAddressData">
            </vue-google-autocomplete>
          </client-only>
        </div>
      </div>

      <div class="row">
        <div>
          <label v-if="liquidateur.civilite === 'Société'">Code postale du siège social</label>
          <label v-else>Code postale</label>
          <input type="text" v-model="liquidateur.codePostal" />
        </div>

        <div>
          <label v-if="liquidateur.civilite === 'Société'">Ville du siège social</label>
          <label v-else>Ville</label>
          <input type="text" v-model="liquidateur.ville" />
        </div>
      </div>

      <div class="row">
        <div v-if="liquidateur.civilite === 'Société'">
          <label>Immatriculée au RCS de</label>
          <input type="text" v-model="liquidateur.rcs" />
        </div>
        <div v-else>
          <label>Nationnalité</label>
          <v-select :options="nationnalitesList" v-model="liquidateur.nationnalite" ></v-select>
        </div>

        <div v-if="liquidateur.civilite === 'Société'">
          <label>Forme juridique</label>
          <v-select :options="formeJuridiques" v-model="liquidateur.formeJuridique"></v-select>
        </div>
        <div v-else>
          <label>Régime matrimonial</label>
          <v-select class="regime_matrimonial" :options="regimeMatrimonial" v-model="liquidateur.regimeMatrimonial"></v-select>
        </div>
      </div>

      <div v-if="liquidateur.regimeMatrimonial">
        <div class="row full" v-if="liquidateur.regimeMatrimonial.value !== 'célibataire'">
          <div>
            <label>Prénom et Nom de naissance du conjoint</label>
            <input type="text" v-model="liquidateur.conjoint"/>
          </div>
        </div>
      </div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {liquidateur: liquidateur})">Continuer</button>
    </div>
  </section>
</template>

<script>
import nationnality from "./nationnality";
import regimeMatrimonial from "./regimeMatrimonial";
export default {
  components: {
    VueGoogleAutocomplete: () => import('vue-google-autocomplete')
  },
  props: {
    data: null,
    submission: null
  },
  data() {
    return {
      nationnalitesList: nationnality.nationnalitesList,
      addressSearchResults: [],
      regimeMatrimonial: regimeMatrimonial.list,
      formeJuridiques: ['EURL', 'SASU', 'SAS', 'SARL', 'SCI', 'SA'],
      liquidateur: {
        nom: null,
        civilite: null,
        prenom: null,
        email: null,
        dateDeNaissance: null,
        adresse: null,
        codePostal: null,
        ville: null,
        nationnalite: null,
        regimeMatrimonial: null,
        villeNaissance: null,
      }
    }
  },
  mounted() {
    if (this.data) {
      this.liquidateur = this.data.liquidateur
    }
  },
  methods: {
    getAddressData(addressData, placeResultData, id) {
      this.liquidateur.codePostal = addressData.postal_code
      this.liquidateur.ville = addressData.locality
      this.liquidateur.adresse = placeResultData.name
    }
  },
  watch: {
    data() {
      this.liquidateur = this.data.liquidateur
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
      max-width: 400px;
      margin: auto;
      > div {
        margin-bottom: 15px;
      }
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
