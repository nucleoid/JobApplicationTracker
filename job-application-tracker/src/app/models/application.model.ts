export interface Application {
  id: number;
  companyName: string;
  position: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  dateApplied: string;
}
