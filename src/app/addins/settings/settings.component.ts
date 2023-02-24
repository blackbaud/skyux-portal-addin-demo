import { Component, OnInit } from '@angular/core';
import { AddinClientService } from '@blackbaud/skyux-lib-addin-client';
import { EventServiceService } from '../../shared/event-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private addinClientService: AddinClientService, public eventService: EventServiceService) { }

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
      const addinModal = window.location.origin + '/addins/settings/edit';
      this.addinClientService.showModal({ url: addinModal })
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
