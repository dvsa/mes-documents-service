/* eslint-disable max-len */

import * as Handlebars from 'handlebars';
import {Correspondence} from '../../domain/template-id.model';

/**
 * Handlebars helper to correctly display the URL depending on if it's an E-mail or Letter
 */
Handlebars.registerHelper('displayUrlNextSteps', function (communicationMethod: string, urlDescriptor: string, url: string, caretFlag: boolean = true) {
  if (communicationMethod === Correspondence.EMAIL) {
    return `${caretFlag ? '^' : ''}[${urlDescriptor}](${url})`;
  } else return `${caretFlag ? '^' : ''}${urlDescriptor}: ${url}`;
});

export const nextStepsDrivingTemplate = `
# What to do next

{{#if showProvLicenceRetainedByDriver}}
You must send your driving test pass certificate and documents to DVLA within 2 years of passing your driving test or you’ll have to take it again.

^Find out how to apply at https://www.gov.uk/apply-for-your-full-driving-licence.
{{/if}}

{{#if showProvLicenceRetainedByDvsa}}
DVLA will send your full driving licence to you automatically. It will be sent to the address on your provisional licence.
{{/if}}

---
`;

export const nextStepsDrivingWelshTemplate = `
# Beth i wneud nesaf

{{#if showProvLicenceRetainedByDriver}}
Rhaid i chi anfon eich tystysgrif pasio prawf gyrru a dogfennau i DVLA o fewn 2 flynedd i basio eich prawf gyrru neu bydd yn rhaid i chi ei gymryd eto.
 
Darganfyddwch sut i wneud cais yn https://www.gov.uk/apply-for-your-full-driving-licence.
{{/if}}

{{#if showProvLicenceRetainedByDvsa}}
Bydd y DVLA yn anfon eich trwydded yrru lawn atoch yn awtomatig. Bydd yn cael ei anfon i'r cyfeiriad ar eich trwydded dros dro.
{{/if}}

---
`;

export const nextStepsFailBTemplate = `
# How to prepare for your next test

Visit the 'Ready to Pass?' website for advice and tips about:

- practising the 27 essential driving skills
- practising ways of managing your nerves
- taking mock driving tests with your instructor

{{displayUrlNextSteps communicationMethod "Visit the ‘Ready to Pass?’ website" "https://readytopass.campaign.gov.uk/?utm_source=dvsa&utm_medium=email&utm_campaign=car-driving-test&utm_content=unsuccessful"}}

---
`;

export const nextStepsFailBWelshTemplate = `
# Sut i paratoi ar gyfer eich prawf nesaf

Ewch i'r wefan 'Barod i'w Pasio?' am gyngor ac awgrymiadau am:

- ymarfer y 27 sgil gyrru hanfodol
- ymarfer ffyrdd o reoli eich nerfau
- cymryd profion gyrru ymarfer gyda'ch hyfforddwr

{{displayUrlNextSteps communicationMethod "Ewch i'r wefan 'Barod i'w Pasio?" "https://readytopass.campaign.gov.uk/?utm_source=dvsa&utm_medium=email&utm_campaign=car-driving-test&utm_content=unsuccessful"}}

---
`;

export const NextStepsPass3aTemplate = `
# What to do next

You now need to take and pass the on-road driving (part 3b) test. 

You need to pass the part 3b test within 6 months. If you do not, you’ll need to pass part 3a again.

You or your trainer need to book the test if it’s not already been booked. If you do it yourself, book at {{displayUrlNextSteps communicationMethod "www.gov.uk/book-driving-test" "https://www.gov.uk/book-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3a-test&utm_content=pass" false}}

{{displayUrlNextSteps communicationMethod "Find out how the part 3b test works" "https://www.gov.uk/become-lorry-bus-driver/driver-cpc-part-3b-on-road-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3a-test&utm_content=pass"}}

## What to take to the part 3b test

You must take these to your part 3b test:

- your UK driving licence
- your theory test pass certificate
- your part 3a pass certificate

The vehicle you take for your part 3b test must be in the same driving licence category as you used for this part 3a test. For example, if you passed the part 3a test in an articulated lorry (category CE), you must use an articulated lorry for the part 3b test.

Your test will be cancelled and you’ll lose your fee if you do not bring these.

## If you lose your part 3a certificate

You need to get a replacement certificate if you lose yours.

{{displayUrlNextSteps communicationMethod "Find out how to replace a lost certificate" "https://www.gov.uk/become-lorry-bus-driver/driver-cpc-part-3a-off-road-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3a-test&utm_content=pass"}}

`;

