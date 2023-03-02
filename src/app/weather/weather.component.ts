import { Component, OnInit } from '@angular/core';
import { Capital } from './capital.model';
import { WeatherService } from './weather.service';
import { WeatherApi } from './weatherApi.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  
  form!: FormGroup;
  weatherData?: WeatherApi;
  requestState: 'loading' | 'success' | 'error' | 'none' = 'none';
  capitals: Capital[] = [
    {
      name: 'Prague',
      latitude: 50.09,
      longitude: 14.42
    },
    {
      name: 'Warsaw',
      latitude: 52.23,
      longitude: 21.01
    }
  ];
  timeout?: ReturnType<typeof setTimeout>;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.getWeather();
    this.form.get('capital')?.valueChanges.subscribe(() => this.getWeather());
    this.form.get('days')?.valueChanges.subscribe(() => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.getWeather(), 400);
    });
  }

  private getWeather(): void {
    this.requestState = 'loading';
    this.weatherService.getWeather(this.form.get('capital')?.value, this.form.get('days')?.value)
      .subscribe(res => {
        this.weatherData = res;
        this.requestState = 'success';
      });
  }

  private formInit(): void {
    this.form = new FormGroup({
    capital: new FormControl(this.capitals[0]),
    days: new FormControl(1)
    });
  }


}
