<template>
  <section v-if="submission">
    <sasu :submission="submission.data" v-if="submission.data.type === 'sasu'" :doc="doc"/>
    <eurl :submission="submission.data" v-if="submission.data.type === 'eurl'" :doc="doc"/>
    <sarl :submission="submission.data" v-if="submission.data.type === 'sarl'" :doc="doc"/>
    <sci :submission="submission.data" v-if="submission.data.type === 'sci'" :doc="doc"/>
    <sas :submission="submission.data" v-if="submission.data.type === 'sas'" :doc="doc"/>
    <dissolution :submission="submission.data" v-if="submission.data.type === 'dissolution'" :doc="doc" />
    <modification :submission="submission.data" v-if="submission.data.type === 'modification'" :doc="doc" />
  </section>
</template>

<script>
import Sasu from "../../components/preview/sasu";
import Eurl from "../../components/preview/eurl";
import Sarl from "../../components/preview/sarl";
import Sci from "../../components/preview/sci";
import Sas from "../../components/preview/sas";
import Dissolution from "../../components/preview/dissolution";
import Modification from "../../components/preview/modification";
export default {
  components: {Modification, Dissolution, Sas, Sci, Sarl, Eurl, Sasu},
  layout: 'preview',
  async asyncData({ $axios, route, error }) {
    let submission = await $axios.get(`/api/submissions-uuid/${route.params.uuid}`)
    console.log(submission.data)


    return {
      submission: submission.data,
      doc: (route.query.doc) ? route.query.doc : 'all'
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
section {
  max-width: 700px;
  margin: auto;
  font-family: "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif;
  font-size: 14px;
  line-height: 21px;
  color: #000;

  ::v-deep .doc {
    .header {
      text-align: center;

      max-width: 60%;
      margin: auto;
      margin-bottom: 10cm;

      > div {
        padding: 30px 0;
        border-bottom:1px solid grey;
      }
    }

    h1 {
      text-align: center;
      font-size: 16px;
      margin-top: 30px;
      margin-bottom: 30px;
    }

    ul li {
      margin-bottom: 0px;
    }
    table {
      width: 100%;
      border: 1px solid #000;
      border-bottom: none;

      tr {
        th, td {
          //border: 1px solid #000;
          border-left: 1px solid #000;
          border-bottom: 1px solid #000;
          padding: 5px 10px;

          &:first-child {
            border-left: none;
          }

          &.center {
            text-align: center;
          }
        }
      }
    }
    table td p {
      margin: 0;
    }

    h2 {
      font-size: 14px;
      text-decoration: underline;
    }

    h3 {
      font-size: 14px;
    }

    p {
      text-align: justify;

      &.underline {
        font-style: italic;
        text-decoration: underline;
      }
    }
  }
}

</style>
