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
  personalisationCatADI2Pass2,
  personalisationCatADI3FailFirstOrSecond,
  personalisationCatADI3FailFirstOrSecond2,
  personalisationCatADI3FailThird,
  personalisationCatADI3FailThird2,
  personalisationCatADI3Pass,
  personalisationCatADIFail2,
  personalisationCatADIFail3,
  personalisationCatAMod1Fail,
  personalisationCatAMod1Fail2,
  personalisationCatAMod1Fail3,
  personalisationCatAMod1Pass,
  personalisationCatAMod1Pass2,
  personalisationCatAMod1Pass3,
  personalisationCatBFail,
  personalisationCatBFail2,
  personalisationCatBFail3,
  personalisationCatBPass,
  personalisationCatBPass2,
  personalisationCatMod2Fail,
  personalisationCatMod2Fail2,
  personalisationCatMod2Fail3,
  personalisationCatMod2Pass,
  personalisationCatMod2Pass2,
  personalisationCatSCFailFirstOrSecond,
  personalisationCatSCFailFirstOrSecond2,
  personalisationCatSCFailThird,
  personalisationCatSCFailThird2,
  personalisationCatSCPass,
  personalisationSpecialistVehicleFail, personalisationSpecialistVehicleFail2, personalisationSpecialistVehicleFail3,
  personalisationSpecialistVehiclePass, personalisationSpecialistVehiclePass2,
  personalisationVocational3aFail, personalisationVocational3aFail2,
  personalisationVocational3aPass,
  personalisationVocational3bFail, personalisationVocational3bFail2, personalisationVocational3bFail3,
  personalisationVocational3bPass, personalisationVocational3bPass2,
  personalisationVocational4Fail,
  personalisationVocational4Pass
} from "../../src/functions/sendCandidateResults/application/service/__mocks__/personalisation-details";

// Increase timeout to 120 seconds
const TIMEOUT = 120000;

