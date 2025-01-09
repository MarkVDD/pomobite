import {writable} from 'svelte/store';

interface PomodoroSettings {
    workTime: number;
    breakTime: number;
}

interface PomodoroState {
    timer: number;
    isRunning: boolean;
    isBreak: boolean;
    justTransitioned: boolean;
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
        justTransitioned: false,
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
                isRunning: false,
                justTransitioned: false
            }));
        },
        updateTimer: () => {
            update(state => {
                if (state.timer <= 0) {
                    const isBreak = !state.isBreak;
                    return {
                        ...state,
                        isBreak,
                        timer: isBreak ? state.settings.breakTime : state.settings.workTime,
                        isRunning: false,
                        justTransitioned: true
                    };
                }
                return {
                    ...state,
                    timer: state.timer - 1,
                    justTransitioned: false
                };
            });
        },
        updateSettings: (newSettings: PomodoroSettings) => {
            update(state => ({
                ...state,
                settings: newSettings,
                timer: newSettings.workTime,
                isBreak: false,
                isRunning: false,
                justTransitioned: false
            }));
        }
    };
};

export const pomodoroStore = createPomodoroStore();