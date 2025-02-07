import Skeleton from "react-loading-skeleton";

const LoadingNewIssue: React.FC = (): React.JSX.Element => {
    return (
        <form className="max-w-xl space-y-3">
            <Skeleton />
            <Skeleton height="200px" />
            <Skeleton />
        </form>
    );
};

export default LoadingNewIssue;
