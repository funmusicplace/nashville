"use client";
import DonateButton from "./DonateButton";
import React from "react";
import { formatCurrency, formatDate } from "@/app/lib/utils";
import { Gift } from "@/app/page";

const DonateFeed: React.FC<{ artist: { id: number }; gifts: Gift[] }> = ({
  artist,
  gifts,
}) => {
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
                <span className="text-green-700 font-bold">
                  {formatCurrency(gift.amount as number)}
                </span>
              </span>
              {gift.message && (
                <span className="text-gray-600 text-sm mt-1">
                  "{gift.message}"
                </span>
              )}
              <span className="text-sm texxt-gray-600">
                {formatDate({ date: gift.datePurchased })}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DonateFeed;
