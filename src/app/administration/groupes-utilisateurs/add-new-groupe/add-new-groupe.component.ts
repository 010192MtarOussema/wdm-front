import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { MatSelectionList } from '@angular/material/list';
import { PreferenceService } from 'src/app/services/preference.service';
import { Preference } from 'src/app/models/Preference';
import { UserGroup } from 'src/app/models/userGroup';
import { FormDialogComponent } from '../dialogs/form-dialog/form-dialog.component';
import { GroupesTilisateursService } from 'src/app/services/groupes-tilisateurs.service';

@Component({
  selector: 'app-add-new-groupe',
  templateUrl: './add-new-groupe.component.html',
  styleUrls: ['./add-new-groupe.component.sass']
})
export class AddNewGroupeComponent implements OnInit {
  sourceProducts: any[] = [];
  userGroupes: UserGroup[];
  targetProducts: any[] = [];
  action: string;
  dialogTitle: string;
  userGroupeForm: UntypedFormGroup;
  user: UserGroup;
  toppings = new UntypedFormControl();
  show: boolean = true;
  preferences!: Preference[];

  status = new UntypedFormControl('', Validators.required);
  @ViewChild('preference') shoesSelectionListPreferences: MatSelectionList;
  breadscrums = [
    {
      title: 'Add new Groupe',
      items: ['Administration'],
      active: 'new user'
    }
  ];
  constructor(

    public advanceTableService: GroupesTilisateursService,
    private fb: UntypedFormBuilder,
    private preferenceService: PreferenceService
  ) {

    this.user = new UserGroup();
    // }
    this.userGroupeForm = this.createContactForm();
  }
  ngOnInit(): void {
    this.preferenceService.getAPreferences().subscribe(data => {
      console.log(data)
      this.preferences = data;
    })
  }
  formControl = new UntypedFormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.user.id],
      name: [this.user.name, [Validators.required]],
      description: [this.user.description, [Validators.required]],
      status: [this.user.status, [Validators.required]],


    });
  }
  getSelected3() {
    return this.shoesSelectionListPreferences.selectedOptions.selected.map(s => s.value);
  }
  onSelectionChange3() {
    console.log(this.getSelected3());
  }
  submit() {
    // emppty stuff
  }

  public confirmAdd(): void {
    console.log("-------form", this.userGroupeForm.getRawValue());
    this.advanceTableService.addUserGroupe(
      this.userGroupeForm.getRawValue()
    );
  }

  public confirmUpdate(): void {
    console.log("-------form", this.userGroupeForm.getRawValue());
    this.advanceTableService.updateUserGroupe(

      this.userGroupeForm.getRawValue()
    );
  }
}
