import { Injectable } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { UUID } from 'angular2-uuid';
import { NONE_TYPE } from '@angular/compiler';

// custom interface
export interface IComponent {
  id: string;
  componentRef: string;
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public editableGrid:boolean = false;

  public options: GridsterConfig = {
    compactType: 'none', //compactLeft&Up
    displayGrid: 'onDrag&Resize',
    draggable: {
      enabled: false
    },
    pushItems: true,
    resizable: {
      enabled: false,
    },
    minCols: 10,
    minRows: 10,
    itemChangeCallback: function (item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
      console.info('itemChanged', item, itemComponent);
    }
  };

  public layout: GridsterItem[] = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).layout : [];
  // { id: 'a1', cols: 2, rows: 1, y: 0, x: 0, title: 'item A1' },
  // { id: 'a2', cols: 2, rows: 1, y: 0, x: 2, title: 'item A2' },
  // { id: 'a3', cols: 2, rows: 1, y: 0, x: 0, title: 'item A3' },
  // { id: 'a4', cols: 2, rows: 1, y: 0, x: 2, title: 'item A4' }];

  public components: IComponent[] = [];
  dropId: string;

  constructor() { }


  configuireWidgets():void{
    this.options.draggable.enabled = true;
    this.editableGrid = true;
    this.options.resizable.enabled = true;
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }


  addItem(): void {
    this.layout.push({
      cols: 2,
      id: UUID.UUID(),
      rows: 3,
      x: 0,
      y: 0,
      title: 'default title'
    });
  }




  deleteItem(id) {
    var item = this.layout.find(d => d.id == id.id);
    this.layout.splice(this.layout.indexOf(item), 1);
    const comp = this.components.find(c => c.id == id.id);
    this.components.splice(this.components.indexOf(comp), 1);
  }

  setDropId(dropId: string): void {
    this.dropId = dropId;
  }

  dropItem(dragId: string): void {
    const { components } = this;
    const comp: IComponent = components.find(c => c.id === this.dropId);

    const updateIdx: number = comp ? components.indexOf(comp) : components.length;
    const componentItem: IComponent = {
      id: this.dropId,
      componentRef: dragId
    };
    this.components = Object.assign([], components, { [updateIdx]: componentItem });
  }

  saveWidgets(): void {
    console.log(this.layout);
    this.editableGrid = false;
    this.options.draggable.enabled = false;
    this.options.resizable.enabled = false;
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  getComponentRef(id: string): string {
    const comp = this.components.find(c => c.id == id);
    return comp ? comp.componentRef : null;
  }

}
