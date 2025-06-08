<script lang="ts">
	import '@awenovations/aura/dist/tokens/_variables.css';

  import { page } from '$app/stores';
  import type { LayoutProps } from './$types';
  import Icon from '@awenovations/aura/icon.svelte'

  let { children, data } : LayoutProps = $props();
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap');

  $platinum: #E9E9E9;
  $licorice: #2A211C;
  $raisin-black: #18191F;
  $slate-gray: #5F7589;
  $brown-sugar: #B97257;

  :root {
    --color-platinum: #E9E9E9;
    --color-licorice: #2A211C;
    --color-raisin-black: #18191F;
    --color-slate-gray: #5F7589;
    --color-brown-sugar: #B97257;
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

    section#hero {
      :global(> *) { height: 29.25rem; }
      display: flex;

      :global(> .hero-content) {
        flex: 1;
      }
    }

    footer {
      border-top: 1px solid rgba($raisin-black, 0.25);
      margin-top: 1.25rem;
      color: var(--color-raisin-black);

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

          p {
            color: rgba($raisin-black, 0.75);
            font-family: Jost;
            font-size: 14px;
            font-style: italic;
            font-weight: 400;
            line-height: 35px;
          }

          flex: 1;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
</style>

<section class="wrapper">
  <section class="main-content">
    <header>
      <h1><a href="/">Code With Ben Knox</a></h1>
      <nav>
        <a class:active={$page.url.pathname === '/topics'} href="/topics">Topics</a>
        <a class:active={$page.url.pathname === '/about'} href="/about">About</a>
      </nav>
    </header>
    <section id="hero"></section>
    {@render children()}
  </section>
  <footer>
    <section class="content-wrapper">
      <section><h6>Topics</h6></section>
      <section>
        <h6>About the Author</h6>
        <p>
        Ben Knox, a passionate tech enthusiast and your trusted coding companion, is here to simplify the intricate world of software and technology. Join us on this journey as we decode, create, and explore the endless possibilities of code together.
        </p>
        <div class="social-media">
          <div class="linkedin"><Icon name="linkedin" /></div>
          <div class="github"></div>
        </div>
      </section>
    </section>
  </footer>
</section>
