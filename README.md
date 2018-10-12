# iTAD Tablet Application 3

This project is the third iteration of the iTAD Tablet Application. The project uses React Native to create a native Android application to be run on a tablet mounted on iTAD.

## Environment Setup

Clone the project. From a command line:

```
git clone https://gitlab.com/itad2016/TabletApp3.git
```

Change directory into the project:

```
cd TabletApp3
```

Install all Node dependencies:

```
npm install
```

Run the React Native development server:

```
npm start
```

In another terminal window, from the `TabletApp3` directory, install the Android app in debug mode:

```
npm run run-android
```

## Known Issue: NPE in WebRTCModule/GetUserMediaImpl.java:getUserVideo

With React Native >~v0.49.x, the `react-native-webrtc` module to implement WebRTC in the native Android environment throws a NPE whenever it's used. An [open issue](https://github.com/oney/react-native-webrtc/issues/413) has been raised against `react-native-webrtc`. To resolve this issue, follow the instructions in the issue:

After `npm install`, in `android/src/main/java/com/oney/WebRTCModule/GetUserMediaImpl`, change:

```
        // Fall back to defaults if keys are missing.
        int width
                = videoConstraintsMandatory.hasKey("minWidth")
                ? videoConstraintsMandatory.getInt("minWidth")
                : DEFAULT_WIDTH;
        int height
                = videoConstraintsMandatory.hasKey("minHeight")
                ? videoConstraintsMandatory.getInt("minHeight")
                : DEFAULT_HEIGHT;
        int fps
                = videoConstraintsMandatory.hasKey("minFrameRate")
                ? videoConstraintsMandatory.getInt("minFrameRate")
                : DEFAULT_FPS;
```

to:


```
    int width, height, fps;
    // Fall back to defaults if keys are missing.
    if (videoConstraintsMandatory != null) {
         width
                = videoConstraintsMandatory.hasKey("minWidth")
                ? videoConstraintsMandatory.getInt("minWidth")
                : DEFAULT_WIDTH;
        height
                = videoConstraintsMandatory.hasKey("minHeight")
                ? videoConstraintsMandatory.getInt("minHeight")
                : DEFAULT_HEIGHT;
        fps
                = videoConstraintsMandatory.hasKey("minFrameRate")
                ? videoConstraintsMandatory.getInt("minFrameRate")
                : DEFAULT_FPS;
    } else {
        width = DEFAULT_WIDTH;
        height = DEFAULT_HEIGHT;
        fps = DEFAULT_FPS;
    }
```
