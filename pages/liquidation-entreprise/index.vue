<template>
  <section id="form">
    <steps :steps="steps" v-if="page > 0" :currentStep="currentStep"/>

    <div>
      <start-liquidation
        v-if="page === 0" @next="page++"
      />

      <liquidation-information
        v-if="page === 1"
        @next="next"
      />

      <liquidation-information-from
        v-if="page === 2"
        :submission="submission"
        @next="next"
        @back="back"
      />

      <liquidation1
        v-if="page === 3"
        :submission="submission"
        @next="next"
        @back="back"
        :data="{
          dateCessation: submission.data.dateCessation,
          etablissementsSecondaires: submission.data.etablissementsSecondaires,
          licenciement: submission.data.licenciement,
          nbEtablissementSecondaire: submission.data.nbEtablissementSecondaire,
          dateLicenciement: submission.data.dateLicenciement
        }"
      />

      <liquidation2
        v-if="page === 4"
        :submission="submission"
        @next="next"
        @back="back"
        :data="{
          dateCloture: submission.data.dateCloture,
          actif: submission.data.actif,
          passif: submission.data.passif,
          montantBanque: submission.data.montantBanque,
          montantRembourse: submission.data.montantRembourse,
          soldeLiquidation: submission.data.soldeLiquidation
        }"
      />

      <liquidation3
        v-if="page === 5"
        :submission="submission"
        @next="next"
        @back="back"
        :data="{liquidateur: submission.data.liquidateur}"
      />

      <nos-offres
        v-if="page === 6"
        @back="back"
        @next="next"
        :data="submission.data.offre"
      />

      <cart
        v-if="page === 7"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <paiement
        v-if="page === 8"
        @back="back"
        @next="next"
        :submission="submission"
      />

      <end2
        v-if="page === 9"
        :submission="submission"
      />
    </div>
  </section>
</template>
<script>
import Steps from "../../components/form/steps";
import StartLiquidation from "../../components/form/startLiquidation";
import {customAlphabet} from "nanoid";
import {v4 as uuidv4} from "uuid";
import LiquidationInformation from "../../components/form/liquidationInformation";
import LiquidationInformationFrom from "../../components/form/liquidationInformationFrom";
import Liquidation1 from "../../components/form/liquidation1";
import Liquidation2 from "../../components/form/liquidation2";
import Liquidation3 from "../../components/form/liquidation3";
import NosOffres from "../../components/form/nos-offres";
import Cart from "../../components/form/cart";
import Paiement from "../../components/form/paiement";
import End2 from "../../components/form/end2";
export default {
  components: {
    End2,
    Paiement,
    Cart,
    NosOffres,
    Liquidation3,
    Liquidation2, Liquidation1, LiquidationInformationFrom, LiquidationInformation, StartLiquidation, Steps},
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
        operation: 'Dissolution',
        data: {
          phone: null,
          email: null,
          siren: null,
          type: 'dissolution',
          licenciement: 'non',
          dateCessation: null,
          etablissementsSecondaires: 'non',
          nbEtablissementSecondaire: null,
          dateLicenciement: null,
          dateCloture: null,
          liquidateur: {}
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
