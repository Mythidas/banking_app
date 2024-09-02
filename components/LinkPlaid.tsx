"use client";

import React, { useCallback, useEffect, useState } from 'react'
import { PlaidLinkOnSuccess, usePlaidLink } from "react-plaid-link";
import { Button } from "./ui/button";
import { createPlaidLinkToken, exchangePlaidPublicToken } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const LinkPlaid = ({ user, newLink }: { user: User, newLink?: boolean }) => {
  const router = useRouter();
  const [linkToken, setLinkToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      const linkToken = await createPlaidLinkToken(user);
      setLinkToken(linkToken.linkToken);
    }

    getLinkToken();
  }, [user])

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    await exchangePlaidPublicToken({
      public_token,
      user
    });

    router.push("/my-banks");
  }, [user])

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess
  });

  return (
    <Button className={cn({ "button-gradient": newLink, "flex h-fit gap-2 bg-white text-blue-600 px-4 py-0": !newLink })} onClick={() => open()} disabled={!ready}>
      {!newLink && <span className="text-2xl leading-[1.35rem]">+</span>}
      Link Plaid
    </Button>
  )
}

export default LinkPlaid;