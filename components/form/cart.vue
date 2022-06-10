<template>
  <section>
    <h2>Panier</h2>
    <p></p>

    <div class="cart" v-if="cart_product">
      <div class="product" :class="{elevate: cart_product.product.mis_en_avant}">
        <div class="desc">{{ cart_product.product.label }}</div>
        <div class="amount">{{ cart_product.product.amount_ht|currency }}</div>
      </div>

      <div class="details"
           :class="{elevate: item.mis_en_avant}"
           v-for="item in cart_product.details" v-if="cart_product.details">
        <div class="desc">{{ item.label }}</div>
        <div class="amount" v-if="!item.offert">{{ item.amount_ht|currency }}</div>
        <div class="offert" v-if="item.offert">Offert</div>
      </div>

      <div class="title" v-if="cart_product.frais">Frais administratifs obligatoires</div>

      <div class="frais"
           :class="{elevate: item.mis_en_avant}"
           v-for="item in cart_product.frais" v-if="cart_product.frais">
        <div class="desc">{{ item.label }}</div>
        <div class="amount" v-if="!item.offert">{{ item.amount_ht|currency }}</div>
        <div class="offert" v-if="item.offert">Offert</div>
      </div>

      <div class="tax" v-if="!totalAmountsWithDiscount">
        <div>
          <div>Total HT</div>
          <div>{{ totalAmounts.totalHt|currency }}</div>
        </div>
        <div>
          <div>TVA</div>
          <div>{{ totalAmounts.tva|currency }}</div>
        </div>
      </div>

      <div class="tax" v-if="totalAmountsWithDiscount">
        <div>
          <div>Total HT</div>
          <div>
            <del>{{ totalAmounts.totalHt|currency }}</del>
            <strong>{{ totalAmountsWithDiscount.totalHt|currency }}</strong>
          </div>
        </div>
        <div>
          <div>TVA</div>
          <div>
            <strong>{{ totalAmountsWithDiscount.tva|currency }}</strong>
          </div>
        </div>
      </div>

      <div class="total" v-if="!totalAmountsWithDiscount">
        <div class="desc">Total</div>
        <div class="amount">{{ totalAmounts.totalTtc|currency }}</div>
      </div>

      <div class="total" v-if="totalAmountsWithDiscount">
        <div class="desc">Total</div>
        <div class="amount">
          <del>{{ totalAmounts.totalTtc|currency }}</del>
          {{ totalAmountsWithDiscount.totalTtc|currency }}
        </div>
      </div>
    </div>

    <div class="paymentChoice">
      <div class="title">Votre choix de paiement</div>
      <div class="select" v-if="!totalAmountsWithDiscount">
        <div :class="{active: account}" @click="account = true">
          <div>
            <div>Payer aujourd’hui<br /><strong>Seulement 199,00 € HT</strong></div>
            <span>Puis {{ (totalAmounts.totalHt - 199)|currency }} HT lors de la validation de votre dossier (20 jours max)</span>
          </div>
        </div>

        <div :class="{active: !account}" @click="account = false">
          <div>Payer la totalité<br />{{ totalAmounts.totalHt|currency }} HT</div>
        </div>
      </div>
    </div>

    <div class="select" v-if="totalAmountsWithDiscount">
      <div :class="{active: account}" @click="account = true">
        <div>
          <div>Payer aujourd’hui<br /><strong>Seulement 199,00 € HT</strong></div>
          <span>Puis {{ (totalAmountsWithDiscount.totalHt - 199)|currency }} HT lors de la validation de votre dossier (20 jours max)</span>
        </div>
      </div>

      <div :class="{active: !account}" @click="account = false">
        <div>Payer la totalité<br />{{ totalAmountsWithDiscount.totalHt|currency }} HT</div>
      </div>
    </div>

    <div class="discount">
      <div class="title">Code de réduction</div>
      <div class="row">
        <input type="text" placeholder="Saisissez votre code de réduction" v-model="discountCode">
        <button @click="applyCode">Ajouter</button>
      </div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {
        cartInfo: cartInfo,
        account: account,
        accountAmount: accountAmount
      })">Continuer</button>
    </div>
  </section>
</template>

