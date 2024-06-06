import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defer, map, Observable } from 'rxjs';
import { MyResponse } from 'src/interfaces/response';
import { ChosenLocation } from 'src/schemas/support.schema';

@Injectable()
export class SupportService {
    constructor(@InjectModel(ChosenLocation.name) private locationModel: Model<ChosenLocation>) { }

    findAll(): Observable<MyResponse<ChosenLocation[]>> {
        return defer(() => this.locationModel.find().exec().then((location) => {
            return location.map(loc => {
                let loc1: ChosenLocation = {
                    city: loc.city,
                    country: loc.country,
                    lat: loc.lat,
                    lon: loc.lon
                }
                return loc1;
            })
        }, (_err) => {
            return undefined;
        }))
            .pipe(map(location => {
                let response: MyResponse<ChosenLocation[]> = {
                    successful: location ? true : false,
                    data: location,
                    errorMessage: !location ? "Failure in MongoDB" : undefined,
                };
                return response;
            }));
    }
}
