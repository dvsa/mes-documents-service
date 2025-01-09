/* eslint-disable max-len */

import {Correspondence} from '../../domain/template-id.model';
import * as Handlebars from 'handlebars';

/**
 * Handlebars helper to correctly display the URL depending on if it's an E-mail or Letter
 */
Handlebars.registerHelper('displayUrlNewDriverInfo', function (communicationMethod: string, urlDescriptor: string, url: string) {
  if (communicationMethod === Correspondence.EMAIL) {
    return `^[${urlDescriptor}](${url}).`;
  } else return `^${urlDescriptor}: ${url}`;
});

export const importantInfoForNewDriversAdi3 = `
# Important information for new driving instructors

You’ll be responsible for your ADI registration, including renewing it and keeping your registration up to date.

You must:

- update your ADI registration within 7 days if your name or permanent home or business address change
- write to the ADI Registrar within 7 days if you get a caution or conviction

{{displayUrlNewDriverInfo communicationMethod "Find out about managing your ADI registration" "https://www.gov.uk/manage-approved-driving-instructor-registration?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=pass"}}

## Taking ADI standards checks

You must take and pass a ADI standards check when you’re asked to by DVSA.

The purpose of the check is to make sure you have kept up your standard of instruction.

The ADI Registrar will write to you to tell you when you have to take one.

{{displayUrlNewDriverInfo communicationMethod "Find out about the ADI standards check" "https://www.gov.uk/adi-standards-check?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=pass"}}
 
`;

export const importantInfoForNewDriversAdi3Welsh= `
# Gwybodaeth bwysig ar gyfer hyfforddwyr gyrru newydd

Byddwch chi'n gyfrifol am eich cofrestriad ADI, gan gynnwys ei adnewyddu a chadw'ch cofrestriad yn gyfredol.

Mae'n rhaid i chi wneud y canlynol:

- diweddaru'ch cofrestru ADI o fewn 7 diwrnod os bydd eich enw neu gyfeiriad cartref neu fusnes parhaol yn newid
- ysgrifennu at y Cofrestrydd o fewn 7 diwrnod os cewch rybudd neu gollfarn

{{displayUrlNewDriverInfo communicationMethod "Dysgwch am reoli eich cofrestriad ADI" "https://www.gov.uk/manage-approved-driving-instructor-registration?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=pass"}}

## Cymryd arolygiadau safonau ADI

Mae rhaid cymryd a pasio arolygiadau safonau ADI pan mae'r DVSA yn gofyn.

Pwrpas yr arolwg yw i sicrhau eich fod wedi cadw at eich safon cyfarwyddyd. 

Fydd y Cofrestrydd ADI yn ysgrifennu atoch i ddweud pan fydd rhaid wneud arolwg.

{{displayUrlNewDriverInfo communicationMethod "Darganfod mwy am yr arolygion safonol ADI" "https://www.gov.uk/adi-standards-check?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=pass"}}

`;

export const importantInfoForDriversB = `
# Important information for new drivers

You must do several things now you’ve passed your test. These include:

- making sure your vehicle follows all the rules
- keeping your details up to date with DVLA

{{displayUrlNewDriverInfo communicationMethod "Find out more about the legal obligations of drivers and riders" "https://www.gov.uk/legal-obligations-drivers-riders?utm_source=dvsa&utm_medium=email&utm_campaign=car-driving-test&utm_content=pass"}}

## Safety code for new drivers


1 in 5 new drivers have some kind of collision in their first year of driving. This is the time when you’re most vulnerable. 

The safety code for new drivers provides advice to help you get through the first 12 months as safely as possible.

{{displayUrlNewDriverInfo communicationMethod "Check the safety code for new drivers" "https://www.gov.uk/safety-code-new-drivers?utm_source=dvsa&utm_medium=email&utm_campaign=car-driving-test&utm_content=pass"}}

## Take extra training to make you safer

The Pass Plus training course will help you to improve your skills and drive more safely. 

It takes at least 6 hours and it may help you get a car insurance discount if you successfully complete the course. 

{{displayUrlNewDriverInfo communicationMethod "Find out more about Pass Plus" "https://www.gov.uk/pass-plus?utm_source=dvsa&utm_medium=email&utm_campaign=car-driving-test&utm_content=pass"}}

`;

