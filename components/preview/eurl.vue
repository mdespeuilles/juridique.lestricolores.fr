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
  </div>
</template>

<script>
import Statut from "./components/eurl/statut";
import EtatDesActesAccomplis from "./components/eurl/etatDesActesAccomplis";
import Pouvoir from "./components/eurl/pouvoir";
import Dnc from "./components/eurl/dnc";
import AttestationMiseADisposition from "./components/eurl/attestationMiseADisposition";
import Pv from "./components/eurl/pv";
import ListeDesSouscripteurs from "./components/eurl/listeDesSouscripteurs";
export default {
  components: {ListeDesSouscripteurs, AttestationMiseADisposition, Dnc, Pouvoir, EtatDesActesAccomplis, Statut, Pv},
  props: {
    submission: null,
    preview: null,
    doc: null
  }
}
</script>
