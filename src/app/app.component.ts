import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormValidationModelComponent } from './components/form-validation-model/form-validation-model.component';
import { FormDynamicBuilderNgxComponent } from './components/form-dynamic-builder-ngx/form-dynamic-builder-ngx.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormValidationModelComponent, FormDynamicBuilderNgxComponent],
  styleUrl: './app.component.scss',
  template: `
    <app-form-validation-model></app-form-validation-model>
    <hr />
    <app-form-dynamic-builder-ngx></app-form-dynamic-builder-ngx>
  `,
})
export class AppComponent {
  title = 'angular-forms-validation';
}
