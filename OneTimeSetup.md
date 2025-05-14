# ✅ One-Time Setup on Zebra TC52

Follow these steps to configure your Zebra TC52 for barcode scanning with your app.

---

## 1. Open the DataWedge App

- Go to the app drawer.
- Launch the **DataWedge** app (Zebra system app).

---

## 2. Create a New Profile for Your App

- Tap the hamburger menu (☰) → **New Profile**.
- Name the profile: `AngularScannerApp`.

---

## 3. Associate the Profile with Your App

- In the profile settings, go to **Associated apps**.
- Tap **Add new app/activity**.
- Set:
    - **Package name:** e.g., `com.demo.zebrascanner`  
        *(This should match what you used in `npx cap init`)*
    - **Activity:** `*` (wildcard)

---

## 4. Enable Barcode Input

- In the profile, tap **Input** → **Barcode input**.
- Ensure it’s **Enabled**.

---

## 5. Enable Intent Output (for Receiving Scan Results)

- Tap **Output** → **Intent output**.
- Enable it.
- Set the following:
    - **Intent action:** `com.zebra.scanner.ACTION`
    - **Intent delivery:** *Start Activity* (or *Broadcast* if using a receiver)
    - **Intent category:** `android.intent.category.DEFAULT`
    - **Send data as string**

*This ensures Zebra sends scan data back to your app via intent.*

---

## 6. Enable API Access for Scan Trigger

- Go to **DataWedge** → **Settings** → **Enable DataWedge API** → **On**.
- Also ensure **Intent-based API** is enabled in the profile.

---

## 🔁 Final Step: Restart Your App

- After configuring the profile, close and reopen your app on the TC52.
- Tap the **Trigger Scan** button.
- You should hear the scanner beep and see form fields populate.

