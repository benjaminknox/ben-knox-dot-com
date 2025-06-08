<script lang="ts">
  import SignIn from '$lib/signin/signin.svelte';
</script>

<section class="wrapper">
  <h1>Content Creator Sign in</h1>

  <SignIn />
</section>

<style lang="scss">
  h1 {
    text-align: center;
  }

  section.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }
</style>
