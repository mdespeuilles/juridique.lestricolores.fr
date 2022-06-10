<template>
  <section>
    <h2 v-if="!embed">{{ title }}</h2>

    <div class="row">
      <div>
        <label>Civilité</label>
        <v-select :options="['Mme', 'M', 'Société']" v-model="actionnaireUnique.civilite" ></v-select>
      </div>
      <div v-if="actionnaireUnique.civilite === 'Société'">
        <label>Dénomination social</label>
        <input type="text" name="raison_social" v-model="actionnaireUnique.raisonSociale"/>
      </div>
      <div v-else>
        <label>Nom</label>
        <input type="text" name="lastName" v-model="actionnaireUnique.nom"/>
      </div>
    </div>

    <div class="row" v-if="actionnaireUnique.civilite === 'Société'">
      <div>
        <label>Nom du représentant légal </label>
        <input type="text" v-model="actionnaireUnique.nom"/>
      </div>
      <div>
        <label>Prénom du représentant légal</label>
        <input type="text" v-model="actionnaireUnique.prenom"/>
      </div>
    </div>

    <div class="row" v-else>
      <div>
        <label>Prénom</label>
        <input type="text" v-model="actionnaireUnique.prenom"/>
      </div>
      <div>
        <label>Ville de naissance</label>
        <input type="text" v-model="actionnaireUnique.villeNaissance"/>
      </div>
    </div>

    <div class="row">
      <div v-if="actionnaireUnique.civilite === 'Société'">
        <label>Numéro SIREN</label>
        <input type="text" name="siren" v-model="actionnaireUnique.siren"/>
      </div>
      <div v-else>
        <label>Date de naissance</label>
        <input type="date" name="birthdate" v-model="actionnaireUnique.dateDeNaissance"/>
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" v-model="actionnaireUnique.email"/>
      </div>
    </div>

    <div class="row full">
      <div>
        <label v-if="actionnaireUnique.civilite === 'Société'">Adresse du siège social</label>
        <label v-else>Adresse</label>
        <client-only>
          <vue-google-autocomplete
            id="actionnaire_adresse"
            placeholder=""
            v-model="actionnaireUnique.adresse"
            country="fr"
            v-on:placechanged="getAddressData">
          </vue-google-autocomplete>
        </client-only>
      </div>
    </div>

    <div class="row">
      <div>
        <label v-if="actionnaireUnique.civilite === 'Société'">Code postale du siège social</label>
        <label v-else>Code postale</label>
        <input type="text" v-model="actionnaireUnique.codePostal" />
      </div>

      <div>
        <label v-if="actionnaireUnique.civilite === 'Société'">Ville du siège social</label>
        <label v-else>Ville</label>
        <input type="text" v-model="actionnaireUnique.ville" />
      </div>
    </div>

    <div class="row">
      <div v-if="actionnaireUnique.civilite === 'Société'">
        <label>Immatriculée au RCS de</label>
        <input type="text" v-model="actionnaireUnique.rcs" />
      </div>
      <div v-else>
        <label>Nationnalité</label>
        <v-select :options="nationnalitesList" v-model="actionnaireUnique.nationnalite" ></v-select>
      </div>

      <div v-if="actionnaireUnique.civilite === 'Société'">
        <label>Forme juridique</label>
        <v-select :options="formeJuridiques" v-model="actionnaireUnique.formeJuridique"></v-select>
      </div>
      <div v-else>
        <label>Régime matrimonial</label>
        <v-select class="regime_matrimonial" :options="regimeMatrimonial" v-model="actionnaireUnique.regimeMatrimonial"></v-select>
      </div>
    </div>

    <div v-if="actionnaireUnique.regimeMatrimonial">
      <div class="row full" v-if="actionnaireUnique.regimeMatrimonial.value !== 'célibataire'">
        <div>
          <label>Prénom et Nom de naissance du conjoint</label>
          <input type="text" v-model="actionnaireUnique.conjoint"/>
        </div>
      </div>
    </div>

    <div class="row full" v-if="!embed">
      <div>
        <label>Souhaitez-vous effectuer des apports en nature au capital ?</label>
        <div class="select">
          <div :class="{active: (actionnaireUnique.choixApportNature === 'oui')}" @click="actionnaireUnique.choixApportNature = 'oui'">Oui</div>
          <div :class="{active: (actionnaireUnique.choixApportNature === 'non')}" @click="actionnaireUnique.choixApportNature = 'non'">Non</div>
        </div>
      </div>
    </div>

    <div v-if="actionnaireUnique.choixApportNature === 'oui' && !embed">
      <div class="row" v-for="apport in actionnaireUnique.apports">
        <div>
          <label>Description</label>
          <input type="text" v-model="apport.description"/>
        </div>
        <div>
          <label>Valorisation (En euros)</label>
          <input type="number" v-model="apport.valorisation"/>
        </div>
      </div>

      <div class="btn row">
        <button @click="actionnaireUnique.apports.push({description: null, valorisation: null})">
          Ajouter un apport en nature
        </button>
      </div>
    </div>

    <div class="actions" v-if="!embed">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {actionnaireUnique: actionnaireUnique})">Continuer</button>
    </div>

    <div class="actions" v-if="!embed">
      <a href="#" @click.prevent="$emit('next')">Renseigner plus tard</a>
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
    title: null,
    embed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      nationnalitesList: nationnality.nationnalitesList,
      addressSearchResults: [],
      regimeMatrimonial: regimeMatrimonial.list,
      formeJuridiques: ['EURL', 'SASU', 'SAS', 'SARL', 'SCI', 'SA'],
      actionnaireUnique: {
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
        choixApportNature: 'non',
        apports: [{description: null, valorisation: null}]
      }
    }
  },
  mounted() {
    if (this.data) this.actionnaireUnique = this.data
  },
  methods: {
    getAddressData(addressData, placeResultData, id) {
      console.log(placeResultData)
      this.actionnaireUnique.codePostal = addressData.postal_code
      this.actionnaireUnique.ville = addressData.locality
      this.actionnaireUnique.adresse = placeResultData.name
    }
  },
  watch: {
    data() {
      if (this.data) this.actionnaireUnique = this.data
    },
    actionnaireUnique: {
      deep: true,
      handler() {
        if (this.embed) {
          this.$emit('setDirigeant', this.actionnaireUnique)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  @include desk-768 {
    max-width: 95%;
    margin: auto;
  }

  .row {
    display: flex;
    justify-content: space-between;
    max-width: 580px;
    margin: auto;
    margin-bottom: 25px;

    @include phone-600 {
      flex-direction: column;
      justify-content: center;
      margin-bottom: 0;
    }

    &.full {
      @include phone-600 {
        max-width: 280px !important;
      }
      > div {
        width: 100%;
        input {
          max-width: 100% !important;

          @include phone-600 {
            max-width: 280px !important;
          }
        }
      }
    }

    > div {
      width: 280px;

      @include phone-600 {
        margin: auto;
        margin-bottom: 15px;

        > input {

        }
      }
    }
  }

  .btn {
    display: flex;
    justify-content: flex-end;

    @include phone-600 {
      max-width: 280px;
      margin-bottom: 30px;
    }
  }

  .select {
    display: flex;
    justify-content: space-between;
    max-width: 260px;
    margin: auto;
    margin-bottom: 30px;
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
</style>
