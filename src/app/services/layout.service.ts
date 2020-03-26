import { Injectable } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { UUID } from 'angular2-uuid';
import { NONE_TYPE } from '@angular/compiler';

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
    itemChangeCallback: function(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
      console.info('itemChanged', item, itemComponent);
    }
  };

  public layout: GridsterItem[] = [{cols: 2, rows: 1, y: 0, x: 0},{cols: 2, rows: 1, y: 0, x: 2},{cols: 2, rows: 1, y: 0, x: 0},{cols: 2, rows: 1, y: 0, x: 2},];

  constructor() { }

  addItem(): void {
    this.layout.push({
      cols: 5,
      id: UUID.UUID(),
      rows: 5,
      x: 0,
      y: 0
    });
  }

  deleteItem(id: string): void {
    const item = this.layout.find(d => d.id === id);
    this.layout.splice(this.layout.indexOf(item), 1);
  }
  
}
