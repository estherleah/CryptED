# CryptED

An educational cryptography and cybersecurity app, created using React Native, Redux and Firebase.

## Installation

Follow the instructions from [React Native: Building Projects with Native Code](https://facebook.github.io/react-native/docs/getting-started.html) to install the required dependencies, React Native CLI, Android Studio and to set up an Android Virtual Device.

1. Clone this repository: `git clone https://github.com/estherleah/CryptED.git`
2. Navigate to the newly created project folder: `cd CryptED`
3. Install the required node modules: `npm install`
4. Link any modules that require it with React Native: `react-native link`
5. Ensure an Android Virtual Device is running!
6. Run CryptED in the Android Virtual Device: `react-native run-android`

This project was developed on Windows and has only been tested on Android devices.

## Features
* User can log in to the system with an email and password.
* User can create profile.
* User can request password reset.
* User can log out of the system.
* User can see list of available puzzles to solve.
* User can switch between different categories of puzzles: cryptography, cybersecurity and logic.
* User can pick an individual puzzles to solve.
* User can solve a puzzle.
* User can see his/her score.
* User can view information about concepts introduced by the puzzle.
* User can add a puzzle to the system.
* User added puzzle checked by admin.
* User can only view puzzles already checked by admin.
* User can view leader board of top scores.
* User can change profile details.
* User can become admin (if fulfil criteria).
* Admin can add puzzle directly to system.
* Admin can check puzzles added by non-admin users.
* Admin can see scores of all other users.
* Admin can remove his/her admin status.
* User's score increments if correctly solve a puzzle.
* User's score does not increment if previously solved the puzzle.