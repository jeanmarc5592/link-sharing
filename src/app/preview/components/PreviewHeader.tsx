"use client"

import Button from "@/app/common/components/Button"
import { ROUTES } from "@/lib/constants/routes";
import { useRouter } from "next/navigation"

const PreviewHeader = () => {
  const router = useRouter();

  const navigateToEditor = () => {
    router.push(ROUTES.home.href);
  }

  const createShareLink = () => {
    // TODO: Implement logic to create a share link
    // TODO: Copy to clipboard automatically
    // TODO: Render success notification when copied successfully
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
