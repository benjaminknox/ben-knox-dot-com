<script lang="ts">
  import Hero from '$lib/hero/hero.svelte';
  import Posts from '$lib/posts/posts.svelte';
  import HorizontalRule from '$lib/HorizontalRule/HorizontalRule.svelte';

	let { data } = $props();

  let { posts } = data;
</script>

<svelte:head>
  <title>Modern Software Development Guides | Ben Knox</title>
</svelte:head>

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

<div class="see-more-link">
  <a href="/posts" data-sveltekit-reload>See More →</a>
</div>

<style lang="scss">
  .icon {
    width: 10.125rem;
    height: 9.625rem;
    background: url('/static/svgs/home/code-symbol.svg');
    background-repeat: no-repeat;
    background-position: center;
  }

  .see-more-link {
    width: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
    height: 3.625rem;

    a {
      font-weight: 200;
      text-decoration: none;
    }
  }
</style>

