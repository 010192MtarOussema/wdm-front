import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { User } from 'src/app/models/user';
import { UserGroup } from 'src/app/models/userGroup';
import { GroupesTilisateursService } from 'src/app/services/groupes-tilisateurs.service';
import { formatDate } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PreferenceService } from 'src/app/services/preference.service';
import { Preference } from 'src/app/models/Preference';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.sass']
})
export class NewUserComponent implements OnInit {
  sourceProducts: any[] = [];
  userGroupes: UserGroup[];
  targetProducts: any[] = [];
  userForm: FormGroup;
  user: User;
  fileUploadForm: UntypedFormGroup;
  status = new UntypedFormControl('', Validators.required);
  animals: any[] = [
    'En création',
    'Valide',
    'Bloqué'
  ];
  breadscrums = [
    {
      title: 'Add new User',
      items: ['Administration'],
      active: 'new user'
    }
  ];


  //preferences
  preferences!: Preference[];
  mode = new UntypedFormControl('side');
  taskForm: UntypedFormGroup;
  showFiller = false;
  isNewEvent = false;
  dialogTitle: string;
  userImg: string;
  direction: string;


  constructor(private formBuilder: FormBuilder, private groupeUtilisateurService: GroupesTilisateursService,
    private primengConfig: PrimeNGConfig, private fb: UntypedFormBuilder, public preferenceService: PreferenceService,
  ) {
    this.taskForm = this.createFormGroup(null);
    this.fileUploadForm = fb.group({
      singleUpload: ['']
    });

  }
  tasks = [
    {
      id: '1',
      img: 'assets/images/user/user1.jpg',
      name: 'Sarah Smith',
      title: 'Develop angular project',
      done: true,
      note: 'note details',
      priority: 'High',
      due_date: '2/12/2020'
    },
    {
      id: '2',
      img: 'assets/images/user/user2.jpg',
      name: 'John Deo',
      title: 'File not found exception solve',
      done: false,
      note: 'note details',
      priority: 'High',
      due_date: '2/12/2019'
    },
    {
      id: '3',
      img: 'assets/images/user/user3.jpg',
      name: 'Jens Brincker',
      title: 'Test project and find bug',
      done: false,
      note: 'note details',
      priority: 'Low',
      due_date: '2/12/2017'
    },
    {
      id: '4',
      img: 'assets/images/user/user4.jpg',
      name: 'Mark Hay',
      title: 'Image not found error',
      done: true,
      note: 'note details',
      priority: 'Normal',
      due_date: '2/12/2020'
    },
    {
      id: '5',
      img: 'assets/images/user/user5.jpg',
      name: 'Anthony Davie',
      title: 'Solve client error in form',
      done: false,
      note: 'note details',
      priority: 'High',
      due_date: '2/12/2019'
    },
    {
      id: '6',
      img: 'assets/images/user/user6.jpg',
      name: 'Sue Woodger',
      title: 'Tab button is flickering on hover',
      done: false,
      note: 'note details',
      priority: 'Normal',
      due_date: '2/12/2017'
    },
    {
      id: '7',
      img: 'assets/images/user/user7.jpg',
      name: 'John Deo',
      title: 'Chart responsive issue solve',
      done: true,
      note: 'note details',
      priority: 'High',
      due_date: '2/12/2019'
    },


  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
  toggle(task, nav: any) {
    nav.close();
    task.done = !task.done;
  }
  addNewTask(nav: any) {
    this.resetFormField();
    this.isNewEvent = true;
    this.dialogTitle = 'New Task';
    this.userImg = 'assets/images/user/user1.jpg';
    nav.open();
  }
  taskClick(task, nav: any): void {
    this.isNewEvent = false;
    this.dialogTitle = 'Edit Task';
    this.userImg = task.img;
    nav.open();
    this.taskForm = this.createFormGroup(task);
  }
  closeSlider(nav: any) {
    if (nav.open()) {
      nav.close();
    }
  }
  createFormGroup(data: any) {
    return this.fb.group({
      id: [data ? data.id : this.getRandomID()],
      img: [data ? data.img : 'assets/images/user/user1.jpg'],
      name: [data ? data.name : null],
      title: [data ? data.title : null],
      done: [data ? data.done : null],
      priority: [data ? data.priority : null],
      due_date: [
        formatDate(
          data
            ? data.due_date
            : formatDate(new Date(), 'yyyy-MM-dd', 'en') || '',
          'yyyy-MM-dd',
          'en'
        )
      ],
      note: [data ? data.note : null]
    });
  }
  saveTask() {
    this.tasks.unshift(this.taskForm.value);
    this.resetFormField();

  }
  editTask() {
    const targetIdx = this.tasks
      .map((item) => item.id)
      .indexOf(this.taskForm.value.id);
    this.tasks[targetIdx] = this.taskForm.value;

  }
  deleteTask(nav: any) {
    const targetIdx = this.tasks
      .map((item) => item.id)
      .indexOf(this.taskForm.value.id);
    this.tasks.splice(targetIdx, 1);
    nav.close();

  }
  resetFormField() {
    this.taskForm.controls.name.reset();
    this.taskForm.controls.title.reset();
    this.taskForm.controls.done.reset();
    this.taskForm.controls.priority.reset();
    this.taskForm.controls.due_date.reset();
    this.taskForm.controls.note.reset();
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }

  ngOnInit(): void {
    this.preferenceService.getAPreferences().subscribe(data => {
      console.log(data)
      this.preferences = data;
    })
    this.groupeUtilisateurService.list().subscribe(data => {
      this.sourceProducts = data;


    });
    this.primengConfig.ripple = true;
    this.user = new User();
    this.createContactForm();
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
  createContactForm() {

    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      status: ['', [Validators.required]],
      realName: ['', [Validators.required]],
      loginName: ['', [Validators.required]],
      pseudo: ['', [Validators.required]],
      passeword: ['', [Validators.required]],
      // abilities: new FormControl([]),
      // userGroups: new FormControl([]),
      // userPreferenceValues: new FormControl([])
    });
  }
  disableInfoPersonnell() {
    return this.userForm.get('lastName').hasError('required') || this.userForm.get('firstName').hasError('required')
      || this.userForm.get('status').hasError('required') || this.userForm.get('realName').hasError('required')
  }
  disableInfosCompte() {
    return this.userForm.get('loginName').hasError('required') || this.userForm.get('pseudo').hasError('required')
  }
}