export const importantInfoForDriversBWelsh = `
# Gwybodaeth bwysig ar gyfer gyrrwyr newydd

Mae rhaid i chi wneud sawl peth nawr eich bod wedi pasio'ch prawf. Mae hyn yn cynnwys:

- sicrhau bod eich cerbyd yn dilyn yr holl reolau
- diweddaru eich manylion gyda DVLA

{{displayUrlNewDriverInfo communicationMethod "Darganfod mwy am rwymedigaethau cyfreithiol gyrwyr a teithwyr" "https://www.gov.uk/legal-obligations-drivers-riders?utm_source=dvsa&utm_medium=email&utm_campaign=car-driving-test&utm_content=pass"}}

## Cod diogelwch ar gyfer gyrwyr newydd

Mae 1 o bob 5 gyrrwr newydd yn cael rhyw fath o wrthdrawiad yn eu blwyddyn gyntaf o yrru. Dyma’r amser pan fyddwch chi fwyaf agored i niwed. 

Mae’r cod diogelwch ar gyfer gyrwyr newydd yn rhoi cyngor i’ch helpu i gyrru mor ddiogel â phosibl yn ystod y 12 mis cyntaf.

{{displayUrlNewDriverInfo communicationMethod "Edrych ar y cod diogelwch ar gyfer gyrwyr newydd" "https://www.gov.uk/safety-code-new-drivers?utm_source=dvsa&utm_medium=email&utm_campaign=car-driving-test&utm_content=pass"}}

## Cymerwch hyfforddiant ychwanegol i'ch gwneud yn fwy diogel

Bydd y cwrs hyfforddi Pass Plus yn eich helpu i wella'ch sgiliau a gyrru'n fwy diogel. 

Mae'n cymryd o leiaf 6 awr a gallai eich helpu i gael gostyngiad yswiriant car os byddwch yn cwblhau'r cwrs yn llwyddiannus. 

{{displayUrlNewDriverInfo communicationMethod "Darganfod mwy am Pass Plus" "https://www.gov.uk/pass-plus?utm_source=dvsa&utm_medium=email&utm_campaign=car-driving-test&utm_content=pass"}}

`;

export const importantInfoForDriversSc = `
# Important information for driving instructors

Remember, you’re responsible for your ADI registration, including renewing it and keeping your registration up to date.

You must:

- update your ADI registration within 7 days if your name or permanent home or business address change
- write to the ADI Registrar within 7 days if you get a caution or conviction

{{displayUrlNewDriverInfo communicationMethod "Find out about managing your ADI registration" "https://www.gov.uk/manage-approved-driving-instructor-registration?utm_source=dvsa&utm_medium=email&utm_campaign=adi-standards-check&utm_content=pass"}}

`;

export const importantInfoForDriversScWelsh = `
# Gwybodaeth bwysig ar gyfer hyfforddwyr gyrru newydd

Byddwch chi'n gyfrifol am eich cofrestriad ADI, gan gynnwys ei adnewyddu a chadw'ch cofrestriad yn gyfredol.

Mae'n rhaid i chi wneud y canlynol:

- diweddaru'ch cofrestru ADI o fewn 7 diwrnod os bydd eich enw neu gyfeiriad cartref neu fusnes parhaol yn newid
- ysgrifennu at y Cofrestrydd o fewn 7 diwrnod os cewch rybudd neu gollfarn

{{displayUrlNewDriverInfo communicationMethod "Dysgwch am reoli eich cofrestriad ADI" "https://www.gov.uk/manage-approved-driving-instructor-registration?utm_source=dvsa&utm_medium=email&utm_campaign=adi-standards-check&utm_content=pass"}}

`;

