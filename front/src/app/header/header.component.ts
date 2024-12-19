import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // Import RouterModule and Router here
import { UserService } from '../user.service'; 
import { FinanceService } from '../finance.service'; // Import your FinanceService to get user info

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterModule], // Include RouterModule in imports
})
export class HeaderComponent implements OnInit {
  user: any = null; // Declare the user property here
  userId: number | null = null;

  constructor(private userService: UserService, private financeService: FinanceService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to user ID from the UserService
    this.userService.userId$.subscribe((id) => {
      this.userId = id;

      // Fetch the user info based on the user ID
      if (id !== null) {
        this.financeService.getUserInfoById(id).subscribe((userInfo) => {
          this.user = userInfo;  // Populate the user object
        });
      }
    });
  }

  navigateTo(path: string): void {
    // Handle navigation to different pages
    console.log(`Navigating to: ${path}`);
  }

  logout(): void {
    // Handle logout functionality
    console.log('User logged out');
    this.userService.setUserId(null); // Reset the user ID
    localStorage.removeItem('userId'); // Clear the user ID from local storage
    this.user = null; // Reset the user object
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
