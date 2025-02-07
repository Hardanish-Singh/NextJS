import Skeleton from "react-loading-skeleton";

const LoadingNewIssue = () => {
    return (
        <form className="max-w-xl space-y-3">
            <Skeleton />
            <Skeleton height="200px" />
            <Skeleton />
        </form>
    );
};

export default LoadingNewIssue;
