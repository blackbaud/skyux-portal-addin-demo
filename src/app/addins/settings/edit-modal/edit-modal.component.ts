import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyModalInstance, SkyModalModule } from '@skyux/modals';
import { Observable, of } from 'rxjs';
import { Event } from '../../../shared/event';
import { EventServiceService } from '../../../shared/event-service.service';

@Component({
    selector: 'app-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.scss'],
    standalone: true,
    imports: [CommonModule, SkyModalModule]
})
export class EditModalComponent {
  public events$: Observable<Event[]> = of([]);
  public instance = inject(SkyModalInstance);
  private eventsService = inject(EventServiceService);

  constructor() {
    this.events$ = this.eventsService.events;
  }
}
