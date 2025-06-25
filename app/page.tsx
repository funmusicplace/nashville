"use client";

import "@/app/ui/global.css";
import DonateFeed from "@/app/ui/components/DonateFeed";
import Thermometer from "@/app/ui/components/Thermometer";
import api from "@/app/lib/api";
import React from "react";

type Artist = {
  id: number;
  properties: {
    colors: { primary: string };
  };
};

export type Gift = {
  name: string;
  amount: number;
  message?: string;
  datePurchased: string;
};

const artistId = process.env.NEXT_PUBLIC_ARTIST_ID ?? 1;

export default function Page() {
  const [artist, setArtist] = React.useState<Artist | null>(null);
  const [gifts, setGifts] = React.useState<Gift[]>([]);
  const [totalGifts, setTotalGifts] = React.useState<number>();

  React.useEffect(() => {
    const fetchArtist = async () => {
      const { result } = await api.get<Artist>(`artists/${artistId}`);
      setArtist(result);
    };
    fetchArtist();
  }, []);

  React.useEffect(() => {
    const fetchArtist = async () => {
      const { results, total } = await api.getMany<Gift>(
        `artists/${artistId}/supporters?take=20`
      );
      setGifts(results);
      setTotalGifts(total);
    };
    fetchArtist();
  }, []);

  const giftsTotal = React.useMemo(() => {
    return gifts?.reduce((total, gift) => total + (gift.amount || 0), 0) ?? [];
  }, [gifts]);

  if (!artist) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col p-10">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-6 rounded-lg px-6 pt-20 flex-2">
          <p className="text-xl text-gray-800 underline bold md:text-4xl md:leading-normal">
            Get us to Nashville
          </p>
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            we’re on a panel in nashville, but we need money to get there!
          </p>
          <Thermometer
            current={giftsTotal / 100}
            goal={3000}
            giftsLength={gifts.length}
          />
        </div>
        <div className="flex flex-col items-center gap-6 rounded-lg px-6 pt-20 flex-1 min-w-[300px]">
          <DonateFeed artist={artist} gifts={gifts} totalGifts={totalGifts} />
        </div>
      </div>
    </main>
  );
}
