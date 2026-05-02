/**
 * @file PollingLocator.tsx
 * @description Component for finding a user's polling location using Google Maps API.
 */

"use client";

import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import { pollingSearchSchema } from "@/lib/validations";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.5rem",
};

const defaultCenter = {
  lat: 38.9072, // Washington DC
  lng: -77.0369,
};

/**
 * PollingLocator Component
 * 
 * Renders a search form and a Google Map to display the user's polling location.
 * Utilizes `isomorphic-dompurify` for input sanitization and `zod` for validation.
 * 
 * @returns {JSX.Element} The rendered Polling Locator component.
 */
export function PollingLocator() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pollingLocation, setPollingLocation] = useState<{lat: number, lng: number} | null>(null);

  /**
   * Handles the search form submission.
   * Sanitizes the input, validates against the Zod schema, and mocks the API call with try-catch.
   * 
   * @param {React.FormEvent} e - The form submission event.
   * @throws Will log an error to console if the mock API call fails.
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Sanitize input to prevent XSS
    const cleanAddress = DOMPurify.sanitize(address);
    
    // Validate using Zod schema
    const validation = pollingSearchSchema.safeParse({ address: cleanAddress });
    if (!validation.success) {
      setErrorMsg(validation.error.errors[0].message);
      return;
    }

    try {
      // Mocking finding a location based on address
      // In reality, this would hit the Google Civic Information API
      setPollingLocation({
        lat: 38.9072 + (Math.random() * 0.05 - 0.025),
        lng: -77.0369 + (Math.random() * 0.05 - 0.025),
      });
    } catch (error) {
      console.error("Error fetching polling location:", error);
      setErrorMsg("Failed to load polling location. Please try again.");
    }
  };

  return (
    <Card className="w-full overflow-hidden shadow-lg border-primary/20">
      <CardHeader className="bg-gradient-to-r from-card to-primary/5">
        <CardTitle className="text-2xl flex items-center gap-2">
          <MapPin className="text-primary" /> Find Polling Place
        </CardTitle>
        <CardDescription>
          Enter your registered voting address to find your polling location and hours.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSearch} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input 
              placeholder="e.g., 1600 Pennsylvania Avenue NW, Washington, DC" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <Search className="w-4 h-4 mr-2" /> Search
            </Button>
          </div>
          {errorMsg && <span className="text-sm text-destructive">{errorMsg}</span>}
        </form>

        <div className="relative border rounded-lg overflow-hidden bg-muted">
          {loadError ? (
            <div className="h-[400px] flex items-center justify-center text-destructive">
              Error loading maps
            </div>
          ) : !isLoaded ? (
            <div className="h-[400px] flex items-center justify-center">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={pollingLocation || defaultCenter}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                styles: [
                  {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                  }
                ]
              }}
            >
              {pollingLocation && <Marker position={pollingLocation} animation={google.maps.Animation.DROP} />}
            </GoogleMap>
          )}

          {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10">
              <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold">Map Requires API Key</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables to view the interactive map.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
