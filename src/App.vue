<template>
  <NavBar/>
  <router-view/>
</template>

<style>
@import '~bootstrap/dist/css/bootstrap.css';
</style>
<script setup>
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from '@/components/NavBar.vue';
</script>