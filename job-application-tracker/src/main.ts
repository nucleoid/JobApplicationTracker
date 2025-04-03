import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';

import { ApplicationListComponent } from './app/components/application-list/application-list.component';
import { ApplicationFormComponent } from './app/components/application-form/application-form.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav style="margin-bottom: 1rem;">
      <a routerLink="/">Application List</a> |
      <a routerLink="/add">Add New Application</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent { }

const routes: Routes = [
  { path: '', component: ApplicationListComponent },
  { path: 'add', component: ApplicationFormComponent },
  { path: 'edit/:id', component: ApplicationFormComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
