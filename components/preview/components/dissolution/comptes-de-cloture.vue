<template>
  <div>
    <div class="header">
      <div>
        <strong><i>« {{ submission.infoEntreprise.denomination }} »</i></strong><br />
        <strong>{{ submission.infoEntreprise.forme_juridique }}</strong><br />
        <strong>au capital de {{ submission.infoEntreprise.capital|currency }}</strong>
        <div v-if="submission">
          <strong>
            Siège social :
            {{ submission.infoEntreprise.siege.adresse_ligne_1 }} {{ submission.infoEntreprise.siege.code_postal }} {{ submission.infoEntreprise.siege.ville }}
          </strong>
        </div>
        <div>
          <strong>R.C.S. de {{ submission.infoEntreprise.greffe }} {{ submission.infoEntreprise.siren_formate }}</strong>
        </div>
      </div>
    </div>

    <h1>Comptes de clôture de liquidation</h1>

    <ul type="disc">
      <li>
        Actif : {{ submission.actif|currency }}
      </li>
      <li>
        Passif : {{ submission.passif|currency }}
      </li>
      <li>
        Banque : {{ submission.montantBanque|currency }}
      </li>
      <li>
        Capital social remboursé aux associés : {{ submission.montantRembourse|currency }}
      </li>
      <li>
        Boni / Mali:
      </li>
    </ul>

    <p>
      Fait en 4 originaux,
    </p>
    <p>
      À {{ submission.infoEntreprise.siege.ville }},
    </p>
    <p>
      Le {{ $dayjs().format("DD MMMM YYYY") }}
    </p>

    <div style="page-break-before: always;"></div>
  </div>
</template>

<script>
import Siege from "../siege";
import People from "../people";
export default {
  components: {People, Siege},
  props: {
    submission: null
  },
  methods: {
    associeOrActionnaire(maj) {
      if (this.submission.infoEntreprise.categorie_juridique === "5710") {
        if (maj) {
          return "Les actionnaires"
        }
        return "les actionnaires"
      }

      if (this.submission.infoEntreprise.categorie_juridique === "5498") {
        if (maj) {
          return "L'associé unique"
        }
        return "l'associé unique"
      }

      if (this.submission.infoEntreprise.categorie_juridique === "5720") {
        if (maj) {
          return "L'actionnaire unique"
        }
        return "l'actionnaire unique"
      }

      if (maj) {
        return "Les associés"
      }
      return "les associés"
    }
  },
  computed: {
    presidentOrGerant() {
      if (this.submission.infoEntreprise.categorie_juridique === "5710" || this.submission.infoEntreprise.categorie_juridique === "5720") {
        return 'président'
      }
      return 'gérant'
    },
    isSasOrSasu() {
      if (this.submission.infoEntreprise.categorie_juridique === "5710" || this.submission.infoEntreprise.categorie_juridique === "5720") {
        return true
      }
      return false
    },
    isPlural() {
      //EURL = 5498 // SAS = 5710 // SASU = 5720 // SCI = 6540 // SARL = 5499
      if (this.submission.infoEntreprise.categorie_juridique === "5498" || this.submission.infoEntreprise.categorie_juridique === "5720") {
        return false
      }
      return true
    },
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 2cm !important;
}

.centertitle {
  text-align: center;
}

h1 {
  border: 1px solid #000;
  padding: 5px 0;
}
</style>
