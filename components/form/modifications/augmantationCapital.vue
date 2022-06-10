<template>
  <section>
    <h2>Augmentation de capital</h2>
    <p>Souaitez-vous faire une augmentation de capital ?</p>

    <div class="select">
      <div :class="{active: wantAugmantationCapital}" @click="wantAugmantationCapital = true">Oui</div>
      <div :class="{active: !wantAugmantationCapital}" @click="wantAugmantationCapital = false">Non</div>
    </div>

    <div class="form" v-if="wantAugmantationCapital === true">
      <div class="bool">
        <label>Voulez-vous ajouter un associé ?</label>
        <div class="select">
          <div :class="{active: ajoutAssocie}" @click="ajoutAssocie = true">Oui</div>
          <div :class="{active: !ajoutAssocie}" @click="ajoutAssocie = false">Non</div>
        </div>
      </div>

      <div v-if="!ajoutAssocie">
        <label>Nom et prénom de l'associé</label>
        <input type="number" v-model="nomAssocie">
      </div>

      <div>
        <label>Montant de l'augmentation de capital</label>
        <input type="number" v-model="montantCapital">
      </div>

      <div>
        <label>Montant de la prime d'emission</label>
        <input type="number" v-model="primeEmission">
      </div>


      <div v-if="ajoutAssocie">
        <h3>Nouvel associé</h3>
        <div class="row">
          <div>
            <label>Civilité</label>
            <v-select :options="['Mme', 'M', 'Société']" v-model="nouvelAssocie.civilite" ></v-select>
          </div>
          <div v-if="nouvelAssocie.civilite === 'Société'">
            <label>Dénomination social</label>
            <input type="text" name="raison_social" v-model="nouvelAssocie.raisonSociale"/>
          </div>
          <div v-else>
            <label>Nom</label>
            <input type="text" name="lastName" v-model="nouvelAssocie.nom"/>
          </div>
        </div>

        <div class="row" v-if="nouvelAssocie.civilite === 'Société'">
          <div>
            <label>Nom du représentant légal </label>
            <input type="text" v-model="nouvelAssocie.nom"/>
          </div>
          <div>
            <label>Prénom du représentant légal</label>
            <input type="text" v-model="nouvelAssocie.prenom"/>
          </div>
        </div>

        <div class="row" v-else>
          <div>
            <label>Prénom</label>
            <input type="text" v-model="nouvelAssocie.prenom"/>
          </div>
          <div>
            <label>Ville de naissance</label>
            <input type="text" v-model="nouvelAssocie.villeNaissance"/>
          </div>
        </div>

        <div class="row">
          <div v-if="nouvelAssocie.civilite === 'Société'">
            <label>Numéro SIREN</label>
            <input type="text" name="siren" v-model="nouvelAssocie.siren"/>
          </div>
          <div v-else>
            <label>Date de naissance</label>
            <input type="date" name="birthdate" v-model="nouvelAssocie.dateDeNaissance"/>
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" v-model="nouvelAssocie.email"/>
          </div>
        </div>

        <div class="row full">
          <div>
            <label v-if="nouvelAssocie.civilite === 'Société'">Adresse du siège social</label>
            <label v-else>Adresse</label>
            <client-only>
              <vue-google-autocomplete
                id="actionnaire_adresse"
                placeholder=""
                v-model="nouvelAssocie.adresse"
                country="fr"
                v-on:placechanged="getAddressData">
              </vue-google-autocomplete>
            </client-only>
          </div>
        </div>

        <div class="row">
          <div>
            <label v-if="nouvelAssocie.civilite === 'Société'">Code postale du siège social</label>
            <label v-else>Code postale</label>
            <input type="text" v-model="nouvelAssocie.codePostal" />
          </div>

          <div>
            <label v-if="nouvelAssocie.civilite === 'Société'">Ville du siège social</label>
            <label v-else>Ville</label>
            <input type="text" v-model="nouvelAssocie.ville" />
          </div>
        </div>

        <div class="row">
          <div v-if="nouvelAssocie.civilite === 'Société'">
            <label>Immatriculée au RCS de</label>
            <input type="text" v-model="nouvelAssocie.rcs" />
          </div>
          <div v-else>
            <label>Nationnalité</label>
            <v-select :options="nationnalitesList" v-model="nouvelAssocie.nationnalite" ></v-select>
          </div>

          <div v-if="nouvelAssocie.civilite === 'Société'">
            <label>Forme juridique</label>
            <v-select :options="formeJuridiques" v-model="nouvelAssocie.formeJuridique"></v-select>
          </div>
          <div v-else>
            <label>Régime matrimonial</label>
            <v-select class="regime_matrimonial" :options="regimeMatrimonial" v-model="nouvelAssocie.regimeMatrimonial"></v-select>
          </div>
        </div>

        <div v-if="nouvelAssocie.regimeMatrimonial">
          <div class="row full" v-if="nouvelAssocie.regimeMatrimonial.value !== 'célibataire'">
            <div>
              <label>Prénom et Nom de naissance du conjoint</label>
              <input type="text" v-model="nouvelAssocie.conjoint"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {
        nouveauSiege: nouveauSiege,
        nomAssocie: nomAssocie,
        montantCapital: montantCapital,
        primeEmission: primeEmission,
        ajoutAssocie: ajoutAssocie,
        nouvelAssocie: nouvelAssocie,
        wantAugmantationCapital: wantAugmantationCapital
      })">Continuer</button>
    </div>
  </section>
