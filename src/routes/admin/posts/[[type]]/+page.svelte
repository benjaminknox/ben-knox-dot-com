<script lang="ts">
  import Posts from '$lib/posts/posts.svelte';
  import Pagination from '$lib/posts/pagination.svelte';
  import PostsFilter from '$lib/posts/posts-filter.svelte';

	let { data } = $props();
</script>


<div class="wrapper">
  <h3>{ data.type[0].toUpperCase() + data.type.slice(1, data.type.length) }: All Topics</h3>

  <PostsFilter {...data} />

  <Posts {...data} admin />

  <Pagination {...data} />
</div>

<style lang="scss">
  .wrapper {
    h3 {
      text-align: center;
      height: 2.813rem;
    }

    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
</style>
