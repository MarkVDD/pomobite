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
    startTime: number | null;
    intervalId: number | null;
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
        settings: defaultSettings,
        startTime: null,
        intervalId: null
    };

    const {subscribe, update} = writable<PomodoroState>(defaultState);

    const clearCurrentInterval = (state: PomodoroState) => {
        if (state.intervalId !== null) {
            clearInterval(state.intervalId);
        }
        return {...state, intervalId: null, startTime: null};
    };

    return {
        subscribe,
        startTimer: () => {
            update(state => {
                const newState = clearCurrentInterval(state);
                const now = Date.now();
                const intervalId = window.setInterval(() => {
                    update(currentState => {
                        if (!currentState.isRunning || !currentState.startTime) return currentState;

                        const elapsed = Math.floor((Date.now() - currentState.startTime) / 1000);
                        const newTimer = (currentState.isBreak ? currentState.settings.breakTime : currentState.settings.workTime) - elapsed;

                        if (newTimer <= 0) {
                            const isBreak = !currentState.isBreak;

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

                            const nextState = clearCurrentInterval(currentState);
                            return {
                                ...nextState,
                                isBreak,
                                timer: isBreak ? currentState.settings.breakTime : currentState.settings.workTime,
                                isRunning: false
                            };
                        }

                        return {...currentState, timer: newTimer};
                    });
                }, 1000);

                return {
                    ...newState,
                    isRunning: true,
                    startTime: now,
                    intervalId
                };
            });
        },
        stopTimer: () => {
            update(state => ({
                ...clearCurrentInterval(state),
                isRunning: false
            }));
        },
        resetTimer: () => {
            update(state => ({
                ...clearCurrentInterval(state),
                timer: state.settings.workTime,
                isBreak: false,
                isRunning: false
            }));
        },
        updateSettings: (newSettings: PomodoroSettings) => {
            update(state => ({
                ...clearCurrentInterval(state),
                settings: newSettings,
                timer: newSettings.workTime,
                isBreak: false,
                isRunning: false
            }));
        }
    };
};

export const pomodoroStore = createPomodoroStore();