</template>

<script>
import nationnality from "../nationnality";
import regimeMatrimonial from "../regimeMatrimonial";

export default {
  components: {
    VueGoogleAutocomplete: () => import('vue-google-autocomplete')
  },
  props: {
    data: null
  },
  data() {
    return {
      nationnalitesList: nationnality.nationnalitesList,
      addressSearchResults: [],
      regimeMatrimonial: regimeMatrimonial.list,
      formeJuridiques: ['EURL', 'SASU', 'SAS', 'SARL', 'SCI', 'SA'],
      wantAugmantationCapital: false,
      nomAssocie: null,
      montantCapital: null,
      primeEmission: null,
      ajoutAssocie: false,
      nouvelAssocie: {
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
  methods: {
    getAddressData(addressData, placeResultData, id) {
      console.log(placeResultData)
      this.nouvelAssocie.codePostal = addressData.postal_code
      this.nouvelAssocie.ville = addressData.locality
      this.nouvelAssocie.adresse = placeResultData.name
    }
  },
  mounted() {
    if (this.data) {
      if (this.data.ajoutAssocie) this.ajoutAssocie = this.data.ajoutAssocie
      if (this.data.nomAssocie) this.nomAssocie = this.data.nomAssocie
      if (this.data.montantCapital) this.montantCapital = this.data.montantCapital
      if (this.data.primeEmission) this.primeEmission = this.data.primeEmission
      if (this.data.nouvelAssocie) this.nouvelAssocie = this.data.nouvelAssocie
      if (this.data.wantAugmantationCapital) this.wantAugmantationCapital = this.data.wantAugmantationCapital
    }
  },
  watch: {
    data() {
      if (this.data) {
        if (this.data.ajoutAssocie) this.ajoutAssocie = this.data.ajoutAssocie
        if (this.data.nomAssocie) this.nomAssocie = this.data.nomAssocie
        if (this.data.montantCapital) this.montantCapital = this.data.montantCapital
        if (this.data.primeEmission) this.primeEmission = this.data.primeEmission
        if (this.data.nouvelAssocie) this.nouvelAssocie = this.data.nouvelAssocie
        if (this.data.wantAugmantationCapital) this.wantAugmantationCapital = this.data.wantAugmantationCapital
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

    > div {
      margin-bottom: 15px;
      label {
        margin-bottom: 5px;
        display: block;
      }
    }

    .row {
      > div {
        margin-bottom: 15px;
      }
    }

    .bool {
      label {
        text-align: center;
        margin-bottom: 20px;
        display: block;
      }
    }
  }
}
</style>
