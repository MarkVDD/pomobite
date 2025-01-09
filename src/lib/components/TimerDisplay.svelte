<script lang="ts">
    import {formatTime} from "$lib/utils/time";

    export let time: number;
</script>

<div class="mt-8 mb-8 flex items-center justify-center w-48 h-48 rounded-full border border-white/10 bg-white/5">
    <span class="text-5xl font-light text-white/90 font-mono">{formatTime(time)}</span>
</div>