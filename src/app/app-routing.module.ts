import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OlympicGameComponent } from './components/olympic-game/olympic-game.component';
import { SingleCountryComponent } from './components/single-country/single-country.component';

const routes: Routes = [
  {
    path: '',
    component: OlympicGameComponent,
  },
  {
    path: 'country/:name',
    component: SingleCountryComponent,
  },
  {
    path : 'not-found',
    component : NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
