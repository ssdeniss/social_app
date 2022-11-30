import React from "react";
import { useState } from "react";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  if (loading) return <Spinner message="We are adding new ideas" />;
  return <div></div>;
};

export default Feed;
