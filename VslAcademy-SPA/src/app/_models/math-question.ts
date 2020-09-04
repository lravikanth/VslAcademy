import { MathAnswer } from './math-answer';
export class MathQuestion {
    id: number;
    skillGradeMappingId: number;
	questionType: string;
	difficultyScore: number;
	topText: string;
	actualText: string;
	belowText: string;
	url: string;
	lateX: string;
    answerId: number;
    answer: MathAnswer;
}
