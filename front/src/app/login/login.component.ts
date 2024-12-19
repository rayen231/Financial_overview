import { Component } from '@angular/core';
import { FinanceService } from '../finance.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; // Import the UserService
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name = '';
  password = '';
  errorMessage = '';
  

  constructor(
    private financeService: FinanceService,
    private router: Router,
    private userService: UserService  // Inject UserService
  ) {}

  onLogin() {
    interface LoginResponse {
      message: string;
      user_id: number;
    }

    interface LoginError {
      error: {
        detail?: string;
      };
    }

    this.financeService.login(this.name, this.password).subscribe(
      (response: LoginResponse) => {
        // If login is successful, show success alert
        Swal.fire({
          title: 'Success!',
          text: 'You have logged in successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Store the user ID in the shared UserService
          this.userService.setUserId(response.user_id);

          // Optionally, store in local storage/session storage if persistence is needed
          localStorage.setItem('userId', response.user_id.toString());

          // Redirect to the dashboard with the user ID as a query parameter
          this.router.navigate(['/dashboard'], { queryParams: { userId: response.user_id } });
        });
      },
      (error: LoginError) => {
        // If there is an error, show error alert
        const errorMessage = error?.error?.detail || 'Invalid credentials, please try again.';
        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}
