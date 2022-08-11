import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.sass']
})
export class LocalisationComponent implements OnInit {
  breadscrums = [
    {
      title: 'Location s details # 123456789' ,
      items: ['Administration'],
      active: 'compte utilisateur'
    }
  ];
  constructor() {

    console.log("location component ")
   }

  ngOnInit(): void {
  }

}
