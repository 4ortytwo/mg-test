# mg-test

## Init

```console
yarn
```

## Usage

```console
cd android && ./gradlew bundleRelease
..
npx react-native run-android --variant=release
```

An APK file will be built and stored in `mg-test/android/app/build/outputs/apk/release`

## Highlights
- Architecture: 
   - The project is following the feature-first idea of Ducks architecture: https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/

## To improve:

- Test coverage
- Robust error handling
