import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceListComponent } from './marketplace-list/marketplace-list.component';
import { RouterModule } from '@angular/router';
import { marketplaceRoutes } from './marketplace.routing';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key/find-by-key.module';

@NgModule({
  declarations: [MarketplaceListComponent],
  imports: [RouterModule.forChild(marketplaceRoutes), SharedModule, MatIconModule, FuseFindByKeyPipeModule, CommonModule],
})
export class MarketplaceModule {}
