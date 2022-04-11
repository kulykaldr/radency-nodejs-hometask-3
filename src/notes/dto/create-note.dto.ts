import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly category: string;
  
  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
