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

*[McKenzie Jones]()*, co-founder of [Strange Heavy](https://mirlo.space/strange-heavy) [bio and photo here]

*[Olive Scibelli]()*, co-founder of [DRKMTTR Collective](https://www.drkmttrcollective.com/) [bio and photo here]

*[Sonia Erika]()*, co-founder of [Death Is A Business](https://mirlo.space/death-is-a-business) [bio and photo here]

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
    <main className="flex min-h-screen flex-col p-10 max-w-7xl mx-auto">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-6 rounded-lg px-6 pt-20 flex-1 mb-20">
          <h1 className="text-xl text-foreground-default bold md:text-4xl md:leading-normal">
            {title}
          </h1>
          <Thermometer
            current={totalAmount / 100}
            goal={goalAmount}
            totalSupporters={totalSupporters}
          />
          <div
            className="post"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <DonateButton artist={artist} />
        </div>
        <div className="flex flex-col items-center gap-6 rounded-lg px-6 pt-20 flex-0 min-w-[350px]">
          <DonateFeed artist={artist} gifts={gifts} totalGifts={totalGifts} />
        </div>
      </div>
    </main>
  );
}
