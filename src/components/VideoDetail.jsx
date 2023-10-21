import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Avatar } from "@mui/material";
import { colors } from '../utils/colors'
import { CheckCircle, FavoriteOutlined, MarkChatRead, Visibility } from '@mui/icons-material'

import { Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box height={'90vh'} mt={'10vh'} color={colors.white} p={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Box >
        <Stack direction={{ md: 'column', lg: 'row' }} width={'100%'} >
          <Box sx={{ width: { md: '100%', lg: '65%' }, overflow: 'hidden' }}>
            <ReactPlayer
              style={{ borderRadius: '100px' }}
              url={`https://www.youtube.com/watch?v=${id}`}
              className='react-player'
              controls
            />
          </Box>

          <Stack sx={{ gap: '20px', width: { md: '100%', lg: '35%' }, height: '80vh', overflowY: 'scroll' }} p={{ md: 0, lg: 4 }} mt={{ xs: 2 }}>

            <Typography variant='h5' fontWeight='bold' >
              {title}
            </Typography>
            <Typography variant='subtitle2' sx={{ opacity: '.7' }}>
              {videoDetail.snippet.description}
            </Typography>
            <Stack direction='row' gap='20px' alignItems='center' >
              <Stack sx={{ opacity: 0.7 }} direction='row' alignItems='center' gap='3px'>
                <Visibility />
                {parseInt(viewCount).toLocaleString()} views
              </Stack>
              <Stack sx={{ opacity: 0.7 }} direction='row' alignItems='center' gap='3px'>
                <FavoriteOutlined />
                {parseInt(likeCount).toLocaleString()} likes
              </Stack>
              <Stack sx={{ opacity: 0.7 }} direction='row' alignItems='center' gap='3px'>
                <MarkChatRead />
                {parseInt(videoDetail.statistics.commentCount).toLocaleString()} comment
              </Stack>
            </Stack>
            <Stack direction='row' >
              <Link to={`/channel/${channelId}`}>
                <Stack direction='row' alignItems='center' gap='5px' marginTop='5px'>
                  <Avatar
                    alt={videoDetail.snippet.channelTitle}
                    src={videoDetail.snippet.thumbnails.default.url}
                  />
                  <Typography variant='subtitle2' color={colors.gray}>
                    {channelTitle}
                    <CheckCircle sx={{ fontSize: '12px', color: colors.gray, ml: '5px' }} />
                  </Typography>
                </Stack>
              </Link>
            </Stack>

          </Stack>
        </Stack>
        {/* <Box
          width={{ xs: '100%', md: '25%' }}
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent='center'
          alignItems='center'
          overflow={'scroll'}
          maxHeight={'120vh'}
        >
          <Videos videos={videoDetail} />
        </Box> */}
      </Box>
    </Box>
  );
};

export default VideoDetail;
