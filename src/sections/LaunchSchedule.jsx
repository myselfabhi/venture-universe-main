"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Rocket, Calendar, Clock, MapPin, Building2, Search } from "lucide-react";

const LaunchSchedule = () => {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [failedImages, setFailedImages] = useState(new Set());

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        // Use internal API route with 60-minute caching
        const response = await fetch('/api/launches?limit=50&ordering=net');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch launches: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.results && Array.isArray(data.results)) {
          const mappedLaunches = data.results
            .filter(launch => launch.net) // Only show launches with confirmed dates
            .filter(launch => {
              // Filter out "Unknown Payload" launches
              const missionName = launch.mission?.name || '';
              const launchName = launch.name || '';
              return !missionName.toLowerCase().includes('unknown payload') &&
                     !missionName.toLowerCase().includes('tbd') &&
                     !launchName.toLowerCase().includes('unknown payload');
            })
            .map((launch) => {
              // Clean mission data
              let missionName = launch.mission?.name || '';
              if (missionName.toLowerCase().includes('unknown payload') || 
                  missionName.toLowerCase().includes('tbd')) {
                missionName = '';
              }
              
              let description = launch.mission?.description || '';
              if (!description || 
                  description.toLowerCase().includes('details tbd') ||
                  description.toLowerCase().includes('tbd') ||
                  description.toLowerCase().includes('unknown')) {
                const launchType = launch.name.split('|')[0]?.trim() || 'Space mission';
                description = `${launchType} - Upcoming space launch`;
              }
              
              return {
                id: launch.id,
                name: launch.name,
                mission: missionName || null,
                description: description,
                net: launch.net,
                location: launch.pad?.location?.name || 'Launch Site',
                pad: launch.pad?.name || null,
                agency: launch.launch_service_provider?.name || null,
                image: launch.image || launch.rocket?.configuration?.image_url || launch.launch_service_provider?.logo_url || null,
                webcastLive: launch.webcast_live || false,
                status: launch.status?.name || 'Scheduled',
              };
            });
          
          setLaunches(mappedLaunches);
          setFilteredLaunches(mappedLaunches);
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (err) {
        console.error("Error fetching launches:", err);
        setError("Unable to load launch schedule. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLaunches();
  }, []);

  // Filter launches based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLaunches(launches);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = launches.filter(launch => {
      return (
        launch.name.toLowerCase().includes(query) ||
        launch.mission?.toLowerCase().includes(query) ||
        launch.location.toLowerCase().includes(query) ||
        launch.agency?.toLowerCase().includes(query)
      );
    });
    setFilteredLaunches(filtered);
  }, [searchQuery, launches]);

  // Calculate days until launch
  const getDaysUntil = (netDate) => {
    const now = new Date();
    const launch = new Date(netDate);
    const diffTime = launch - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <section className="c-space section-spacing pb-16 md:pb-24">
        <div className="mb-8">
          <h2 className="text-heading">Launch Schedule</h2>
          <p className="mt-2 text-neutral-400">Loading upcoming missions...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="c-space section-spacing pb-16 md:pb-24">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Rocket className="w-6 h-6 text-royal" />
          <h2 className="text-heading">Launch Schedule</h2>
        </div>
        <p className="text-neutral-400">Complete schedule of upcoming rocket launches and space missions</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          placeholder="Search by mission name, location, or agency..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent"
        />
      </div>

      {error && (
        <div className="p-4 mb-6 text-sm text-yellow-400 rounded-lg bg-yellow-900/20 border border-yellow-800/50">
          {error}
        </div>
      )}

      {filteredLaunches.length === 0 ? (
        <div className="text-center py-12">
          <Rocket className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
          <p className="text-neutral-400 text-lg">
            {searchQuery ? 'No launches found matching your search.' : 'No upcoming launches available.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLaunches.map((launch, index) => {
            const daysUntil = getDaysUntil(launch.net);
            const isSoon = daysUntil <= 7;
            
            return (
              <motion.div
                key={launch.id}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-storm to-indigo hover-animation group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.05, 1) }}
              >
                {/* Status Badge */}
                {isSoon && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-coral to-fuchsia">
                    <Clock className="inline w-3 h-3 mr-1" />
                    Soon
                  </div>
                )}

                {/* Image or Rocket Icon */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-royal to-lavender">
                  {launch.image && !failedImages.has(launch.id) ? (
                    <img
                      src={launch.image}
                      alt={launch.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={() => {
                        setFailedImages(prev => new Set(prev).add(launch.id));
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <div className="text-center">
                        <Rocket className="w-16 h-16 text-white/40 mx-auto mb-2" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1">
                      {launch.name.split('|')[0].trim()}
                    </h3>
                  </div>

                  {launch.mission && launch.mission !== launch.name && (
                    <p className="mb-3 text-sm text-lavender line-clamp-1">
                      {launch.mission}
                    </p>
                  )}

                  <div className="space-y-2 mb-4 text-sm text-neutral-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>{formatDate(launch.net)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{launch.location}</span>
                    </div>
                    {launch.pad && (
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <Rocket className="w-3 h-3 flex-shrink-0" />
                        <span className="line-clamp-1">{launch.pad}</span>
                      </div>
                    )}
                    {launch.agency && launch.agency !== 'Unknown Agency' && (
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <Building2 className="w-3 h-3 flex-shrink-0" />
                        <span className="line-clamp-1">{launch.agency}</span>
                      </div>
                    )}
                  </div>

                  {/* Countdown Badge */}
                  {daysUntil > 0 ? (
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-medium text-white rounded-full bg-white/10">
                      {daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days away`}
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-mint to-aqua">
                      Launching Today!
                    </div>
                  )}

                  {/* Description */}
                  {launch.description && (
                    <p className="text-sm text-neutral-300 line-clamp-2">
                      {launch.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default LaunchSchedule;
