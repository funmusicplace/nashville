import { formatCurrency } from "@/app/lib/utils";
import AmountInput from "./AmountInput";
import React from "react";

const defaultGifts: { value: number }[] = [
  { value: 10 },
  { value: 15 },
  { value: 20 },
  { value: 25 },
];

const AmountButtons: React.FC<{
  amount: number;
  setAmount: (amount: number) => void;
  currency?: string;
}> = ({ amount, setAmount, currency }) => {
  const [isOther, setIsOther] = React.useState(false);
  return (
    <>
      <ul className={`mb-1 mt-2`}>
        {defaultGifts.map((gift) => {
          return (
            <li key={gift.value} className={"inline-block"}>
              <input
                type="radio"
                value={gift.value}
                id={`priceButton-${gift.value}`}
                className="hidden"
                checked={amount === gift.value}
                onChange={() => {
                  setAmount(gift.value);
                  setIsOther(false);
                }}
              />
              <label
                htmlFor={`priceButton-${gift.value}`}
                className={`cursor-pointer 
                  mr-2 
                  px-1 
                  py-2 
                  rounded-md 
                  border 
                  duration-200
                  border-gray-300 
                    ${
                      amount === gift.value
                        ? "bg-primary-default text-background-default"
                        : "hover:bg-background-dark"
                    }`}
              >
                {formatCurrency((gift.value as number) * 100, currency)}
              </label>
            </li>
          );
        })}
        <li className={"inline-block"}>
          <input
            type="radio"
            value={"other"}
            id={`priceButton-other`}
            className="hidden"
            defaultChecked={isOther}
            onClick={() => {
              setIsOther(!isOther);
              setAmount(30);
            }}
          />
          <label
            htmlFor={`priceButton-other`}
            className="cursor-pointer mr-2 px-1 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
            style={{
              backgroundColor: isOther ? "#f0f0f0" : "white",
            }}
          >
            Other gift
          </label>
        </li>
      </ul>
      {isOther && <AmountInput amount={amount} setAmount={setAmount} />}
    </>
  );
};

export default AmountButtons;
