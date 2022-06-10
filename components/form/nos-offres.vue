<template>
  <section>
    <h2>Nos offres</h2>
    <p></p>

    <div class="grid">
      <div class="row">
        <div></div>
        <div class="essentiel head">
          <strong>Essentiel</strong>
          <div>49 € <sup>HT</sup></div>
        </div>
        <div class="strandard head">
          <strong>Strandard</strong>
          <div>79 € <sup>HT</sup></div>
        </div>
        <div class="premium head">
          <strong>Premium</strong>
          <div>99 € <sup>HT</sup></div>
        </div>
      </div>

      <div class="row underline">
        <div></div>
        <div class="check" :class="{active: offre === 'essentiel'}" @click="offre = 'essentiel'"><span></span></div>
        <div class="check" :class="{active: offre === 'standard'}" @click="offre = 'standard'"><span></span></div>
        <div class="check" :class="{active: offre === 'premium'}" @click="offre = 'premium'"><span></span></div>
      </div>

      <div class="row title">
        <div>Dossier juridique</div>
      </div>

      <div class="row content underline">
        <div>
          <span>statuts</span>
          <p v-if="openline === 1">Lorem ipsum</p>
        </div>
        <div class="include">
          <img src="/img/include.svg">
        </div>
        <div class="include">
          <img src="/img/include.svg">
        </div>
        <div class="include">
          <img src="/img/include.svg">
        </div>
      </div>

      <div class="row content underline">
        <div>
          <span>Cerfa M0</span>
          <p v-if="openline === 2">Lorem ipsum</p>
        </div>
        <div class="include">
          <img src="/img/include.svg">
        </div>
        <div class="include">
          <img src="/img/include.svg">
        </div>
        <div class="include">
          <img src="/img/include.svg">
        </div>
      </div>

      <div class="row content underline">
        <div>
          <span>Dossier complet</span>
          <p v-if="openline === 3">Lorem ipsum</p>
        </div>
        <div class="include">
          <img src="/img/include.svg">
        </div>
        <div class="include">
          <img src="/img/include.svg">
        </div>
        <div class="include">
          <img src="/img/include.svg">
        </div>
      </div>

      <div class="row title">
        <div>Formalité administratives</div>
      </div>

      <div class="row content underline">
        <div>
          <span>Validation de votre dossier par un formaliste</span>
          <p v-if="openline === 4">Lorem ipsum</p>
        </div>
        <div class="include">
          -
        </div>
        <div class="include">
          <img src="/img/include.svg">
        </div>
        <div class="include">
          <img src="/img/include.svg">
        </div>
      </div>

      <div class="row content underline">
        <div>
          <span>Transmission du dossier au Greffe</span>
          <p v-if="openline === 5">Lorem ipsum</p>
        </div>
        <div class="include">
          -
        </div>
        <div class="include">
          <img src="/img/include.svg">
        </div>
        <div class="include">
          <img src="/img/include.svg">
        </div>
      </div>

      <div class="row content underline">
        <div>
          <span>Inscription au registre des bénéficiares effectifs</span>
          <p v-if="openline === 6">Lorem ipsum</p>
        </div>
        <div class="include">
          -
        </div>
        <div class="include">
          <img src="/img/include.svg">
        </div>
        <div class="include">
          <img src="/img/include.svg">
        </div>
      </div>

      <div class="row title required">
        <div>Frais administratifs</div>
      </div>

      <div class="row content underline required">
        <div>
          <span>Publication d'une annonce légale</span>
          <p v-if="openline === 7">Lorem ipsum</p>
        </div>
        <div class="include">
          150-200 €
        </div>
        <div class="include">
          150-200 €
        </div>
        <div class="include">
          150-200 €
        </div>
      </div>

      <div class="row content underline required">
        <div>
          <span>Frais d'immatriculation au Greffe</span>
          <p v-if="openline === 8">Lorem ipsum</p>
        </div>
        <div class="include">
          -
        </div>
        <div class="include">
          61,94 €
        </div>
        <div class="include">
          61,94 €
        </div>
      </div>

      <div class="row">
        <div></div>
        <div class="check" :class="{active: offre === 'essentiel'}" @click="offre = 'essentiel'"><span></span></div>
        <div class="check" :class="{active: offre === 'standard'}" @click="offre = 'standard'"><span></span></div>
        <div class="check" :class="{active: offre === 'premium'}" @click="offre = 'premium'"><span></span></div>
      </div>

      <div class="row center">
        <div></div>
        <div>L'offre Essentiel</div>
        <div>L'offre Standard</div>
        <div>L'offre Premium</div>
      </div>

    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {offre: offre})">Continuer</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    data: null
  },
  data() {
    return {
      offre: 'standard',
      openline: null
    }
  },
  mounted() {
    if (this.data) this.offre = this.data
  },
  watch: {
    data() {
      if (this.data) {
        this.offre = this.data
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
  h2 {
    margin-bottom: 0;
  }
  > p {
    text-align: center;
    margin-bottom: 78px;
  }
  .grid {
    margin-bottom: 50px;
    @include phone-600 {
      zoom: .8;
    }
    .row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      //grid-gap: 5px;
      padding: 0 25px;

      &.underline {
        border-bottom: 1px solid rgba(64, 89, 134, 0.3);
      }

      &.title {
        font-weight: bold;
        padding-top: 20px;
      }

      &.required {
        background: #F2F7FC;

        &.title {
          position: relative;
          &:after {
            position: absolute;
            content: "OBLIGATOIRE POUR L'IMMATRICULATION";
            font-size: 10px;
            background: #E4F0FC;
            padding: 6px 10px;
            top: 15px;
            left: 200px;
          }
        }
      }

      &.center {
        text-align: center;
      }

      &.content {
        > div {
          min-height: 55px;
          display: flex;
          align-items: center;
          font-size: 14px;

          &.include {
            display: grid;
            place-items: center;
          }
        }
      }

      > div {
        &.check {
          display: grid;
          place-items: center;
          padding: 32px 0;
          cursor: pointer;
          &.active {
            position: relative;
            &:after {
              position: absolute;
              content: '';
              width: 18px;
              height: 18px;
              background: #f44336;
              border-radius: 50%;
            }
          }
          span {
            width: 30px;
            height: 30px;
            background: #FFFFFF;
            border: 1px solid #f44336;
            box-sizing: border-box;
            box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.15);
            display: block;
            border-radius: 50%;
          }
       }
        &.head {
          text-align: center;

          @include phone-600 {
            padding-top: 70px;
          }

          strong {
            @include phone-600 {
              display: none;
            }
          }

          &.essentiel {
            background: url(/img/essential.svg) no-repeat left center;
          }

          &.strandard {
            background: url(/img/standard.svg) no-repeat left center;
          }

          &.premium {
            background: url(/img/premium.svg) no-repeat left center;
          }
        }
      }
    }
  }
}
</style>
