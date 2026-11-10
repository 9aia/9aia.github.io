export type ProjectStatus = 'recent' | 'active' | 'wip' | 'deprecated';
export type ProjectStage = 'alpha' | 'beta';

export interface Project {
    name: string;
    description?: string;
    website?: string;
    keywords: string[];
    status?: ProjectStatus;
    stage?: ProjectStage;
    order?: number;
}
