import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
// @UsePipes( ValidationPipe )
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ){}

    @Get()
    getAllCars(){
        return this.carsService.findAll()
    }

    @Get(':id')
    getCarById( @Param('id', new ParseUUIDPipe({version: '4'})) id: string ){
        const car = this.carsService.findOneById(id)
        return {
            car
        }
    }

    @Post()
    createCar(@Body() createCarDto: CreateCarDto){
        return this.carsService.createCar(createCarDto)
    }

    @Patch(':id')
    updateCar(
        @Param("id", ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDto
    ){
        return this.carsService.updateCar(id, updateCarDto)
    }
    
    @Delete(':id')
    deteleCar(@Param('id') id: number){
        return{
            id
        }
    }
}
