<script setup>
import { ref } from "vue";
import { useContactStore } from "../../stores/contact";

const { addContact } = useContactStore();

const name = ref("");
const phone = ref("");

function add() {
  addContact(name.value, phone.value);
  name.value = "";
  phone.value = "";
}
</script>

<template>
  <div class="row">
    <h2>Add new contact</h2>
  </div>
  <form @submit.prevent="add">
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
              v-model="name"
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
              v-model="phone"
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
