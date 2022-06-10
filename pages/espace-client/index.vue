<template>
  <section>
    <h1>Mon espace</h1>

    <div class="submissions">

      <div class="submission" v-for="submission in submissions">
        <div class="header">
          <div class="date">{{ $dayjs(submission.createdAt).format("DD MMM YYYY") }}</div>
          <div class="company">{{ submission.data.raisonSociale }}</div>
          <div class="ref">{{ submission.reference }}</div>
        </div>

        <div class="content">
          <nuxt-link v-if="!submission.depotCapital" :to="linkToSubmissionForEdit(submission)" class="btn">Modifier</nuxt-link>
          <a @click.prevent="submissionWithAttestationDepotCapital = submission"
             v-if="!submission.depotCapital"
             href="#" class="btn">
            J'ai mon attestation de dépot de capital
          </a>
          <nuxt-link
             v-if="submission.depotCapital && submission.status === 'A immatriculer'"
             :to="`/dossier-juridique/${submission.uuid}`"
             class="btn">
            Compléter mon dossier
          </nuxt-link>

          <div class="information" v-if="submission.status === 'En cours d\'immatriculation'">
            Votre dossier est en cours de traitement par le Greffe
          </div>

          <a :href="`https://api.legalzen.fr/api/submissions-pdf-uuid/${submission.uuid}?doc=statuts`"
             class="btn" v-if="submission.status === 'En cours d\'immatriculation'">
            Télécharger mes statuts
          </a>

          <a :href="submission.kbis_url"
             download
             target="_blank"
             class="btn" v-if="submission.status === 'Kbis obtenu'">
            Télécharger mon KBIS
          </a>
        </div>

      </div>
    </div>

    <div class="modal" v-if="submissionWithAttestationDepotCapital">
      <div>
        <h2 v-if="submissionWithAttestationDepotCapital.data.type === 'sci'">Êtes-vous sûr ?</h2>
        <h2 v-else>Êtes-vous sûr d’avoir l’attestation de votre banque ?</h2>

        <div>
          <p>Après avoir validé, nous allons bloquer votre dossier et le valider auprès du greffe.</p>
        </div>

        <div class="modal-footer">
          <button type="button" @click="submissionWithAttestationDepotCapital = null">Non</button>
          <button type="button" @click="attestationDepotCapital(submissionWithAttestationDepotCapital)">Oui</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      submissionWithAttestationDepotCapital: null,
    }
  },
  methods: {
    linkToSubmissionForEdit(submission) {
      ///creation-entreprise/sasu?
      if (submission.data.type === 'sasu') {
        return `/creation-entreprise/sasu?edit=1&uuid=${submission.uuid}#1`
      }

      return '#'
    },
    attestationDepotCapital(submission) {
      //submission.depotCapital = true
      this.$axios.put(`/api/submissions/${submission.id}`, {
        data: {
          depotCapital: true,
          status: 'A immatriculer'
        }
      }).then(response => {
        console.log(response.data)
        this.submissionWithAttestationDepotCapital = null
      })
    }
  },
  computed: {
    submissions() {
      return this.$auth.user.submissions
    },
  }
}
</script>

<style lang="scss" scoped>
section {
  max-width: 1024px;
  margin: auto;
  padding-top: 80px;

  h1 {
    color: #000000;
    font-family: "Yeseva One";
    font-size: 54px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: normal;
    line-height: 60px;
    max-width: 890px;
    margin: auto;
    text-align: center;
    margin-bottom: 53px;
  }

  .submissions {
    padding-bottom: 80px;
    .submission {
      background: #E4F0FC;
      border: 1px solid #286FEB;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      border-radius: 10px;
      margin-bottom: 30px;
      padding: 10px 20px;

      .header {
        display: flex;
        justify-content: space-between;

        .date {
          font-size: 14px;
        }
      }

      .content {
        text-align: center;
        align-items: center;
        padding-top: 30px;
        margin: auto;

        a {
          display: block;
          max-width: 340px;
          margin: auto;
          margin-bottom: 10px;
        }

        .information {
          margin-bottom: 30px;
        }
      }
    }
  }

  .modal {
    position: fixed;
    background-color: rgba(0,0,0,0.5);
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: grid;
    place-items: center;

    > div {
      background-color: #FFF;
      border-radius: 10px;
      padding: 10px 20px;
      max-width: 600px;

      h2 {
        text-align: center;
      }

      .modal-footer {
        margin-top: 40px;
        border-top: 1px solid #E4F0FC;
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
      }
    }
  }
}
</style>
