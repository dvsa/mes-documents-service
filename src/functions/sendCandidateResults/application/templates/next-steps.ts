/* eslint-disable max-len */
export const NextStepsPassTemplate = `
# What to do next

{{#if showProvLicenceRetainedByDriver}}
Provisional Licence Retained by driver, full licence to be applied for within 2 years of test date
{{/if}}

{{#if showProvLicenceRetainedByDvsa}}
Provisional Licence Retained by DVSA, full licence will be automatically issued to the address on the provisional licence
{{/if}}

Before you start driving:
1. Check your vehicle is insured at https://ownvehicle.askmid.com 
2. Check your vehicle's MOT at https://www.gov.uk/check-mot-history
3. Subscribe to free MOT reminders at https://www.gov.uk/mot-reminder.
4. Check your vehicle is taxed at https://www.gov.uk/check-vehicle-tax
5. Follow the safety code for new drivers at https://www.gov.uk/safety-code-new-drivers
`;

export const nextStepsPassBTemplate = `
# What to do next

{{#if showProvLicenceRetainedByDriver}}
You must send your driving test pass certificate and documents to DVLA within 2 years of passing your driving test or you’ll have to take it again.

^ Find out how to apply at https://www.gov.uk/apply-for-your-full-driving-licence.
{{/if}}

{{#if showProvLicenceRetainedByDvsa}}
DVLA will send your full driving licence to you automatically. It will be sent to the address on your provisional licence.
{{/if}}

---
`;

export const nextStepsFailBTemplate = `
# How to prepare for your next test

Visit the 'Ready to Pass?' website for advice and tips about:

- practising the 27 essential driving skills
- practising ways of managing your nerves
- taking mock driving tests with your instructor

^ [Visit the ‘Ready to Pass?’ website]( https://readytopass.campaign.gov.uk/?utm_source=dvsa&utm_medium=email&utm_campaign=car-driving-test&utm_content=unsuccessful).  

---
`;

export const NextStepsPass3bTemplate = `
# What to do next

{{#if showProvLicenceRetainedByDriver}}
You must send your driving test pass certificate and documents to DVLA within 2 years of passing your driving test or you’ll have to take it again.
{{/if}}

{{#if showProvLicenceRetainedByDvsa}}
Find out how to apply at https://www.gov.uk/apply-for-your-full-driving-licence.
{{/if}}

{{#if showProvLicenceRetainedByDvsa}}
DVLA will send your full driving licence to you automatically. It will be sent to the address on your provisional licence.
{{/if}}
`;

export const NextStepsPass3aTemplate = `
# What to do next

You now need to take and pass the on-road driving (part 3b) test. 

You need to pass the part 3b test within 6 months. If you do not, you’ll need to pass part 3a again.

You or your trainer need to book the test if it’s not already been booked. If you do it yourself, book at [www.gov.uk/book-driving-test](https://www.gov.uk/book-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3a-test&utm_content=pass).

^ [Find out how the part 3b test works](https://www.gov.uk/become-lorry-bus-driver/driver-cpc-part-3b-on-road-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3a-test&utm_content=pass). 


## What to take to the part 3b test

You must take these to your part 3b test:

- your UK driving licence
- your theory test pass certificate
- your part 3a pass certificate

The vehicle you take for your part 3b test must be in the same driving licence category as you used for this part 3a test. For example, if you passed the part 3a test in an articulated lorry (category CE), you must use an articulated lorry for the part 3b test.

Your test will be cancelled and you’ll lose your fee if you do not bring these.

## If you lose your part 3a certificate

You need to get a replacement certificate if you lose yours. It costs £15.

^ [Find out how to replace a lost certificate](https://www.gov.uk/become-lorry-bus-driver/driver-cpc-part-3a-off-road-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3a-test&utm_content=pass). 

`;

export const NextStepsPassTractorTemplate = `
# What to do next

{{#if showProvLicenceRetainedByDriver}}
You must send your driving test pass certificate and documents to DVLA within 2 years of passing your driving test or you’ll have to take it again.))
 
^ Find out how to apply at https://www.gov.uk/apply-for-your-full-driving-licence. ))

DVLA will send your full driving licence to you automatically. It will be sent to the address on your provisional licence.
{{/if}}

`;

