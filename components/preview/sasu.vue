<template>
  <div class="doc">
    <statut :submission="submission" v-if="doc === 'all' || doc === 'statuts'"/>
    <etat-des-actes-accomplis :submission="submission" v-if="doc === 'all' || doc === 'eaa'"/>
    <pouvoir :submission="submission" v-if="doc === 'all' || doc === 'pouvoir'"/>
    <dnc :submission="submission" v-if="doc === 'all' || doc === 'dnc'"/>
    <attestation-mise-a-disposition
      v-if="submission.siege === 'dirigeant' && (doc === 'all' || doc === 'ama')"
      :submission="submission"
    />
    <pv :submission="submission" v-if="doc === 'all' || doc === 'pv'"/>
    <liste-des-souscripteurs :submission="submission" v-if="doc === 'all' || doc === 'ls'"/>
  </div>
</template>

<script>
import Statut from "./components/sasu/statut";
import EtatDesActesAccomplis from "./components/sasu/etatDesActesAccomplis";
import Pouvoir from "./components/sasu/pouvoir";
import Dnc from "./components/sasu/dnc";
import AttestationMiseADisposition from "./components/sasu/attestationMiseADisposition";
import Pv from "./components/sasu/pv";
import ListeDesSouscripteurs from "./components/sasu/listeDesSouscripteurs";
export default {
  components: {ListeDesSouscripteurs, AttestationMiseADisposition, Dnc, Pouvoir, EtatDesActesAccomplis, Statut, Pv},
  props: {
    submission: null,
    preview: null,
    doc: null
  },
}
</script>
