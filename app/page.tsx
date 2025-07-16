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
const goal = process.env.NEXT_PUBLIC_GOAL ?? 3000;

let root = window.document.documentElement;

const updateColors = (colors: { primary: string }) => {
  root.style.setProperty("--primary-color", colors.primary);
};

export default function Page() {
  const [artist, setArtist] = React.useState<Artist | null>(null);
  const [gifts, setGifts] = React.useState<Gift[]>([]);
  const [totalGifts, setTotalGifts] = React.useState<number>();
  const [totalSupporters, setTotalSupporters] = React.useState<number>();
  const [totalAmount, setTotalAmount] = React.useState<number>();

  React.useEffect(() => {
    const fetchArtist = async () => {
      const { result } = await api.get<Artist>(`artists/${artistId}`);
      setArtist(result);
    };
    fetchArtist();
  }, []);

  React.useEffect(() => {
    const fetchArtist = async () => {
      const { results, total, totalAmount, totalSupporters } =
        (await api.getMany<Gift>(`artists/${artistId}/supporters?take=10`)) as {
          results: Gift[];
          total: number;
          totalAmount: number;
          totalSupporters: number;
        };
      setGifts(results);
      setTotalGifts(total);
      setTotalSupporters(totalSupporters);
      setTotalAmount(totalAmount);
    };
    fetchArtist();
  }, []);

  if (!artist) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col p-10 max-w-7xl mx-auto">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-6 rounded-lg px-6 pt-20 flex-1">
          <p className="text-xl text-foreground-default underline bold md:text-4xl md:leading-normal">
            Get us to Nashville
          </p>
          <p
            className={`text-xl text-foreground-default md:text-3xl md:leading-normal`}
          >
            we’re on a panel in nashville, but we need money to get there!
          </p>
          {totalAmount && (
            <Thermometer
              current={totalAmount / 100}
              goal={Number(goal)}
              totalSupporters={totalSupporters}
            />
          )}
        </div>
        <div className="flex flex-col items-center gap-6 rounded-lg px-6 pt-20 flex-0 min-w-[350px]">
          <DonateFeed artist={artist} gifts={gifts} totalGifts={totalGifts} />
        </div>
      </div>
    </main>
  );
}
