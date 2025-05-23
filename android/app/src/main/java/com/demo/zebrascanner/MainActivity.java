package com.demo.zebrascanner;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Register to receive DataWedge scan results
        IntentFilter filter = new IntentFilter();
        filter.addAction("com.symbol.datawedge.api.RESULT_ACTION");
        filter.addCategory(Intent.CATEGORY_DEFAULT);

        registerReceiver(new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                if (intent != null && intent.getAction() != null &&
                        intent.getAction().equals("com.symbol.datawedge.api.RESULT_ACTION")) {

                    String scannedData = intent.getStringExtra("com.symbol.datawedge.data_string");

                    if (scannedData != null && !scannedData.trim().isEmpty()) {
                        // Escape single quotes for safe JS injection
                        String safeData = scannedData.replace("'", "\\'");

                        String js = "window.dispatchEvent(new CustomEvent('zebraScan', { detail: '" + safeData + "' }));";
                        bridge.getWebView().post(() ->
                            bridge.getWebView().evaluateJavascript(js, null)
                        );
                    }
                }
            }
        }, filter);
    }
}