export const NextStepsPassWelshTemplate = `
# Beth i'w wneud nesaf

{{#if showProvLicenceRetainedByDriver}}
Trwydded Yrru Dros Dro Wedi'i Chadw gan y gyrrwr, dylid gwneud cais am drwydded lawn o fewn 2 flynedd o ddyddiad y prawf
{{/if}}

{{#if showProvLicenceRetainedByDvsa}}
Trwydded Yrru Dros Dro Wedi’i Chadw gan DVSA, bydd trwydded lawn yn cael ei ddosbarthu’n awtomatig i’r cyfeiriad sydd ar y drwydded dros dro
{{/if}}

Cyn i chi ddechrau gyrru:
1. Gwiriwch fod eich cerbyd wedi'i yswirio ar https://ownvehicle.askmid.com.
2. Gwiriwch MOT eich cerbyd ar https://www.gov.uk/check-mot-history.
3. Tanysgrifiwch i gael nodiadau atgoffa MOT am ddim ar https://www.gov.uk/mot-reminder.
4. Gwiriwch fod eich cerbyd wedi’i drethu ar https://www.gov.uk/check-vehicle-tax.
5. Dilynwch y cod diogelwch ar gyfer gyrwyr newydd ar https://www.gov.uk/safety-code-new-drivers.
`;

export const NextStepsVocationalPassTemplate = `
# What to do next

{{#if showProvLicenceRetainedByDriver}}
Provisional Licence Retained by driver, full licence to be applied for within 2 years of test date
{{/if}}

{{#if showProvLicenceRetainedByDvsa}}
Provisional Licence Retained by DVSA, full licence will be automatically issued to the address on the provisional licence
{{/if}}

Before you start driving:
1. You will need the full Driver CPC if you drive a lorry, bus or coach as the main part of your job. Find out how to become a fully qualified lorry or bus driver at https://www.gov.uk/become-lorry-bus-driver
2. If you need one as part of your job you can apply for a digital tachograph driver card at https://www.gov.uk/apply-for-a-digital-tachograph-driver-smart-card
`;

export const NextStepsVocationalPassWelshTemplate = `
# Beth i'w wneud nesaf

{{#if showProvLicenceRetainedByDriver}}
Trwydded Yrru Dros Dro Wedi'i Chadw gan y gyrrwr, dylid gwneud cais am drwydded lawn o fewn 2 flynedd o ddyddiad y prawf
{{/if}}

{{#if showProvLicenceRetainedByDvsa}}
Trwydded Yrru Dros Dro Wedi’i Chadw gan DVSA, bydd trwydded lawn yn cael ei ddosbarthu’n awtomatig i’r cyfeiriad sydd ar y drwydded dros dro
{{/if}}

Cyn i chi ddechrau gyrru:
1. Bydd angen y CPC gyrrwr llawn arnoch os ydych yn gyrru lori, bws neu goets fel prif ran eich swydd. Canfyddwch sut i ddod yn yrrwr lori neu fws cwbl gymwysedig ynhttps://www.gov.uk/become-lorry-bus-driver
2. Os oes angen un arnoch fel rhan o’ch swydd gallwch wneud cais am gerdyn gyrrwr tacograff digidol ynhttps://www.gov.uk/apply-for-a-digital-tachograph-driver-smart-card
`;

export const NextStepsManPassTemplate = `
# What to do next

1. You will need to take and pass a module 3b test, in the same category, before you are eligible to drive on the roads.
2. You will need to keep your module 3a pass certificate, this must be presented when attending your module 3b test. If you do not present your module 3a certificate at the time of your 3b test, the test could be terminated, and you will lose your test fee.
3. The module 3a certificate is valid for 6 months from the date you passed your 3a test.
4. If you lose your 3a certificate you can apply for a duplicate at Driver CPC part 3a test: off-road exercises
`;

