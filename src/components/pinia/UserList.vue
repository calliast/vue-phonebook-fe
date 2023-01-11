<script>
import { storeToRefs } from "pinia";
import UserItem from "./UserItem.vue";
import { useContactStore } from "../../stores/contact";
const store = useContactStore();

export default {
  setup() {
    const { contacts, total } = storeToRefs(store);
    const {
      loadContact,
      loadMore,
      resendContact,
      removeContact,
      updateContact,
    } = store;

    return {
      contacts,
      total,
      load: loadContact,
      loadAgain: loadMore,
      resend: resendContact,
      remove: removeContact,
      update: updateContact,
    };
  },
  methods: {
    handleScrolling(event) {
      if (
        event.target.scrollHeight - event.target.scrollTop ===
        event.target.clientHeight
      ) {
        this.loadAgain();
      }
    },
  },
  mounted() {
    this.load();
  },
  components: {
    UserItem,
  },
};
</script>

<template>
  <div
    class="table-responsive"
    :style="{ overflowY: 'scroll', height: '300px' }"
    @scroll="handleScrolling"
  >
    <table class="table table-striped">
      <caption>
        There are
        {{
          total
        }}
        contacts.
      </caption>
      <thead class="thead-dark">
        <tr>
          <th scope="col" class="bg-white sticky-top">#</th>
          <th scope="col" class="bg-white sticky-top">Name</th>
          <th scope="col" class="bg-white sticky-top">Phone</th>
          <th scope="col" class="bg-white sticky-top">Action</th>
        </tr>
      </thead>
      <tbody>
        <UserItem
          v-for="(item, index) in contacts"
          :key="item.id"
          :id="item.id"
          :index="index + 1"
          :user="item"
          :sent="item.sent"
          @resend="resend"
          @remove="remove"
          @update="update"
        ></UserItem>
      </tbody>
    </table>
  </div>
</template>
