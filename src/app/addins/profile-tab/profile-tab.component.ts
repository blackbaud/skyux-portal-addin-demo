import { Component, OnInit } from '@angular/core';
import { AddinClientService } from '@blackbaud/skyux-lib-addin-client';
import jwt_decode from 'jwt-decode';
import { map, Observable } from 'rxjs';
import { EventServiceService } from '../../shared/event-service.service';
import { UserIdentityToken } from '../../shared/user-identity-token';
import { Event } from '../../shared/event';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.scss']
})
export class ProfileTabComponent implements OnInit {
  public userIdentityToken?: UserIdentityToken;

  public participantEvents: Event[] = [];

  constructor(private addinClientService: AddinClientService, private eventsService: EventServiceService) { }

  public ngOnInit(): void {
    this.addinClientService.args.subscribe(args => {
      this.getUserIdentityToken().subscribe(token => {
        this.userIdentityToken = token;

        if (token['1bb.ptlpn']) {
          this.participantEvents = this.eventsService.getEventsForParticipant(token['1bb.ptlpn']);
        }

        args.ready({
          showUI: true,
          title: `Active event registrations`,
        });
      });
    });
  }

  private getUserIdentityToken(): Observable<UserIdentityToken> {
    return this.addinClientService.getUserIdentityToken()
      .pipe(
        // this gets the constituent info from the user identity token
        // a real app would also check the environment ID since the event would only be valid for a specific environment
        // it would also need to validate the token - here we assume its a valid token, but a real app would need to check the signature
        // to make sure it was signed by the correct authority
        map(token => {
          return jwt_decode<UserIdentityToken>(token);
        })
      );
  }

}
