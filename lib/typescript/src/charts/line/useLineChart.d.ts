export declare function useLineChart(): {
    currentY: Readonly<{
        value: number;
    }>;
    data: never[];
    currentX: {
        value: number;
    };
    currentIndex: {
        value: number;
    };
    isActive: {
        value: boolean;
    };
    domain: import("./types").TLineChartDomain;
    yDomain: import("./types").YDomain;
    xLength: number;
};
