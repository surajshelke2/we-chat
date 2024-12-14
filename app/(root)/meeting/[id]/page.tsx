import VideoCall from '@/components/VideoCall'
import React from 'react'

const Meeting = ({params}:{params:{id:string}}) => {
  return (
    <div>
      <VideoCall roomId={params.id}/>
    </div>
  )
}

export default Meeting
