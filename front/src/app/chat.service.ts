import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ChatRequest {
  query: string;
  user_id: number;
  PictureDescription: string;
}

interface ChatResponse {
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://127.0.0.1:8081'; // FastAPI endpoint

  constructor(private http: HttpClient) { }

  sendQuery(query: string, userId: number, pictureDescription: string): Observable<ChatResponse> {
    const requestBody: ChatRequest = {
      query: query,
      user_id: userId,
      PictureDescription: pictureDescription
    };

    return this.http.post<ChatResponse>(`${this.apiUrl}/chat`, requestBody);
  }
  uploadFile(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
  
    return this.http.post<any>(`${this.apiUrl}/upload`, formData).pipe(
      map(response => {
        console.log('API Response:', response);  // Log full response for debugging
        const analysisResult = response?.analysis_result;  // Extract the correct field
        return analysisResult.replace(/^content='|', role=.*$/g, '').trim(); // Fallback message
      })
    );
  }
  
  
}
