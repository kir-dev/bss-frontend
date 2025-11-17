import BssLogo from "@/components/icons/bss-logo";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// Mock events data
const events = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: "Simonyi szülinapi buli",
  thumbnail: "/video-thumbnail.jpg",
  date: "2022",
}));

export default function EventsPage() {
  return (
    <div className=" min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {events.map((event) => (
            <Card
              key={event.id}
              className="group cursor-pointer hover:shadow-lg py-0 transition-shadow"
            >
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <img
                    src={event.thumbnail || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-foreground group-hover:text-bss transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {event.date}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
