import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalActionComponent } from './portal-action/portal-action.component';
import { ActionRegisterComponent } from './portal-action/register-modal/action-register.component';
import { ProfileTabComponent } from './profile-tab/profile-tab.component';
import { EditSettingsComponent } from './settings/edit-modal/edit-settings.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'settings/edit', component: EditSettingsComponent },
  { path: 'action', component: PortalActionComponent },
  { path: 'action/register', component: ActionRegisterComponent },
  { path: 'profile', component: ProfileTabComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddinsRoutingModule { }
