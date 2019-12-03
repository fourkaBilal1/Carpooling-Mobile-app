import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ErrorHandler, NgModule} from '@angular/core';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { PassagerPage } from '../pages/passager/passager';
import { ConducteurPage } from '../pages/conducteur/conducteur';
import { NotificationsPage } from '../pages/notifications/notifications';
import { BesoinAidePage } from '../pages/besoin-aide/besoin-aide';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { RegisterPage } from '../pages/register/register';
import { Register2Page } from '../pages/register2/register2';
import { HttpModule } from '@angular/http';
import { DemandsForOfferPage } from '../pages/demands-for-offer/demands-for-offer';
import { AddDemandPage } from '../pages/add-demand/add-demand';
import { AddOfferPage } from '../pages/add-offer/add-offer';
import { ListOffersPage } from '../pages/list-offers/list-offers';
import { AddCarPage } from '../pages/add-car/add-car';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule } from '@angular/common/http';
import { DemandProvider } from '../providers/demand/demand';
import { OfferProvider } from '../providers/offer/offer';
import { UserProvider } from '../providers/user/user';
import { IonicStorageModule } from '@ionic/storage';
import { DataServiceProvider } from '../providers/data-service/data-service';



@NgModule({
  declarations: [
    MyApp,
    PassagerPage,
    ConducteurPage,
    NotificationsPage,
    BesoinAidePage,
    HomePage,
    ListPage,
    TabsPage,
    LoginPage,
    DashboardPage,
    RegisterPage,
    DemandsForOfferPage,
    AddDemandPage,
    AddOfferPage,
    ListOffersPage,
    Register2Page,
    AddCarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PassagerPage,
    ConducteurPage,
    NotificationsPage,
    BesoinAidePage,
    HomePage,
    ListPage,
    TabsPage,
    LoginPage,
    DashboardPage,
    RegisterPage,
    DemandsForOfferPage,
    AddDemandPage,
    AddOfferPage,
    ListOffersPage,
    Register2Page,
    AddCarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DemandProvider,
    OfferProvider,
    UserProvider,
    DataServiceProvider
  ]
})
export class AppModule {}
