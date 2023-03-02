import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    let queryParams = new HttpParams();
    queryParams = queryParams.append('latitude', capital.latitude);
    queryParams = queryParams.append('longitude', capital.longitude);
    queryParams = queryParams.append('daily', 'temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum');
    queryParams = queryParams.append('timezone', 'auto');
    queryParams = queryParams.append('start_date', new Date().toISOString().slice(0, 10));
    queryParams = queryParams.append('end_date', new Date (new Date().setDate(new Date().getDate() + days - 1)).toISOString().slice(0, 10));

    return this.http.get<WeatherApi>('https://api.open-meteo.com/v1/forecast', {params: queryParams});
  }
}
