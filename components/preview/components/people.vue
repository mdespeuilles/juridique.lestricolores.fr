<template>
  <span v-if="people">
    <em v-if="people.civilite !== 'Société' && !short">
      <span v-if="people.civilite === 'M'">Monsieur</span>
      <span v-if="people.civilite === 'Mme'">Madame</span>
      {{people.nom}} {{people.prenom}} né<span v-if="people.civilite === 'Mme'">e</span> le {{ $dayjs(people.dateDeNaissance).format('D MMMM YYYY') }}
      à {{ people.villeNaissance }} de nationalité {{ people.nationnalite }},<br /> demeurant au {{ people.adresse }}
      {{ people.codePostal }} {{ people.ville }}
    </em>

    <em v-if="people.civilite !== 'Société' && short">
      <span v-if="people.civilite === 'M'">Monsieur</span>
      <span v-if="people.civilite === 'Mme'">Madame</span>
      {{people.nom}} {{people.prenom}}
    </em>

    <em v-if="people.civilite === 'Société' && !short">
      La société {{ people.raisonSociale }} {{ people.formeJuridique }} ayant son siège social
      {{ people.adresse }} {{ people.codePostal }} {{ people.ville }}
      Immatriculée au registre du commerce et des sociétés de {{ people.rcs }} sous le numéro {{ people.siren }}
      Représentée aux présentées par {{people.nom}} {{people.prenom}} dûment habilité à cet effet
    </em>

    <em v-if="people.civilite === 'Société' && short">
      La société {{ people.raisonSociale }}
    </em>
  </span>
</template>

<script>
export default {
  props: {
    people: null,
    short: {
      type: Boolean,
      default: false
    }
  }
}
</script>