export const nextStepsPass3aWelshTemplate = `
# Beth i wneud nesaf

Mae rhaid nawr cymryd a phasio'r prawf gyrru ar y ffordd (rhan 3b). 

Bydd rhaid pasio'r prawf rhan 3b o fewn 6 mis. Os ydych yn aflwyddiannus, bydd rhaid pasio rhan 3a eto.

Mae angen i chi neu'ch hyfforddwr archebu'r prawf os nad yw eisoes wedi'i archebu. Os yr ydych yn trefnu eich hun, ewch i {{displayUrlNextSteps communicationMethod "www.gov.uk/book-driving-test" "https://www.gov.uk/book-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3a-test&utm_content=pass" false}}

{{displayUrlNextSteps communicationMethod "Darganfyddwch sut mae'r prawf rhan 3b yn gweithio" "https://www.gov.uk/become-lorry-bus-driver/driver-cpc-part-3b-on-road-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3a-test&utm_content=pass"}}

## Beth i'w gymryd i'r prawf rhan 3b

Mae rhaid cymryd y pethau canlynol i'r prawf rhan 3b:

- eich trwydded yrru.
- eich tystysgrif pasio prawf theori
- eich tystysgrif pasio rhan 3a

Rhaid i'r cerbyd yr ydych yn ei gymryd ar gyfer eich prawf rhan 3b fod yn yr un categori trwydded yrru ag a ddefnyddiwyd gennych ar gyfer y prawf rhan 3a hwn. Er enghraifft, os gwnaethoch basio prawf rhan 3a mewn lori gymalog (categori CE), bydd rhaid i chi ddefnyddio lori gymalog ar gyfer y prawf rhan 3b.

Bydd eich prawf yn cael ei ganslo a byddwch yn colli eich taliad os na fyddwch yn dod â'r rhain.

## Os collwch eich tystysgrif rhan 3a

Mae angen i chi gael tystysgrif arall os byddwch yn colli'ch un chi.

{{displayUrlNextSteps communicationMethod "Darganfyddwch sut i ddisodli tystysgrif goll" "https://www.gov.uk/become-lorry-bus-driver/driver-cpc-part-3a-off-road-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3a-test&utm_content=pass"}}

`;

export const nextStepsADI2FailTemplate = `
# What to do next

Get a registered trainer to help you prepare for your next attempt at the ADI part 2 test if you have not done so already.

{{displayUrlNextSteps communicationMethod "Find driving instructor training courses" "https://www.gov.uk/find-driving-instructor-training?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=unsuccessful"}}

---
`;

export const nextStepsAdi2WelshFailTemplate = `
# Beth i wneud nesaf

Cael hyfforddwr cofrestredig i'ch helpu i baratoi ar gyfer eich ymgais nesaf ar y prawf ADI rhan 2 os nad ydych wedi gwneud hynny yn barod.

{{displayUrlNextSteps communicationMethod "Darganfod gyrsiau hyfforddi gyrru" "https://www.gov.uk/find-driving-instructor-training?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=unsuccessful"}}

---
`;

