<style lang="scss">
  .hero-content {
    background: rgba(185, 114, 87, 0.25);
  }
</style>

<script lang="ts">
  import { portal } from "svelte-portal";
</script>

<div use:portal={"section#hero"} class="hero-content"></div>
