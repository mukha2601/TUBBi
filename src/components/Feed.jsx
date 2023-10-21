import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);

    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
  }, [selectedCategory]);

  return (
    <Stack height={'90vh'} direction={{ md: "row" }}>
      <Box pl={2}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Box>

      <Box px={2}  sx={{ overflowY: "auto", flex: 2 }}>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
