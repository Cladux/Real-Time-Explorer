"use client";
import formatDate from "@/lib/formatDate";
import type { articles } from "@/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

const NewsCard = ({ news }: { news: articles }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Card className="bg-opacity-90 shadow-sm">
        <CardHeader className="bg-transparent">
          <Image isBlurred removeWrapper loading="lazy" src={news.urlToImage} alt={news.title} className="w-full" />
        </CardHeader>
        <CardBody>
          <h3 className="font-bold">{news.source.name}:</h3>
          <p className="font-semibold">{news.title}</p>
          <span className="text-xs mt-2">{news.author}</span>
        </CardBody>
        <CardFooter className="flex justify-between">
          <span className="text-sm">{formatDate(news.publishedAt)}</span>
          <Button size="sm" color="primary" onPress={onOpen}>
            Read more
          </Button>
        </CardFooter>
      </Card>
      <Modal
        scrollBehavior="inside"
        size="md"
        backdrop="transparent"
        shadow="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                <h3>{news.title}</h3>
                <p className="font-normal text-sm">
                  author: <span className="text-xs">{news.author}</span>
                </p>
              </ModalHeader>
              <ModalBody>
                <Image isBlurred loading="lazy" src={news.urlToImage} alt={news.title} />
                <p>{news.description}</p>
                <p>{news.content}</p>
                <span className="font-semibold">
                  Read more:{" "}
                  <Link
                    target="_blank"
                    underline="always"
                    href={news.url}
                    color="foreground"
                    className="max-w-40 truncate"
                  >
                    {news.source.name}
                  </Link>
                </span>
              </ModalBody>
              <ModalFooter className="flex justify-between items-center">
                <span className="text-xs">{formatDate(news.publishedAt)}</span>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default NewsCard;
