/* eslint-disable max-len */

import {Correspondence} from '../../domain/template-id.model';
import * as Handlebars from 'handlebars';

/**
 * Handlebars helper to correctly display the URL depending on if it's an E-mail or Letter
 */
Handlebars.registerHelper('displayUrlAdditionalInfo', function (communicationMethod: string, urlDescriptor: string, url: string) {
  if (communicationMethod === Correspondence.EMAIL) {
    return `[${urlDescriptor}](${url}).`;
  } else return `${urlDescriptor}: ${url}`;
});

export const vocationalIfYouWantToDriveTemplate4 = `
# If you want to drive as the main part of your job

You must have the full Driver CPC qualification if you want to drive an HGV, bus or coach as the main part of your job. 

You must pass the Driver CPC parts 3a and 3b tests, if you have not already done so.

^{{displayUrlAdditionalInfo communicationMethod "Find out about the Driver CPC part 3a test" "https://www.gov.uk/become-lorry-bus-driver/driver-cpc-part-3a-off-road-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-4-test&utm_content=pass"}} and {{displayUrlAdditionalInfo communicationMethod "Driver CPC part 3b test" "https://www.gov.uk/become-lorry-bus-driver/driver-cpc-part-3b-on-road-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-4-test&utm_content=pass"}} 

If you have already passed the part 3 tests, your Driver CPC card will now be sent to the address on your driving licence.

^{{displayUrlAdditionalInfo communicationMethod "Find out about getting your Driver CPC card" "https://www.gov.uk/become-lorry-bus-driver/after-youve-qualified?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-4-test&utm_content=pass"}}

---

`;

export const vocationalIfYouWantToDriveWelshTemplate4 = `
# Os ydych chi eisiau gyrru fel prif ran eich swydd

Bydd angen y CPC Gyrwyr llawn arnoch os ydych yn gyrru lori HGV, bws neu goets fel prif ran eich swydd. 

Rhaid i chi basio'r prawf CPC Gyrrwr rhan 3a a 3b, os nad ydych wedi gwneud hynny eto

^{{displayUrlAdditionalInfo communicationMethod "Darganfod mwy am y Prawf Gyrwr CPC rhan 3a" "https://www.gov.uk/become-lorry-bus-driver/driver-cpc-part-3a-off-road-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-4-test&utm_content=pass"}} a ^{{displayUrlAdditionalInfo communicationMethod "Prawf Gyrwr CPC rhan 3b" "https://www.gov.uk/become-lorry-bus-driver/driver-cpc-part-3b-on-road-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-4-test&utm_content=pass"}} 

Os ydych eisoes wedi pasio prawf rhan 3, bydd eich cerdyn Gyrrwr CPC yn cael ei anfon i'r cyfeiriad ar eich trwydded yrru.

^{{displayUrlAdditionalInfo communicationMethod "Darganfod mwy am eich cerdyn Gyrrwr CPC" "https://www.gov.uk/become-lorry-bus-driver/after-youve-qualified?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-4-test&utm_content=pass"}}

---

`;

export const vocationalIfYouWantToDriveTemplate3b = `
# If you want to drive as the main part of your job

You must have the full Driver CPC qualification if you want to drive an HGV, bus or coach as the main part of your job. 

You must pass the Driver CPC part 4 (practical demonstration) test if you have not already done so.

^{{displayUrlAdditionalInfo communicationMethod "Find out about the Driver CPC part 4 test" "https://www.gov.uk/become-lorry-bus-driver/driver-cpc-part-4-practical-demonstration-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3b-test&utm_content=pass"}} 

If you have already passed the part 4 test, your Driver CPC card will now be sent to the address on your driving licence.

^{{displayUrlAdditionalInfo communicationMethod "Find out about getting your Driver CPC card" "https://www.gov.uk/become-lorry-bus-driver/after-youve-qualified?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3b-test&utm_content=pass"}}

---
 
`;

