// zebra-scanner.module.js
(function (global) {
  const ScannerModule = {
    isAvailable: function () {
      return typeof EB !== 'undefined' && EB.Intent && EB.Intent.startListening;
    },

    startListening: function (onScanCallback) {
      if (!this.isAvailable()) {
        console.warn('[ZebraScanner] EB Intent API not available.');
        return;
      }

      EB.Intent.startListening({
        action: 'com.zebra.scanner.ACTION',
        category: 'android.intent.category.DEFAULT'
      }, function (intentData) {
        const data = intentData.extras?.['com.symbol.datawedge.data_string'];

        if (data) {
          console.log('[ZebraScanner] Data received:', data);
          onScanCallback?.(data);
        } else {
          console.warn('[ZebraScanner] No data_string found in intent extras');
        }
      });
    }
  };

  global.ZebraScanner = ScannerModule;
})(window);
