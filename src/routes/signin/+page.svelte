<script lang="ts">
  import SignIn from '$lib/signin/signin.svelte';
	import { enhance, applyAction } from '$app/forms';
  import { goto, invalidateAll } from '$app/navigation';
  import { showToast } from '@awenovations/aura/toast.store';

  let loading = $state(false);

	const onSubmit = () => {
		loading = true;

		return async ({ result }) => {
      const { type, data } = result;
      const { message } = data || {};
			loading = false;

      if(type === 'failure') {
        showToast({
          severity: 'error',
          message,
        });
      } else {
        invalidateAll();

        showToast({
          severity: 'success',
          message: "Signed in!",
        });

        await applyAction(result);
      } 
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
