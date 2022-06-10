<template>
  <section>
    <h2>{{ title }}</h2>
    <div class="actionnaires_form">
      <div class="select">
        <v-select :options="[2,3,4,5,6,7,8,9,10]"  v-model="nbActionnaires" :placeholder="placeHolder"/>
      </div>

      <div class="actionnaires">
        <div v-for="(actionnaire, index) in actionnaires">
          <h3>Qui sera le {{ index|position }} {{ actionnaireOrAssocie }} de la société ?</h3>
          <div class="row">
            <div>
              <label>Civilité</label>
              <v-select :options="['Mme', 'M', 'Société']" v-model="actionnaire.civilite" ></v-select>
            </div>
            <div v-if="actionnaire.civilite === 'Société'">
              <label>Dénomination social</label>
              <input type="text" name="raison_social" v-model="actionnaire.raisonSociale"/>
            </div>
            <div v-else>
              <label>Nom</label>
              <input type="text" name="lastName" v-model="actionnaire.nom"/>
            </div>
          </div>

          <div class="row" v-if="actionnaire.civilite === 'Société'">
            <div>
              <label>Nom du représentant légal </label>
              <input type="text" v-model="actionnaire.nom"/>
            </div>
            <div>
              <label>Prénom du représentant légal</label>
              <input type="text" v-model="actionnaire.prenom"/>
            </div>
          </div>

          <div class="row" v-else>
            <div>
              <label>Prénom</label>
              <input type="text" v-model="actionnaire.prenom"/>
            </div>
            <div>
              <label>Ville de naissance</label>
              <input type="text" v-model="actionnaire.villeNaissance"/>
            </div>
          </div>

          <div class="row">
            <div v-if="actionnaire.civilite === 'Société'">
              <label>Numéro SIREN</label>
              <input type="text" name="siren" v-model="actionnaire.siren"/>
            </div>
            <div v-else>
              <label>Date de naissance</label>
              <input type="date" name="birthdate" v-model="actionnaire.dateDeNaissance"/>
            </div>
          </div>

          <div class="row full">
            <div>
              <label v-if="actionnaire.civilite === 'Société'">Adresse du siège social</label>
              <label v-else>Adresse</label>
              <client-only>
                <vue-google-autocomplete
                  :id="`${index}`"
                  placeholder=""
                  v-model="actionnaire.adresse"
                  country="fr"
                  v-on:placechanged="getAddressData">
                </vue-google-autocomplete>
              </client-only>
            </div>
          </div>

          <div class="row">
            <div>
              <label v-if="actionnaire.civilite === 'Société'">Code postale du siège social</label>
              <label v-else>Code postale</label>
              <input type="text" v-model="actionnaire.codePostal" />
            </div>

            <div>
              <label v-if="actionnaire.civilite === 'Société'">Ville du siège social</label>
              <label v-else>Ville</label>
              <input type="text" v-model="actionnaire.ville" />
            </div>
          </div>

          <div class="row">
            <div v-if="actionnaire.civilite === 'Société'">
              <label>Immatriculée au RCS de</label>
              <input type="text" v-model="actionnaire.rcs" />
            </div>
            <div v-else>
              <label>Nationnalité</label>
              <v-select :options="nationnalitesList" v-model="actionnaire.nationnalite" ></v-select>
            </div>

            <div v-if="actionnaire.civilite === 'Société'">
              <label>Forme juridique</label>
              <v-select :options="formeJuridiques" v-model="actionnaire.formeJuridique"></v-select>
            </div>
            <div v-else>
              <label>Régime matrimonial</label>
              <v-select class="regime_matrimonial" :options="regimeMatrimonial" v-model="actionnaire.regimeMatrimonial"></v-select>
            </div>
          </div>

          <div v-if="actionnaire.regimeMatrimonial">
            <div class="row full" v-if="actionnaire.regimeMatrimonial.value !== 'célibataire'">
              <div>
                <label>Prénom et Nom de naissance du conjoint</label>
                <input type="text" v-model="actionnaire.conjoint"/>
              </div>
            </div>
          </div>

          <div class="row full">
            <div>
              <label>Montant du capital apporté</label>
              <input type="number" v-model="actionnaire.capital"/>
            </div>
          </div>


          <div class="row full">
            <div>
              <label>Souhaitez-vous effectuer des apports en nature au capital ?</label>
              <div class="select">
                <div :class="{active: (actionnaire.choixApportNature === 'oui')}" @click="actionnaire.choixApportNature = 'oui'">Oui</div>
                <div :class="{active: (actionnaire.choixApportNature === 'non')}" @click="actionnaire.choixApportNature = 'non'">Non</div>
              </div>
            </div>
          </div>

          <div v-if="actionnaire.choixApportNature === 'oui'">
            <div class="row" v-for="apport in actionnaire.apports">
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
              <button @click="actionnaire.apports.push({description: null, valorisation: null})">
                Ajouter un apport en nature
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="actions" v-if="actionnaires.length">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {nbActionnaires: nbActionnaires, actionnaires: actionnaires})">Continuer</button>
    </div>

    <div class="actions">
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
    data: {
      type: Array,
      default: []
    },
    type: null
  },
  data() {
    return {
      nbActionnaires: 0,
      actionnaires: [],
      nationnalitesList: nationnality.nationnalitesList,
      addressSearchResults: [],
      regimeMatrimonial: regimeMatrimonial.list,
      formeJuridiques: ['EURL', 'SASU', 'SAS', 'SARL', 'SCI', 'SA']
    }
  },
  mounted() {
    if (this.data) {
      this.actionnaires = this.data
      if (this.actionnaires) {
        this.nbActionnaires = this.actionnaires.length
      }
    }
  },
  methods: {
    getAddressData(addressData, placeResultData, id) {
      this.actionnaires[id].codePostal = addressData.postal_code
      this.actionnaires[id].ville = addressData.locality
      this.actionnaires[id].adresse = placeResultData.name
    }
  },
  watch: {
    data() {
      if (this.data) {
        this.actionnaires = this.data
        if (this.actionnaires) {
          this.nbActionnaires = this.actionnaires.length
        }
      }
    },
    actionnaires: {
      deep: true,
      handler(old, value) {
        let capital = 0
        for (let actionnaire of this.actionnaires) {
          if (actionnaire.civilite === 'Société') {
            actionnaire.label = actionnaire.raisonSociale
          }
          else {
            actionnaire.label = `${actionnaire.nom} ${actionnaire.prenom}`
          }
        }
      }
    },
    nbActionnaires() {
      let diff = parseInt(this.nbActionnaires) - parseInt(this.actionnaires.length)

      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          let actionnaire = {
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
            rcs: null,
            raisonSociale: null,
            formeJuridique: null,
            siren: null,
            label: null,
            choixApportNature: 'non',
            capital: null,
            conjoint: null,
            apports: [{description: null, valorisation: null}]
          };

          this.actionnaires.push(actionnaire)
        }
      }
      else {
        this.actionnaires.splice(-1, diff*-1);
      }
    }
  },
  computed: {
    title() {
      if (this.type === 'sas') {
        return "Combien d’actionnaires serez-vous ?"
      }

      return "Combien d’associés serez-vous ?"
    },
    placeHolder() {
      if (this.type === 'sas') {
        return "Sélectionnez le nombre d'actionnaires"
      }

      return "Sélectionnez le nombre d'associés"
    },
    actionnaireOrAssocie() {
      if (this.type === 'sas') {
        return "actionnaire"
      }

      return "associé"
    }
  },
  filters: {
    position(value) {
      switch (value) {
        case 0:
          return "premier"
        case 1:
          return "second"
        case 2:
          return "troisième"
        case 3:
          return "quatrième"
        case 4:
          return "cinquième"
        case 5:
          return "sixième"
        case 6:
          return "septième"
        case 7:
          return "huitième"
        case 8:
          return "neuvième"
        case 9:
          return "dixième"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  .actionnaires_form {

    .select {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
    }

    .actionnaires {
      max-width: 620px;
      margin: auto;
      > div {
        background: #FFFFFF;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 30px;

        .row {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
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

            @include phone-600 {
              width: 100%;
            }
          }
        }

        .btn {
          display: flex;
          justify-content: flex-end;
        }

        .select {
          display: flex;
          justify-content: space-between;
          max-width: 260px;
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
    }
  }
}
</style>
