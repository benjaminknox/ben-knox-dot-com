<script lang="ts">
	interface Props {
    post: Array<Partial<{
      page: number;
      limit: number;
      lastPage: number;
    }>>
	}

	let { page, limit, lastPage } = $props();
</script>

{#if lastPage > 1}
  <div class="paginator">
    {#if page > 1}
      <a href={`/admin/posts/drafts?limit=${limit}&page=${page - 1}`} invalidate-all>Previous</a>
    {/if}
    {#each Array.from({length: lastPage}, (_, i) => i + 1) as index}
      <a href={`/admin/posts/drafts?limit=${limit}&page=${index}`} invalidate-all>{index}</a>
    {/each}
    {#if page < lastPage}
      <a href={`/admin/posts/drafts?limit=${limit}&page=${page + 1}`}>Next</a>
    {/if}
  </div>
{/if}

<style lang="scss">
  .paginator {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    height: 2.5rem;
    width: 100%;
  }
</style>