export const NextStepsManPassWelshTemplate = `
# Beth i'w wneud nesaf

1. Bydd angen i chi sefyll a phasio prawf modiwl 3b, yn yr un categori, cyn eich bod yn gymwys i yrru ar y ffyrdd.
2. Bydd angen i chi gadw eich tystysgrif i ddangos eich bod wedi pasio modiwl 3a, a rhaid cyflwyno hyn wrth fynychu prawf modiwl 3b. Os na fyddwch yn cyflwyno eich tystysgrif modiwl 3a ar adeg eich prawf 3b, efallai y bydd y prawf yn cael ei derfynu, a byddwch yn colli eich ffi a dalwyd am y prawf.
3. Mae tystysgrif modiwl 3a yn ddilys am 6 mis o’r dyddiad y gwnaethoch basio eich prawf 3a.
4. Os collwch eich tystysgrif 3a gallwch wneud cais am gopi arall yn rhan prawf 3a CPC Gyrwyr: ymarferion oddi ar y ffordd
`;

export const NextStepsCpcPassTemplate = `
# What to do next

1. Your driver qualification card (DQC) will be despatched automatically once you have completed the 4 CPC modules.
2. If you need a digital tachograph driver card as part of your job you can apply for one at https://www.gov.uk/apply-for-a-digital-tachograph-driver-smart-card
`;

export const NextStepsCpcPassWelshTemplate = `
# Beth i'w wneud nesaf

1. Bydd eich cerdyn cymhwyster gyrrwr (DQC) yn cael ei anfon yn awtomatig ar ôl i chi gwblhau’r 4 modiwl CPC.
2. Os oes angen cerdyn gyrrwr tacograff digidol arnoch fel rhan o’ch swydd, gallwch wneud cais am un ar https://www.gov.uk/apply-for-a-digital-tachograph-driver-smart-card
`;


export const NextStepsRidingMod1PassTemplate = `
# What to do next

Before you start riding:

1. You will need to pass your Motorcycle Module 2: on-road test (Mod 2) before you can ride. You can book your Mod 2 test at https://www.gov.uk/book-driving-test
`;

export const NextStepsRidingMod1PassWelshTemplate = `
# Beth i'w wneud nesaf

Cyn i chi ddechrau reidio:

1. Bydd angen i chi basio eich Modiwl Beic Modur 2: prawf ar y ffordd (Mod 2) cyn i chi allu reidio. Gallwch archebu prawf Mod 2 yn https://www.gov.uk/book-driving-test
`;

export const NextStepsRidingMod2PassTemplate = `
# What to do next

Before you start riding:

1. Check your vehicle is insured at https://ownvehicle.askmid.com
2. Check your vehicle’s MOT at https://www.gov.uk/check-mot-history
3. Subscribe to free MOT reminders at https://www.gov.uk/mot-reminder.
4. Check your vehicle is taxed at https://www.gov.uk/check-vehicle-tax
5. Follow the safety code for new riders at https://www.gov.uk/safety-code-new-drivers
`;

export const NextStepsRidingMod2PassWelshTemplate = `
# Beth i'w wneud nesaf

Cyn i chi ddechrau reidio

1. Gwiriwch fod eich cerbyd wedi’i yswirio ar https://ownvehicle.askmid.com.
2. Gwiriwch MOT eich cerbyd ar https://www.gov.uk/check-mot-history.
3. Tanysgrifiwch i gael nodiadau atgoffa MOT am ddim ar https://www.gov.uk/mot-reminder.
4. Gwiriwch fod eich cerbyd wedi’i drethu ar https://www.gov.uk/check-vehicle-tax.
5. Dilynwch y cod diogelwch ar gyfer gyrwyr newydd ar https://www.gov.uk/safety-code-new-drivers.
`;

