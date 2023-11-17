/* eslint-disable max-len */
export const NextStepsPassTemplate = `
#What to do next

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

export const NextStepsPassWelshTemplate = `
#Beth i'w wneud nesaf

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

export const NextStepsFailTemplate = `
#What to do next

Before you take your driving test again, make sure to:
1. Practice the areas of the driving test you failed on this time. Consider taking more lessons and read the Highway Code at https://www.gov.uk/guidance/the-highway-code.
2. Book your driving test at least 10 working days away at https://www.gov.uk/book-driving-test.

#Statement of failure to pass practical test
Driving test reference number:  {{ applicationReference }}

The candidate with the number shown above has been examined and has FAILED to pass the practical test / test of competence to drive prescribed under the Road Traffic Act (and for the purpose of section 36 of the Road Traffic Offenders Act 1988) in respect of vehicles in the above category / categories.

#How to appeal your driving test
You can appeal if you think your examiner did not follow the regulations when they carried out your test. Find out how to appeal at https://www.gov.uk/driving-test/driving-test-faults-result#appeal-your-driving-test.  Your test result cannot be changed, but you might get a free retest if your appeal is successful. You might need to pay court costs if your appeal does not succeed.

`;

export const NextStepsFailWelshTemplate = `
#Beth i'w wneud nesaf

Cyn i chi gymheryd eich prawf gyrru eto, gwnewch yn siwr o:
1. Ymarfer y meysydd o'r prawf gyrru y gwnaethoch fethu arnynt y tro hwn. Ystyriwch gymryd mwy o wersi a darllen Côd y Briffordd ar https://www.gov.uk/guidance/the-highway-code.
2. Archebwch eich prawf gyrru o leiaf 10 diwrnod gwaith ymlaen llaw ar https://www.gov.uk/book-driving-test.

#Datganiad o fethiant i basio prawf ymarferol
Cyfeirnod prawf gyrru: {{ applicationReference }}

Arholwyd yr ymgeisydd gyda'r cyfeirnod archebu a ddangosir uchod ac mae wedi METHU i basio'r prawf ymarferol / prawf cymhwysedd i yrru a ragnodir o dan y Ddeddf Traffig Ffyrdd (ac at ddibenion adran 36 Deddf Troseddwyr Traffig Ffyrdd 1988) mewn perthynas â cherbydau yn y categori / categorïau uchod.

#Sut i apelio eich prawf gyrru
Gallwch apelio os credwch na ddilynodd eich arholwr y rheoliadau pan gynhaliodd eich prawf.
Canfyddwch sut i apelio ar https://www.gov.uk/driving-test/driving-test-faults-result#appeal-your-driving-test. Does dim modd newid canlyniad eich prawf, ond efallai y cewch ail brawf am ddim os bydd eich apêl yn llwyddiannus. Efallai y bydd angen i chi dalu costau llys os na fydd eich apêl yn llwyddo.

`;