export const vocationalIfYouWantToDriveWelshTemplate3b = `
# Os ydych chi eisiau gyrru fel prif ran eich swydd

Bydd angen y cymhwyster CPC Gyrwyr llawn arnoch os ydych yn gyrru lori, bws neu goets fel prif ran eich swydd. 

Rhaid i chi basio'r prawf CPC Gyrrwr rhan 4 (arddangosiad ymarferol) os nad ydych wedi gwneud hynny eto.

^{{displayUrlAdditionalInfo communicationMethod "Darganfod mwy am y prawf Gyrrwr CPC rhan 4" "https://www.gov.uk/become-lorry-bus-driver/driver-cpc-part-4-practical-demonstration-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3b-test&utm_content=pass"}} 

Os ydych eisoes wedi pasio prawf rhan 4, bydd eich cerdyn Gyrrwr CPC yn cael ei anfon i'r cyfeiriad ar eich trwydded yrru.
 
^{{displayUrlAdditionalInfo communicationMethod "Darganfod mwy am eich cerdyn Gyrrwr CPC" "https://www.gov.uk/become-lorry-bus-driver/after-youve-qualified?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3b-test&utm_content=pass"}}

---

`;

export const importantInformationForHGVAndBusVocational4Template = `
# Important information for new HGV and bus drivers

You must do several things now you’ve passed your test. These include:

- making sure your vehicle follows all the rules
- keeping your details up to date with DVLA

^{{displayUrlAdditionalInfo communicationMethod "Find out more about the legal obligations of drivers and riders" "https://www.gov.uk/legal-obligations-drivers-riders"}}

## Prepare for working as a driver

If you’ve already passed your Driver CPC part 3 tests and if your job requires it, you will need to:

- apply for a digital tachograph card to store information about your daily work
- prepare to make international journeys

^{{displayUrlAdditionalInfo communicationMethod "Find out what to do now you’ve qualified" "https://www.gov.uk/become-lorry-bus-driver/after-youve-qualified?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-4-test&utm_content=pass"}}

## Staying qualified

If you’ve already passed the Driver CPC part 3 tests and if driving is the main part of your job, every 5 years you must:

- take 35 hours of Driver CPC training to keep driving professionally
- renew your HGV or bus driving licence

If you’re 65 or over, you must renew your HGV or bus driving licence every year.

^{{displayUrlAdditionalInfo communicationMethod "Find out about Driver CPC training for qualified drivers" "https://www.gov.uk/driver-cpc-training?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-4-test&utm_content=pass"}}

## Qualify to tow heavier trailers

There are limits on what size trailer you can tow with each category of vehicle.

If you want to tow a larger trailer, you might need to upgrade your licence.

^{{displayUrlAdditionalInfo communicationMethod "Find out how to upgrade your licence to tow heavier trailers" "https://www.gov.uk/become-lorry-bus-driver/qualify-heavier-trailers?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-4-test&utm_content=pass"}}

{{#if showLGVText}}

## Qualify to transport dangerous goods

If you want to transport dangerous goods in an HGV, you need to train and pass exams.

^Find out how to become a dangerous goods driver at https://www.gov.uk/become-dangerous-goods-driver.

## If you want to transport animals

You must get an ‘animal transportation certificate of competence’ if you want to drive pigs, horses, cattle, goats, sheep or poultry for commercial reasons and on journeys of 40.4 miles and over.

^{{displayUrlAdditionalInfo communicationMethod "Find out how to get the certificate to transport animals" "https://www.gov.uk/become-lorry-bus-driver/transport-animals"}}
{{/if}}
---

`;

