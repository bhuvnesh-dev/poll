import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollPage } from './poll.page';

const routes: Routes = [
  {
    path: '',
    component: PollPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollPageRoutingModule {}
