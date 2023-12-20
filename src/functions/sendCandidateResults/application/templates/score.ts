/* eslint-disable max-len */
export const scoreAdi3Template = `
# Total Score – {{totalScore}}

# Lesson Planning – {{lessonPlanningScore}}
{{lp1Score}} – Did the trainer identify the pupils learning goals and needs?
{{lp2Score}} – Was the agreed lesson structure appropriate for the pupil’s experience and ability?
{{lp3Score}} – Were the practice areas suitable?
{{lp4Score}} – Was the lesson plan adapted, when appropriate, to help the pupil work towards their learning goals?

# Risk Management – {{riskManagementScore}}
{{rm1Score}} – Did the trainer ensure that the pupil fully understood how the responsibility for risk would be shared?
{{rm2Score}} – Were directions and instructions given to the pupil clear and given in good time?
{{rm3Score}} – Was the trainer aware of the surroundings and the pupils actions?
{{rm4Score}} – Was any verbal or physical intervention by the trainer timely and appropriate?
{{rm5Score}} – Was sufficient feedback given to help the pupil understand any potential safety critical incidents?

# Teaching and Learning Strategies – {{teachingLearningStrategiesScore}}
{{tls1Score}} – Was the teaching style suited to the pupils learning style and current ability?
{{tls2Score}} – Was the pupil encouraged to analyse problems and take responsibility for their learning?
{{tls3Score}} – Were opportunities and examples used to clarify learning outcomes?
{{tls4Score}} – Was the technical information given comprehensive, appropriate and accurate?
{{tls5Score}} – Was the pupil given appropriate and timely feedback during the session?
{{tls6Score}} – Were the pupils queries followed up and answered?
{{tls7Score}} – Did the trainer maintain an appropriate non-discriminatory manner throughout the session?
{{tls8Score}} – At the end of the session – was the pupil encouraged to reflect on their own performance?
`;

export const scoreCpcEnglishTemplate = `
Your overall pass mark was {{ totalScore }} out of 100. The maximum you could have scored in each set topic was 20. Your overall score was made up as follows:

`;

export const cpcAbilityToLoadEnglishTemplate = `
# Ability to load the vehicle with due regard for safety rules and proper vehicle use
You scored {{ q1Score }} out of 20
{{#if showLGVText}}
Before moving any large vehicle you should familiarise yourself with the vehicle weight limits, know how to safely distribute any load that you intend to carry on your vehicle and that it is secured with the correct restraining device and will remain stable on the road. Know how to check that it is not overloaded and what to do if it is. There are differences between driving a large vehicle and driving a smaller vehicle or a car. An unladen vehicle will handle differently from a laden one. Handling will also change depending on the size or type of load carried. Extreme weather could have an effect on diesel engines and drivers should be aware of precautions and checks that can be taken by drivers.

{{/if}}
{{#if showPCVText}}
You should be aware of, and understand, the limits relating to any vehicles you drive. You must make sure that you know what the vehicle weighs – this is normally displayed on the vehicle. In many cases weight limits apply to the maximum gross weight ‘MGW’. Adding passengers and luggage can affect the weight and handling of a vehicle. Guidance can be found in the ‘Driving Buses and Coaches’ manual. Kneeling buses use air suspension to lower the entrance to the bus, whilst stationary, for easier access. This is especially useful for disabled passengers. It is important that a driver of this type of bus knows how to use this facility. Be patient and considerate. It is important to respect the wishes of disabled people to enable them to retain their independence. Think about the everyday problems faced by people trying to manage children, pushchairs and shopping trolleys. Allow time for wheelchairs and pushchairs to be stowed in the correct place and facing the correct way to prevent them from being thrown forward in the event of an accident.

{{/if}}
`;

