<script lang="ts">
    import Pause from "lucide-svelte/icons/pause";
    import Play from "lucide-svelte/icons/play";
    import RotateCcw from "lucide-svelte/icons/rotate-ccw";
    import Settings from "lucide-svelte/icons/settings";

    export let onStart: () => void;
    export let onStop: () => void;
    export let onReset: () => void;
    export let onCustomize: () => void;
    export let isRunning: boolean;
</script>

<div class="mt-6 flex flex-wrap justify-center gap-3 px-4 sm:px-0">
    <button
            class="min-w-[100px] flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3
               border border-white/20 text-white/90 rounded-lg
               hover:bg-white/5 active:bg-white/10
               transition-all duration-200
               touch-manipulation"
            on:click={isRunning ? onStop : onStart}
    >
        {#if isRunning}
            <Pause class="w-4 h-4"/>
            <span class="hidden sm:inline">Stop</span>
        {:else}
            <Play class="w-4 h-4"/>
            <span class="hidden sm:inline">Start</span>
        {/if}
    </button>

    <button
            class="min-w-[100px] flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3
               border border-white/20 text-white/90 rounded-lg
               hover:bg-white/5 active:bg-white/10
               transition-all duration-200
               touch-manipulation"
            on:click={onReset}
    >
        <RotateCcw class="w-4 h-4"/>
        <span class="hidden sm:inline">Reset</span>
    </button>

    <button
            class="min-w-[100px] flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3
               border border-white/20 text-white/90 rounded-lg
               hover:bg-white/5 active:bg-white/10
               transition-all duration-200
               touch-manipulation"
            on:click={onCustomize}
    >
        <Settings class="w-4 h-4"/>
        <span class="hidden sm:inline">Custom</span>
    </button>
</div>