"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VideoCard } from "@/components/video-card";
import PlayFilled from "@/components/icons/play-filled";
import Link from "next/link";

// Mock video data
const generateMockVideos = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `video-${i + 1}`,
    title: "Video name 2022",
    thumbnailUrl: "/video-thumbnail.jpg",
    duration: "3:10",
    date: "2022",
    category: i % 3 === 0 ? "events" : i % 3 === 1 ? "tutorials" : "news",
  }));
};

const featuredVideo = {
  id: "featured-1",
  title: "Szolnoki palacsinta fesztivál",
  thumbnailUrl: "/video-thumbnail.jpg",
  duration: "3:10",
  description: "Legfrissebb videónk a szolnoki palacsinta fesztiválról",
};

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 25;

  const allVideos = generateMockVideos(100);

  // Filter videos based on search query
  const filteredVideos = allVideos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort videos
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.id.localeCompare(a.id);
      case "oldest":
        return a.id.localeCompare(b.id);
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Paginate videos
  const totalPages = Math.ceil(sortedVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const paginatedVideos = sortedVideos.slice(
    startIndex,
    startIndex + videosPerPage
  );

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Placeholder text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder="Rendezés kiválasztása" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Legújabb</SelectItem>
              <SelectItem value="oldest">Legrégebbi</SelectItem>
              <SelectItem value="title">Cím szerint</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Featured Video Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link href={`/video/${featuredVideo.id}`}>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-black">
                    <img
                      src={featuredVideo.thumbnailUrl || "/placeholder.svg"}
                      alt={featuredVideo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Button size="lg" className="rounded-full w-16 h-16">
                        <PlayFilled className="w-6 h-6 ml-1" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold">
                        {featuredVideo.title}
                      </h2>
                      <Button
                        variant="outline"
                        className="rounded-full"
                        size="sm"
                      >
                        Legfrissebb!
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Sidebar with recent videos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allVideos.slice(0, 6).map((video) => (
              <VideoCard
                key={video.id}
                id={video.id}
                title={video.title}
                thumbnailUrl={video.thumbnailUrl}
                duration={video.duration}
              />
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {paginatedVideos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              thumbnailUrl={video.thumbnailUrl}
              duration={video.duration}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              {"‹"}
            </Button>

            {generatePageNumbers().map((page, index) => (
              <div key={index}>
                {page === "..." ? (
                  <span className="px-3 py-2 text-muted-foreground">...</span>
                ) : (
                  <Button
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page as number)}
                    className="min-w-10"
                  >
                    {page}
                  </Button>
                )}
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              {"›"}
            </Button>
          </div>
        )}

        {/* Results Info */}
        <div className="text-center mt-4 text-sm text-muted-foreground">
          {startIndex + 1}-
          {Math.min(startIndex + videosPerPage, sortedVideos.length)} /{" "}
          {sortedVideos.length} videó
        </div>
      </div>
    </div>
  );
}
