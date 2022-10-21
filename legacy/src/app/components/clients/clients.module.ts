import { NgModule } from '@angular/core';  
import { CommonModule } from '@angular/common';
import { ClientUpsertComponent } from './client-upsert/client-upsert.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ 
    ClientUpsertComponent,  
    ClientListComponent
  ],
  imports: [
    CommonModule, 
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [], 
})
export class ClientsModule {}
