<script lang="ts">
    export let onStart: () => void;
    export let onStop: () => void;
    export let onReset: () => void;
    export let onCustomize: () => void;
</script>

<div class="mt-6 flex gap-4">
    <button
            class="px-6 py-2 border border-white/20 text-white/90 rounded hover:bg-white/5 transition-all duration-200"
            on:click={onStart}
    >
        Start
    </button>
    <button
            class="px-6 py-2 border border-white/20 text-white/90 rounded hover:bg-white/5 transition-all duration-200"
            on:click={onStop}
    >
        Stop
    </button>
    <button
            class="px-6 py-2 border border-white/20 text-white/90 rounded hover:bg-white/5 transition-all duration-200"
            on:click={onReset}
    >
        Reset
    </button>
    <button
            class="px-6 py-2 border border-white/20 text-white/90 rounded hover:bg-white/5 transition-all duration-200"
            on:click={onCustomize}
    >
        Custom
    </button>
</div>