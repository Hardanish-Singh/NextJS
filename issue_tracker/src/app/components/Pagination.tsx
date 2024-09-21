"use client";

import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

interface Props {
    itemCount: number; // total number of items
    pageSize: number; // number of items per page
    currentPage: number; // current page
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount <= 1) {
        return null;
    }

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        // router.push("?" + params.toString());
        // router.push("/issues" + "?" + params.toString());
        const query = params.size ? `?${params.toString()}` : "";
        router.push(`/issues${query}`);
    };

    return (
        <Flex align="center" justify="center" gap="2" my="2">
            <Text size="2">
                Page {currentPage} of {pageCount}
            </Text>
            <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={() => changePage(1)}>
                <FaAnglesLeft />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
            >
                <FaChevronLeft />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === pageCount}
                onClick={() => changePage(currentPage + 1)}
            >
                <FaChevronRight />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === pageCount}
                onClick={() => changePage(pageCount)}
            >
                <FaAnglesRight />
            </Button>
        </Flex>
    );
};

export default Pagination;
