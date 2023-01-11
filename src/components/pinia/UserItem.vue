<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    sent: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["resend", "remove", "update"],
  setup(props) {
    const initialState = {
      person: {
        id: props.id,
        index: props.index,
        name: props.user.name,
        phone: props.user.phone,
        sent: props.sent,
      },
      isEdit: false,
    }
    return initialState;
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
      this.toggleEdit();
    },
  },
};
</script>

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
