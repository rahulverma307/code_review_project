"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInWithGithub(
  formData: FormData
): Promise<void> {
  const callbackUrl =
    formData.get("callbackUrl")?.toString() || "/dashboard";

  const result = await auth.api.signInSocial({
    body: {
      provider: "github",
      callbackURL: callbackUrl,
    },
    headers: await headers(),
  });

  if (result.url) {
    redirect(result.url);
  }

  throw new Error("Failed to sign in");
}