import { CloudRain, Wind, Droplets, AlertTriangle, Sun, Cloud } from 'lucide-react';
import { mockWeather } from '@/lib/mockData';

const Weather = () => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-12 h-12 text-accent" />;
      case 'rain':
        return <CloudRain className="w-12 h-12 text-primary" />;
      case 'cloudy':
        return <Cloud className="w-12 h-12 text-muted-foreground" />;
      default:
        return <Sun className="w-12 h-12 text-accent" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Weather Forecast
        </h1>
        <p className="text-muted-foreground">
          Plan your farming activities with accurate weather data
        </p>
      </div>

      {/* Current Weather */}
      <div className="bg-card rounded-2xl border border-border p-6 primary-gradient text-primary-foreground">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="text-8xl">⛅</div>
            <div>
              <p className="text-primary-foreground/70 mb-1">{mockWeather.current.location}</p>
              <p className="text-5xl font-bold mb-2">{mockWeather.current.temp}°C</p>
              <p className="text-xl text-primary-foreground/90">{mockWeather.current.condition}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 text-primary-foreground/70 mb-1">
                <Droplets className="w-4 h-4" />
                <span className="text-sm">Humidity</span>
              </div>
              <p className="text-2xl font-bold">{mockWeather.current.humidity}%</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 text-primary-foreground/70 mb-1">
                <Wind className="w-4 h-4" />
                <span className="text-sm">Wind</span>
              </div>
              <p className="text-2xl font-bold">{mockWeather.current.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">7-Day Forecast</h2>
        <div className="grid grid-cols-7 gap-2 md:gap-4">
          {mockWeather.forecast.map((day, index) => (
            <div
              key={day.day}
              className={`text-center p-3 md:p-4 rounded-xl transition-colors ${
                index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <p className={`text-sm font-medium mb-2 ${index === 0 ? 'text-primary-foreground' : 'text-foreground'}`}>
                {day.day}
              </p>
              <div className="text-3xl md:text-4xl mb-2">{day.icon}</div>
              <p className={`text-xl font-bold ${index === 0 ? 'text-primary-foreground' : 'text-foreground'}`}>
                {day.temp}°
              </p>
              <p className={`text-xs mt-1 hidden md:block ${index === 0 ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                {day.condition}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Alerts */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-accent" />
          Agricultural Alerts
        </h2>
        <div className="space-y-3">
          {mockWeather.alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border ${
                alert.type === 'rain'
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-secondary/10 border-secondary/20'
              }`}
            >
              <div className="flex items-start gap-3">
                {alert.type === 'rain' ? (
                  <CloudRain className="w-5 h-5 text-primary mt-0.5" />
                ) : (
                  <Sun className="w-5 h-5 text-secondary mt-0.5" />
                )}
                <p className="text-foreground">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Farming Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-3">🌱 Planting</h3>
          <ul className="space-y-2">
            <li className="text-muted-foreground text-sm flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
              Good conditions for planting maize and beans this week
            </li>
            <li className="text-muted-foreground text-sm flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
              Wait until after Thursday's rain for tomato transplants
            </li>
          </ul>
        </div>
        
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-3">🌾 Harvesting</h3>
          <ul className="space-y-2">
            <li className="text-muted-foreground text-sm flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
              Harvest potatoes before Wednesday's rain
            </li>
            <li className="text-muted-foreground text-sm flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
              Dry grains thoroughly - humidity expected to rise
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Weather;
