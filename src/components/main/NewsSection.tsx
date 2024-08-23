"use client";
import { useStore } from "@/lib/store";
import type { articles } from "@/types";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import NewsCard from "./NewsCard";
import { useEffect } from "react";

const NewsSection = () => {
  const { country, city } = useStore();
  const fetchItems = async ({ pageParam = 0 }) => {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${country}&pageSize=10&page=${pageParam}&apiKey=${process.env.NEWS_API}`
    );
    const data = await res.json();
    return {
      articles: data.articles,
      nextPage: pageParam + 1,
      totalResults: data.totalResults,
    };
  };
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isPending } = useInfiniteQuery({
    queryKey: ["Items"],
    queryFn: fetchItems,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    refetchInterval: 60000,
  });

  return (
    <Card className="h-full overflow-y-auto max-w-80 bg-opacity-60">
      <CardBody>
        <div>
          {data?.pages.map((page, i: number) => (
            <div key={i} className="flex flex-col space-y-5 my-5">
              {page.articles.map((item: articles, j: number) => (
                <NewsCard key={j} news={item} />
              ))}
            </div>
          ))}
          <Button
            fullWidth
            onPress={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            More news
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default NewsSection;
