<script setup>
import UserList from "./UserList.vue";
import UserForm from "./UserForm.vue";
import UserSearch from "./UserSearch.vue";
import { ref } from "vue";

const tab = ref("search");
</script>

<template>
  <div class="container">
    <br />
    <div class="card">
      <div class="card-header my-2">
        <h1>Phonebook</h1>
      </div>
      <div class="card-body">
        <ul class="nav nav-tabs mb-3" id="ex1" role="tablist">
          <li class="nav-item" role="presentation">
            <a
              class="nav-link"
              :class="{ active: tab === 'search' }"
              id="search"
              data-mdb-toggle="tab"
              data-tab="search-form"
              href="#search-form"
              role="tab"
              aria-controls="search-form"
              aria-selected="false"
              @click="tab = 'search'"
            >
              Search
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a
              class="nav-link"
              :class="{ active: tab === 'add' }"
              id="add"
              data-mdb-toggle="tab"
              data-tab="add-form"
              href="#add-form"
              role="tab"
              aria-controls="add-form"
              aria-selected="true"
              @click="tab = 'add'"
            >
              Add
            </a>
          </li>
        </ul>

        <div class="tab-content" id="ex1-content">
          <div
            class="tab-pane fade"
            :class="{ show: tab === 'search', active: tab === 'search' }"
            id="search-form"
            role="tabpanel"
            aria-labelledby="search"
          >
            <UserSearch />
          </div>
          <div
            class="tab-pane fade"
            :class="{ show: tab === 'add', active: tab === 'add' }"
            id="add-form"
            role="tabpanel"
            aria-labelledby="add"
          >
            <div class="form-group">
              <UserForm />
            </div>
          </div>
        </div>
        <hr />

        <UserList />
      </div>
      <div class="card-footer"></div>
    </div>
  </div>
</template>
