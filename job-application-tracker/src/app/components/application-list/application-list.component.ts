import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './application-list.component.html'
})
export class ApplicationListComponent implements OnInit {
  applications: Application[] = [];
  isLoading = true;
  showNoDataMessage = false;
  page = 1;
  pageSize = 5;

  constructor(private appService: ApplicationService, private router: Router) { }

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.appService.getAll().subscribe(data => {
      this.applications = data;
      if (this.applications.length === 0) {
        this.showNoDataMessage = true;
        setTimeout(() => this.router.navigate(['/add']), 2000);
      }
    });
  }

  onStatusChange(event: Event, app: Application): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedStatus = selectElement.value as Application['status'];
    this.updateStatus(app, selectedStatus);
  }

  updateStatus(app: Application, status: Application['status']): void {
    this.appService.update(app.id, { status }).subscribe(() => {
      app.status = status;
    });
  }

  deleteApplication(app: Application): void {
    if (confirm(`Are you sure you want to delete the application to ${app.companyName}?`)) {
      this.appService.delete(app.id).subscribe(() => {
        this.applications = this.applications.filter(a => a.id !== app.id);
      });
    }
  }
}
