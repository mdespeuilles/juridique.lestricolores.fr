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
    <liste-des-souscripteurs :submission="submission" />
  </div>
</template>
<script>
import Statut from "./components/sas/statut";
import EtatDesActesAccomplis from "./components/sas/etatDesActesAccomplis";
import Pouvoir from "./components/sas/pouvoir";
import Dnc from "./components/sas/dnc";
import AttestationMiseADisposition from "./components/sas/attestationMiseADisposition";
import Pv from "./components/sas/pv";
import ListeDesSouscripteurs from "./components/sas/listeDesSouscripteurs";
export default {
  components: {ListeDesSouscripteurs, Pv, AttestationMiseADisposition, Dnc, Pouvoir, EtatDesActesAccomplis, Statut},
  props: {
    submission: null,
    preview: null,
    doc: null
  }
}
</script>
