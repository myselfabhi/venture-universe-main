import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { ApodData } from "../lib/api";

export default function SpaceNews({ newsItems }: { newsItems: ApodData[] }) {
  return (
    <section className="bg-vu-space text-vu-cyan py-8">
      <h2 className="text-2xl font-bold mb-6 text-vu-purple text-center">Space News</h2>
      <div className="max-w-5xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {newsItems.map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-2">
                  <Card className="bg-vu-space/40 border-vu-blue/10 shadow-md hover:shadow-md transition-shadow duration-300 h-[400px]">
                    <CardContent className="p-4 flex flex-col justify-between h-full">
                      <CardTitle className="text-lg md:text-xl text-white mb-2">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-vu-cyan mb-4">
                        {item.explanation.slice(0, 150) + "..."}
                      </CardDescription>
                      {item.url && (
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-40 object-cover rounded-md"
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}