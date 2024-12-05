// components/video/VideoThumbnail.js
'use client';

import { memo } from 'react';

export const VideoThumbnail = memo(({ vimeoId, title }) => {
  return (
    <div className="relative w-full h-full">
      <img
        src={`https://vumbnail.com/${vimeoId}.jpg`}
        className="absolute inset-0 w-full h-full rounded-xl object-cover"
        alt={title || "Video thumbnail"}
        loading="lazy"
      />
    </div>
  );
});

VideoThumbnail.displayName = 'VideoThumbnail';