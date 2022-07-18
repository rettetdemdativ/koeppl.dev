<script lang="ts">
  import Info from '../lib/components/Info.svelte';
  import Terminal from '../lib/components/Terminal.svelte';
</script>

<div id="app">
  <div class="box">
    <div id="info_container" class="row content">
      <Info />
    </div>
    <div id="terminal_container" class="row content">
      <Terminal />
    </div>
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
    overflow: hidden;
    height: 100%;
  }

  #info_container {
    flex: 45;
  }

  #terminal_container {
    flex: 55;
  }
</style>
