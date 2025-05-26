import { Component, OnInit, OnDestroy } from '@angular/core';

declare global {
  interface Window {
    eb?: {
      barcode?: {
        enable: (options: any, callback: (data: any) => void) => void;
      };
    };
  }
}

@Component({
  selector: 'app-root',
  template: `
    <h2>Scanned Barcode:</h2>
    <p>{{ scannedData }}</p>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  scannedData: string = '';

  handleScan = (event: any) => {
    const barcode = event.detail?.data;
    if (barcode) {
      this.scannedData = barcode;
      console.log('📦 Scanned:', barcode);
    }
  };

  ngOnInit() {
    window.addEventListener('barcodeScanned', this.handleScan);

    // Enable EB barcode scanning
    if (window['eb']?.barcode) {
      window['eb'].barcode.enable({}, (data: any) => {
        const barcode = data?.data;
        if (barcode) {
          // Dispatch custom event so Angular stays decoupled
          window.dispatchEvent(new CustomEvent('barcodeScanned', { detail: { data: barcode } }));
        }
      });
    } else {
      console.warn('EB barcode API not available');
    }
  }

  ngOnDestroy() {
    window.removeEventListener('barcodeScanned', this.handleScan);
  }
}