export const NextStepsADI2PassTemplate = `
# What to do next

Before your ADI part 3 test:

1. DVSA strongly recommends that you seek development for the instructional ability test from an ORDIT (Official Register of Driving Instructor Trainers) registered trainer at https://www.gov.uk/find-driving-instructor-training
2. When you and your trainer believe you are ready, book your ADI Part 3 test at https://www.gov.uk/book-driving-test or by calling 0300 200 1122
3. Find out about the Part 3 test at https://www.gov.uk/adi-part-3-test
4. You can apply for a trainee licence at https://www.gov.uk/apply-for-a-trainee-driving-instructor-licence
`;

export const NextStepsADI2PassWelshTemplate = `
# Beth i'w wneud nesaf

Cyn eich prawf Rhan 3 ADI:

1. Mae DVSA yn argymell yn gryf eich bod yn gofyn am ddatblygiad ar gyfer y prawf gallu cyfarwyddiadol gan hyfforddwr cofrestredig ORDIT (Cofrestr Swyddogol Hyfforddwyr Hyfforddwyr Gyrru) yn https://www.gov.uk/find-driving-instructor-training
2. Pan fyddwch chi a’ch hyfforddwr yn credu eich bod chi’n barod, archebwch eich prawf ADI rhan 3 ar https://www.gov.uk/book-driving-test neu drwy ffonio 0300 200 1122
3. Gallwch ddysgu rhagor am y prawf Rhan 3 yn https://www.gov.uk/adi-part-3-test
4. Gallwch wneud cais am drwydded hyfforddai yn https://www.gov.uk/apply-for-a-trainee-driving-instructor-licence
`;

export const NextStepsHomePassTemplate = `
# What to do next

Before you start driving:
1. Check age limits and what you can drive https://www.gov.uk/learning-to-drive-a-tractor-or-specialist-vehicle/age-limits
2. Follow the safety code for new drivers at https://www.gov.uk/safety-code-new-drivers

#Rules for tractors
You can only use a category F entitlement for agricultural purposes. Find out more at https://www.gov.uk/government/publications/tractors-regulations-on-use/tractors-and-regulatory-requirements-a-brief-guide-september-2017
`;

export const NextStepsHomePassWelshTemplate = `
# Beth i'w wneud nesaf

Cyn i chi ddechrau gyrru:
1. Gwiriwch derfynau oedran a’r hyn y gallwch ei yrru https://www.gov.uk/learning-to-drive-a-tractor-or-specialist-vehicle/age-limits
2. Dilynwch y cod diogelwch ar gyfer gyrwyr newydd ar https://www.gov.uk/safety-code-new-drivers.

# Rheolau ar gyfer tractorau
Dim ond hawliad categori F y gallwch ei ddefnyddio
at ddibenion amaethyddol.
Dysgwch ragor yn https://www.gov.uk/government/publications/tractors-regulations-on-use/tractors-and-regulatory-requirements-a-brief-guide-september-2017
`;

export const NextStepsFailTemplate = `
# What to do next

Before you take your driving test again, make sure to:
1. Practice the areas of the driving test you failed on this time. Consider taking more lessons and read the Highway Code at https://www.gov.uk/guidance/the-highway-code.
2. Book your driving test at least 10 working days away at https://www.gov.uk/book-driving-test.
`;

export const NextStepsFailWelshTemplate = `
# Beth i'w wneud nesaf

Cyn i chi gymheryd eich prawf gyrru eto, gwnewch yn siwr o:
1. Ymarfer y meysydd o'r prawf gyrru y gwnaethoch fethu arnynt y tro hwn. Ystyriwch gymryd mwy o wersi a darllen Côd y Briffordd ar https://www.gov.uk/guidance/the-highway-code.
2. Archebwch eich prawf gyrru o leiaf 10 diwrnod gwaith ymlaen llaw ar https://www.gov.uk/book-driving-test.
`;

export const NextStepsVocationalFailTemplate = `
# What to do next

Before you take your driving test again, make sure to:
1. Practice the areas of the driving test you failed on this time. Consider taking more lessons and read the Highway Code at https://www.gov.uk/guidance/the-highway-code.
2. Book your driving test at least 3 working days away at https://www.gov.uk/book-driving-test.
`;

