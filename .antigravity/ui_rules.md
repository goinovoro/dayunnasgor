# Otokowok UI Rules

When working on UI components for the POS or KDS applications, you MUST adhere strictly to the following rules:

1. **Mobile-First Design**: The interface is exclusively for vertical mobile layouts (smartphones). Do not design for desktop or large screens.
2. **Touch Targets**: All interactive elements (buttons, list items, tabs) MUST have a **minimum height and width of 48px** to ensure they are easily tappable in a fast-paced environment.
3. **No Hover States**: Do not rely on `hover:` CSS states for functionality or critical visual feedback. Users are on touch devices where hover does not exist. Use active states (`active:`) instead.
4. **Swipe-Friendly**: Implement swipe gestures (like swipe-to-bump) where applicable instead of requiring precise taps for frequent actions.
5. **High Contrast & Dark Mode**: The kitchen environment is harsh. Use high-contrast color schemes and ensure the UI works flawlessly in dark mode.
6. **Robust Feedback**: Provide immediate visual feedback for touch interactions (e.g., button press animations, loading states).
