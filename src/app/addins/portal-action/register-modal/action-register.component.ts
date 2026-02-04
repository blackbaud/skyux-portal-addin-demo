import { Component, inject, OnInit } from '@angular/core';
import { AddinClientInitArgs } from '@blackbaud/sky-addin-client';
import { AddinClientService } from '@blackbaud/skyux-lib-addin-client';
import { SkyModalCloseArgs, SkyModalLegacyService } from '@skyux/modals';
import { RegisterModalContext } from './register-modal-context';
import { RegisterModalComponent } from './register-modal.component';

@Component({
    selector: 'app-action-register',
    template: ``,
    // These styles ensure that the backdrop behind the modal can be seen
    styles: [
        `::ng-deep body {
      background: transparent;
    }

    ::ng-deep .sky-modal-host-backdrop {
      display: none;
    }`
    ],
    standalone: true,
    imports: []
})
export class ActionRegisterComponent implements OnInit {
  private modalService = inject(SkyModalLegacyService);
  private addinClientService = inject(AddinClientService);

  public ngOnInit(): void {
    this.addinClientService.args.subscribe((args: AddinClientInitArgs) => {
      this.openModal(args.context);

      args.ready({
        showUI: true
      });
    });
  }

  private openModal(modalContext: any) {
    const context: RegisterModalContext = {
      userIdentity: modalContext.userIdentity
    };

    const options: any = {
      providers: [{
        provide: RegisterModalContext,
        useValue: context
      }],
    };

    const modalInstance = this.modalService.open(RegisterModalComponent, options);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      // inform the host that the modal was closed and return the context
      this.addinClientService.closeModal({
        context: result
      });
    });
  }
}
