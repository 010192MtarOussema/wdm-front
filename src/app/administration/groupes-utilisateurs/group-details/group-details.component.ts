import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserGroup } from 'src/app/models/userGroup';
import { UserGroupeService } from 'src/app/services/user-groupe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.sass']
})
export class GroupDetailsComponent implements OnInit {
  userGroup: UserGroup;
  breadscrums = [
    {
      title: 'Détails groupe ',
      items: ['Extra'],
      active: 'Profile'
    }
  ];
  constructor(private activatedRoute: ActivatedRoute, private userGroupService: UserGroupeService, private userService: UserService) { }

  ngOnInit(): void {
    let _idusergroupe = this.activatedRoute.snapshot.params.id;
    this.userGroupService.getUserGroupById(_idusergroupe).subscribe(data => {
      this.userGroup = data;
    })

    this.userService.getUserByGroup(_idusergroupe).subscribe(data => {
      console.log(data)
    })


  }

}
