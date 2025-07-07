<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation';

	interface Props {
    post: Partial<{
      _id: string;
      title: string;
    }>
	}

	let { post, admin }: Props = $props();
</script>

<a href={`${admin ? '/admin' : ''}/post/${post._id}`} data-sveltekit-reload>
  <div class="post-card">
    <div class="image-wrapper">
      <image src={`/admin/post/${post._id}/image.jpg`} />
    </div>
    <div class="title">{post.title}</div>
  </div>
</a>

<style lang="scss">
  .post-card {
    width: 13.125rem;
    height: 15.625rem;
    overflow: hidden;
    background: var(--color-platinum-10);
    border: 1px solid var(--color-silver);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      background: var(--color-platinum-20);
    }

    .image-wrapper {
      overflow: hidden;
      height: 11.563rem;
      position: relative;
      border-bottom: 1px solid var(--color-silver);

      :global(img) {
        height: 20rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .title {
      font-weight: 300;
      flex: 1;
      justify-content: center;
      align-items: center;
      display: flex;
      text-align: center;
      padding: 1rem;
      box-sizing: border-box;
    }
  }
</style>
