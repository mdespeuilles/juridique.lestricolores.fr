<template>
  <span>
    <span v-if="submission.siege === 'dirigeant'">
      {{ submission.president.adresse }} {{ submission.president.codePostal }} {{ submission.president.ville }}
    </span>

    <span v-if="submission.siege === 'co-dirigeant'">
      {{ submission.directeurGeneral.adresse }} {{ submission.directeurGeneral.codePostal }} {{ submission.directeurGeneral.ville }}
    </span>

    <span v-if="submission.siege === 'dom'">
      61 Rue de Lyon 75012 PARIS
    </span>

    <span v-if="submission.siege === 'bureau'">
      {{ submission.adresseSiege.adresse }} {{ submission.adresseSiege.codePostal }} {{ submission.adresseSiege.ville }}
    </span>
  </span>
</template>

<script>
export default {
  props: {
    submission: null
  }
}
</script>
