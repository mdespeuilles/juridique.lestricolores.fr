<template>
  <section>
    <h2>Changement de dirigeant</h2>
    <p>Souaitez-vous effectuer des changement concernant les dirigeants de votre société ?</p>

    <div class="select">
      <div :class="{active: wantChangementDirigeant}" @click="wantChangementDirigeant = true">Oui</div>
      <div :class="{active: !wantChangementDirigeant}" @click="wantChangementDirigeant = false">Non</div>
    </div>

    <div class="form" v-if="wantChangementDirigeant === true">
      <div>
        <label>Que souhaitez-vous faire ?</label>
        <v-select :options="options" v-model="changementDirigeantAction"></v-select>
      </div>

      <div v-if="changementDirigeantAction !== 'Nominer un co-gérant'">
        <label>Nom et prénom de l'ancien dirigeant</label>
        <input type="text" v-model="nomAncienDirigeant">
      </div>

      <div v-if="changementDirigeantAction !== 'Nominer un co-gérant'">
        <label>Donne quitus pour ses fonctions de dirigeant</label>
        <div class="select">
          <div :class="{active: donneQuitus}" @click="donneQuitus = true">Oui</div>
          <div :class="{active: !donneQuitus}" @click="donneQuitus = false">Non</div>
        </div>
      </div>

      <div v-if="changementDirigeantAction !== 'Démission d\'un co-gérant'">
        <h3>Nouveau dirigeant</h3>
        <div class="row">
          <div>
            <label>Civilité</label>
            <v-select :options="['Mme', 'M', 'Société']" v-model="nouveauGerant.civilite" ></v-select>
          </div>
          <div v-if="nouveauGerant.civilite === 'Société'">
            <label>Dénomination social</label>
            <input type="text" name="raison_social" v-model="nouveauGerant.raisonSociale"/>
          </div>
          <div v-else>
            <label>Nom</label>
            <input type="text" name="lastName" v-model="nouveauGerant.nom"/>
          </div>
        </div>

        <div class="row" v-if="nouveauGerant.civilite === 'Société'">
          <div>
            <label>Nom du représentant légal </label>
            <input type="text" v-model="nouveauGerant.nom"/>
          </div>
          <div>
            <label>Prénom du représentant légal</label>
            <input type="text" v-model="nouveauGerant.prenom"/>
          </div>
        </div>

        <div class="row" v-else>
          <div>
            <label>Prénom</label>
            <input type="text" v-model="nouveauGerant.prenom"/>
          </div>
          <div>
            <label>Ville de naissance</label>
            <input type="text" v-model="nouveauGerant.villeNaissance"/>
          </div>
        </div>

        <div class="row">
          <div v-if="nouveauGerant.civilite === 'Société'">
            <label>Numéro SIREN</label>
            <input type="text" name="siren" v-model="nouveauGerant.siren"/>
          </div>
          <div v-else>
            <label>Date de naissance</label>
            <input type="date" name="birthdate" v-model="nouveauGerant.dateDeNaissance"/>
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" v-model="nouveauGerant.email"/>
          </div>
        </div>

        <div class="row full">
          <div>
            <label v-if="nouveauGerant.civilite === 'Société'">Adresse du siège social</label>
            <label v-else>Adresse</label>
            <client-only>
              <vue-google-autocomplete
                id="actionnaire_adresse"
                placeholder=""
                v-model="nouveauGerant.adresse"
                country="fr"
                v-on:placechanged="getAddressData">
              </vue-google-autocomplete>
            </client-only>
          </div>
        </div>

        <div class="row">
          <div>
            <label v-if="nouveauGerant.civilite === 'Société'">Code postale du siège social</label>
            <label v-else>Code postale</label>
            <input type="text" v-model="nouveauGerant.codePostal" />
          </div>

          <div>
            <label v-if="nouveauGerant.civilite === 'Société'">Ville du siège social</label>
            <label v-else>Ville</label>
            <input type="text" v-model="nouveauGerant.ville" />
          </div>
        </div>

        <div class="row">
          <div v-if="nouveauGerant.civilite === 'Société'">
            <label>Immatriculée au RCS de</label>
            <input type="text" v-model="nouveauGerant.rcs" />
          </div>
          <div v-else>
            <label>Nationnalité</label>
            <v-select :options="nationnalitesList" v-model="nouveauGerant.nationnalite" ></v-select>
          </div>

          <div v-if="nouveauGerant.civilite === 'Société'">
            <label>Forme juridique</label>
            <v-select :options="formeJuridiques" v-model="nouveauGerant.formeJuridique"></v-select>
          </div>
          <div v-else>
            <label>Régime matrimonial</label>
            <v-select class="regime_matrimonial" :options="regimeMatrimonial" v-model="nouveauGerant.regimeMatrimonial"></v-select>
          </div>
        </div>

        <div v-if="nouveauGerant.regimeMatrimonial">
          <div class="row full" v-if="nouveauGerant.regimeMatrimonial.value !== 'célibataire'">
            <div>
              <label>Prénom et Nom de naissance du conjoint</label>
              <input type="text" v-model="nouveauGerant.conjoint"/>
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
        changementDirigeantAction: changementDirigeantAction,
        wantChangementDirigeant: wantChangementDirigeant,
        nouveauGerant: nouveauGerant,
        nomAncienDirigeant: nomAncienDirigeant,
        donneQuitus: donneQuitus
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
      wantChangementDirigeant: false,
      changementDirigeantAction: 'Nominer un co-gérant',
      options: [
        'Nominer un co-gérant',
        'Changer de dirigeant',
        'Démission d\'un co-gérant'
      ],
      nouveauGerant: {
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
      },
      nomAncienDirigeant: null,
      donneQuitus: true
    }
  },
  methods: {
    getAddressData(addressData, placeResultData, id) {
      this.nouveauGerant.codePostal = addressData.postal_code
      this.nouveauGerant.ville = addressData.locality
      this.nouveauGerant.adresse = placeResultData.name
    }
  },
  mounted() {
    if (this.data) {
      if (this.data.changementDirigeantAction) this.changementDirigeantAction = this.data.changementDirigeantAction
      if (this.data.wantChangementDirigeant) this.wantChangementDirigeant = this.data.wantChangementDirigeant
      if (this.data.nouveauGerant) this.nouveauGerant = this.data.nouveauGerant
      if (this.data.nomAncienDirigeant) this.nomAncienDirigeant = this.data.nomAncienDirigeant
      if (this.data.donneQuitus) this.donneQuitus = this.data.donneQuitus
    }
  },
  watch: {
    data() {
      if (this.data) {
        if (this.data.changementDirigeantAction) this.changementDirigeantAction = this.data.changementDirigeantAction
        if (this.data.wantChangementDirigeant) this.wantChangementDirigeant = this.data.wantChangementDirigeant
        if (this.data.nouveauGerant) this.nouveauGerant = this.data.nouveauGerant
        if (this.data.nomAncienDirigeant) this.nomAncienDirigeant = this.data.nomAncienDirigeant
        if (this.data.donneQuitus) this.donneQuitus = this.data.donneQuitus
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

    label {
      display: block;
      margin-bottom: 10px;
      margin-top: 20px;
    }
  }
}
</style>
