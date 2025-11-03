import Link from "next/link";
import Image from "next/image";

const socialLinks = [
  {
    href: "#",
    src: "/logos/iconmonstr-instagram-15.svg",
    alt: "Instagram",
  },
  {
    href: "#",
    src: "/logos/iconmonstr-youtube-10 1.svg",
    alt: "YouTube",
  },
  {
    href: "#",
    src: "/logos/iconmonstr-facebook-5.svg",
    alt: "Facebook",
  },
];

const sponsorLogos = [
  {
    src: "/logos/AC.svg",
    alt: "AC",
    width: 100,
    height: 32,
  },
  {
    src: "/logos/Schönherz.svg",
    alt: "Schönherz",
    width: 100,
    height: 32,
  },
  {
    src: "/logos/Simonyi.svg",
    alt: "Simonyi Károly Szakkollégium",
    width: 142,
    height: 30,
  },
  {
    src: "/logos/schdesign-szürke-rózsaszín.svg",
    alt: "schdesign",
    width: 112,
    height: 30,
  },
  {
    src: "/logos/VIK.svg",
    alt: "VIK",
    width: 42,
    height: 42,
  },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Kapcsolat</h3>
          <div className="mb-6">
            <a className="text-orange-400" href="mailto:bss@sch.bme.hu">
              bss@sch.bme.hu
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center items-center gap-4 mb-8">
            {socialLinks.map((social) => (
              <Link
                key={social.alt}
                href={social.href}
                className="transition-transform hover:scale-110"
                aria-label={social.alt}
              >
                <Image
                  src={social.src}
                  alt={social.alt}
                  width={48}
                  height={48}
                  className="h-6 w-6 object-contain"
                  loading="lazy"
                />
              </Link>
            ))}
          </div>

          {/* Partner Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {sponsorLogos.map((logo) => (
              <Image
                key={logo.alt}
                {...logo}
                className="h-10 w-auto mx-4 object-contain"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
