import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
declare global {
  interface Window {
    ZebraScanner: {
      isAvailable: () => boolean;
      startListening: (callback: (data: string) => void) => void;
    };
  }
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  scannedValue = '';

  ngOnInit(): void {
    alert('Zebra Scanner Example App Initialized');
    console.log('Zebra Scanner Example App Initialized');
    // if (window.ZebraScanner?.isAvailable()) {
    //   window.ZebraScanner.startListening((data: string) => {
    //     console.log('📦 Scanned:', data);
    //     this.scannedValue = data;
    //   });
    // } else {
    //   console.warn('Zebra Scanner module not available.');
    // }
  }

}