export const nextStepsAdi2PassTemplate = `
# What to do next

## 1. Get a registered trainer

Get a registered trainer to help you prepare for the ADI part 3 (instructional ability) test if you have not done so already.

{{displayUrlNextSteps communicationMethod "Find driving instructor training courses" "https://www.gov.uk/find-driving-instructor-training?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=pass"}}

## 2. Study the national standards

To help you prepare, you should study:

- the national standard for driver and rider training
- the national standard for driving cars and light vans
- the learning to drive a car or light van syllabus

These documents set out:

- the skills, knowledge and understanding you will need to pass the ADI part 3 test
- the skills, knowledge and understanding you will help your pupils to learn
- a way of teaching pupils the skills, knowledge and understanding 

{{displayUrlNextSteps communicationMethod "Find out more about the national standards and syllabus" "https://www.gov.uk/government/collections/national-driving-and-riding-standards?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=pass"}}

## 3. Get practice teaching

You have the option to apply for a 6 month trainee licence to get experience teaching pupils.

You must have had at least 40 hours of training from a qualified ADI in providing driving instruction (at least 10 of which were done in a car) to apply.

{{displayUrlNextSteps communicationMethod "Find out more about getting a trainee driving instructor licence" "https://www.gov.uk/trainee-driving-instructor-licence-the-rules?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=pass"}}

## 4. Book your ADI part 3 test

When you and your trainer agree you're ready, book your ADI part 3 test.

You must book the ADI part 3 test within 2 years of the date you passed the ADI part 1 (theory) test. If you do not, you'll have to start the application process again.

{{displayUrlNextSteps communicationMethod "Book your ADI part 3 test" "https://www.gov.uk/book-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=pass"}}
`;

export const nextStepsAdi2WelshPassTemplate = `
# Beth i wneud nesaf

##1. Cael hyfforddwr cofrestredig

Cael hyfforddwr cofrestredig i'ch helpu i baratoi ar gyfer eich ymgais nesaf ar y prawf ADI rhan 3 os nad ydych wedi gwneud hynny yn barod.

{{displayUrlNextSteps communicationMethod "Darganfod gyrsiau hyfforddi gyrru" "https://www.gov.uk/find-driving-instructor-training?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=pass"}}

## 2. Adolygu y safonau cenedlaethol

Er mwyn eich helpu i baratoi, dylech astudio:

- y safon genedlaethol ar gyfer hyfforddi gyrwyr a teithwr
- y safon genedlaethol ar gyfer gyrru ceir a faniau ysgafn
- y faes llafur ar gyfer gyrru cair neu fan ysgfan.

Mae’r dogfennau hyn yn nodi:

- y sgiliau, gwybodaeth a dealltwriaeth a fydd angen i chi pasio rhan 3 y prawf ADI
- y sgiliau, gwybodaeth a dealltwriaeth a fyddech yn helpu eich disgyblion dysgu
- ffordd o addysgu disgyblion y sgiliau, gwybodaeth a dealltwriaeth 

{{displayUrlNextSteps communicationMethod "Dysgwch fwy am y safonau cenedlaethol a'r maes llafur" "https://www.gov.uk/government/collections/national-driving-and-riding-standards?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=pass"}} 

## 3. Cael addysgu ymarfer

Mae gennych yr opsiwn i wneud cais am drwydded hyfforddai 6 mis i gael profiad o addysgu disgyblion.

Mae'n rhaid eich bod wedi cael o leiaf 40 awr o hyfforddiant gan ADI cymwysedig mewn darparu cyfarwyddyd gyrru (y gwnaed o leiaf 10 ohonynt mewn car) i wneud cais.

{{displayUrlNextSteps communicationMethod "Dysgwch fwy am gael trwydded hyfforddwr gyrru dan hyfforddiant" "https://www.gov.uk/trainee-driving-instructor-licence-the-rules?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=pass"}}

## 4. Archebwch eich prawf ADI rhan 3

Pan fyddwch chi a'ch hyfforddwr yn cytuno eich bod yn barod, archebwch eich prawf ADI rhan 3.

Rhaid i chi archebu'r prawf ADI rhan 3 o fewn 2 flynedd i'r dyddiad y gwnaethoch basio'r prawf ADI rhan 1 (theori). Os na wnewch hynny, bydd yn rhaid i chi ddechrau'r broses ymgeisio eto.

{{displayUrlNextSteps communicationMethod "Archebwch eich prawf ADI rhan 3" "https://www.gov.uk/book-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=pass"}}
`;

