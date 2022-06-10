<template>
  <section id="form">
    <h2>Dossier juridique</h2>
    <p>Finaliser votre dossier en nous transmettant les dernières informations afin que nous puissions finaliser votre démarche.</p>

    <div v-if="submission.data">
      <div class="box">
        <h3>Informations générales et fiscales</h3>
        <div>
          <label>Nom de la banque où sera déposé le capital social</label>
          <input type="text" v-model="submission.data.banque">
        </div>

        <div>
          <label>Quel sera votre régime d’imposition ?</label>
          <client-only>
            <v-select :options="regimeImpotChoices" v-model="submission.data.regimeImpot"></v-select>
          </client-only>
          <div class="help">
            Le plus souvant, les bénéfices de votre société sont imposables à l’impôt sur les sociétés.
          </div>
        </div>

        <div>
          <label>Quel sera votre régime de TVA ?</label>
          <client-only>
            <v-select :options="regimeTvaChoices" v-model="submission.data.regimeTva"></v-select>
          </client-only>
          <div class="help">
            90% de nos clients souhaitent être au régime simplifié avec deux acomptes par an et une régularisation
          </div>
        </div>
      </div>

      <div class="box">
        <h3>Informations sur la filliation du dirigeant</h3>

        <div>
          <label>Nom et prénom de naissance du père</label>
          <input type="text" v-model="submission.data.nomPerePresident">
        </div>

        <div>
          <label>Nom et prénom de naissance de la mère</label>
          <input type="text" v-model="submission.data.nomMerePresident">
        </div>
      </div>

      <div class="box" v-if="haveDirecteurGeneral">
        <h3>Informations sur la filliation du co-dirigeant</h3>

        <div>
          <label>Nom et prénom de naissance du père</label>
          <input type="text" v-model="submission.data.nomPereDirecteurGeneral">
        </div>

        <div>
          <label>Nom et prénom de naissance de la mère</label>
          <input type="text" v-model="submission.data.nomMereDirecteurGeneral">
        </div>
      </div>

      <div class="box">
        <h3>Demande ACCRE pour le dirigeant</h3>

        <div>
          <div class="select">
            <div :class="{active: (submission.data.demandeAccrePresident === 'oui')}" @click="accrePresident('oui')">Oui</div>
            <div :class="{active: (submission.data.demandeAccrePresident === 'non')}" @click="accrePresident('non')">Non</div>
          </div>
        </div>
      </div>

      <div class="box" v-if="submission.data.demandeAccrePresident === 'oui'">
        <h3>Information sur le Président</h3>
        <div>
          <label>Numéro de sécurité social du président</label>
          <input type="text" v-model="submission.data.presidentSecu" />
        </div>

        <div>
          <label>Quel est votre niveau de formation</label>
          <input type="text" v-model="submission.data.presidentNiveauFormation" />
        </div>

        <div>
          <label>Quel est votre dernier emploi excercé ?</label>
          <input type="text" v-model="submission.data.presidentDernierEmploi" />
        </div>

        <div>
          <label>Quel est le motif d'inscription à pôle emploi ?</label>
          <input type="text" v-model="submission.data.presidentMotifInscriptionPoleEmploi" />
        </div>

        <div>
          <label>Quel est la date d'inscription à pôle emploi ?</label>
          <input type="date" v-model="submission.data.presidentDateInscriptionPoleEmploi" />
        </div>
      </div>

      <div class="box">
        <h3>Demande ACCRE pour le co-dirigeant</h3>

        <div>
          <div class="select">
            <div :class="{active: (submission.data.demandeAccreDirecteurGeneral === 'oui')}" @click="submission.data.demandeAccreDirecteurGeneral = 'oui'">Oui</div>
            <div :class="{active: (submission.data.demandeAccreDirecteurGeneral === 'non')}" @click="submission.data.demandeAccreDirecteurGeneral = 'non'">Non</div>
          </div>
        </div>
      </div>

      <div class="box" v-if="submission.data.demandeAccreDirecteurGeneral === 'oui'">
        <h3>Information sur le co-dirigeant</h3>
        <div>
          <label>Numéro de sécurité social du co-dirigeant</label>
          <input type="text" v-model="submission.data.directeurGeneralSecu" />
        </div>

        <div>
          <label>Quel est votre niveau de formation</label>
          <input type="text" v-model="submission.data.directeurGeneralNiveauFormation" />
        </div>

        <div>
          <label>Quel est votre dernier emploi excercé ?</label>
          <input type="text" v-model="submission.data.directeurGeneralDernierEmploi" />
        </div>

        <div>
          <label>Quel est le motif d'inscription à pôle emploi ?</label>
          <input type="text" v-model="submission.data.directeurGeneralMotifInscriptionPoleEmploi" />
        </div>

        <div>
          <label>Quel est la date d'inscription à pôle emploi ?</label>
          <input type="date" v-model="submission.data.directeurGeneralDateInscriptionPoleEmploi" />
        </div>
      </div>

      <div class="box">
        <h3>Documents à fournir</h3>
        <div>
          <label>Justificatif d'identité du dirigeant</label>
          <upload
            :additional-data="{
              uuid: submission.uuid,
              document: 'justificatifIdentitePresident',
            }"
            uniq-id="file-1"
            @success="onSucess"
            :btn-label="(submission.data.justificatifIdentitePresident) ? submission.data.justificatifIdentitePresident.label : 'Choisir un fichier'"
          />
          <div class="help">
            Passeport ou carte d'identité recto-verso
          </div>
        </div>
        <div>
          <label>Justificatif d'identité du co-dirigeant</label>
          <upload
            :additional-data="{
              uuid: submission.uuid,
              document: 'justificatifIdentiteDirecteurGeneral',
            }"
            uniq-id="file-2"
            @success="onSucess"
            :btn-label="(submission.data.justificatifIdentiteDirecteurGeneral) ? submission.data.justificatifIdentiteDirecteurGeneral.label : 'Choisir un fichier'"
          />
          <div class="help">
            Passeport ou carte d'identité recto-verso
          </div>
        </div>
        <div>
          <label>Attestation de dépôt de capital</label>
          <upload
            :additional-data="{
              uuid: submission.uuid,
              document: 'attestationDepotCapital',
            }"
            uniq-id="file-3"
            @success="onSucess"
            :btn-label="(submission.data.attestationDepotCapital) ? submission.data.attestationDepotCapital.label : 'Choisir un fichier'"
          />
        </div>
      </div>
    </div>

    <div class="actions">
      <button @click="submit">Enregistrer</button>
    </div>
  </section>
