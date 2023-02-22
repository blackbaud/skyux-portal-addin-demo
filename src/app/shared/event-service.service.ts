import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Event } from './event';
import { Participant } from './participant';

/**
 * Singleton service that provides access to the events and participants.
 * This simulates a service that would be provided by the backend that stores data relevant to the SKY application.
 */
@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  public registrationEnabled = true;

  private _events: Event[] = [
    {
      id: 1,
      name: 'Save the puppies conference',
      description: 'The best Puppies conference in the world',
      when: new Date('2023-05-01'),
    },
    {
      id: 2,
      name: 'Save the puppies volunteer day',
      description: 'A day for everyone to come save puppies',
      when: new Date('2023-10-01'),
    }
  ];

  private participants: Participant[] = [];

  public registerForEvent(raisersEdgeConstituentId: string, name: string, eventId: number) {
    const existingParticipant = this.participants.find(p => p.constituentId === raisersEdgeConstituentId);
    if (!existingParticipant) {
      this.participants.push({
        constituentId: raisersEdgeConstituentId,
        name: name,
        registeredEvents: [eventId]
      });
    } else {
      if (!existingParticipant.registeredEvents.includes(eventId)) {
        existingParticipant.registeredEvents.push(eventId);
      }
    }
  }

  public get events() {
    return of(this._events);
  }

  public getEventsForParticipant(raisersEdgeConstituentId: string): Event[] {
    // if this was a real app that persisted data, we would filter to the participant's registered events:
    // const participant = this.participants.find(p => p.constituentId === raisersEdgeConstituentId);
    // if (participant) {
    //   return this._events.filter(e => participant.registeredEvents.includes(e.id));
    // }

    return this._events;
  }
}
