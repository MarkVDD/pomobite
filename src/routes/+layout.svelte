<script>
    import '../app.css';
    import {pomodoroStore} from '$lib/stores/pomodoro';
    import {formatTime} from '$lib/utils/time';
    import {browser} from "$app/environment";
    import posthog from "posthog-js";

    let {children} = $props();

    export const load = async () => {

        if (browser) {
            posthog.init(
                'phc_4tZINr2yvf43MmLi358AOmCcXhWEZFnEGujgdPZTiLF',
                {
                    api_host: 'https://eu.i.posthog.com',
                    person_profiles: 'always',
                }
            )
        }
    };

    $effect(() => {
        if (browser) {
            const {timer, isBreak} = $pomodoroStore;
            const formattedTime = formatTime(timer);
            const status = isBreak ? 'Break' : 'Work';
            document.title = timer > 0 ? `${formattedTime} - ${status} | PomoBite` : 'PomoBite';
        }
    });
</script>

<svelte:head>
    <title>PomoBite - Simple and Effective Pomodoro Timer</title>
    <meta name="description"
          content="PomoBite is a minimalist Pomodoro timer that helps you stay focused and productive with customizable work and break intervals."/>
    <meta name="keywords"
          content="pomodoro timer, productivity tool, time management, focus timer, work timer, study timer"/>
    <meta property="og:title" content="PomoBite - Simple and Effective Pomodoro Timer"/>
    <meta property="og:description"
          content="Boost your productivity with PomoBite's minimalist Pomodoro timer. Customizable work and break intervals to help you stay focused."/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="https://yourwebsite.com/"/>
    <meta property="og:image" content="https://yourwebsite.com/og-image.png"/>
    <meta property="og:site_name" content="PomoBite"/>
    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:title" content="PomoBite - Simple and Effective Pomodoro Timer"/>
    <meta name="twitter:description" content="Boost your productivity with PomoBite's minimalist Pomodoro timer."/>
    <meta name="twitter:image" content="https://yourwebsite.com/twitter-image.png"/>
    <link rel="icon" type="image/png" href="/favicon.png"/>
    <link rel="canonical" href="https://yourwebsite.com/"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="theme-color" content="#000000"/>
</svelte:head>

<div class="flex flex-col min-h-screen bg-black">
    <div class="flex-grow flex flex-col items-center justify-center">
        {@render children?.()}
    </div>
    <footer class="footer">
        <div class="icons">
            <a href="https://github.com/MarkVDD/pomodoro-timer-app" target="_blank" rel="noopener noreferrer"
               aria-label="GitHub">
                <img src="/github.svg" alt="GitHub" loading="lazy"/>
            </a>
            <a href="https://www.buymeacoffee.com/yourusername" target="_blank" rel="noopener noreferrer"
               aria-label="Buy Me a Coffee">
                <img src="/coffee.svg" alt="Buy Me a Coffee" loading="lazy"/>
            </a>
        </div>
        <span class="footer-text">&copy; {new Date().getFullYear()} PomoBite</span>
    </footer>
</div>

<style>
    .footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #000;
        color: #fff;
        padding: 1rem;
        gap: 1rem;
    }

    .icons {
        display: flex;
        gap: 1rem;
    }

    .icons img {
        width: 32px;
        height: 32px;
    }

    .footer-text {
        font-size: 1rem;
    }
</style>
