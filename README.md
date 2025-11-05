# Owphiyr Smart Home

Owphiyr Smart Home is a mobile-first Ionic + Vue application that allows residents to provision, manage, and monitor Owphiyr IoT devices such as **CIPA** smart door controllers and **Vigia** surveillance sensors. The app integrates with the Owphiyr cloud via OAuth 2.0, communicates with devices over Bluetooth Low Energy (BLE) during onboarding, and offers real-time status for connected hardware once it is online.

## Features

- **Secure authentication** &mdash; Redirects users to the Owphiyr OAuth 2.0 flow and persists access tokens locally once authorization succeeds.
- **Profile overview** &mdash; Displays the authenticated user's name and e-mail address retrieved from the backend API.
- **Device management**
  - Lists all paired CIPA door controllers with online/offline and door-open indicators, and allows triggering open/close actions directly from the list.
  - Provides infinite scrolling for large device inventories and a modal workflow to onboard additional CIPA or Vigia units.
- **Guided onboarding**
  - Collects device credentials together with Wi-Fi SSID/password before provisioning.
  - Establishes a BLE session with the hardware, transfers Wi-Fi credentials and provisioning tokens chunk-by-chunk, reboots the device, and confirms cloud connectivity.
- **Account utilities** &mdash; Offers e-mail verification reminders, the ability to resend verification links, and logout support.
- **Persistent storage layer** &mdash; Wraps Ionic Storage to cache OAuth tokens, device credentials, and BLE provisioning data across sessions.
- **API abstraction** &mdash; Configures Axios with Owphiyr headers, CSRF protection, and automatic token refresh/redirect handling.

## Project structure

```
├── src
│   ├── api/                # Axios instance with authentication and interceptors
│   ├── components/         # Reusable UI components
│   ├── logging/            # Winston integration for remote logging (Papertrail)
│   ├── router/             # Vue Router configuration + OAuth guard
│   ├── storage/            # Ionic Storage singleton wrapper
│   ├── store/              # Lightweight reactive stores for auth/device state
│   ├── views/              # Ionic pages (profile, devices, onboarding, settings)
│   ├── theme/              # Global Ionic theme variables
│   └── main.ts             # App bootstrap and deep-link handling
├── tests
│   ├── unit/               # Vitest unit tests (placeholders)
│   └── e2e/                # Cypress end-to-end test scaffolding
└── capacitor.config.ts     # Capacitor runtime configuration
```

## Prerequisites

- **Node.js** 18 or later (matching Vite 5 / Ionic Vue requirements)
- **npm** 9 or later
- Android Studio and an emulator or device if you want to run the Capacitor Android target
- Bluetooth Low Energy (BLE) capability on the target device for provisioning

## Getting started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure environment variables**
   - Copy `.env` and update the values to match your Owphiyr environment. The BLE characteristic UUIDs and API credentials must align with the firmware flashed on your devices.
   - For local development you may override `VITE_API_URL`, `VITE_API_CLIENT_ID`, and `VITE_API_CLIENT_SECRET` to point at a staging backend.
3. **Run the web app**
   - For a quick preview, launch Vite directly:
     ```bash
     npx vite --host 0.0.0.0 --port 5173
     ```
   - The provided `npm run serve` script is preconfigured for a specific LAN IP/port used in production demos. Adjust or override the `--host` and `--port` flags for your environment before using it.
4. **Run on Android (Capacitor)**
   ```bash
   npm run start
   ```
   This command opens the Android project, targets the `Pixel_2_API_35` emulator, and enables live reload on the configured host/port.

## Available scripts

| Command | Description |
| ------- | ----------- |
| `npm run serve` | Start Vite with Ionic live reload on a predefined network host. |
| `npm run build` | Type-check with `vue-tsc` and produce a production build. |
| `npm run preview` | Preview the Vite production build locally. |
| `npm run test:unit` | Execute Vitest unit tests (currently includes starter samples). |
| `npm run test:e2e` | Run Cypress end-to-end tests headlessly. |
| `npm run lint` | Format with Prettier and lint using ESLint. |
| `npm run start` | Launch the Android target via Capacitor with live reload. |

## Testing

- **Unit tests** use [Vitest](https://vitest.dev/) with Vue Test Utils. The repository ships with Ionic starter specs; expand them to cover your pages and composables.
- **End-to-end tests** are scaffolded with Cypress. Update the sample spec to reflect actual navigation flows once your backend and BLE services are available.

Run tests with:
```bash
npm run test:unit
npm run test:e2e
```

## BLE provisioning flow

1. The user enters device credentials and Wi-Fi details, which are cached in the `deviceStore` for use during provisioning.
2. The app initializes the BLE client, ensures Bluetooth is enabled, and scans for a device broadcasting the entered code.
3. After connecting, the app writes SSID, password, and the API-issued token across dedicated BLE characteristics, rebooting the device and waiting for it to reconnect to the cloud.
4. When the device reports as online via the REST API, the user is redirected back to the home dashboard.

## Troubleshooting

- **OAuth window does not open** &mdash; Ensure Capacitor Browser permissions are available and that the guard is invoked on a route requiring authentication.
- **Provisioning stalls at 0%** &mdash; Confirm that the device is advertising with the expected BLE name and that the UUIDs in `.env` match the firmware.
- **403 email verification errors** &mdash; The API interceptor redirects unverified accounts to the settings screen; use the "Send new verification request" button to trigger a new email.

## Logging

The project includes a Winston transport configured for SolarWinds Papertrail. To enable remote logging, supply valid Papertrail credentials and install the plugin in `main.ts` (currently not registered).

## License

This project is provided as-is within the Owphiyr ecosystem. Consult Owphiyr for licensing terms if you intend to redistribute or modify the application.
