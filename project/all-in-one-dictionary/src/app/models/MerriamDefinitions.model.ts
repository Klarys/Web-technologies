import { clearLine } from 'readline'

export class MerriamDefinitions {
    def: [{
        sseq: [{
            text: string;
            elem: MerriamDt[];
        }];
    }];
};

export class MerriamDt {
    dt: string[];
}