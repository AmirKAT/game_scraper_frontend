<template>
<div id='root'>
   
    <Header title="ProductZone "></Header>
    <router-view />
  </div>
</template>

<script>
import Header from './components/layouts/Header'

export default {
  name: 'App',
  components: {
    Header
  }
   
}
</script>

<style>
 
</style>
