/* eslint-disable @next/next/no-img-element */
import React from "react";

interface PaymentMethodProps {
  name: string;
  imageUrl: string;
  onClick: () => void;
  selected: boolean;
}

const PaymentMethodButton: React.FC<PaymentMethodProps> = ({
  name,
  imageUrl,
  onClick,
  selected,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center flex-col border rounded-lg p-2 ${
        selected ? "bg-tm20 text-white font-semibold" : ""
      }`}
    >
      <img src={imageUrl} alt={name} className="w-7 h-7" />
      <span className="text-sm">{name}</span>
    </button>
  );
};

export default PaymentMethodButton;
