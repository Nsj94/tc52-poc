NOTE: Use Node 22

## How to Run the Project

1. Build the project:
    ```
    ng build
    ```

2. Copy the build to Capacitor:
    ```
    npx cap copy
    ```

3. Sync with the Android platform:
    ```
    npx cap sync android
    ```

4. Open the project in Android Studio:
    ```
    npx cap open android
    ```

5. Connect your Android/TC52 device to your computer via USB. Ensure that USB debugging is enabled on the device.

   - To enable USB debugging, go to **Settings** > **About phone** > tap **Build number** 7 times to unlock developer options. Then go to **Settings** > **Developer options** and enable **USB debugging**.

   - If you are using a TC52 device, ensure that the device is in "Developer Mode" and that you have installed the necessary drivers for your computer to recognize the device.

6. **Configure the TC52 device:**  
   Follow the device configuration steps outlined in [OneTimeSetup.md](./OneTimeSetup.md) to set up your TC52 device before deploying the app.

7. In Android Studio, click the **Run** button to deploy the app to your device.
