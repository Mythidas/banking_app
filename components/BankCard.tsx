import Image from "next/image";
import React from 'react'

interface BankCardProps {
  account: Account;
  user: User;
}

const BankCard = ({ account, user }: BankCardProps) => {
  return (
    <div className="flex w-[300px] h-[180px] rounded-2xl bg-gray-700 text-white shadow-md">
      <div className="flex flex-col h-full w-full p-4 justify-between">
        <h1>{account.name}</h1>
        <div className="flex flex-col w-fit">
          <div className="flex w-full justify-between text-sm">
            <p>
              {user.name.toUpperCase()}
            </p>
            <p>
              ●● / ●●
            </p>
          </div>
          <div className="tracking-wide">
            ●●●● ●●●● ●●●● ●●●●
          </div>
        </div>
      </div>
      <div className="flex h-full w-5/12 flex-col items-end justify-between rounded-r-2xl bg-gradient-to-br from-blue-500 to-pink-300/70 py-5 pr-5">
        <Image
          src="/icons/Paypass.svg"
          width={20}
          height={24}
          alt="pay"
        />
        <Image
          src="/icons/mastercard.svg"
          width={45}
          height={32}
          alt="mastercard"
          className="ml-5"
        />
      </div>
    </div>
  )
}

export default BankCard;