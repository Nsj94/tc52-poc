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

        IntentFilter filter = new IntentFilter();
        filter.addAction("com.symbol.datawedge.api.RESULT_ACTION"); // match DataWedge output

        registerReceiver(new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String scannedData = intent.getStringExtra("com.symbol.datawedge.data_string");

                if (scannedData != null) {
                    String js = "window.dispatchEvent(new CustomEvent('zebraScan', { detail: '" + scannedData + "' }));";
                    bridge.getWebView().evaluateJavascript(js, null);
                }
            }
        }, filter);
    }
}