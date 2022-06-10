<template>
  <div>
    <h1>DECLARATION DE NON CONDAMNATION</h1>
    <p style="text-align: center">
      en application de l’article 17 de l’arrêté du 9 février 1988
    </p>

    <p>
      Je soussigné <people :people="submission.president" />
    </p>

    <p>
      fils/fille de : {{ submission.nomPerePresident }}<br />
      et de : {{ submission.nomMerePresident }}<br />
    </p>

    <p>
      déclare sur l’honneur, conformément à l'article 17 de l'arrêté du 9 février 1988 pris à la suite du décret n° 84-406 du 30 mai 1984, relatif au Registre du Commerce et des Sociétés, n'avoir fait l'objet d'aucune condamnation pénale ni de sanction civile ou administrative de nature à m'interdire - soit d'exercer une activité commerciale et professionnelle - soit de gérer, d'administrer ou de diriger une personne morale.
    </p>

    <div style="display: flex; justify-content: center">
      <fait-le :submission="submission"></fait-le>
    </div>

    <br /><br /><br /><br />

    <p>
      <strong><u>Rappel :</u> Article L. 123-5 du code de commerce</strong>
    </p>
    <p>
      (Ordonnance n° 2000-916 du 19 septembre 2000 art. 3 Journal Officiel du 22 septembre 2000 en vigueur le 1er janvier 2002)
    </p>

    <p>
      <strong>
        Le fait de donner, de mauvaise foi, des indications inexactes ou incomplètes en vue d’une immatriculation, d’une radiation ou d’une mention complémentaire ou rectificative au registre du commerce et des sociétés est puni d’une amende de 4.500 € et d’un emprisonnement de six mois.
      </strong>
    </p>

    <p>
      Les dispositions des deuxième et troisième alinéas de l’article L. 123-4 sont applicables dans les cas prévus au présent article.
    </p>


    <div style="text-align: center">
      <div>
        <strong><i>« {{ submission.raisonSociale }} »</i></strong><br />
        <strong>SAS</strong><br />
        <strong>au capital de {{ submission|capital|currency }}</strong>
        <div v-if="submission">
          <strong>Siège social : <br /><siege :submission="submission"></siege></strong>
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
