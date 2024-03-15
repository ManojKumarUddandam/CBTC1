import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { PagesModule } from './pages/pages.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from './environments/environments';
import { PrasadDirective } from './prasad.directive';
import { FormsModule } from '@angular/forms';
import { DarkModeComponent } from './pages/dark-mode/dark-mode.component';
import { ResponsiveDirective } from './directives/responsive.directive'; // Import FormsModule
import { ResponsiveService } from './ResponsiveService.service';
@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, PrasadDirective, DarkModeComponent, ResponsiveDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    PagesModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule
  ],
  providers: [ResponsiveService],
  bootstrap: [AppComponent],
})
export class AppModule {}