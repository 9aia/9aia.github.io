export type ProjectStatus = 'recent' | 'active' | 'wip' | 'deprecated';
export type ProjectStage = 'alpha' | 'beta';
export type ProjectLayer = 'delivery' | 'memory' | 'process' | 'interface';

export interface Project {
    name: string;
    tagline?: string;
    description?: string;
    layer?: ProjectLayer | null;
    role?: string | null;
    website?: string | null;
    repo?: string | null;
    docs?: string | null;
    keywords: string[];
    status?: ProjectStatus;
    stage?: ProjectStage;
    order?: number;
}