export const cpcSecurityEnglishTemplate = ` 
# Security of your vehicle and contents
You scored {{ q2Score }} out of 20
{{#if showLGVText}}
You’re responsible for your vehicle, so you should make every effort to reduce the risk of it being stolen. Avoid parking in vulnerable areas if possible, especially at night. You should understand how the braking system works and be able to carry out physical checks to assess correct operation and what to do if you find a fault. You should know how to check all wheels, tyres and spray suppression equipment on your vehicle and any trailer are in a serviceable condition. Before moving any large vehicle, you should familiarise yourself with the physical dimensions and clearances required for the vehicle and any restrictions that may apply. Also be aware of any overhangs or projections when driving. Every time you get into your vehicle it is important to carry out a ‘Cockpit Drill’. Never start a journey with a defective warning device or when a warning light is showing. You should be able to recognise the various types of fire extinguisher and know which fires they’re intended to tackle. Try to isolate the source of the fire.

{{/if}}
{{#if showPCVText}}
Your vehicle must be in good condition at all times. This means regular safety checks and strict observance of maintenance schedules. The use of correct grades of fuel and oil in very hot or very cold weather is essential and it may be necessary to refer to the vehicle’s operating manual. Seat belts save lives and reduce the risk of injury. Where they are fitted they must be worn, with signs in place informing passengers of their use. Passengers who may not be able to read must be informed of the regulations. You must ensure that the vehicle is checked daily – it is important for the comfort and safety of passengers that seats and seat belts are checked for safety.

{{/if}}
`;

export const cpcAbilityToPreventCriminalityEnglishTemplate = ` 
# Ability to prevent criminality and trafficking in illegal immigrants
You scored {{ q3Score }} out of 20
{{#if showLGVText}}
You must be aware of security of your vehicle and its contents. When passing through customs or before crossing borders, drivers of lorries are responsible for anything that is carried on their vehicle. It is important that drivers know what to check for and how to check their vehicle to ensure that they are not committing any offences for the country that they intend to enter. You, as the driver, will normally be responsible for your vehicle. All round physical checks are vital. Remember, you are responsible for carrying out the final vehicle checks.

{{/if}}
{{#if showPCVText}}
When passing through customs and before crossing borders, drivers of buses and coaches are responsible for anything that is on board their vehicle. It is important that drivers know what to check for and how to check their vehicle to ensure that they are not committing any offences with regard to the country they intend to enter.

{{/if}}
`;

export const cpcAbilityToAssessEmergencyEnglishTemplate = ` 
# Ability to assess emergency situations
You scored {{ q4Score }} out of 20
{{#if showLGVText}}
You should know how to enter your vehicle safely. Before starting the engine you should carry out a ‘Cockpit Drill’ and take the appropriate action. It is essential when leaving your vehicle that you do so safely with due regard for your safety and that of other road users. Every year 700 people die or are seriously injured falling from vehicles.

{{/if}}
{{#if showPCVText}}
All PCVs must have at least one fire extinguisher. You must know where they are located and how to get them out and use them. There are different types of extinguishers for use on different types of fires, so you must be able to identify the different types according to colour. You must also be aware of where fires are most likely to start and how to deal with your passengers, especially if you are on a motorway. The majority of buses and coaches in the UK are 2.5 metres wide/8 feet 3 inches. Mirrors and exterior trim can also add to the width of the vehicle so be aware of distance allowing for mirrors perhaps hitting other vehicles or lamp posts etc. A broken mirror means that your vehicle is unroadworthy and, therefore, illegal. Remember also the front and rear of your vehicle when turning at junctions. When moving away from bus stops it is important that you are aware of what safety checks are required for your passengers both those on the bus and those wishing to board the bus. It is also important, if a ‘kneeling’ facility is being used, to allow disabled passengers or passengers with pushchairs to have time to sit down before moving off.

{{/if}}
`;

export const cpcAbilityToPreventPhysicalRiskEnglishTemplate = ` 
# Ability to prevent physical risk
You scored {{ q5Score }} out of 20
{{#if showLGVText}}
It is important to keep your vehicle well maintained; breaking down whilst on the road can have road safety implications and cause unnecessary congestion. Follow manufacturer’s guidelines for service intervals. In addition to this, being aware of components wearing out or requiring replacement will help prevent costly breakdowns. Ensuring that your daily walk-round checks will enable you to find any defects that could become a problem and cause the vehicle to break down or be driven whilst illegal. The time taken to complete a thorough check will be less than that required to organise a repair or replacement whilst out on the road.

{{/if}}
{{#if showPCVText}}
It is important to keep your vehicle well maintained since breaking down whilst on the road can have road safety implications. Follow manufacturer’s guidelines for service intervals. You also need to be aware of components wearing out or requiring replacement – this will help prevent costly breakdowns. Ensuring that the daily walk-round checks are carried out will enable you to find any defects that could become a problem and cause the vehicle to break down or be driven illegally. The time taken to complete a thorough check will be less than that required to organise repair or replacement whilst out on the road.

{{/if}}

`;

