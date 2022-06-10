<template>
  <div class="doc">
    <pv1 :submission="submission" v-if="doc === 'all' || doc === 'pv1'"/>
    <pouvoir :submission="submission" v-if="doc === 'all' || doc === 'pouvoir'"/>
  </div>
</template>

<script>
import Pouvoir from "./components/modification/pouvoir";
import Pv1 from "./components/modification/pv1";
export default {
  components: {Pv1, Pouvoir},
  props: {
    submission: null,
    preview: null,
    doc: null
  },
}
</script>
