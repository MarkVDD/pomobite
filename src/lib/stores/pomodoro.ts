import {writable} from 'svelte/store';
import {sendNotification} from "$lib/utils/notification";

interface PomodoroSettings {
    workTime: number;
    breakTime: number;
}

interface PomodoroState {
    timer: number;
    isRunning: boolean;
    isBreak: boolean;
    settings: PomodoroSettings;
}

const createPomodoroStore = () => {
    const defaultSettings: PomodoroSettings = {
        workTime: 25 * 60,
        breakTime: 5 * 60
    };

    const defaultState: PomodoroState = {
        timer: defaultSettings.workTime,
        isRunning: false,
        isBreak: false,
        settings: defaultSettings
    };

    const {subscribe, set, update} = writable<PomodoroState>(defaultState);

    return {
        subscribe,
        startTimer: () => {
            update(state => ({...state, isRunning: true}));
        },
        stopTimer: () => {
            update(state => ({...state, isRunning: false}));
        },
        resetTimer: () => {
            update(state => ({
                ...state,
                timer: state.settings.workTime,
                isBreak: false,
                isRunning: false
            }));
        },
        updateTimer: () => {
            update(state => {
                if (state.timer <= 0) {
                    const isBreak = !state.isBreak;

                    if (isBreak) {
                        sendNotification("Time for a break! 🎉", {
                            body: "Good job! Take some time to rest.",
                            icon: "/favicon.png",
                            silent: false
                        });
                    } else {
                        sendNotification("Break's over! 💪", {
                            body: "Let's get back to work!",
                            icon: "/favicon.png",
                            silent: false
                        });
                    }

                    return {
                        ...state,
                        isBreak,
                        timer: isBreak ? state.settings.breakTime : state.settings.workTime,
                        isRunning: false
                    };
                }
                return {...state, timer: state.timer - 1};
            });
        },
        updateSettings: (newSettings: PomodoroSettings) => {
            update(state => ({
                ...state,
                settings: newSettings,
                timer: newSettings.workTime,
                isBreak: false,
                isRunning: false
            }));
        }
    };
};

export const pomodoroStore = createPomodoroStore();