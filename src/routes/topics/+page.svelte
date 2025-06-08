<style lang="scss">
  .hero-content {
    background: rgba(95, 117, 137, 0.25);
  }
</style>

<script lang="ts">
  import { portal } from "svelte-portal";
</script>

<div use:portal={"section#hero"} class="hero-content"></div>

<h3>Topics</h3>
