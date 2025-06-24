<script lang="ts">
  import SignIn from '$lib/signin/signin.svelte';
	import { enhance, applyAction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';

  let loading = $state(false);

	const onSubmit = () => {
		loading = true;

		return async ({ result }) => {
			loading = false;

      await applyAction(result);

      invalidateAll();
		};
	}
</script>

<section class="wrapper">
  <h1>Content Creator Sign in</h1>

<form method="post" use:enhance={onSubmit} id="signin-form">
  <SignIn {loading} />
</form>
</section>

<style lang="scss">
  h1 {
    text-align: center;
  }

  section.wrapper {
    min-height: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    justify-content: center;
  }
</style>
