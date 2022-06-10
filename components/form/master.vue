<template>
  <section id="form">
    <steps :steps="steps" v-if="page > 0" :currentStep="currentStep"/>
    <div class="sasu" v-if="$route.params.forme === 'sasu'">
      <start v-if="page === 0" @next="page++"/>
      <raison-sociale
        v-if="page === 1"
        @next="next"
        @back="back"
        :data="submission.data.raisonSociale"
      />

      <protection-marque
        v-if="page === 2"
        @next="next"
        @back="back"
        :data="submission.data.protectionMarque"
      />

      <secteur-activite
        v-if="page === 3"
        @next="next"
        @back="back"
        :data="submission.data.secteurActivite"
      />

      <actionnaire-unique
        v-if="page === 4"
        @next="next"
        @back="back"
        :data="submission.data.actionnaireUnique"
        title="Qui sera l'unique actionnaire de la SASU ?"
      />

      <actionnaire-president
        v-if="page === 5"
        @next="next"
        @back="back"
        :data="submission.data.actionnairePresident"
        :president="submission.data.president"
        title="Le créateur de la société sera-t-il également le président ?"
        sub-title="Le président dirige la société au quotidien."
      />

      <capital
        v-if="page === 6"
        @next="next"
        @back="back"
        :data="submission.data.capital"
        :percentage="submission.data.verseCreation"
        :type="$route.params.forme"
        :percentages="[
        {
          label: '100%',
          value: 1
        },
        {
          label: '90%',
          value: 0.9
        },
        {
          label: '80%',
          value: 0.8
        },
        {
          label: '70%',
          value: 0.7
        },
        {
          label: '60%',
          value: 0.6
        },
        {
          label: '50%',
          value: 0.5
        }
      ]"
      />

      <banque
        v-if="page === 7"
        @next="next"
        @back="back"
        :data="submission.data.useQonto"
      />

      <siege
        v-if="page === 8"
        @next="next"
        @back="back"
        :data="{adresseSiege: submission.data.adresseSiege, siege: submission.data.siege }"
        dirigeantLabel="président"
        coDirigeantLabel="directeur général"
        :submission="submission"
      />

      <coordonees
        v-if="page === 9"
        @next="next"
        @back="back"
        :data="{phone: submission.data.phone, email: submission.data.email}"
      />

      <recap
        v-if="page === 10"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <nos-offres
        v-if="page === 11"
        @back="back"
        @next="next"
        :data="submission.data.offre"
      />

      <cart
        v-if="page === 12"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <paiement
        v-if="page === 13"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <end
        v-if="page === 14"
        :submission="submission"
        @next="next"
      />

      <service1
        v-if="page === 15"
        :submission="submission"
        @next="next"
      />

      <service2
        v-if="page === 16"
        :submission="submission"
        @next="next"
      />

      <service3
        v-if="page === 17"
        :submission="submission"
        @next="next"
      />

      <end2
        v-if="page === 18"
        :submission="submission"
      />

    </div>

    <div class="eurl" v-if="$route.params.forme === 'eurl'">
      <start v-if="page === 0" @next="page++"/>
      <raison-sociale
        v-if="page === 1"
        @next="next"
        @back="back"
        :data="submission.data.raisonSociale"
      />

      <protection-marque
        v-if="page === 2"
        @next="next"
        @back="back"
        :data="submission.data.protectionMarque"
      />

      <secteur-activite
        v-if="page === 3"
        @next="next"
        @back="back"
        :data="submission.data.secteurActivite"
      />

      <actionnaire-unique
        v-if="page === 4"
        @next="next"
        @back="back"
        :data="submission.data.actionnaireUnique"
        title="Qui sera l'unique actionnaire de l'EURL ?"
      />

      <actionnaire-president
        v-if="page === 5"
        @next="next"
        @back="back"
        :data="submission.data.actionnairePresident"
        :president="submission.data.president"
        title="Le créateur de la société sera-t-il également le gérant ?"
        sub-title="Le gérant dirige la société au quotidien."
      />

      <capital
        v-if="page === 6"
        @next="next"
        @back="back"
        :data="submission.data.capital"
        :percentage="submission.data.verseCreation"
        :type="$route.params.forme"
        :percentages="[
        {
          label: '100%',
          value: 1
        },
        {
          label: '90%',
          value: 0.9
        },
        {
          label: '80%',
          value: 0.8
        },
        {
          label: '70%',
          value: 0.7
        },
        {
          label: '60%',
          value: 0.6
        },
        {
          label: '50%',
          value: 0.5
        },
        {
          label: '40%',
          value: 0.4
        },
        {
          label: '30%',
          value: 0.3
        },
        {
          label: '20%',
          value: 0.2
        }
      ]"
      />

      <banque
        v-if="page === 7"
        @next="next"
        @back="back"
        :data="submission.data.useQonto"
      />

      <siege
        v-if="page === 8"
        @next="next"
        @back="back"
        :data="{adresseSiege: submission.data.adresseSiege, siege: submission.data.siege }"
        dirigeantLabel="gérant"
        coDirigeantLabel="co-gérant"
        :submission="submission"
      />

      <coordonees
        v-if="page === 9"
        @next="next"
        @back="back"
        :data="{phone: submission.data.phone, email: submission.data.email}"
      />

      <recap
        v-if="page === 10"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <nos-offres
        v-if="page === 11"
        @back="back"
        @next="next"
        :data="submission.data.offre"
      />

      <cart
        v-if="page === 12"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <paiement
        v-if="page === 13"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <end
        v-if="page === 14"
        :submission="submission"
        @next="next"
      />

      <service1
        v-if="page === 15"
        :submission="submission"
        @next="next"
      />

      <service2
        v-if="page === 16"
        :submission="submission"
        @next="next"
      />

      <service3
        v-if="page === 17"
        :submission="submission"
        @next="next"
      />

      <end2
        v-if="page === 18"
        :submission="submission"
      />

    </div>

    <div class="sas" v-if="$route.params.forme === 'sas'">
      <start v-if="page === 0" @next="page++"/>
      <raison-sociale
        v-if="page === 1"
        @next="next"
        @back="back"
        :data="submission.data.raisonSociale"
      />

      <secteur-activite
        v-if="page === 2"
        @next="next"
        @back="back"
        :data="submission.data.secteurActivite"
      />

      <actionnaires
        v-if="page === 3"
        @next="next"
        @back="back"
        :data="submission.data.actionnaires"
        :type="$route.params.forme"
      />

      <president
        v-if="page === 4"
        @next="next"
        @back="back"
        :data="submission.data.president"
        :actionnaires="submission.data.actionnaires"
        title="Qui sera le président de votre entreprise ?"
      />

      <capital
        v-if="page === 5"
        @next="next"
        @back="back"
        :data="submission.data.capital"
        :percentage="submission.data.verseCreation"
        :type="$route.params.forme"
        :percentages="[
        {
          label: '100%',
          value: 1
        },
        {
          label: '90%',
          value: 0.9
        },
        {
          label: '80%',
          value: 0.8
        },
        {
          label: '70%',
          value: 0.7
        },
        {
          label: '60%',
          value: 0.6
        },
        {
          label: '50%',
          value: 0.5
        }
      ]"
      />

      <banque
        v-if="page === 6"
        @next="next"
        @back="back"
        :data="submission.data.useQonto"
      />

      <siege
        v-if="page === 7"
        @next="next"
        @back="back"
        :data="{adresseSiege: submission.data.adresseSiege, siege: submission.data.siege }"
        dirigeantLabel="président"
        coDirigeantLabel="directeur général"
        :submission="submission"
      />

      <coordonees
        v-if="page === 8"
        @next="next"
        @back="back"
        :data="{phone: submission.data.phone, email: submission.data.email}"
      />

      <recap
        v-if="page === 9"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <nos-offres
        v-if="page === 10"
        @back="back"
        @next="next"
        :data="submission.data.offre"
      />

      <cart
        v-if="page === 11"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <paiement
        v-if="page === 12"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <end
        v-if="page === 13"
        :submission="submission"
        @next="next"
      />

      <service1
        v-if="page === 15"
        :submission="submission"
        @next="next"
      />

      <service2
        v-if="page === 16"
        :submission="submission"
        @next="next"
      />

      <service3
        v-if="page === 17"
        :submission="submission"
        @next="next"
      />

      <end2
        v-if="page === 18"
        :submission="submission"
      />
    </div>

    <div class="sarl" v-if="$route.params.forme === 'sarl'">
      <start v-if="page === 0" @next="page++"/>
      <raison-sociale
        v-if="page === 1"
        @next="next"
        @back="back"
        :data="submission.data.raisonSociale"
      />

      <secteur-activite
        v-if="page === 2"
        @next="next"
        @back="back"
        :data="submission.data.secteurActivite"
      />

      <actionnaires
        v-if="page === 3"
        @next="next"
        @back="back"
        :data="submission.data.actionnaires"
        :type="$route.params.forme"
      />

      <president
        v-if="page === 4"
        @next="next"
        @back="back"
        :data="submission.data.president"
        :actionnaires="submission.data.actionnaires"
        title="Qui sera le gérant de votre entreprise ?"
        :nograntsociete="true"
      />

      <directeur-general
        v-if="page === 5"
        @next="next"
        @back="back"
        :data="submission.data.directeurGeneral"
        :actionnaires="submission.data.actionnaires"
        :president="submission.data.president"
        title="Qui sera le co-gérant de votre entreprise ?"
        :nograntsociete="true"
      />

      <capital
        v-if="page === 6"
        @next="next"
        @back="back"
        :data="submission.data.capital"
        :percentage="submission.data.verseCreation"
        :type="$route.params.forme"
        :percentages="[
        {
          label: '100%',
          value: 1
        },
        {
          label: '90%',
          value: 0.9
        },
        {
          label: '80%',
          value: 0.8
        },
        {
          label: '70%',
          value: 0.7
        },
        {
          label: '60%',
          value: 0.6
        },
        {
          label: '50%',
          value: 0.5
        },
        {
          label: '40%',
          value: 0.4
        },
        {
          label: '30%',
          value: 0.3
        },
        {
          label: '20%',
          value: 0.2
        }
      ]"
      />

      <banque
        v-if="page === 7"
        @next="next"
        @back="back"
        :data="submission.data.useQonto"
      />

      <siege
        v-if="page === 8"
        @next="next"
        @back="back"
        :data="{adresseSiege: submission.data.adresseSiege, siege: submission.data.siege }"
        dirigeantLabel="gérant"
        coDirigeantLabel="co-gérant"
        :submission="submission"
      />

      <coordonees
        v-if="page === 9"
        @next="next"
        @back="back"
        :data="{phone: submission.data.phone, email: submission.data.email}"
      />

      <recap
        v-if="page === 10"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <nos-offres
        v-if="page === 11"
        @back="back"
        @next="next"
        :data="submission.data.offre"
      />

      <cart
        v-if="page === 12"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <paiement
        v-if="page === 13"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <end
        v-if="page === 14"
        :submission="submission"
        @next="next"
      />

      <service1
        v-if="page === 15"
        :submission="submission"
        @next="next"
      />

      <service2
        v-if="page === 16"
        :submission="submission"
        @next="next"
      />

      <service3
        v-if="page === 17"
        :submission="submission"
        @next="next"
      />

      <end2
        v-if="page === 18"
        :submission="submission"
      />
    </div>

    <div class="sci" v-if="$route.params.forme === 'sci'">
      <start v-if="page === 0" @next="page++"/>
      <raison-sociale
        v-if="page === 1"
        @next="next"
        @back="back"
        :data="submission.data.raisonSociale"
      />

      <bien-immobilier
        v-if="page === 2"
        @next="next"
        @back="back"
        :data="submission.data.acquisitionBien"
      />

      <type-de-bien
        v-if="page === 3"
        @next="next"
        @back="back"
        :data="submission.data.typeDeBien"
      />

      <actionnaires
        v-if="page === 4"
        @next="next"
        @back="back"
        :data="submission.data.actionnaires"
        :type="$route.params.forme"
      />

      <president
        v-if="page === 5"
        @next="next"
        @back="back"
        :data="submission.data.president"
        :actionnaires="submission.data.actionnaires"
        title="Qui sera le gérant de votre entreprise ?"
        :nograntsociete="true"
      />

      <directeur-general
        v-if="page === 6"
        @next="next"
        @back="back"
        :data="submission.data.directeurGeneral"
        :actionnaires="submission.data.actionnaires"
        :president="submission.data.president"
        title="Qui sera le co-gérant de votre entreprise ?"
        :nograntsociete="true"
      />

      <capital
        v-if="page === 7"
        @next="next"
        @back="back"
        :data="submission.data.capital"
        :percentage="submission.data.verseCreation"
        :type="$route.params.forme"
        :percentages="[
        {
          label: '100%',
          value: 1
        },
        {
          label: '90%',
          value: 0.9
        },
        {
          label: '80%',
          value: 0.8
        },
        {
          label: '70%',
          value: 0.7
        },
        {
          label: '60%',
          value: 0.6
        },
        {
          label: '50%',
          value: 0.5
        },
        {
          label: '40%',
          value: 0.4
        },
        {
          label: '30%',
          value: 0.3
        },
        {
          label: '20%',
          value: 0.2
        },
        {
          label: '10%',
          value: 0.1
        },
        {
          label: '0%',
          value: 0
        }
      ]"
      />

      <banque
        v-if="page === 8"
        @next="next"
        @back="back"
        :data="submission.data.useQonto"
      />

      <siege
        v-if="page === 9"
        @next="next"
        @back="back"
        :data="{adresseSiege: submission.data.adresseSiege, siege: submission.data.siege }"
        dirigeantLabel="gérant"
        coDirigeantLabel="co-gérant"
        :submission="submission"
      />

      <coordonees
        v-if="page === 10"
        @next="next"
        @back="back"
        :data="{phone: submission.data.phone, email: submission.data.email}"
      />

      <recap
        v-if="page === 11"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <nos-offres
        v-if="page === 12"
        @back="back"
        @next="next"
        :data="submission.data.offre"
      />

      <cart
        v-if="page === 13"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <paiement
        v-if="page === 14"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <end
        v-if="page === 15"
        :submission="submission"
        @next="next"
      />

      <service1
        v-if="page === 16"
        :submission="submission"
        @next="next"
      />

      <service2
        v-if="page === 17"
        :submission="submission"
        @next="next"
      />

      <service3
        v-if="page === 18"
        :submission="submission"
        @next="next"
      />

      <end2
        v-if="page === 19"
        :submission="submission"
      />
    </div>
  </section>
