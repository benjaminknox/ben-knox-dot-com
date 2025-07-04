<script lang="ts">
  import { portal } from "svelte-portal";
  import HorizontalRule from '$lib/HorizontalRule/HorizontalRule.svelte';
</script>

<div use:portal={"section#hero"} class="hero-content">
  <div class="icon"></div>
  <h1>Code With Ben Knox</h1>
  A Blog About Software
</div>
<HorizontalRule>
  Latest Blogs
</HorizontalRule>

<style lang="scss">
  .hero-content {
    background: rgba(185, 114, 87, 0.25);

    h1 {
      font-weight: 500;
    }

    .icon {
      width: 10.125rem;
      height: 9.625rem;
      background: url('/static/svgs/home/code-symbol.svg');
			background-repeat: no-repeat;
			background-position: center;
    }
  }
</style>

