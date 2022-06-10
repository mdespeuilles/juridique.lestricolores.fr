import Vue from 'vue'
import {value} from "lodash/seq";
const { NumberToLetter } = require("convertir-nombre-lettre");

Vue.filter('currency', value => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)
})

Vue.filter('numberToLetter', value => {
  if (!value) value = 0
  return NumberToLetter(value)
})

Vue.filter('capital', submission => {
  if (submission.type === 'sasu' || submission.type === 'eurl') {
    const capital = parseFloat(submission.capital)

    let apports = 0

    for (const apport of submission.actionnaireUnique.apports) {
      if (!isNaN(parseFloat(apport.valorisation))) {
        apports = apports + parseFloat(apport.valorisation)
      }
    }

    return capital+apports
  }

  if (submission.type === 'sarl' || submission.type === 'sas' || submission.type === 'sci') {

    let capitaux = 0

    for (const actionnaire of submission.actionnaires) {
      if (actionnaire.capital) {
        if (!isNaN(parseFloat(actionnaire.capital))) {
          capitaux = capitaux + parseFloat(actionnaire.capital)
        }
      }
    }

    let apports = 0

    console.log(submission.actionnaires)

    for (const actionnaire of submission.actionnaires) {
      if (actionnaire.apports) {
        for (const apport of actionnaire.apports) {
          if (!isNaN(parseFloat(apport.valorisation))) {
            apports = apports + parseFloat(apport.valorisation)
          }
        }
      }
    }

    return capitaux+apports
  }
})

Vue.filter('capitalNumeraire', submission => {
  if (submission.type === 'sarl' || submission.type === 'sas' || submission.type === 'sci') {

    let capitaux = 0

    for (const actionnaire of submission.actionnaires) {
      if (actionnaire.capital) {
        capitaux = capitaux + parseFloat(actionnaire.capital)
      }
      console.log(capitaux)
    }

    capitaux = capitaux * submission.verseCreation.value

    return capitaux
  }
})

Vue.filter('capitalVerse', submission => {
  if (submission.type === 'sasu' || submission.type === 'eurl') {
    const capital = parseFloat(submission.capital * submission.verseCreation.value)

    let apports = 0

    for (const apport of submission.actionnaireUnique.apports) {
      if (!isNaN(parseFloat(apport.valorisation))) {
        apports = apports + parseFloat(apport.valorisation)
      }
    }

    return capital+apports
  }
})

Vue.filter('capitalNumeraireVerse', submission => {
  if (submission.type === 'sasu' || submission.type === 'eurl') {
    const capital = parseFloat(submission.capital * submission.verseCreation.value)

    return capital
  }
})
