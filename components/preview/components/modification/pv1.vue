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
    <p v-if="submission.wantAugmantationCapital">
      - Modification du capital social
    </p>

    <p v-if="submission.wantRaisonSocial">
      - Modification de la raison sociale de l’entreprise
    </p>

    <p v-if="submission.wantSiegeSocial">
      - Modification du siège social de l’entreprise
    </p>

    <p v-if="submission.wantChangementActivite">
      - Changement de l'activité de l’entreprise
    </p>

    <p v-if="submission.wantEtablissementSecondaire">
      - Création d'un établissement secondaire
    </p>

    <p v-if="submission.wantChangementDirigeant">
      - Modification de la direction
    </p>

    <p v-if="submission.wantCessionTitre">
      - Cession de parts sociales
    </p>

    <p v-if="submission.wantMiseEnSommeil">
      - Mise en someil de la société
    </p>

    <p>
      - Modification des statuts en conséquence,
    </p>

    <p>
      - Pouvoirs en vue des formalités.
    </p>

    <br />
    <br />
    <br />

    <p>
      <strong><u>1ÈRE RÉSOLUTION</u></strong>
    </p>

    <div v-if="submission.wantAugmantationCapital">
      <p>
        {{ associeOrActionnaire(true) }} <span v-if="isPlural">décident</span><span v-if="!isPlural">décide</span>
        d’augmenter le capital social de {{ submission.montantCapital|currency }}, afin de le porter de
        {{ submission.infoEntreprise.capital|currency }} à {{ (parseFloat(submission.montantCapital) + parseFloat(submission.infoEntreprise.capital))|currency }},
        par la création de nouvelles actions.
      </p>
      <p>
        <strong>
          Cette résolution, mise aux voix, est adoptée à l’unanimité.
        </strong>
      </p>
    </div>

    <div v-if="submission.wantRaisonSocial">
      <p>
        {{ associeOrActionnaire(true) }} <span v-if="isPlural">décident</span><span v-if="!isPlural">décide</span>
        de changer la raison sociale de l’entreprise par {{ submission.nouvelleRaisonSocial }}
      </p>
      <p>
        <strong>
          Cette résolution, mise aux voix, est adoptée à l’unanimité.
        </strong>
      </p>
    </div>

    <div v-if="submission.wantSiegeSocial">
      <p>
        {{ associeOrActionnaire(true) }} <span v-if="isPlural">décident</span><span v-if="!isPlural">décide</span>
        de transférer le siège social de l’entreprise  à l’adresse suivante :
        <span v-if="submission.nouveauSiege">
          {{ submission.nouveauSiege.adresse }} {{ submission.nouveauSiege.codePostal }} {{ submission.nouveauSiege.ville }}
        </span>
      </p>
      <p>
        <strong>
          Cette résolution, mise aux voix, est adoptée à l’unanimité.
        </strong>
      </p>
    </div>

    <div v-if="submission.wantChangementActivite && submission.typeChangement === 'add'">
      <p>
        {{ associeOrActionnaire(true) }} <span v-if="isPlural">décident</span><span v-if="!isPlural">décide</span>
        de changer l’activité de l’entreprise  par :
        {{ submission.secteurActivite.Description }}
      </p>
      <p>
        <strong>
          Cette résolution, mise aux voix, est adoptée à l’unanimité.
        </strong>
      </p>
    </div>

    <div v-if="submission.wantChangementActivite && submission.typeChangement !== 'add'">
      <p>
        {{ associeOrActionnaire(true) }} <span v-if="isPlural">décident</span><span v-if="!isPlural">décide</span>
        d’ajouter l’activité suivante :
        {{ submission.secteurActivite.Description }}
      </p>
      <p>
        <strong>
          Cette résolution, mise aux voix, est adoptée à l’unanimité.
        </strong>
      </p>
    </div>

    <div v-if="submission.wantEtablissementSecondaire">
      <p>
        {{ associeOrActionnaire(true) }} <span v-if="isPlural">décident</span><span v-if="!isPlural">décide</span>
        de créer un établissement secondaire à l’adresse suivante :
        {{ submission.etablissementSecondaire.adresse }} {{ submission.etablissementSecondaire.codePostal }} {{ submission.etablissementSecondaire.ville }}
      </p>
      <p>
        <strong>
          Cette résolution, mise aux voix, est adoptée à l’unanimité.
        </strong>
      </p>
    </div>

    <div
      v-if="submission.wantChangementDirigeant
      && (submission.changementDirigeantAction === 'Démission d\'un co-gérant' || submission.changementDirigeantAction === 'Changer de dirigeant')"
    >
      <p>
        {{ associeOrActionnaire(true) }} <span v-if="isPlural">prennent</span><span v-if="!isPlural">prent</span>
        acte de la démission de {{ submission.nomAncienDirigeant }} à compter de ce jour
        <span v-if="submission.donneQuitus">et lui donnent quitus entier et définitif pour son mandat.</span>
      </p>
      <p>
        <strong>
          Cette résolution, mise aux voix, est adoptée à l’unanimité.
        </strong>
      </p>
    </div>

    <div
      v-if="submission.wantChangementDirigeant
      && (submission.changementDirigeantAction === 'Nominer un co-gérant' || submission.changementDirigeantAction === 'Changer de dirigeant')"
    >
      <p>
        {{ associeOrActionnaire(true) }} <span v-if="isPlural">décident</span><span v-if="!isPlural">décide</span>
        de nommer en qualité de <span v-if="isSasOrSasu">directeur général</span><span v-if="!isSasOrSasu">co-gérant</span> pour une durée indéterminée à compter de ce jour,
        <people :people="submission.nouveauGerant" />
      </p>
      <p>
        <strong>
          Cette résolution, mise aux voix, est adoptée à l’unanimité.
        </strong>
      </p>
    </div>

    <div v-if="submission.wantCessionTitre">
      <p>
        {{ associeOrActionnaire(true) }} <span v-if="isPlural">acceptent</span><span v-if="!isPlural">accepte</span>
      </p>
      <p v-for="cession in submission.cessions">
        - la cession de {{ cession.nbreTitresCedes }} parts sociales entre {{ cession.nomCedant }} et {{ cession.nomAquereur }}.
      </p>
      <p>
        <strong>
          Cette résolution, mise aux voix, est adoptée à l’unanimité.
        </strong>
      </p>
    </div>

    <p>
      <strong><u>2ÈME RÉSOLUTION</u></strong>
    </p>

    <p>
      Les statuts seront modifiés en conséquence et les formalités réalisées auprès des organismes compétents.
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
      L'assemblée donne tous pouvoirs au porteur de copies ou d’extraits du présent procès-verbal pour remplir toutes formalités de droit.
    </p>

    <p>
      <strong>
        Cette résolution, mise aux voix, est adoptée à l’unanimité.
      </strong>
    </p>

    <p>
      L'ordre du jour étant épuisé, et personne ne demandant plus la parole, le gérant déclare la séance levée.
    </p>

    <p>
      De tout ce que dessus, il a été dressé le présent procès-verbal qui a été signé, après lecture par la présidente.
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
