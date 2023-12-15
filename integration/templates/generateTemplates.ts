import * as markdownIt from 'markdown-it';
import * as pdf from 'html-pdf';

import { getRenderedText } from "../../src/functions/sendCandidateResults/application/service/send-notification";
import { TestOutcome } from "../../src/functions/sendCandidateResults/domain/test-outcome";
import { Language } from "../../src/functions/sendCandidateResults/domain/conducted-language";
import {
  personlisationCatBPass,
  personlisationCatBFail,
  personlisationCatCPass,
  personlisationCatCFail,
  personlisationCatADI2Pass,
  personlisationCatADI2Fail,
  personlisationCatCPCPass,
  personlisationCatCPCFail,
  personlisationCatHomePass,
  personlisationCatHomeFail,
  personlisationCatAM1Pass,
  personlisationCatAM1Fail,
  personlisationCatAM2Fail,
  personlisationCatAM2Pass,
  personlisationCatADI3Pass,
  personlisationCatADI3Fail,
  personlisationCatSCPass, personlisationPADI
} from "../../src/functions/sendCandidateResults/application/service/__mocks__/personlisation-details";

const templates = [];

//Add templates to generate pdfs
templates.push(
  //Cat B
  {
    filename: 'catBPassEnglish',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatBPass, Language.ENGLISH, false)
  },
  {
    filename: 'catBPassWelsh',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatBPass, Language.WELSH, false)
  },
  {
    filename: 'catBFailEnglish',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationCatBFail, Language.ENGLISH, false)
  },
  {
    filename: 'catBFailWelsh',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationCatBFail, Language.WELSH, false)
  },
  //Cat C
  {
    filename: 'catCPassEnglish',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatCPass, Language.ENGLISH, false)
  },
  {
    filename: 'catCPassWelsh',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatCPass, Language.WELSH, false)
  },
  {
    filename: 'catCFailEnglish',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationCatCFail, Language.ENGLISH, false)
  },
  {
    filename: 'catCFailWelsh',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationCatCFail, Language.WELSH, false)
  },
  //ADI2
  {
    filename: 'adi2PassEnglish',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatADI2Pass, Language.ENGLISH, false)
  },
  {
    filename: 'adi2PassWelsh',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatADI2Pass, Language.WELSH, false)
  },
  {
    filename: 'adi2FailEnglish',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationCatADI2Fail, Language.ENGLISH, false)
  },
  {
    filename: 'adi2FailWelsh',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationCatADI2Fail, Language.WELSH, false)
  },
  //CPC
  {
    filename: 'cpcPassEnglish',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatCPCPass, Language.ENGLISH, false)
  },
  {
    filename: 'cpcPassWelsh',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatCPCPass, Language.WELSH, false)
  },
  {
    filename: 'cpcFailEnglish',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationCatCPCFail, Language.ENGLISH, false)
  },
  {
    filename: 'cpcFailWelsh',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationCatCPCFail, Language.WELSH, false)
  },
  //Home
  {
    filename: 'homePassEnglish',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatHomePass, Language.ENGLISH, false)
  },
  {
    filename: 'homePassWelsh',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatHomePass, Language.WELSH, false)
  },
  {
    filename: 'homeFailEnglish',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationCatHomeFail, Language.ENGLISH, false)
  },
  {
    filename: 'homeFailWelsh',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationCatHomeFail, Language.WELSH, false)
  },
  //AM1
  {
    filename: 'am1PassEnglish',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatAM1Pass, Language.ENGLISH, false)
  },
  {
    filename: 'am1PassWelsh',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatAM1Pass, Language.WELSH, false)
  },
  {
    filename: 'am1FailEnglish',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationCatAM1Fail, Language.ENGLISH, false)
  },
  {
    filename: 'am1FailWelsh',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationCatAM1Fail, Language.WELSH, false)
  },
  //AM2
  {
    filename: 'am2PassEnglish',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatAM2Pass, Language.ENGLISH, false)
  },
  {
    filename: 'am2PassWelsh',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatAM2Pass, Language.WELSH, false)
  },
  {
    filename: 'am2FailEnglish',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationCatAM2Fail, Language.ENGLISH, false)
  },
  {
    filename: 'am2FailWelsh',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationCatAM2Fail, Language.WELSH, false)
  },
  //ADI3
  {
    filename: 'adi3PassEnglish',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatADI3Pass, Language.ENGLISH, false)
  },
  {
    filename: 'adi3PassWelsh',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatADI3Pass, Language.WELSH, false)
  },
  {
    filename: 'adi3FailEnglish',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationCatADI3Fail, Language.ENGLISH, false)
  },
  {
    filename: 'adi3FailWelsh',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationCatADI3Fail, Language.WELSH, false)
  },
  //SC
  {
    filename: 'scPassEnglish',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatSCPass, Language.ENGLISH, false)
  },
  {
    filename: 'scPassWelsh',
    markdown: getRenderedText(TestOutcome.PASS, personlisationCatSCPass, Language.WELSH, false)
  },
  //padi
  {
    filename: 'padi',
    markdown: getRenderedText(TestOutcome.FAIL, personlisationPADI, Language.ENGLISH, true)
  },
);


templates.forEach((template: any) => {
    generatePdf(template.filename, template.markdown)
  }
)


/**
 * Take filenames, and the markdown generated by the renderText function and generate a pdf for evaluation
 * @param filename
 * @param template
 */
function generatePdf(filename: string, template: string | undefined) {
  const md = markdownIt();
  const htmlContent = md.render(template as string);
  const outputFilePath = `integration/output/${filename}.pdf`;
  pdf.create(htmlContent).toFile(outputFilePath, (err: any, res: any) => {
    if (err) return console.log(err);
    console.log(res);
  });
}
