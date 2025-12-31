# Liquid Glass Weather

**Liquid Glass Weather** is a modern, high-performance mobile weather application built with **React Native** and **Expo**. The app merges real-time meteorological data with a sophisticated **Glassmorphism** aesthetic, providing a seamless and visually captivating user experience.

## Screenshots

<p align="center">
  <img src="./assets/ScreenshotMainUA.jpg" width="300" title="Main Screen UA">
  <img src="./assets/ScreenshotSettingsUA.jpg" width="300" title="Settings">
  <img src="./assets/ScreenshotForecastUA.jpg" width="300" title="Forecast & Charts UA">
  <img src="./assets/ScreenshotMainEN.jpg" width="300" title="Main Screen EN">
  <img src="./assets/ScreenshotSettingsEN.jpg" width="300" title="Settings EN">
  <img src="./assets/ScreenshotForecastEN.jpg" width="300" title="Forecast & Charts EN">
  <img src="./assets/ScreenshotSelectLang.jpg" width="300" title="Select language modal window">
</p>

---

## Key Features

* *** Real-time Geolocation:** Automatic weather updates based on the user's current coordinates.
* *** Glassmorphism UI:** Implements `expo-blur` and `linear-gradient` to create a semi-transparent frosted glass effect.
* *** Dynamic Data Visualization:** Interactive temperature charts for the 7-day forecast using `react-native-gifted-charts`.
* *** Personalized Experience:** * **Content Toggle:** Choose which weather metrics (humidity, wind speed, etc.) to display.
    * **Language Switching:** Full support for English and Ukrainian.
* *** Persistent Storage:** Integration with **AsyncStorage** to remember user preferences (language and UI settings) even after the app is closed.

---

## Technical Stack

* **Framework:** React Native (Expo)
* **Navigation:** Expo Router (Type-safe, file-based routing)
* **State Management:** React Context API (Global weather & settings state)
* **Persistence:** `@react-native-async-storage/async-storage`
* **API:** Open-Meteo API (WMO-compliant weather data)
* **Graphics & UI:** * `expo-linear-gradient` for dynamic atmospheric backgrounds.
    * `expo-blur` for the frosted glass component library.
    * `@expo/vector-icons` (Material Community Icons).

---

## Architecture & Project Structure

The project follows a modular architecture for better maintainability and scalability:

```
├── app/                       # Expo Router routes (Tabs & Root Layout)
│   ├── (tabs)/                # Main navigation (Today, Forecast, Settings)
│   ├── _layout.tsx            # Root layout wrapping the App with Providers
│   ├── _SettingsContext.tsx   # Context for settings
│   └── _WeatherContext.tsx    # Context for weather information
├── src/
│   ├── components/            # Reusable UI components (GlassCard, DetailItem)
│   ├── context/               # Weather & Settings Contexts
│   ├── hooks/                 # Custom hooks (useWeather, useUserLocation)
│   ├── services/              # API & Storage service layers
│   ├── utils/                 # WMO Interpretation, date formatting, etc.
│   └── types/                 # TypeScript definitions
```

## Key Implementation Details

* **Global State & Persistence**
The app utilizes a centralized Context API provider to prevent "Prop Drilling". By integrating AsyncStorage, user preferences like selected language or UI layout are persisted locally. This ensures a consistent user experience without requiring a backend account.

* **Weather Interpretation Engine**
A custom utility maps raw WMO codes from the API to specific visual assets. This engine dynamically changes the app's color palette, icons, and descriptions based on real-time atmospheric conditions (e.g., changing from a sunny gold gradient to a stormy deep blue).


## Get started

1. ```bash
   git clone [https://github.com/yourusername/liquid-glass-weather.git](https://github.com/andriiLink/weather-app.git)
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```

4. Scan the QR code with the Expo Go app on your iOS/Android device to see it in action.
