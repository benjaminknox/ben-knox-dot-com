<script lang="ts">
  import { page as pageStore } from '$app/stores';

	interface Props {
    post: Array<Partial<{
      page: number;
      limit: number;
      lastPage: number;
    }>>
	}

	let { page, limit, lastPage } = $props();

  let uri = $derived($pageStore.url.pathname);

  const generateQueryString = () => {
    let params = Object.fromEntries($pageStore.url.searchParams.entries());

    delete params.limit;
    delete params.page;

    let queryString = new URLSearchParams(params).toString().toString();

    if(queryString) queryString = `&${queryString}`;

    return queryString;
  };

  let queryString = generateQueryString();
</script>

{#if lastPage > 1}
  <div class="paginator">
    {#if page > 1}
      <a href={`${uri}?limit=${limit}&page=${page - 1}${queryString}`} invalidate-all>Previous</a>
    {/if}
    {#each Array.from({length: lastPage}, (_, i) => i + 1) as index}
      <a href={`${uri}?limit=${limit}&page=${index}${queryString}`} invalidate-all>{index}</a>
    {/each}
    {#if page < lastPage}
      <a href={`${uri}?limit=${limit}&page=${page + 1}${queryString}`} invalidate-all>Next</a>
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
