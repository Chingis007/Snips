# Snips

A TikTok-style video streaming mobile application built with React Native and Expo.

## Installation

### Prerequisites

- Node.js (v20.19.4 or higher)
- yarn
- Expo Go app (for testing on physical devices)
- iOS Simulator (Mac only) or Android Emulator

### Setup

1. Clone the repository and navigate to the project directory:

```bash
cd snips
```

2. Install dependencies:

```bash
yarn
```

3. Start the development server:

```bash
yarn start
```

4. Run on your preferred platform:

```bash
# iOS (Mac only)
yarn run ios

# Android
yarn run android

```

Alternatively, scan the QR code from the terminal using the Expo Go app on your physical device.

## Technical Stack

### Core Framework

- **React Native (0.81.5)** - Cross-platform mobile development
- **Expo (SDK 54)** - Development platform and tooling
- **TypeScript (5.9.2)** - Type safety and better DX
- **Expo Router (6.0)** - File-based routing with typed routes

### State Management & Data Fetching

- **TanStack React Query (5.90)** - Server state management, caching, and data synchronization

### UI & Animation

- **React Native Reanimated (4.1)** - High-performance animations (CrossFade component)
- **React Native Gesture Handler (2.28)** - Native gesture handling (Home screen ScrollView component)
- **Expo Linear Gradient** - Gradient styling (Tabs gradient)
- **React-native-svg** - Custom icons

### Video Playback

- **Expo Video (3.0)** - Modern video player with TikTok-like controls
- Custom implementation with tap-to-play/pause functionality (Up to date for SDK 54)

### Performance Optimizations

- **Shopify FlashList (2.2)** - High-performance lists with better memory efficiency
- **React Compiler** (Experimental) - Automatic memoization and optimization
- **React Native New Architecture** - Enabled for improved performance

### Image Handling

- **Expo Image (3.0)** - Optimized image component with caching and blur hash support
- **React Native SVG** - SVG rendering

### Navigation

- **React Navigation (7.1)** - Navigation infrastructure
- **Bottom Tabs** - Tab-based navigation pattern

### Development Tools

- **ESLint (9.25)** - Code quality and consistency
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Expo Config Plugins** - Custom native configuration

## Project Structure

```
snips/
├── src/
│   ├── design/          # Design system components (Card, Icon, etc.)
│   ├── features/        # Feature modules (home, feed)
│   │   ├── home/       # Home screen with carousel sections
│   │   └── feed/       # TikTok-like feed screen
│   └── app/            # App entry point and routing
├── assets/             # Images, fonts, and static resources
└── app.json           # Expo configuration
```

## Key Features

- **TikTok-style Video Feed** - Swipeable full-screen video cards with autoplay
- **Content Discovery** - Multiple carousel sections (Top 10, Drama, Romance, etc.)
- **Smart Video Playback** - Automatic play/pause based on visibility
- **Responsive Design** - Aspect ratio-based layouts with no magic numbers
- **Type-Safe API** - Structured data transformation with TypeScript
- **Optimized Lists** - FlashList for smooth scrolling with large datasets

## Architecture Decisions

### Why Expo?

- Simplified development workflow and native module integration
- Over-the-air updates capability
- Excellent developer experience with hot reload
- Built-in support for common native features

### Why React Query?

- Automatic caching and background refetching
- Request deduplication
- Optimistic updates support
- Better separation of concerns (server state vs UI state)

### Why FlashList over FlatList?

- 5-10x better performance on large lists
- Lower memory footprint
- Recycling of list items for efficiency
- Essential for smooth video scrolling experience
- FlashList is now the recommended default for serious production apps

### Why Expo Video over Expo AV?

- Modern API with better performance
- Improved memory management
- Better support for newer platforms3
- Active development and maintenance

## Development Commands

```bash
yarn start          # Start Expo development server
yarn run android    # Run on Android device/emulator
yarn run ios        # Run on iOS simulator (Mac only)
yarn run lint       # Run ESLint
```
