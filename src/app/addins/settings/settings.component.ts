import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddinClientService } from '@blackbaud/skyux-lib-addin-client';
import { EventServiceService } from '../../shared/event-service.service';
import { SkyPageModule } from '@skyux/pages';
import { SkyFluidGridModule } from '@skyux/layout';
import { SkyIconModule } from '@skyux/icon';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    standalone: true,
    imports: [CommonModule, SkyPageModule, SkyFluidGridModule, SkyIconModule]
})
export class SettingsComponent implements OnInit {
  private addinClientService = inject(AddinClientService);
  public eventService = inject(EventServiceService);

  ngOnInit(): void {
    this.addinClientService.args.subscribe(args => {
      args.ready({
        showUI: true,
        title: `Event Settings`
      });
    });
  }

  public actionClicked(action: 'edit' | 'disable' | 'enable'): void {
    if (action === 'edit') {
      let addinModal = window.location.origin + '/addins/settings/edit';

      // the deployed url doesn't work the same as the localhost. This is a workaround.
      if (addinModal.includes('github.io')) {
        addinModal = window.location.origin + '/skyux-portal-addin-demo' + '/addins/settings/edit';
      }

      this.addinClientService.showModal({ url: addinModal });
    }

    if (action === 'disable') {
      window.alert('This will disable all event registrations. ' +
        'This sample application does not currently persist that setting, so the participants will still be able to register; however, a real app would then stop participants from registering.');
      this.eventService.registrationEnabled = false;
    }

    if (action === 'enable') {
      this.eventService.registrationEnabled = true;
    }
  }
}
