import { IsNotEmpty, ValidateNested } from 'class-validator';

export class Address {
  @IsNotEmpty()
  city = '';
}

export class FormValidationModel {
  @IsNotEmpty()
  firstInput = '';

  @ValidateNested()
  address = [new Address()];

  addExtraAddress() {
    this.address.push(new Address());
  }
}
