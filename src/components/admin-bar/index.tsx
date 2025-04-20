import { getClientSideURL } from '@/utilities/getURL'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import ExitDraftBtn from './exit-draft-btn'

const AdminBar = async () => {
  const { isEnabled: draft } = await draftMode()

  if (!draft) {
    return null
  }
  return (
    <div className="w-full flex justify-between items-center p-2 bg-black text-white rounded-md shadow-lg ">
      <p className="">You are currently in draft mode </p>
      <div className="flex justify-between items-center gap-3">
        <Link href={getClientSideURL() + '/admin'}>Dashboard</Link>
        <ExitDraftBtn className="cursor-pointer" />
      </div>
    </div>
  )
}

export default AdminBar
