export interface WeatherApi {
    daily: {
        precipitation_sum: number[];
        sunrise: string[];
        sunset: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        time: number[];
    };
    daily_units: {
        precipitation_sum: string;
        sunrise: string;
        sunset: string;
        temperature_2m_max: string;
        temperature_2m_min: string;
        time: string;
    };
    elevation: number;
    generationtime_ms: number;
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_abbreviation: string;
    utc_offset_seconds: number;
}