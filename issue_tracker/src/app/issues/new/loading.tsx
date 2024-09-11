import Skeleton from "react-loading-skeleton";

export default function LoadingNewIssue() {
    return (
        <form className="max-w-xl space-y-3">
            <Skeleton />
            <Skeleton height="200px" />
            <Skeleton />
        </form>
    );
}
