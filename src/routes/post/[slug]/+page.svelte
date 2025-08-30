<script lang="ts">
  import { page } from '$app/state';
  import { format, fromUnixTime } from 'date-fns';
  import Hero from '$lib/hero/hero.svelte';
  import Posts from '$lib/posts/posts.svelte';
  import HorizontalRule from '$lib/HorizontalRule/HorizontalRule.svelte';


  let { data } = $props();
</script>

<svelte:head>
  <meta property="og:title" content={data.post.title}>
  <meta property="og:image" content={`${page.url.origin}/admin/post/${data.post._id}/image.jpg`}>
  <meta property="og:url" content={`${page.url.origin}/post/${data.post.slug}`}>
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content={data.post.title}>
  <meta name="twitter:image" content={`${page.url.origin}/admin/post/${data.post._id}/image.jpg`}>
</svelte:head>

<Hero class="header">
  <image class="image-preview" src={`/admin/post/${data.post._id}/image.jpg`} />
</Hero>

<div class="wrapper">
  <div class="header">
    <h1 class="title">{data.post.title}</h1>
    <div class="meta-wrapper">
      <h2 class="meta">{data.post.topic}</h2>
      {#if data.post.publishedDate}
        <h2 class="meta">{format(data.post.publishedDate, 'MMMM do, yyyy')}</h2>
      {/if}
    </div>
  </div>
  <div class="post-body">
    {@html data.post.content}
  </div>
</div>

{#if data.morePosts.length > 0}
  <HorizontalRule>More {data.post.topic}</HorizontalRule>

  <Posts posts={data.morePosts} />

  <div class="see-more-link">
    <a href={`/posts?topicFilter=${encodeURIComponent(data.post.topic)}`} data-sveltekit-reload>See More →</a>
  </div>
{/if}

<style lang="scss">
  :global(.header) {
    overflow: hidden;
    position: relative;

    :global(img) {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
    }
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .header {

    .title {
      text-align: center;
      font-weight: 500;
    }

    .meta-wrapper {
      display: flex;
      gap: 0.25rem;
      flex-direction: column;

      .meta {
        text-align: center;
        font-size: 1rem;
        font-weight: 300;
      }
    }
  }

  h1.title {
    min-height: 6.625rem;
    font-size: 2.625rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h2.title {
    font-size: 2rem;
  }

  .post-body {

    :global(h1),
    :global(h2), 
    :global(h3),
    :global(h4),
    :global(h5),
    :gloabl(h6) {
      margin-top: 1.875rem;
      margin-bottom: 1rem;
    }

    margin: 0 auto;
    width: 100%;
    line-height: 200%;
    font-weight: 300;

    :global(h1) {
      font-size: 1.9rem;
    }

    :global(h2) {
      font-size: 1.8rem;
    }

    :global(h3) {
      font-size: 1.7rem;
    }

    :global(h4) {
      font-size: 1.65rem;
    }

    :global(h5) {
      font-size: 1.625rem;
    }

    :global(h6) {
      font-size: 1.6rem;
    }
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
