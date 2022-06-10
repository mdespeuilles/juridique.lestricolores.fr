<template>
  <div>
    <h1>LISTE DES SOUSCRIPTEURS</h1>
    <br />
    <br />
    <br />
    <br />
    <table cellspacing="0">
      <thead>
        <tr>
          <th>Prénom, nom, date de naissance, adresse</th>
          <th>Nombre d'actions souscrites</th>
          <th>Montant total des souscriptions</th>
          <th>Montant des versements effectués</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            {{ submission.actionnaireUnique.prenom }},
            {{ submission.actionnaireUnique.nom }},
            {{ $dayjs(submission.actionnaireUnique.dateDeNaissance).format('D MMMM YYYY') }},
            {{ submission.actionnaireUnique.adresse }} {{ submission.actionnaireUnique.codePostal }} {{ submission.actionnaireUnique.ville }}
          </td>
          <td class="center">
            {{ submission|capital }}
          </td>
          <td class="center">
            {{ submission|capital|currency }}
          </td>
          <td class="center">
            {{ submission|capitalVerse|currency }}
          </td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td>TOTAL</td>
          <td class="center">{{ submission|capital }}</td>
          <td class="center">{{ submission|capital|currency }}</td>
          <td class="center">{{ submission|capitalVerse|currency }}</td>
        </tr>
      </tfoot>
    </table>

    <br />
    <br />
    <br />
    <br />

    <p>
      Le présent état qui constate la souscription de {{ submission|capital }} actions de la
      Société {{ submission.raisonSociale }}, ainsi que le versement intégral du montant nominal
      desdites actions, soit la somme de
      {{ submission|capital|currency }} ({{ submission|capital|numberToLetter }} euros),
      est certifié sincère et véritable par {{ submission.actionnaireUnique.prenom }} {{ submission.actionnaireUnique.nom }},
      nommée Président de ladite Société.
    </p>

    <br />
    <br />
    <div style="display: flex; justify-content: space-between">
      <div></div>
      <div>
        <fait-le :submission="submission"></fait-le>
        <span>En 4 exemplaires originaux</span>
      </div>
    </div>
  </div>
</template>

<script>
import FaitLe from "../faitLe";
export default {
  components: {FaitLe},
  props: {
    submission: null
  }
}
</script>
