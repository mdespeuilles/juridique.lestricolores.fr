<template>
  <div class="doc">
    <pv1 :submission="submission" v-if="doc === 'all' || doc === 'pv1'"/>
    <pv2 :submission="submission" v-if="doc === 'all' || doc === 'pv2'"/>
    <comptes-de-cloture :submission="submission" v-if="doc === 'all' || doc === 'comptes-cloture'"/>
    <pouvoir :submission="submission" v-if="doc === 'all' || doc === 'pouvoir'"/>
  </div>
</template>

<script>
import pv1 from "./components/dissolution/pv1";
import pv2 from "./components/dissolution/pv2";
import ComptesDeCloture from "./components/dissolution/comptes-de-cloture";
import Pouvoir from "./components/dissolution/pouvoir";
export default {
  components: {Pouvoir, ComptesDeCloture, pv1, pv2},
  props: {
    submission: null,
    preview: null,
    doc: null
  },
}
</script>
