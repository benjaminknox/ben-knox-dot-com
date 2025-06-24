<script lang="ts">
	let { data } = $props();
  console.log(data)
</script>

<h3>{ data.type[0].toUpperCase() + data.type.slice(1, data.type.length) }</h3>

<div class="posts">
  {#each data.posts as post}
    <a href={`/admin/post/${post._id}`} class="post-card">
      <image src={`/admin/post/${post._id}/image.jpg`} />
      <div class="title">{post.title}</div>
    </a>
  {/each}
</div>

<style lang="scss">
  .posts {
    display: flex;
    gap: 3.125rem;
    flex-wrap: wrap;

    .post-card {
      width: 13.125rem;
      height: 15.625rem;
      overflow: hidden;
      background: #D9D9D9;
      border: 1px solid #A9A9AA;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      cursor: pointer;

      &:hover {
        background: darken(#D9D9D9, 10%);
      }

      :global(img) {
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
  }
</style>
