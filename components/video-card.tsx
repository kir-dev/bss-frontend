import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import PlayFilled from "./icons/play-filled";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration?: string;
  className?: string;
}

export function VideoCard({
  id,
  title,
  thumbnailUrl,
  duration,
  className,
}: VideoCardProps) {
  return (
    <Link href={`/video/${id}`}>
      <Card
        className={`hover:shadow-lg p-0 rounded-none transition-shadow cursor-pointer ${className}`}
      >
        <CardContent className="p-0">
          <div className="relative aspect-video bg-muted overflow-hidden">
            <img
              src={thumbnailUrl || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <PlayFilled className="w-8 h-8 text-white" />
            </div>
            <div
              className={cn(
                "absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded",
                !duration && "hidden"
              )}
            >
              {duration}
            </div>
            {/* BSS logos overlay */}
          </div>
          <div className="p-3 flex flex-row space-x-1 items-center">
            <PlayFilled className="w-4 h-4 text-bss" />

            <p className="font-medium text-sm truncate">{title}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
