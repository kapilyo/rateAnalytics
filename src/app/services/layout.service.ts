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

  public options: GridsterConfig = {
    displayGrid: 'none',
    draggable: {
      enabled: true
    },
    pushItems: true,
    resizable: {
      enabled: true
    },
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

  addItem(): void {
    this.layout.push({
      cols: 5,
      id: UUID.UUID(),
      rows: 5,
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
    //todo
    console.log(this.layout);
  }

  getComponentRef(id: string): string {
    const comp = this.components.find(c => c.id == id);
    return comp ? comp.componentRef : null;
  }

}
