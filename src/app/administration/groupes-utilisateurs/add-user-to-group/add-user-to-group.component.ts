import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

import { GroupesTilisateursService } from '../../../services/groupes-tilisateurs.service';

@Component({
  selector: 'app-add-user-to-group',
  templateUrl: './add-user-to-group.component.html',
  styleUrls: ['./add-user-to-group.component.sass']
})
export class AddUserToGroupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddUserToGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: GroupesTilisateursService
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.advanceTableService.deleteUserGroupe(this.data.id);
  }
}