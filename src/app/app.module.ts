import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MaterialModule } from './Material.Modules';
import { ServiceHttp } from './Service.Http';
import { ServiceLogin } from './Service.Login';
import { DeviceComponent } from './Devices/Device.component';
import { AppComponentLogin } from './LogIn/LogIn.component';

const routes = [
  {
    path: '',
    redirectTo: 'Device',
    pathMatch: 'full'
  },
  {
    path: 'Device',
    component: DeviceComponent
  },
  {
    path:'LogIn',
    component: AppComponentLogin
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    AppComponentLogin
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [ServiceHttp,ServiceLogin],
  bootstrap: [AppComponent]
})
export class AppModule {
}