export const scoreCpcWelshTemplate = `
Eich marc pasio cyffredinol oedd {{ totalScore }} allan o 100. Yr uchafswm y gallech fod wedi’i sgorio ym mhob pwnc penodol oedd 20. Cyfrifwyd eich sgôr gyffredinol fel a ganlyn:

`;

export const cpcAbilityToLoadWelshTemplate = `
# Y gallu i lwytho’r cerbyd gan roi sylw dyledus i reolau diogelwch a defnyddio’r cerbyd yn briodol
Gwnaethoch sgorio {{ q1Score }} allan o 20
{{#if showLGVText}}
Cyn symud unrhyw gerbyd mawr, dylech ymgyfarwyddo â therfynau pwysau’r cerbyd, gwybod sut i ddosbarthu’n ddiogel unrhyw lwyth y bwriadwch ei gludo ar eich cerbyd a’i fod wedi’i ddiogelu â’r ddyfais atal gywir ac y bydd yn parhau’n sefydlog ar y ffordd. Gwybod sut i wirio nad yw’n cael ei orlwytho a beth i’w wneud os ydyw. Mae gwahaniaethau rhwng gyrru cerbyd mawr a gyrru cerbyd llai neu gar. Bydd cerbyd heb ei lwytho yn llywio’n wahanol i un wedi’i lwytho. Bydd llywio hefyd yn newid yn dibynnu ar faint neu fath y llwyth a gludir. Gallai tywydd eithafol gael effaith ar beiriannau diesel a dylai gyrwyr fod yn ymwybodol o ragofalon a gwiriadau y gall gyrwyr eu cymryd.

{{/if}}
{{#if showPCVText}}
Dylech fod yn ymwybodol o’r terfynau sy’n ymwneud ag unrhyw gerbydau yr ydych yn eu gyrru, a’u deall. Rhaid i chi wneud yn siŵr eich bod yn gwybod beth yw pwysau’r cerbyd – arddangosir hyn fel arfer ar y cerbyd. Mewn llawer o achosion mae terfynau pwysau yn berthnasol i’r uchafswm pwysau gros ‘ MGW ‘. Gall ychwanegu teithwyr a bagiau effeithio ar bwysau a dull llywio cerbyd. Gellir dod o hyd i ganllawiau yn y llawlyfr ‘Gyrru Bysiau a Choetsys ‘. Mae bysiau penlinio’n defnyddio crogiant aer i ostwng y fynedfa i’r bws, tra’n llonydd, i gael mynediad haws. Mae hyn yn arbennig o ddefnyddiol i deithwyr anabl. Mae’n bwysig bod gyrrwr y math hwn o fws yn gwybod sut i ddefnyddio’r cyfleuster hwn. Byddwch yn amyneddgar ac yn ystyriol. Mae’n bwysig parchu dymuniadau pobl anabl i’w galluogi i gadw eu hannibyniaeth. Meddyliwch am y problemau bob dydd a wynebir gan bobl sy’n ceisio rheoli plant, cadeiriau gwthio a throlïau siopa. Caniatewch amser i gadeiriau olwyn a chadeiriau gwthio gael eu gosod yn y man cywir gan wynebu’r ffordd gywir er mwyn eu hatal rhag cael eu taflu ymlaen os bydd damwain.

{{/if}}
`;

