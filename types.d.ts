export type ProjectStatus = 'recent' | 'backlog' | 'wip' | 'deprecated';

export interface Project {
    name: string;
    description?: string;
    website?: string;
    keywords: string[];
    status?: ProjectStatus;
    order?: number;
}
