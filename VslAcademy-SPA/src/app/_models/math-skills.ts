export class MathSkills {
    id: number;
    mathSubDomainId: number;
    SkillName: string;
    gradeMapping: gradeMapping[]
}

export interface gradeMapping {
    Id: number;
    SkillId: number;
    gradeId: number;
}