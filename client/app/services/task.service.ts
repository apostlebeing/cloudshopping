import {Injectatble} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectatble()
export class TaskService{
    constructor(private http:Http){
        console.log('Task Service Initialized...');
    }
}