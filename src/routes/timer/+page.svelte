<script lang="ts">
    import {onMount, onDestroy} from 'svelte';
    import {browser} from '$app/environment';
    import {pomodoroStore} from '$lib/stores/pomodoro';
    import TimerDisplay from '$lib/components/TimerDisplay.svelte';
    import TimerControls from '$lib/components/TimerControls.svelte';
    import CustomTimingModal from '$lib/components/CustomTimingModal.svelte';
    import userName from '$lib/stores/userName';
    import {requestNotificationPermission} from "$lib/utils/notification";

    let showModal: boolean = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let customWorkTime: number = 25;
    let customBreakTime: number = 5;
    let notificationsEnabled = false;

    $: ({timer, isRunning, isBreak} = $pomodoroStore);

    onMount(async () => {
        if (!$userName) {
            goto('/');
        }

        if (browser) {
            notificationsEnabled = await requestNotificationPermission();
        }
    });

    const startTimer = () => {
        if (!isRunning) {
            pomodoroStore.startTimer();
            intervalId = setInterval(() => {
                pomodoroStore.updateTimer();
            }, 1000);
        }
    };

    const stopTimer = () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            pomodoroStore.stopTimer();
        }
    };

    const handleCustomTimings = ({detail}: CustomEvent<{ workTime: number; breakTime: number }>) => {
        const {workTime, breakTime} = detail;
        pomodoroStore.updateSettings({
            workTime: workTime * 60,
            breakTime: breakTime * 60
        });
    };

    onDestroy(() => {
        if (intervalId) {
            clearInterval(intervalId);
        }
    });
</script>

<h1 class="text-3xl font-light text-white/90">Hello, {$userName}!</h1>
<p class="mt-4 text-lg text-white/70">
    {isBreak ? "It's break time!" : "It's work time!"}
</p>

<TimerDisplay time={timer}/>

<TimerControls
        onStart={startTimer}
        onStop={stopTimer}
        onReset={() => pomodoroStore.resetTimer()}
        onCustomize={() => showModal = true}
/>

<CustomTimingModal
        bind:show={showModal}
        bind:workTime={customWorkTime}
        bind:breakTime={customBreakTime}
        on:save={handleCustomTimings}
/>

{#if !notificationsEnabled}
    <div class="fixed bottom-4 right-4 p-4 bg-zinc-800 border border-white/10 rounded-lg text-white/70">
        <p>Enable notifications for break reminders</p>
        <button
                class="mt-2 text-white/90 underline hover:no-underline"
                on:click={() => requestNotificationPermission()}
        >
            Enable
        </button>
    </div>
{/if}
