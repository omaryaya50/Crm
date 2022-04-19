import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {LicenseManager} from "@ag-grid-enterprise/core";
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
LicenseManager.setLicenseKey("DownloadDevTools_COM_NDEwMjM0NTgwMDAwMA==59158b5225400879a12a96634544f5b6");
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
// tslint:disable-next-line: only-arrow-functions
$('#myModal').on('shown.bs.modal', function() {
    $('#myInput').trigger('focus');
  });
