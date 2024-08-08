// src/movies/dto/create-movie.dto.ts
import { IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ description: 'The title of the movie' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The publishing year of the movie' })
  @IsInt()
  @Min(1800, { message: 'Publishing year must be later than 1800' })
  publishingYear: number;
}
