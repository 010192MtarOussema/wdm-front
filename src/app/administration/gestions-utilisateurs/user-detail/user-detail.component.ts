import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {
  breadscrums = [
    {
      title: 'Détails user + nom du user',
      items: ['Extra'],
      active: 'Profile'
    }
  ];
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let _idusergroupe = this.activatedRoute.snapshot.params.id;
    console.log(_idusergroupe)
  }

}
