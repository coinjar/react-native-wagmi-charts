export default function useAnimatedPath({ enabled, path, }: {
    enabled?: boolean;
    path: string;
}): {
    animatedProps: Partial<{
        d: string;
    }>;
};
