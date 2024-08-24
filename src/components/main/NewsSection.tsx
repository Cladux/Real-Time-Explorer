"use client";
import { useStore } from "@/lib/store";
import type { articles } from "@/types";
import { Button, Card, CardBody, CardHeader, Progress, Skeleton, Spinner, Switch } from "@nextui-org/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import NewsCard from "./NewsCard";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { IoIosMore } from "react-icons/io";

const NewsSection = () => {
  const { country, city } = useStore();
  const [isSelected, setIsSelected] = useState(false);
  const [value, setValue] = useState(0);

  const fetchItems = async ({ pageParam = 0 }) => {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${isSelected ? country : city}&pageSize=10&page=${pageParam}&apiKey=${
        process.env.NEWS_API
      }`
    );
    const data = await res.json();
    return {
      articles: data.articles,
      nextPage: pageParam + 1,
      totalResults: data.totalResults,
    };
  };
  const { data, fetchNextPage, isFetchingNextPage, isFetching, hasNextPage, isSuccess, isPending } = useInfiniteQuery({
    queryKey: ["Items", isSelected],
    queryFn: fetchItems,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    refetchInterval: 60000,
  });

  useEffect(() => {
    if (isSuccess) {
      const interval = setInterval(() => {
        setValue((v) => (v >= 60 ? 0 : v + 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isSuccess]);
  return (
    <Card className="h-full overflow-y-auto w-full md:w-80 bg-opacity-90 shadow">
      <CardHeader className="flex justify-between items-center">
        <Switch size="sm" isSelected={isSelected} onValueChange={setIsSelected}>
          country
        </Switch>
        <Progress
          aria-label="refresh news"
          size="sm"
          value={value}
          maxValue={60}
          color="default"
          showValueLabel={false}
          className="max-w-20"
          label={
            isFetching && (
              <span className="flex items-end gap-0.5">
                refreshing<CgSpinner className="animate-spin" />
              </span>
            )
          }
          classNames={{ label: "text-xs" }}
        />
      </CardHeader>
      <CardBody>
        <div>
          <Skeleton className="rounded-xl w-full h-72 mb-5" isLoaded={!isPending}>
            {data?.pages.map((page, i: number) => (
              <div key={i} className="flex flex-col space-y-5 my-5">
                {page.articles.map((item: articles, j: number) => (
                  <NewsCard key={j} news={item} />
                ))}
              </div>
            ))}
            <Button
              color="primary"
              variant="shadow"
              fullWidth
              onPress={() => fetchNextPage()}
              isLoading={isFetchingNextPage}
              disabled={!hasNextPage || isFetchingNextPage}
              endContent={<IoIosArrowDown size={20} />}
              className="mb-5"
            >
              More news
            </Button>
          </Skeleton>
        </div>
      </CardBody>
    </Card>
  );
};

export default NewsSection;