export const nextStepsAdi3FirstOrSecondFailTemplate = `
# What to do next

## 1. Get a registered trainer

Get a registered trainer to help you prepare for your next attempt if you do not already have one.

{{displayUrlNextSteps communicationMethod "Find driving instructor training courses" "https://www.gov.uk/find-driving-instructor-training?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccesful-1st-2nd"}} 

## 2. Study the national standards

To help you prepare, you should study:

- the national standard for driver and rider training
- the national standard for driving cars and light vans
- the learning to drive a car or light van syllabus

These documents set out:

- the skills, knowledge and understanding you will need to pass the ADI part 3 test
- the skills, knowledge and understanding you will help your pupils to learn
- a way of teaching pupils the skills, knowledge and understanding 

{{displayUrlNextSteps communicationMethod "Find out more about the national standards and syllabus" "https://www.gov.uk/government/collections/national-driving-and-riding-standards?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccessful-1st-2nd"}}

## 3. If you have a trainee driving instructor licence

If you chose the ‘extra training’ option (option 2) when you applied for your trainee licence, you must do 5 hours of extra training before you take the test again.

{{displayUrlNextSteps communicationMethod "Find out more about what you need to do if you have a trainee driving instructor licence" "https://www.gov.uk/trainee-driving-instructor-licence-the-rules/options-when-you-apply-for-a-trainee-licence?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccessful-1st-2nd"}}

---
`;

export const nextStepsAdi3FirstOrSecondWelshFailTemplate = `
# Beth i wneud nesaf

## 1. Cael hyfforddwr cofrestredig

Cael hyfforddwr cofrestredig i'ch helpu i baratoi ar gyfer eich ymgais nesaf ar y prawf ADI rhan 2 os nad ydych wedi gwneud hynny yn barod.

{{displayUrlNextSteps communicationMethod "Darganfod gyrsiau hyfforddi gyrru" "https://www.gov.uk/find-driving-instructor-training?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccesful-1st-2nd"}}

## 2. Adolygu y safonau cenedlaethol

Er mwyn eich helpu i baratoi, dylech astudio:

- y safon genedlaethol ar gyfer hyfforddi gyrwyr a teithwr
- y safon genedlaethol ar gyfer gyrru ceir a faniau ysgafn
- y faes llafur ar gyfer gyrru cair neu fan ysgfan.

Mae’r dogfennau hyn yn nodi:

- y sgiliau, gwybodaeth a dealltwriaeth a fydd angen i chi pasio rhan 3 y prawf ADI
- y sgiliau, gwybodaeth a dealltwriaeth a fyddech yn helpu eich disgyblion dysgu
- ffordd o addysgu disgyblion y sgiliau, gwybodaeth a dealltwriaeth 

{{displayUrlNextSteps communicationMethod "Dysgwch fwy am y safonau cenedlaethol a'r maes llafur" "https://www.gov.uk/government/collections/national-driving-and-riding-standards?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccessful-1st-2nd"}}

## 3. Os oes gennych drwydded hyfforddwr gyrru o dan hyfforddiant

Os dewiswch yr opsiwn ‘hyfforddiant ychwanegol’ (opsiwn 2) pan wnaethoch gais am eich trwydded hyfforddai, rhaid i chi wneud 5 awr o hyfforddiant ychwanegol cyn sefyll y prawf eto.

{{displayUrlNextSteps communicationMethod "Dysgwch fwy am gael trwydded hyfforddwr gyrru dan hyfforddiant" "https://www.gov.uk/trainee-driving-instructor-licence-the-rules/options-when-you-apply-for-a-trainee-licence?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccessful-1st-2nd"}}

---
`;

