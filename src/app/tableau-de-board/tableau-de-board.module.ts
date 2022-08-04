import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableauDeBoardRoutingModule } from './tableau-de-board-routing.module';
import { TableauBoardComponent } from './tableau-board/tableau-board.component';


@NgModule({
  declarations: [
    TableauBoardComponent
  ],
  imports: [
    CommonModule,
    TableauDeBoardRoutingModule
  ]
})
export class TableauDeBoardModule { }
