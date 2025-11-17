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
  const hasExplicitHeightClass =
    typeof className === "string" &&
    /(?:^|[\s:])(max-|min-)?h-(?:\[.*?\]|[a-z0-9./-]+)/i.test(className);

  return (
    <Link href={`/video/${id}`} className="block h-full">
      <Card
        className={cn(
          "group cursor-pointer rounded-none p-0! transition-shadow hover:shadow-lg",
          className
        )}
      >
        <CardContent className="h-full p-0">
          <div className="flex h-full flex-col">
            <div
              className={cn(
                "relative w-full overflow-hidden bg-muted",
                hasExplicitHeightClass ? "flex-1 min-h-0" : "aspect-video"
              )}
            >
              <img
                src={thumbnailUrl || "/placeholder.svg"}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                <PlayFilled className="h-8 w-8 text-white" />
              </div>
              <div
                className={cn(
                  "absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white",
                  !duration && "hidden"
                )}
              >
                {duration}
              </div>
            </div>
            <div className="flex items-center gap-1 p-3 text-sm font-medium text-foreground/90">
              <PlayFilled className="h-4 w-4 text-bss" />
              <p className="truncate">{title}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
