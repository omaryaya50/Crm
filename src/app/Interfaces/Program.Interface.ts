export interface Program
{
    progId: number;
    parentID: number;
    arabicName: string;
    latinName: string;
    url: string;
    notActive?: boolean;
}
