import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementService } from '../../services/element.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewerComponent implements OnInit {
  elements: any[] = [];
  showPopup = false;
  selectedElement: any;
  displayedColumns: string[] = ['name', 'creationDate', 'completionDate', 'actions'];

  constructor(private elementService: ElementService, private router: Router) { }

  ngOnInit() {
    this.elementService.elements$.subscribe(elements => {
      this.elements = elements;
    });
  }

  openPopup(element: any) {
    this.selectedElement = element;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  moveElementUp(index: number) {
    this.elementService.moveElementUp(index);
  }

  moveElementDown(index: number) {
    this.elementService.moveElementDown(index);
  }

  navigateToEditor() {
    this.router.navigate(['/editor']);
  }
}
