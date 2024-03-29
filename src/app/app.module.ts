import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbIconModule, NbSidebarModule, NbMenuModule, NbCardModule, NbButtonModule, NbUserModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { TrucksModule } from './trucks/trucks.module';
import { PackagesModule } from './packages/packages.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { OfficesModule } from './offices/offices.module';
import { UsersModule } from './user/user.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientsModule } from './clients/clients.module';
import { UtilsModule } from './utils/utils.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChatModule } from './chat/chat.module';
import { MapModule } from './map/map.module';
import { DrawerModule } from './drawer/drawer.module';
import { AuthModule } from './auth/auth.module';
import { HeadersInterceptor } from './auth/headers-interceptor';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    UsersModule,
    TrucksModule,
    PackagesModule,
    DeliveriesModule,
    OfficesModule,
    ClientsModule,
    UtilsModule,
    DrawerModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'dark'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbCardModule,
    NbButtonModule,
    NbUserModule,
    ChatModule,
    MapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
