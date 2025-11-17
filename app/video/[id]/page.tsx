import { VideoPlayer } from "@/components/video-player";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Download } from "lucide-react";
import Link from "next/link";
import { VideoCard } from "@/components/video-card";

interface VideoPageProps {
  params: {
    id: string;
  };
}

// Mock video data - in a real app this would come from a database
const getVideoData = (id: string) => {
  return {
    id,
    title: "Videó címe",
    description:
      "Idén tavasszal is megrendezésre került a Simonyi Félévnyitó és Felvételi Vacsora, ahol kiderültek az idei felvételi eredményei, és kihirdetésre kerültek a színes kollégiumi belépő kártyák. A ceremónia után finom vacsora és egy jó hangulatú buli várta a simonyisokat. ",
    contributors: [
      { role: "Riporter", name: "Gipsi Jakab", profileId: "gipsi-jakab" },
      { role: "Vágó", name: "Polgár Béla", profileId: "polgar-bela" },
    ],
    date: "2022. november 03.",
    duration: "3:10",
    videoUrl:
      "https://v.bsstudio.hu/bss_vagott_web_16a9_HD/high_quality/20250605_vik75_hq_HD.mp4",
    thumbnailUrl: "/video-thumbnail.jpg",
    songs: [
      { title: "Valami dal", creator: "Alma együttes" },
      { title: "Csillagfény", creator: "Béla Band" },
      { title: "Éjszakai séta", creator: "Jakab Jazz" },
    ],
  };
};

// Mock related videos
const getRelatedVideos = () => {
  return Array.from({ length: 9 }, (_, i) => ({
    id: `video-${i + 1}`,
    title: "Video name 2022",
    thumbnailUrl: "/video-thumbnail.jpg",
    duration: "3:10",
  }));
};

export default async function VideoPage({ params }: VideoPageProps) {
  let { id } = await params;
  const video = getVideoData(id);
  const relatedVideos = getRelatedVideos();

  return (
    <div className="min-h-screen container">
      <div className="relative w-screen bg-black">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-6 ">
          <div className="relative aspect-video overflow-hidden shadow-2xl ring-1 ring-black/40">
            <VideoPlayer
              src={video.videoUrl}
              poster={video.thumbnailUrl}
              title={video.title}
            />
          </div>
        </div>
      </div>

      <div
        className="w-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.08) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 lg:px-6 lg:pt-14">
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            {/* Main Video Information */}
            <div className="space-y-6 rounded-xl bg-transparent p-6">
              <h1 className="text-3xl font-semibold text-bss lg:text-4xl">
                {video.title}
              </h1>

              <p className="text-base leading-relaxed ">{video.description}</p>

              <div className="space-y-2 text-sm text-foreground">
                <p className="font-semibold text-bss">Felhasznált zenék:</p>
                {video.songs.map((song) => (
                  <p key={`${song.creator}-${song.title}`}>
                    <span className="font-semibold text-muted-foreground">
                      {song.creator}
                    </span>{" "}
                    {song.title}
                  </p>
                ))}
              </div>

              <p className="text-sm font-semibold text-bss">
                Az esemény dátuma:{" "}
                <span className="font-normal ">{video.date}</span>
              </p>
            </div>

            {/* Secondary Information */}
            <aside className="space-y-4 rounded-xl bg-transparent p-6">
              <Button variant="brand" className="w-full uppercase" size="lg">
                <Share2 className="h-4 w-4" />
                Share
              </Button>

              <div className="space-y-2 text-sm ">
                {video.contributors.map((contributor) => (
                  <p key={contributor.profileId}>
                    <span className="font-semibold">{contributor.role}:</span>{" "}
                    <Link
                      href={`/profile/${contributor.profileId}`}
                      className="text-bss underline hover:font-medium"
                    >
                      {contributor.name}
                    </Link>
                  </p>
                ))}
                <p>
                  <span className="font-semibold">Hossz:</span> {video.duration}
                </p>
              </div>

              <Card className="border-none bg-transparent shadow-none">
                <CardContent className="space-y-3 p-0">
                  <Button className="w-full" variant="brand" size="lg">
                    <Download className="h-4 w-4" />
                    Letöltés HD minőségben
                  </Button>
                  <Button className="w-full" variant="brandOutline" size="lg">
                    <Download className="h-4 w-4" />
                    Letöltés normál minőségben
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>

          {/* Related Videos Section */}
          <div className="mt-16 rounded-xl bg-transparent p-6">
            <h2 className="mb-6 text-2xl font-semibold uppercase tracking-wide text-bss">
              További videók
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {relatedVideos.map((v) => (
                <VideoCard
                  key={v.id}
                  id={v.id}
                  title={v.title}
                  thumbnailUrl={v.thumbnailUrl}
                  duration={v.duration}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
