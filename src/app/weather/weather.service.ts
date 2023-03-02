import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Capital } from './capital.model';
import { WeatherApi } from './weatherApi.model';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  getWeather(capital: Capital, days: number): Observable<WeatherApi> {
    return this.http.get<WeatherApi>('https://api.open-meteo.com/v1/forecast',{
      params: {
        latitude: capital.latitude,
        longitude: capital.longitude,
        daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum',
        timezone: 'auto',
        start_date: new Date().toISOString().slice(0, 10),
        end_date: new Date (new Date().setDate(new Date().getDate() + days - 1)).toISOString().slice(0, 10)
      }
  });
  }
}
