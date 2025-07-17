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
  const [donationAmount, setDonationAmount] = React.useState<number>(20);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onConfirmation = React.useCallback(async () => {
    const response = await api.post<
      { price: number; email?: string },
      { redirectUrl: string }
    >(`artists/${artist.id}/tip`, {
      price: Number(donationAmount) * 100,
      // email,
    });
    window.location.assign(response.redirectUrl);
    setIsOpen(false);
  }, [artist, donationAmount]);

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
      </Modal>
    </>
  );
};

export default DonateButton;
