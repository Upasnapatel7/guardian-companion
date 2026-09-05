# Guardian Companion

Product: Women’s Safety & Behavioral Risk App

Description:
A privacy-first safety app that helps women recognize concerning behavior, stay connected, safely exit situations, and get help—before a situation escalates.

Key Features:

AI Behavioral Analyzer — analyzes messages/screenshots for patterns like manipulation, coercive control, threats, stalking, and boundary violations.

Pattern Library — educates users about behavioral warning signs.

Trusted Circle — trusted contacts for discreet alerts.

Exit Window — timed safety check-ins with escalation if the user doesn’t respond.

One-Tap HELP — sends an emergency alert and location.

Room Check — practical hidden-camera/secret-recording awareness checklist for hotels/private spaces.

Post-Separation Check — helps identify concerning behavior after a breakup.

Get Help — emergency services, cybercrime reporting, women’s helplines, and relevant resources.

Architecture:
React + Vite + Tailwind → Frontend
Firebase Auth + Firestore + Cloud Functions → Backend
Gemini API → Behavioral analysis
FCM/SMS → Trusted-contact alerts
Browser Geolocation → Location sharing
India-focused resource layer → Emergency/support services

Core Flow:
Recognize → Stay Connected → Get Out → Get Help

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6bddb43c-51b4-4ba3-8a12-517c52b3f7cf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
