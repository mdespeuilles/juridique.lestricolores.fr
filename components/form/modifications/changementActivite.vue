<template>
  <section>
    <h2>Changement d'activité</h2>
    <p>Souaitez-vous changer l'activité de votre entreprise ?</p>

    <div class="select">
      <div :class="{active: wantChangementActivite}" @click="wantChangementActivite = true">Oui</div>
      <div :class="{active: !wantChangementActivite}" @click="wantChangementActivite = false">Non</div>
    </div>

    <div class="form" v-if="wantChangementActivite === true">
      <div>
        <label class="center">Souhaitez-vous ajouter ou changer d'activité ? :</label>
        <div class="select big">
          <div :class="{active: typeChangement === 'add'}" @click="typeChangement = 'add'">Ajouter une activité</div>
          <div :class="{active: typeChangement === 'edit'}" @click="typeChangement = 'edit'">Changement d'activité</div>
        </div>
      </div>

      <div class="selector">
        <v-select v-model="secteurActivite" :options="secteursActivites" label="Nom" :placeholder="placeHolder" class="blue"></v-select>
      </div>

      <div class="row">
        <label>Quel est l’objet social de la société ?</label>
        <textarea v-model="secteurActivite.Description"></textarea>
      </div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {
        secteurActivite: secteurActivite,
        wantChangementActivite: wantChangementActivite,
        typeChangement: typeChangement
      })">Continuer</button>
    </div>
  </section>
</template>

<script>
import qs from "qs";

export default {
  props: {
    data: null
  },
  data() {
    return {
      wantChangementActivite: false,
      typeChangement: 'add',
      secteursActivites: [],
      secteurActivite: {
        Nom: null,
        Description: null
      },
      placeHolder: "Quel sera l'activité à ajouter ?",
      objetSocial: null
    }
  },
  mounted() {
    if (this.data) {
      if (this.data.typeChangement) this.typeChangement = this.data.typeChangement
      if (this.data.secteurActivite) this.secteurActivite = this.data.secteurActivite
      if (this.data.wantChangementActivite) this.wantChangementActivite = this.data.wantChangementActivite
    }

    const query = qs.stringify({
      populate: ['nom', 'description']
    }, {
      encodeValuesOnly: true,
    });

    this.$axios.get(`/api/secteur-activites?${query}`).then(response => {
      for (const item of response.data.data) {
        this.secteursActivites.push({
          id: item.id,
          Description: item.attributes.Description,
          Nom: item.attributes.Nom,
        })
      }
    })
  },
  watch: {
    typeChangement() {
      if (this.typeChangement === 'add') {
        this.placeHolder = "Quel sera l'activité à ajouter ?"
      }
      else {
        this.placeHolder = "Quel sera la nouvelle activité de la société ?"
      }
    },
    data() {
      if (this.data) {
        if (this.data.typeChangement) this.typeChangement = this.data.typeChangement
        if (this.data.secteurActivite) this.secteurActivite = this.data.secteurActivite
        if (this.data.wantChangementActivite) this.wantChangementActivite = this.data.wantChangementActivite
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  h2 {
    margin-bottom: 0;
  }
  > p {
    text-align: center;
    margin-bottom: 50px;
  }
  .select {
    display: flex;
    justify-content: space-between;
    max-width: 260px;
    margin: auto;
    margin-bottom: 50px;

    &.big {
      max-width: 540px;
      > div {
        width: 240px;
      }
    }

    > div {
      width: 120px;
      height: 70px;
      display: grid;
      place-items: center;
      background: #FFFFFF;
      border: 1px solid #FFF;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      border-radius: 10px;
      cursor: pointer;

      &.active {
        background: #E4F0FC;
        border: 1px solid #f44336;
        box-sizing: border-box;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
        border-radius: 10px;
      }
    }
  }

  .form {
    max-width: 540px;
    margin: auto;
    margin-bottom: 30px;

    label {
      display: block;
    }

    .row {
      margin: auto;
      max-width: 400px;
      label {
        margin-bottom: 15px;
      }
    }

    textarea {
      //max-width: 100% !important;
    }
  }

  label.center {
    text-align: center;
    margin-bottom: 20px;
    display: block;
  }

  div.selector {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;

    .v-select {
      .vs__dropdown-toggle {
        border: 1px solid #f44336;
      }
    }
  }
}
</style>
