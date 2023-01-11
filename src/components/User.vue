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
              @click="handleChangeTab('search')"
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
              @click="handleChangeTab('add')"
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
            <UserSearch @search="(query = {}) => searchContact(query)" @reset="() => searchReset()"/>
          </div>
          <div
            class="tab-pane fade"
            :class="{ show: tab === 'add', active: tab === 'add' }"
            id="add-form"
            role="tabpanel"
            aria-labelledby="add"
          >
            <div class="form-group">
              <UserForm @add="(name, phone) => addContact(name, phone)" />
            </div>
          </div>
        </div>
        <hr />

        <UserList
          :data="contacts"
          :loadMore="loadMore"
          :resend="resendContact"
          :remove="removeContact"
          :update="updateContact"
          :total="total"
        />
      </div>
      <div class="card-footer"></div>
    </div>
  </div>
</template>

<script>
import UserList from "./UserList.vue";
import UserForm from "./UserForm.vue";
import UserSearch from "./UserSearch.vue";
import axios from "axios";

export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      params: {
        page: 1,
        pages: 1,
        name: "",
        phone: "",
      },
      contacts: [
        // { id: 2, name: "ikhsan", phone: "222" }
      ],
      tab: "search",
      total: 0
    };
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event listeners in templates.
  methods: {
    async loadContact(query = {}) {
      try {
        const fetching = await axios.get(
          `http://localhost:3039/api/phonebooks?`,
          {
            params: { ...this.params, ...query },
        }
        );
        const response = fetching.data;

        if (response.success) {
          this.params.page = response.data.page;
          this.params.pages = response.data.pages;
          this.params.name = query.name ? query.name : this.params.name;
          this.params.phone = query.phone ? query.phone : this.params.phone;
          this.params.mode = query.mode ? query.mode : "and"
          this.total = response.data.rowCount

          this.contacts = [
            ...(this.params.page === 1 ? [] : this.contacts),
            ...response.data.contacts.map((item) => {
              item.sent = true
              return item
            })
          ]
        }
      } catch ({ message, name, code, config, request }) {
        console.log(`${name}: ${message} occured when loading data..`);
      }
    },
    loadMore() {
      if (this.params.page < this.params.pages) {
        this.params.page += 1;
        this.loadContact();
      }
    },
    handleChangeTab(value) {
      this.tab = value;
    },
    async addContact(name, phone) {
      const id = Date.now();
      const newContact = {
        id,
        name,
        phone,
        sent: true,
      };

      try {
        this.contacts.unshift(newContact);

        const fetching = await axios.post(
          "http://localhost:3039/api/phonebooks",
          { name, phone }
        );

        const response = fetching.data;

        if (response.success) {
          this.contacts = this.contacts.map((item) => {
            if (item.id === id) {
              item.id = response.data.id;
              item.sent = true;
            }
            return item;
          });
        }
      } catch ({ message, name, code, config, request }) {
        console.log(`${name}: ${message} occured when adding new contact..`);
        this.contacts = this.contacts.map((item) => {
          if (item.id === id) {
            item.sent = false;
          }
          return item;
        });
      }
    },
    async removeContact(id) {
      try {
        const fetching = await axios.delete(
          `http://localhost:3039/api/phonebooks/${id}`
        );

        const response = fetching.data;

        if (response.success && response.data > 0) {
          this.contacts = this.contacts.filter((item) => item.id !== id);
        }
      } catch ({ message, name, code, config, request }) {
        console.log(`${name}: ${message} occured when deleting a contact..`);
      }
    },
    async updateContact({ id, name, phone }) {
      try {
        const fetching = await axios.put(
          `http://localhost:3039/api/phonebooks/${id}`,
          { id, name, phone }
        );

        const response = fetching.data;

        if (response.success) {
          this.contacts = this.contacts.map((item) => {
            if (item.id === response.data.id) {
              return {
                id: response.data.id,
                name: response.data.name,
                phone: response.data.phone,
                sent: true,
              };
            }
            return item;
          });
        }
      } catch ({ message, name, code, config, request }) {
        console.log(`${name}: ${message} occured when updating..`);
      }
    },
    async resendContact({ id, name, phone }) {
      console.log("🚀 ~ masuk resend nih ", id, name, phone);
      try {
        const fetching = await axios.post(
          "http://localhost:3039/api/phonebooks",
          { name, phone }
        );

        const response = fetching.data;

        if (response.success) {
          this.contacts.map((item) => {
            if (item.id === id) {
              item.id = response.data.id;
              item.sent = true;
            }
            return item;
          });
        }
      } catch ({ message, name, code, config, request }) {
        console.log(`${name}: ${message} occured when resending..`);
      }
    },
    searchContact(query = {}) {
      this.params.page = 1;
      this.loadContact(query);
    },
    searchReset() {
        this.params.page = 1
        this.params.name = ""
        this.params.phone = ""
        this.params.mode = "and"
        this.loadContact()
    }
  },

  mounted() {
    this.loadContact();
  },
  components: {
    UserList,
    UserForm,
    UserSearch,
  },
};
</script>
