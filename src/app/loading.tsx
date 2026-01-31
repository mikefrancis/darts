import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full">
      <Skeleton className="h-4 w-[150px]" />
    </div>
  );
};

export default Loading;
