import { AppBlurbComponent } from './components/blurb/blurb';
import { AppComponent } from './app.component';
import { AppFooterComponent } from './components/footer/footer';
import { AppHeaderComponent } from './components/header/header';
import { AppIdeasComponent } from './components/ideas/ideas';
import { AppPortfolioComponent } from './components/portfolio/portfolio';
import { AppRoutingModule } from './app-routing.module';
import { AppSkillsComponent } from './components/skills/skills';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { MatCarouselModule } from 'ng-mat-carousel-plus';
import { MatButtonModule } from '@angular/material/button';
import { PortModalComponent } from './components/portfolio/portfolio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
    declarations: [
        AppBlurbComponent,
        AppComponent,
        AppFooterComponent,
        AppHeaderComponent,
        AppIdeasComponent,
        AppPortfolioComponent,
        AppSkillsComponent,
        PortModalComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        // DialogModule,
        LayoutModule,
        MatButtonModule,
        MatCardModule,
        MatCarouselModule,
        MatDialogModule,
        MatGridListModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatToolbarModule
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
