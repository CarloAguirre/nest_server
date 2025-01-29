import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from "uuid";

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            marca:"Toyota",
            modelo: "corolla"
        },
        {
            id: uuid(),
            marca:"Nissan",
            modelo: "v-16"
        },
        {
            id: uuid(),
            marca:"Jeep",
            modelo: "Wrangler"
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
}

