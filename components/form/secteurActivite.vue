<template>
  <section>
    <h2>Quelle activité comptez-vous exercer ?</h2>

    <div class="picker">
      <div v-for="item in secteursActivites"
           v-if="item.promote"
           @click="select(item)"
           :class="{selected: selectedId === item.id}"
      >
        <div class="picto">
          <img :src="getImageUrl(item.picto)" />
        </div>
        {{ item.Nom }}
      </div>
      <div :class="{selected: !selectedId}" @click="select(null)">Autres...</div>
    </div>

    <div class="selector" v-if="!selectedId">
      <v-select v-model="secteurActivite" :options="secteursActivites" label="Nom" placeholder="Ex: VTC, Webdesigner..." class="blue"></v-select>
    </div>

    <div v-if="!selectedId">
      <textarea v-model="secteurActivite.Description" placeholder="Décrivez votre activité"></textarea>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {secteurActivite: secteurActivite})">Continuer</button>
    </div>

    <div class="actions">
      <a href="#" @click.prevent="$emit('next')">Renseigner plus tard</a>
    </div>
  </section>
</template>

<script>
const qs = require('qs');
export default {
  props: {
    data: null
  },
  data() {
    return {
      secteursActivites: [],
      selectedId: null,
      secteurActivite: {
        id: null,
        Nom: null,
        Description: null
      }
    }
  },
  mounted() {
    if (this.data) this.secteurActivite = this.data
    if (this.secteurActivite.promote) {
      this.selectedId = this.secteurActivite.id
    }

    const query = qs.stringify({
      populate: ['picto', 'nom', 'description']
    }, {
      encodeValuesOnly: true,
    });

    this.$axios.get(`/api/secteur-activites?${query}`).then(response => {
      //this.secteursActivites = response.data.data
      for (const item of response.data.data) {
        this.secteursActivites.push({
          id: item.id,
          Description: item.attributes.Description,
          promote: item.attributes.promote,
          Nom: item.attributes.Nom,
          picto: item.attributes.picto
        })
      }
    })
  },
  watch: {
    secteurActivite() {
      if (!this.secteurActivite || !this.secteurActivite === {}) {
        this.secteurActivite = {
          id: null,
          Nom: null,
          Description: null
        }
      }
    },
    data() {
      if (this.data) this.secteurActivite = this.data
      if (this.secteurActivite.promote) {
        this.selectedId = this.secteurActivite.id
      }
    }
  },
  methods: {
    select(item) {
      if (item) {
        this.selectedId = item.id
        this.secteurActivite = {
          id: item.id,
          Nom: item.Nom,
          Description: item.Description,
          promote: item.promote
        }
      }
      else {
        this.selectedId = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section {

  @include desk-768 {
    max-width: 95%;
    margin: auto;
  }

  div.picker {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 20px;
    max-width: 779px;
    margin: auto;
    margin-bottom: 35px;

    @include desk-768 {
      grid-template-columns: 1fr 1fr;
      max-width: 550px;
    }

    @include phone-600 {
      grid-template-columns: 1fr;
      max-width: 247px;
    }

    > div {
      height: 70px;
      width: 247px;
      background: #FFFFFF;
      border: 1px solid #FFF;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      border-radius: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 12px;
      cursor: pointer;

      &.selected {
        background: #E4F0FC;
        border: 1px solid #f44336;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      }

      .picto {
        width: 44px;
        height: 44px;
        background-color: #e4f0fc;
        border-radius: 50%;
        display: grid;
        place-items: center;
        margin-right: 15px;
      }
    }
  }

  div.selector {
    display: flex;
    justify-content: center;
    margin-bottom: 36px;

    .v-select {
      .vs__dropdown-toggle {
        border: 1px solid #f44336;
      }
    }
  }

  textarea {
    margin: auto;
    margin-bottom: 66px;
  }
}
</style>
