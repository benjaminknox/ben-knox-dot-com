<script lang="ts">
  import Posts from '$lib/posts/posts.svelte';
  import Pagination from '$lib/posts/pagination.svelte';

	let { data } = $props();
</script>

<h3>{ data.type[0].toUpperCase() + data.type.slice(1, data.type.length) }</h3>

<div class="wrapper">
  <Posts {...data} admin />

  {#if data.lastPage > 1}
    <Pagination {...data} />
  {/if}
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
</style>
