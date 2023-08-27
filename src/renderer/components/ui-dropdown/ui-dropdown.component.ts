import { Component, Input, OnInit } from '@angular/core';


interface OptionsList {
  value: string
  viewValue: string
}

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './ui-dropdown.component.html',
  styleUrls: ['./ui-dropdown.component.less']
})
export class CustomDropdownComponent implements OnInit {
  @Input() options: OptionsList[] = [];
  @Input() placeholder: string = "请输入内容";

  selectedOptions: OptionsList[] = [];
  filteredOptions: OptionsList[] = [];
  searchText: string = '';

  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.options;
  }

  filterItems(): void {
    this.filteredOptions = this.options.filter(option =>
      option.viewValue.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  toggleOption(option: OptionsList): void {
    const index = this.selectedOptions.findIndex(op => op.value.includes(option.value));
    if (index === -1) {
      this.selectedOptions.push(option);
    } else {
      this.selectedOptions.splice(index, 1);
    }
    this.searchText = this.selectedOptions.reduce((t, a) => { return t += a.viewValue }, '')
  }

  show(e: any) {
    console.log(e);
    this.searchText == '' && this.filterItems();
    // e.target.parentNode.querySelector('.options-list').style.display = "block"
    e.target.parentNode.querySelector('.options-list').style.cssText = `opacity:1; z-index:1000`;
  }

  hide(e: any) {
    e.target.parentNode.querySelector('.options-list').style.cssText = `opacity:0; z-index:-1`;
    console.log(e);
  }

  isSelected(option: OptionsList): boolean {
    return this.selectedOptions.includes(option);
  }

  changeItems() {
    if (this.searchText == '') {
      this.filteredOptions.splice(0);
      this.selectedOptions.splice(0)
    }
  }
}
