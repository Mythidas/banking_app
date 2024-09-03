import Image from "next/image";
import React from 'react'
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface BankCardProps {
  account: PlaidAccount;
  user: User;
  institution?: string;
  showBalance?: boolean;
}

const BankCard = async ({ account, institution, user, showBalance }: BankCardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex relative w-[300px] h-[180px] rounded-2xl bg-gray-700 text-white shadow-md">
        <Image src="/icons/Lines.svg" width={300} height={180} alt="visa" className="absolute top-10" />
        <div className="flex flex-col h-full w-full p-4 justify-between">
          <h1>{institution || account.name}</h1>
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
              ●●●● ●●●● ●●●● {account.mask}
            </div>
          </div>
        </div>
        <div className="flex h-full w-4/12 flex-col items-end justify-between z-10 rounded-r-2xl bg-gradient-to-bl from-pink-300 to-blue-500 py-5 pr-5">
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
      {showBalance && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <p>Total Balance</p>
            <p className="text-gray-600">
              {account.balances.limit === null ? "No limit" : `$${account.balances.limit}`}
            </p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Progress value={account.balances.limit === null ? 5 : account.balances.limit / account.balances.available} color="bg-blue-600" className="h-[10px]" />
              </TooltipTrigger>
              <TooltipContent>
                {`$${account.balances.available} / ${account.balances.limit === null ? "No limit" : account.balances.limit}`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>)}
    </div>
  )
}

export default BankCard;