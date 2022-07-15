<script lang="ts">
  import Info from '../lib/components/Info.svelte';
  import Terminal from '../lib/components/Terminal.svelte';
</script>

<div id="app">
  <div class="box">
    <div class="row content">
      <Info />
    </div>
    <div class="row content">
      <Terminal />
    </div>
    <div class="row footer" />
  </div>
</div>

<style>
  #app {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
  .box {
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 100%;
  }
  .box .row.content {
    flex: 1 1 auto;
    overflow: auto;
    height: 100%;
  }
</style>
