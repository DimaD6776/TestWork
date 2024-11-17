import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Element {
  name: string;
  creationDate: Date;
  completionDate: Date;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private elementsSubject = new BehaviorSubject<Element[]>([]);
  elements$ = this.elementsSubject.asObservable();

  constructor() {
    const savedElements = localStorage.getItem('elements');
    if (savedElements) {
      this.elementsSubject.next(JSON.parse(savedElements));
    }
  }

  addElement(element: Element) {
    const currentElements = this.elementsSubject.value;
    const newElements = [...currentElements, element];
    this.elementsSubject.next(newElements);
    this.saveElementsToLocalStorage(newElements);
  }

  getElements() {
    return this.elementsSubject.value;
  }

  deleteElement(index: number) {
    const currentElements = this.elementsSubject.value;
    currentElements.splice(index, 1);
    this.elementsSubject.next(currentElements);
    this.saveElementsToLocalStorage(currentElements);
  }

  copyElement(index: number) {
    const currentElements = this.elementsSubject.value;
    const element = { ...currentElements[index] };
    element.creationDate = new Date();
    const newElements = [...currentElements, element];
    this.elementsSubject.next(newElements);
    this.saveElementsToLocalStorage(newElements);
  }

  moveElementUp(index: number) {
    const currentElements = this.elementsSubject.value;
    if (index > 0) {
      [currentElements[index], currentElements[index - 1]] = [currentElements[index - 1], currentElements[index]];
      this.elementsSubject.next([...currentElements]);
      this.saveElementsToLocalStorage(currentElements);
    }
  }

  moveElementDown(index: number) {
    const currentElements = this.elementsSubject.value;
    if (index < currentElements.length - 1) {
      [currentElements[index], currentElements[index + 1]] = [currentElements[index + 1], currentElements[index]];
      this.elementsSubject.next([...currentElements]);
      this.saveElementsToLocalStorage(currentElements);
    }
  }

  private saveElementsToLocalStorage(elements: Element[]) {
    localStorage.setItem('elements', JSON.stringify(elements));
  }
}

// мщварплво
