import Vue from 'vue'

Vue.mixin({
  methods: {
    getImageUrl (imageObject, width, height) {
      if (!width && !height) {
        return `https://dk5783mpaz028.cloudfront.net/${imageObject.data.attributes?.hash}${imageObject.data.attributes?.ext}`
      }
      return `https://dk5783mpaz028.cloudfront.net/${width}x${height}/${imageObject.data.attributes?.hash}${imageObject.data.attributes?.ext}`
    },
    getImageUrlMaxSize (imageObject, width, height) {
      return `https://dk5783mpaz028.cloudfront.net/fit-in/${width}x${height}/${imageObject.data.attributes?.hash}${imageObject.data.attributes?.ext}`
    }
  }
})
