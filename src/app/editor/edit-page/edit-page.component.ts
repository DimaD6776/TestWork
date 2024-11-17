import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElementService } from '../../services/element.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatListModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditorComponent implements OnInit {
  elements: any[] = [];
  showPopup = false;
  elementForm: FormGroup;

  constructor(private elementService: ElementService, private router: Router, private fb: FormBuilder) {
    this.elementForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9а-яА-ЯёЁ]+$/)]],
      creationDate: [new Date()],
      completionDate: [new Date()],
      description: ['']
    });
  }

  ngOnInit() {
    this.elementService.elements$.subscribe(elements => {
      this.elements = elements;
    });
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.elementForm.reset();
  }

  addElement() {
    if (this.elementForm.valid) {
      const newElement = this.elementForm.value;
      this.elementService.addElement(newElement);
      this.closePopup();
    }
  }

  deleteElement(index: number) {
    this.elementService.deleteElement(index);
  }

  copyElement(index: number) {
    this.elementService.copyElement(index);
  }

  navigateToViewer() {
    this.router.navigate(['/viewer']);
  }
}
