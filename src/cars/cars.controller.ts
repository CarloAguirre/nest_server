import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
@UsePipes( ValidationPipe )
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
        return createCarDto
    }

    @Patch(':id')
    updateCar(@Body() body: any, @Param("id") id: number){
        return{
            response: body,
            id
        }
    }
    
    @Delete(':id')
    deteleCar(@Param('id') id: number){
        return{
            id
        }
    }
}
