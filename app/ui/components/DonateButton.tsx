"use client";

import React from "react";
import Modal from "@/app/ui/components/Modal";
import AmountButtons from "./AmountButtons";
import api from "@/app/lib/api";
import { formatCurrency } from "@/app/lib/utils";
import { Artist } from "@/app/page";

type DonateButtonProps = {
  children?: React.ReactNode;
  artist: Artist;
};

const DonateButton: React.FC<DonateButtonProps> = ({ children, artist }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [donationAmount, setDonationAmount] = React.useState<number>(25);
  const [message, setMessage] = React.useState<string>("");

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onConfirmation = React.useCallback(async () => {
    const response = await api.post<
      { price: number; email?: string; message?: string },
      { redirectUrl: string }
    >(`artists/${artist.id}/tip`, {
      price: Number(donationAmount) * 100,
      message,
      // email,
    });
    window.location.assign(response.redirectUrl);
    setIsOpen(false);
  }, [artist, message, donationAmount]);

  return (
    <>
      <button
        type="button"
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className="text-xl 
        px-6 
        py-3 
        bg-primary-default 
        hover:bg-primary-dark 
        text-white font-semibold rounded-lg shadow-md transition-colors 
        duration-200 focus:outline-none focus:ring-2 
        focus:ring-pink-400 focus:ring-opacity-50"
        onClick={toggleModal}
      >
        {children || "Donate"}
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal} onConfirm={onConfirmation}>
        <AmountButtons
          amount={donationAmount}
          setAmount={setDonationAmount}
          currency={artist.user.currency}
        />
        <div>
          <p className="text-sm text-foreground-light mt-2">
            {artist.defaultPlatformFee ?? 10}% (
            {formatCurrency(
              donationAmount * (artist.defaultPlatformFee ?? 10),
              artist.user.currency
            )}
            ) of your donation goes to support Mirlo.
          </p>
        </div>
        <div>
          <label htmlFor="message" className="block">
            Leave a message for the Nashville crew (optional)
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Letsgoooo!"
          ></textarea>
        </div>
        <div>
          <p className="text-sm text-foreground-light mt-2">
            By clicking "Donate", you agree to the Mirlo{" "}
            <a
              href="https://mirlo.space/pages/terms"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
            .
          </p>
        </div>
      </Modal>
    </>
  );
};

export default DonateButton;
