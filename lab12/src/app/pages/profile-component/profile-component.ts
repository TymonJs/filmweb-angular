import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-component',
  imports: [],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.scss',
})
export class ProfileComponent implements OnInit{
  
  private route = inject(ActivatedRoute);
  protected post = null;
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const post = data["post"];
      this.post = post;
      
    })
  }
}
