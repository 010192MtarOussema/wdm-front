import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.sass']
})
export class GroupDetailsComponent implements OnInit {
  breadscrums = [
    {
      title: 'Détails groupe + nom du groupe',
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
