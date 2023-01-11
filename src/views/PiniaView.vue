<script setup>
import Phonebook from '../components/pinia/UserBox.vue'

</script>

<template>
  <div class="phonebook">
    <main>
      <Phonebook/>
    </main>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .phonebook {
    min-height: 100vh;
    display: flex;
    border: solid;
  }
}
</style>
