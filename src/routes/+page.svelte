<script lang="ts">
    import {onMount} from 'svelte';
    import {goto} from '$app/navigation';
    import userName from '$lib/stores/userName';

    onMount(() => {
        if ($userName?.trim()) {
            goto('/timer');
        }
    });

    function handleNext() {
        const name = $userName?.trim();
        if (name) {
            goto('/timer');
        }
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            handleNext();
        }
    }
</script>

<h1 class="text-3xl font-light text-white/90">What's your name?</h1>
<input
        bind:value={$userName}
        on:keydown={handleKeyDown}
        class="mt-6 w-80 p-3 text-center text-lg bg-black border border-white/20 rounded
               text-white/90 focus:outline-none focus:border-white/40 placeholder:text-white/40"
        placeholder="Enter your name"
/>
<button
        on:click={handleNext}
        class="mt-6 flex items-center justify-center gap-2 px-6 py-3 border border-white/20
               text-white/90 rounded hover:bg-white/5 transition-all duration-200"
>
    Next
</button>
