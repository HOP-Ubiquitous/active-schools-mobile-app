import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { MedicalCentersServiceApi } from './medical-centers.service_api';

@Injectable({
  providedIn: 'root'
})
export class MedicalCentersService {

  constructor(
    private router: Router,
    private medicalCentersServiceApi: MedicalCentersServiceApi,
  ) { }

  getMedicalCenters = () => {
    this.medicalCentersServiceApi.getMedicalCenters()
  }

}
