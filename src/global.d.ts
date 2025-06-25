type ViewTimelineAxis = 'block' | 'inline' | 'vertical' | 'horizontal';

interface ViewTimelineOptions {
    /** Element that drives the timeline */
    subject: Element;
    /** Axis to measure scroll progression – defaults to 'block'. */
    axis?: ViewTimelineAxis;
    /** Optional CSS length-percentage to inset the viewport intersection  */
    inset?: string;
}

declare class ViewTimeline implements AnimationTimeline {
    constructor(options?: ViewTimelineOptions);
    readonly currentTime: number | null;
} 