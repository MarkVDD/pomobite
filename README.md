# Pomodoro Timer App

A simple and minimalistic Pomodoro Timer app built with Svelte. This app helps you manage your work and break intervals
effectively, following the Pomodoro technique.

## Features

- Set custom work and break durations
- Start, pause, and reset timers
- Receive optional notifications for break reminders
- Smooth navigation between screens
- Clean and responsive user interface

## Technologies Used

- **Svelte**: For the user interface and component-based development
- **PostHog**: For event tracking and user behavior analysis (manually implemented on key events)
- **Vite**: For fast development and build process
- **TypeScript**: For type safety and better developer experience

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MarkVDD/pomodoro-timer-app.git
   cd pomodoro-timer
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the app:
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Project Structure

- `src/lib/stores`: Contains the Svelte stores used for state management
- `src/lib/components`: Reusable Svelte components like the timer display and controls
- `src/routes`: Contains the pages of the application
- `src/lib/utils`: Utility functions, e.g., for handling notifications

## Acknowledgments

- Inspired by the Pomodoro technique
- Thanks to the Svelte and PostHog communities for their amazing tools

Feel free to reach out if you have any questions or suggestions. Enjoy using the app!