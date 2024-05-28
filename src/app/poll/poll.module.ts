import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PollPage } from './poll.page';

import { PollPageRoutingModule } from './poll-routing.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PollPageRoutingModule,
    HttpClientModule
  ],
  declarations: [PollPage],
  providers: [SocialSharing,HttpClient],
})
export class PollPageModule {}
