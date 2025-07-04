<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation';

	interface Props {
    post: Partial<{
      _id: string;
      title: string;
    }>
	}

	let { post, admin }: Props = $props();

  //const openPost = () => {
  //  goto();
  //  invalidateAll();
  //}
</script>

<a href={`${admin ? '/admin' : ''}/post/${post._id}`} data-sveltekit-reload>
  <div class="post-card">
    <image src={`/admin/post/${post._id}/image.jpg`} />
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

    :global(img) {
      border-bottom: 1px solid var(--color-silver);
      height: 11.563rem;
    }

    .title {
      font-weight: 300;
      flex: 1;
      justify-content: center;
      align-items: center;
      display: flex;
      text-align: center;
    }
  }
</style>
