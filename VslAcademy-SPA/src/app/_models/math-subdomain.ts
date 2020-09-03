export class MathSubdomain {
    id: number;
    mathDomainId: number;
    subDomain: string;
    gradeMapping: gradeMapping[]
}

export interface gradeMapping {
    Id: number;
    subDomainId: number;
    gradeId: number;
}

export interface skillGradeMapping {
    Id: number;
    skillId: number;
    gradeId: number;
}