</template>

<script>
import _ from "lodash"
import People from "../../components/preview/components/people";
import upload from "../../components/upload";
export default {
  components: {People},
  data() {
    return {
      submission: {
        data: {
          regimeImpot: null,
          banque: null,
          regimeTva: null,
          nomPerePresident: null,
          nomMerePresident: null,
          nomPereDirecteurGeneral: null,
          nomMereDirecteurGeneral: null,
          demandeAccrePresident: 'non',
        },
        id: null,
        uuid: null
      },
      regimeImpotChoices: [
        'Impôt sur les sociétés: régime réel simplifié',
        'Impôt sur les sociétés: régime réel normal',
        'Impôt sur le revenu'
      ],
      regimeImpotSciChoices: [
        'Impôt sur les sociétés',
        'Impôt sur le revenu'
      ],
      regimeTvaChoices: [
        'TVA en franchise de base',
        'TVA simplifiée',
        'TVA mensuelle'
      ]
    }
  },
  methods: {
    onSucess(e) {
      this.$axios.get(`/api/submissions-uuid/${this.$route.params.uuid}`).then(response => {
        this.submission.data.attestationDepotCapital = response.data.data.attestationDepotCapital
        this.submission.data.justificatifIdentitePresident = response.data.data.justificatifIdentitePresident
        this.submission.data.justificatifIdentiteDirecteurGeneral = response.data.data.justificatifIdentiteDirecteurGeneral
      })
    },
    accrePresident(b) {
      this.submission.data.demandeAccrePresident = b
      console.log(this.submission.data.demandeAccrePresident)
    },
    submit() {
      this.$axios.put(`/api/submissions/${this.submission.id}`, {
        data: this.submission
      }).then(response => {
        console.log(response.data)
      })
    }
  },
  mounted() {
    this.$axios.get(`/api/submissions-uuid/${this.$route.params.uuid}`).then(response => {
      this.submission.data = response.data.data
      this.submission.id = response.data.id
      this.submission.uuid = response.data.uuid
    })
  },
  computed: {
    haveDirecteurGeneral() {
      return !_.isEmpty(this.submission.data.directeurGeneral)
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  max-width: 880px;
  margin: auto;
  padding-top: 30px;

  > p {
    text-align: center;
    margin-bottom: 80px;
  }

  .box {
    border: 1px solid rgba(64, 89, 134, 0.3);
    border-radius: 5px;
    padding: 0 10px 10px 10px;
    max-width: 500px;
    margin: auto;
    margin-bottom: 30px;
    h3 {
      text-align: center;
    }

    > div {
      margin-bottom: 15px;
      label {
        display: block;
        margin-bottom: 10px;
      }

      .help {
        font-size: 12px;
        margin-top: 10px;
        max-width: 400px;
      }

      .select {
        display: flex;
        justify-content: space-between;
        max-width: 260px;
        margin: auto;
        margin-bottom: 50px;

        > div {
          width: 120px;
          height: 70px;
          display: grid;
          place-items: center;
          background: #FFFFFF;
          border: 1px solid #FFF;
          box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
          border-radius: 10px;
          cursor: pointer;

          &.active {
            background: #E4F0FC;
            border: 1px solid #286FEB;
            box-sizing: border-box;
            box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>
