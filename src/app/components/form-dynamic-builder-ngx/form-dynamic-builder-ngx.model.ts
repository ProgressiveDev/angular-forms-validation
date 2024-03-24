import { IsNotEmpty, ValidateNested } from 'class-validator';

export class Address {
  @IsNotEmpty()
  city = '';
}

export class FormDynamicBuilderNgxModel {
  @IsNotEmpty()
  firstInput = '';

  //   @ValidateNested()
  //   address = new Address();
}
