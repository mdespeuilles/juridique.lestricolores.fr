<template>
  <div>
    <div style="text-align: center">
      <div>
        <strong><i>« {{ submission.raisonSociale }} »</i></strong><br />
        <strong>SCI</strong><br />
        <strong>au capital de {{ submission|capital|currency }}</strong>
        <div v-if="submission">
          <strong>Siège social : <siege :submission="submission"></siege></strong>
        </div>
        <br />
        <p  style="text-align: center">
          RCS en cours
        </p>

        <p style="text-align: center">
          <strong>Procès-verbal de l’assemblée Générale Ordinaire du {{ $dayjs().format('DD/MM/YYYY') }}</strong>
        </p>
      </div>
    </div>

    <p>
      Le {{ $dayjs().format('DD/MM/YYYY') }} à seize heures, est présent au siège de la société, le soussigné :
    </p>

    <p v-for="actionnaire in submission.actionnaires" v-if="actionnaire.capital">
      <people :people="actionnaire" />
    </p>

    <p>
      <u>Représentant la totalité des parts, afin de participer à :</u>
    </p>

    <h1>L'ASSEMBLEE GENERALE ORDINAIRE DE NOMINATION DU GÉRANT</h1>

    <h2>Première résolution :</h2>

    <p>Est nommé aux fonctions de gérant telles que définies par la loi et les statuts de la société, à compter de ce jour et pour une durée indéterminée :</p>

    <p>
      <people :people="submission.president" />
    </p>

    <p>
      <strong>Résolution adoptée à l’unanimité</strong>
    </p>

    <h2>Deuxième  résolution :</h2>

    <p>La rémunération du gérant sera fixée ultérieurement.</p>
    <p>
      <strong>Résolution adoptée à l’unanimité</strong>
    </p>


    <div v-if="submission.directeurGeneral">
      <div v-if="submission.directeurGeneral.nom">
        <h2>Troisième résolution :</h2>
        <p>Est nommé aux fonctions de co-gérant telles que définies par la loi et les statuts de la société, à compter de ce jour et pour une durée indéterminée :</p>
        <p>
          <people :people="submission.directeurGeneral" />
        </p>

        <p>
          <strong>Résolution adoptée à l’unanimité</strong>
        </p>

        <h2>Quatrième  résolution :</h2>

        <p>La rémunération du co-gérant sera fixée ultérieurement.</p>
        <p>
          <strong>Résolution adoptée à l’unanimité</strong>
        </p>
      </div>
    </div>

    <p>
      Plus rien n'étant à l'ordre du jour, la séance est levée à seize heures quinze minutes.
    </p>

    <p>
      De tout ce que dessus, il est dressé le présent procès-verbal en 4 exemplaires originaux, qui seront signés par tous les intervenants susmentionnés.
    </p>

    <p>
      <fait-le :submission="submission"></fait-le>
    </p>

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
