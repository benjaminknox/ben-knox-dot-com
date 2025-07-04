<script lang="ts">
  import { portal } from "svelte-portal";

  let { data } = $props();
</script>

<div use:portal={"section#hero"} class="hero-content header">
  <image class="image-preview" src={`/admin/post/${data.post._id}/image.jpg`} />
</div>

<div class="wrapper">
  <h1 class="title">{data.post.title}</h1>
  <h2 class="title">{data.post.topic}</h2>
  <div class="post-body">
    {@html data.post.content}
  </div>
</div>

<style lang="scss">
  .header {
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
    font-size: 2.625rem;
  }

  h2.title {
    font-size: 2rem;
  }

  .post-body {
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
