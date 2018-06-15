import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule,
  MatButtonModule,MatGridListModule,MatRadioModule],
  exports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule,
  MatToolbarModule,MatGridListModule,MatRadioModule]
})
export class MaterialModule { }
