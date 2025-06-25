"use client";

import "@/app/ui/global.css";
import DonateFeed from "@/app/ui/components/DonateFeed";
import Thermometer from "@/app/ui/components/Thermometer";
import api from "@/app/lib/api";
import React from "react";

type Artist = {
  id: number;
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

  React.useEffect(() => {
    const fetchArtist = async () => {
      const { result } = await api.get<Artist>(`artists/${artistId}`);
      setArtist(result);
    };
    fetchArtist();
  }, []);

  React.useEffect(() => {
    const fetchArtist = async () => {
      const { result } = await api.get<Gift[]>(
        `artists/${artistId}/supporters`
      );
      setGifts(result);
    };
    fetchArtist();
  }, []);

  const giftsTotal = React.useMemo(() => {
    return gifts.reduce((total, gift) => total + (gift.amount || 0), 0);
  }, [gifts]);

  if (!artist) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col p-10">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-6 rounded-lg px-6 pt-20">
          <p className="text-xl text-gray-800 underline bold md:text-4xl md:leading-normal">
            Get us to Nashville.
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
        <div className="flex flex-col items-center gap-6 rounded-lg px-6 pt-20 flex-1">
          <DonateFeed artist={artist} gifts={gifts} />
        </div>
      </div>
    </main>
  );
}
