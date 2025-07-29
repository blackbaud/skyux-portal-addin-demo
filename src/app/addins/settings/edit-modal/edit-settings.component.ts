import { Component, OnInit } from '@angular/core';
import { AddinClientInitArgs } from '@blackbaud/sky-addin-client';
import { AddinClientService } from '@blackbaud/skyux-lib-addin-client';
import { SkyModalCloseArgs, SkyModalLegacyService } from '@skyux/modals';
import { EditModalComponent } from './edit-modal.component';

@Component({
    selector: 'app-edit-settings',
    template: ``,
    styles: [
        `::ng-deep body {
      background: transparent;
    }

    ::ng-deep .sky-modal-host-backdrop {
      display: none;
    }`
    ],
    standalone: false
})
export class EditSettingsComponent implements OnInit {
  constructor(
    private modalService: SkyModalLegacyService,
    private addinClientService: AddinClientService
  ) {}

  public ngOnInit(): void {
    this.addinClientService.args.subscribe((args: AddinClientInitArgs) => {
      this.openModal();

      args.ready({
        showUI: true
      });
    });
  }

  private openModal() {
    const modalInstance = this.modalService.open(EditModalComponent);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      // inform the host that the modal was closed and return the context
      this.addinClientService.closeModal({
        context: result
      });
    });
  }
}
