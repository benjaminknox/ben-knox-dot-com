<script lang="ts">
  import Post from '$lib/post/post.svelte';

	interface Props {
    post: Array<Partial<{
      _id: string;
      title: string;
    }>>
	}

	let { posts, admin = false }: Props = $props();
</script>

<div class="posts">
  {#each posts as post}
    <Post {post} {admin} />
  {/each}
</div>

<style lang="scss">
  .posts {
    display: flex;
    gap: 3.37rem;
    flex-wrap: wrap;
  }
</style>