</template>

<script>
import start from './start'
import RaisonSociale from "./raisonSociale";
import Actionnaires from "./actionnaires";
import Steps from "./steps";
import Recap from "./recap";
import { v4 as uuidv4 } from 'uuid';
import SecteurActivite from "./secteurActivite";
import Capital from "./capital";
import Coordonees from "./coordonees";
import Paiement from "./paiement";
import ProtectionMarque from "./protectionMarque";
import Autoentrepreneur from "./autoentrepreneur";
import Siege from "./siege";
import Banque from "./banque";
import NosOffres from "./nos-offres";
import Cart from "./cart";
import ActionnairePresident from "./actionnairePresident";
import ActionnaireUnique from "./actionnaireUnique";
import End from "./end";
import { customAlphabet } from 'nanoid'
import President from "./president";
import Service1 from "./service1";
import Service2 from "./service2";
import Service3 from "./service3";
import BienImmobilier from "./bienImmobilier";
import TypeDeBien from "./typeDeBien";
import DirecteurGeneral from "./directeurGeneral";
import End2 from "./end2";

export default {
  components: {
    End2,
    DirecteurGeneral,
    TypeDeBien,
    BienImmobilier,
    Service3,
    Service2,
    Service1,
    President,
    End,
    ActionnaireUnique,
    ActionnairePresident,
    Cart,
    NosOffres,
    Banque,
    Siege,
    Autoentrepreneur,
    ProtectionMarque,
    Paiement,
    Coordonees,
    Capital,
    SecteurActivite,
    Recap,
    Steps,
    Actionnaires,
    RaisonSociale,
    start
  },
  data() {
    return {
      page: 0,
      submission: {
        type: this.$route.params.forme,
        id: null,
        uuid: null,
        reference: null,
        operation: 'Création',
        status: 'Prospect',
        data: {
          type: this.$route.params.forme,
          raisonSociale: null,
          nbActionnaires: null,
          actionnaires: [],
          actionnaireUnique: {
            nom: null,
            prenom: null,
            email: null,
            villeNaissance: null,
            dateDeNaissance: null,
            adresse: null,
            codePostal: null,
            ville: null,
            nationnalite: 'Française',
            regimeMatrimonial: null,
            rcs: null,
            raisonSociale: null,
            formeJuridique: null,
            siren: null,
            choixApportNature: 'non',
            apports: [{description: null, valorisation: null}]
          },
          phone: null,
          email: null,
          capital: null,
          verseCreation: {
            label: '100%',
            value: 1
          },
          secteurActivite: {},
          protectionMarque: null,
          autoentrepreneur: null,
          siege: null,
          adresseSiege: null,
          useQonto: null,
          offre: null,
          cartInfo: {
            discountCode: null,
            total: {
              totalTtc: null
            }
          },
          president: {},
          directeurGeneral: {},
          acquisitionBien: null,
          typeDeBien: null,
          attestationDepotCapital: {
            label: null,
            url: null
          },
          justificatifSiege: {
            label: null,
            url: null
          },
          justificatifPoleEmploiPresident: {
            label: null,
            url: null
          },
          justificatifPoleEmploiDirecteurGeneral: {
            label: null,
            url: null
          },
          justificatifIdentitePresident: {
            label: null,
            url: null
          },
          justificatifIdentiteDirecteurGeneral: {
            label: null,
            url: null
          },
          regimeImpot: null,
          banque: null,
          regimeTva: null,
          nomPerePresident: null,
          nomMerePresident: null,
          nomPereDirecteurGeneral: null,
          nomMereDirecteurGeneral: null,
          demandeAccrePresident: 'non',
          demandeAccreDirecteurGeneral: 'non'
        }
      },
      steps: [
        {
          step: 1,
          label: "Projet",
        },
        {
          step: 2,
          label: "Commande",
        },
        {
          step: 3,
          label: "Services",
        },
        {
          step: 4,
          label: "Dossier juridique",
        },
        {
          step: 5,
          label: "Validation",
        }
      ]
    }
  },
  mounted() {
    const hash = window.location.hash
    if (hash) {
      this.page = parseInt(hash.split('#')[1])
    }

    if (this.$route.query.uuid) {
      this.$axios.get(`/api/submissions-uuid/${this.$route.query.uuid}`).then(response => {
        this.submission.data = response.data.data
        this.submission.id = response.data.id
        this.submission.uuid = response.data.uuid
      })
    }

    if (this.$cookies.get('email')) {
      this.submission.data.email = this.$cookies.get('email')
    }
  },
  methods: {
    gotoPage(page) {
      this.page = page
    },
    back() {
      this.page--
    },
    next(data) {
      this.page++
      if (data) {
        Object.entries(data).forEach(([key,value]) => { this.submission.data[key] = value })
      }

      if (this.submission.id) {
        this.$axios.put(`/api/submissions/${this.submission.id}`, {
          data: this.submission
        }).then(response => {
          console.log(response.data)
        })
      }
      else {
        const nanoid = customAlphabet('123456789abcdefghjklmnpqrstuvwxyz', 6)
        this.submission.uuid = uuidv4()
        this.submission.reference = nanoid().toUpperCase()
        this.$axios.post(`/api/submissions`, {
          data: this.submission
        }).then(response => {
          console.log(response.data)
          this.submission.id = response.data.data.id
        })
      }
    }
  },
  watch: {
    page() {
      window.location.hash = this.page
    },
    submission: {
      deep: true,
      handler() {
        if (this.submission.uuid) {
          const url = new URL(window.location.href)
          url.searchParams.set('uuid', this.submission.uuid);
          history.pushState(null, '', url);
        }

        if (this.submission.data.actionnairePresident === 'oui') {
          if (this.submission.data.type === 'sasu' || this.submission.data.type === 'eurl') {
            this.submission.data.president = this.submission.data.actionnaireUnique
          }
        }
      }
    }
  },
  computed: {
    currentStep() {
      let current = 1

      if (this.submission.type === 'sasu') {
        if (this.page >= 15) {
          return 3
        }
        if (this.page >= 11) {
          return 2
        }
      }

      if (this.submission.type === 'eurl') {
        if (this.page >= 11) {
          return 2
        }
      }

      if (this.submission.type === 'sas') {
        if (this.page >= 14) {
          return 3
        }
        if (this.page >= 11) {
          return 2
        }
      }

      if (this.submission.type === 'sarl') {
        if (this.page >= 11) {
          return 2
        }
      }

      if (this.submission.type === 'sci') {
        if (this.page >= 11) {
          return 2
        }
      }

      return current
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
