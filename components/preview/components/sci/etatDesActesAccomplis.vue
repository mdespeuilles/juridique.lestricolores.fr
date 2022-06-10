<template>
  <div>
    <h1>ANNEXE</h1>
    <br /><br /><br /><br />
    <h1>
      ÉTAT DES ACTES ACCOMPLIS<br />
      POUR LA SOCIÉTÉ EN COURS DE FORMATION<br />
      AVANT LA SIGNATURE DES STATUTS<br />
    </h1>
    <br /><br /><br />
    <p>
      - Dépôt du capital social sur un compte ouvert au nom de la société en formation ;
    </p>
    <p>
      - Sollicitation de tous moyens de financement ;
    </p>
    <p>
      - Paiement des frais de constitution auprès de la société Les tricolores
    </p>
    <br /><br />
    <p>
      Conformément aux dispositions de l'article R. 210-6 du Code de commerce, cet état sera annexé aux statuts, dont la signature emportera reprise des engagements par la Société dès que celle-ci aura été immatriculée au Registre du commerce et des sociétés.
    </p>
    <br /><br /><br /><br />
    <div style="display: flex; justify-content: space-between">
      <div></div>
      <div>
        <fait-le :submission="submission"></fait-le>
        <span>En 4 exemplaires originaux</span>
      </div>
    </div>

    <div style="page-break-before: always;"></div>
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
