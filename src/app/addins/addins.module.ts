import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddinClientService } from '@blackbaud/skyux-lib-addin-client';
import { SkyCheckboxModule, SkyInputBoxModule } from '@skyux/forms';
import { SkyIconModule } from '@skyux/icon';

import { SkyDescriptionListModule, SkyFluidGridModule } from '@skyux/layout';
import { SkyModalModule } from '@skyux/modals';

import { AddinsRoutingModule } from './addins-routing.module';
import { ActionRegisterComponent } from './portal-action/register-modal/action-register.component';
import { EditSettingsComponent } from './settings/edit-modal/edit-settings.component';
import { SettingsComponent } from './settings/settings.component';
import { EditModalComponent } from './settings/edit-modal/edit-modal.component';
import { SkyThemeService } from '@skyux/theme';
import { PortalActionComponent } from './portal-action/portal-action.component';
import { RegisterModalComponent } from './portal-action/register-modal/register-modal.component';
import { ProfileTabComponent } from './profile-tab/profile-tab.component';
import { SkyPageModule } from '@skyux/pages';


@NgModule({
  declarations: [],
    imports: [
        CommonModule,
        AddinsRoutingModule,
        SkyFluidGridModule,
        SkyPageModule,
        SkyIconModule,
        SkyModalModule,
        SkyInputBoxModule,
        ReactiveFormsModule,
        SkyCheckboxModule,
        SkyDescriptionListModule,
        SettingsComponent,
        EditModalComponent,
        EditSettingsComponent,
        PortalActionComponent,
        RegisterModalComponent,
        ActionRegisterComponent,
        ProfileTabComponent
    ],
  providers: [
    AddinClientService,
    SkyThemeService
  ]
})
export class AddinsModule { }
