<template>
  <section>
    <h2>Modification entreprise</h2>
    <p>Modifiez votre entreprise en toute sécurité</p>

    <div class="form">
      <div>
        <label>Raison sociale</label>
        <input type="text" v-model="informations.raisonSociale">
      </div>

      <div>
        <label>Nom du dirigeant</label>
        <input type="text" v-model="informations.nomDirigeant">
      </div>

      <div>
        <label>Montant du capital</label>
        <input type="text" v-model="informations.capital">
      </div>

      <div>
        <label>Adresse</label>
        <input type="text" v-model="informations.adresse">
      </div>

      <div>
        <label>Code postal</label>
        <input type="text" v-model="informations.codePostal">
      </div>
      <div>
        <label>Ville</label>
        <input type="text" v-model="informations.ville">
      </div>

      <div>
        <label>Immatriculer au greffe de</label>
        <input type="text" v-model="informations.villeRcs">
      </div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {informations: informations})">Continuer</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    submission: null
  },
  data() {
    return {
      informations: {
        raisonSociale: null,
        nomDirigeant: null,
        capital: null,
        adresse: null,
        codePostal: null,
        ville: null,
        villeRcs: null
      }
    }
  },
  computed: {
    siege() {
      if (this.submission.data.infoEntreprise.etablissements.length) {
        for (const etablissement of this.submission.data.infoEntreprise.etablissements) {
          if (etablissement.siege) {
            return etablissement
          }
        }
      }

      return {}
    }
  },
  mounted() {
    if (this.submission) {
      console.log(this.submission.infoEntreprise)

      setTimeout(() => {
        this.informations.capital = this.submission.data.infoEntreprise.capital
        this.informations.raisonSociale = this.submission.data.infoEntreprise.denomination
        this.informations.nomDirigeant = this.submission.data.infoEntreprise.representants[0].nom_complet
        this.informations.adresse = this.siege.adresse_ligne_1
        this.informations.codePostal = this.siege.code_postal
        this.informations.ville = this.siege.ville
        this.informations.villeRcs = this.submission.data.infoEntreprise.greffe
      }, 500)
    }
  },
  watch: {
    submission: {
      handler() {
        if (this.submission) {
          setTimeout(() => {
            this.informations.capital = this.submission.data.infoEntreprise.capital
            this.informations.raisonSociale = this.submission.data.infoEntreprise.denomination
            this.informations.nomDirigeant = this.submission.data.infoEntreprise.representants[0].nom_complet
            this.informations.adresse = this.siege.adresse_ligne_1
            this.informations.codePostal = this.siege.code_postal
            this.informations.ville = this.siege.ville
            this.informations.villeRcs = this.submission.data.infoEntreprise.greffe
          }, 500)
        }
      },
      deep: true
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
    margin-bottom: 78px;
  }

  .form {
    max-width: 400px;
    margin: auto;
    margin-bottom: 50px;

    > div {
      margin-bottom: 10px;
    }
  }
}
</style>
