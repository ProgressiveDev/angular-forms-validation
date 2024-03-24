import {
  Directive,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { validateSync } from 'class-validator';
import { Observable, delay, map, of, shareReplay, tap } from 'rxjs';

@Directive({
  selector: 'form',
  standalone: true,
})
export class FormModelDirective {
  ngForm = this.getNgForm();

  @Input() model: any;

  @Output() ngForm$: Observable<NgForm> = of(this.ngForm);
  @Output('errors') errors$ = this.ngForm.form.valueChanges.pipe(
    delay(0),
    map(() => validateSync(this.model)),
    shareReplay(1)
  );

  constructor(private host: ViewContainerRef) {}

  getNgForm() {
    return this.host.injector.get(NgForm);
  }
}
