import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { reducers } from './store/reducers/app.reducer';
import { effects } from './store/effects/app.effects';
import { DialogsModule } from './modules/dialogs/dialogs.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		SharedModule,
		DialogsModule,
		AppRoutingModule,
		StoreModule.forRoot(reducers),
		EffectsModule.forRoot(effects),
		environment.devTools
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
