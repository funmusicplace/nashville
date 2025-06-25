"use client";
import DonateButton from "./DonateButton";
import React from "react";
import { formatCurrency, formatDate } from "@/app/lib/utils";
import { Gift } from "@/app/page";

const DonateFeed: React.FC<{
  artist: { id: number };
  totalGifts?: number;
  gifts: Gift[];
}> = ({ artist, gifts, totalGifts = 0 }) => {
  console.log("totalGifts:", totalGifts);
  return (
    <div className="w-full flex flex-col items-stretch gap-3">
      <DonateButton artist={artist} />
      <div className="w-full">
        <h3 className="text-lg font-bold mb-2">Recent Gifts</h3>
        <ul className="space-y-3  ">
          {gifts.map((gift, idx) => (
            <li key={idx} className="bg-white rounded p-3 shadow flex flex-col">
              <span>
                <span className="font-semibold">Someone</span> donated{" "}
                <span className="text-pink-700 font-bold">
                  {formatCurrency(gift.amount as number)}
                </span>
              </span>
              {gift.message && (
                <span className="text-gray-600 text-sm mt-1">
                  "{gift.message}"
                </span>
              )}
              <span className="text-sm text-gray-600">
                {formatDate({ date: gift.datePurchased })}
              </span>
            </li>
          ))}
          {totalGifts > gifts.length && (
            <li className="text-gray-500 text-sm">
              and {totalGifts - gifts.length} more gifts...
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DonateFeed;
