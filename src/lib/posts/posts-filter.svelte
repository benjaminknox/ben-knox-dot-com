<script lang="ts">
  import debounce from 'lodash.debounce';
  import Button from '@awenovations/aura/button.svelte';
  import Dropdown from '@awenovations/aura/dropdown.svelte';
  import TextField from '@awenovations/aura/text-field.svelte';

	interface Props {
    topics: Array<{
      _id: string;
      title: string;
    }>;
	}

	let { topics } = $props();

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

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
    {#each topics as topic}
      <aura-option value={topic.id}>{topic.name}</aura-option>
    {/each}
  </Dropdown>
  <Button variant='tertiary' size="small" on:click={clearFilter}>clear</Button>
</div>

<style lang="scss">

.wrapper {
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
</style>
