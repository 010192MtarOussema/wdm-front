import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupesTilisateursService } from 'src/app/services/groupes-tilisateurs.service';

@Component({
  selector: 'app-delete-user-to-group',
  templateUrl: './delete-user-to-group.component.html',
  styleUrls: ['./delete-user-to-group.component.sass']
})
export class DeleteUserToGroupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteUserToGroupComponent>,
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