export const nextStepsAdi3ThirdWelshFailTemplate = `
# Beth i wneud nesaf

Rydych bellach wedi bod yn aflwyddiannus wrth basio'r prawf ADI rhan 3 am y trydydd tro. 

Os oes gennych drwydded hyfforddwr gyrru dan hyfforddiant, mae rhaid stopio i'w defnyddio ar unwaith. Nid yw bellach yn ddilys.

Rhaid i chi nawr ailgychwyn y broses gymhwyso os ydych chi dal eisiau bod yn ADI. Siaradwch i'ch hyfforddwr am beth yw'r peth gorau i chi.

Bydd angen i chi ddilyn y camau hyn os ydych chi dal eisiau bod yn ADI.

1. Cael gwiriad Gwasanaeth Datgelu a Gwahardd (DBS) newydd.
2. Gwnewch gais i ddod yn hyfforddwr gyrru.
3. Cymerwch a phasiwch y prawf ADI rhan 1 (theori).
4. Cymerwch a phasiwch y prawf ADI rhan 2 (gallu gyrru).
5. Gwnewch gais am drwydded hyfforddwr gyrru dan hyfforddiant i gael mwy o ymarfer. 
6. Cymerwch a phasiwch y prawf ADI rhan 3 (gallu hyfforddi).

Rhaid i chi aros 2 flynedd o'r adeg y gwnaethoch basio'r prawf ADI rhan 1 yn wreiddiol cyn y gallwch ei gymryd eto.

{{displayUrlNextSteps communicationMethod "Darganfod sut i fod yn hyfforddwr gyrru" "https://www.gov.uk/become-car-driving-instructor?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccessful-3rd"}}

---
`;

export const nextStepsAdi3ThirdFailTemplate = `
# What to do next

You have now been unsuccessful in passing the ADI part 3 test for the third time. 

If you have a trainee driving instructor licence, you must stop using it immediately. It is no longer valid.

You must now restart the qualifying process if you still want to become an ADI. Talk to your trainer about what’s best for you.

You will need to follow these steps if you still want to become an ADI.

1. Get a new Disclosure and Barring Service (DBS) check.
2. Apply to become a driving instructor.
3. Take and pass the ADI part 1 (theory) test.
4. Take and pass the ADI part 2 (driving ability) test.
5. Apply for a trainee driving instructor licence to get more practice. 
6. Take and pass the ADI part 3 (instructional ability) test.

You must wait 2 years from when you originally passed the ADI part 1 test before you can take it again.

{{displayUrlNextSteps communicationMethod "Find out how to become a driving instructor" "https://www.gov.uk/become-car-driving-instructor?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccessful-3rd"}}

---
`;

export const nextStepsAdi3PassTemplate = `
# What to do next

You can now apply for your first ADI certificate (badge). 

You must have your ADI certificate before you start working as an ADI.

You must apply for your certificate within 12 months of passing the test, or you’ll have to pass all 3 qualifying tests again.

{{displayUrlNextSteps communicationMethod "Apply for your first ADI certificate" "https://www.gov.uk/apply-first-approved-driving-instructor-adi-badge?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=pass"}}

---
`;

export const nextStepsAdi3WelshPassTemplate = `
# Beth i wneud nesaf

Gallwch nawr wneud cais am eich tystysgrif ADI gyntaf (bathodyn). 

Rhaid i chi gael eich tystysgrif ADI cyn i chi ddechrau gweithio fel ADI.

Rhaid i chi wneud cais am eich tystysgrif o fewn 12 mis i basio’r prawf, neu bydd yn rhaid i chi basio pob un o’r 3 phrawf cymhwyso eto.

{{displayUrlNextSteps communicationMethod "Gwnewch gais am eich tystysgrif ADI gyntaf" "https://www.gov.uk/apply-first-approved-driving-instructor-adi-badge?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=pass"}}

---
`;

export const nextStepsScFirstOrSecondTemplate = `
# What to do next

## 1. Get a registered trainer

Get a registered trainer to help you prepare for your next attempt if you do not already have one.

{{displayUrlNextSteps communicationMethod "Find driving instructor training courses" "https://www.gov.uk/find-driving-instructor-training?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccesful-1st-2nd"}}

## 2. Study the national standards

To help you prepare, you should study:

- the national standard for driver and rider training
- the national standard for driving cars and light vans
- the learning to drive a car or light van syllabus

These documents set out:

- the skills, knowledge and understanding you will need to pass the ADI part 3 test
- the skills, knowledge and understanding you will help your pupils to learn
- a way of teaching pupils the skills, knowledge and understanding 

{{displayUrlNextSteps communicationMethod "Find out more about the national standards and syllabus" "https://www.gov.uk/government/collections/national-driving-and-riding-standards?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccessful-1st-2nd"}}

---
`;

