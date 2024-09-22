"use client";

import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

type Props = {
    itemCount: number; // total number of items
    pageSize: number; // Rows per page or number of items per page
    currentPage: number; // current page
};

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

    const rowsPerPageFragment: React.JSX.Element = (
        <>
            <label htmlFor="rows_per_page" style={{ margin: "auto 4px" }}>
                Rows per page:
            </label>
            <select
                name="rows_per_page"
                id="rows_per_page"
                style={{ margin: "auto 4px", width: "50px" }}
                onChange={(event) => {
                    const pageSize = event.target.value !== "all" ? Number(event.target.value) : itemCount;
                    const params = new URLSearchParams(searchParams);
                    params.set("rowsPerPage", pageSize.toString());
                    const query = params.size ? `?${params.toString()}` : "";
                    router.push(`/issues${query}`);
                }}
                value={pageSize === itemCount ? "all" : pageSize}
                className="border-[1px] border-black"
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="all">All</option>
            </select>
        </>
    );

    return (
        <>
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
                <section className="max-md:hidden">{rowsPerPageFragment}</section>
            </Flex>
            <Flex align="center" justify="center" gap="2" my="2">
                <section className="md:hidden">{rowsPerPageFragment}</section>
            </Flex>
        </>
    );
};

export default Pagination;
