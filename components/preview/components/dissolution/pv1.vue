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

    <div class="centertitle">
      <strong>Procès-Verbal en date du {{ $dayjs().format("DD MMMM YYYY") }}</strong>
    </div>

    <h1>ASSEMBLEE GENRALE DES DECISIONS UNANIMES</h1>

    <p>
      Le {{ $dayjs().format("dddd") }} {{ $dayjs().format("d")|numberToLetter }} {{ $dayjs().format("MMMM") }}
      {{ $dayjs().format("YYYY")|numberToLetter }} à dix-huit heures,
    </p>

    <p>
      <!--
      EURL = 5498 // SAS = 5710 // SASU = 5720 // SCI = 6540 // SARL = 5499-->
      <span v-if="submission.infoEntreprise.categorie_juridique === '5498'">
        L’associé unique de la société {{ submission.infoEntreprise.denomination }}
        s’est réuni en Assemblée Générale des Décisions Unanimes au
        {{ submission.infoEntreprise.siege.adresse_ligne_1 }} {{ submission.infoEntreprise.siege.code_postal }} {{ submission.infoEntreprise.siege.ville }}
        siège social de la société, sur convocation de la gérance.
      </span>
      <span v-if="submission.infoEntreprise.categorie_juridique === '5710'">
        les actionnaires de la société {{ submission.infoEntreprise.denomination }}
        se sont réunis en Assemblée Générale des Décisions Unanimes au
        {{ submission.infoEntreprise.siege.adresse_ligne_1 }} {{ submission.infoEntreprise.siege.code_postal }} {{ submission.infoEntreprise.siege.ville }}
        siège social de la société, sur convocation de la présidence.
      </span>
      <span v-if="submission.infoEntreprise.categorie_juridique === '5720'">
        L’actionnaire unique de la société {{ submission.infoEntreprise.denomination }}
        s’est réuni en Assemblée Générale des Décisions Unanimes au
        {{ submission.infoEntreprise.siege.adresse_ligne_1 }} {{ submission.infoEntreprise.siege.code_postal }} {{ submission.infoEntreprise.siege.ville }}
        siège social de la société, sur convocation de la présidence.
      </span>
      <span v-if="submission.infoEntreprise.categorie_juridique === '6540'">
        Les associés de la société {{ submission.infoEntreprise.denomination }}
        se sont réunis en Assemblée Générale des Décisions Unanimes au
        {{ submission.infoEntreprise.siege.adresse_ligne_1 }} {{ submission.infoEntreprise.siege.code_postal }} {{ submission.infoEntreprise.siege.ville }}
        siège social de la société, sur convocation de la gérance.
      </span>
      <span v-if="submission.infoEntreprise.categorie_juridique === '5499'">
        Les associés de la société {{ submission.infoEntreprise.denomination }}
        se sont réunis en Assemblée Générale des Décisions Unanimes au
        {{ submission.infoEntreprise.siege.adresse_ligne_1 }} {{ submission.infoEntreprise.siege.code_postal }} {{ submission.infoEntreprise.siege.ville }}
        siège social de la société, sur convocation de la gérance.
      </span>
    </p>

    <p>
      Le total des parts présentées est égal au nombre d’actions composant le
      capital social, l'assemblée est donc déclarée régulièrement constituée et
      peut valablement délibérer.
    </p>
    <p>
      La séance est présidée par {{ submission.infoEntreprise.representants[0].nom_complet }}
      dirigeant(e) de la société.
    </p>
    <p>
      Le {{ presidentOrGerant }} rappelle que l'Assemblée va délibérer sur l’ordre du jour
      suivant :
    </p>
    <p>
      - Dissolution par anticipation pour cause de cessation d’activité
    </p>

    <p>
      <strong><u>1ÈRE RÉSOLUTION</u></strong>
    </p>
    <p>
      {{ associeOrActionnaire(true) }} <span v-if="isPlural">déchargent</span><span v-if="!isPlural">décharge</span>
      purement et simplement la <span v-if="isSasOrSasu">présidence</span><span v-if="!isSasOrSasu">gérance</span>
      du défaut de convocation par lettre recommandée avec accusé de réception et prennent
      acte que tous les actionnaires sont présents et détiennent l'intégralité du
      capital.
    </p>
    <p>
      <strong>
        Cette résolution, mise aux voix, est adoptée à l’unanimité.
      </strong>
    </p>
    <p>
      <strong><u>2ÈME RÉSOLUTION</u></strong>
    </p>
    <p>
      <strong><u></u></strong>
    </p>
    <p>
      {{ associeOrActionnaire(true) }} <span v-if="isPlural">décident</span><span v-if="!isPlural">décide</span> de dissoudre par anticipation pour cause de cessation
      d'activité ladite société. Elle est par conséquent mise en liquidation
      volontaire à compter de la même date.
    </p>
    <p>
      <strong>
        Cette résolution, mise aux voix, est adoptée à l’unanimité.
      </strong>
    </p>
    <p>
      <strong><u>3ÈME RÉSOLUTION</u></strong>
    </p>
    <p>
      {{ associeOrActionnaire(true) }} <span v-if="isPlural">nomment</span><span v-if="!isPlural">nomme</span> comme liquidateur <people :people="submission.liquidateur" :short="true" /> pour toute la durée de la
      liquidation. Le siège de la liquidation est fixé au siège social de
      l’entreprise.
    </p>
    <p>
      <people :people="submission.liquidateur" :short="true" /> accepte la fonction de liquidateur.
    </p>
    <p>
      <strong>
        Cette résolution, mise aux voix, est adoptée à l’unanimité.
      </strong>
    </p>
    <p>
      <strong><u>4ÈME RÉSOLUTION</u></strong>
    </p>
    <p>
      <strong><u></u></strong>
    </p>
    <p>
      {{ associeOrActionnaire(true) }} <span v-if="isPlural">donnent</span><span v-if="!isPlural">donne</span>
      tous pouvoir au liquidateur pour effectuer la liquidation de l’entreprise.
    </p>
    <p>
      A ce titre, le liquidateur pourra payer le passif, réaliser l’actif et
      répartir le solde de la liquidation entre {{ associeOrActionnaire(false) }}.
    </p>
    <p>
      <strong><u></u></strong>
    </p>
    <p>
      <strong><u>5ÈME RÉSOLUTION</u></strong>
    </p>
    <p>
      <strong><u></u></strong>
    </p>
    <p>
      L'assemblée donne tous pouvoirs au porteur de copies ou d’extraits du
      présent procès-verbal pour remplir toutes formalités de droit.
    </p>
    <p>
      <strong>
        Cette résolution, mise aux voix, est adoptée à l’unanimité.
      </strong>
    </p>
    <p>
      L'ordre du jour étant épuisé, et personne ne demandant plus la parole, le
      gérant déclare la séance levée.
    </p>
    <p>
      De tout ce que dessus, il a été dressé le présent procès-verbal qui a été
      signé, après lecture par le {{ presidentOrGerant }}.
    </p>
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
