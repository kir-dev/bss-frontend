"use client";

import { use, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

// Mock user data
const getUserData = (id: string) => {
  return {
    id,
    fullName: "Salamon Dóra",
    nickname: "Dotty",
    status: "Stúdiós",
    joinedSemester: "2019 tavasz",
    profileImage: "/profile-photo.jpg",
    bio: "Sziasztok! Dotty vagyok, sokadéves, de lelkes stúdiós örökifjúnc, hobby BSS vendég és a Budavári Schönherz Stúdió vezetője.",
    activities: {
      2022: [
        {
          date: "BSTV adás 2022. május 20.",
          roles: ["műsorvezető", "műsorvezető", "műsorvezető", "rendező"],
        },
        {
          date: "BSTV adás 2022. május 5.",
          roles: ["műsorvezető", "műsorvezető", "műsorvezető", "rendező"],
        },
        {
          date: "BSTV adás 2022. április 21.",
          roles: ["műsorvezető", "műsorvezető", "műsorvezető", "rendező"],
        },
        {
          date: "BSTV adás 2022. február 24.",
          roles: ["műsorvezető", "műsorvezető", "műsorvezető", "rendező"],
        },
      ],
      2021: [
        {
          date: "BSTV adás 2021. december 15.",
          roles: ["műsorvezető", "rendező"],
        },
        {
          date: "BSTV adás 2021. november 28.",
          roles: ["műsorvezető", "rendező"],
        },
      ],
      2020: [
        {
          date: "BSTV adás 2020. március 12.",
          roles: ["műsorvezető"],
        },
      ],
      2019: [
        {
          date: "BSTV adás 2019. szeptember 5.",
          roles: ["műsorvezető"],
        },
      ],
    },
  };
};

export default function ProfilePage({ params }: ProfilePageProps) {
  const { id } = use(params);
  const user = getUserData(id);
  const [openYears, setOpenYears] = useState<{ [key: number]: boolean }>({
    2022: true,
    2021: false,
    2020: false,
    2019: false,
  });

  const toggleYear = (year: number) => {
    setOpenYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  const years = Object.keys(user.activities)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                {/* Profile Image */}
                <div className="mb-6">
                  <img
                    src={user.profileImage || "/placeholder.svg"}
                    alt={user.fullName}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                </div>

                {/* User Details */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Teljes név:
                    </p>
                    <p className="font-semibold text-bss">{user.fullName}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Becenév:
                    </p>
                    <p className="font-semibold text-bss">{user.nickname}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Status:
                    </p>
                    <p className="font-semibold text-orange-500">
                      {user.status}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Csatlakozás féléve:
                    </p>
                    <p className="font-semibold text-orange-500">
                      {user.joinedSemester}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Bemutatkozás
                    </p>
                    <p className="text-sm text-orange-500">{user.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-orange-500">
                Tevékenység
              </h2>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-muted-foreground">Év szerint szűrés</span>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">Összes mutatása</span>
                  <span className="text-muted-foreground">
                    Összes elrejtése
                  </span>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-muted rounded"></div>
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {years.map((year) => (
                <Card key={year}>
                  <Collapsible
                    open={openYears[year]}
                    onOpenChange={() => toggleYear(year)}
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <h3 className="text-lg font-semibold text-orange-500">
                          {year}
                        </h3>
                        {openYears[year] ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-4 pb-4 space-y-3">
                        {user.activities[
                          year as keyof typeof user.activities
                        ]?.map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
                          >
                            <span className="text-sm font-medium">
                              {activity.date}
                            </span>
                            <div className="flex items-center space-x-2">
                              {activity.roles.map((role, roleIndex) => (
                                <Badge
                                  key={roleIndex}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {role}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
