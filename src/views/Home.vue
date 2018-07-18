<!-- Author(s): Michael Koeppl -->

<template>
  <div id="home" class="box">
    <LinkBar id="linkbar" class="row header"/>
    <Info id="info" class="row content"/>
    <div id="terminal_div" class="row content">
      <Terminal id="terminal"/>
    </div>
    <div class="row footer"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import LinkBar from '@/components/LinkBar.vue';
  import Info from '@/components/Info.vue';
  import Terminal from '@/components/Terminal.vue';

  @Component({
    components: {
      LinkBar,
      Info,
      Terminal,
    },
  })
  export default class Home extends Vue {}
</script>

<style <style lang="scss">
  .box {
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 100%;
  }

  .box .row.header {
    flex: 0 1 auto;
  }

  .box .row.content {
    flex: 1 1 auto;
    overflow: auto;
    height: 100%;
  }

  #linkbar {
    height: 100px;
  }

</style>
