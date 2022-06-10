<template>
  <div>
    <h1>ATTESTATION DE MISE A DISPOSITION</h1>
    <br /><br /><br /><br />

    <p>
      JE SOUSSIGNE : {{ submission.president.nom }} {{ submission.president.prenom }}
    </p>

    <p>
      DOMICILIÉ AU : {{ submission.president.adresse }} {{ submission.president.codePostal }} {{ submission.president.ville }}
    </p>

    <p>
      CERTIFIE AUTORISER LA SOCIETE EN FORMATION : {{ submission.raisonSociale }}
    </p>

    <p>
      AFIN QUE CELLE-CI Y ETABLISSE SON SIEGE SOCIAL ET Y EXERCE L’ACTIVITE DE SON ENTREPRISE A COMPTER DU
      {{ $dayjs().format('DD/MM/YYYY') }}
    </p>

    <br /><br /><br /><br />
    <div style="display: flex; justify-content: space-between">
      <div></div>
      <div>
        <fait-le :submission="submission"></fait-le>
      </div>
    </div>

    <div style="page-break-before: always;"></div>
  </div>
</template>

<script>
import FaitLe from "../faitLe";
import People from "../people";
import Siege from "../siege";
export default {
  components: {Siege, People, FaitLe},
  props: {
    submission: null
  }
}
</script>
