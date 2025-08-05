// components/RefreshButton.tsx
'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function RefreshButton() {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.refresh()}
      variant="secondary"
      style={{ 
            background: 'linear-gradient(90deg, #ffb09e, #f9c07d)',
            color: '#673066'
        }}
    >
      Update Gallery
    </Button>
  )
}
