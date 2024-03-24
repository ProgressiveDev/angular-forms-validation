import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ClassValidatorFormBuilderModule } from 'ngx-reactive-form-class-validator';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(ClassValidatorFormBuilderModule.forRoot()),
  ],
};
