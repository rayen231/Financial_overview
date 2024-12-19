import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { ChatService } from '../chat.service';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-insights',
  standalone: true,
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css'],
  imports: [RouterModule, FormsModule, CommonModule]
})
export class InsightsComponent implements OnInit {
  user: any = null;
  userId: number | null = null;
  userQuery: string = '';
  chatResponse: string = '';
  chatMessages: { text: string, time: string, isUser: boolean, isLoading: boolean }[] = [];
  selectedFile: File | null = null;
  loading: boolean = false; // Set a general loading flag

  constructor(
    private userService: UserService, 
    private financeService: FinanceService, 
    private router: Router,
    private chatService: ChatService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.userService.userId$.subscribe((id) => {
      this.userId = id;
      this.loading = false;
    });
  }

  onSendQuery() {
    if (this.userId !== null && this.userQuery.trim() !== '') {
      this.loading = true;
      // Add the user query and mark it as loading
      this.addMessage(this.userQuery, true, true);

      this.chatService.sendQuery(this.userQuery, this.userId, this.pictureDescription).subscribe(
        (response) => {
          this.chatResponse = response.response;
          this.addMessage(this.chatResponse, false, false);
          this.loading = false;
        },
        (error) => {
          console.error('Error:', error);
          this.loading = false;
        }
      );
    } else {
      console.error('User ID is null or query is empty');
    }
    this.userQuery = '';
  }

  addMessage(text: string, isUser: boolean, isLoading: boolean = false) {
    const formattedText = text.replace(/\n/g, '<br>');
    const message = {
      text: formattedText,
      time: new Date().toLocaleTimeString(),
      isUser,
      isLoading
    };
    this.chatMessages.push(message);
  }

  pictureDescription: string = '';

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      this.selectedFile = input.files[0];

      if (this.selectedFile) {
        this.loading = true;
        this.chatService.uploadFile(this.selectedFile).subscribe(
          (response) => {
            this.pictureDescription = response; 
            this.loading = false;
            Swal.fire({
              icon: 'success',
              title: 'File uploaded successfully!',
              showConfirmButton: false,
              timer: 1500
            });
          },
          (error) => {
            console.error('Error uploading file:', error);
            this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'Failed to upload file',
            text: 'Please try again later.',
            showConfirmButton: true
          });
          }
        );
      }
    }
  }
}
