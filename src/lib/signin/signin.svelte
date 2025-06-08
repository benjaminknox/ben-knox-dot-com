<script lang="ts">
	import Icon from '@awenovations/aura/icon.svelte';
	import Link from '@awenovations/aura/link.svelte';
	import Button from '@awenovations/aura/button.svelte';
	import Divider from '@awenovations/aura/divider.svelte';
	import Container from '@awenovations/aura/container.svelte';
	import TextField from '@awenovations/aura/text-field.svelte';

	interface Props {
		loading?: boolean;
		signInWithGoogleHandler?: any;
		signInWithAppleHandler?: any;
	}

	let {
		loading = false,
		signInWithGoogleHandler = () => {},
		signInWithAppleHandler = () => {}
	}: Props = $props();
</script>

<Container kind="filled" variant="elevated" clearPadding>
	<div class="content-wrapper">
		<div class="signin-form">
			<div class="form-group">
				<TextField name="email" data-cy="email" placeholder="email@example.com">
					{#snippet label()}
						<span>Email</span>
					{/snippet}
				</TextField>
				<TextField name="password" data-cy="password" type="password" placeholder="password" />
			</div>
			<Button type="submit" {loading} fullWidth variant="tertiary" data-cy="sign-in">Sign in</Button
			>
		</div>
	</div></Container
>

<style lang="scss">
	.signin-form,
	.form-group,
	.content-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.form-group {
		gap: 0.643rem;

		.forgot-password {
			width: fit-content;
		}
	}

	.content-wrapper,
	.signin-form {
		gap: 1.5rem;
	}

	.content-wrapper {
		box-sizing: border-box;
		padding: 3rem 3.714rem;
		width: 25.643rem;
	}

	.sign-up {
		flex: 1;
		display: flex;
		gap: 5px;
		align-items: self-end;
		justify-content: center;
	}
</style>
