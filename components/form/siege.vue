<template>
  <section>
    <h2>Où sera le siège social de votre société ?</h2>
    <p>Le siège social correspond à l'adresse administrative. Vous y recevrez vos courriers officiels.</p>

    <div class="avantage-domiciliation">
      <div class="img">
        <img src="/img/idea.svg">
      </div>

      <h3>
        Les <strong>avantages</strong> de la <strong>domiciliation</strong>
      </h3>

      <ul>
        <li>Préservation de la vie privée « votre adresse personnelle ne sera pas communiquée » ;</li>
        <li>Une adresse de Prestige en plein cœur de Paris ;</li>
        <li>La CFE « cotisation foncière des entreprise » la moins chère de France ;</li>
        <li>Numérisation du courrier au quotidien ;</li>
        <li>Une offre sans engagement.</li>
      </ul>
    </div>

    <div class="select" :class="{col4: (submission.data.directeurGeneral.label !== 'Aucun')}">
      <div :class="{selected: siege === 'dom'}" @click="siege = 'dom'">
        <span>Recommandé</span>
        <div class="picto">
          <img src="/img/dom-picto.svg">
        </div>
        <strong>Dans un centre de domiciliation à Place de la Bastille</strong>
        <p>Flexible et confidentiel à partir de 19€ / mois</p>
      </div>

      <div :class="{selected: siege === 'dirigeant'}" @click="siege = 'dirigeant'">
        <div class="picto">
          <img src="/img/people.svg">
        </div>
        <strong>Chez le {{ dirigeantLabel }}</strong>
      </div>

      <div
        v-if="submission.data.directeurGeneral.label !== 'Aucun'"
        :class="{selected: siege === 'co-dirigeant'}" @click="siege = 'co-dirigeant'">
        <div class="picto">
          <img src="/img/people.svg">
        </div>
        <strong>Chez le {{ coDirigeantLabel }}</strong>
      </div>

      <div :class="{selected: siege === 'bureau'}" @click="siege = 'bureau'">
        <div class="picto">
          <img src="/img/dom-local.svg">
        </div>
        <strong>Dans un bureau / local</strong>
      </div>
    </div>

    <div class="siege" v-if="siege === 'bureau'">
      <div class="row full">
        <div>
          <label>Adresse</label>
          <no-ssr>
            <vue-google-autocomplete
              id="address"
              placeholder=""
              v-model="adresseSiege.adresse"
              v-on:placechanged="getAddressData">
            </vue-google-autocomplete>
          </no-ssr>
        </div>
      </div>

      <div class="row">
        <div>
          <label>Code postale</label>
          <input type="text" v-model="adresseSiege.codePostal" />
        </div>

        <div>
          <label>Ville</label>
          <input type="text" v-model="adresseSiege.ville" />
        </div>
      </div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {adresseSiege: adresseSiege, siege: siege})">Continuer</button>
    </div>

    <div class="actions">
      <a href="#" @click.prevent="$emit('next')">Renseigner plus tard</a>
    </div>
  </section>
</template>

<script>
export default {
  components: {
    VueGoogleAutocomplete: () => import('vue-google-autocomplete')
  },
  props: {
    data: null,
    dirigeantLabel: null,
    coDirigeantLabel: null,
    submission: null
  },
  data() {
    return {
      adresseSiege: {
        adresse: null,
        codePostal: null,
        ville: null
      },
      siege: 'dom'
    }
  },
  mounted() {
    if (this.data.adresseSiege) this.adresseSiege = this.data.adresseSiege
    if (this.data.siege) this.siege = this.data.siege
  },
  methods: {
    getAddressData(addressData, placeResultData, id) {
      console.log(addressData)
      this.adresseSiege.codePostal = addressData.postal_code
      this.adresseSiege.ville = addressData.locality
      this.adresseSiege.adresse = placeResultData.name
    }
  },
  watch: {
    data() {
      if (this.data.adresseSiege) this.adresseSiege = this.data.adresseSiege
      if (this.data.siege) this.siege = this.data.siege
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  position: relative;

  @include desk-768 {
    max-width: 95%;
    margin: auto;
  }

  h2 {
    margin-bottom: 0;
  }
  > p {
    text-align: center;
    margin-bottom: 78px;
  }

  .avantage-domiciliation {
    width: 230px;
    height: 361px;
    background: rgba(228, 240, 252, 0.2);
    border: 1px solid #AAD4FF;
    box-sizing: border-box;
    border-radius: 10px;
    position: absolute;
    padding-top: 30px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 30px;
    left: -230px;
    top: 50px;

    @include desk-1200 {
      display: none;
    }

    .img {
      width: 47px;
      height: 47px;
      background: #E4F0FC;
      border-radius: 100px;
      display: grid;
      place-items: center;
      position: absolute;
      top: -25px;
      left: 0;
      right: 0;
      margin: auto;
    }

    h3 {
      font-size: 18px;
      line-height: 22px;
      width: 175px;
      margin: auto;
      text-align: center;
      strong {
        color: #f44336;
      }
    }

    ul {
      list-style-type: none;
      padding: 0;

      li {
        position: relative;
        font-size: 12px;
        line-height: 16px;
        padding-left: 10px;
        margin-bottom: 18px;
        &:before {
          content: " ";
          width: 4px;
          height: 4px;
          border-radius: 50%;
          display: inline-block;
          background: #f44336;
          position: absolute;
          left: 0;
          top: 6px;
        }
      }
    }
  }

  .select {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 13px;
    max-width: 810px;
    margin: auto;
    margin-bottom: 77px;

    &.col4 {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @include phone-600 {
      grid-template-columns: 1fr;
      max-width: 210px;
    }

    > div {
      height: 210px;
      width: 190px;
      background: #FFFFFF;
      border: 1px solid #FFF;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      border-radius: 10px;
      padding: 12px;
      padding-top: 26px;
      cursor: pointer;
      text-align: center;
      position: relative;

      &.selected {
        background: #E4F0FC;
        border: 1px solid #f44336;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      }

      span {
        width: 108px;
        height: 23px;
        box-shadow: 0 0 15px rgba(40, 111, 235, 0.3);
        border-radius: 20px;
        background-color: #f44336;
        display: block;
        color: #ffffff;
        font-size: 10px;
        font-weight: 400;
        line-height: 23px;
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        top: -15px;
        margin: auto
      }

      .picto {
        width: 44px;
        height: 44px;
        display: grid;
        place-items: center;
        margin: auto;
        background-color: #e4f0fc;
        border-radius: 50%;
        margin-bottom: 15px;
      }

      strong {
        color: #0b2758;
        font-size: 16px;
        font-weight: 700;
        display: block;
        line-height: 20px;
        text-align: center;
        margin-bottom: 16px;
      }

      p {
        color: #0b2758;
        margin: 0;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
    max-width: 580px;
    margin: auto;
    margin-bottom: 25px;

    &.full {
      > div {
        width: 100%;
        input {
          max-width: 100% !important;
        }
      }
    }

    > div {
      width: 280px;
    }
  }
}
</style>
