<script lang="ts">
  let title = 'Michael Köppl';
  let description = 'Austrian computer science student with a passion for technology';
</script>

<div class="info">
  <img id="profile_pic" alt="profile pic" src="/src/assets/rettetdemdativ.png" />
  <h1>{title}</h1>
  <h3>{description}</h3>
</div>

<style>
  #profile_pic {
    margin-top: 5%;
    height: 150px;
    width: 150px;
    border-radius: 100%;
    border-color: grey;
    border-width: 1px;
    background-size: cover;
    border-style: solid;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
  h1 {
    margin-top: 8px;
    margin-bottom: 0;
  }
  h3 {
    color: darkgrey;
    margin-top: 0;
  }
</style>