export const nextStepsScFirstOrSecondWelshTemplate = `
# Beth i wneud nesaf
 
## 1. Cael hyfforddwr cofrestredig
 
Cael hyfforddwr cofrestredig i'ch helpu i baratoi ar gyfer eich ymgais nesaf ar y prawf ADI rhan 2 os nad ydych wedi gwneud hynny yn barod.
 
{{displayUrlNextSteps communicationMethod "Darganfod gyrsiau hyfforddi gyrru" "https://www.gov.uk/find-driving-instructor-training?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccesful-1st-2nd"}}
 
## 2. Adolygu y safonau cenedlaethol
 
Er mwyn eich helpu i baratoi, dylech astudio:
 
- y safon genedlaethol ar gyfer hyfforddi gyrwyr a teithwr
- y safon genedlaethol ar gyfer gyrru ceir a faniau ysgafn
- y faes llafur ar gyfer gyrru cair neu fan ysgfan.
 
Mae’r dogfennau hyn yn nodi:
 
- y sgiliau, gwybodaeth a dealltwriaeth a fydd angen i chi pasio rhan 3 y prawf ADI
- y sgiliau, gwybodaeth a dealltwriaeth a fyddech yn helpu eich disgyblion dysgu
- ffordd o addysgu disgyblion y sgiliau, gwybodaeth a dealltwriaeth 
 
{{displayUrlNextSteps communicationMethod "Dysgwch fwy am y safonau cenedlaethol a'r maes llafur" "https://www.gov.uk/government/collections/national-driving-and-riding-standards?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccessful-1st-2nd"}}
`;

export const nextStepsScThirdTemplate = `
# What happens next

The ADI Registrar will now consider whether or not to remove you from the ADI register. 

They will write to you in the coming weeks to ask you to send a statement of facts for them to consider before making their decision. This is known as ‘making representations’. 

{{displayUrlNextSteps communicationMethod "You can get help from an ADI association to make your representations" "https://www.gov.uk/government/publications/driving-instructor-associations-and-organisations/driving-instructor-associations-and-organisations?utm_source=dvsa&utm_medium=email&utm_campaign=adi-standards-check&utm_content=unsuccessful-3rd"}}

The ADI Registrar will then write to tell you their decision after you’ve made your representations. 

You will be able appeal to an independent tribunal if you disagree with their decision.

{{displayUrlNextSteps communicationMethod "Find out how ADI registration decision appeals work" "https://www.gov.uk/appeal-driving-instructor-registration-decision?utm_source=dvsa&utm_medium=email&utm_campaign=adi-standards-check&utm_content=unsuccessful-3rd"}}

## Providing driving lessons

You can continue working as an ADI until the ADI Registrar has made their decision. 

If you decide to appeal, you will be able to continue working as an ADI until the tribunal makes a decision.

## If you are removed from the ADI register

You will need to requalify as an ADI if you want to continue working as a driving instructor.

---
`;

