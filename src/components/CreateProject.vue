<template>
  <div>
    <b-button
      v-b-modal.modal-prevent-closing
      size="md"
      class="m-2 bg-transparent"
      >Create +</b-button
    >

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Create New Project"
      @show="reset"
      @hidden="reset"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="$emit('handleSubmit')">
        <b-form-group
          label="Project Name"
          label-for="name-input"
          invalid-feedback="Project name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="projectName"
            :state="nameState"
            required
            autocomplete="off"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameState: null,
      projectName: null,
    };
  },
  methods: {
    // Pop-up form
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    reset() {
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      this.checkFormValidity();
      // Trigger submit handler
      if (this.nameState == false) {
        return;
      }
      // Send to parent to add project
      this.$emit("handleSubmitProject", this.projectName);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
};
</script>
