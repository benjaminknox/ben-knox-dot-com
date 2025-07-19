<script lang="ts">
  import HorizontalRule from '$lib/HorizontalRule/HorizontalRule.svelte';

  import { VimWasm, checkBrowserCompatibility } from 'vim-wasm/vimwasm.js';


  const canShowVim = !checkBrowserCompatibility();

  $effect(() => {
    if(canShowVim) {
      const vim = new VimWasm({
          canvas: document.getElementById('vim-canvas'),
          input: document.getElementById('vim-input'),
          workerScriptPath: 'vim-scripts/vim.js',
      });


      vim.start();
    }
  })
  
</script>

<div class="wrapper">
  <h2>Vim in the Browser</h2>

  <span>
  This is a pretty cool vim browser plugin, <a href="https://github.com/rhysd/vim.wasm">github.com/rhysd/vim.wasm</a> 🤩
  </span>

  <canvas id="vim-canvas"></canvas>
  <input id="vim-input" autocomplete="off" autofocus />
</div>

<style lang="scss">

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem
  }

  #vim-canvas {
    width: 100%;
    height: auto;
  }

  #vim-input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
</style>
