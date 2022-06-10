<template>
  <section id="form">
    <steps :steps="steps" v-if="page > 0" :currentStep="currentStep"/>

    <div>
      <start-modification
        v-if="page === 0" @next="page++"
      />

      <modification-information
        v-if="page === 1"
        @next="next"
      />

      <modification-information-from
        v-if="page === 2"
        :submission="submission"
        @next="next"
        @back="back"
      />

      <changement-raison-social
        v-if="page === 3"
        :data="submission.data"
        :submission="submission"
        @next="next"
        @back="back"
      />

      <changement-siege
        v-if="page === 4"
        :data="submission.data"
        :submission="submission"
        @next="next"
        @back="back"
      />

      <augmantation-capital
        v-if="page === 5"
        :data="submission.data"
        :submission="submission"
        @next="next"
        @back="back"
      />

      <changement-activite
        v-if="page === 6"
        :data="submission.data"
        :submission="submission"
        @next="next"
        @back="back"
      />

      <etablissement-secondaire
        v-if="page === 7"
        :data="submission.data"
        :submission="submission"
        @next="next"
        @back="back"
      />

      <changement-dirigeant
        v-if="page === 8"
        :data="submission.data"
        :submission="submission"
        @next="next"
        @back="back"
      />

      <cession-titre
        v-if="page === 9"
        :data="submission.data"
        :submission="submission"
        @next="next"
        @back="back"
      />

      <mise-en-sommeil
        v-if="page === 10"
        :data="submission.data"
        :submission="submission"
        @next="next"
        @back="back"
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

      <end2
        v-if="page === 14"
        :submission="submission"
      />
    </div>
  </section>
</template>
<script>
import Steps from "../../components/form/steps";
import {customAlphabet} from "nanoid";
import {v4 as uuidv4} from "uuid";
import NosOffres from "../../components/form/nos-offres";
import Cart from "../../components/form/cart";
import Paiement from "../../components/form/paiement";
import StartModification from "../../components/form/startModification";
import ModificationInformation from "../../components/form/modificationInformation";
import ModificationInformationFrom from "../../components/form/modificationInformationFrom";
import ChangementRaisonSocial from "../../components/form/modifications/changementRaisonSocial";
import ChangementSiege from "../../components/form/modifications/changementSiege";
import AugmantationCapital from "../../components/form/modifications/augmantationCapital";
import ChangementActivite from "../../components/form/modifications/changementActivite";
import EtablissementSecondaire from "../../components/form/modifications/etablissementSecondaire";
import ChangementDirigeant from "../../components/form/modifications/changementDirigeant";
import CessionTitre from "../../components/form/modifications/cessionTitre";
import MiseEnSommeil from "../../components/form/modifications/miseEnSommeil";
import End2 from "../../components/form/end2";
export default {
  components: {
    End2,
    MiseEnSommeil,
    CessionTitre,
    ChangementDirigeant,
    EtablissementSecondaire,
    ChangementActivite,
    AugmantationCapital,
    ChangementSiege,
    ChangementRaisonSocial,
    ModificationInformationFrom,
    ModificationInformation,
    StartModification,
    Paiement,
    Cart,
    NosOffres,
    Steps
  },
  data() {
    return {
      page: 0,
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
      ],
      submission: {
        id: null,
        uuid: null,
        reference: null,
        operation: 'Modification',
        data: {
          phone: null,
          email: null,
          siren: null,
          type: 'modification',
          wantRaisonSocial: null,
          nouvelleRaisonSocial: null,
          wantSiegeSocial: null,
          nouveauSiege: {
            adresse: null,
            codePostal: null,
            ville: null
          },
          wantAugmantationCapital: null,
          nomAssocie: null,
          montantCapital: null,
          primeEmission: null,
          ajoutAssocie: null,
          secteurActivite: {},
          typeChangement: null,
          wantEtablissementSecondaire: null,
          etablissementSecondaire: {
            adresse: null,
            codePostal: null,
            ville: null
          },
          ancientEtablissementSecondaire: {
            adresse: null,
            codePostal: null,
            ville: null
          },
          changementDirigeantAction: null,
          nouveauGerant: {},
          nomAncienDirigeant: null,
          donneQuitus: true,
          wantCessionTitre: null,
          cessions: [],
          wantMiseEnSommeil: null
        }
      },
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

          this.$axios.get(`/api/submissions-company-info/${this.submission.uuid}`).then(response => {
            this.submission = response.data
          })
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
      }
    }
  },
  computed: {
    currentStep() {
      let current = 1

      return current
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  max-width: 880px;
  margin: auto;
  padding-top: 30px;
}
</style>
