"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Rocket, Calendar, ExternalLink, Clock } from "lucide-react";

const UpcomingLaunches = () => {
  const [launches, setLaunches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [failedImages, setFailedImages] = useState(new Set());

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        // LaunchLibrary 2 API - free, no API key required
        // Fetches next 5 upcoming launches
        const response = await fetch(
          `https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=5&ordering=net`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch launches: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.results && Array.isArray(data.results)) {
          const mappedLaunches = data.results
            .filter(launch => launch.net) // Only show launches with confirmed dates
            .filter(launch => {
              // Filter out launches with "Unknown Payload" or "TBD" in mission
              const missionName = launch.mission?.name || '';
              const launchName = launch.name || '';
              return !missionName.toLowerCase().includes('unknown payload') &&
                     !missionName.toLowerCase().includes('tbd') &&
                     !launchName.toLowerCase().includes('unknown payload');
            })
            .slice(0, 5)
            .map((launch) => {
              // Clean mission name - remove "Unknown Payload" references
              let missionName = launch.mission?.name || '';
              if (missionName.toLowerCase().includes('unknown payload') || 
                  missionName.toLowerCase().includes('tbd')) {
                missionName = ''; // Don't show mission if it's unknown
              }
              
              // Get description or generate meaningful one
              let description = launch.mission?.description || '';
              if (!description || 
                  description.toLowerCase().includes('details tbd') ||
                  description.toLowerCase().includes('tbd') ||
                  description.toLowerCase().includes('unknown')) {
                // Generate description from launch name
                const launchType = launch.name.split('|')[0]?.trim() || 'Space mission';
                description = `${launchType} - Upcoming space launch`;
              }
              
              return {
                id: launch.id,
                name: launch.name,
                mission: missionName || null, // Only show if we have a real mission name
                description: description,
                net: launch.net,
                location: launch.pad?.location?.name || 'Launch Site',
                agency: launch.launch_service_provider?.name || null,
                image: launch.image || launch.rocket?.configuration?.image_url || launch.launch_service_provider?.logo_url || null,
                webcastLive: launch.webcast_live || false,
                status: launch.status?.name || 'Scheduled',
              };
            });
          
          setLaunches(mappedLaunches);
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (err) {
        console.error("Error fetching launches:", err);
        setError("Unable to load upcoming launches. Check back later!");
        
        // Fallback to example data
        setLaunches([
          {
            id: 1,
            name: "Upcoming Launch",
            mission: "Space Exploration Mission",
            description: "An exciting space mission to explore the cosmos",
            net: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            location: "Kennedy Space Center",
            agency: "Space Agency",
            image: null,
            webcastLive: false,
            status: "Scheduled",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLaunches();
  }, []);

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
      <section className="c-space py-12 md:py-16">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Rocket className="w-6 h-6 text-royal" />
            <h2 className="text-heading">Upcoming Launches</h2>
          </div>
          <p className="text-neutral-400">Loading upcoming missions...</p>
        </div>
      </section>
    );
  }

  if (error && launches.length === 0) {
    return null; // Don't show section if error and no fallback data
  }

  return (
    <section className="c-space py-12 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Rocket className="w-6 h-6 text-royal" />
            <h2 className="text-heading">Upcoming Launches</h2>
          </div>
          <p className="text-neutral-400">Next missions to watch</p>
        </div>
      </div>

      {error && (
        <div className="p-4 mb-6 text-sm text-yellow-400 rounded-lg bg-yellow-900/20 border border-yellow-800/50">
          {error}
        </div>
      )}

      <div className="relative">
        {/* Scrollable Container */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth -mx-5 px-5 md:-mx-10 md:px-10">
          {launches.map((launch, index) => {
            const daysUntil = getDaysUntil(launch.net);
            const isSoon = daysUntil <= 7;
            
            return (
              <motion.div
                key={launch.id}
                className="relative flex-shrink-0 w-[320px] md:w-[380px] overflow-hidden rounded-xl bg-gradient-to-br from-storm to-indigo hover-animation group snap-start"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
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
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(launch.net)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Rocket className="w-4 h-4" />
                    <span>{launch.location}</span>
                  </div>
                  {launch.agency && launch.agency !== 'Unknown Agency' && (
                    <div className="text-xs text-neutral-500 line-clamp-1">
                      {launch.agency}
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
                  <p className="text-sm text-neutral-300 line-clamp-2 mb-4">
                    {launch.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
        </div>
      </div>

      {/* View All Link */}
      <div className="mt-8 text-center">
        <Link
          href="/launches"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-colors rounded-lg bg-white/10 hover:bg-white/20 hover-animation"
        >
          View Full Launch Schedule
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default UpcomingLaunches;
