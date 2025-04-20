'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const ExitDraftBtn = ({ className = '' }: { className?: string }) => {
  const router = useRouter()

  const onClickHandler = async () => {
    await fetch('/next/exit-preview')
    router.refresh()
  }

  return (
    <button className={className} onClick={onClickHandler}>
      Exit Draft Mode
    </button>
  )
}

export default ExitDraftBtn
