<template>
  <div id="app">
    <div class="container">
      <!--UPLOAD-->
      <form enctype="multipart/form-data" novalidate>
        <div>
          <input type="file" name="file"
                 :disabled="isSaving"
                 :id="uniqId"
                 @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                 class="input-file">
          <label :for="uniqId">
            <span v-if="!isSaving">
              {{ btnLabel }}
            </span>
            <span v-if="isSaving">
              Envoi du fichier en cours...
            </span>
          </label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
export default {
  props: {
    document: null,
    additionalData: null,
    uniqId: null,
    btnLabel: null
  },
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: this.uniqId
    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    upload(formData) {
      Object.keys(this.additionalData).forEach(p => {
        formData.append(p, this.additionalData[p])
      })
      const url = `https://api.juridique.lestricolores.fr/api/submissions-upload-file`;
      return this.$axios.post(url, formData)
        .then(x => x.data)
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      this.upload(formData)
        .then(x => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
          this.$emit('success', x)
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        });

      // save it
      this.save(formData);
    }
  },
  mounted() {
    this.reset();
  },
}
</script>

<style lang="scss" scoped>
.input-file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

label {
  height: 40px;
  background: #286FEB;
  border-radius: 20px;
  padding: 0 20px;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #FFF;
  cursor: pointer;
  display: grid;
  place-items: center;
}
</style>
