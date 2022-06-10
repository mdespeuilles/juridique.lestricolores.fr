<template>
  <div class="doc">
    <statut :submission="submission" v-if="doc === 'all' || doc === 'statuts'"/>
    <etat-des-actes-accomplis :submission="submission" v-if="doc === 'all' || doc === 'eaa'"/>
    <pouvoir :submission="submission" v-if="doc === 'all' || doc === 'pouvoir'"/>
    <dnc :submission="submission" v-if="doc === 'all' || doc === 'dnc'"/>
    <dnc2
      v-if="submission.directeurGeneral.label !== 'Aucun' && (doc === 'all' || doc === 'dnc2')"
      :submission="submission"/>
    <attestation-mise-a-disposition
      v-if="submission.siege === 'dirigeant' && (doc === 'all' || doc === 'ama')"
      :submission="submission"
    />
    <pv :submission="submission" v-if="doc === 'all' || doc === 'pv'"/>
  </div>
</template>
<script>
import Statut from "./components/sarl/statut";
import EtatDesActesAccomplis from "./components/sarl/etatDesActesAccomplis";
import Pouvoir from "./components/sarl/pouvoir";
import Dnc from "./components/sarl/dnc";
import AttestationMiseADisposition from "./components/sarl/attestationMiseADisposition";
import Pv from "./components/sarl/pv";
import Dnc2 from "./components/sarl/dnc2";
export default {
  components: {Dnc2, Pv, AttestationMiseADisposition, Dnc, Pouvoir, EtatDesActesAccomplis, Statut},
  props: {
    submission: null,
    preview: null,
    doc: null
  }
}
</script>
