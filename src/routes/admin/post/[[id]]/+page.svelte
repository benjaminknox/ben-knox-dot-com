<script lang="ts">
  import 'quill/dist/quill.snow.css';
  import { enhance } from '$app/forms';
  import { invalidateAll, goto } from '$app/navigation';
  import Button from '@awenovations/aura/button.svelte';
  import Dialog from '@awenovations/aura/dialog.svelte';
  import Dropdown from '@awenovations/aura/dropdown.svelte';
  import { showToast } from '@awenovations/aura/toast.store';
  import TextField from '@awenovations/aura/text-field.svelte';

  let { data } = $props();

  let saving = $state(null);
  let dialogOpen = $state(false);
  let newTopicName = $state("");
  let imageInput : HTMLInputElment;
  let imagePreview : HTMLImageElment;
  let content : HTMLHiddenElment;
  let showImages = $state(false);

  $effect(async () => {
    const Quill = (await import('quill')).default

    const BlockEmbed = Quill.import('blots/block/embed');

    class GitHubEmbed extends BlockEmbed {
      static create(url) {
        const node = super.create();
        node.innerHTML = `<iframe credentialless frameborder="0" scrolling="no" style="width:100%; height:1171px;" allow="clipboard-write" src="https://emgithub.com/iframe.html?target=${encodeURIComponent(url)}&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></iframe>`;
        return node;
      }

      static value(node) {
        return node.querySelector('iframe')?.getAttribute('src');
      }
    }

    GitHubEmbed.blotName = 'github-embed';
    GitHubEmbed.tagName = 'div';
    GitHubEmbed.className = 'github-embed';

    Quill.register(GitHubEmbed);

    const quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: {
          container: '#toolbar',
          handlers: {
            embedGitHub: function () {
              const url = prompt('Enter a GitHub file URL:');
              if (url) {
                const range = this.quill.getSelection(true);
                this.quill.insertEmbed(range.index, 'github-embed', url, Quill.sources.USER);
                this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
              }
            }
          }
        }
      }
    });

    quill.on('text-change', () => {
      content.value = quill.root.innerHTML;
    });

    if(data.post._id) {
      quill.root.innerHTML = data.post.content;
      imagePreview.src = `/admin/post/${data.post._id}/image.jpg`;
      showImages = true;
    }
  });

  const openCreateTopicDialog = () => {
    dialogOpen = true;
  }

  const closeTopicDialog = () => {
    dialogOpen = false;
    newTopicName = "";
  }

  const saveTopic = async () => {
    await fetch(`/api/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: newTopicName}),
    });

    invalidateAll();

    closeTopicDialog();

    save = false;
  }

  const uploadImage = async () => {
    imageInput.click();
  }

  const showImage = async (event: HTMLEvent) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
      };

      reader.readAsDataURL(file);
    }
  }

  const onSubmit = (event: HTMLEvent) => {
    saving = event.submitter.getAttribute("name");

    return async ({ result }) => {
      saving = null;

      const type = event.submitter.getAttribute('name');

      const message = type === 'draft' ? 'Draft saved' : 'Post published';

      showToast({
        severity: 'success',
        message,
      });

      goto(`/admin/post/${result.data._id}`)
    }
  }
</script>

<div class="wrapper">
  <h3>{data.post._id ? "Edit" : "Create"} Post</h3>

  <image class:showImages class="image-preview" bind:this={imagePreview} />

  <form method="POST" use:enhance={onSubmit} enctype="multipart/form-data">
    {#if data.post._id}
      <input type="hidden" name="_id" value={data.post._id} />
    {/if}
    <div class="post-form-wrapper">
      <div class="form-header">
        <TextField name="title" placeholder="Title name..." value={data.post.title}>
          {#snippet label()}
            <span class="label">Title</span>
          {/snippet}
        </TextField>
        <Dropdown
          currentValue={data.post.topic}
          required
          name="topic"
          class="topic-dropdown"
        >
          {#snippet placeholder()}
            <span>Select...</span>
          {/snippet}
          {#snippet label()}
            <span class="label">Topic</span>
          {/snippet}
          {#each data.topics as topic}
            <aura-option value={topic.id}>{topic.name}</aura-option>
          {/each}
        </Dropdown>
        <Button variant="tertiary" type="button" size="small" onclick={openCreateTopicDialog}>Add Topic</Button>
        <Button variant="tertiary" type="button" size="small" onclick={uploadImage}>Upload Image</Button>
          <input bind:this={imageInput} onchange={showImage} type="file" name="image" class="image-upload" accept="image/jpeg" />
      </div>
      <div class="editor-container">
<div id="toolbar">
  <span class="ql-formats">
    <select class="ql-header">
      <option selected></option>
      <option value="1"></option>
      <option value="2"></option>
    </select>
  </span>
  <span class="ql-formats">
    <button class="ql-bold"></button>
    <button class="ql-italic"></button>
    <button class="ql-underline"></button>
    <button class="ql-link"></button>
    <button class="ql-code-block"></button>
    <button class="ql-embedGitHub">GH</button> <!-- custom button -->
  </span>
</div>
        <div id="editor"></div>
        <input type="hidden" name="content" id="content" bind:this={content} />
      </div>
      <div class="submit-buttons">
        {#if !data.post.published}
          <Button loading={saving === "save-draft"} class="save-draft" variant="tertiary" type="submit" size="small" name="draft">Save Draft</Button>
        <Button class="post-button" variant="tertiary" type="submit" size="small" name="publish" loading={saving === "publish"}>Publish</Button>
        {:else}
        <Button variant="tertiary" type="submit" size="small" name="update" loading={saving === "update"}>Save</Button>
        {/if}
      </div>
    </div>
  </form>
</div>

{#if dialogOpen}
  <Dialog
    class="floating-dialog"
    confirmText="Save"
    cancelText="Cancel"
    onCancel={closeTopicDialog}
    onConfirm={saveTopic}>
      <div class="add-topic-form">
        <TextField name="topic-name" bind:value={newTopicName}>
          {#snippet label()}
            <span class="label">Topic name</span>
          {/snippet}
        </TextField>
      </div>
  </Dialog >
  <div class="backdrop"></div>
{/if}

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h3 {
    text-align: center;
  }

  .post-form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .label {
    font-weight: 200;
    font-size: 0.875rem;
    color: var(--aura-label-text-color);
  }

  .form-header {
    display: flex;
    gap: 0.625rem;
    align-items: self-end;
  }

  .editor-container {
    background: white;
    border-radius: 0.313rem;

    :global(.ql-toolbar) {
      border-radius: 0.313rem 0.313rem 0 0;
    }

    #editor {
      height: 485px;
      border-radius: 0 0 0.313rem 0.313rem;
    }
  }

  .submit-buttons {
    display: flex;
    gap: 0.5rem;
    justify-content: end;
  }

  .add-topic-form {
    display: flex;
    gap: 0.5rem;
  }

  .image-upload {
    display: none;
  }

  :global(img.image-preview) {
    width: 100%;
    height: 10rem;
    object-fit: cover;

    &:not(.showImages) {
      display: none;
    }
  }

  :global(.aura-dropdown-wrapper.topic-dropdown) {
    min-width: 12.5rem!important;
  }

  :global(.aura-text-field-wrapper) {
    flex: 1;
    max-width: unset!important;
  }
</style>