export const importantInfoForDriversTractor = `
# Important information for new drivers 

Before you start driving, check the age limits for the different types of tractors and specialist vehicles you can drive. 

{{displayUrlNewDriverInfo communicationMethod "Check the rules about what you can drive" "https://www.gov.uk/learning-to-drive-a-tractor-or-specialist-vehicle/age-limits?utm_source=dvsa&utm_medium=email&utm_campaign=tractor-specialist-vehicle-test&utm_content=pass"}}

## Safety code for new drivers

Your first year of driving will be the time when you’re most vulnerable. 

The safety code for new drivers provides advice to help you get through the first 12 months as safely as possible.

{{displayUrlNewDriverInfo communicationMethod "Check the safety code for new drivers" "https://www.gov.uk/safety-code-new-drivers?utm_source=dvsa&utm_medium=email&utm_campaign=tractor-specialist-vehicle-test&utm_content=pass"}}

## Rules for using tractors

You can only use your category F driving licence for ‘agricultural purposes’. This includes:

- agriculture - growing and gathering in crops, and rearing livestock
- horticulture - cultivating or managing gardens, including growing flowers, fruits and vegetables, and managing trees, shrubs and woody plants in gardens
- aquatic farming - breeding fish and other aquatic animals, or growing aquatic plants, usually for food, in fish ponds, tanks or other artificial enclosures or environments
- forestry - cultivating forests and the management of growing timber

{{displayUrlNewDriverInfo communicationMethod "Check the rules that apply to the use of tractors in Great Britain" "https://www.gov.uk/government/publications/tractors-regulations-on-use/tractors-and-regulatory-requirements-a-brief-guide-september-2017?utm_source=dvsa&utm_medium=email&utm_campaign=tractor-specialist-vehicle-test&utm_content=pass"}}
 
`;

export const importantInfoForDriversTractorWelsh = `
# Gwybodaeth bwysig ar gyfer gyrrwyr newydd 

Cyn dechrau gyrru, gwiriwch y terfynau oedran ar gyfer y gwahanol fathau o dractorau a cherbydau arbenigol y gallwch eu gyrru. 

{{displayUrlNewDriverInfo communicationMethod "Gwiriwch y rheolau ynghylch yr hyn y gallwch ei yrru" "https://www.gov.uk/learning-to-drive-a-tractor-or-specialist-vehicle/age-limits?utm_source=dvsa&utm_medium=email&utm_campaign=tractor-specialist-vehicle-test&utm_content=pass"}}

## Cod diogelwch ar gyfer gyrwyr newydd

Eich blwyddyn gyntaf o yrru fydd yr adeg pan fyddwch fwyaf agored i niwed. 

Mae’r cod diogelwch ar gyfer gyrwyr newydd yn rhoi cyngor i’ch helpu i gyrru mor ddiogel â phosibl yn ystod y 12 mis cyntaf.

{{displayUrlNewDriverInfo communicationMethod "Edrych ar y cod diogelwch ar gyfer gyrwyr newydd" "https://www.gov.uk/safety-code-new-drivers?utm_source=dvsa&utm_medium=email&utm_campaign=tractor-specialist-vehicle-test&utm_content=pass"}}

## Rheolau ar gyfer defnyddio tractors

Dim ond am ‘ddibenion amaethyddol’ y gallwch ddefnyddio’ch trwydded yrru categori F. Mae hyn yn cynnwys:

- amaethyddiaeth - tyfu a chasglu cnydau, a magu anifeiliaid
- garddwriaeth - meithrin neu reoli gerddi, gan gynnwys tyfu blodau, ffrwythau a llysiau, a rheoli coed, llwyni a phlanhigion coediog mewn gerddi
- ffermio dyfrol - bridio pysgod ac anifeiliaid dyfrol eraill, neu dyfu planhigion dyfrol, fel arfer ar gyfer bwyd, mewn pyllau pysgod, tanciau neu gaeau neu amgylcheddau artiffisial eraill
- coedwigaeth - tyfu coedwigoedd a rheoli coed sy'n tyfu

{{displayUrlNewDriverInfo communicationMethod "Gwiriwch y rheolau perthnasol yw'r defnydd o dractorau ym Mhrydain" "https://www.gov.uk/government/publications/tractors-regulations-on-use/tractors-and-regulatory-requirements-a-brief-guide-september-2017?utm_source=dvsa&utm_medium=email&utm_campaign=tractor-specialist-vehicle-test&utm_content=pass"}}

`;

