<template>
  <tr>
    <th scope="row">{{ person.index }}</th>
    <td v-if="isEdit">
      <div class="form-row">
        <div class="form-group col-md-6">
          <input
            type="text"
            name="name"
            id="name"
            class="form-control col"
            v-model="person.name"
          />
        </div>
      </div>
    </td>
    <td v-else>{{ person.name }}</td>
    <td v-if="isEdit">
      <div class="form-row">
        <div class="form-group col-md-6">
          <input
            type="tel"
            name="phone"
            id="phone"
            class="form-control col"
            v-model="person.phone"
          />
        </div>
      </div>
    </td>
    <td v-else>{{ person.phone }}</td>
    <td v-if="isEdit">
      <button
        type="button"
        id="save-btn"
        class="btn btn-info mx-1"
        @click="handleUpdate"
      >
        Save
      </button>
      <button
        type="button"
        id="cancel-btn"
        class="btn btn-secondary mx-1"
        @click="toggleEdit"
      >
        Cancel
      </button>
    </td>
    <td v-else-if="sent">
      <button
        type="button"
        id="edit-btn"
        class="btn btn-success mx-1"
        @click="toggleEdit"
      >
        Edit
      </button>
      <button
        type="button"
        id="delete-btn"
        class="btn btn-danger mx-1"
        @click="handleDelete"
      >
        Delete
      </button>
    </td>
    <td v-else>
      <button
        id="resend-button"
        type="button"
        class="btn btn-warning mx-1"
        @click="handleResend"
      >
        Resend
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["id", "index", "user", "sent"],
  emits: ["resend", "remove", "update"],
  data() {
    return {
      person: {
        id: this.id,
        index: this.index,
        name: this.user.name,
        phone: this.user.phone,
        sent: this.sent,
      },
      isEdit: false,
    };
  },
  methods: {
    toggleEdit() {
      this.isEdit = !this.isEdit;
    },
    handleResend() {
      this.$emit("resend", {
        id: this.person.id,
        name: this.person.name,
        phone: this.person.phone,
      });
    },
    handleDelete() {
      this.$emit("remove", this.person.id);
    },
    handleUpdate() {
      this.$emit("update", {
        id: this.person.id,
        name: this.person.name,
        phone: this.person.phone,
      });
      this.toggleEdit()
    },
  },
};
</script>
