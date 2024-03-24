import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Address,
  FormDynamicBuilderNgxModel,
} from './form-dynamic-builder-ngx.model';
import { instanceToPlain } from 'class-transformer';
import { CommonModule } from '@angular/common';
import {
  ClassType,
  ClassValidatorFormBuilderService,
} from 'ngx-reactive-form-class-validator';
import { ReplaySubject, Subject, map, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-form-dynamic-builder-ngx',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  template: `
    <h1>ClassValidatorFormBuilder</h1>
    <form [formGroup]="form">
      <label for="firstInput">
        First Input: <br />
        <input
          name="firstInput"
          formControlName="firstInput"
          placeholder="Name"
        />
      </label>
      <br />
      <br />
      <div
        *ngFor="let extraForm of extrasForms$ | async"
        [formGroup]="extraForm"
      >
        <label for="city"
          >City: <br />
          <input formControlName="city" name="city" /><br />
          <span>{{ extraForm.get('city')?.errors | json }}</span>
        </label>
      </div>
    </form>
    <br />
    <button (click)="addCity$.next(true)">Add city</button>
  `,
  styleUrl: './form-dynamic-builder-ngx.component.scss',
})
export class FormDynamicBuilderNgxComponent implements OnInit {
  form = this.fb.group(
    FormDynamicBuilderNgxModel,
    instanceToPlain(new FormDynamicBuilderNgxModel())
  );

  addCity$ = new Subject<true>();

  extras$ = new ReplaySubject<ClassType<unknown>[]>();

  extrasForms$ = this.extras$.pipe(
    map((extras) => {
      return extras.map((Model) =>
        this.fb.group(Model, instanceToPlain(new Model()))
      );
    })
  );

  onAddCity$ = this.addCity$
    .pipe(withLatestFrom(this.extras$))
    .subscribe(([, extras]) => {
      this.extras$.next([...extras, Address]);
    });

  constructor(private fb: ClassValidatorFormBuilderService) {}

  ngOnInit(): void {
    this.extras$.next([Address]);
  }

  get errors() {
    return Object.keys(this.form.controls).map((name) => {
      return this.form.get(name)?.errors;
    });
  }
}
