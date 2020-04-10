import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PowerBiReportsService {

  private POWER_BI_API_URL = "https://powerbiapiwebapp.azurewebsites.net/api/values/GetReport?widgetType=";

  constructor(private httpClient: HttpClient) { }

   public sendGetRequest(){
    return this.httpClient.get(this.POWER_BI_API_URL + 'PieChart');
  }
}