export const importantInformationForHGVAndBusVocational4WelshTemplate = `
# Gwybodaeth bwysig ar gyfer gyrrwyr newydd HGV a fysiau

Mae rhaid i chi wneud sawl peth nawr eich bod wedi pasio'ch prawf. Mae'r eitemau hyn yn cynnwys:

- sicrhau bod eich cerbyd yn dilyn yr holl reolau
- diweddaru eich manylion gyda DVLA

^{{displayUrlAdditionalInfo communicationMethod "Darganfod mwy am rwymedigaethau cyfreithiol gyrwyr a teithwyr" "https://www.gov.uk/legal-obligations-drivers-riders?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-4-test&utm_content=pass"}}

## Paratoi ar gyfer gweithio fel gyrrwr

Os ydych eisoes wedi pasio eich prawf Gyrrwr CPC rhan 3 ac os yw eich swydd yn gofyn am hynny, bydd angen i chi:

- gwnewch gais am gerdyn tacograff digidol i storio gwybodaeth am eich gwaith bob dydd
- paratoi i wneud teithiau rhyngwladol

^{{displayUrlAdditionalInfo communicationMethod "Darganfod beth i'w wneud nawr eich bod wedi cymhwyso" "https://www.gov.uk/become-lorry-bus-driver/after-youve-qualified?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-4-test&utm_content=pass"}}

## Aros yn gymwys

Os ydych chi eisoes wedi pasio prawf Gyrrwr CPC rhan 4 ac os mai gyrru yw prif ran eich swydd, bydd rhaid wneud y canlynol pob 5 mlynedd:

- cymryd 35 awr o hyfforddiant Gyrrwr CPC i barhau i yrru'n broffesiynol
- adnewyddu eich trwydded yrru HGV neu fws

Os yr ydych yn 65 oed neu dros, bydd rhaid adnewyddu eich trwydded yrru HGV neu fws pob blwyddyn.

^{{displayUrlAdditionalInfo communicationMethod "Dysgwch am hyfforddiant CPC Gyrwyr ar gyfer gyrwyr cymwys" "https://www.gov.uk/driver-cpc-training?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-4-test&utm_content=pass"}}

## Cymwys i dynnu trelars trwm

Mae cyfyngiadau ar faint ôl-gerbyd y gallwch ei dynnu gyda phob categori o gerbyd.

Os ydych chi eisiau tynnu trelar mwy, efallai y bydd angen i chi uwchraddio'ch trwydded.

^{{displayUrlAdditionalInfo communicationMethod "Darganfod sut i uwchraddio'ch trwydded i dynnu ôl-gerbydau trymach" "https://www.gov.uk/become-lorry-bus-driver/qualify-heavier-trailers?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-4-test&utm_content=pass"}}

{{#if showLGVText}}
## Cymwys i gludo nwyddau peryglus

Os ydych chi eisiau cludo nwyddau peryglus mewn HGV, mae angen i chi hyfforddi a phasio arholiadau.

^{{displayUrlAdditionalInfo communicationMethod "Dysgwch sut i ddod yn yrrwr nwyddau peryglus yn" "https://www.gov.uk/become-dangerous-goods-driver"}}

## Os ydych chi eisiau cludo anifeiliaid

Rhaid i chi gael ‘tystysgrif cymhwysedd cludo anifeiliaid’ os ydych am yrru moch, ceffylau, gwartheg, geifr, defaid neu ddofednod am resymau masnachol ac ar deithiau 40.4 milltir a throsodd.

^{{displayUrlAdditionalInfo communicationMethod "Darganfod sut i cael y tystysgrif i cludo anifeiliaid" "https://www.gov.uk/become-lorry-bus-driver/transport-animals"}}
{{/if}}
---

`;

export const importantInformationForHGVAndBusVocational3bTemplate = `
# Important information for new HGV and bus drivers

You must do several things now you’ve passed your test. These include:

- making sure your vehicle follows all the rules
- keeping your details up to date with DVLA

^{{displayUrlAdditionalInfo communicationMethod "Find out more about the legal obligations of drivers and riders" "https://www.gov.uk/legal-obligations-drivers-riders?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3b-test&utm_content=pass"}}

## Prepare for working as a driver

If you’ve already passed your Driver CPC part 4 test and if your job requires it, you will need to:

- apply for a digital tachograph card to store information about your daily work
- prepare to make international journeys

^{{displayUrlAdditionalInfo communicationMethod "Find out what to do now you’ve qualified" "https://www.gov.uk/become-lorry-bus-driver/after-youve-qualified?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3b-test&utm_content=pass"}}

## Staying qualified

If you’ve already passed the Driver CPC part 3 tests and if driving is the main part of your job, every 5 years you must:

- take 35 hours of Driver CPC training to keep driving professionally
- renew your HGV or bus driving licence

If you’re 65 or over, you must renew your HGV or bus driving licence every year.

^{{displayUrlAdditionalInfo communicationMethod "Find out about Driver CPC training for qualified drivers" "https://www.gov.uk/driver-cpc-training?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3b-test&utm_content=pass"}}

## Qualify to tow heavier trailers

There are limits on what size trailer you can tow with each category of vehicle.

If you want to tow a larger trailer, you might need to upgrade your licence.

^{{displayUrlAdditionalInfo communicationMethod "Find out how to upgrade your licence to tow heavier trailers" "https://www.gov.uk/become-lorry-bus-driver/qualify-heavier-trailers?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3b-test&utm_content=pass"}}

{{#if showLGVText}}

## Qualify to transport dangerous goods

If you want to transport dangerous goods in an HGV, you need to train and pass exams.

^Find out how to become a dangerous goods driver at https://www.gov.uk/become-dangerous-goods-driver.

## If you want to transport animals

You must get an ‘animal transportation certificate of competence’ if you want to drive pigs, horses, cattle, goats, sheep or poultry for commercial reasons and on journeys of 40.4 miles and over.

^Find out how to get the certificate to transport animals at https://www.gov.uk/become-lorry-bus-driver/transport-animals.

{{/if}}
---
`;

