<script>
  import { fly } from 'svelte/transition';
  let {open =false, onClose = () => {}} = $props()
</script>

{#if open}
  <div class="modal-overlay" on:click={() => onClose()}>
    <div class="modal" on:click|stopPropagation transition:fly={{y:8, duration:180}}>
      <slot />
    </div>
  </div>
{/if}
