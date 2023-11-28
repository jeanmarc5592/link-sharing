"use client"

import Button from "@/app/common/components/Button"
import { ROUTES } from "@/lib/constants/routes";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { toast } from "react-toastify";

const PreviewHeader = () => {
  const getAsyncSession = getSession();
  const router = useRouter();

  const navigateToEditor = () => {
    router.push(ROUTES.home.href);
  }

  const createShareLink = async () => {
    const session = await getAsyncSession;

    if (!session) {
      console.error("No session");
      return;
    }

    if (!session.user || !("user" in session)) {
      console.error("No user in session");
      return;
    }

    if (!("id" in session.user)) {
      console.error("No user id");
      return;
    }

    const shareLink = `${window.location.host}${ROUTES.share.href}?user=${session.user.id}`;

    if (!navigator.clipboard) {
      throw new Error("Browser don't have support for native clipboard.");
    }

    navigator.clipboard.writeText(shareLink);

    toast.success("The link has been copied to your clipboard!");
  }

  return (
    <div className="p-4 flex items-center justify-between sm:bg-white sm:rounded-md sm:mx-4">
      <div>
        <Button variant="secondary" onClick={navigateToEditor}>
          Back to Editor
        </Button>
      </div>

      <div>
        <Button onClick={createShareLink}>
          Share Link
        </Button>
      </div>
    </div>
  )
}

export default PreviewHeader
