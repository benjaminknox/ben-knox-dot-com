<script lang="ts">
	import '@awenovations/aura/dist/tokens/_variables.css';

  import { page } from '$app/stores';
  import type { LayoutProps } from './$types';
  import Icon from '@awenovations/aura/icon.svelte'
	import Toast from '@awenovations/aura/toast.svelte';
	import Dialog from '@awenovations/aura/dialog.svelte';
	import { dialogStore } from '$lib/stores/dialog.store';

  let { children, data } : LayoutProps = $props();
</script>

<style lang="scss">
  $platinum: #E9E9E9;
  $licorice: #2A211C;
  $raisin-black: #18191F;
  $slate-gray: #5F7589;
  $brown-sugar: #B97257;

  :global(:root) {
    --color-platinum: #E9E9E9;
    --color-licorice: #2A211C;
    --color-raisin-black: #18191F;
    --color-slate-gray: #5F7589;
    --color-brown-sugar: #B97257;

    --color-platinum-10: #D9D9D9;
    --color-platinum-20: #BFBFBF;

    --color-silver: #A9A9AA;
    --color-champagne-pink: #EAD5CD;
  }

  :global(html, body) {
    height: 100%;
    margin: 0;
    padding: 0;
    font-optical-sizing: auto;
    color: var(--color-slate-gray);
    font-family: "Jost", sans-serif;
    background: var(--color-platinum);

  }

  :global(*) { /* Reset because I'm pulling in aura which defines this as Roboto */
    font-family: "Jost", sans-serif !important;
  }

  :global(a, a:hover, a:active, a:visited, a:focus) {
    color: inherit;
    text-decoration: underline;
  }

  :global(h1, h2, h3, h4, h5, h6) {
    margin: 0;
    padding: 0;
  }

  :global(h1) {
    font: normal 400 32px Jost;
  }
  
  :global(h2) {
    font: normal 400 28px Jost;
  }
  
  :global(h3) {
    font: normal 400 24px Jost;
  }
  
  :global(h4) {
    font: normal 500 20px Jost;
  }
  
  :global(h5) {
    font: normal 500 18px Jost;
  }
  
  :global(h6) {
    font: normal 600 16px Jost;
  }

  section.wrapper {
    min-height: 100%;

    section.main-content {
      max-width: 62.625rem;
      margin: 0 auto;
    }

    header  {
      display: flex;
      height: 6.625rem;
      justify-content: space-between;

      a{
        text-decoration: none;
      }

      h1 {
        width: 47.6%;
        display: flex;
        align-items: center;
      }

      nav {
        display: flex;
        flex-direction: row;

        a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 6.25rem;

          &:hover {
            background: darken($platinum, 10%);
          }

          &.active {
            color: var(--color-brown-sugar);
          }
        }
      }
    }

    footer {
      border-top: 1px solid rgba($raisin-black, 0.25);
      margin-top: 3.5rem;
      padding-bottom: 3.3125rem;
      color: var(--color-raisin-black);

      .topics-list {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;

        a {
          font-size: 14px;
          font-style: italic;
          width: calc(50% - 1rem);
        }
      }

      section.content-wrapper {
        max-width: 62.625rem;
        margin: 0 auto;
        display: flex;

        section {
          h6 {
            height: 6.625rem;
            display: flex;
            align-items: center;
          }

          p, .social-media {
            color: rgba($raisin-black, 0.75);
            font-family: Jost;
            font-size: 14px;
            font-style: italic;
            font-weight: 400;
            line-height: 2.188rem;
          }

          .social-media {
            margin-top: 1rem;
            display: flex;
            gap: 1rem;

            a {
              text-decoration: none;
              display: flex;
              line-height: 1.375rem;
              gap: 0.3rem;

              &:hover {
                text-decoration: underline;
              }

              :global(.aura-icon .icon) {
                background: rgba($raisin-black, 0.75);
              }
            }
          }

          flex: 1;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }

	:global(.floating-dialog) {
		position: absolute;
		top: 43%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1001;
	}

	:global(.backdrop) {
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 40%);
		backdrop-filter: blur(0.2rem);
		height: 100%;
		width: 100%;
		z-index: 1000;
	}
</style>

<section class="wrapper">
  <section class="main-content">
    <header>
      <h1><a href="/" data-sveltekit-reload>Code With Ben Knox</a></h1>
      <nav>
        {#if !data.authenticated}
          <a class:active={$page.url.pathname === '/posts'} href="/posts" data-sveltekit-reload>Posts</a>
        {/if}
        <a class:active={$page.url.pathname === '/topics'} href="/topics" data-sveltekit-reload>Topics</a>
        <a class:active={$page.url.pathname === '/about'} href="/about" data-sveltekit-reload>About</a>
        {#if data.authenticated}
          <a class:active={$page.url.pathname === '/admin/post'} href="/admin/post" data-sveltekit-reload>Add Post</a>
          <a class:active={$page.url.pathname === '/admin/posts/drafts'} href="/admin/posts/drafts" data-sveltekit-reload>Drafts</a>
          <a class:active={$page.url.pathname === '/admin/posts'} href="/admin/posts" data-sveltekit-reload>Posts</a>
          <a href="/signout" data-sveltekit-reload>Sign Out</a>
        {/if}
      </nav>
    </header>
    {@render children()}
  </section>
  <footer>
    <section class="content-wrapper">
      <section>
        <h6>Topics</h6>
        <div class="topics-list">
          {#each data.topics as topic}
            <a>{topic.name}</a>
          {/each}
        </div>
      </section>
      <section>
        <h6>About the Author</h6>
        <p>
        Ben Knox, a passionate tech enthusiast and your trusted coding companion, is here to simplify the intricate world of software and technology. Join us on this journey as we decode, create, and explore the endless possibilities of code together.
        </p>
        <div class="social-media">
          <a class="icon" target="blank" href="https://www.linkedin.com/in/benjaminknox1"><Icon name="linkedin" />benjaminknox1</a>
          <a class="icon" target="blank" href="https://github.com/benjaminknox"><Icon name="github" />benjaminknox</a>
        </div>
      </section>
    </section>
  </footer>
</section>

{#if $dialogStore.open}
  <Dialog
    class="floating-dialog"
    confirmText={$dialogStore.confirmText}
    cancelText={$dialogStore.cancelText}
    onCancel={$dialogStore.handleCancel}
    onConfirm={$dialogStore.handleConfirm}>{$dialogStore.message}</Dialog
  >
  <div class="backdrop"></div>
{/if}

<Toast />
