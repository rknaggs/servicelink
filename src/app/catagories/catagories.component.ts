import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-catagories',
  templateUrl: './catagories.component.html',
  styleUrls: ['./catagories.component.css']
})
export class CatagoriesComponent implements OnInit {

  @ViewChild('catagoryName', { static: false }) catagoryName: ElementRef;

  isDisabled = false;

  constructor() { }

  items = [
    { name: 'Category 1', seq: 1, edit: false },
    { name: 'Category 2', seq: 2, edit: false },
    { name: 'Category 3', seq: 3, edit: false },
    { name: 'Category 4', seq: 4, edit: false },
    { name: 'Category 5', seq: 5, edit: false },
    { name: 'Category 6', seq: 6, edit: false }
  ];


  ngOnInit() {
    this.reSequenceList();
  }

  onAdd() {
    this.isDisabled = true;
    this.items.push({ name: 'category', seq: this.items.length + 1, edit: true });
  }

  onAddName(item) {
    item.edit = false;
    item.name = this.catagoryName.nativeElement.value;
    this.isDisabled = false;
  }

  onDelete(item) {
    for (let i = 0; i < this.items.length; i++) {
      if (item.seq === this.items[i].seq) {
        this.items.splice(i, 1);
        break;
      }
    }

    this.reSequenceList();
  }

  reSequenceList() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].seq = i + 1;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.reSequenceList();
  }

}
