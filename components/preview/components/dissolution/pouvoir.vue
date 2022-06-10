<template>
  <div>
    <h1>POUVOIR</h1>
    <br /><br /><br /><br />

    <p>
      Je soussigné {{ submission.infoEntreprise.representants[0].nom_complet }}
    </p>

    <p>
      Agissant en qualité de : Gérant de la société {{ submission.infoEntreprise.denomination }}
    </p>

    <p>
      Domicilié au {{ submission.infoEntreprise.siege.adresse_ligne_1 }} {{ submission.infoEntreprise.siege.code_postal }} {{ submission.infoEntreprise.siege.ville }}
    </p>

    <p>
      Donne pouvoir à
    </p>

    <p>
      LEGALZEN, 20 rue Royal, 75008 paris
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
        <div>
          Fait à {{ submission.infoEntreprise.siege.ville }}
          <br />
          <span>Le {{ $dayjs().format("DD MMMM YYYY") }}</span>
        </div>
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
