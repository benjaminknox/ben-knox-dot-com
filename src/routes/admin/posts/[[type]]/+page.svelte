<script lang="ts">
  import debounce from 'lodash.debounce';
  import Posts from '$lib/posts/posts.svelte';
  import Button from '@awenovations/aura/button.svelte';
  import Pagination from '$lib/posts/pagination.svelte';
  import Dropdown from '@awenovations/aura/dropdown.svelte';
  import TextField from '@awenovations/aura/text-field.svelte';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

	let { data } = $props();

  let titleFilter = $state(decodeURIComponent($page.url.searchParams.get("titleFilter") ?? ""));
  let topicFilter = $state(decodeURIComponent($page.url.searchParams.get("topicFilter") ?? ""));

  const clearFilter = () => {
    titleFilter = "";
    topicFilter = "";

    filterChange();
  };

  const selectFilterTopic = (event: CustomEvent) => {
    topicFilter = event.detail.value;

    filterChange();
  };

  const filterChange = () => {
    let queryString = "";

    if(titleFilter || topicFilter) {
      let params = {};

      if(titleFilter) {
        params = { titleFilter };
      }

      if(topicFilter) {
        params = { ...params, topicFilter };
      }

      queryString = `?${new URLSearchParams(params).toString()}`;
    }

    goto(`${$page.url.pathname}${queryString}`, {replaceState: true, invalidateAll: true, keepFocus: true, noScroll: true});
  };

  const filterChangeDebounce = debounce(filterChange , 300);
</script>


<div class="wrapper">
  <h3>{ data.type[0].toUpperCase() + data.type.slice(1, data.type.length) }: All Topics</h3>

  <div class="filter-form-wrapper">
    <TextField name="title" placeholder="Filter by title..." bind:value={titleFilter} on:keyup={filterChangeDebounce}>
      {#snippet label()}
        <span class="label">Title</span>
      {/snippet}
    </TextField>

    <Dropdown
      on:change={selectFilterTopic}
      currentValue={topicFilter}
      required
      name="topic"
      class="topic-filter"
    >
      {#snippet placeholder()}
        <span>Select...</span>
      {/snippet}
      {#snippet label()}
        <span class="label">Topic</span>
      {/snippet}
      {#each data.topics as topic}
        <aura-option value={topic.id}>{topic.name}</aura-option>
      {/each}
    </Dropdown>
    <Button variant='tertiary' size="small" on:click={clearFilter}>clear</Button>
  </div>

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

    .filter-form-wrapper {
      width: 100%;
      display: flex;
      gap: 1rem;
      align-items: self-end;

      :global(.aura-text-field-wrapper) {
        max-width: inherit!important;
        flex: 1;
      }

      :global(.topic-filter) {
        width: 38.2%;
      }
    }
  }
</style>
