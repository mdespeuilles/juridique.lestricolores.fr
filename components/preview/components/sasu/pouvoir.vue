<template>
  <div>
    <h1>POUVOIR</h1>
    <br /><br /><br /><br />

    <p>
      Je soussigné <people :people="submission.actionnaireUnique" />
    </p>

    <p>
      Agissant en qualité de : Président de la SASU {{ submission.raisonSociale }}
    </p>

    <p>
      Domicilié au <siege :submission="submission"></siege>
    </p>

    <p>
      Donne pouvoir à
    </p>

    <p>
      Les tricolores, 15 Rue des Halles, 75001 Paris
    </p>

    <p>
      de pour moi et en mon nom, déposer au Greffe du Tribunal de Commerce et partout où sera besoin, ma demande d'inscription ou de radiation au Registre du Commerce, ou au Répertoire des Métiers.
    </p>

    <p>
      Je lui donne également pouvoir de déposer des déclarations modificatives rectifiant, complétant ou annulant des mentions qui y seront portées, ainsi que de signer toute formules et registres, produire toutes justifications, faire toutes affirmations et réserves, toutes déclarations, acquitter toutes déclarations, acquitter tous droits et taxes, subsister et généralement faire tout ce qui sera nécessaire à l’exécution des présentes.
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
