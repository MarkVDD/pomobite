import posthog from 'posthog-js'
import {browser} from '$app/environment';

export const load = async () => {

    if (browser) {
        posthog.init(
            import.meta.env.VITE_POSTHOG_API_KEY,
            {
                api_host: import.meta.env.VITE_POSTHOG_API_HOST,
                capture_pageview: false,
                capture_pageleave: false
            }
        )
    }
    return
};