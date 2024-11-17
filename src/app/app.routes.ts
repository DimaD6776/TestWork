import { Routes } from '@angular/router';
import { EditorComponent } from './editor/edit-page/edit-page.component';
import { ViewerComponent } from './viewr/view-page/view-page.component';

export const routes: Routes = [
  { path: 'editor', component: EditorComponent },
  { path: 'viewer', component: ViewerComponent },
  { path: '', redirectTo: '/viewer', pathMatch: 'full' },
];
