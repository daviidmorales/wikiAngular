import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { MateriaComponent } from './materia/materia.component';

const routes: Routes = [
  { path: 'materia', component: MateriaComponent },
  { path: 'inicio', component: InicioComponent },
  { path: '**', component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
