import { Component, OnInit, EventEmitter, ElementRef, Input, Output, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  @Input() public list: any[];
  @Output() select: EventEmitter<any> = new EventEmitter();
  @ViewChild('input') input: ElementRef;
  selectedItem: any[];
  selectedListItem: any[];
  isDropdown: boolean;
  selectedItemIndex: number;
  constructor() {
    this.list = [];
    this.selectedItem = [];
    this.selectedListItem = [];
    this.isDropdown = false;
    this.selectedItemIndex = null;
  }

  ngOnInit() {
  }

  // array pattern
  // this.list = [
  //   {
  //     key : '',
  //     value: ''
  //   }
  // ];

  onHover(e, i) {
    this.selectedItem = [];
    this.selectedItem[i] = true;
  }

  filter(event, value) {
    this.selectedItem = [];
    event.stopPropagation();
    if (value) {
      this.isDropdown = true;
      this.selectedListItem = this.list.filter(ele => {
        return ele.key.toLowerCase().indexOf(value.toLowerCase()) > -1;
      });
      console.log('here', this.selectedListItem);
    } else {
      this.isDropdown = true;
      this.selectedListItem = this.list;
    }
    // if (value && !this.selectedListItem.length) {
    //   this.isDropdown = false;
    // }
    if (event.keyCode === 40) {
      this.selectedItemIndex++;
      this.selectedItemIndex = this.selectedItemIndex >= this.selectedListItem.length ? this.selectedListItem.length - 1 : this.selectedItemIndex;
      this.selectedItem[this.selectedItemIndex] = true;
      if (document.querySelector('.selectedItem')) {
        const item = document.querySelector('.selectedItem').scrollIntoView(true);
      }
    }
    if (event.keyCode === 38) {
      this.selectedItemIndex--;
      this.selectedItemIndex = this.selectedItemIndex < 0 ? 0 : this.selectedItemIndex;
      this.selectedItem[this.selectedItemIndex] = true;
      if (document.querySelector('.selectedItem')) {
        const item = document.querySelector('.selectedItem').scrollIntoView(false);
      }
    }
  }

  selectOnEnter(e) {
    if (e.keyCode === 13 && this.selectedItem.length) {
      const item = document.querySelector('.selectedItem').innerHTML;
      this.input.nativeElement.value = item;
      this.select.emit(item);
      event.preventDefault();
      this.isDropdown = false;
    }
  }

  selectItem(item) {
    this.input.nativeElement.value = item.value;
    this.select.emit(item.value);
    this.isDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  outsideClick(e) {
    console.log(e.target.classList);
    if (!e.target.classList.contains('form-control') && !e.target.classList.contains('dropdown') && !e.target.classList.contains('dropdown-row')) {
      this.isDropdown = false;
    }
  }

}
