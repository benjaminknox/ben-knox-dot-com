<script lang="ts">
  import Hero from '$lib/hero/hero.svelte';
  import Posts from '$lib/posts/posts.svelte';
  import Pagination from '$lib/posts/pagination.svelte';
  import PostsFilter from '$lib/posts/posts-filter.svelte';
  import HorizontalRule from '$lib/HorizontalRule/HorizontalRule.svelte';

	let { data } = $props();
</script>

<Hero bgColor="rgba(95, 117, 137, 0.25)">
  <div class="icon"></div>
  <h1>Search Posts</h1>
  <div class="tagline">
    {data.totalPosts} Post{data.totalPosts !== 1 ? 's' : ''}
  </div>
</Hero>

<HorizontalRule>
  Latest
</HorizontalRule>

<div class="wrapper">
  <PostsFilter {...data} />

  <Posts {...data} />

  <Pagination {...data} />
</div>

<style lang="scss">
  .icon {
    width: 10.125rem;
    height: 9.625rem;
    background: url('/svgs/posts-list.svg');
    background-repeat: no-repeat;
    background-position: center;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
</style>
