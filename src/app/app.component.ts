import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Zebra Scanner Integration';

  // Define the form object to hold scanned data
  form = {
    serialNumber: '',
    batchNumber: '',
    mfgDate: '',
    expiryDate: ''
  };

  ngOnInit() {
    window.addEventListener('zebraScanEvent', (e: any) => {
      const data = e.detail;
      this.form.serialNumber = data.serial || '';
      this.form.batchNumber = data.batch || '';
      this.form.mfgDate = data.mfg || '';
      this.form.expiryDate = data.expiry || '';
    });
  }


  simulateScan() {
    const rawGS1 = '(21)SN12345(10)LOT999(11)240101(17)250101'; // example GS1 data

    if (typeof (window as any).handleZebraScan === 'function') {
      (window as any).handleZebraScan(rawGS1);
    } else {
      console.error('❌ handleZebraScan is not defined yet.');
    }
  }

  // triggerScan() {
  //   const intentData = {
  //     action: 'com.symbol.datawedge.api.ACTION',
  //     extras: {
  //       'com.symbol.datawedge.api.SOFT_SCAN_TRIGGER': 'START_SCANNING'
  //     }
  //   };

  //   if ((window as any).plugins?.intentShim?.startActivity) {
  //     (window as any).plugins.intentShim.startActivity(
  //       intentData,
  //       () => console.log('📡 Scan intent sent'),
  //       (err: any) => console.error('❌ Scan trigger failed', err)
  //     );
  //   } else {
  //     console.warn('Intent plugin not available');
  //   }
  // }

  triggerScan() {
    const shim = (window as any).plugins?.intentShim;

    if (shim?.startActivity) {
      shim.startActivity(
        {
          action: 'com.symbol.datawedge.api.ACTION',
          extras: {
            'com.symbol.datawedge.api.SOFT_SCAN_TRIGGER': 'START_SCANNING'
          }
        },
        () => console.log('✅ Scan triggered via DataWedge'),
        (err: any) => console.error('❌ Intent error:', err)
      );
    } else {
      console.warn('❌ Intent plugin not available');
    }
  }
}