<script>
import qs from "qs"
const _ = require('lodash')
export default {
  props: {
    submission: null
  },
  data() {
    return {
      cart_product: null,
      discountCode: null,
      percentOff: null,
      account: false,
      accountAmount: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.fetchCart()
    }, 1000)
  },
  methods: {
    fetchCart() {
      const query = qs.stringify({
        filters: {
          $and: [
            {
              type: {
                $eq: this.submission.type,
              },
            },
            {
              offre: {
                $eq: this.submission.data.offre,
              }
            }
          ]
        },
        populate: ['product', 'details', 'frais']
      }, {
        encodeValuesOnly: true,
      });

      this.$axios.get(`/api/cart-products?${query}`).then(response => {
        this.cart_product = response.data.data[0].attributes

        this.discountCode = this.submission.data.cartInfo.discountCode
        if (this.discountCode) {
          this.applyCode()
        }
      })
    },
    applyCode() {
      this.$axios.post('/api/order-valid-discount', {
        code: this.discountCode
      }).then(response => {
        this.percentOff = response.data.data[0].coupon.percent_off/100
      })
    }
  },
  computed: {
    cartInfo() {
      if (this.totalAmountsWithDiscount) {
        return {
          discountCode: this.discountCode,
          total: this.totalAmountsWithDiscount
        }
      }
      else {
        return {
          discountCode: null,
          total: this.totalAmounts
        }
      }
    },
    totalAmounts() {
      if (this.cart_product) {
        let totalHt = this.cart_product.product.amount_ht
        let tva = this.cart_product.product.amount_ht * 0.2

        for (const item of this.cart_product.details) {
          if (!item.offert) {
            totalHt = totalHt + item.amount_ht
            tva = tva + (item.amount_ht * 0.2)
          }
        }

        for (const item of this.cart_product.frais) {
          if (!item.offert) {
            totalHt = totalHt + item.amount_ht
            tva = tva + (item.amount_ht * 0.2)
          }
        }

        return {
          tva: _.round(tva, 2),
          totalHt: _.round(totalHt, 2),
          totalTtc: _.round(totalHt+tva, 2)
        }
      }

      return  {
        tva: 0,
        totalHt: 0,
        totalTtc: 0
      }
    },
    totalAmountsWithDiscount() {
      if (!this.percentOff) {
        return null
      }

      let totalHt = this.cart_product.product.amount_ht
      totalHt = totalHt - (totalHt * this.percentOff)
      let tva = totalHt * 0.2

      for (const item of this.cart_product.details) {
        if (!item.offert) {
          totalHt = totalHt + item.amount_ht - (item.amount_ht * this.percentOff)
          tva = tva + ((item.amount_ht - (item.amount_ht * this.percentOff)) * 0.2)
        }
      }

      for (const item of this.cart_product.frais) {
        if (!item.offert) {
          totalHt = totalHt + item.amount_ht - (item.amount_ht * this.percentOff)
          tva = tva + ((item.amount_ht - (item.amount_ht * this.percentOff)) * 0.2)
        }
      }

      return {
        tva: _.round(tva, 2),
        totalHt: _.round(totalHt, 2),
        totalTtc: _.round(totalHt+tva, 2)
      }
    }
  },
  watch: {
    account() {
      if (this.account) {
        this.accountAmount = _.round(199*1.2, 2)
      }
    },
    submission() {
      this.fetchCart()
      this.discountCode = this.submission.data.cartInfo.discountCode
      if (this.discountCode) {
        this.applyCode()
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

  .paymentChoice {
    max-width: 524px;
    margin: auto;
    margin-bottom: 30px;

    .title {
      font-weight: 800;
      font-size: 14px;
      color: #0B2758;
      margin-bottom: 15px;
    }

    .select {
      display: flex;
      justify-content: space-between;
      > div {
        width: 250px;
        height: 151px;
        background: #FFFFFF;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
        border-radius: 10px;
        text-align: center;
        display: grid;
        place-items: center;
        padding: 0 16px;
        cursor: pointer;

        &.active {
          background: #E4F0FC;
          border: 1px solid #f44336;
          box-sizing: border-box;
          box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
          border-radius: 10px;
        }

        > div {
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
          text-align: center;
          color: #0B2758;

          span {
            font-weight: 700;
            font-size: 10px;
            line-height: 14px;
            text-align: center;
            color: rgba(64, 89, 134, 0.5);
            display: block;
            margin-top: 16px;
          }

          strong {
            color: #f44336;
          }
        }
      }
    }
  }

  .discount {
    max-width: 524px;
    margin: auto;

    .title {
      font-weight: 800;
      font-size: 14px;
      color: #0B2758;
      margin-bottom: 15px;
    }

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        background: #E4F0FC;
        font-size: 14px;
        color: #f44336;
        font-weight: 700;
        height: 48px;
      }
    }
  }
  .cart {
    max-width: 524px;
    margin: auto;

    @include phone-600 {
      zoom: .9;
    }

    > div {
      height: 74px;
      background: #FFFFFF;
      border: 1px solid rgba(64, 89, 134, 0.3);
      border-radius: 10px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;

      &.title {
        background: none;
        border: none;
        font-weight: 800;
        font-size: 14px;
        line-height: 20px;
        color: #0B2758;
        height: auto;
        padding: 0;
      }

      &.total {
        background: #FFFFFF;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
        border-color: #FFF;

        .desc {
          font-weight: 800;
          font-size: 14px;
          line-height: 20px;
          color: #0B2758;
          max-width: 258px;
        }

        .amount {
          font-size: 28px;
        }
      }

      &.tax {
        background: #E4F0FC;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
        border-radius: 10px;
        border: none;
        flex-direction: column;
        height: 85px;

        > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          width: 100%;
        }
      }

      &.elevate {
        background: #FFFFFF;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
        border-color: #FFF;
        background: url(/img/small_icon.svg) no-repeat left center;
        background-position-x: 15px;
        padding-left: 49px;

        .desc {
          font-weight: 800;
          font-size: 14px;
          line-height: 20px;
          color: #0B2758;
          max-width: 258px;
        }

        .amount {
          font-size: 28px;
        }
      }

      .desc {
        font-size: 14px;
        line-height: 20px;
        color: #0B2758;
        max-width: 338px;
      }

      .offert {
        font-size: 14px;
        line-height: 20px;
        color: #f44336;
      }

      .amount {
        font-size: 14px;
        line-height: 20px;
        color: #f44336;
      }
    }
  }

  .actions {
    margin-top: 30px;
  }
}
</style>