export const importantInformationForHGVAndBusVocational3bWelshTemplate = `
# Gwybodaeth bwysig ar gyfer gyrrwyr newydd HGV a fysiau

Mae rhaid i chi wneud sawl peth nawr eich bod wedi pasio'ch prawf. Mae'r eitemau hyn yn cynnwys:

- sicrhau bod eich cerbyd yn dilyn yr holl reolau
- diweddaru eich manylion gyda DVLA

^{{displayUrlAdditionalInfo communicationMethod "Darganfod mwy am rwymedigaethau cyfreithiol gyrwyr a teithwyr" "https://www.gov.uk/legal-obligations-drivers-riders?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3b-test&utm_content=pass"}}

## Paratoi ar gyfer gweithio fel gyrrwr

Os ydych eisoes wedi pasio eich prawf Gyrrwr CPC rhan 4 ac os yw eich swydd yn gofyn am hynny, bydd angen i chi:

- gwnewch gais am gerdyn tacograff digidol i storio gwybodaeth am eich gwaith bob dydd
- paratoi i wneud teithiau rhyngwladol

^{{displayUrlAdditionalInfo communicationMethod "Darganfod beth i'w wneud nawr eich bod wedi cymhwyso" "https://www.gov.uk/become-lorry-bus-driver/after-youve-qualified?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3b-test&utm_content=pass"}}

## Aros yn gymwys

Os ydych chi eisoes wedi pasio prawf Gyrrwr CPC rhan 4 ac os mai gyrru yw prif ran eich swydd, bydd rhaid wneud y canlynol pob 5 mlynedd:

- cymryd 35 awr o hyfforddiant Gyrrwr CPC i barhau i yrru'n broffesiynol
- adnewyddu eich trwydded yrru HGV neu fws

Os yr ydych yn 65 oed neu dros, bydd rhaid adnewyddu eich trwydded yrru HGV neu fws pob blwyddyn.

^{{displayUrlAdditionalInfo communicationMethod "Dysgwch am hyfforddiant CPC Gyrwyr ar gyfer gyrwyr cymwys" "https://www.gov.uk/driver-cpc-training?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3b-test&utm_content=pass"}}

## Cymwys i dynnu trelars trwm

Mae cyfyngiadau ar faint ôl-gerbyd y gallwch ei dynnu gyda phob categori o gerbyd.

Os ydych chi eisiau tynnu trelar mwy, efallai y bydd angen i chi uwchraddio'ch trwydded.

^{{displayUrlAdditionalInfo communicationMethod "Darganfod sut i uwchraddio'ch trwydded i dynnu ôl-gerbydau trymach" "https://www.gov.uk/become-lorry-bus-driver/qualify-heavier-trailers?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3b-test&utm_content=pass"}}

{{#if showLGVText}}
# Cymwys i gludo nwyddau peryglus

Os ydych chi eisiau cludo nwyddau peryglus mewn HGV, mae angen i chi hyfforddi a phasio arholiadau.

^Dysgwch sut i ddod yn yrrwr nwyddau peryglus yn https://www.gov.uk/become-dangerous-goods-driver.

# Os ydych chi eisiau cludo anifeiliaid

Rhaid i chi gael ‘tystysgrif cymhwysedd cludo anifeiliaid’ os ydych am yrru moch, ceffylau, gwartheg, geifr, defaid neu ddofednod am resymau masnachol ac ar deithiau 40.4 milltir a throsodd.

^Dysgwch sut i gael y dystysgrif i gludo anifeiliaid yn https://www.gov.uk/become-lorry-bus-driver/transport-animals.
{{/if}}
`;