export const cpcSecurityWelshTemplate = ` 
# Diogelwch eich cerbyd a’i gynnwys
Gwnaethoch sgorio {{ q2Score }} allan o 20
{{#if showLGVText}}
Chi sy’n gyfrifol am eich cerbyd, felly dylech wneud pob ymdrech i leihau’r risg y caiff ei ddwyn. Osgowch barcio mewn mannau bregus os oes modd, yn enwedig yn y nos. Dylech ddeall sut mae’r system frecio yn gweithio ac yn gallu gwneud gwiriadau ffisegol i asesu’r gweithrediad cywir a beth i’w wneud os ydych chi’n dod o hyd i ddiffyg. Dylech wybod sut i wirio’r holl olwynion, teiars ac offer atal chwistrell ar eich cerbyd ac ar unrhyw drelar mewn cyflwr defnyddiol. Cyn symud unrhyw gerbyd mawr, dylech ymgyfarwyddo â’r dimensiynau ffisegol a’r cliriadau sydd eu hangen ar gyfer y cerbyd ac unrhyw gyfyngiadau a all fod yn berthnasol. Hefyd dylech fod yn ymwybodol o unrhyw fargodion neu fargodiadau wrth yrru. Bob tro y byddwch yn mynd i mewn i’ch cerbyd mae’n bwysig cynnal ‘Dril Talwrn’. Peidiwch byth â dechrau taith gyda dyfais rhybuddio diffygiol neu pan fydd golau rhybudd yn dangos. Dylech allu adnabod y gwahanol fathau o ddiffoddydd tân a gwybod pa danau y bwriediriddynt ymdrin â nhw. Ceisiwch ynysu ffynhonnell y tân.

{{/if}}
{{#if showPCVText}}
Rhaid i’ch cerbyd fod mewn cyflwr da bob amser. Mae hyn yn golygu gwiriadau diogelwch rheolaidd ac arsylwi’n llym ar amserlenni cynnal a chadw. Mae’n hanfodol defnyddio graddau cywir o danwydd ac olew mewn tywydd poeth iawn neu oer iawn ac efallai y bydd angen cyfeirio at lawlyfr gweithredu’r cerbyd. Mae gwregysau diogelwch yn achub bywydau ac yn lleihau’r risg o anaf. Os ydynt wedi’u gosod, rhaid eu gwisgo, ac mae arwyddion ar gael i hysbysu teithwyr o’r defnydd ohonynt. Rhaid rhoi gwybod am y rheoliadau i deithwyr nad ydynt o bosibl yn gallu darllen. Rhaid i chi sicrhau bod y cerbyd yn cael ei archwilio’n ddyddiol – mae’n bwysig er cysur a diogelwch teithwyr bod seddau a gwregysau diogelwch yn cael eu gwirio i sicrhau eu bod yn ddiogel.

{{/if}}
`;

export const cpcAbilityToPreventCriminalityWelshTemplate = ` 
# Y gallu i atal troseddoldeb a masnachu mewn mewnfudwyr anghyfreithlon
Gwnaethoch sgorio {{ q3Score }} allan o 20
{{#if showLGVText}}
Rhaid i chi fod yn ymwybodol o ddiogelwch eich cerbyd a’i gynnwys. Wrth basio drwy’r tollau neu cyn croesi ffiniau, gyrwyr lorïau sy’n gyfrifol am unrhyw beth sy’n cael ei gario ar eu cerbyd. Mae’n bwysig bod gyrwyr yn gwybod beth i chwilio amdano a sut i wirio eu cerbyd i sicrhau nad ydynt yn cyflawni unrhyw droseddau ar gyfer y wlad y maent yn bwriadu mynd iddi. Chi, fel y gyrrwr, fydd yn gyfrifol am eich cerbyd fel arfer. Mae archwiliadau ffisegol manwl yn hanfodol. Cofiwch, chi sy’n gyfrifol am gynnal y gwiriadau terfynol ar y cerbyd.

{{/if}}
{{#if showPCVText}}
Wrth basio drwy’r tollau a chyn croesi ffiniau, mae gyrwyr bysiau a choetsys yn gyfrifol am unrhyw beth sydd ar fwrdd eu cerbyd. Mae’n bwysig bod gyrwyr yn gwybod beth i chwilio amdano a sut i wirio eu cerbyd i sicrhau nad ydynt yn cyflawni unrhyw droseddau o ran y wlad y maent yn bwriadu mynd iddi.

{{/if}}
`;

