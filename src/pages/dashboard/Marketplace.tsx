import { useState } from 'react';
import { Search, Filter, MapPin, Phone, MessageSquare, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockListings, kenyaCounties, kenyaCrops } from '@/lib/mockData';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [showCreateListing, setShowCreateListing] = useState(false);

  const filteredListings = mockListings.filter((listing) => {
    const matchesSearch = listing.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop = !selectedCrop || listing.crop === selectedCrop;
    const matchesCounty = !selectedCounty || listing.location === selectedCounty;
    return matchesSearch && matchesCrop && matchesCounty;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Marketplace
          </h1>
          <p className="text-muted-foreground">
            Browse and buy fresh produce from farmers
          </p>
        </div>
        <Button variant="accent" onClick={() => setShowCreateListing(!showCreateListing)}>
          <Plus className="w-4 h-4" />
          Create Listing
        </Button>
      </div>

      {/* Create Listing Form */}
      {showCreateListing && (
        <div className="bg-card rounded-2xl border border-border p-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-foreground mb-4">Create New Listing</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Crop Type</label>
              <select className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground">
                <option value="">Select crop</option>
                {kenyaCrops.map((crop) => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Quantity (kg)</label>
              <Input type="number" placeholder="e.g. 500" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Price per kg (KES)</label>
              <Input type="number" placeholder="e.g. 45" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Quality Grade</label>
              <select className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground">
                <option value="Premium">Premium</option>
                <option value="Standard">Standard</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
              <textarea
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground resize-none"
                rows={3}
                placeholder="Describe your produce..."
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button variant="accent">Publish Listing</Button>
            <Button variant="outline" onClick={() => setShowCreateListing(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="h-10 px-4 rounded-lg border border-input bg-background text-foreground"
        >
          <option value="">All Crops</option>
          {kenyaCrops.map((crop) => (
            <option key={crop} value={crop}>{crop}</option>
          ))}
        </select>
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

      {/* Listings Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-elevated transition-all duration-200"
          >
            {/* Image */}
            <div className="relative h-48 bg-muted">
              <img
                src={listing.image}
                alt={listing.crop}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400';
                }}
              />
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-sm font-medium text-foreground">
                {listing.quality}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{listing.crop}</h3>
                  <p className="text-sm text-muted-foreground">{listing.quantity} {listing.unit}</p>
                </div>
                <p className="text-xl font-bold text-accent">
                  KES {listing.price}<span className="text-sm font-normal text-muted-foreground">/{listing.unit === 'heads' ? 'head' : 'kg'}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <MapPin className="w-4 h-4" />
                {listing.location}
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                  {listing.farmer.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{listing.farmer}</p>
                  <p className="text-xs text-muted-foreground">Posted {listing.postedAt}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="accent" size="sm" className="flex-1">
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No listings found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
