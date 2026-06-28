<script lang="ts">
  import { page } from '$app/state';
  import Hero from '$lib/hero/hero.svelte';
  import Posts from '$lib/posts/posts.svelte';
  import { stripHtml } from "string-strip-html";
  import { format, fromUnixTime } from 'date-fns';
  import HorizontalRule from '$lib/HorizontalRule/HorizontalRule.svelte';

  let { data } = $props();

  const truncateWords = (text: string, maxWords: number) => {
    if (typeof text !== 'string' || maxWords <= 0) {
      return '';
    }

    const words = text.split(/\s+/);

    if (words.length <= maxWords) {
      return text;
    }

    let truncatedWords = words.slice(0, maxWords).join(' ');

    if (truncatedWords.endsWith('.')) {
       truncatedWords = truncatedWords.slice(0, -1);
    }

    return truncatedWords + '...';
  }

  const description = data.post.content ? truncateWords(stripHtml(data.post.content).result, 40) : '';
</script>

<svelte:head>
  <title>{data.post.title} | Ben Knox</title>
  <meta property="og:title" content={data.post.title}>
  <meta property="og:image" content={`${page.url.origin}/post/${data.post._id}/image.jpg`}>
  <meta property="og:url" content={`${page.url.origin}/post/${data.post.slug}`}>
  <meta property="og:description" content={description}>
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content={data.post.title}>
  <meta name="twitter:image" content={`${page.url.origin}/post/${data.post._id}/image.jpg`}>
  <meta name="twitter:description" content={description}>
</svelte:head>

<Hero class="header">
  <image class="image-preview" src={`/post/${data.post._id}/image.jpg`} />
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
  <HorizontalRule>More About {data.post.topic}</HorizontalRule>

  <Posts posts={data.morePosts} />

  {#if data.allPostsInCategory > 4}
    <div class="see-more-link">
      <a href={`/posts?topicFilter=${encodeURIComponent(data.post.topic)}`} data-sveltekit-reload>See More →</a>
    </div>
  {/if}
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

  :global(.post-body .emgithub-file .code-area td.hljs-ln-line) {
    line-height: 1.25rem;
    font-size: 0.8rem;
    font-weight: 400;
    font-family: 'Nimbus Mono PS', 'Courier New', monospace;
    font-family: "Geist Mono", monospace;
    font-optical-sizing: auto;
    font-style: normal;
  }

/* base */
  :global(.post-body .hljs-style-default .hljs) {
    background: var(--color-platinum);
    color: var(--color-raisin-black);
  }

  /* comments */
  :global(.post-body .hljs-style-default .hljs-comment) {
    color: var(--color-paynes-gray);
  }

  /* punctuation & tags */
  :global(.post-body .hljs-style-default .hljs-punctuation),
  :global(.post-body .hljs-style-default .hljs-tag) {
    color: var(--color-onyx);
  }

  :global(.post-body .hljs-style-default .hljs-tag .hljs-attr),
  :global(.post-body .hljs-style-default .hljs-tag .hljs-name) {
    color: var(--color-raisin-black);
  }

  /* keywords / structural — weight only */
  :global(.post-body .hljs-style-default .hljs-attribute),
  :global(.post-body .hljs-style-default .hljs-doctag),
  :global(.post-body .hljs-style-default .hljs-keyword),
  :global(.post-body .hljs-style-default .hljs-meta .hljs-keyword),
  :global(.post-body .hljs-style-default .hljs-name),
  :global(.post-body .hljs-style-default .hljs-selector-tag) {
    font-weight: 500;
  }

  /* strings, numbers, types — warm accent */
  :global(.post-body .hljs-style-default .hljs-deletion),
  :global(.post-body .hljs-style-default .hljs-number),
  :global(.post-body .hljs-style-default .hljs-quote),
  :global(.post-body .hljs-style-default .hljs-selector-class),
  :global(.post-body .hljs-style-default .hljs-selector-id),
  :global(.post-body .hljs-style-default .hljs-string),
  :global(.post-body .hljs-style-default .hljs-template-tag),
  :global(.post-body .hljs-style-default .hljs-type) {
    color: var(--color-brown-sugar);
  }

  /* sections & titles */
  :global(.post-body .hljs-style-default .hljs-section),
  :global(.post-body .hljs-style-default .hljs-title) {
    color: var(--color-brown-sugar);
    font-weight: 500;
  }

  /* variables, operators, symbols — cool accent */
  :global(.post-body .hljs-style-default .hljs-link),
  :global(.post-body .hljs-style-default .hljs-operator),
  :global(.post-body .hljs-style-default .hljs-regexp),
  :global(.post-body .hljs-style-default .hljs-selector-attr),
  :global(.post-body .hljs-style-default .hljs-selector-pseudo),
  :global(.post-body .hljs-style-default .hljs-symbol),
  :global(.post-body .hljs-style-default .hljs-template-variable),
  :global(.post-body .hljs-style-default .hljs-variable) {
    color: var(--color-slate-gray);
  }

  /* literals — green family → dark warm */
  :global(.post-body .hljs-style-default .hljs-literal) {
    color: var(--color-licorice);
  }

  /* additions, built-ins — green family → dark warm */
  :global(.post-body .hljs-style-default .hljs-addition),
  :global(.post-body .hljs-style-default .hljs-built_in),
  :global(.post-body .hljs-style-default .hljs-bullet),
  :global(.post-body .hljs-style-default .hljs-code) {
    color: var(--color-licorice);
  }

  /* meta */
  :global(.post-body .hljs-style-default .hljs-meta) {
    color: var(--color-slate-gray);
  }

  :global(.post-body .hljs-style-default .hljs-meta .hljs-string) {
    color: var(--color-slate-gray);
  }

  /* text styles */
  :global(.post-body .hljs-style-default .hljs-emphasis) {
    font-style: italic;
  }

  :global(.post-body .hljs-style-default .hljs-strong) {
    font-weight: 600;
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
