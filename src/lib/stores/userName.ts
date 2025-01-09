import {browser} from '$app/environment';
import {writable} from 'svelte/store';

const defaultValue = '';

// Load the initial value from localStorage if running in the browser
const initialValue = browser ? localStorage.getItem('userName') ?? defaultValue : defaultValue;

const userName = writable<string>(initialValue);

// Sync the store value with localStorage
userName.subscribe((value) => {
    if (browser) {
        localStorage.setItem('userName', value);
    }
});

export default userName;
