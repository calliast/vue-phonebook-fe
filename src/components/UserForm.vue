<template>
  <div class="row">
    <h2>Add new contact</h2>
  </div>
  <form @submit.prevent="handleOnSubmit">
    <div class="row mt-1 mb-4">
      <div class="row my-1">
        <div class="col-sm-6">
          <label htmlFor="name" class="col-sm-6 col-form-label"> Name </label>
          <div class="col-sm-12">
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              v-model="add.name"
              required
            />
          </div>
        </div>

        <div class="col-sm-6">
          <label htmlFor="phone" class="col-sm-6 col-form-label"> Phone </label>
          <div class="col-sm-12">
            <input
              type="tel"
              class="form-control"
              id="phone"
              name="phone"
              v-model="add.phone"
              required
            />
          </div>
        </div>
      </div>

      <div class="row my-1">
        <div class="col-sm-6">
          <button type="submit" class="btn btn-primary col-sm-4">Save</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      add: {
        name: "",
        phone: "",
      },
    };
  },
  methods: {
    handleOnSubmit() {
        this.$emit('add', this.add.name, this.add.phone)
        this.add.name = ""
        this.add.phone = ""
    }
  },
  emits: ["add"]
};
</script>
