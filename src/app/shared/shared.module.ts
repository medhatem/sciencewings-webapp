import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from './pipes/transloco.pipe';
import { FuseCardModule } from '@fuse/components/card/card.module';

@NgModule({
  declarations: [TranslatePipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FuseCardModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, TranslatePipe, FuseCardModule],
})
export class SharedModule {}
