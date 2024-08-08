// src/movies/dto/movie-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class MovieResponseDto {
  @ApiProperty({ description: 'The unique identifier of the movie' })
  id: string;

  @ApiProperty({ description: 'The title of the movie' })
  title: string;

  @ApiProperty({ description: 'The publishing year of the movie' })
  publishingYear: number;

  @ApiProperty({ description: 'The URL of the movie poster' })
  poster: string;
}
