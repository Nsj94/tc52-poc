import { AfterViewInit, Component } from '@angular/core';
declare const EB: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {

  scannedHtml = '';
  tableHtml   = '';

  ngAfterViewInit() {
    // once the view is ready, start listening
    this.registerIntent();
  }

  private myIntentListenerCallback = (intentData: any) => {
    // reset table
    this.tableHtml = '';

    if (!intentData) { return; }

    const { action, intentType, data } = intentData;
    let out = '';

    if (action === 'com.symbol.dw.action') {
      out = `
        <b>Scanned Data:</b><br>
        Intent Type: ${intentType}<br>
        Intent Action: ${action}<br>
        Decode Source: ${data['com.symbol.datawedge.source']}<br>
        Label Type: ${data['com.symbol.datawedge.label_type']}<br>
        Data: ${data['com.symbol.datawedge.decode_data']}<br>
        Data String: ${data['com.symbol.datawedge.data_string']}<br>
        Mode: ${data['com.symbol.datawedge.decoded_mode']}<br>
      `;
    }
    else if (action === 'com.symbol.datawedge.api.RESULT_ACTION') {
      if (data['com.symbol.datawedge.api.RESULT_GET_ACTIVE_PROFILE']) {
        out = `
          <b>Active DW Profile:</b>
          ${data['com.symbol.datawedge.api.RESULT_GET_ACTIVE_PROFILE']}
        `;
      }
    }
    else if (action === 'com.symbol.dwss.action') {
      // handle SimulScan
      const ss = data;
      out = `
        <u><b>${ss['com.symbol.datawedge.simulscan_template_name']} SimulScan</b></u><br>
        Intent Type: ${intentType}<br>
        Action: ${action}<br>
        Source: ${ss['com.symbol.datawedge.source']}<br>
        Template: ${ss['com.symbol.datawedge.simulscan_template_name']}<br>
        Data: ${ss['com.symbol.datawedge.data_string']}<br>
        Dispatch Time: ${ss['com.symbol.datawedge.data_dispatch_time']}<br>
      `;
      // build table rows
      const pkg = 'com.symbol.datawedge.simulscan_region_';
      if (Array.isArray(ss[pkg + 'data'])) {
        let rows = `<tr><th>ID</th><th>Name</th><th>Type</th><th>Data</th></tr>`;
        ss[pkg + 'data'].forEach((item: any) => {
          const cell = item[pkg + 'type'] === 'picture'
            ? item[pkg + 'binary_data'] 
            : item[pkg + 'string_data'];
          rows += `
            <tr>
              <td>${item[pkg + 'id']}</td>
              <td>${item[pkg + 'name']}</td>
              <td>${item[pkg + 'type']}</td>
              <td>${cell}</td>
            </tr>
          `;
        });
        this.tableHtml = rows;
      }
    }
    else {
      console.warn('Unknown intent action', action);
    }

    this.scannedHtml = out;
  }

  registerIntent() {
    // show a little message?
    this.scannedHtml = 'Enterprise Browser listening for DataWedge intents… Scan now.';
    EB.Intent.startListening(this.myIntentListenerCallback);
  }

  // helper to broadcast any DW API intent
  private sendIntentData(extras: any) {
    EB.Intent.send({
      intentType: EB.Intent.BROADCAST,
      action:      'com.symbol.datawedge.api.ACTION',
      appName:     'com.symbol.datawedge',
      data:        extras
    });
  }

  switchToSimulScanProfile() {
    this.sendIntentData({ 'com.symbol.datawedge.api.SWITCH_TO_PROFILE': 'simulscan' });
  }

  switchToBarcodeProfile() {
    this.sendIntentData({ 'com.symbol.datawedge.api.SWITCH_TO_PROFILE': 'barcode' });
  }

  getActiveProfile() {
    this.sendIntentData({ 'com.symbol.datawedge.api.GET_ACTIVE_PROFILE': '' });
  }
}