<template>
  <section>
    <ul>
      <li v-for="step in steps"
          :class="{
            active: step.step === currentStep,
            done: step.step < currentStep
          }"
      >
        <span>{{ step.step }}</span>
        <a href="#">{{ step.label }}</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    steps: null,
    currentStep: null
  },
  methods: {
    gotoPage(page) {
      this.$emit('gotoPage', page)
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  @include desk-768 {
    display: none;
  }
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      &:last-child {
        a {
          background: none;
        }
      }

      &.active {
        span {
          background: #E4F0FC;
          border-color: #E4F0FC;
          color: #f44336;
        }

        a {
          background: url(/img/next-active.svg) no-repeat right center;
          color: #405986;
        }
      }

      &.done {
        span {
          border-color: #405986;
          color: #f44336;
        }

        a {
          background: url(/img/next-active.svg) no-repeat right center;
          color: #405986;
        }
      }

      span {
        border: 1px solid rgba(64, 89, 134, 0.3);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: rgba(64, 89, 134, 0.3);
        font-size: 16px;
        display: grid;
        place-items: center;
        margin-right: 20px;
      }

      a {
        font-size: 8px;
        line-height: 26px;
        text-decoration: none;
        text-transform: uppercase;
        color: rgba(64, 89, 134, 0.3);
        display: inline-block;
        background: url(/img/next.svg) no-repeat right center;
        padding-right: 18px;
      }
    }
  }
}
</style>
