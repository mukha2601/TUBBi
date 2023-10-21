import React from 'react'
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { colors } from '../utils/colors'

import { demoThumbnailUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";

const VideoCard = ({ video: { id: { videoId }, snippet } }) => (
  <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
    <Card sx={{ width: '100%', boxShadow: "none", borderRadius: 0 }}>
      <CardMedia image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} alt={snippet?.title}
        sx={{ height: '180px', width: '100%', objectFit: 'cover' }}

      />
      <CardContent sx={{ backgroundColor: colors.matBlack, height: '106px', justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle1" fontWeight="bold" color={colors.white}>
          {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
        </Typography>
        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
          <Typography variant="subtitle2" color={colors.gray}>
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircleIcon sx={{ fontSize: "12px", color: colors.gray, ml: "5px" }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  </Link>
);

export default VideoCard