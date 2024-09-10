/**
 * Function to generate a grade template for ADI3 & SC templates
 */
export const gradeTemplate = `
# How the assessment worked

You were assessed on 17 competencies across 3 topics. 

You could score 0 to 3 points for each competency. The scores mean:

- 0 - No evidence of the competency
- 1 - Demonstrated in a few elements 
- 2 - Demonstrated in most elements 
- 3 - Demonstrated in all elements

## Lesson planning

You scored {{lessonPlanningScore}} out of 12 in lesson planning.

You were assessed on 4 competencies in this topic: 

- Identify learning goals and needs - {{lp1Score}} out of 3
- Use an appropriate lesson structure - {{lp2Score}} out of 3
- Choose suitable practice areas - {{lp3Score}} out of 3
- Adapt the lesson plan when appropriate - {{lp4Score}} out of 3

## Risk management

You scored {{riskManagementScore}} out of 15 in risk management.

You were assessed on 5 competencies in this topic:

- Share the responsibility for risk - {{rm1Score}} out of 3
- Give clear, timely and suitable directions and instructions - {{rm2Score}} out of 3
- Maintain awareness of your surroundings and the pupil’s actions  - {{rm3Score}} out of 3
- Make timely and appropriate verbal and physical interventions - {{rm4Score}} out of 3
- Help the pupil understand potential safety critical incidents - {{rm5Score}} out of 3

## Teaching and learning strategies

You scored {{teachingLearningStrategiesScore}} out of 24 in teaching and learning strategies.

You were assessed on 8 competencies in this topic:

- Use a suitable teaching and learning style - {{tls1Score}} out of 3
- Encourage problem analysis and responsibility for learning - {{tls2Score}} out of 3
- Clarify learning outcomes - {{tls3Score}} out of 3
- Give correct and appropriate technical information - {{tls4Score}} out of 3
- Give appropriate and timely feedback during the session - {{tls5Score}} out of 3
- Follow-up and answer the pupil’s queries - {{tls6Score}} out of 3
- Maintain an appropriate manner - {{tls7Score}} out of 3
- Encourage the pupil to reflect on their performance - {{tls8Score}} out of 3

## Feedback from the examiner 

The examiner gave this feedback:

^{{feedback}}

---
    `;

/**
 * Function to generate a grade template for ADI3 & SC templates in Welsh
 */
export const gradeWelshTemplate = `
# Sut gweithiodd yr asesiad

Cawsoch eich asesu ar 17 o gymwyseddau ar draws 3 phwnc. 

Gallech sgorio 0 i 3 phwynt am bob cymhwysedd. Mae'r sgorau yn golygu:

- 0 - Dim tystiolaeth o'r cymhwysedd
- 1 - Wedi'i ddangos mewn ychydig o elfennau 
- 2 - Wedi'i ddangos mewn rhan fwyaf o elfennau 
- 3 - Wedi'i ddangos mewn pob elfen

## Cynllunio gwersi

Fe wnaethoch {{lessonPlanningScore}} chi sgorio allan o 12 ar gyfer gynllunio gwersi.

Cawsoch eich asesu ar 4 cymhwysedd yn y pwnc hwn: 

- Nodi nodau ac anghenion dysgu - {{lp1Score}} allan o 3
- Defnyddiwch strwythur gwers priodol - {{lp2Score}} allan o 3
- Dewiswch feysydd ymarfer addas - {{lp3Score}} allan o 3
- Addaswch y cynllun gwers pan fo'n briodol - {{lp4Score}} allan o 3

## Rheoli Risg

Fe wnaethoch chi sgorio {{riskManagementScore}} allan o 15 mewn rheoli risg.

Cawsoch eich asesu ar 5 cymhwysedd yn y pwnc hwn:

- Rhannu'r cyfrifoldeb am risg - {{rm1Score}} allan o 3
- Rhoi cyfarwyddiadau clir, amserol ac addas - {{rm2Score}} allan o 3
- Cynnal ymwybyddiaeth o’r hyn sydd o’ch cwmpas a gweithredoedd y disgybl - {{rm3Score}} allan o 3
- Gwneud ymyriadau llafar a chorfforol amserol a phriodol - {{rm4Score}} allan o 3
- Helpwch y disgybl i ddeall digwyddiadau diogelwch critigol - {{rm5Score}} allan o 3


## Strategaethau addysgu a dysgu

Fe wnaethoch chi sgorio {{teachingLearningStrategiesScore}} allan o 24 mewn strategaethau addysgu a dysgu.

Cawsoch eich asesu ar 8 cymhwysedd yn y pwnc hwn:

- Defnyddiwch arddull addysgu a dysgu addas - {{tls1Score}} allan o 3
- Annog dadansoddi problemau a chyfrifoldeb am ddysgu - {{tls2Score}} allan o 3
- Egluro canlyniadau dysgu - {{tls3Score}} allan o 3
- Rhoi gwybodaeth dechnegol gywir a phriodol - {{tls4Score}} allan o 3
- Rhoi adborth priodol ac amserol yn ystod y sesiwn - {{tls5Score}} allan o 3
- Gwaith dilynol ac ateb cwestiynau’r disgybl - {{tls6Score}} allan o 3
- Cynnal dull priodol - {{tls7Score}} allan o 3
- Anogwch y disgybl i fyfyrio ar eu perfformiad - {{tls8Score}} allan o 3

## Adborth gan yr arholwr 

Rhoddodd yr archwiliwr yr adborth hwn:

^{{feedback}} 

---
    `;
