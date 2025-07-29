import { Component } from '@angular/core';
import { SkyModalInstance } from '@skyux/modals';
import { Observable, of } from 'rxjs';
import { Event } from '../../../shared/event';
import { EventServiceService } from '../../../shared/event-service.service';

@Component({
    selector: 'app-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.scss'],
    standalone: false
})
export class EditModalComponent {
  public events$: Observable<Event[]> = of([]);

  constructor(
    public instance: SkyModalInstance,
    private eventsService: EventServiceService
  ) {
    this.events$ = this.eventsService.events;
  }
}
