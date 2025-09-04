"use client"
import useSWR from "swr";
import React from "react";

const fetcher = (...args: [any, any]) => fetch(...args).then(res => res.json());

export default function Page() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos/1"
  //     );
  //     if (!response.ok) {
  //       throw new Error("HTTP error! status:" + response.status);
  //     }

  //     const result = await response.json();
  //     setData(result);
  //   };

  //   fetchData().catch((e) => {
  //     console.error("An error occurred while fetching the data:" + e);
  //   });
  // }, []);

  const {data, error, isLoading} = useSWR("https://jsonplaceholder.typicode.com/todos/1", fetcher);

  console.log(isLoading, error, 'isLoading')

  if(error) return <p>Failed to load.</p>
  if(isLoading) return <p>Loading...</p>

  return <p>Your Data: {data.title}</p>
}
