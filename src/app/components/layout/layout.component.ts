import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { LayoutService, IComponent } from '../../services/layout.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, MultiDataSet, Color } from 'ng2-charts';

import { PowerBiReportsService } from '../../services/power-bi-reports.service'

import * as pbi from 'powerbi-client';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public currentUser;

  public drillDowned = false;
  get options(): GridsterConfig {
    return this.layoutService.options;
  }
  get layout(): GridsterItem[] {
    return this.layoutService.layout;
  }

  get components(): IComponent[] {
    return this.layoutService.components;
  }

  //bar chart starts
  public barChartOptions: ChartOptions = { responsive: true, };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  //bar chart ends

  public cars: any = [
    {
      brand: 'chevrolet',
      sold: 50,
      models: [
        { model: 'beat', sold: 15 },
        { model: 'spark', sold: 10 },
        { model: 'cruze', sold: 5 },
        { model: 'sail', sold: 20 }]
    },
    {
      brand: 'hyundai',
      sold: 60,
      models: [
        { model: 'veloster', sold: 15 },
        { model: 'i20', sold: 10 },
        { model: 'elantra', sold: 15 },
        { model: 'i30', sold: 20 }]
    },
    {
      brand: 'honda',
      sold: 30,
      models: [
        { model: 'city', sold: 5 },
        { model: 'civic', sold: 5 },
        { model: 'brios', sold: 15 },
        { model: 'accord', sold: 5 }]
    }
  ];

  public getCarBrands = function () {
    var carBrands = [];
    this.cars.forEach(function (car) {
      carBrands.push(car.brand);
    });
    return carBrands;
  }

  public getCarsSold = function () {
    var carBrands = [];
    this.cars.forEach(function (car) {
      carBrands.push(car.sold);
    });
    return carBrands;
  }

  chartClicked = function (eve) {

    var activePoints = eve.active;
    if (activePoints[0]) {
      if (!this.drillDowned) {
        this.drillDowned = true;
        
        var chartData = activePoints[0]['_chart'].config.data;
        this.CardoughnutChartType = 'bar';
        var idx = activePoints[0]['_index'];
        var label = chartData.labels[idx];
        if (label == 'chevrolet') {
          //eve.active[0]._chart.data.datasets[0].data = [15,20,50,80,10];
          //eve.active[0]._chart.config.data.labels = ['beat', 'spark', 'cruze', 'sail','captiva'];
          chartData.datasets[0].backgroundColor = ['rgb(235, 141, 161)', 'rgb(126, 153, 205)', 'rgb(203, 185, 134)', 'rgb(126, 189, 169)'];
          this.CardoughnutChartData = [15, 20, 50, 80];
          this.CardoughnutChartLabels = ['beat', 'spark', 'cruze', 'sail',];
        } else if (label == 'honda') {
          chartData.datasets[0].backgroundColor = ['rgb(235, 141, 161)', 'rgb(126, 153, 205)', 'rgb(203, 185, 134)', 'rgb(126, 189, 169)', 'rgb(186, 189, 169)'];
          this.CardoughnutChartData = [20, 10, 30, 10];
          this.CardoughnutChartLabels = ['brios', 'accord', 'city', 'civic'];
        }
        else {
          chartData.datasets[0].backgroundColor = ['rgb(235, 141, 161)', 'rgb(126, 153, 205)', 'rgb(203, 185, 134)', 'rgb(126, 189, 169)', 'rgb(186, 189, 169)'];
          this.CardoughnutChartData = [20, 10, 30, 10];
          this.CardoughnutChartLabels = ['veloster', 'i30', 'creta', 'elantra'];
        }
      }
    }
  }

  public CardoughnutChartLabels: Label[] = this.getCarBrands();
  public CardoughnutChartData: MultiDataSet = this.getCarsSold();
  public CardoughnutChartType: ChartType = 'doughnut';
  CardoughnutChartColors: Color[] = [{ backgroundColor: ['rgb(235, 141, 161)', 'rgb(126, 153, 205)', 'rgb(203, 185, 134)'] }];

  backDrillClick = function () {
    this.drillDowned = false;
    this.CardoughnutChartLabels = this.getCarBrands();
    this.CardoughnutChartData = this.getCarsSold();
    this.CardoughnutChartType = 'doughnut';
  }




  //public screenHeight: number;
  @ViewChild('reportcontainer') reportcontainer: ElementRef;

  powerBIobject: any = {
    embedUrl: '',
    reportId: '',
    embedToken: ''
  };


  constructor(public layoutService: LayoutService, private powerBiReportService: PowerBiReportsService, private toastr: ToastrService) {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
  }

  private buildEmbedConfig(data) {
    return <pbi.IEmbedConfiguration>{
      type: 'report',
      tokenType: pbi.models.TokenType.Embed,
      accessToken: data.embedToken,
      embedUrl: data.embedUrl,
      id: data.reportId,
      settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: false
      }
    };
  }


  ngOnInit(): void { }

  ngAfterViewInit() {
    this.powerBiReportService.sendGetRequest().subscribe((data: any[]) => {
      console.log(data);
      this.powerBIobject = data;
      const powerbi = new pbi.service.Service(
        pbi.factories.hpmFactory,
        pbi.factories.wpmpFactory,
        pbi.factories.routerFactory
      );
      const embedConfig = this.buildEmbedConfig(data);
      powerbi.reset(this.reportcontainer.nativeElement);
      powerbi.embed(this.reportcontainer.nativeElement, embedConfig);
    })
  }

}
