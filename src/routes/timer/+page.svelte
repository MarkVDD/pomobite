<script lang="ts">
    import {onMount, onDestroy} from 'svelte';
    import {browser} from '$app/environment';
    import {pomodoroStore} from '$lib/stores/pomodoro';
    import TimerDisplay from '$lib/components/TimerDisplay.svelte';
    import TimerControls from '$lib/components/TimerControls.svelte';
    import CustomTimingModal from '$lib/components/CustomTimingModal.svelte';

    let userName: string = 'User';
    let showModal: boolean = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let customWorkTime: number = 25;
    let customBreakTime: number = 5;

    let audio = {
        work: null as HTMLAudioElement | null,
        break: null as HTMLAudioElement | null
    };

    $: ({timer, isRunning, isBreak, justTransitioned} = $pomodoroStore);

    onMount(() => {
        if (browser) {
            userName = localStorage.getItem('userName') || 'User';
            // Initialize audio elements
            audio.work = new Audio('/sounds/work-start.mp3');
            audio.break = new Audio('/sounds/break-start.mp3');
        }
    });

    // Watch for transitions and play sounds
    $: if (justTransitioned) {
        const soundToPlay = isBreak ? audio.break : audio.work;
        soundToPlay?.play().catch(error => console.error('Error playing sound:', error));
    }

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

<div class="flex flex-col items-center justify-center min-h-screen bg-black">
    <h1 class="text-3xl font-light text-white/90">Hello, {userName}</h1>

    <TimerDisplay time={timer}/>

    <TimerControls
            onStart={startTimer}
            onStop={stopTimer}
            onReset={() => pomodoroStore.resetTimer()}
            onCustomize={() => showModal = true}
    />

    <p class="mt-4 text-lg text-white/70">
        {isBreak ? "It's break time!" : "It's work time!"}
    </p>

    <CustomTimingModal
            bind:show={showModal}
            bind:workTime={customWorkTime}
            bind:breakTime={customBreakTime}
            on:save={handleCustomTimings}
    />

    <!-- Hidden audio elements -->
    <div class="hidden" aria-hidden="true">
        <audio id="workSound" preload="auto">
            <source src="/sounds/work-start.mp3" type="audio/mpeg">
        </audio>
        <audio id="breakSound" preload="auto">
            <source src="/sounds/break-start.mp3" type="audio/mpeg">
        </audio>
    </div>
</div>