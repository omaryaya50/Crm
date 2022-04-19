export interface IQuestion {

    questionCode?: number;

    actualQuestionCode?: number;

    questionName?: string;

    questionLatName?: string;

    requiredYN?: boolean;

    notesYN?: boolean;

    attachmentYN?: boolean;

    summaryYN?: boolean;

    progId?: number;

    dependsOnQuestionCode?: number;

    answerCode?: number;
}
