import { Component } from '@angular/core';
import { AddinClientService } from '@blackbaud/skyux-lib-addin-client';
import { SkyModalInstance } from '@skyux/modals';
import { Observable, of } from 'rxjs';
import { Event } from '../../../shared/event';
import { EventServiceService } from '../../../shared/event-service.service';
import { RegisterModalContext } from './register-modal-context';

@Component({
    selector: 'app-register-modal',
    templateUrl: './register-modal.component.html',
    styleUrls: ['./register-modal.component.scss'],
    standalone: false
})
export class RegisterModalComponent {
  public events$: Observable<Event[]> = of([]);

  constructor(
    public instance: SkyModalInstance,
    private eventsService: EventServiceService,
    private addinClientService: AddinClientService,
    private context: RegisterModalContext,
  ) {
    // if this were a real app that persisted data, this should filter to just the events that the user has not registered for yet
    // it would also use the environment ID of the user to get events for that specific customer
    this.events$ = this.eventsService.events;
  }

  public register(event: Event): void {
    this.addinClientService.showWait();

    // the 1bb.ptlpn claim is the constituent ID if its present
    if (this.context.userIdentity && this.context.userIdentity['1bb.ptlpn']) {
      this.eventsService.registerForEvent(this.context.userIdentity['1bb.ptlpn'], `${this.context.userIdentity.given_name} ${this.context.userIdentity.family_name}`, event.id);
      window.alert(`You have registered for ${event.name} for RENXT Constituent ID ${this.context.userIdentity['1bb.ptlpn']}`);
    } else {
      window.alert(`Could not get constituent ID for user to register for event.`);
    }

    this.addinClientService.hideWait();
    this.instance.close();
  }
}
