"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

// Mock tags data organized by categories
const tagsData = {
  VEZETŐSÉG: Array.from({ length: 3 }, (_, i) => ({
    id: `lead-${i + 1}`,
    title: "Cute Seal",
    subtitle: "post",
    thumbnail: "/video-thumbnail.jpg",
  })),
  STÚDIÓSOK: Array.from({ length: 14 }, (_, i) => ({
    id: `studio-${i + 1}`,
    title: "Cute Seal",
    subtitle: "post",
    thumbnail: "/video-thumbnail.jpg",
  })),
  ÚJONCOK: Array.from({ length: 14 }, (_, i) => ({
    id: `newbie-${i + 1}`,
    title: "Cute Seal",
    subtitle: "post",
    thumbnail: "/video-thumbnail.jpg",
  })),
};

export default function TagsPage() {
  const router = useRouter();

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-bss mb-2">TAGOK</h1>
          <p className="text-bss font-medium">
            {
              "Kik dolgoznak nap mint nap azért, hogy a BSS működjön? Ki fogadott golyóbisont? Hol találod meg a stúdióvezető e-mail címét?"
            }
          </p>
          <p className="text-bss text-sm font-light mt-2">
            {
              "Ez az oldal Neked készült, ha kíváncsi vagy a BSS tagjaira, részletesebb adataikra"
            }
          </p>
        </div>

        {/* Categories */}
        {Object.entries(tagsData).map(([category, members]) => (
          <div key={category} className="mb-12">
            <h2 className="text-xl font-bold text-bss text-center mb-6">
              {category}
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              {members.map((member) => (
                <Card
                  key={member.id}
                  onClick={() => router.push(`/profile/${member.id}`)}
                  className="group cursor-pointer hover:shadow-lg transition-shadow py-0 w-36 sm:w-40 md:w-44 max-w-[240px]"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <img
                        src={member.thumbnail || "/placeholder.svg"}
                        alt={member.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <h3 className="font-medium text-xs text-foreground group-hover:text-bss transition-colors">
                        {member.title}
                      </h3>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {member.subtitle}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
