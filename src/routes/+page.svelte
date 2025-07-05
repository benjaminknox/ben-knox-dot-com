<script lang="ts">
  import Posts from '$lib/posts/posts.svelte';
  import HorizontalRule from '$lib/HorizontalRule/HorizontalRule.svelte';
  import Hero from '$lib/hero/hero.svelte';

	let { data } = $props();

  let { posts } = data;
</script>

<Hero bgColor="rgba(185, 114, 87, 0.25);">
  <div class="icon"></div>
  <h1>Code With Ben Knox</h1>
  <div class="tagline">
    A Blog About Software
  </div>
</Hero>

<HorizontalRule>
  Latest Blogs
</HorizontalRule>

<Posts {posts} />

<style lang="scss">
  .icon {
    width: 10.125rem;
    height: 9.625rem;
    background: url('/static/svgs/home/code-symbol.svg');
    background-repeat: no-repeat;
    background-position: center;
  }
</style>

