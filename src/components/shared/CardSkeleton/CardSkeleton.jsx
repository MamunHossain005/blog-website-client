import Skeleton from "react-loading-skeleton";

const CardSkeleton = ({ cards }) => {
    return <div className="grid grid-cols-3 gap-5">
        {Array(cards).fill(0).map((_, i) => (
            <div key={i} className="shadow-lg p-5">
                <div className="mb-5">
                    <Skeleton className="h-52"></Skeleton>
                </div>
                <div>
                    <Skeleton count={4} className="mb-3" />
                </div>
                <div className="flex gap-4 mt-3">
                    <Skeleton width={150} height={40}></Skeleton>
                    <Skeleton width={150} height={40}></Skeleton>
                </div>
            </div>
        ))}
    </div>
};

export default CardSkeleton;