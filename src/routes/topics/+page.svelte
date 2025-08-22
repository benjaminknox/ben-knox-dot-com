<script lang="ts">
  import Hero from '$lib/hero/hero.svelte';
  import HorizontalRule from '$lib/HorizontalRule/HorizontalRule.svelte';

	let { data } = $props();

</script>

<Hero bgColor="rgba(95, 117, 137, 0.25)">
  <div class="icon"></div>
  <h1>List of Topics</h1>
  <div class="tagline">
    20 Topics
  </div>
</Hero>

<HorizontalRule>
  All Topics
</HorizontalRule>

<div class="wrapper">
  {#each data.topics as topic}
    <div class="topic">
      <a href={`/posts?topicFilter=${encodeURIComponent(topic.name)}`}>{topic.name}</a>
    </div>
  {/each}
</div>

<style lang="scss">
  .icon {
    margin-bottom: 1.25rem;
    width: 10.563rem;
    height: 8.813rem;
    background: url('/svgs/topics-list.svg');
    background-repeat: no-repeat;
    background-position: center;
  }

  .wrapper {
    font-weight: 300;
    color: var(--color-raisin-black);

    .topic {
      display: flex;
      align-items: center;
      height: 2.5rem;
      min-width: 33.33%;
      max-width: 33.33%;
      flex: 1;
    }

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

</style>
