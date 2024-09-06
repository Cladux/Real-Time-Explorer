"use client";
import { useStore } from "@/lib/store";
import type { articles } from "@/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Divider,
  Skeleton,
  Switch,
} from "@nextui-org/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import NewsCard from "./NewsCard";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";

const NewsSection = () => {
  const { country, city } = useStore();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [toggleNews, setToggleNews] = useState<boolean>(true);

  //getting news articles in infinite mode
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
  const { data, fetchNextPage, isFetchingNextPage, isFetching, hasNextPage, isSuccess } = useInfiniteQuery({
    queryKey: ["Items", isSelected],
    queryFn: fetchItems,
    initialPageParam: 1,
    enabled: toggleNews,
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    refetchInterval: 60000,
  });

  //refreshing news every 60 seconds
  useEffect(() => {
    if (isSuccess && toggleNews) {
      const interval = setInterval(() => {
        setValue((v) => (v >= 60 ? 0 : v + 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isSuccess, isSelected, toggleNews]);

  return (
    <Card className={`${toggleNews ? "h-full" : "h-auto"} overflow-y-auto w-full bg-opacity-60 shadow max-w-sm`}>
      <CardHeader className="flex justify-between items-center">
        <Switch size="sm" isSelected={isSelected} onValueChange={setIsSelected}>
          country
        </Switch>
        {toggleNews ? (
          <CircularProgress
            aria-label="refresh news"
            size="sm"
            value={value}
            maxValue={60}
            color="default"
            showValueLabel={false}
            label={isFetching && "refreshing..."}
            className="mx-3"
            classNames={{ label: "text-xs" }}
          />
        ) : (
          "News section"
        )}
      </CardHeader>
      {toggleNews && (
        <CardBody className="snap-mandatory snap-y">
          <Skeleton className="rounded-xl w-full h-72 mb-5 snap-center" isLoaded={isSuccess}>
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
        </CardBody>
      )}
      <CardFooter className="flex flex-col">
        <Divider className="mb-1" />
        <Button
          variant="light"
          size="sm"
          fullWidth
          onPress={() => {
            setToggleNews(!toggleNews);
            !toggleNews && setValue(0);
          }}
        >
          {toggleNews ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsSection;
