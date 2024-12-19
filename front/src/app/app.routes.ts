import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { InsightsComponent } from './insights/insights.component';
import { NewsComponent } from './news/news.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StocksViewComponent } from './stocks-view/stocks-view.component';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { EditProductComponent } from './edit-product/edit-product.component';
export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'insights', component: InsightsComponent },
    { path: 'news', component: NewsComponent },
    { path: 'stock-details/:symbol', component: StockDetailsComponent }, // Add this route
    {path : 'stocks-view', component: StocksViewComponent},
    {path : 'test', component: TestComponent},
    {path : 'edit-product/:id', component: EditProductComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}