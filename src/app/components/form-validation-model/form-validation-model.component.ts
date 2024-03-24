import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { FormValidationModel } from './form-validation.model';
import { FormModelDirective } from '../../directives/form-model.directive';
import { ReplaySubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-form-validation-model',
  standalone: true,
  imports: [FormsModule, CommonModule, FormModelDirective],
  template: `
    <form
      #form="ngForm"
      [model]="model"
      (errors)="errors = $event"
      (ngForm$)="form$.next($event)"
    >
      <label for="firstInput"
        >First input:
        <input [(ngModel)]="model.firstInput" name="firstInput" />
      </label>
      <label *ngFor="let address of model.address; index as i" for="{{ i }}city"
        >Address city:
        <input [(ngModel)]="address.city" name="{{ i }}city" />
      </label>
      <button (click)="model.addExtraAddress()">Add city</button>
    </form>
    <pre>
      <code>
        {{ errors | json }} <br>
        {{ formValue$  | async | json }}
      </code>
    </pre>
  `,
  styleUrl: './form-validation-model.component.scss',
})
export class FormValidationModelComponent {
  model = new FormValidationModel();

  errors: any;

  form$ = new ReplaySubject<NgForm>();

  formValue$ = this.form$.pipe(switchMap((f) => f.valueChanges!));
}
