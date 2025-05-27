import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
declare const EB: any;

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule],
  template: `
    <div style="padding:1rem">
      <h1>TC52 Scan PoC</h1>
      <p *ngIf="!scanned">Press the scan button</p>
      <p *ngIf="scanned"><strong>Last barcode:</strong> {{ scanned }}</p>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  scanned = '';

  constructor(private zone: NgZone) {}

  ngOnInit() {
    // only attach the listener if EB.Intent is really there
    if (
      typeof window !== 'undefined' &&
      (window as any).EB &&
      EB.Intent &&
      typeof EB.Intent.startListening === 'function'
    ) {
      EB.Intent.startListening((intent: any) => {
        try {
          if (intent.action === 'com.mycompany.SCAN' && intent.extras) {
            let code = '';
            try {
              // If extras is a JSON string, parse it
              if (typeof intent.extras === 'string') {
                const extrasObj = JSON.parse(intent.extras);
                code = extrasObj['com.symbol.datawedge.data_string'];
              } else {
                code = intent.extras['com.symbol.datawedge.data_string'];
              }
            } catch (jsonErr) {
              console.error('Failed to parse intent extras:', jsonErr);
              code = '‹invalid data›';
            }
            this.zone.run(() => (this.scanned = code || '‹no data›'));
          }
        } catch (err) {
          console.error('Error handling scan intent:', err);
          this.zone.run(() => (this.scanned = '‹error›'));
        }
      });
    } else {
      console.log('⚠️ EB.Intent not available – skipping scan listener (desktop mode)');
    }
  }

  ngOnDestroy() {
    if (
      typeof window !== 'undefined' &&
      (window as any).EB &&
      EB.Intent &&
      typeof EB.Intent.stopListening === 'function'
    ) {
      EB.Intent.stopListening();
    }
  }
}