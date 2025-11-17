import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VideoCard } from "@/components/video-card";
import { VideoPlayer } from "@/components/video-player";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  videoUrl: string;
};

type EventCard = {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
};

type InfoCard = {
  id: string;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
};

const featuredVideo: Video = {
  id: "featured",
  title: "Kiemelt videó / adás neve",
  thumbnail: "/video-thumbnail.jpg",
  duration: "03:10",
  category: "Élő közvetítés",
  videoUrl:
    "https://v.bsstudio.hu/bss_vagott_web_16a9_HD/high_quality/20250605_vik75_hq_HD.mp4",
};

const latestVideos: Video[] = Array.from({ length: 6 }, (_, index) => ({
  id: `latest-${index + 1}`,
  title: "Videó name 2022",
  thumbnail: "/video-thumbnail.jpg",
  duration: "02:45",
  category: "Friss videó",
  videoUrl:
    "https://v.bsstudio.hu/bss_vagott_web_16a9_HD/high_quality/20250605_vik75_hq_HD.mp4",
}));

const recentEvents: EventCard[] = Array.from({ length: 50 }, (_, index) => ({
  id: `event-${index + 1}`,
  title: "Videó name 2022",
  date: "2022. december",
  thumbnail: "/video-thumbnail.jpg",
}));

const infoSections: InfoCard[] = [
  {
    id: "courses",
    title: "Tanfolyamok",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    linkLabel: "Megnézem",
    href: "/courses",
  },
  {
    id: "about-1",
    title: "Lorem ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    linkLabel: "Link action",
    href: "/about",
  },
  {
    id: "about-2",
    title: "Lorem ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    linkLabel: "Link action",
    href: "/about",
  },
  {
    id: "about-3",
    title: "Lorem ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    linkLabel: "Link action",
    href: "/about",
  },
];

const partnerLogos = [
  { src: "/logos/iconmonstr-youtube-10%201.svg", alt: "YouTube" },
  { src: "/logos/iconmonstr-instagram-15.svg", alt: "Instagram" },
  { src: "/logos/iconmonstr-facebook-5.svg", alt: "Facebook" },
  { src: "/logos/Scho%CC%88nherz.svg", alt: "Schönherz" },
  { src: "/logos/Simonyi.svg", alt: "Simonyi" },
  { src: "/logos/VIK.svg", alt: "VIK" },
  {
    src: "/logos/schdesign-szu%CC%88rke-ro%CC%81zsaszi%CC%81n.svg",
    alt: "Schdesign",
  },
  { src: "/logos/AC.svg", alt: "AC" },
  { src: "/logos/BSS.svg", alt: "BSS" },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col container">
      <section className="bg-[url('/Pattern.svg')] bg-repeat py-12">
        <div className="mx-auto flex w-full flex-col gap-10 px-6 lg:px-40">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-bss">
              Budavári Schönherz Stúdió
            </p>
            <h1 className="text-3xl font-extrabold text-bss md:text-4xl">
              Kiemelt videó / adás neve
            </h1>
          </div>

          <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:items-stretch">
            <Card className="overflow-hidden border-none shadow-lg">
              <CardContent className="space-y-4 p-0">
                <div className="relative aspect-video w-full bg-black">
                  <VideoPlayer
                    src={featuredVideo.videoUrl}
                    poster={featuredVideo.thumbnail}
                    title={featuredVideo.title}
                  ></VideoPlayer>
                </div>
                <div className="space-y-2 px-6 pb-6">
                  <p className="text-sm uppercase tracking-wide text-bss">
                    {featuredVideo.category}
                  </p>
                  <h2 className="text-2xl font-semibold text-bss">
                    {featuredVideo.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Nézd meg legfrissebb kiemelt adásunkat, amelyben betekintést
                    adunk a stúdió kulisszái mögé.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex h-full flex-col gap-4 lg:min-h-0">
              <h3 className="text-xl font-semibold text-bss-inv">
                További friss videóink
              </h3>
              <div className="lg:flex-1 lg:min-h-0">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:h-full lg:min-h-0 lg:grid-cols-2 lg:overflow-y-auto lg:pr-1">
                  {latestVideos.map((video) => (
                    <VideoCard
                      key={video.id}
                      id={video.id}
                      title={video.title}
                      thumbnailUrl={video.thumbnail}
                      duration={video.duration}
                      className="h-32 lg:h-auto"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[url('/Pattern.svg')] bg-repeat py-12">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-20">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-bss-inv md:text-3xl">
              Legutóbbi események
            </h2>
            <div className="grid gap-6 overflow-x-auto sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:overflow-y-auto lg:space-x-6 lg:pb-4 lg:items-stretch">
              {recentEvents.map((event) => (
                <VideoCard
                  key={event.id}
                  id={event.id}
                  thumbnailUrl={event.thumbnail}
                  title={event.title}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[url('/Pattern.svg')] bg-repeat py-12">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-20">
          <div className="grid gap-6 md:grid-cols-2">
            {infoSections.map((info) => (
              <Card
                key={info.id}
                className="border-none  shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl font-semibold text-bss">
                    {info.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-foreground/80">
                    {info.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={info.href}
                    className="text-sm font-semibold text-bss-inv hover:text-orange-500"
                  >
                    {info.linkLabel}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
