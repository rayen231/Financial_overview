import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseChartDirective } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BaseChartDirective,
        BrowserModule,
        HttpClientTestingModule
      ],
      declarations: [DashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    // Initialize financialOverview data
    component.financialOverview = {
      totalRevenue: 10000,
      netProfit: 3500,
      expenses: 6500,
      savings: 1000
    };
    fixture.detectChanges();
  });

  it('should create the dashboard component', () => {
    expect(component).toBeTruthy();
  });
});