export const NextStepsVocationalFailWelshTemplate = `
# Beth i'w wneud nesaf

Cyn i chi gymheryd eich prawf gyrru eto, gwnewch yn siwr o:
1. Ymarfer y meysydd o’r prawf gyrru y gwnaethoch fethu arnynt y tro hwn. Ystyriwch gymryd mwy o wersi a darllen Côd y Briffordd ar https://www.gov.uk/guidance/the-highway-code.
2. Archebwch eich prawf gyrru o leiaf 3 diwrnod gwaith ymlaen llaw ar https://www.gov.uk/book-driving-test.
`;

export const NextStepsManFailTemplate = `
# What to do next

Before you take your driving test again, make sure to:
1. Practice the areas of the driving test you failed on this time. Consider taking more lessons and read the Highway Code at https://www.gov.uk/guidance/the-highway-code.
2. Book your driving test at least 1 working day away at https://www.gov.uk/book-driving-test.
`;

export const NextStepsManFailWelshTemplate = `
# Beth i'w wneud nesaf

Cyn i chi gymryd eich prawf gyrru eto, gwnewch yn siŵr eich bod yn:
1. Ymarfer y rhannau o’r prawf gyrru y gwnaethoch fethu tro yma. Ystyried cymryd mwy o wersi a darllen Rheolau’r Ffordd Fawr ar wefan https://www.gov.uk/guidance/the-highway-code.
2. Archebu eich prawf gyrru o leiaf 1 diwrnod gwaith i ffwrdd ar wefan https://www.gov.uk/book-driving-test.
`;

export const NextStepsRidingMod1FailTemplate = `
# What to do next

Before you take your motorcycle test again, make sure to:
1. Practice the areas of the motorcycle test you failed on this time. Consider taking more lessons and read the Highway Code at https://www.gov.uk/guidance/the-highway-code.
2. Book your motorcycle test at least 3 working days away at https://www.gov.uk/book-driving-test.
`;

export const NextStepsFailRidingMod1WelshTemplate = `
# Beth i'w wneud nesaf

Cyn i chi gymryd eich prawf beiciau modur eto, gwnewch yn siŵr eich bod yn:
1. Ymarfer meysydd y prawf beiciau modur rydych wedi eu methu arnynt y tro hwn. Ystyried cymryd mwy o wersi a darllen Rheolau’r Ffordd Fawr ar https://www.gov.uk/guidance/the-highway-code.
2.Archebwch eich prawf beiciau modur o leiaf 3 diwrnod gwaith ymlaen llaw ynhttps://www.gov.uk/book-driving-test.
`;

export const NextStepsRidingMod2FailTemplate = `
# What to do next

Before you take your motorcycle test again, make sure to:
1. Practice the areas of the motorcycle test you failed on this time. Consider taking more lessons and read the Highway Code at https://www.gov.uk/guidance/the-highway-code.
2. Book your motorcycle test at least 10 working days away at https://www.gov.uk/book-driving-test.
`;

export const NextStepsFailRidingMod2WelshTemplate = `
# Beth i'w wneud nesaf

Cyn i chi gymryd eich prawf beiciau modur eto, gwnewch yn siŵr eich bod yn:
1. Ymarfer meysydd y prawf beiciau modur rydych wedi eu methu arnynt y tro hwn. Ystyried cymryd mwy o wersi a darllen Rheolau’r Ffordd Fawr ar https://www.gov.uk/guidance/the-highway-code.
2.Archebwch eich prawf beiciau modur o leiaf 10 diwrnod gwaith ymlaen llaw ynhttps://www.gov.uk/book-driving-test.
`;

export const nextStepsADI2FailTemplate = `
# What to do next

Get a registered trainer to help you prepare for your next attempt at the ADI part 2 test if you have not done so already.

[Find driving instructor training courses](https://www.gov.uk/find-driving-instructor-training?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=unsuccessful).
`;

