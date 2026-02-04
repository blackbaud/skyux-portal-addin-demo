import { Component, inject, OnInit } from '@angular/core';
import { AddinClientService } from '@blackbaud/skyux-lib-addin-client';
import jwt_decode from 'jwt-decode';
import { map, Observable, switchMap } from 'rxjs';
import { UserIdentityToken } from '../../shared/user-identity-token';

@Component({
    selector: 'app-portal-action',
    template: ``,
    standalone: true,
    imports: []
})
export class PortalActionComponent implements OnInit {
  private addinClientService = inject(AddinClientService);

  ngOnInit(): void {
    this.addinClientService.args.subscribe(args => {
      args.ready({
        showUI: true,
        title: 'Register for an event',
        actionButtonConfig: {
          description: 'Register for an event that this organization is hosting. This could be a conference, a webinar, or a training session.',
          icon: 'calendar',
        }
      });
    });

    this.addinClientService.buttonClick
      .pipe(
        switchMap(() => this.getUserIdentityToken())
      ).subscribe((userIdentityToken) => {

      let addinModal = window.location.origin + '/addins/action/register';

      // the deployed url doesn't work the same as the localhost. This is a workaround.
      if (addinModal.includes('github.io')) {
        addinModal = window.location.origin + '/skyux-portal-addin-demo' + '/addins/action/register'
      }
      this.addinClientService.showModal({ url: addinModal, context: { userIdentity: userIdentityToken }});
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
