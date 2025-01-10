<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    export let show = false;
    export let workTime: number;
    export let breakTime: number;

    const dispatch = createEventDispatcher();

    const handleSave = () => {
        dispatch('save', {workTime, breakTime});
        show = false;
    };
</script>

{#if show}
    <div class="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
        <div class="bg-zinc-900 p-6 rounded-lg border border-white/10 w-96">
            <h2 class="text-xl font-light text-white/90 mb-4 font-bold">Custom Timings</h2>
            <div class="flex flex-col gap-4">
                <div>
                    <label for="workTime" class="text-white/70 text-sm">Work Time (minutes)</label>
                    <input
                            id="workTime"
                            type="number"
                            min="1"
                            max="60"
                            bind:value={workTime}
                            class="mt-1 w-full p-2 bg-black/50 border border-white/10 rounded text-white/90 focus:outline-none focus:border-white/30"
                    />
                </div>
                <div>
                    <label for="breakTime" class="text-white/70 text-sm">Break Time (minutes)</label>
                    <input
                            id="breakTime"
                            type="number"
                            min="1"
                            max="60"
                            bind:value={breakTime}
                            class="mt-1 w-full p-2 bg-black/50 border border-white/10 rounded text-white/90 focus:outline-none focus:border-white/30"
                    />
                </div>
                <div class="flex justify-end gap-4 mt-4">
                    <button
                            class="px-4 py-2 text-white/70 hover:text-white/90"
                            on:click={() => show = false}
                    >
                        Cancel
                    </button>
                    <button
                            class="px-4 py-2 border border-white/20 text-white/90 rounded hover:bg-white/5"
                            on:click={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}