<template>
  <div>
   <panel button v-for="youji in data" :key="youji.id" :list='youji' ></panel>
  </div>
</template>

<script>
export default {
  data () {
    return {
        data:''
        }
    }
}
</script>
