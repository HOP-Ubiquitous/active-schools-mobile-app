import { Injectable } from '@angular/core';
import { RoutesServiceApi } from './routes.service_api';
//import { ROUTES } from './routes-constants';

@Injectable({
  providedIn: 'root'
})

export class RoutesService {
  restAPI: string = '';
  routesData: any;

  constructor(private routeServiceApi: RoutesServiceApi) { }

  ngOnInit() {
    this.getRoutes();
  }

  getRoutes() {
    this.routeServiceApi.getRoutes();
  }

}
