// src/movies/movies.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieResponseDto } from './dto/movie-response.dto';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
    ) {}

    async create(
        createMovieDto: CreateMovieDto,
        file: Express.Multer.File,
    ): Promise<MovieResponseDto> {
        const poster = file.buffer.toString('base64'); // Convert file buffer to base64 string
        const movie = this.movieRepository.create({
            ...createMovieDto,
            poster,
        });
        const savedMovie = await this.movieRepository.save(movie);
        return this.toResponseDto(savedMovie);
    }

    async findAll(): Promise<MovieResponseDto[]> {
        const movies = await this.movieRepository.find();
        return movies.map((movie) => this.toResponseDto(movie));
    }

    async findOne(id: string): Promise<MovieResponseDto> {
        const movie = await this.movieRepository.findOne({ where: { id } });
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        return this.toResponseDto(movie);
    }

    async update(
        id: string,
        updateMovieDto: UpdateMovieDto,
        file: Express.Multer.File,
    ): Promise<MovieResponseDto> {
        const poster = file ? file.buffer.toString('base64') : undefined;
        await this.movieRepository.update(id, { ...updateMovieDto, poster });
        const updatedMovie = await this.movieRepository.findOne({
            where: { id },
        });
        if (!updatedMovie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        return this.toResponseDto(updatedMovie);
    }

    async remove(id: string): Promise<void> {
        const result = await this.movieRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
    }

    private toResponseDto(movie: Movie): MovieResponseDto {
        const { id, title, publishingYear, poster } = movie;
        return { id, title, publishingYear, poster };
    }
}
