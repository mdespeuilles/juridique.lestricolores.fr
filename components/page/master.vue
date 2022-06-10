<template>
  <div>
    <div v-for="component in components">
      <three-steps
        v-if="component.__component === 'content.steps'"
        :component="component"
      />

      <products
        v-if="component.__component === 'content.products'"
        :component="component"
      />

      <faq
        v-if="component.__component === 'content.faqs'"
        :component="component"
      />

      <ytvideo
        v-if="component.__component === 'content.video'"
        :component="component"
      />
    </div>
  </div>
</template>

<script>
import ThreeSteps from "./three-steps";
import Products from "./products";
import Faq from "./faq";
import Ytvideo from "./ytvideo";
export default {
  props: {
    components: null
  },
  components: {Ytvideo, Faq, Products, ThreeSteps}
}
</script>