export const nextStepsAdi2PassTemplate = `
# What to do next

## 1. Get a registered trainer

Get a registered trainer to help you prepare for the ADI part 3 (instructional ability) test if you have not done so already.

^ [Find driving instructor training courses](https://www.gov.uk/find-driving-instructor-training?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=pass). 

## 2. Study the national standards

To help you prepare, you should study:

- the national standard for driver and rider training
- the national standard for driving cars and light vans
- the learning to drive a car or light van syllabus

These documents set out:

- the skills, knowledge and understanding you will need to pass the ADI part 3 test
- the skills, knowledge and understanding you will help your pupils to learn
- a way of teaching pupils the skills, knowledge and understanding 

^ [Find out more about the national standards and syllabus](https://www.gov.uk/government/collections/national-driving-and-riding-standards?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=pass). 

## 3. Get practice teaching

You have the option to apply for a 6 month trainee licence to get experience teaching pupils.

You must have had at least 40 hours of training from a qualified ADI in providing driving instruction (at least 10 of which were done in a car) to apply.

^ [Find out more about getting a trainee driving instructor licence](https://www.gov.uk/trainee-driving-instructor-licence-the-rules?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=pass). 

## 4. Book your ADI part 3 test

When you and your trainer agree you're ready, book your ADI part 3 test.

You must book the ADI part 3 test within 2 years of the date you passed the ADI part 1 (theory) test. If you do not, you'll have to start the application process again.

^ [Book your ADI part 3 test](https://www.gov.uk/book-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=pass). 

`;

export const NextStepsADI2FailWelshTemplate = `
# Beth i'w wneud nesaf

Cyn i chi gymryd eich prawf Rhan 2 ADI eto, gwnewch yn siŵr i:

1. Ymarfer meysydd y prawf Rhan 2 ADI rydych chi wedi methu arnynt y tro yma. Ystyriwch gymryd mwy o wersi a darllen Côd y Briffordd ar https://www.gov.uk/guidance/the-highway-code.
2. Mae DVSA yn argymell yn gryf eich bod yn ceisio datblygiad pellach gan hyfforddwr cofrestredig ORDIT (Cofrestr Swyddogol Hyfforddwyr Hyfforddwyr Ggyrru). Gallwch ganfod cyrsiau hyfforddi ORDIT i hyfforddwyr gyrru yn https://www.gov.uk/find-driving-instructor-training.
3. Archebwch eich prawf ADI rhan 2 o leiaf 10 diwrnod gwaith i ffwrdd yn https://www.gov.uk/book-driving-test neu drwy ffonio 0300 200 1122.

# Sut i apelio eich prawf gyrru

Gallwch apelio os credwch na ddilynodd eich arholwr y rheoliadau pan gynhaliodd eich prawf.
Canfyddwch sut i apelio ar https://www.gov.uk/adi-part-2-test/faults-test-result. Does dim modd newid canlyniad eich prawf, ond efallai y cewch ail brawf am ddim os bydd eich apêl yn llwyddiannus. Efallai y bydd angen i chi dalu costau llys os na fydd eich apêl yn llwyddo.
`;

export const nextStepsAdi3FirstOrSecondFailTemplate = `
# What to do next

## 1. Get a registered trainer

Get a registered trainer to help you prepare for your next attempt if you do not already have one.

^ [Find driving instructor training courses](https://www.gov.uk/find-driving-instructor-training?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccesful-1st-2nd). 

## 2. Study the national standards

To help you prepare, you should study:

- the national standard for driver and rider training
- the national standard for driving cars and light vans
- the learning to drive a car or light van syllabus

These documents set out:

- the skills, knowledge and understanding you will need to pass the ADI part 3 test
- the skills, knowledge and understanding you will help your pupils to learn
- a way of teaching pupils the skills, knowledge and understanding 

^ [Find out more about the national standards and syllabus](https://www.gov.uk/government/collections/national-driving-and-riding-standards?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccessful-1st-2nd). 

## 3. If you have a trainee driving instructor licence

If you chose the ‘extra training’ option (option 2) when you applied for your trainee licence, you must do 5 hours of extra training before you take the test again.

^ [Find out more about what you need to do if you have a trainee driving instructor licence](https://www.gov.uk/trainee-driving-instructor-licence-the-rules/options-when-you-apply-for-a-trainee-licence?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccessful-1st-2nd). 

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

^ [Find out how to become a driving instructor](https://www.gov.uk/become-car-driving-instructor?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccessful-3rd). 

---
`;

