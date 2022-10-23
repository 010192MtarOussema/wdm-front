export class User {
  public id: number;

  public status: string;

  public loginName: string;

  public pseudo: string;

  public email: string;

  public picture: string;

  public firstName: string;

  public lastName: string;

  public realName: string;

  public createdDate: Date;

  public updatedDate: Date;

  public lastVisitDate;

  public failedLoginCount: number;

  public password: string;

  public lastModifyPassword: Date;

  public statusPasswordChange;



  public abilitiesDtos: [];

  public userGroupDtos: [];

  public userPreferenceDtos: [];
}
