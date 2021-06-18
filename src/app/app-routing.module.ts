import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CidadeListaComponent } from './cidade/cidade-lista/cidade-lista.component';
import { CidadeFormComponent } from './cidade/cidade-form/cidade-form.component';
import { ClienteListaComponent } from './cliente/cliente-lista/cliente-lista.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent  },
  { path: 'cidade', component: CidadeListaComponent  },
  { path: 'cidade/nome/:nome', component: CidadeListaComponent  },
  { path: 'cidade/estado/:estado', component: CidadeListaComponent  },
  { path: 'cidade/editar/:id', component: CidadeFormComponent  },
  { path: 'cidade/novo', component: CidadeFormComponent  },
  { path: 'cliente', component: ClienteListaComponent  },
  { path: 'cliente/nome/:nome', component: ClienteListaComponent  },
  { path: 'cliente/:id', component: ClienteFormComponent  },
  { path: 'cliente/editar/:id', component: ClienteFormComponent  },
  { path: 'cliente/novo', component: ClienteFormComponent  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 