export const cpcAbilityToAssessEmergencyWelshTemplate = ` 
# Y gallu i asesu sefyllfaoedd brys
Gwnaethoch sgorio {{ q4Score }} allan o 20
{{#if showLGVText}}
Dylech wybod sut i fynd i mewn i’ch cerbyd yn ddiogel. Cyn dechrau’r injan, dylech gynnal ‘Dril Talwrn’ a chymryd y camau priodol. Wrth adael eich cerbyd, mae’n hanfodol eich bod yn gwneud hynny’n ddiogel gan roi sylw dyledus i’ch diogelwch chi a diogelwch defnyddwyr eraill y ffordd. Bob blwyddyn mae 700 o bobl yn marw neu’n cael eu hanafu’n ddifrifol wrth syrthio o gerbydau.

{{/if}}
{{#if showPCVText}}
Rhaid i bob PCV gael o leiaf un diffoddwr tân. Rhaid i chi wybod ble maen nhw wedi’u lleoli a sut i fynd â nhw allan a’u defnyddio. Mae gwahanol fathau o ddiffoddyddion i’w defnyddio ar wahanol fathau o danau, felly rhaid i chi fedru adnabod y gwahanol fathau yn ôl lliw. Rhaid i chi hefyd fod yn ymwybodol o ble mae tanau yn fwyaf tebygol o ddechrau a sut i ddelio â’ch teithwyr, yn enwedig os ydych ar draffordd. Mae’r rhan fwyaf o fysiau a choetsys yn y DU yn 2.5 metr o led/8 troedfedd 3 modfedd. Gall drychau ac addurnau allanol hefyd ychwanegu at led y cerbyd felly byddwch yn ymwybodol o bellter gan ganiatáu i ddrychau daro cerbydau eraill neu bolion lampau ac ati, efallai. Mae drych toredig yn golygu bod eich cerbyd yn anaddas i’r ffordd fawr ac, felly, yn anghyfreithlon. Cofiwch hefyd am flaen a chefn eich cerbyd wrth droi wrth gyffyrdd. Wrth symud i ffwrdd o arosfannau bysiau mae’n bwysig eich bod yn ymwybodol o ba wiriadau diogelwch sydd eu hangen ar gyfer eich teithwyr, y rhai sydd ar y bws a’r rhai sy’n dymuno byrddio’r bws. Mae hefyd yn bwysig, os defnyddir cyfleuster ‘penlinio’, i alluogi teithwyr anabl neu deithwyr sydd â chadeiriau gwthio i gael amser i eistedd cyn symud i ffwrdd.

{{/if}}
`;

export const cpcAbilityToPreventPhysicalRiskWelshTemplate = ` 
# Y gallu i atal risg gorfforol
Gwnaethoch sgorio {{ q5Score }} allan o 20
{{#if showLGVText}}
Mae’n bwysig cynnal a chadw eich cerbyd yn dda; gall torri i lawr tra ar y ffordd fod â goblygiadau ynghylch diogelwch ar y ffyrdd ac achosi tagfeydd diangen. Dilynwch ganllawiau’r gwneuthurwr am ysbeidiau rhwng triniaethau. Yn ogystal â hyn, mae bod yn ymwybodol o gydrannau sy’n treulioneu sydd angen eu cyfnewid yn helpu i atal toriadau costus. Bydd sicrhau bod y gwiriadau manwl dyddiol yn cael eu cynnal yn eich galluogi i ddod o hyd i unrhyw ddiffygion a allai ddod yn broblem ac achosi i’r cerbyd dorri i lawr neu gael ei yrru tra’n anghyfreithlon. Bydd yr amser a gymerir i gwblhau gwiriad trwyadl yn llai na’r hyn sy’n ofynnol i drefnu atgyweiriad neu amnewid pan ydych allan ar y ffordd.

{{/if}}
{{#if showPCVText}}
Mae’n bwysig sicrhau bod eich cerbyd yn cael ei gynnal a’i gadw’n dda gan fod torri i lawr pan ydych ar y ffordd yn gallu cael goblygiadau ynghylch diogelwch ar y ffyrdd. Dilynwch ganllawiau’r gwneuthurwr am ysbeidiau rhwng triniaethau. Mae angen i chi hefyd fod yn ymwybodol o gydrannau sy’n treulio neu sydd angen amnewid – bydd hyn yn helpu i atal toriadau costus. Bydd sicrhau bod y gwiriadau manwl bob dydd yn cael eu cynnal yn eich galluogi i ddod o hyd i unrhyw ddiffygion a allai ddod yn broblem ac achosi i’r cerbyd dorri i lawr neu gael ei yrru’n anghyfreithlon. Bydd yr amser a gymerir i gwblhau gwiriad trwyadl yn llai na’r hyn sydd ei angen i drefnu gwaith atgyweirio neu amnewid pan ydych allan ar y ffordd.

{{/if}}
`;

export const scoreCpcFailEnglishTemplate = `
Your overall mark was {{ totalScore }} out of 100.
You were required to score at least 15 out of 20 in each set topic. You also needed an overall score of at least 80 out of 100. Your overall score was made up as follows:
`;

export const scoreCpcFailWelshTemplate = `
Eich marc cyffredinol oedd {{ totalScore }} allan o 100.
Roedd angen i chi sgorio o leiaf 15 allan o 20 ym mhob pwnc penodol. Hefyd, roedd arnoch angen sgôr gyffredinol o 80 o leiaf allan o 100. Roedd eich sgôr gyffredinol fel a ganlyn:
`;

