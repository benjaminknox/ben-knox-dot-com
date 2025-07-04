<script lang="ts">
  import { portal } from "svelte-portal";
  import Posts from '$lib/posts/posts.svelte';
  import HorizontalRule from '$lib/HorizontalRule/HorizontalRule.svelte';

	let { data } = $props();

  let { posts } = data;
</script>

<div use:portal={"section#hero"} class="hero-content">
  <div class="icon"></div>
  <h1>Code With Ben Knox</h1>
  A Blog About Software
</div>
<HorizontalRule>
  Latest Blogs
</HorizontalRule>

<Posts {posts} />

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

