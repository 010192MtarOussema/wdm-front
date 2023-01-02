import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbilityDto } from 'src/app/models/ability';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {
  user: User;
  aibilities: AbilityDto[];
  breadscrums = [
    {
      title: 'Détails ',
      items: ['Extra'],
      active: 'Profile'
    }
  ];
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {

  }

  ngOnInit(): void {
    let _iduser = this.activatedRoute.snapshot.params.id;
    this.userService.getUserById(_iduser).subscribe(data => {

      this.user = data;
      this.aibilities = this.user.abilitiesDtos;
      console.log(this.user)
    })


  }

}
