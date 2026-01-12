"use client";

import { twMerge } from "tailwind-merge";
import Marquee from "../components/Marquee";
import { spaceArticles } from "../constants";

const firstRow = spaceArticles.slice(0, spaceArticles.length / 2);
const secondRow = spaceArticles.slice(spaceArticles.length / 2);

const SpaceArticleCard = ({ img, author, title, excerpt, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline"
      id="article"
    >
      <figure
        className={twMerge(
          "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-50/[.1] bg-gradient-to-r bg-indigo to-storm hover:bg-royal hover-animation"
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <img
            className="rounded-full bg-white/10"
            width="32"
            height="32"
            alt={author}
            src={img}
          />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium text-white">
              {author}
            </figcaption>
          </div>
        </div>
        <blockquote className="mt-2 text-sm font-semibold text-white">
          {title}
        </blockquote>
        <p className="mt-1 text-sm text-white/60">{excerpt}</p>
      </figure>
    </a>
  );
};

export default function FamousArticlesSection() {
  return (
    <section className="c-space section-spacing">
      <h2 className="text-heading">Famous Articles from Great Space People</h2>
      <div className="relative flex flex-col items-center justify-center w-full mt-12 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((article, index) => (
            <SpaceArticleCard key={index} {...article} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((article, index) => (
            <SpaceArticleCard key={index} {...article} />
          ))}
        </Marquee>
        <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none bg-gradient-to-r from-primary" />
        <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none bg-gradient-to-l from-primary" />
      </div>
    </section>
  );
}
