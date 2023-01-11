import { defineStore } from "pinia";
import axios from "axios";

export const useContactStore = defineStore({
  id: "contact",
  state: () => ({
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
    total: 0,
  }),
  getters: {
    items: (state) => state.contacts,
  },
  actions: {
    async loadContact(query = {}) {
      console.log("load triggered");
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
          this.params.mode = query.mode ? query.mode : "and";
          this.total = response.data.rowCount;

          this.contacts = [
            ...(this.params.page === 1 ? [] : this.contacts),
            ...response.data.contacts.map((item) => {
              item.sent = true;
              return item;
            }),
          ];
        }
        console.log(this, "loadContact setelah load");
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
    async addContact(name, phone) {
      const id = Date.now();
      const newContact = {
        id,
        name,
        phone,
        sent: true,
      };

      try {
        if (!name && !phone) {
          this.contacts.unshift(newContact);
        }

        const fetching = await axios.post(
          "http://localhost:3039/api/phonebooks",
          { name, phone }
        );

        const response = fetching.data;

        if (response.success && !name && !phone) {
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
        if (!name && !phone) {
          this.contacts = this.contacts.map((item) => {
            if (item.id === id) {
              item.sent = false;
            }
            return item;
          });
        }
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
      this.params.page = 1;
      this.params.name = "";
      this.params.phone = "";
      this.params.mode = "and";
      this.loadContact();
    },
  },
});
