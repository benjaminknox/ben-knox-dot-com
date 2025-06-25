<script lang="ts">
  import Posts from '$lib/posts/posts.svelte';

	let { data } = $props();
</script>

<h3>{ data.type[0].toUpperCase() + data.type.slice(1, data.type.length) }</h3>

<Posts posts={data.posts} admin />
