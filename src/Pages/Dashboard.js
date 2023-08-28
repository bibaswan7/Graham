import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Card, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { setSearchQuery } from "../features/searchQuerySlice";
import { setImagesData } from "../features/imagesDataSlice";

const { Search } = Input;
const { Meta } = Card;

export default function Dashboard() {
  const imagesData = useSelector((state) => state.imagesData);
  const searchQuery = useSelector((state) => state.searchQuery);
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      fetch(
        `https:/api.unsplash.com/search/photos?client_id=_gHCUNCi6-v4iUce4nK7Smc3rKXx7dNh3fdOCiQ_zFU&query=${searchQuery}&per_page=20`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setImagesData(data.results));
          setLoading(false);
        });
    } else {
      dispatch(setImagesData([]));
    }
  }, [searchQuery]);

  const feedHTML = imagesData.map((item, index) => {
    const {
      alt_description,
      description,
      urls: { regular },
      user: { name },
      likes,
    } = item;

    return (
      <Card
        key={index}
        hoverable
        style={{
          width: "600px",
          marginBottom: "20px",
        }}
        cover={<img alt="example" src={regular} />}
      >
        <Meta
          title={
            <span className="like-container">
              <AiOutlineHeart /> {likes} likes
            </span>
          }
        />
        <Meta title={name} />
        <Meta description={description ? description : alt_description} />
      </Card>
    );
  });

  return (
    <div className="dashboard-container">
      <Search
        placeholder="Enter your query"
        enterButton
        defaultValue={searchQuery}
        onSearch={(value, event) => dispatch(setSearchQuery(value))}
        loading={isLoading}
      />
      {feedHTML}
    </div>
  );
}