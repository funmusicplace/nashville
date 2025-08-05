"use client";

import "@/app/ui/global.css";
import DonateFeed from "@/app/ui/components/DonateFeed";
import Thermometer from "@/app/ui/components/Thermometer";
import api from "@/app/lib/api";
import React from "react";
import { remark } from "remark";
import html from "remark-html";
import DonateButton from "./ui/components/DonateButton";

const descriptionMarkdown = `
Three Mirlo artists have been invited to present at Americanafest, the annual gathering of the Americana Music 
Association that takes place in Nashville, Tennessee. The panel is called 
Music Cooperatives: Reshaping the Industry Through Solidarity, Not 
Exploitation and will feature four panelists:

*[Alex Rodríguez](https://alexwrodriguez.com/about/)*, co-founder of [Mirlo](https://mirlo.space/arod/releases), is also a writer, 
organizer, and trombonist working at the confluences of music and social 
transformation. His writing on the contemporary jazz world has appeared 
in The Newark Star-Ledger, NPR Music, LA Weekly, and DownBeat, among 
other outlets. Alex has also worked in the solidarity economy movement as 
 co-founder of the mental health worker cooperative, Catalyst Cooperative 
 Healing, as facilitator for the Sociocracy for All Cooperatives Circle, and as an Artist-Owner of Ampled.  Keeping up as a trombonist has always been an important part of this work, which has also brought wonderful opportunities to perform and teach throughout the Americas since his first gigs in Chile with Los Andes Big Band 20 years ago.

*[McKenzie Jones](https://www.obran.coop/leadership/mckenzie-jones)*, co-founder of [Strange Heavy](https://mirlo.space/strange-heavy). Strange Heavy plays original moody folk and sultry rock. Based in Ithaca, NY their unique alt rock, gothic Americana, and classic country inspired music consists of groovy cello, guitar, banjo, bass, and drum instrumentation backing haunting and bluesy vocals. Their debut album Wearing No Collar was recorded as a duo in Nashville and released on May 15, 2020. The band has since expanded to a four piece with a second album released September 13, 2024 titled Too Poor To Pray.

*[Sonia Erika](https://deathisabusiness.com/)*, co-founder of [Death Is A Business](https://mirlo.space/death-is-a-business). Death is a Business is a nomadic experimental music collective that brings together local and global artists to explore the profound connection between humanity and the natural world. They serve Mother Earth and craft immersive soundscapes that merge ancient traditions with modern technology. Death Is A Business envisions a world where music transcends mortal pleasure and wealth, empowering those who seek meaning beyond submission and domination.

To help them get there, we've set up this fundraiser page to invite donations to cover the costs for them and their bandmates to participate in Americanafest. We welcome donations of any size, and if you aren't able to contribute cash right now, please share the link with your networks. Thanks so much for your support!
`;

export type Artist = {
  id: number;
  defaultPlatformFee?: number;
  properties: {
    colors: { primary: string } | null;
    fundraising?: {
      title: string;
      description: string;
      imageUrl?: string;
      sinceDate?: string;
      goalAmount?: number;
    };
  };
  user: {
    currency: string;
  };
};

export type Gift = {
  name: string;
  amount: number;
  message?: string;
  datePurchased: string;
};

const artistId = process.env.NEXT_PUBLIC_ARTIST_ID ?? 1;
const goal = Number(process.env.NEXT_PUBLIC_GOAL ?? 3000);
const campaignStartDate = "2025-07-01";
const campaignTitle = "Help Mirlo Artists Get to Nashville";

export default function Page() {
  const [artist, setArtist] = React.useState<Artist | null>(null);
  const [gifts, setGifts] = React.useState<Gift[]>([]);
  const [totalGifts, setTotalGifts] = React.useState<number>();
  const [totalSupporters, setTotalSupporters] = React.useState<number>();
  const [totalAmount, setTotalAmount] = React.useState<number>(0);
  const [description, setDescription] = React.useState<string>("");
  const [goalAmount, setGoalAmount] = React.useState<number>(Number(goal));
  const [title, setTitle] = React.useState<string>("A Fundraiser!");

  const fetchArtist = React.useCallback(async () => {
    const { result } = await api.get<Artist>(`artists/${artistId}`);
    setArtist(result);
    const sinceDate =
      result.properties.fundraising?.sinceDate ?? campaignStartDate;
    setGoalAmount(result.properties.fundraising?.goalAmount ?? goal);
    setTitle(result.properties.fundraising?.title ?? campaignTitle);
    const { results, total, totalAmount, totalSupporters } =
      (await api.getMany<Gift>(
        `artists/${artistId}/supporters?sinceDate=${sinceDate}`
      )) as {
        results: Gift[];
        total: number;
        totalAmount: number;
        totalSupporters: number;
      };
    setGifts(results);
    setTotalGifts(total);
    setTotalSupporters(totalSupporters);
    setTotalAmount(totalAmount);
    const processedContent = await remark()
      .use(html)
      .process(
        result.properties.fundraising?.description ?? descriptionMarkdown
      );
    const contentHtml = processedContent.toString();
    setDescription(contentHtml);
  }, []);

  React.useEffect(() => {
    fetchArtist();
  }, []);

  if (!artist) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col p-10 max-w-7xl mx-auto px-6 ">
      <div className="mt-4 flex grow flex-col items-start gap-4 md:flex-row relative">
        <div className="flex flex-col gap-6 rounded-lg pt-20 flex-1 md:mb-20 lg:pr-12">
          <h1 className="text-foreground-default font-bold text-4xl md:leading-normal">
            {title}
          </h1>
          <img
            src={artist.properties.fundraising?.imageUrl ?? "/hero-image.png"}
            alt="Fundraiser Hero"
            className="rounded-lg w-full h-auto"
          />
          <Thermometer
            current={totalAmount / 100}
            goal={goalAmount}
            totalSupporters={totalSupporters}
          />
          <div
            className="post"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <div className="block hidden">
            <DonateButton artist={artist} />
          </div>
        </div>
        <div className="sticky top-0 flex flex-col items-center rounded-lg md:pt-20 flex-0 min-w-[350px]">
          <DonateFeed artist={artist} gifts={gifts} totalGifts={totalGifts} />
        </div>
      </div>
      <div>
        <p className="text-foreground-light text-sm">
          This fundraiser is powered by{" "}
          <a
            href="https://mirlo.space"
            className="text-primary-default underline font-bold hover:text-primary-dark focus:text-primary-dark"
          >
            Mirlo
          </a>
          .
        </p>
      </div>
    </main>
  );
}
