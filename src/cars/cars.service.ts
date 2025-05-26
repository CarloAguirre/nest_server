import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
// import { Car } from './interfaces/car.interface';
import { v4 as uuid } from "uuid";
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {

    constructor(
        @InjectRepository(Car)
        private readonly carRepository: Repository<Car>
    ){

    }

    private cars: Car[] = [
        {
            id: uuid(),
            brand:"Toyota",
            model: "corolla"
        },
        {
            id: uuid(),
            brand:"Nissan",
            model: "v-16"
        },
        {
            id: uuid(),
            brand:"Jeep",
            model: "Wrangler"
        },
    ]
    findAll(){
        return this.cars
    }

    findOneById(id: string){
        let car = this.cars.find(car => car.id == id)

        if(!car) throw new NotFoundException(`Car with id ${id} not found`);

        return car
    }

    async createCar(createCarDto : CreateCarDto){
        try {
            const car = this.carRepository.create(createCarDto)
            await this.carRepository.save(car)

            return car

        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Ayuda!')
        }
        // const newCar: Car = {
        //     id: uuid(),
        //     ...createCarDto
        // };
        // this.cars.push(newCar)
        // return this.cars;
    }

    updateCar(id: string, updateCarDto: UpdateCarDto): Car {
        const car = this.findOneById(id)

        const updatedCar = { ...car, ...updateCarDto }

        this.cars = this.cars.map(c => c.id === id ? updatedCar : c)

        return updatedCar
    }

}

