"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useMemo, useState } from "react";
import { env } from "@/env";

const MEMBERS_QUERY = `
  query NonArchivedMembers($limit: Int = 25) {
    members(orderBy: [NAME_ASC], first: $limit) {
      nodes {
        id
        name
        nickname
        role
        status
        archived
        createdAt
        
      }
    }
  }
`;

type Member = {
  id: string;
  name: string;
  nickname?: string | null;
  role?: string | null;
  status?: MemberStatus | null;
  archived: boolean;
  createdAt?: string | null;
  // pfp?: string | null;
};

enum MemberStatus {
  ALUMNI = "ALUMNI",
  ACTIVE_ALUMNI = "ACTIVE_ALUMNI",
  MEMBER = "MEMBER",
  MEMBER_CANDIDATE = "MEMBER_CANDIDATE",
  MEMBER_CANDIDATE_CANDIDATE = "MEMBER_CANDIDATE_CANDIDATE",
}

function memberStatusToString(status: MemberStatus | null | undefined) {
  switch (status) {
    case MemberStatus.ALUMNI:
      return "Öregtag";
    case MemberStatus.ACTIVE_ALUMNI:
      return "Aktív öregtag";
    case MemberStatus.MEMBER:
      return "Stúdiós";
    case MemberStatus.MEMBER_CANDIDATE:
      return "Stúdiósjelölt";
    case MemberStatus.MEMBER_CANDIDATE_CANDIDATE:
      return "Stúdiósjelölt-jelölt";
    default:
      return "Ismeretlen státusz";
  }
}

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message?: string }[];
};

async function fetchMembers(limit: number): Promise<Member[]> {
  const response = await fetch(env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: MEMBERS_QUERY,
      variables: { limit },
    }),
  });

  if (!response.ok) {
    throw new Error(`Nem sikerült betölteni a tagokat (${response.status})`);
  }

  const json: GraphQLResponse<{ members: { nodes: Member[] } }> =
    await response.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message || "Ismeretlen GraphQL hiba");
  }

  return json.data?.members?.nodes ?? [];
}

export default function MembersPage() {
  const router = useRouter();
  const [limit, setLimit] = useState(25);

  const {
    data: members = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<Member[], Error>({
    queryKey: ["members", limit],
    queryFn: () => fetchMembers(limit),
    staleTime: 1000 * 30,
    retry: 1,
  });

  const groupedMembers = useMemo(() => {
    if (!members.length) return [] as [string, Member[]][];
    console.log(members);
    const groups = members.reduce<Record<string, Member[]>>((acc, member) => {
      const rawRole = memberStatusToString(member.status)?.trim();
      const key = (
        rawRole && rawRole.length > 0 ? rawRole : "Egyéb"
      ).toUpperCase();
      if (!acc[key]) acc[key] = [];
      acc[key].push(member);
      return acc;
    }, {});
    console.log(groups);

    const preferredOrder = [
      "STÚDIÓS",
      "STÚDIÓSJELÖLT",
      "AKTÍV ÖREGTAG",
      "ÖREGTAG",
    ];

    const orderedArray: [string, Member[]][] = [];

    preferredOrder.forEach((category) => {
      if (groups[category]) {
        orderedArray.push([category, groups[category]]);
        delete groups[category];
      }
    });

    const remaining = Object.entries(groups).sort((a, b) =>
      a[0].localeCompare(b[0], "hu")
    );

    orderedArray.push(...remaining);
    console.log(orderedArray);
    return orderedArray;
  }, [members]);

  const limitLabel = isFetching && !isLoading ? "Frissítés..." : "Tagok száma";

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
        {isLoading && (
          <p className="text-center text-bss">Tagok betöltése...</p>
        )}
        {isError && (
          <div className="text-center text-red-600">
            <p>Hiba történt a tagok betöltése során:</p>
            <p>{error?.message}</p>
            <button
              onClick={() => refetch()}
              className="mt-4 px-4 py-2 bg-bss text-white rounded hover:bg-bss-dark"
            >
              Újrapróbálkozás
            </button>
          </div>
        )}

        {/* Categories */}
        {groupedMembers &&
          groupedMembers.map(([category, members]) => (
            <div key={category} className="mb-12">
              <h2 className="text-xl font-bold text-bss text-center mb-6">
                {category}
              </h2>

              <div className="flex flex-wrap justify-center gap-4">
                {members.map((member) => (
                  <Card
                    key={member.id}
                    onClick={() => router.push(`/profile/${member.id}`)}
                    className="group cursor-pointer hover:shadow-lg transition-shadow py-0 w-36 sm:w-40 md:w-44 max-w-60"
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-square">
                        <img
                          src={"/default-profile-picture.png"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2 text-center">
                        <h3 className="font-medium text-xs text-foreground group-hover:text-bss transition-colors">
                          {member.name}
                        </h3>
                        {member.role && (
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {member.role}
                          </p>
                        )}
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
