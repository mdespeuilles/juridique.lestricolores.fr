<template>
  <section class="item-propos">
      <div class="left">
        <img :src="item.image" width="226" height="302"/>
      </div>
      <div class="right">
        <p class="name">{{item.name}}</p>
        <p class="title">{{item.title}}</p>
        <p class="description">{{item.description}}</p>
      </div>
    <div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    item: null
  }
}
</script> 