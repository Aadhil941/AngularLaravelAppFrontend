import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {

  results : any;

  constructor(private _http: HttpClient) { 
    
  }

  ngOnInit(): void {
    // this.getData();
  }

  getData(): void {
    this._http.get<any>(environment.apiBaseURl + 'api/users').subscribe(
      (data) => {
        this.results = data.data;
        console.log('Data received:', data);
        // Handle the data
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error
      },
      () => {
        console.log('Request completed');
        // Handle the completion
      }
    );
  }

}
