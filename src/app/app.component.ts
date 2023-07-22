import { Component } from '@angular/core';
import { MenuItem,PrimeIcons } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe]
})
export class AppComponent {
  items: any;
  cities:any;
  formattedDate: string;
  Value :number;
  cities2: any;
  customYearRange: string;
  currentMonth: string;
  currentYear: number;
  cities3: any;
  data: any;
  options: any;
  constructor(private datePipe: DatePipe,
    private http: HttpClient ) {
    const currentDate = new Date();
    this.formattedDate = this.formatDate(currentDate);
    this.customYearRange = `${new Date().getFullYear() - 10}:${new Date().getFullYear() + 10}`;
    this.updateCurrentDate();
  }

  formatDate(date: Date): string {
    const dayOfWeek = this.getDayOfWeek(date.getDay());
    const month = this.getMonthName(date.getMonth());

    return `${date.getDate()} ${month}, ${date.getFullYear()} ${dayOfWeek}`;
  }

  getDayOfWeek(dayIndex: number): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dayIndex];
  }

  getMonthName(monthIndex: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  }
  ngOnInit() {
    this.Value =250000;
    this.http.get<any>('assets/data.json').subscribe(
      (data) => {
        // Assuming data is an object containing the necessary properties
        this.items = data.menuItems;
        this.cities = data.cities;
        this.cities2 = data.cities2;
        this.cities3 = data.cities3;
      },
      (error) => {
        // Handle error
        console.error('Error fetching data:', error);
      }
    );
const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: ['Intiated', 'Pending', 'Signed' , 'Expired'],
            datasets: [
                {
                    data: [300, 50, 100, 25],
                    backgroundColor: [documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--white-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--purple-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--white-400')]
                }
            ]
        };


        this.options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
  }
  updateCurrentDate(): void {
    const currentDate = new Date();
    this.currentMonth = this.getMonthName(currentDate.getMonth());
    this.currentYear = currentDate.getFullYear();
  }

  prevYear(): void {
    this.currentYear--;
  }

  prevMonth(): void {
    this.currentMonth = this.getPreviousMonthName();
  }

  nextMonth(): void {
    this.currentMonth = this.getNextMonthName();
  }

  nextYear(): void {
    this.currentYear++;
  }

  onYearChange(event: any): void {
    this.currentYear = event.year;
  }

  onMonthChange(event: any): void {
    this.currentMonth = this.getMonthName(event.month - 1);
  }
  getPreviousMonthName(): string {
    const previousMonthIndex = (new Date().getMonth() + 11) % 12;
    return this.getMonthName(previousMonthIndex);
  }

  getNextMonthName(): string {
    const nextMonthIndex = (new Date().getMonth() + 1) % 12;
    return this.getMonthName(nextMonthIndex);
  }
  
}
