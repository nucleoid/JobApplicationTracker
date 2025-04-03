import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './application-form.component.html'
})

export class ApplicationFormComponent {
  appId: number | null = null;
  companyName = '';
  position = '';
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected' = 'Applied';

  constructor(
    private appService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.appId = +id;
        this.appService.get(this.appId).subscribe(app => {
          this.companyName = app.companyName;
          this.position = app.position;
          this.status = app.status;
        });
      }
    });
  }

  onSubmit(): void {
    if (!this.companyName.trim() || !this.position.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    const newApp = {
      companyName: this.companyName.trim(),
      position: this.position.trim(),
      status: this.status,
    };

    const nextLogic = () => {
      this.companyName = '';
      this.position = '';
      this.status = 'Applied';
      this.router.navigate(['/']);
    }

    if (this.appId) {
      this.appService.update(this.appId, newApp).subscribe({
        next: () => nextLogic(),
        error: (err) => {
          console.error('API error:', err);
          alert('Failed to update application. Please try again later.');
        }
      });
    } else {
      this.appService.create(newApp).subscribe({
        next: () => nextLogic(),
        error: (err) => {
          console.error('API error:', err);
          alert('Failed to create new application. Please try again later.');
        }
      });
    }
  }
}
