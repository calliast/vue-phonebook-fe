<template>
  <div class="row">
    <h2>Search contact</h2>
  </div>
  <form id="search-contact-form" @submit.prevent="handleOnSubmit">
    <div class="row my-1">
      <div class="row my-1">
        <div class="col-sm-6">
          <label htmlFor="name-search" class="col-sm-4 col-form-label">
            Name
          </label>
          <div class="col-sm-12">
            <input
              type="text"
              class="form-control"
              id="name-search"
              name="name"
              v-model="search.name"
            />
          </div>
        </div>
        <div class="col-sm-6">
          <label htmlFor="phone-search" class="col-sm-4 col-form-label">
            Phone
          </label>
          <div class="col-sm-12">
            <input
              type="tel"
              class="form-control"
              id="phone-search"
              name="phone"
              v-model="search.phone"
            />
          </div>
        </div>
      </div>
      <div class="row my-1">
        <div class="col-sm-6">
          <div class="row">
            <div class="col-sm-6">
              <button
                type="submit"
                form="search-contact-form"
                class="btn btn-secondary col-sm-12"
              >
                Search
              </button>
            </div>
            <div class="col-sm-6">
              <button
                type="button"
                class="btn btn-warning col-sm-12"
                @click="handleOnReset"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="col-sm-12">search-mode:</div>
          <fieldset class="row">
            <div class="col-sm-6">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="mode"
                  id="strict"
                  value="and"
                  v-model="search.mode"
                />
                <label class="form-check-label mt-1" for="strict">
                  Specific
                </label>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="mode"
                  id="loose"
                  value="or"
                  v-model="search.mode"
                />
                <label class="form-check-label mt-1" for="loose"> Any </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  emits: ["search", "reset"],
  data() {
    return {
      search: {
        name: "",
        phone: "",
        mode: "and",
      },
    };
  },
  methods: {
    handleOnSubmit() {
      this.$emit("search", {
        name: this.search.name,
        phone: this.search.phone,
        mode: this.search.mode,
      });
    },
    handleOnReset() {
      this.search.name = "";
      this.search.phone = "";
      this.search.mode = "and";
      this.$emit("reset");
    },
  },
};
</script>