export const nextStepsScThirdWelshTemplate = `
# Beth sy'n digwydd nesaf

Bydd y Cofrestrydd ADI nawr yn ystyried a ddylid eich tynnu oddi ar y gofrestr ADI ai peidio. 

Byddant yn ysgrifennu atoch yn ystod yr wythnosau nesaf i ofyn ichi anfon datganiad o ffeithiau atynt i'w hystyried cyn gwneud eu penderfyniad. Gelwir hyn yn 'sylwi'. 

{{displayUrlNextSteps communicationMethod "Gallwch gael help gan" "https://www.gov.uk/government/publications/driving-instructor-associations-and-organisations/driving-instructor-associations-and-organisations?utm_source=dvsa&utm_medium= email&utm_campaign=adi-standards-check&utm_content=aflwyddiannus-3ydd"}}

Yna bydd y Cofrestrydd ADI yn ysgrifennu atoch i roi gwybod i chi beth yw ei benderfyniad ar ôl i chi wneud eich sylwadau. 

Byddwch yn gallu apelio i dribiwnlys annibynnol os ydych yn anghytuno â'u penderfyniad.

{{displayUrlNextSteps communicationMethod "Darganfyddwch sut mae apeliadau penderfyniad cofrestru ADI yn gweithio" "https://www.gov.uk/appeal-driving-instructor-registration-decision?utm_source=dvsa&utm_medium=email&utm_campaign=adi-standards-check&utm_content=unsuccessful-3rd"}}

## Rhoi gwersi gyrru

Gallwch barhau i weithio fel ADI nes bod y Cofrestrydd ADI wedi gwneud ei benderfyniad. 

Os byddwch yn penderfynu apelio, byddwch yn gallu parhau i weithio fel ADI nes bydd y tribiwnlys yn gwneud penderfyniad.

## Os cewch eich tynnu oddi ar y gofrestr ADI

Bydd angen i chi ailgymhwyso fel ADI os ydych am barhau i weithio fel hyfforddwr gyrru.

---
`;

export const nextStepsMod1PassTemplate = `
# What to do next

You now need to pass your motorcycle module 2 (on-road) test.

"If you’re upgrading your licence through {{displayUrlNextSteps communicationMethod "progressive access" "https://www.gov.uk/ride-motorcycle-moped/bike-categories-ages-and-licence-requirements?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-1-test&utm_content=pass" false}}, you must pass module 2 within 6 months. You have to pass module 1 again if you do not.

You or your motorcycle instructor need to book your motorcycle module 2 test if it’s not already been booked. If you do it yourself, book at {{displayUrlNextSteps communicationMethod "www.gov.uk/book-driving-test" "https://www.gov.uk/book-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-1-test&utm_content=pass" false}}.

When you take the on-road test, you must use:

- the same subcategory as the licence you’re applying for
- a vehicle with the same type of transmission (manual, automatic or semi-automatic) that you used this time
 
{{displayUrlNextSteps communicationMethod "Find out more about the vehicles you can use for the tests" "https://www.gov.uk/motorcycle-test/motorcycles-mopeds-you-can-use?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-1-test&utm_content=pass"}}.

---
`;

export const nextStepsMod1PassWelshTemplate = `
# Beth i wneud nesaf

Nawr mae angen basio y prawf gyrru beic modur modiwl 2 (ar y ffordd).

Os ydych chi’n uwchraddio’ch trwydded trwy {{displayUrlNextSteps communicationMethod "mynediad cynyddol" "https://www.gov.uk/ride-motorcycle-moped/bike-categories-ages-and-licence-requirements?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-1-test&utm_content=pass" false}}, mae rhaid pasio modiwl 2 o fewn 6 mis. Bydd rhaid pasio modiwl 1 eto os ydych yn aflwyddiannus.

Mae angen i chi neu’ch hyfforddwr beic modur archebu prawf modiwl 2 eich beic modur os nad yw eisoes wedi’i archebu. Os ydych yn trefnu eich hun, ewch i {{displayUrlNextSteps communicationMethod "www.gov.uk/book-driving-test" "https://www.gov.uk/book-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-1-test&utm_content=pass" false}}.

Pan fyddwch chi'n sefyll y prawf oddi ar y ffordd, bydd rhaid i chi ddefnyddio:

- yr un is-gategori â’r drwydded yr ydych yn gwneud cais amdani
- cerbyd gyda'r un math o drawsyriant (â llaw, awtomatig neu led-awtomatig) a ddefnyddiwyd gennych y tro hwn
 
{{displayUrlNextSteps communicationMethod "Darganfod mwy am y mathau o gerbyd gallech defnyddio yn y profion" "https://www.gov.uk/motorcycle-test/motorcycles-mopeds-you-can-use?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-1-test&utm_content=pass"}}

---
`;
