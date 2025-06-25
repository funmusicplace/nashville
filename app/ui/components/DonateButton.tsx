"use client";

import React from "react";
import Modal from "@/app/ui/components/Modal";
import AmountButtons from "./AmountButtons";
import api from "@/app/lib/api";

type DonateButtonProps = {
  children?: React.ReactNode;
  artist: { id: number };
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
    // Here you would typically handle the donation logic, e.g., API call
    setIsOpen(false);
  }, [artist, donationAmount]);

  return (
    <>
      <button
        type="button"
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className="text-xl px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50"
        onClick={toggleModal}
      >
        {children || "Donate"}
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal} onConfirm={onConfirmation}>
        <AmountButtons amount={donationAmount} setAmount={setDonationAmount} />
      </Modal>
    </>
  );
};

export default DonateButton;