export const importantInfoForRiders = `
# Important information for new riders

You must do several things now you’ve passed your test. These include:

- making sure your vehicle follows all the rules
- keeping your details up to date with DVLA

{{displayUrlNewDriverInfo communicationMethod "Find out more about the legal obligations of drivers and riders" "https://www.gov.uk/legal-obligations-drivers-riders?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-2-test&utm_content=pass"}}

## Get more from your riding

Get more from your motorcycling and become a safer rider with help
from an expert trainer through the DVSA enhanced rider scheme.

If you successfully complete the scheme you’ll get a ‘DVSA certificate of competence’. You can use this to get discounts with most motorcycle insurers.

{{displayUrlNewDriverInfo communicationMethod "Find out how to take the DVSA enhanced rider scheme" "https://www.gov.uk/enhanced-rider-scheme?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-2-test&utm_content=pass"}}

## Choose the right motorcycle helmet 

Choosing the right motorcycle helmet could help save your life. SHARP ratings help you understand how much protection a helmet offers in a crash. 

{{displayUrlNewDriverInfo communicationMethod "Visit the SHARP website" "https://sharp.dft.gov.uk?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-2-test&utm_content=pass"}}

## Find further training

The Elite Rider Hub is designed to help you choose the most suitable post-test training. It gives an insight into training which will make you a safe, capable, and progressive rider.

{{displayUrlNewDriverInfo communicationMethod "Find out more about the Elite Rider Hub" "https://www.eliteriderhub.co.uk?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-2-test&utm_content=pass"}}

`;

export const importantInfoForRidersWelsh = `
# Gwybodaeth bwysig ar gyfer gyrrwyr newydd

Mae rhaid i chi wneud sawl peth nawr eich bod wedi pasio'ch prawf. Mae'r eitemau hyn yn cynnwys:

- sicrhau bod eich cerbyd yn dilyn yr holl reolau
- diweddaru eich manylion gyda DVLA

{{displayUrlNewDriverInfo communicationMethod "Darganfod mwy am rwymedigaethau cyfreithiol gyrwyr a teithwyr" "https://www.gov.uk/legal-obligations-drivers-riders?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-2-test&utm_content=pass"}}

## Manteisiwch fwy o'ch gyrru

Manteisiwch yn fwy ar eich beiciau modur a dewch yn feiciwr mwy diogel gyda chymorth
gan hyfforddwr arbenigol trwy gynllun beiciwr uwch y DVSA.

Os byddwch yn cwblhau’r cynllun yn llwyddiannus byddwch yn cael ‘tystysgrif cymhwysedd DVSA’. Gallech ddefnyddio hwn i gael gostyngiadau gyda'r rhan fwyaf o yswirwyr beiciau modur.

{{displayUrlNewDriverInfo communicationMethod "Darganfod sut i gymryd cynllun beiciwr uwch y DVSA" "https://www.gov.uk/enhanced-rider-scheme?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-2-test&utm_content=pass"}}

## Dewiswch yr helmed beic modur cywir 

Gall dewis y helmed beic modur helpu arbed eich bywyd. Mae graddfeydd SHARP yn eich helpu i ddeall faint o amddiffyniad y mae helmed yn ei gynnig mewn damwain. 

{{displayUrlNewDriverInfo communicationMethod "Ewch i wefan SHARP" "https://sharp.dft.gov.uk?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-2-test&utm_content=pass"}}

## Darganfod hyfforddiant bellach

Mae'r Hwb Elite Rider wedi'i greu i'ch helpu ddewis y hyfforddiant fwyaf addas ar ol wneud y prawf. Mae'n rhoi mewnwelediad i'r hyfforddiant a fydd yn eich gwneud yn feiciwr diogel, galluog a blaengar.

{{displayUrlNewDriverInfo communicationMethod "Ewch i'r Hwb Elite Rider" "https://www.eliteriderhub.co.uk?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-2-test&utm_content=pass"}}

`;
