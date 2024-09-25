import * as markdownIt from 'markdown-it';
import * as pdf from 'html-pdf';
import {
  getRenderedSubject,
  getRenderedText
} from "../../src/functions/sendCandidateResults/application/service/send-notification";
import {TestOutcome} from "../../src/functions/sendCandidateResults/domain/test-outcome";
import {Language} from "../../src/functions/sendCandidateResults/domain/conducted-language";
import {
  personalisationCatADI2Fail,
  personalisationCatADI2Pass,
  personalisationCatADI3FailFirstOrSecond,
  personalisationCatADI3FailThird,
  personalisationCatADI3Pass,
  personalisationCatBFail,
  personalisationCatBPass,
  personalisationCatMod1Fail,
  personalisationCatMod1Pass,
  personalisationCatMod2Fail,
  personalisationCatMod2Pass,
  personalisationCatSCFailFirstOrSecond,
  personalisationCatSCFailThird,
  personalisationCatSCPass,
  personalisationTractorFail,
  personalisationTractorPass,
  personalisationVocational3aFail,
  personalisationVocational3aPass,
  personalisationVocational3bFail,
  personalisationVocational3bPass,
  personalisationVocational4Fail,
  personalisationVocational4Pass,
} from "../../src/functions/sendCandidateResults/application/service/__mocks__/personalisation-details";

const templates = [
  { outcome: TestOutcome.PASS, personalisation: personalisationCatADI2Pass, language: Language.ENGLISH, category: 'adi2PassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatADI2Pass, language: Language.WELSH, category: 'adi2PassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatADI2Fail, language: Language.ENGLISH, category: 'adi2FailEnglish' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatADI2Fail, language: Language.WELSH, category: 'adi2FailWelsh' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatADI3Pass, language: Language.ENGLISH, category: 'adi3PassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatADI3Pass, language: Language.WELSH, category: 'adi3PassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatADI3FailFirstOrSecond, language: Language.ENGLISH, category: 'adi3FailEnglishFirstOrSecond' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatADI3FailFirstOrSecond, language: Language.WELSH, category: 'adi3FailWelshFirstOrSecond' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatADI3FailThird, language: Language.ENGLISH, category: 'adi3FailEnglishThird' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatADI3FailThird, language: Language.WELSH, category: 'adi3FailWelshThird' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatSCPass, language: Language.ENGLISH, category: 'scPassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatSCPass, language: Language.WELSH, category: 'scPassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatSCFailFirstOrSecond, language: Language.ENGLISH, category: 'scFailEnglishFirstOrSecond' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatSCFailFirstOrSecond, language: Language.WELSH, category: 'scFailWelshFirstOrSecond' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatSCFailThird, language: Language.ENGLISH, category: 'scFailEnglishThird' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatSCFailThird, language: Language.WELSH, category: 'scFailWelshThird' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatBPass, language: Language.ENGLISH, category: 'bPassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatBPass, language: Language.WELSH, category: 'bPassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatBFail, language: Language.ENGLISH, category: 'bFailEnglish' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatBFail, language: Language.WELSH, category: 'bFailWelsh' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatMod1Pass, language: Language.ENGLISH, category: 'AMod1PassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatMod1Pass, language: Language.WELSH, category: 'AMod1PassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatMod1Fail, language: Language.ENGLISH, category: 'AMod1FailEnglish' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatMod1Fail, language: Language.WELSH, category: 'AMod1FailWelsh' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatMod2Pass, language: Language.ENGLISH, category: 'AMod2PassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatMod2Pass, language: Language.WELSH, category: 'AMod2PassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatMod2Fail, language: Language.ENGLISH, category: 'AMod2FailEnglish' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatMod2Fail, language: Language.WELSH, category: 'AMod2FailWelsh' },
  { outcome: TestOutcome.PASS, personalisation: personalisationTractorPass, language: Language.ENGLISH, category: 'tractorPassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationTractorPass, language: Language.WELSH, category: 'tractorPassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationTractorFail, language: Language.ENGLISH, category: 'tractorFailEnglish' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationTractorFail, language: Language.WELSH, category: 'tractorFailWelsh' },
  { outcome: TestOutcome.PASS, personalisation: personalisationVocational3aPass, language: Language.ENGLISH, category: 'vocational3aPassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationVocational3aPass, language: Language.WELSH, category: 'vocational3aPassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationVocational3aFail, language: Language.ENGLISH, category: 'vocational3aFailEnglish' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationVocational3aFail, language: Language.WELSH, category: 'vocational3aFailWelsh' },
  { outcome: TestOutcome.PASS, personalisation: personalisationVocational3bPass, language: Language.ENGLISH, category: 'vocational3bPassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationVocational3bPass, language: Language.WELSH, category: 'vocational3bPassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationVocational3bFail, language: Language.ENGLISH, category: 'vocational3bFailEnglish' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationVocational3bFail, language: Language.WELSH, category: 'vocational3bFailWelsh' },
  { outcome: TestOutcome.PASS, personalisation: personalisationVocational4Pass, language: Language.ENGLISH, category: 'vocational4PassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationVocational4Pass, language: Language.WELSH, category: 'vocational4PassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationVocational4Fail, language: Language.ENGLISH, category: 'vocational4FailEnglish' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationVocational4Fail, language: Language.WELSH, category: 'vocational4FailWelsh' },
].map(({ outcome, personalisation, language, category }) => ({
  filename: category,
  markdown: getRenderedText(outcome, personalisation, language),
  subject: getRenderedSubject(personalisation, language),
}));

templates.forEach(({ filename, markdown }) => generatePdf(filename, markdown));

function generatePdf(filename: string, template: string | undefined) {
  const md = markdownIt();
  if (!template) {
    console.log('fileName:', filename);
    return;
  }
  const htmlContent = md.render(template);
  const outputFilePath = `integration/output/${filename}.pdf`;
  pdf.create(htmlContent).toFile(outputFilePath, (err, res) => {
    if (err) return console.log(err);
    console.log(res);
  });
}
