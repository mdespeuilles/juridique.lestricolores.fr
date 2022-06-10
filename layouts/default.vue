<template>
  <div>
    <TopHeader />
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/layout/Header";
import TopHeader from "../components/layout/TopHeader";
import Footer from "../components/layout/Footer";
export default {
  head: {
    script: [
      { hid: 'tidio', src: "https://code.tidio.co/xeqxpheoxmj3or8abfwa1uhnawz8atyq.js", defer: true },
    ],
  },
  components: {Footer, Header, TopHeader},
  mounted() {
    setTimeout(() => {
      window.axeptioSettings = {
        clientId: "6229d344a3710ac01d40830b",
      };

      (function(d, s) {
        var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
        e.async = true; e.src = "//static.axept.io/sdk.js";
        t.parentNode.insertBefore(e, t);
      })(document, "script");
    }, 1000)
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
  color: #405986;

  @include desk-1024 {
    padding-top: 124px;
  }
}

* {
  box-sizing: border-box;
}

button, a.btn {
  border: none;
  height: 40px;
  background: #f44336;
  border-radius: 20px;
  padding: 0 20px;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #FFF;
  cursor: pointer;
  text-decoration: none;
}

a.btn {
  line-height: 40px;
}

#form {
  h2 {
    font-family: Yeseva One;
    font-size: 36px;
    line-height: 50px;
    text-align: center;
    color: #0B2758;
  }

  input {
    border: 1px solid #405986;
    border-radius: 100px;
    height: 48px;
    font-size: 14px;
    padding: 0 20px;
    width: 100%;
    max-width: 400px;
    display: block;
  }

  textarea {
    border: 1px solid #405986;
    border-radius: 15px;
    height: 180px;
    font-size: 14px;
    padding: 10px 20px;
    width: 100%;
    max-width: 400px;
    display: block;
  }

  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;

    button {
      min-width: 216px;
    }

    a {
      font-size: 14px;
      text-align: center;
      color: #f44336;
      text-decoration: none;
    }

    .back {
      width: 40px;
      height: 40px;
      cursor: pointer;
      display: grid;
      place-items: center;
      border: 1px solid #405986;
      border-radius: 50%;
      margin-right: 14px;
    }
  }

  .v-select {
    max-width: 400px;
    width: 100%;

    &.blue {
      .vs__dropdown-toggle {
        border: 1px solid #f44336;
      }
    }

    &.regime_matrimonial {
      .vs__dropdown-menu {
        font-size: 14px;
        width: 380px;
      }
    }

    .vs__dropdown-toggle {
      border: 1px solid #405986;
      border-radius: 100px;
      padding-bottom: 0;
      padding-left: 20px;
      height: 48px;
    }

    .vs__search, .vs__search:focus {
      border: none;
      width: auto;
      padding: inherit;
      height: inherit;
    }

    .vs__selected {
      padding: 0;
      margin: 0;
      height: 48px;
      line-height: initial;
    }

    .vs__actions {
      padding: 0 10px;
    }
  }
}

.file-upload.v-upload {
  .input-wrapper {
    height: 40px;
    background: #f44336;
    border-radius: 20px;
    padding: 0 20px;
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    color: #FFF;
    cursor: pointer;

    &:hover {
      background: #f44336;
    }

    .file-upload-label {
      padding: 0;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      .file-upload-icon {
        display: none;
      }
    }
  }
}
</style>
