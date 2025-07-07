<script lang="ts">
  import Hero from '$lib/hero/hero.svelte';

  let { data } = $props();
</script>

<Hero class="header">
  <image class="image-preview" src={`/admin/post/${data.post._id}/image.jpg`} />
</Hero>

<div class="wrapper">
  <h1 class="title">{data.post.title}</h1>
  <h2 class="title">{data.post.topic}</h2>
  <div class="post-body">
    {@html data.post.content}
  </div>
</div>

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

  .title {
    text-align: center;
    font-weight: 500;
  }

  h1.title {
    height: 6.625rem;
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
    font-size: 1.5rem;
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
</style>
