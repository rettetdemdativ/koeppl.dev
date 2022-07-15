<script lang="ts">
</script>

<div id="terminal">
  <div id="term_box">
    <textarea spellcheck="false" id="term_input" />
  </div>
</div>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Inconsolata');
  #terminal {
    height: 100%;
  }
  #term_box {
    display: flex;
    flex-direction: row;
    height: 100%;
    position: relative;
    align-items: stretch;
  }
  #term_input {
    flex: 1 1 auto;
    padding: 0px;
    margin: 0px;
    overflow: auto;
    background: black;
    color: white;
    font-family: 'Inconsolata', sans-serif;
    font-size: 12pt;
    border-width: 0px;
    padding: 10px;
  }
  .tooltip {
    display: block !important;
    z-index: 10000;
    .tooltip-inner {
      background: lightgray;
      color: black;
      font-family: 'Inconsolata', sans-serif;
      font-size: 10pt;
      border-radius: 16px;
      padding: 5px 10px 4px;
    }
    &[aria-hidden='true'] {
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.15s, visibility 0.15s;
    }
    &[aria-hidden='false'] {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.15s;
    }
  }
</style>
