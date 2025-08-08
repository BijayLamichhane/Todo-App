# Progress Bar Component

A fully functional, customizable progress bar component built with React, TypeScript, and Tailwind CSS.

## Features

- ✅ **Fully Responsive**: Works on all screen sizes
- ✅ **Multiple Variants**: Default, Success, Warning, and Danger themes
- ✅ **Interactive Demo**: Live demonstration with controls
- ✅ **Smooth Animations**: CSS transitions for smooth progress updates
- ✅ **Customizable**: Flexible props for different use cases
- ✅ **Accessible**: Proper ARIA attributes and keyboard navigation
- ✅ **TypeScript**: Fully typed with comprehensive interfaces

## Usage

### Basic Usage

```tsx
import { ProgressBar } from "~/components/ProgressBar";

<ProgressBar label="All tasks" completed={2} total={3} />;
```

### With Custom Variant

```tsx
<ProgressBar
  label="Project Progress"
  completed={7}
  total={10}
  variant="success"
/>
```

### Without Ratio Display

```tsx
<ProgressBar
  label="Daily Steps"
  completed={8500}
  total={10000}
  showRatio={false}
/>
```

## Props

| Prop        | Type                                              | Default       | Description                             |
| ----------- | ------------------------------------------------- | ------------- | --------------------------------------- |
| `label`     | `string`                                          | `"All tasks"` | The label displayed on the left side    |
| `completed` | `number`                                          | -             | Number of completed items               |
| `total`     | `number`                                          | -             | Total number of items                   |
| `className` | `string`                                          | -             | Additional CSS classes                  |
| `showRatio` | `boolean`                                         | `true`        | Whether to show the ratio (e.g., "2/3") |
| `variant`   | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'`   | Color variant                           |

## Variants

- **default**: Purple theme (matches project's primary color)
- **success**: Green theme for completed tasks
- **warning**: Yellow theme for warnings
- **danger**: Red theme for errors or critical states

## Examples

The component includes a comprehensive demo page at the home route (`/`) that showcases:

1. **Interactive Progress Bar**: Live demo with increment/decrement controls
2. **Variant Examples**: All four color variants
3. **Custom Examples**: Different use cases and configurations

## Styling

The component uses Tailwind CSS classes and integrates with the project's design system:

- Uses custom CSS variables for consistent theming
- Responsive design with proper spacing
- Smooth transitions and hover effects
- Glow effects for visual appeal

## Accessibility

- Proper semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast ratios for visibility
