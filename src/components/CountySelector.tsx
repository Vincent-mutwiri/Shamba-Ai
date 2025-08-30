import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { COUNTY_LOCATIONS, getLocationsByCounty } from "@/data/county-locations";

interface CountySelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  showLocations?: boolean;
  onLocationChange?: (location: string) => void;
}

const KENYAN_COUNTIES = COUNTY_LOCATIONS.map(c => c.county);

export const CountySelector = ({ 
  value, 
  onValueChange, 
  placeholder = "Select your county",
  className = "",
  showLocations = false,
  onLocationChange
}: CountySelectorProps) => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const locations = value ? getLocationsByCounty(value) : [];

  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={`w-full ${className}`}>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-600" />
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-60">
          <SelectItem value="all">All Counties</SelectItem>
          {KENYAN_COUNTIES.map((county) => (
            <SelectItem key={county} value={county.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
              {county} County
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {showLocations && locations.length > 0 && (
        <Select value={selectedLocation} onValueChange={(loc) => {
          setSelectedLocation(loc);
          onLocationChange?.(loc);
        }}>
          <SelectTrigger className={`w-full ${className}`}>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};