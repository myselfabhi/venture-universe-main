"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { Rocket, Share2, ChevronDown, ChevronUp, Calendar } from "lucide-react";

export const Timeline = ({ data, expandedMilestone, onExpand }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height - 90);
    }
  }, [ref, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Handle share functionality
  const handleShare = async (milestone, e) => {
    e.stopPropagation();
    const shareData = {
      title: `${milestone.title} - ${milestone.job}`,
      text: milestone.contents.join(" "),
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        alert('Milestone details copied to clipboard!');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <div ref={ref} className="relative pt-10 pb-20">
        {data.map((item, index) => {
          const isExpanded = expandedMilestone === index;

          return (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              isExpanded={isExpanded}
              onExpand={() => onExpand(isExpanded ? null : index)}
              onShare={(e) => handleShare(item, e)}
            />
          );
        })}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-6 left-6 top-0 overflow-hidden w-[3px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-royal via-lavender to-royal from-[0%] via-[50%] to-[100%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ item, index, isExpanded, onExpand, onShare }) => {

  return (
    <motion.div
      className="flex justify-start pt-10 md:pt-12 md:gap-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Date & Title Section - Left Side (Desktop) */}
      <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
        {/* Timeline Dot */}
        <div className="absolute flex items-center justify-center w-12 h-12 rounded-full -left-[18px] bg-gradient-to-br from-royal to-lavender border-4 border-primary shadow-lg shadow-lavender/30">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        
        {/* Date & Title - Desktop */}
        <div className="flex-col hidden gap-2 md:flex md:pl-24">
          <motion.div
            className="flex items-center gap-2 text-2xl font-bold text-lavender"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <Calendar className="w-5 h-5" />
            <span>{item.date}</span>
          </motion.div>
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-white leading-tight"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {item.title}
          </motion.h3>
          <motion.p
            className="text-xl text-lavender font-medium"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            {item.job}
          </motion.p>
        </div>
      </div>

      {/* Content Card - Right Side */}
      <div className="relative w-full pl-20 pr-4 md:pl-4">
        <motion.div
          className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-storm to-indigo border border-white/10 hover:border-lavender/50 transition-all duration-300 hover:shadow-xl hover:shadow-lavender/10 cursor-pointer"
          onClick={onExpand}
          whileHover={{ scale: 1.02 }}
        >
          {/* Date & Title - Mobile */}
          <div className="block md:hidden p-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-lg font-bold text-lavender mb-2">
              <Calendar className="w-4 h-4" />
              <span>{item.date}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-lg text-lavender font-medium">{item.job}</p>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Action Buttons */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onExpand}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-lavender hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Read Full Story
                  </>
                )}
              </button>
              <button
                onClick={onShare}
                className="p-2 text-lavender hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                aria-label="Share milestone"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-3">
              {item.contents.map((content, contentIndex) => (
                <motion.p
                  key={contentIndex}
                  className="text-base text-neutral-300 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + contentIndex * 0.1 + 0.5 }}
                >
                  {content}
                </motion.p>
              ))}
            </div>

            {/* Expanded Content (if needed for additional details) */}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <p className="text-sm text-neutral-400 italic">
                  This milestone represents a significant achievement in ISRO's journey towards space exploration excellence.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