export const nextStepsAdi3PassTemplate = `
# What to do next

You can now apply for your first ADI certificate (badge). 

You must have your ADI certificate before you start working as an ADI.

You must apply for your certificate within 12 months of passing the test, or you’ll have to pass all 3 qualifying tests again.

^ [Apply for your first ADI certificate](https://www.gov.uk/apply-first-approved-driving-instructor-adi-badge?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=pass). 

---
`;

export const nextStepsScFirstOrSecondTemplate = `
# What to do next

## 1. Get a registered trainer

Get a registered trainer to help you prepare for your next attempt if you do not already have one.

^ [Find driving instructor training courses](https://www.gov.uk/find-driving-instructor-training?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccesful-1st-2nd). 

## 2. Study the national standards

To help you prepare, you should study:

- the national standard for driver and rider training
- the national standard for driving cars and light vans
- the learning to drive a car or light van syllabus

These documents set out:

- the skills, knowledge and understanding you will need to pass the ADI part 3 test
- the skills, knowledge and understanding you will help your pupils to learn
- a way of teaching pupils the skills, knowledge and understanding 

^ [Find out more about the national standards and syllabus](https://www.gov.uk/government/collections/national-driving-and-riding-standards?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccessful-1st-2nd). 


---
`;

export const nextStepsScThirdTemplate = `
# What happens next

The ADI Registrar will now consider whether or not to remove you from the ADI register. 

They will write to you in the coming weeks to ask you to send a statement of facts for them to consider before making their decision. This is known as ‘making representations’. 

^You can get help from an [ADI association](https://www.gov.uk/government/publications/driving-instructor-associations-and-organisations/driving-instructor-associations-and-organisations?utm_source=dvsa&utm_medium=email&utm_campaign=adi-standards-check&utm_content=unsuccessful-3rd) to make your representations. 

The ADI Registrar will then write to tell you their decision after you’ve made your representations. 

You will be able appeal to an independent tribunal if you disagree with their decision.

^[Find out how ADI registration decision appeals work](https://www.gov.uk/appeal-driving-instructor-registration-decision?utm_source=dvsa&utm_medium=email&utm_campaign=adi-standards-check&utm_content=unsuccessful-3rd). 

## Providing driving lessons

You can continue working as an ADI until the ADI Registrar has made their decision. 

If you decide to appeal, you will be able to continue working as an ADI until the tribunal makes a decision.

## If you are removed from the ADI register

You will need to requalify as an ADI if you want to continue working as a driving instructor.


---
`;

export const NextStepsCpcFailTemplate = `
# What to do next
Before you take your CPC Module 4 test again, make sure to:

1. Practice and revise the topic areas of the test you failed on. Consider taking more practical training and read the advice given at https://www.gov.uk/become-lorry-bus-driver/driver-cpc-part-4-practical-demonstration-test and https://www.safedrivingforlife.info/professionals
2. Book your CPC Module 4 test at least 3 working days away at https://www.gov.uk/book-driving-test.
`;

export const NextStepsCpcFailWelshTemplate = `
# Beth i'w wneud nesaf
Cyn i chi sefyll eich prawf CPC modiwl 4 eto, gwnewch yn siŵr eich bod yn:

1. Ymarfer ac adolygu meysydd pwnc y prawf y gwnaethoch fethu arnynt. Ystyried cymryd mwy o hyfforddiant ymarferol a darllen y cyngor a roddir yn https://www.gov.uk/become-lorry-bus-driver/driver-cpc-part-4-practical-demonstration-test a https://www.safedrivingforlife.info/professionals
2. Archebu eich prawf CPC Modiwl 4 o leiaf 3 diwrnod gwaith i ffwrdd yn https://www.gov.uk/book-driving-test.
`;
