<template>
  <div
    class="table-responsive"
    :style="{overflowY: 'scroll', height: '300px' }"
    @scroll="handleScrolling"
  >
    <table class="table table-striped">
      <caption>
        There are {{ total }} contacts.
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
          v-for="(item, index) in data"
          :key="item.id"
          :id="item.id"
          :index="(index + 1)"
          :user="item"
          :sent="item.sent"
          @resend="resend"
          @update="update"
          @remove="remove"
        ></UserItem>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserItem from "./UserItem.vue";

export default {
  data() {
    return {

    };
  },
  props: ["data", "loadMore", "resend", "remove", "update", "total"],
  components: { UserItem },
  methods: {
    handleScrolling(event) {
      if (
        event.target.scrollHeight - event.target.scrollTop ===
        event.target.clientHeight
      ) {
        this.loadMore()
      }
    },
  },
  computed: {
  }
};
</script>
