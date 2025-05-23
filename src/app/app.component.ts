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
  scannedValue = '';

  ngOnInit() {
    // window.addEventListener('zebraScan', (e: any) => {
    //   console.log('📦 Scan received from native:', e.detail);
    //   this.scannedValue = e.detail;
    // });
  }


  // Parse GS1 format and map to fields
  parseGS1Barcode(data: string) {
    const gs1Map: Record<string, string> = {};
    const pattern = /\((\d{2})\)([^\(]+)/g;

    let match;
    while ((match = pattern.exec(data)) !== null) {
      gs1Map[match[1]] = match[2];
    }

    this.form.serialNumber = gs1Map['21'] || '';
    this.form.batchNumber = gs1Map['10'] || '';
    this.form.mfgDate = this.formatGS1Date(gs1Map['11']);
    this.form.expiryDate = this.formatGS1Date(gs1Map['17']);
  }

  // Convert YYMMDD → YYYY-MM-DD
  formatGS1Date(yyMMdd?: string): string {
    if (!yyMMdd || yyMMdd.length !== 6) return '';
    const year = '20' + yyMMdd.slice(0, 2);
    const month = yyMMdd.slice(2, 4);
    const day = yyMMdd.slice(4, 6);
    return `${year}-${month}-${day}`;
  }

  triggerScan() {
    const handleScan = (e: any) => {
      try {
        const scannedData = e.detail;
        console.log('✅ One-time scan received:', scannedData);
        this.scannedValue = scannedData;
        this.parseGS1Barcode(scannedData);
      } catch (err) {
        console.error('❌ Error handling scanned data:', err);
      } finally {
        window.removeEventListener('zebraScan', handleScan);
      }
    };

    // Add one-time listener
    window.removeEventListener('zebraScan', handleScan);
    window.addEventListener('zebraScan', handleScan);

    // Instruct user to press hardware button
    alert('🔍 Press the scan button on your TC52 device.');
  }
}