<template>
  <div class="mx-auto">
    <b-button
      id="add"
      @click="modelShow = !modelShow"
      class="ml-2 mb-2"
      size="sm"
      >Add +</b-button
    >

    <b-modal
      v-model="modelShow"
      title="Add New Task"
      @show="reset"
      @hidden="reset"
      @ok="handleOk"
    >
      <form>
        <b-form-group>
          <b-form-input
            v-model="task"
            autofocus
            autocomplete="off"
            placeholder="Task Name"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            v-model="name"
            autocomplete="off"
            placeholder="Name/Group/Department"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            v-model="des"
            autocomplete="off"
            placeholder="Description"
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
      modelShow: false,
      des: null,
      name: null,
      task: null,
      valid: null,
    };
  },
  methods: {
    check() {
      if (this.des && this.name && this.task) {
        this.des = this.des.trim();
        this.name = this.name.trim();
        this.task = this.task.trim();
        if (this.des != "" && this.name != "" && this.task != "") {
          this.valid = true;
        }
      }
    },
    reset() {
      this.des, this.name, (this.task = null);
    },
    handleOk() {
      // Trigger submit handler
      this.check();
      if (this.valid == true) {
        this.$emit("handleSubmitCard", [this.task, this.name, this.des]);
      } else {
        alert("Invalid Input. Please try again.");
      }
    },
  },
};
</script>
