import { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockMarketPrices, kenyaCounties } from '@/lib/mockData';

const MarketPrices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');

  const filteredPrices = mockMarketPrices.filter((item) => {
    const matchesSearch = item.crop.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCounty = !selectedCounty || item.location.toLowerCase().includes(selectedCounty.toLowerCase());
    return matchesSearch && matchesCounty;
  });

  const getPriceChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  const getPriceIndicator = (current: number, previous: number) => {
    if (current > previous) {
      return { icon: TrendingUp, color: 'text-secondary', bg: 'bg-secondary/10' };
    } else if (current < previous) {
      return { icon: TrendingDown, color: 'text-destructive', bg: 'bg-destructive/10' };
    }
    return { icon: Minus, color: 'text-muted-foreground', bg: 'bg-muted' };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Market Prices
        </h1>
        <p className="text-muted-foreground">
          Real-time crop prices across Kenya
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search crops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCounty}
          onChange={(e) => setSelectedCounty(e.target.value)}
          className="h-10 px-4 rounded-lg border border-input bg-background text-foreground"
        >
          <option value="">All Locations</option>
          {kenyaCounties.map((county) => (
            <option key={county} value={county}>{county}</option>
          ))}
        </select>
      </div>

      {/* Price Cards - Mobile View */}
      <div className="grid gap-4 md:hidden">
        {filteredPrices.map((item) => {
          const indicator = getPriceIndicator(item.currentPrice, item.previousPrice);
          const change = getPriceChange(item.currentPrice, item.previousPrice);
          return (
            <div key={item.id} className="bg-card p-4 rounded-2xl border border-border">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{item.crop}</h3>
                  <p className="text-sm text-muted-foreground">{item.location}</p>
                </div>
                <div className={`p-2 rounded-lg ${indicator.bg}`}>
                  <indicator.icon className={`w-5 h-5 ${indicator.color}`} />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">KES {item.currentPrice}</p>
                  <p className="text-sm text-muted-foreground">per kg</p>
                </div>
                <div className={`text-sm font-medium ${indicator.color}`}>
                  {parseFloat(change) >= 0 ? '+' : ''}{change}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Price Table - Desktop View */}
      <div className="hidden md:block bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Crop</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Current Price</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Previous Price</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Change</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Location</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrices.map((item) => {
                const indicator = getPriceIndicator(item.currentPrice, item.previousPrice);
                const change = getPriceChange(item.currentPrice, item.previousPrice);
                return (
                  <tr key={item.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-foreground">{item.crop}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-foreground">KES {item.currentPrice}/kg</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-muted-foreground">KES {item.previousPrice}/kg</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${indicator.bg}`}>
                          <indicator.icon className={`w-4 h-4 ${indicator.color}`} />
                        </div>
                        <span className={`font-medium ${indicator.color}`}>
                          {parseFloat(change) >= 0 ? '+' : ''}{change}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-muted text-sm text-foreground">
                        {item.location}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-muted-foreground text-sm">{item.lastUpdated}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPrices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No crops found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default MarketPrices;