const templates = [
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatADI2Fail, language: Language.ENGLISH, filename: 'adi2FailEnglish' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatADIFail2, language: Language.ENGLISH, filename: 'adi2Fail2English' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatADIFail3, language: Language.ENGLISH, filename: 'adi2Fail3English' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatADI2Fail, language: Language.WELSH, filename: 'adi2FailWelsh' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatADI2Pass, language: Language.ENGLISH, filename: 'adi2PassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatADI2Pass2, language: Language.ENGLISH, filename: 'adi2Pass2English' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatADI2Pass, language: Language.WELSH, filename: 'adi2PassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatADI3FailFirstOrSecond, language: Language.ENGLISH, filename: 'adi3FailEnglishFirstOrSecond' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatADI3FailFirstOrSecond2, language: Language.ENGLISH, filename: 'adi3FailEnglishFirstOrSecond2' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatADI3FailFirstOrSecond, language: Language.WELSH, filename: 'adi3FailWelshFirstOrSecond' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatADI3FailThird, language: Language.ENGLISH, filename: 'adi3FailEnglishThird' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatADI3FailThird2, language: Language.ENGLISH, filename: 'adi3FailEnglishThird2' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatADI3FailThird, language: Language.WELSH, filename: 'adi3FailWelshThird' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatADI3Pass, language: Language.ENGLISH, filename: 'adi3PassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatADI3Pass, language: Language.WELSH, filename: 'adi3PassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatSCFailFirstOrSecond, language: Language.ENGLISH, filename: 'scFailEnglishFirstOrSecond' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatSCFailFirstOrSecond2, language: Language.ENGLISH, filename: 'scFailEnglishFirstOrSecond2' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatSCFailFirstOrSecond, language: Language.WELSH, filename: 'scFailWelshFirstOrSecond' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatSCFailThird, language: Language.ENGLISH, filename: 'scFailEnglishThird' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatSCFailThird2, language: Language.ENGLISH, filename: 'scFailEnglishThird2' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatSCFailThird, language: Language.WELSH, filename: 'scFailWelshThird' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatSCPass, language: Language.ENGLISH, filename: 'scPassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatSCPass, language: Language.WELSH, filename: 'scPassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatBFail, language: Language.ENGLISH, filename: 'bFailEnglish' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatBFail2, language: Language.ENGLISH, filename: 'bFailEnglish2' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatBFail3, language: Language.ENGLISH, filename: 'bFailEnglish3' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatBFail, language: Language.WELSH, filename: 'bFailWelsh' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatBPass, language: Language.ENGLISH, filename: 'bPassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatBPass2, language: Language.ENGLISH, filename: 'bPassEnglish2' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatBPass, language: Language.WELSH, filename: 'bPassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatAMod1Fail, language: Language.ENGLISH, filename: 'AMod1FailEnglish' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatAMod1Fail2, language: Language.ENGLISH, filename: 'AMod1FailEnglish2' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatAMod1Fail3, language: Language.ENGLISH, filename: 'AMod1FailEnglish3' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatAMod1Fail, language: Language.WELSH, filename: 'AMod1FailWelsh' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatAMod1Pass, language: Language.ENGLISH, filename: 'AMod1PassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatAMod1Pass2, language: Language.ENGLISH, filename: 'AMod1PassEnglish2' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatAMod1Pass3, language: Language.ENGLISH, filename: 'AMod1PassEnglish3' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatAMod1Pass, language: Language.WELSH, filename: 'AMod1PassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatMod2Fail, language: Language.ENGLISH, filename: 'AMod2FailEnglish' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatMod2Fail2, language: Language.ENGLISH, filename: 'AMod2FailEnglish2' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatMod2Fail3, language: Language.ENGLISH, filename: 'AMod2FailEnglish3' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationCatMod2Fail, language: Language.WELSH, filename: 'AMod2FailWelsh' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatMod2Pass, language: Language.ENGLISH, filename: 'AMod2PassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatMod2Pass2, language: Language.ENGLISH, filename: 'AMod2PassEnglish2' },
  { outcome: TestOutcome.PASS, personalisation: personalisationCatMod2Pass, language: Language.WELSH, filename: 'AMod2PassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationSpecialistVehicleFail, language: Language.ENGLISH, filename: 'specialistVehicleFailEnglish' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationSpecialistVehicleFail2, language: Language.ENGLISH, filename: 'specialistVehicleFailEnglish2' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationSpecialistVehicleFail3, language: Language.ENGLISH, filename: 'specialistVehicleFailEnglish3' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationSpecialistVehicleFail, language: Language.WELSH, filename: 'specialistVehicleFailWelsh' },
  { outcome: TestOutcome.PASS, personalisation: personalisationSpecialistVehiclePass, language: Language.ENGLISH, filename: 'specialistVehiclePassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationSpecialistVehiclePass2, language: Language.ENGLISH, filename: 'specialistVehiclePassEnglish2' },
  { outcome: TestOutcome.PASS, personalisation: personalisationSpecialistVehiclePass, language: Language.WELSH, filename: 'specialistVehiclePassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationVocational3aFail, language: Language.ENGLISH, filename: 'vocational3aFailEnglish' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationVocational3aFail2, language: Language.ENGLISH, filename: 'vocational3aFailEnglish2' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationVocational3aFail, language: Language.WELSH, filename: 'vocational3aFailWelsh' },
  { outcome: TestOutcome.PASS, personalisation: personalisationVocational3aPass, language: Language.ENGLISH, filename: 'vocational3aPassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationVocational3aPass, language: Language.WELSH, filename: 'vocational3aPassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationVocational3bFail, language: Language.ENGLISH, filename: 'vocational3bFailEnglish' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationVocational3bFail2, language: Language.ENGLISH, filename: 'vocational3bFailEnglish2' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationVocational3bFail3, language: Language.ENGLISH, filename: 'vocational3bFailEnglish3' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationVocational3bFail, language: Language.WELSH, filename: 'vocational3bFailWelsh' },
  { outcome: TestOutcome.PASS, personalisation: personalisationVocational3bPass, language: Language.ENGLISH, filename: 'vocational3bPassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationVocational3bPass2, language: Language.ENGLISH, filename: 'vocational3bPassEnglish2' },
  { outcome: TestOutcome.PASS, personalisation: personalisationVocational3bPass, language: Language.WELSH, filename: 'vocational3bPassWelsh' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationVocational4Fail, language: Language.ENGLISH, filename: 'vocational4FailEnglish' },
  { outcome: TestOutcome.FAIL, personalisation: personalisationVocational4Fail, language: Language.WELSH, filename: 'vocational4FailWelsh' },
  { outcome: TestOutcome.PASS, personalisation: personalisationVocational4Pass, language: Language.ENGLISH, filename: 'vocational4PassEnglish' },
  { outcome: TestOutcome.PASS, personalisation: personalisationVocational4Pass, language: Language.WELSH, filename: 'vocational4PassWelsh' },
].map(({ outcome, personalisation, language, filename }) => ({
  outcome,
  filename,
  markdown: getRenderedText(outcome, personalisation, language),
  subject: getRenderedSubject(personalisation, language),
}));

function generatePdf(filename: string, template: string | undefined) {
  const md = markdownIt();
  if (!template) {
    console.log('fileName:', filename);
    return;
  }
  const htmlContent = md.render(template);
  const outputFilePath = `integration/output/${filename}.pdf`;
  const options = { timeout: TIMEOUT };

  pdf.create(htmlContent, options).toFile(outputFilePath, (err, res) => {
    if (err) return console.log(err);
    console.log(res);
  });
}

templates.forEach(({ filename, markdown }) => generatePdf(filename, markdown));