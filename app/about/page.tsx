import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="">
      {/* Main Content Sections */}
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Mit csinál egy BSS-es? Section */}
        <section className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Mit csinál egy BSS-es?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Budavári Schönherz StúdióA Budavári Schönherz Stúdió, röviden
                BSS, 1962 óta diákok által üzemeltetett nonprofit, profi rádió-,
                hang- és videóstúdió. A legfontosabb célunk, hogy megtanítsuk
                Neked, amit a médiában meg lehet tanulni: a mikrofonozástól
                kezdve, a videóvágáson át, a komplett huszfős élő adás
                lebonyolításáig mindent.
              </p>
              <p>
                Nem véletlenül dolgoznak tapasztalt öregstúdiósaink a legnagyobb
                csatornáknál: a MTVA-nál, az RTL klubnál vagy a TV2-nél.
              </p>
              <p>
                Schönherz Zoltán KollégiumStúdiónk másik fontos célja, hogy
                tudósítson a Schönherz és a villanykar összes fontos
                eseményéről, megőrizze a jövőnek karunk közösségi életét. Online
                archívumunkban az elmúlt évek eseményeiről több száz videó
                nézhető meg. Szigorúan őrzött polcainkon 30 év videóanyaga és 50
                év hanganyaga között lehet kutatni.
              </p>
            </div>
          </div>
          <div className="lg:order-last">
            <img
              src="/students-working-with-video-equipment-in-studio.jpg"
              alt="BSS stúdió munka"
              className="w-full h-auto shadow-lg"
            />
          </div>
        </section>

        {/* Mérnök is kell, bölcsész is Section */}
        <section className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="lg:order-first">
            <img
              src="/professional-camera-operator-filming-in-studio-wit.jpg"
              alt="Kamerás munka"
              className="w-full h-auto shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Mérnök is kell, bölcsész is
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                A média világa komoly mérnöki ismereteket kíván. Egyszerre több
                száz nézőt kell kiszolgálni az élő tévéadáson, gondoskodni kell
                az automatizált videofeldolgozásról, vagy éppen összerakni egy
                négy kamerás videorendszert. Profi kameráink, eszközeink
                használata komoly szakértelmet kíván.
              </p>
              <p>
                A tartalom előállítás terén rengeteg kreativitásra és
                tartalomszerkesztési ismeretre van szükség. Nálunk
                megtanulhatod, hogyan lehet megszerkeszteni egy videóanyagot,
                egy élő magazinműsort, vagy kiélheted művészi vánadat az
                operatőrködés és videóvágás területén. Ha szeretsz beszélni,
                lehetsz televíziós műsorvezető, és megtanítjuk neked azt is,
                hogyan tudsz jó riportot, interjút készíteni.
              </p>
            </div>
          </div>
        </section>

        {/* Mivel foglalkozunk? Section */}
        <section className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Mivel foglalkozunk?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Heti egy alkalommal egy órás élő televíziós magazinműsorban
                mutatjuk be a VIK legfontosabb eseményeit. Négykamerás
                greenboxos stúdiónkban az adás alatt több mint 15 ember munkáját
                hangolja össze a rendező. Hetente 4-5 szerkesztett anyagot
                dolgoznak vágóink. Emellettüzemeltetjük, karbantartjuk a stúdió
                informatikai-, hang- és videorendszerét is.
              </p>
              <p>
                Félévente több gyakorlatorientált tanfolyamot tartunk (ezek egy
                része a meglévő tagjainknak szól) a hangtechnika, videotechnika,
                operatőrködés, világítás, videószerkesztés, műsorszerkesztés és
                műsorvezetés témakörökben.
              </p>
              <p>
                Öntevékeny kóri rendszerben oktatunk, azaz a bevezető
                tanfolyamok után az együttes munka alatt egymástól, és a több
                éve az iparban dolgozó, nagy tapasztalattal rendelkező
                stúdiósóktól tanulunk meg a legapróbb trükköket.
              </p>
            </div>
          </div>
          <div className="lg:order-last">
            <img
              src="/group-of-students-working-together-in-winter-outdo.jpg"
              alt="BSS csapat"
              className="w-full h-auto shadow-lg"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
