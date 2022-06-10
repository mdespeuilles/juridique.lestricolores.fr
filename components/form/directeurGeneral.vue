<template>
  <section>
    <h2>{{ title }}</h2>

    <div class="select">
      <v-select :options="actionnairesList" v-model="directeurGeneral"></v-select>
    </div>

    <div class="president" v-if="directeurGeneral && directeurGeneral.label === 'Autre'">
      <div>
        <div class="row">
          <div>
            <label>Civilité</label>
            <v-select :options="civilityOptions" v-model="directeurGeneral.civilite" ></v-select>
          </div>
          <div v-if="directeurGeneral.civilite === 'Société'">
            <label>Dénomination social</label>
            <input type="text" name="raison_social" v-model="directeurGeneral.raisonSociale"/>
          </div>
          <div v-else>
            <label>Nom</label>
            <input type="text" name="lastName" v-model="directeurGeneral.nom"/>
          </div>
        </div>

        <div class="row" v-if="directeurGeneral.civilite === 'Société'">
          <div>
            <label>Nom du représentant légal </label>
            <input type="text" v-model="directeurGeneral.nom"/>
          </div>
          <div>
            <label>Prénom du représentant légal</label>
            <input type="text" v-model="directeurGeneral.prenom"/>
          </div>
        </div>

        <div class="row" v-else>
          <div>
            <label>Prénom</label>
            <input type="text" v-model="directeurGeneral.prenom"/>
          </div>
          <div>
            <label>Ville de naissance</label>
            <input type="text" v-model="directeurGeneral.villeNaissance"/>
          </div>
        </div>

        <div class="row">
          <div v-if="directeurGeneral.civilite === 'Société'">
            <label>Numéro SIREN</label>
            <input type="text" name="siren" v-model="directeurGeneral.siren"/>
          </div>
          <div v-else>
            <label>Date de naissance</label>
            <input type="date" name="birthdate" v-model="directeurGeneral.dateDeNaissance"/>
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" v-model="directeurGeneral.email"/>
          </div>
        </div>

        <div class="row full">
          <div>
            <label v-if="directeurGeneral.civilite === 'Société'">Adresse du siège social</label>
            <label v-else>Adresse</label>
            <client-only>
              <vue-google-autocomplete
                id="president"
                placeholder=""
                v-model="directeurGeneral.adresse"
                country="fr"
                v-on:placechanged="getAddressData">
              </vue-google-autocomplete>
            </client-only>
          </div>
        </div>

        <div class="row">
          <div>
            <label v-if="directeurGeneral.civilite === 'Société'">Code postale du siège social</label>
            <label v-else>Code postale</label>
            <input type="text" v-model="directeurGeneral.codePostal" />
          </div>

          <div>
            <label v-if="directeurGeneral.civilite === 'Société'">Ville du siège social</label>
            <label v-else>Ville</label>
            <input type="text" v-model="directeurGeneral.ville" />
          </div>
        </div>

        <div class="row">
          <div v-if="directeurGeneral.civilite === 'Société'">
            <label>Immatriculée au RCS de</label>
            <input type="text" v-model="directeurGeneral.rcs" />
          </div>
          <div v-else>
            <label>Nationnalité</label>
            <v-select :options="nationnalitesList" v-model="directeurGeneral.nationnalite" ></v-select>
          </div>

          <div v-if="directeurGeneral.civilite === 'Société'">
            <label>Forme juridique</label>
            <v-select :options="formeJuridiques" v-model="directeurGeneral.formeJuridique"></v-select>
          </div>
          <div v-else>
            <label>Régime matrimonial</label>
            <v-select :options="regimeMatrimonial" v-model="directeurGeneral.regimeMatrimonial"></v-select>
          </div>
        </div>
      </div>
    </div>

    <div class="actions" v-if="actionnaires.length">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {directeurGeneral: directeurGeneral})">Continuer</button>
    </div>

    <div class="actions">
      <a href="#" @click.prevent="$emit('next')">Renseigner plus tard</a>
    </div>
  </section>
</template>

<script>
const _ = require('lodash')
import nationnality from "./nationnality";
export default {
  components: {
    VueGoogleAutocomplete: () => import('vue-google-autocomplete')
  },
  props: {
    title: null,
    data: null,
    president: null,
    actionnaires: {
      type: Array,
      default: []
    },
    nograntsociete: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      directeurGeneral: null,
      actionnairesList: [],
      nationnalitesList: nationnality.nationnalitesList,
      addressSearchResults: [],
      regimeMatrimonial: ['Célibataire', 'Marié(e)', 'Pacsé(e)'],
      formeJuridiques: ['EURL', 'SASU', 'SAS', 'SARL', 'SCI', 'SA'],
      civilityOptions: (this.nograntsociete) ? ['Mme', 'M'] : ['Mme', 'M', 'Société']
    }
  },
  mounted() {
    if (this.data) {
      this.directeurGeneral = this.data
    }

    this.actionnairesList.push({label: 'Aucun'})

    if (this.actionnaires) {
      for (const actionnaire of this.actionnaires) {
        if (!_.isEqual(this.president, actionnaire)) {
          this.actionnairesList.push(actionnaire)
        }
      }

      this.actionnairesList.push({label: 'Autre'})

      if (this.nograntsociete) {
        for (let i = 0; i < this.actionnairesList.length; i++) {
          if (this.actionnairesList[i].civilite === 'Société') {
            this.actionnairesList.splice(i, 1);
          }
        }
      }
    }

    if (_.isEmpty(this.directeurGeneral)) {
      this.directeurGeneral = this.actionnairesList[0]
    }
  },
  methods: {
    getAddressData(addressData, placeResultData, id) {
      this.directeurGeneral.codePostal = addressData.postal_code
      this.directeurGeneral.ville = addressData.locality
      this.directeurGeneral.adresse = placeResultData.name
    }
  },
  watch: {
    data() {
      if (this.data) {
        this.directeurGeneral = this.data
      }

      this.actionnairesList.push({label: 'Aucun'})

      if (this.actionnaires) {
        for (const actionnaire of this.actionnaires) {
          if (!_.isEqual(this.president, actionnaire)) {
            this.actionnairesList.push(actionnaire)
          }
        }
        this.actionnairesList.push({label: 'Autre'})
      }

      if (_.isEmpty(this.directeurGeneral)) {
        this.directeurGeneral = this.actionnaires[0]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  > div.select {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }
  > div.president {
    max-width: 620px;
    margin: auto;
    > div {
      padding: 10px;
      margin-bottom: 30px;

      .row {
        display: flex;
        justify-content: space-between;
        max-width: 580px;
        margin: auto;
        margin-bottom: 25px;

        &.full {
          > div {
            width: 100%;
            input {
              max-width: 100% !important;
            }
          }
        }

        > div {
          width: 280px;
        }
      }
    }
  }
}
</style>
