
// =======================================================================
// JAVASCRIPT APPLICATION
// =======================================================================
// This section contains the actual game program.
// The main ideas are:
//   DATA       -> what exists in the game
//   STATE      -> what is happening right now
//   LOGIC      -> what should happen after an action
//   RENDERING  -> how the current state is shown on screen
//   EVENTS     -> how clicks and other player actions enter the program
// =======================================================================
/* ============ LAB CHAOS ============ */

// Current interface language. The game starts in English.
// Changing this value makes the translation helper return Arabic text.
var L = 'en';

// Translation dictionary: T[language][key] gives the text shown to the player.
// Keeping text in one object makes the interface bilingual without duplicating screens.
var T = {
  en:{
    tagline:"A lab where failing is the lesson.\nMix anything. Break anything. Learn why.",
    mStory:"Story lab", mStorySub:"12 guided experiments",
    mFree:"Free chaos", mFreeSub:"No rules. Every reagent unlocked.",
    mCh:"Challenges", mChSub:"Long-run goals and coin rewards",
    mNotes:"Lab notebook", mNotesSub:"Every reaction you have discovered",
    mPt:"Periodic table", mPtSub:"All 118 elements, tap to read",
    mShop:"Supply room", mShopSub:"Spend coins on hearts and repairs",
    lvTitle:"Story lab", lvLede:"Each level teaches one idea. Finish it to unlock the next.",
    nTitle:"Lab notebook", nTitleSub:"",
    cTitle:"Challenges", cLede:"These track across every mode. Rewards pay out once.",
    shTitle:"Supply room", shLede:"Explosions cost money. This is where it comes back.",
    pTitle:"Periodic table", pLede:"Scroll sideways. Elements outlined in amber are on your shelf.",
    pNote:"Tap any element for its name, mass and family.",
    hoodLbl:"FUME HOOD",
    gGoggles:"Goggles", gGloves:"Gloves", gHood:"Hood", gShield:"Shield",
    slotEmpty:"tap a\nreagent", mix:"MIX",
    taskLabel:"OBJECTIVE", freeTask:"Free chaos. No objective, no timer. Mix whatever you want and read what happens.",
    eExt:"Extinguisher", eHood:"Open hood", eShower:"Shower",
    emergFire:"FIRE IN THE BEAKER", emergGas:"GAS ESCAPING", emergSpill:"SPILL ON YOUR HANDS",
    emergText:"Three seconds. Pick the right control.",
    again:"Mix again", next:"Next level", backHome:"Back to lab menu", retry:"Retry level",
    saved:"Saved to notebook",
    noNotes:"Your notebook is empty.\nGo mix something and it will fill up on its own.",
    notesCount:"@a of @b reactions discovered.",
    lockedTxt:"Finish the level before it",
    goalDone:"Objective complete",
    hpLost:"−1 heart", hpNone:"Out of hearts. Buy one in the supply room, or keep playing in free chaos.",
    buyHeart:"Refill one heart", buyHeartD:"Back to the bench with a full heart.",
    repair:"Repair the lab", repairD:"Clears the damage penalty on your safety score.",
    restock:"Restock shelf", restockD:"A small coin top-up for finishing your reagents.",
    buy:"Buy", owned:"Full", cant:"Not enough coins",
    bought:"Done", safetyUp:"Safety restored",
    vSuccess:"Clean result", vPartial:"Not quite", vHazard:"Hazard", vBoom:"Explosion", vFire:"Fire", vSaved:"Good save",
    noReact:"Nothing visible happens",
    noReactWhy:"These two do not react under lab conditions. Not every pair does something, and knowing which pairs are inert is real chemistry knowledge.",
    noReactLesson:"A negative result is still a result. Write it down.",
    gearNoGoggles:"You skipped goggles. That is why the damage was worse.",
    gearNoHood:"The hood was shut, so the gas had nowhere to go.",
    gearNoShield:"No blast shield. The whole bench took it.",
    firstBoom:"Your first explosion. Dr. Fizz forgives you.",
    win:"Level cleared",
    winTxt:"Objective met. The next level is open.",
    allDone:"You finished every level. Free chaos is still waiting.",
    sayIdle:"Ready when you are.",
    sayMix:"Here goes...",
    sayBoom:"...I regret everything.",
    sayGood:"That is exactly right.",
    sayGas:"Do not breathe that.",
    chReward:"+@n",
    mGuide:"How to play", mGuideSub:"Read this first if a level has you stuck",
    guTitle:"How to play", guLede:"Everything the game expects you to know, in one place.",
    hintOn:"Hint", hintTitle:"You need",
    hintGear:"Gear required for this level:",
    hintFree:"No objective here. Pick any two things and press MIX.",
    gWalk:"Level walkthrough", gWalkNote:"Tap a level to reveal the answer.",
    coachSkip:"Skip", coachNext:"Next", coachDone:"Start mixing",
    c1t:"Two reagents, one mix",
    c1x:"Tap any two bottles on the shelf at the bottom. They fill the two slots. Then press MIX. Tap a filled slot to empty it.",
    c2t:"Names and formulas",
    c2x:"Each bottle shows its chemical formula on top and its everyday name underneath. NaCl is table salt. CH₃COOH is vinegar. The objective may use either name, so read both lines.",
    c3t:"Gear never blocks you",
    c3x:"Goggles, gloves, fume hood and blast shield are optional. They do not stop a mix — they change what it costs you when it goes wrong.",
    c4t:"Stuck? Press the ? button",
    c4x:"The question mark next to the objective tells you exactly which reagents the level wants. It is free and it costs you nothing."
  },
  ar:{
    tagline:"مختبر يكون فيه الفشل هو الدرس.\nاخلط أي شيء. دمّر أي شيء. وافهم السبب.",
    mStory:"مختبر القصة", mStorySub:"١٢ تجربة موجّهة",
    mFree:"الفوضى الحرة", mFreeSub:"بلا قواعد. كل المواد متاحة.",
    mCh:"التحديات", mChSub:"أهداف طويلة المدى ومكافآت",
    mNotes:"دفتر المختبر", mNotesSub:"كل تفاعل اكتشفته",
    mPt:"الجدول الدوري", mPtSub:"١١٨ عنصراً، اضغط لتقرأ",
    mShop:"غرفة التموين", mShopSub:"اصرف عملاتك على القلوب والإصلاح",
    lvTitle:"مختبر القصة", lvLede:"كل مرحلة تعلّمك فكرة واحدة. أنهِها لتفتح التالية.",
    nTitle:"دفتر المختبر", nTitleSub:"",
    cTitle:"التحديات", cLede:"تُحسب في كل الأوضاع. المكافأة تُصرف مرة واحدة.",
    shTitle:"غرفة التموين", shLede:"الانفجارات تكلّف مالاً. ومن هنا يعود.",
    pTitle:"الجدول الدوري", pLede:"مرّر جانبياً. العناصر المحاطة بالكهرماني موجودة على رفّك.",
    pNote:"اضغط أي عنصر لتعرف اسمه وكتلته وعائلته.",
    hoodLbl:"شفّاط الأبخرة",
    gGoggles:"نظارة", gGloves:"قفاز", gHood:"شفّاط", gShield:"حاجز",
    slotEmpty:"اختر\nمادة", mix:"اخلط",
    taskLabel:"الهدف", freeTask:"فوضى حرة. لا هدف ولا وقت. اخلط ما تشاء واقرأ ما يحدث.",
    eExt:"طفّاية", eHood:"افتح الشفّاط", eShower:"دُش الطوارئ",
    emergFire:"نار في الكأس", emergGas:"غاز يتسرّب", emergSpill:"انسكاب على يديك",
    emergText:"ثلاث ثوانٍ. اختر التصرف الصحيح.",
    again:"اخلط مجدداً", next:"المرحلة التالية", backHome:"قائمة المختبر", retry:"أعد المرحلة",
    saved:"حُفظ في الدفتر",
    noNotes:"دفترك فارغ.\nاذهب واخلط شيئاً وسيمتلئ وحده.",
    notesCount:"اكتشفت @a من أصل @b تفاعلاً.",
    lockedTxt:"أنهِ المرحلة السابقة",
    goalDone:"تحقق الهدف",
    hpLost:"−قلب واحد", hpNone:"نفدت القلوب. اشترِ واحداً من غرفة التموين، أو تابع في الفوضى الحرة.",
    buyHeart:"إعادة قلب", buyHeartD:"عُد إلى الطاولة بقلب كامل.",
    repair:"إصلاح المختبر", repairD:"يزيل خصم الضرر من درجة الأمان.",
    restock:"إعادة تعبئة الرف", restockD:"دعم بسيط بالعملات.",
    buy:"شراء", owned:"مكتمل", cant:"العملات لا تكفي",
    bought:"تم", safetyUp:"استُعيدت درجة الأمان",
    vSuccess:"نتيجة نظيفة", vPartial:"ليس تماماً", vHazard:"خطر", vBoom:"انفجار", vFire:"حريق", vSaved:"إنقاذ موفّق",
    noReact:"لا يحدث شيء ظاهر",
    noReactWhy:"هاتان المادتان لا تتفاعلان في ظروف المختبر. ليس كل زوج يفعل شيئاً، ومعرفة الأزواج الخاملة معرفة كيميائية حقيقية.",
    noReactLesson:"النتيجة السالبة نتيجة أيضاً. دوّنها.",
    gearNoGoggles:"تجاهلت النظارة. لهذا كان الضرر أسوأ.",
    gearNoHood:"الشفّاط كان مغلقاً، فلم يجد الغاز مخرجاً.",
    gearNoShield:"لا حاجز واقٍ. الطاولة كلها تلقّت الضربة.",
    firstBoom:"انفجارك الأول. د. فِز يسامحك.",
    win:"اجتزت المرحلة",
    winTxt:"تحقق الهدف. المرحلة التالية مفتوحة.",
    allDone:"أنهيت كل المراحل. الفوضى الحرة ما زالت بانتظارك.",
    sayIdle:"جاهز متى ما أردت.",
    sayMix:"ها نحن ذا...",
    sayBoom:"...أنا نادم على كل شيء.",
    sayGood:"هذا صحيح تماماً.",
    sayGas:"لا تتنفس ذلك.",
    chReward:"+@n",
    mGuide:"كيف تلعب", mGuideSub:"اقرأ هذا أولاً إذا توقفت عند مرحلة",
    guTitle:"كيف تلعب", guLede:"كل ما تتوقع اللعبة أن تعرفه، في مكان واحد.",
    hintOn:"تلميح", hintTitle:"تحتاج",
    hintGear:"المعدات المطلوبة لهذه المرحلة:",
    hintFree:"لا هدف هنا. اختر أي مادتين واضغط اخلط.",
    gWalk:"حلول المراحل", gWalkNote:"اضغط على المرحلة لكشف الحل.",
    coachSkip:"تخطٍّ", coachNext:"التالي", coachDone:"ابدأ الخلط",
    c1t:"مادتان، وخلطة واحدة",
    c1x:"اضغط أي زجاجتين من الرف في الأسفل، فتملآن الخانتين. ثم اضغط «اخلط». واضغط على خانة ممتلئة لتفريغها.",
    c2t:"الأسماء والصيغ",
    c2x:"كل زجاجة تعرض صيغتها الكيميائية في الأعلى واسمها الدارج تحتها. NaCl هو ملح الطعام، وCH₃COOH هو الخل. قد يستخدم الهدف أي الاسمين، فاقرأ السطرين.",
    c3t:"المعدات لا تمنعك أبداً",
    c3x:"النظارة والقفاز والشفّاط والحاجز كلها اختيارية. لا توقف الخلط — بل تغيّر ثمن الخطأ حين يقع.",
    c4t:"توقفت؟ اضغط زر ؟",
    c4x:"علامة الاستفهام بجوار الهدف تخبرك بالضبط أي المواد تريدها المرحلة. مجانية ولا تكلفك شيئاً."
  }
};
function t(k){ return (T[L][k] !== undefined ? T[L][k] : k); }


// =======================================================================
// REAGENT DATA
// -----------------------------------------------------------------------
// REAGENTS is the game's catalogue of substances/items.
// Each object has an id, display formula, English name, Arabic name,
// visual color and a small list used by the periodic-table highlighting.
// =======================================================================
/* ---------- reagents ---------- */

var REAGENTS = [
  {id:'h2o',    sym:'H₂O',     en:'Water',            ar:'ماء',                  c:'#4aa8d8', z:[1,8]},
  {id:'hcl',    sym:'HCl',     en:'Hydrochloric acid',ar:'حمض الهيدروكلوريك',    c:'#d9e04a', z:[1,17]},
  {id:'naoh',   sym:'NaOH',    en:'Sodium hydroxide', ar:'هيدروكسيد الصوديوم',   c:'#cdd6dd', z:[11,8,1]},
  {id:'na',     sym:'Na',      en:'Sodium metal',     ar:'فلز الصوديوم',         c:'#e6e6dc', z:[11]},
  {id:'k',      sym:'K',       en:'Potassium metal',  ar:'فلز البوتاسيوم',       c:'#b06fd0', z:[19]},
  {id:'h2o2',   sym:'H₂O₂',    en:'Hydrogen peroxide',ar:'بيروكسيد الهيدروجين',  c:'#dff2f7', z:[1,8]},
  {id:'ki',     sym:'KI',      en:'Potassium iodide', ar:'يوديد البوتاسيوم',     c:'#7b569b', z:[19,53]},
  {id:'cuso4',  sym:'CuSO₄',   en:'Copper sulfate',   ar:'كبريتات النحاس',       c:'#2f8fbf', z:[29,16,8]},
  {id:'agno3',  sym:'AgNO₃',   en:'Silver nitrate',   ar:'نترات الفضة',          c:'#dfe6ea', z:[47,7,8]},
  {id:'nacl',   sym:'NaCl',    en:'Table salt',       ar:'ملح الطعام',           c:'#f4f4f4', z:[11,17]},
  {id:'nahco3', sym:'NaHCO₃',  en:'Baking soda',      ar:'بيكربونات الصوديوم',   c:'#f2efe4', z:[11,1,6,8]},
  {id:'aceti',  sym:'CH₃COOH', en:'Vinegar',          ar:'الخل',                 c:'#e8d9a0', z:[6,1,8]},
  {id:'mg',     sym:'Mg',      en:'Magnesium ribbon', ar:'شريط المغنيسيوم',      c:'#d9d9d9', z:[12]},
  {id:'fe',     sym:'Fe',      en:'Iron filings',     ar:'برادة الحديد',         c:'#8a6a4a', z:[26]},
  {id:'phen',   sym:'Ph',      en:'Indicator',        ar:'كاشف لوني',            c:'#ffb3d9', z:[6,1,8]},
  {id:'bleach', sym:'NaOCl',   en:'Bleach',           ar:'مبيّض كلوري',          c:'#eaf6d9', z:[11,8,17]},
  {id:'nh3',    sym:'NH₃',     en:'Ammonia cleaner',  ar:'منظّف الأمونيا',       c:'#cfe8d0', z:[7,1]},
  {id:'heat',   sym:'🔥',      en:'Burner',           ar:'موقد اللهب',           c:'#f2a541', z:[]}
];
var RG = {}; REAGENTS.forEach(function(r){ RG[r.id]=r; });


// =======================================================================
// REACTION DATABASE
// -----------------------------------------------------------------------
// RX stores the possible pairs of reagents and their results.
// Instead of hard-coding every possible click sequence, the game creates
// one normalized key for a pair and looks that key up in RX.
// =======================================================================
/* ---------- reactions ----------
   kind: ok | meh | gas | boom | fire
   int: 0-10 intensity  |  col: liquid color  |  fx: foam|steam|precip|flame|crystal
*/

function K(a,b){ return [a,b].sort().join('+'); }

// Reaction lookup table. The normalized pair key is mapped to one reaction object.

var RX = {};
function rx(a,b,o){ RX[K(a,b)] = o; }

rx('hcl','naoh',{kind:'ok',int:4,col:'#7fd6a0',fx:'steam',
  eq:'HCl + NaOH → NaCl + H₂O',
  en:{n:'Neutralization',w:'A strong acid and a strong base cancel each other out. What is left is salt water — and heat, which is why the beaker warms up.',l:'Neutralization always releases heat. Add base too fast and the heat comes faster than the beaker can lose it.'},
  ar:{n:'تعادُل',w:'حمض قوي وقاعدة قوية يلغي كل منهما الآخر. الناتج ماء وملح — وحرارة، ولهذا يسخن الكأس.',l:'التعادل يطلق حرارة دائماً. أضف القاعدة بسرعة وستأتي الحرارة أسرع مما يستطيع الكأس تبديده.'}});

rx('hcl','nahco3',{kind:'gas',int:5,col:'#cfe3ea',fx:'foam',
  eq:'HCl + NaHCO₃ → NaCl + H₂O + CO₂↑',
  en:{n:'Carbon dioxide',w:'The acid pulls the carbonate apart and carbon dioxide comes off as a fizz. The gas is heavier than air, so it sits in the beaker.',l:'This is the reaction inside every fire extinguisher and every antacid tablet.'},
  ar:{n:'ثاني أكسيد الكربون',w:'الحمض يفكّك الكربونات فينطلق ثاني أكسيد الكربون على شكل فوران. الغاز أثقل من الهواء فيبقى داخل الكأس.',l:'هذا هو التفاعل نفسه داخل كل طفاية حريق وكل قرص مضاد للحموضة.'}});

rx('aceti','nahco3',{kind:'gas',int:6,col:'#e6efdd',fx:'foam',
  eq:'CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑',
  en:{n:'The classic volcano',w:'A weak acid this time, so the fizz is slower and lasts longer than with hydrochloric acid. Same gas, gentler release.',l:'Acid strength changes the speed of a reaction, not always the products.'},
  ar:{n:'البركان الكلاسيكي',w:'حمض ضعيف هذه المرة، فالفوران أبطأ ويدوم أطول من حمض الهيدروكلوريك. الغاز نفسه لكن الانطلاق أهدأ.',l:'قوة الحمض تغيّر سرعة التفاعل، وليس بالضرورة نواتجه.'}});

rx('hcl','mg',{kind:'gas',int:6,col:'#dbe7ec',fx:'foam',
  eq:'Mg + 2HCl → MgCl₂ + H₂↑',
  en:{n:'Hydrogen released',w:'The metal dissolves and hydrogen bubbles off. The beaker gets noticeably hot. Hydrogen is flammable, which matters if there is a flame nearby.',l:'Never run a hydrogen-producing reaction next to an open burner.'},
  ar:{n:'انطلاق الهيدروجين',w:'الفلز يذوب وينطلق الهيدروجين فقاعات. يسخن الكأس بوضوح. والهيدروجين قابل للاشتعال، وهذا مهم لو كان هناك لهب قريب.',l:'لا تُجرِ تفاعلاً منتجاً للهيدروجين بجوار موقد مكشوف أبداً.'}});

rx('h2o','na',{kind:'fire',int:8,col:'#ffe08a',fx:'flame',
  eq:'2Na + 2H₂O → 2NaOH + H₂↑',
  en:{n:'Sodium on water',w:'The metal skids across the surface, melts into a ball and lights the hydrogen it is making. Orange flame, then a sharp crack.',l:'Alkali metals get more violent as you go down the group. Sodium is the warning. Potassium is the punishment.'},
  ar:{n:'الصوديوم على الماء',w:'الفلز ينزلق على السطح، ينصهر إلى كرة، ويشعل الهيدروجين الذي ينتجه. لهب برتقالي ثم فرقعة حادة.',l:'فلزات القلويات تزداد عنفاً كلما نزلت في المجموعة. الصوديوم تحذير. البوتاسيوم عقاب.'}});

rx('h2o','k',{kind:'boom',int:10,col:'#c99ae0',fx:'flame',
  eq:'2K + 2H₂O → 2KOH + H₂↑',
  en:{n:'Potassium on water',w:'Same reaction as sodium but far faster. The heat ignites the hydrogen instantly and the whole thing detonates in a lilac flash.',l:'The reaction did not change — the rate did. Rate is what turns chemistry into an accident.'},
  ar:{n:'البوتاسيوم على الماء',w:'التفاعل نفسه كالصوديوم لكنه أسرع بكثير. الحرارة تشعل الهيدروجين فوراً وينفجر كل شيء بومضة بنفسجية.',l:'التفاعل لم يتغير — بل سرعته. السرعة هي ما يحوّل الكيمياء إلى حادث.'}});

rx('hcl','k',{kind:'boom',int:10,col:'#d0a8e8',fx:'flame',
  eq:'2K + 2HCl → 2KCl + H₂↑',
  en:{n:'Potassium in acid',w:'Everything wrong with potassium and water, but faster, because the acid supplies hydrogen ions much more readily.',l:'If a reagent is violent with water, assume it is worse with acid.'},
  ar:{n:'البوتاسيوم في حمض',w:'كل ما هو خاطئ في البوتاسيوم مع الماء، لكن أسرع، لأن الحمض يوفّر أيونات الهيدروجين بسهولة أكبر.',l:'إذا كانت المادة عنيفة مع الماء، فافترض أنها أسوأ مع الحمض.'}});

rx('hcl','na',{kind:'boom',int:9,col:'#ffd27a',fx:'flame',
  eq:'2Na + 2HCl → 2NaCl + H₂↑',
  en:{n:'Sodium in acid',w:'Rapid, hot, and it throws droplets of acid out of the beaker. This is the case where a blast shield actually earns its place.',l:'Splash is a hazard on its own, even without a real explosion.'},
  ar:{n:'الصوديوم في حمض',w:'سريع وحارّ ويقذف قطرات الحمض خارج الكأس. هنا تحديداً يثبت الحاجز الواقي فائدته.',l:'الرذاذ خطر بحد ذاته، حتى بدون انفجار حقيقي.'}});

rx('h2o2','ki',{kind:'ok',int:7,col:'#f5e7c0',fx:'foam',
  eq:'2H₂O₂ --KI--> 2H₂O + O₂↑',
  en:{n:'Elephant toothpaste',w:'The iodide is a catalyst. It is not consumed — it just gives the peroxide an easier path to break down, and the oxygen foams out fast.',l:'A catalyst changes how fast, never how much. Fish the iodide out afterwards and it is unchanged.'},
  ar:{n:'معجون الفيل',w:'اليوديد عامل حفّاز. لا يُستهلك — بل يعطي البيروكسيد مساراً أسهل للتفكك، فيندفع الأكسجين رغوةً.',l:'الحفّاز يغيّر السرعة لا الكمية. استخرج اليوديد بعدها وستجده كما هو.'}});

rx('cuso4','h2o',{kind:'ok',int:2,col:'#2f8fbf',fx:'crystal',
  eq:'CuSO₄ + 5H₂O → CuSO₄·5H₂O',
  en:{n:'Copper sulfate dissolves',w:'The white powder takes water into its crystal structure and turns that deep blue. The blue is the water, not the copper alone.',l:'Colour can be a test. Blue means hydrated, white means dry.'},
  ar:{n:'ذوبان كبريتات النحاس',w:'المسحوق الأبيض يدخل الماء في بنيته البلورية فيتحول إلى الأزرق الغامق. الأزرق سببه الماء لا النحاس وحده.',l:'اللون قد يكون اختباراً. الأزرق يعني مُماهاً، والأبيض يعني جافاً.'}});

rx('cuso4','fe',{kind:'ok',int:3,col:'#8fa86a',fx:'precip',
  eq:'Fe + CuSO₄ → FeSO₄ + Cu',
  en:{n:'Displacement',w:'Iron is more reactive than copper, so it pushes the copper out of solution. The filings come out coated in bright copper and the blue fades to pale green.',l:'The reactivity series is a queue. A metal higher up always displaces one below it.'},
  ar:{n:'إحلال',w:'الحديد أنشط من النحاس فيزيح النحاس من المحلول. تخرج البرادة مغطاة بنحاس لامع ويبهت الأزرق إلى أخضر شاحب.',l:'سلسلة النشاط طابور. الفلز الأعلى يزيح دائماً من هو أدنى منه.'}});

rx('agno3','nacl',{kind:'ok',int:2,col:'#e8ecef',fx:'precip',
  eq:'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
  en:{n:'White precipitate',w:'Two clear liquids meet and a solid appears out of nowhere. Silver chloride will not stay dissolved, so it drops out as a milky cloud.',l:'This is the standard test for chloride. Leave it in sunlight and it darkens — that is photography.'},
  ar:{n:'راسب أبيض',w:'سائلان صافيان يلتقيان فيظهر صلب من العدم. كلوريد الفضة لا يبقى ذائباً فيترسّب كسحابة حليبية.',l:'هذا هو الاختبار القياسي للكلوريد. اتركه في الشمس فيسودّ — وهذا أصل التصوير الفوتوغرافي.'}});

rx('cuso4','naoh',{kind:'ok',int:3,col:'#2f6fbf',fx:'precip',
  eq:'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄',
  en:{n:'Copper hydroxide',w:'A pale blue jelly forms and sinks. It is copper hydroxide, and it refuses to dissolve.',l:'Precipitate colour identifies the metal. Blue gel means copper, almost every time.'},
  ar:{n:'هيدروكسيد النحاس',w:'يتكوّن هلام أزرق شاحب ويهبط. إنه هيدروكسيد النحاس، ويرفض الذوبان.',l:'لون الراسب يحدد الفلز. الهلام الأزرق يعني نحاساً في أغلب الحالات.'}});

rx('h2o','naoh',{kind:'meh',int:5,col:'#dbe6ea',fx:'steam',
  eq:'NaOH(s) + H₂O → Na⁺(aq) + OH⁻(aq)',
  en:{n:'It just gets hot',w:'No new substance, but a lot of heat. Dissolving is not always a quiet process — this one can boil the water if you rush it.',l:'Always add the solid to the water, never water to the solid. The reverse spits boiling caustic back at you.'},
  ar:{n:'مجرد سخونة',w:'لا مادة جديدة، لكن حرارة كثيرة. الذوبان ليس دائماً هادئاً — هذا قد يغلي الماء إن استعجلت.',l:'أضف الصلب إلى الماء دائماً، لا الماء إلى الصلب. العكس يقذف قلوياً غالياً في وجهك.'}});

rx('agno3','hcl',{kind:'ok',int:2,col:'#e4e9ec',fx:'precip',
  eq:'AgNO₃ + HCl → AgCl↓ + HNO₃',
  en:{n:'Chloride confirmed',w:'The same white curd as with table salt, because the chloride ion is what matters, not what it came attached to.',l:'Tests detect ions, not compounds. Any chloride source gives this result.'},
  ar:{n:'تأكيد الكلوريد',w:'نفس الراسب الأبيض كما مع ملح الطعام، لأن المهم هو أيون الكلوريد لا ما كان مرتبطاً به.',l:'الاختبارات تكشف الأيونات لا المركبات. أي مصدر للكلوريد يعطي النتيجة نفسها.'}});

rx('heat','mg',{kind:'ok',int:8,col:'#ffffff',fx:'flame',
  eq:'2Mg + O₂ → 2MgO',
  en:{n:'Blinding white flame',w:'Magnesium burns with a light so bright it can damage your eyes directly. The ash left behind is magnesium oxide, a white powder.',l:'Some hazards are not chemical burns — they are light. Goggles are not optional here.'},
  ar:{n:'لهب أبيض مبهر',w:'المغنيسيوم يحترق بضوء شديد يمكن أن يؤذي عينيك مباشرة. الرماد المتبقي أكسيد المغنيسيوم، مسحوق أبيض.',l:'ليست كل الأخطار حروقاً كيميائية — بعضها ضوء. النظارة ليست اختيارية هنا.'}});

rx('heat','nacl',{kind:'ok',int:4,col:'#ffb347',fx:'flame',
  eq:'Na⁺ --heat--> orange emission (589 nm)',
  en:{n:'Flame test: sodium',w:'The heat kicks electrons up an energy level. When they fall back they release exactly one colour — the deep orange of every street lamp.',l:'Each metal has its own flame colour. It is a fingerprint you can see.'},
  ar:{n:'اختبار اللهب: الصوديوم',w:'الحرارة ترفع الإلكترونات مستوى طاقة. وحين تعود تطلق لوناً واحداً بالضبط — برتقالي مصابيح الشوارع.',l:'لكل فلز لون لهب خاص. إنها بصمة يمكنك رؤيتها.'}});

rx('heat','cuso4',{kind:'ok',int:4,col:'#eceae2',fx:'steam',
  eq:'CuSO₄·5H₂O --heat--> CuSO₄ + 5H₂O↑',
  en:{n:'Driving off the water',w:'The blue crystals give up their water and go chalky white. Add water again and the blue comes straight back.',l:'A reversible change. Nothing was destroyed — only rearranged.'},
  ar:{n:'طرد الماء',w:'البلورات الزرقاء تتخلى عن مائها وتصبح بيضاء طباشيرية. أضف الماء مجدداً ويعود الأزرق فوراً.',l:'تغيّر عكوس. لم يُدمَّر شيء — بل أُعيد ترتيبه.'}});

rx('naoh','phen',{kind:'ok',int:2,col:'#ff6fae',fx:'',
  eq:'Ph (colourless) → Ph²⁻ (pink) above pH 8.2',
  en:{n:'Indicator turns pink',w:'The indicator molecule changes shape when it loses a proton, and the new shape absorbs different light. Pink means basic.',l:'Indicators do not measure pH. They flip at one point and tell you which side you are on.'},
  ar:{n:'الكاشف يتحول وردياً',w:'جزيء الكاشف يغيّر شكله حين يفقد بروتوناً، والشكل الجديد يمتص ضوءاً مختلفاً. الوردي يعني قاعدياً.',l:'الكواشف لا تقيس الأس الهيدروجيني. إنها تنقلب عند نقطة واحدة وتخبرك في أي جهة أنت.'}});

rx('hcl','phen',{kind:'meh',int:1,col:'#dfe7ea',fx:'',
  eq:'Ph stays colourless below pH 8.2',
  en:{n:'Indicator stays clear',w:'Nothing to see, and that is the information. Phenolphthalein is colourless in anything acidic or neutral.',l:'An indicator that does nothing has still ruled out half the pH scale for you.'},
  ar:{n:'الكاشف يبقى شفافاً',w:'لا شيء يُرى، وهذا بحد ذاته معلومة. الفينولفثالين عديم اللون في كل ما هو حمضي أو متعادل.',l:'الكاشف الذي لا يفعل شيئاً قد استبعد لك نصف مقياس الأس الهيدروجيني.'}});

rx('bleach','nh3',{kind:'gas',int:9,col:'#c8dd7a',fx:'',
  eq:'NaOCl + NH₃ → chloramine vapour',
  en:{n:'Toxic gas',w:'These two household cleaners together give off a gas that attacks the lungs immediately. There is no safe amount and no safe way to do this outside a fume hood.',l:'This is why every bleach bottle says do not mix with other cleaners. Now you have seen the reason instead of just the warning.'},
  ar:{n:'غاز سام',w:'هذان المنظفان المنزليان معاً يطلقان غازاً يهاجم الرئتين فوراً. لا توجد كمية آمنة ولا طريقة آمنة خارج شفّاط الأبخرة.',l:'لهذا تكتب كل عبوة مبيّض: لا تخلطه مع منظفات أخرى. الآن رأيت السبب بدل أن تقرأ التحذير فقط.'}});

rx('bleach','hcl',{kind:'gas',int:10,col:'#d8e884',fx:'',
  eq:'NaOCl + 2HCl → NaCl + H₂O + Cl₂↑',
  en:{n:'Chlorine gas',w:'Acid strips the chlorine straight out of the bleach as a yellow-green gas. It is denser than air, so it pools rather than drifts away.',l:'Bleach plus any acid — including some limescale removers — is the same accident. Read labels, not just names.'},
  ar:{n:'غاز الكلور',w:'الحمض ينتزع الكلور مباشرة من المبيّض على شكل غاز أصفر مخضر. وهو أكثف من الهواء فيتجمّع بدل أن ينتشر.',l:'المبيّض مع أي حمض — بما فيه بعض مزيلات الترسبات — هو الحادث نفسه. اقرأ المكوّنات لا الأسماء.'}});

rx('heat','h2o2',{kind:'fire',int:8,col:'#eaf6fa',fx:'foam',
  eq:'2H₂O₂ --heat--> 2H₂O + O₂↑',
  en:{n:'Runaway decomposition',w:'Heat makes the peroxide break down faster, which releases more heat, which speeds it up again. That loop is what runaway means.',l:'Any reaction that produces the thing that accelerates it can run away. Watch for the loop.'},
  ar:{n:'تفكك جامح',w:'الحرارة تسرّع تفكك البيروكسيد، فيطلق حرارة أكثر، فيزداد سرعة. هذه الحلقة هي معنى «الجموح».',l:'أي تفاعل ينتج ما يسرّعه قد يجمح. ابحث دائماً عن الحلقة.'}});

rx('heat','k',{kind:'boom',int:10,col:'#c99ae0',fx:'flame',
  eq:'K --heat--> lilac emission',
  en:{n:'Potassium meets flame',w:'You wanted a flame test. You got a flame test and then a small crater. Potassium ignites in air well before you finish looking at the colour.',l:'Test alkali metals through glass, at distance, in tiny amounts. Or watch a video.'},
  ar:{n:'البوتاسيوم يلاقي اللهب',w:'أردت اختبار لهب. حصلت على اختبار لهب ثم حفرة صغيرة. البوتاسيوم يشتعل في الهواء قبل أن تنتهي من ملاحظة اللون.',l:'اختبر فلزات القلويات خلف الزجاج، من بعيد، وبكميات ضئيلة. أو شاهد مقطعاً مصوّراً.'}});

rx('heat','na',{kind:'fire',int:8,col:'#ffc46b',fx:'flame',
  eq:'Na --heat--> orange emission',
  en:{n:'Sodium burns',w:'A steady orange flame, and the metal melts as it goes. Manageable if it stays small, unmanageable the moment it touches water.',l:'Never put water on a burning alkali metal. It feeds the fire it is supposed to stop.'},
  ar:{n:'احتراق الصوديوم',w:'لهب برتقالي ثابت، والفلز ينصهر أثناء ذلك. يمكن التحكم به ما دام صغيراً، ويستحيل ذلك لحظة ملامسته الماء.',l:'لا تسكب ماءً على فلز قلوي مشتعل أبداً. إنه يغذّي النار التي يُفترض أن يطفئها.'}});

rx('h2o','nacl',{kind:'ok',int:1,col:'#a8cfe0',fx:'',
  eq:'NaCl(s) → Na⁺(aq) + Cl⁻(aq)',
  en:{n:'Salt dissolves',w:'Water molecules surround each ion and pull the crystal apart. No new substance is made — the salt is still there, just scattered.',l:'Dissolving is a physical change. Boil the water off and the salt comes back unchanged.'},
  ar:{n:'ذوبان الملح',w:'جزيئات الماء تحيط بكل أيون وتفكك البلورة. لا تتكون مادة جديدة — الملح ما زال موجوداً لكنه متفرق.',l:'الذوبان تغيّر فيزيائي. بخّر الماء ويعود الملح كما كان.'}});

rx('fe','h2o',{kind:'meh',int:1,col:'#9a7550',fx:'',
  eq:'4Fe + 3O₂ + xH₂O → Fe₂O₃·xH₂O',
  en:{n:'Too slow to watch',w:'It is reacting — that is rust — but it takes days, not seconds. Water alone is not enough either; it needs oxygen too.',l:'Reaction rate is a variable like any other. Slow is not the same as nothing.'},
  ar:{n:'أبطأ من أن يُرى',w:'إنه يتفاعل — هذا هو الصدأ — لكنه يحتاج أياماً لا ثوانٍ. والماء وحده لا يكفي؛ يلزمه الأكسجين أيضاً.',l:'سرعة التفاعل متغيّر كغيره. البطيء ليس مثل المعدوم.'}});

rx('mg','cuso4',{kind:'ok',int:5,col:'#b8c48a',fx:'precip',
  eq:'Mg + CuSO₄ → MgSO₄ + Cu',
  en:{n:'A hotter displacement',w:'Same idea as iron, but magnesium sits much higher in the reactivity series, so it happens fast and the solution heats up sharply.',l:'The bigger the gap in the reactivity series, the more energy comes out.'},
  ar:{n:'إحلال أشد حرارة',w:'الفكرة نفسها كالحديد، لكن المغنيسيوم أعلى بكثير في سلسلة النشاط، فيحدث بسرعة ويسخن المحلول بحدة.',l:'كلما اتسعت الفجوة في سلسلة النشاط، خرجت طاقة أكبر.'}});

rx('heat','fe',{kind:'meh',int:3,col:'#a37a52',fx:'flame',
  eq:'3Fe + 2O₂ → Fe₃O₄',
  en:{n:'Sparks, no drama',w:'Solid iron barely burns. Grind it to a fine powder and the same metal throws sparks — surface area is the whole difference.',l:'Powdered metals are far more dangerous than solid ones. Surface area is a hazard.'},
  ar:{n:'شرر بلا إثارة',w:'الحديد الصلب لا يكاد يحترق. اطحنه مسحوقاً ناعماً وسيقذف الفلز نفسه شرراً — المساحة السطحية هي الفارق كله.',l:'الفلزات المسحوقة أخطر بكثير من الصلبة. المساحة السطحية خطر بحد ذاته.'}});

rx('heat','h2o',{kind:'meh',int:3,col:'#bcd8e4',fx:'steam',
  eq:'H₂O(l) → H₂O(g)',
  en:{n:'You boiled water',w:'A physical change and nothing more. Useful, though — steam is how a lot of lab burns actually happen.',l:'Steam carries more energy than the water it came from. Treat it with more respect, not less.'},
  ar:{n:'غليت الماء',w:'تغيّر فيزيائي لا أكثر. لكنه مفيد — البخار سبب كثير من حروق المختبرات فعلياً.',l:'البخار يحمل طاقة أكبر من الماء الذي جاء منه. عامله باحترام أكبر لا أقل.'}});

rx('h2o2','h2o',{kind:'meh',int:1,col:'#cfe6ee',fx:'',
  eq:'H₂O₂(aq) diluted',
  en:{n:'Just diluted',w:'Weaker peroxide, nothing else. Concentration changes how a reagent behaves without changing what it is.',l:'Concentration is a hidden variable behind half of all lab surprises.'},
  ar:{n:'مجرد تخفيف',w:'بيروكسيد أضعف، لا أكثر. التركيز يغيّر سلوك المادة دون أن يغيّر ماهيتها.',l:'التركيز متغيّر خفي وراء نصف مفاجآت المختبر.'}});

rx('nh3','hcl',{kind:'ok',int:5,col:'#eef2f4',fx:'steam',
  eq:'NH₃ + HCl → NH₄Cl (white smoke)',
  en:{n:'Smoke rings',w:'Two invisible gases meet in the air above the beaker and make a solid — a soft white smoke of ammonium chloride that hangs there.',l:'A gas plus a gas can give you a solid. States are not fixed rules.'},
  ar:{n:'حلقات دخان',w:'غازان غير مرئيين يلتقيان في الهواء فوق الكأس فيصنعان صلباً — دخان أبيض ناعم من كلوريد الأمونيوم يبقى معلقاً.',l:'غاز مع غاز قد يعطيك صلباً. الحالات ليست قواعد ثابتة.'}});

rx('ki','h2o',{kind:'ok',int:1,col:'#b9a4d0',fx:'',
  eq:'KI(s) → K⁺(aq) + I⁻(aq)',
  en:{n:'Dissolves quietly',w:'A clean, cool dissolution. Now the iodide is free in solution and ready to act as a catalyst.',l:'Preparing a reagent is a step, not a waste of a turn.'},
  ar:{n:'ذوبان هادئ',w:'ذوبان نظيف وبارد. الآن أصبح اليوديد حراً في المحلول وجاهزاً ليعمل كحفّاز.',l:'تحضير المادة خطوة، وليست إضاعة لدور.'}});

rx('agno3','cuso4',{kind:'meh',int:1,col:'#5f9fc0',fx:'',
  eq:'no reaction',
  en:{n:'Nothing happens',w:'Copper cannot displace silver from solution — silver is the less reactive of the two, so it stays put.',l:'Displacement only runs one way. Check the series before you predict.'},
  ar:{n:'لا شيء يحدث',w:'النحاس لا يستطيع إزاحة الفضة من المحلول — الفضة أقل نشاطاً منه، فتبقى مكانها.',l:'الإحلال يسير في اتجاه واحد. راجع سلسلة النشاط قبل أن تتوقع.'}});

rx('heat','bleach',{kind:'gas',int:8,col:'#d4e690',fx:'',
  eq:'NaOCl --heat--> Cl₂↑ + other products',
  en:{n:'Heated bleach',w:'Warm it and it starts shedding chlorine on its own. No second reagent needed.',l:'Storage matters. Some chemicals become hazards just by being kept somewhere warm.'},
  ar:{n:'مبيّض مُسخَّن',w:'سخّنه وسيبدأ بإطلاق الكلور من تلقاء نفسه. لا حاجة لمادة ثانية.',l:'طريقة التخزين مهمة. بعض المواد تصبح خطرة لمجرد حفظها في مكان دافئ.'}});
/* ---------- periodic table: num|sym|en|ar|mass|cat|row|col ---------- */
var PT_RAW = [
"1|H|Hydrogen|هيدروجين|1.008|nm|1|1",
"2|He|Helium|هيليوم|4.003|ng|1|18",
"3|Li|Lithium|ليثيوم|6.94|am|2|1",
"4|Be|Beryllium|بيريليوم|9.012|ae|2|2",
"5|B|Boron|بورون|10.81|me|2|13",
"6|C|Carbon|كربون|12.011|nm|2|14",
"7|N|Nitrogen|نيتروجين|14.007|nm|2|15",
"8|O|Oxygen|أكسجين|15.999|nm|2|16",
"9|F|Fluorine|فلور|18.998|hal|2|17",
"10|Ne|Neon|نيون|20.180|ng|2|18",
"11|Na|Sodium|صوديوم|22.990|am|3|1",
"12|Mg|Magnesium|مغنيسيوم|24.305|ae|3|2",
"13|Al|Aluminium|ألومنيوم|26.982|pm|3|13",
"14|Si|Silicon|سيليكون|28.085|me|3|14",
"15|P|Phosphorus|فوسفور|30.974|nm|3|15",
"16|S|Sulfur|كبريت|32.06|nm|3|16",
"17|Cl|Chlorine|كلور|35.45|hal|3|17",
"18|Ar|Argon|أرغون|39.948|ng|3|18",
"19|K|Potassium|بوتاسيوم|39.098|am|4|1",
"20|Ca|Calcium|كالسيوم|40.078|ae|4|2",
"21|Sc|Scandium|سكانديوم|44.956|tm|4|3",
"22|Ti|Titanium|تيتانيوم|47.867|tm|4|4",
"23|V|Vanadium|فاناديوم|50.942|tm|4|5",
"24|Cr|Chromium|كروم|51.996|tm|4|6",
"25|Mn|Manganese|منغنيز|54.938|tm|4|7",
"26|Fe|Iron|حديد|55.845|tm|4|8",
"27|Co|Cobalt|كوبالت|58.933|tm|4|9",
"28|Ni|Nickel|نيكل|58.693|tm|4|10",
"29|Cu|Copper|نحاس|63.546|tm|4|11",
"30|Zn|Zinc|زنك|65.38|tm|4|12",
"31|Ga|Gallium|غاليوم|69.723|pm|4|13",
"32|Ge|Germanium|جرمانيوم|72.630|me|4|14",
"33|As|Arsenic|زرنيخ|74.922|me|4|15",
"34|Se|Selenium|سيلينيوم|78.971|nm|4|16",
"35|Br|Bromine|بروم|79.904|hal|4|17",
"36|Kr|Krypton|كريبتون|83.798|ng|4|18",
"37|Rb|Rubidium|روبيديوم|85.468|am|5|1",
"38|Sr|Strontium|سترونشيوم|87.62|ae|5|2",
"39|Y|Yttrium|إيتريوم|88.906|tm|5|3",
"40|Zr|Zirconium|زركونيوم|91.224|tm|5|4",
"41|Nb|Niobium|نيوبيوم|92.906|tm|5|5",
"42|Mo|Molybdenum|موليبدينوم|95.95|tm|5|6",
"43|Tc|Technetium|تكنيشيوم|98|tm|5|7",
"44|Ru|Ruthenium|روثينيوم|101.07|tm|5|8",
"45|Rh|Rhodium|روديوم|102.906|tm|5|9",
"46|Pd|Palladium|بالاديوم|106.42|tm|5|10",
"47|Ag|Silver|فضة|107.868|tm|5|11",
"48|Cd|Cadmium|كادميوم|112.414|tm|5|12",
"49|In|Indium|إنديوم|114.818|pm|5|13",
"50|Sn|Tin|قصدير|118.710|pm|5|14",
"51|Sb|Antimony|أنتيمون|121.760|me|5|15",
"52|Te|Tellurium|تيلوريوم|127.60|me|5|16",
"53|I|Iodine|يود|126.904|hal|5|17",
"54|Xe|Xenon|زينون|131.293|ng|5|18",
"55|Cs|Caesium|سيزيوم|132.905|am|6|1",
"56|Ba|Barium|باريوم|137.327|ae|6|2",
"57|La|Lanthanum|لانثانوم|138.905|lan|8|3",
"58|Ce|Cerium|سيريوم|140.116|lan|8|4",
"59|Pr|Praseodymium|براسيوديميوم|140.908|lan|8|5",
"60|Nd|Neodymium|نيوديميوم|144.242|lan|8|6",
"61|Pm|Promethium|بروميثيوم|145|lan|8|7",
"62|Sm|Samarium|ساماريوم|150.36|lan|8|8",
"63|Eu|Europium|يوروبيوم|151.964|lan|8|9",
"64|Gd|Gadolinium|جادولينيوم|157.25|lan|8|10",
"65|Tb|Terbium|تربيوم|158.925|lan|8|11",
"66|Dy|Dysprosium|ديسبروسيوم|162.500|lan|8|12",
"67|Ho|Holmium|هولميوم|164.930|lan|8|13",
"68|Er|Erbium|إربيوم|167.259|lan|8|14",
"69|Tm|Thulium|ثوليوم|168.934|lan|8|15",
"70|Yb|Ytterbium|إيتربيوم|173.045|lan|8|16",
"71|Lu|Lutetium|لوتيتيوم|174.967|lan|8|17",
"72|Hf|Hafnium|هافنيوم|178.49|tm|6|4",
"73|Ta|Tantalum|تانتالوم|180.948|tm|6|5",
"74|W|Tungsten|تنغستن|183.84|tm|6|6",
"75|Re|Rhenium|رينيوم|186.207|tm|6|7",
"76|Os|Osmium|أوزميوم|190.23|tm|6|8",
"77|Ir|Iridium|إيريديوم|192.217|tm|6|9",
"78|Pt|Platinum|بلاتين|195.084|tm|6|10",
"79|Au|Gold|ذهب|196.967|tm|6|11",
"80|Hg|Mercury|زئبق|200.592|tm|6|12",
"81|Tl|Thallium|ثاليوم|204.38|pm|6|13",
"82|Pb|Lead|رصاص|207.2|pm|6|14",
"83|Bi|Bismuth|بزموت|208.980|pm|6|15",
"84|Po|Polonium|بولونيوم|209|pm|6|16",
"85|At|Astatine|أستاتين|210|hal|6|17",
"86|Rn|Radon|رادون|222|ng|6|18",
"87|Fr|Francium|فرانسيوم|223|am|7|1",
"88|Ra|Radium|راديوم|226|ae|7|2",
"89|Ac|Actinium|أكتينيوم|227|act|9|3",
"90|Th|Thorium|ثوريوم|232.038|act|9|4",
"91|Pa|Protactinium|بروتكتينيوم|231.036|act|9|5",
"92|U|Uranium|يورانيوم|238.029|act|9|6",
"93|Np|Neptunium|نبتونيوم|237|act|9|7",
"94|Pu|Plutonium|بلوتونيوم|244|act|9|8",
"95|Am|Americium|أمريسيوم|243|act|9|9",
"96|Cm|Curium|كوريوم|247|act|9|10",
"97|Bk|Berkelium|بركليوم|247|act|9|11",
"98|Cf|Californium|كاليفورنيوم|251|act|9|12",
"99|Es|Einsteinium|أينشتاينيوم|252|act|9|13",
"100|Fm|Fermium|فرميوم|257|act|9|14",
"101|Md|Mendelevium|مندليفيوم|258|act|9|15",
"102|No|Nobelium|نوبليوم|259|act|9|16",
"103|Lr|Lawrencium|لورنسيوم|266|act|9|17",
"104|Rf|Rutherfordium|رذرفورديوم|267|tm|7|4",
"105|Db|Dubnium|دوبنيوم|268|tm|7|5",
"106|Sg|Seaborgium|سيبورجيوم|269|tm|7|6",
"107|Bh|Bohrium|بوريوم|270|tm|7|7",
"108|Hs|Hassium|هاسيوم|269|tm|7|8",
"109|Mt|Meitnerium|مايتنريوم|278|unk|7|9",
"110|Ds|Darmstadtium|دارمشتاتيوم|281|unk|7|10",
"111|Rg|Roentgenium|رونتجينيوم|282|unk|7|11",
"112|Cn|Copernicium|كوبرنيسيوم|285|tm|7|12",
"113|Nh|Nihonium|نيهونيوم|286|unk|7|13",
"114|Fl|Flerovium|فليروفيوم|289|unk|7|14",
"115|Mc|Moscovium|موسكوفيوم|290|unk|7|15",
"116|Lv|Livermorium|ليفرموريوم|293|unk|7|16",
"117|Ts|Tennessine|تينيسين|294|unk|7|17",
"118|Og|Oganesson|أوغانيسون|294|unk|7|18"
];

var ELEMENTS = PT_RAW.map(function(s){
  var p = s.split('|');
  return {z:+p[0], sym:p[1], en:p[2], ar:p[3], m:p[4], cat:p[5], row:+p[6], col:+p[7]};
});
var CATS = {
  am :{c:'#f2a541', en:'Alkali metal',       ar:'فلز قلوي'},
  ae :{c:'#e8c46a', en:'Alkaline earth',     ar:'فلز قلوي ترابي'},
  tm :{c:'#8fb8cc', en:'Transition metal',   ar:'فلز انتقالي'},
  pm :{c:'#9fc4a8', en:'Post-transition',    ar:'فلز بعد انتقالي'},
  me :{c:'#c9b88f', en:'Metalloid',          ar:'شبه فلز'},
  nm :{c:'#7fd0a8', en:'Nonmetal',           ar:'لا فلز'},
  hal:{c:'#a8d84a', en:'Halogen',            ar:'هالوجين'},
  ng :{c:'#b9a0d8', en:'Noble gas',          ar:'غاز نبيل'},
  lan:{c:'#d9968f', en:'Lanthanide',         ar:'لانثانيد'},
  act:{c:'#c98fb8', en:'Actinide',           ar:'أكتينيد'},
  unk:{c:'#93a3aa', en:'Properties unknown', ar:'خصائص غير معروفة'}
};


/* ---------- levels ---------- */

var LEVELS = [
  {id:1, hint:{en:'Water plus table salt. Table salt is sodium chloride — the shelf shows the everyday name, the objective shows the chemical one.',ar:'ماء مع ملح الطعام. ملح الطعام هو كلوريد الصوديوم — الرف يعرض الاسم الدارج والهدف يعرض الاسم الكيميائي.'}, goal:{pair:['h2o','nacl']},
   en:{n:'Dissolve the salt',   d:'Get sodium chloride into solution.'},
   ar:{n:'أذب الملح',           d:'أدخل كلوريد الصوديوم في المحلول.'}},
  {id:2, hint:{en:'A strong acid and a strong base. HCl is the acid, NaOH is the base.',ar:'حمض قوي وقاعدة قوية. HCl هو الحمض وNaOH هي القاعدة.'}, goal:{pair:['hcl','naoh']},
   en:{n:'Neutralize the acid', d:'Cancel a strong acid with a strong base.'},
   ar:{n:'عادِل الحمض',         d:'ألغِ حمضاً قوياً بقاعدة قوية.'}},
  {id:3, hint:{en:'Anything that fizzes. Baking soda with either acid works. Keep the hood open to stay safe.',ar:'أي شيء يفور. بيكربونات الصوديوم مع أي حمض تنفع. أبقِ الشفّاط مفتوحاً لتبقى آمناً.'}, goal:{kind:'gas', safe:true},
   en:{n:'Make a gas safely',   d:'Produce any gas without hurting yourself.'},
   ar:{n:'أنتج غازاً بأمان',    d:'أنتج أي غاز دون أن تؤذي نفسك.'}},
  {id:4, hint:{en:'Two clear liquids that make a solid. Silver nitrate with a chloride, or copper sulfate with sodium hydroxide.',ar:'سائلان صافيان ينتجان صلباً. نترات الفضة مع كلوريد، أو كبريتات النحاس مع هيدروكسيد الصوديوم.'}, goal:{fx:'precip'},
   en:{n:'Make a precipitate',  d:'Turn two clear liquids into a solid.'},
   ar:{n:'كوّن راسباً',          d:'حوّل سائلين صافيين إلى صلب.'}},
  {id:5, hint:{en:'The burner plus a sodium compound. Table salt is the easiest one.',ar:'الموقد مع مركّب صوديوم. ملح الطعام أسهلها.'}, goal:{pair:['heat','nacl']},
   en:{n:'Flame test',          d:'Identify sodium by the colour it burns.'},
   ar:{n:'اختبار اللهب',        d:'تعرّف على الصوديوم من لون احتراقه.'}},
  {id:6, hint:{en:'Copper sulfate plus a metal that sits higher in the reactivity series. Iron filings.',ar:'كبريتات النحاس مع فلز أعلى منها في سلسلة النشاط. برادة الحديد.'}, goal:{pair:['cuso4','fe']},
   en:{n:'Displacement',        d:'Push copper out of solution with a more reactive metal.'},
   ar:{n:'إحلال',               d:'أزح النحاس من المحلول بفلز أنشط منه.'}},
  {id:7, hint:{en:'Hydrogen peroxide plus a catalyst. Potassium iodide is the catalyst.',ar:'بيروكسيد الهيدروجين مع حفّاز. يوديد البوتاسيوم هو الحفّاز.'}, goal:{pair:['h2o2','ki']},
   en:{n:'Catalysis',           d:'Speed up a reaction without being consumed by it.'},
   ar:{n:'حفز',                 d:'سرّع تفاعلاً دون أن تُستهلك فيه.'}},
  {id:8, hint:{en:'The indicator plus something basic. Sodium hydroxide is the base.',ar:'الكاشف مع مادة قاعدية. هيدروكسيد الصوديوم هي القاعدة.'}, goal:{pair:['naoh','phen']},
   en:{n:'Read the pH',         d:'Use an indicator to prove a solution is basic.'},
   ar:{n:'اقرأ الأس الهيدروجيني',d:'استخدم كاشفاً لتثبت أن المحلول قاعدي.'}},
  {id:9, hint:{en:'Sodium metal and water — but switch the blast shield on first, or it does not count.',ar:'فلز الصوديوم والماء — لكن شغّل الحاجز الواقي أولاً وإلا لن تُحتسب.'}, goal:{pair:['h2o','na'], gear:['shield'], safe:true},
   en:{n:'Sodium, contained',   d:'Run the alkali metal reaction behind a blast shield.'},
   ar:{n:'الصوديوم محتوىً',      d:'أجرِ تفاعل الفلز القلوي خلف حاجز واقٍ.'}},
  {id:10, hint:{en:'Open the fume hood first. Then mix bleach with the ammonia cleaner, or bleach with acid.',ar:'افتح الشفّاط أولاً. ثم اخلط المبيّض مع منظّف الأمونيا، أو المبيّض مع حمض.'}, goal:{kind:'gas', gear:['hood']},
   en:{n:'Contain the hazard',  d:'Produce a toxic gas with the hood open, and survive it.'},
   ar:{n:'احتوِ الخطر',          d:'أنتج غازاً ساماً والشفّاط مفتوح، وانجُ منه.'}},
  {id:11, hint:{en:'Goggles on, then burner plus magnesium ribbon.',ar:'ضع النظارة، ثم الموقد مع شريط المغنيسيوم.'}, goal:{pair:['heat','mg'], gear:['goggles']},
   en:{n:'Light as a hazard',   d:'Burn magnesium with your eyes protected.'},
   ar:{n:'الضوء كخطر',           d:'احرق المغنيسيوم وعيناك محميتان.'}},
  {id:12, hint:{en:'Goggles and blast shield on. Then potassium with water — the most violent pair in the game.',ar:'النظارة والحاجز الواقي معاً. ثم البوتاسيوم مع الماء — أعنف زوج في اللعبة.'}, goal:{kind:'boom', gear:['shield','goggles']},
   en:{n:'Controlled demolition',d:'Cause a real explosion in full gear. Yes, on purpose.'},
   ar:{n:'تدمير محسوب',          d:'تسبّب بانفجار حقيقي بكامل معداتك. نعم، عمداً.'}}
];

/* ---------- challenges ---------- */

var CHALLENGES = [
  {id:'boom1',  ic:'💥', need:1,  reward:25,  stat:'booms',
   en:{n:'First blast',      d:'Blow something up. Once.'},        ar:{n:'أول انفجار',      d:'فجّر شيئاً. مرة واحدة.'}},
  {id:'boom5',  ic:'🌋', need:5,  reward:150, stat:'booms',
   en:{n:'Serial offender',  d:'Five explosions. Dr. Fizz is worried.'}, ar:{n:'مُخالف متكرر',  d:'خمسة انفجارات. د. فِز قلق.'}},
  {id:'disc10', ic:'🔎', need:10, reward:120, stat:'discovered',
   en:{n:'Curious',          d:'Discover 10 different reactions.'}, ar:{n:'فضولي',           d:'اكتشف ١٠ تفاعلات مختلفة.'}},
  {id:'disc25', ic:'📚', need:25, reward:300, stat:'discovered',
   en:{n:'Thorough',         d:'Discover 25 different reactions.'}, ar:{n:'دقيق',            d:'اكتشف ٢٥ تفاعلاً مختلفاً.'}},
  {id:'gear10', ic:'🥽', need:10, reward:140, stat:'fullGear',
   en:{n:'By the book',      d:'Mix 10 times in full safety gear.'}, ar:{n:'حسب الأصول',     d:'اخلط ١٠ مرات بكامل معدات الأمان.'}},
  {id:'clean8', ic:'✨', need:8,  reward:180, stat:'successes',
   en:{n:'Steady hands',     d:'Get 8 clean results.'},            ar:{n:'يد ثابتة',        d:'احصل على ٨ نتائج نظيفة.'}},
  {id:'save3',  ic:'🧯', need:3,  reward:200, stat:'saves',
   en:{n:'First responder',  d:'Save the lab 3 times during an emergency.'}, ar:{n:'مستجيب أول', d:'أنقذ المختبر ٣ مرات أثناء الطوارئ.'}},
  {id:'lvl12',  ic:'🎓', need:12, reward:400, stat:'levelsDone',
   en:{n:'Graduate',         d:'Clear all 12 story levels.'},      ar:{n:'متخرّج',          d:'أنهِ المراحل الاثنتي عشرة كلها.'}}
];

/* ---------- state ---------- */

var S = {
  coins:120, hearts:3, maxHearts:3, safety:100,
  levelsDone:[], discovered:[], inert:[], damaged:false,
  stats:{booms:0, successes:0, fullGear:0, saves:0},
  claimed:[]
};
var mode='free', curLevel=null, slots=[null,null];
var gear={goggles:false,gloves:false,hood:false,shield:false};
var pending=null, emergTimer=null, bubTimer=null;

var $=function(s){return document.querySelector(s)};
var $$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};

/* ---------- persistence (memory fallback) ---------- */
var MEM=null;
function save(){
  var d=JSON.stringify(S); MEM=d;
  try{ if(window.storage&&window.storage.set) window.storage.set('labchaos:v1',d).catch(function(){}); }catch(e){}
}
function load(){
  return new Promise(function(res){
    try{
      if(window.storage&&window.storage.get){
        window.storage.get('labchaos:v1').then(function(r){
          if(r&&r.value){ try{ Object.assign(S,JSON.parse(r.value)); }catch(e){} }
          res();
        }).catch(function(){res()});
        return;
      }
    }catch(e){}
    if(MEM){ try{Object.assign(S,JSON.parse(MEM));}catch(e){} }
    res();
  });
}

/* ---------- language ---------- */

function applyLang(){
  document.documentElement.lang = L;
  document.documentElement.dir = (L==='ar'?'rtl':'ltr');
  $('#langBtn').textContent = (L==='ar'?'EN':'عربي');
  $('#logo1').textContent = (L==='ar'?'مختبر ':'LAB');
  $('#logo2').textContent = (L==='ar'?'الفوضى':'CHAOS');
  $('#tagline').textContent = t('tagline');
  $$('[data-t]').forEach(function(el){ el.textContent = t(el.getAttribute('data-t')); });
  var tl=$('#taskLabel'); if(tl) tl.textContent = t('taskLabel');
  $('#mixBtn').textContent = t('mix');
  $('#sAgain').textContent = t('again');
  $('#emergText').textContent = t('emergText');
  renderAll();
}
function nm(o){ return (L==='ar'? o.ar : o.en); }

/* ---------- toast ---------- */

var toastT=null;
function toast(msg){
  var el=$('#toast'); el.textContent=msg; el.classList.add('on');
  clearTimeout(toastT); toastT=setTimeout(function(){el.classList.remove('on')},2100);
}


/* ======================================================================
   HUD / HEADS-UP DISPLAY
   ----------------------------------------------------------------------
   The HUD is the persistent information bar at the top of the game.
   It displays hearts, coins, safety, language and the home control.
   ====================================================================== */
/* ---------- HUD ---------- */

function heartSvg(full){
  return '<svg class="hp'+(full?'':' gone')+'" viewBox="0 0 24 24"><path fill="'+(full?'#ff5a6a':'#7f9298')+
    '" d="M12 21s-8-5.1-8-10.4C4 7 6.6 4.8 9.2 4.8c1.7 0 2.6.9 2.8 1.4.2-.5 1.1-1.4 2.8-1.4C17.4 4.8 20 7 20 10.6 20 15.9 12 21 12 21z"/></svg>';
}
function renderHUD(){
  var h=''; for(var i=0;i<S.maxHearts;i++) h+=heartSvg(i<S.hearts);
  $('#hearts').innerHTML=h;
  $('#coins').textContent=S.coins;
  $('#safety').textContent=Math.max(0,Math.round(S.safety));
}

/* ---------- character ---------- */

function drawDoc(state){
  var soot = (state==='soot');
  var skin = soot? '#a08b78' : '#f2d3b3';
  var coat = soot? '#b9ae9c' : '#f2ece0';
  var hair = soot? '#4a3a30' : '#3d2a1f';
  var eyeY = (state==='panic')? 30 : 32;
  var mouth = (state==='panic')
      ? '<ellipse cx="42" cy="41" rx="5" ry="6" fill="#8f3a3a"/>'
      : (state==='ok' ? '<path d="M36 40 Q42 46 48 40" stroke="#8f3a3a" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
                      : '<path d="M37 41 L47 41" stroke="#8f3a3a" stroke-width="2.4" stroke-linecap="round"/>');
  var goggles = (state==='focus'||state==='panic'||state==='soot')
      ? '<g><rect x="26" y="'+(eyeY-6)+'" width="32" height="13" rx="6" fill="rgba(150,220,235,.5)" stroke="#6d8f99" stroke-width="2"/></g>'
      : '<rect x="26" y="14" width="32" height="8" rx="4" fill="rgba(150,220,235,.45)" stroke="#6d8f99" stroke-width="2"/>';
  var arms = (state==='panic')
      ? '<path d="M20 66 L10 46" stroke="'+coat+'" stroke-width="8" stroke-linecap="round"/><path d="M64 66 L74 46" stroke="'+coat+'" stroke-width="8" stroke-linecap="round"/>'
      : '<path d="M20 66 L14 84" stroke="'+coat+'" stroke-width="8" stroke-linecap="round"/><path d="M64 66 L70 84" stroke="'+coat+'" stroke-width="8" stroke-linecap="round"/>';
  $('#doc').innerHTML =
   '<svg viewBox="0 0 84 108" width="100%">'+
   '<ellipse cx="42" cy="104" rx="24" ry="4" fill="rgba(0,0,0,.35)"/>'+
   '<path d="M22 62 Q22 56 30 56 L54 56 Q62 56 62 62 L66 100 L18 100 Z" fill="'+coat+'"/>'+
   '<path d="M42 56 L42 100" stroke="rgba(0,0,0,.12)" stroke-width="2"/>'+
   arms+
   '<circle cx="42" cy="34" r="21" fill="'+skin+'"/>'+
   '<path d="M21 30 Q24 10 42 10 Q60 10 63 30 Q56 20 42 22 Q28 24 21 30 Z" fill="'+hair+'"/>'+
   (soot?'<path d="M30 12 L28 2 M42 10 L42 0 M54 12 L56 3" stroke="'+hair+'" stroke-width="3" stroke-linecap="round"/>':'')+
   goggles+
   '<circle cx="34" cy="'+eyeY+'" r="'+(state==='panic'?3.6:2.6)+'" fill="#2b2118"/>'+
   '<circle cx="50" cy="'+eyeY+'" r="'+(state==='panic'?3.6:2.6)+'" fill="#2b2118"/>'+
   mouth+
   (soot?'<circle cx="42" cy="34" r="21" fill="rgba(40,30,20,.28)"/>':'')+
   '</svg>';
  $('#doc').className = (state==='panic'?'panic':'');
}
function say(msg){
  var el=$('#say'); el.textContent=msg; el.classList.add('on');
  setTimeout(function(){el.classList.remove('on')},2400);
}

/* ---------- beaker ---------- */

var beakerFill=0.42, beakerCol='#4aa8d8';
function drawBeaker(){
  var top = 124 - beakerFill*96;
  $('#beakerSvg').innerHTML =
  '<svg viewBox="0 0 120 148" width="100%">'+
    '<defs><clipPath id="cp">'+
      '<path d="M30 22 L30 112 A12 12 0 0 0 42 124 L78 124 A12 12 0 0 0 90 112 L90 22 Z"/>'+
    '</clipPath></defs>'+
    '<path d="M30 22 L30 112 A12 12 0 0 0 42 124 L78 124 A12 12 0 0 0 90 112 L90 22 Z" fill="rgba(200,235,245,.07)"/>'+
    '<g clip-path="url(#cp)">'+
      '<rect x="28" y="'+top+'" width="64" height="120" fill="'+beakerCol+'"/>'+
      '<ellipse cx="60" cy="'+top+'" rx="32" ry="4.5" fill="'+beakerCol+'" opacity=".75" style="filter:brightness(1.35)"/>'+
    '</g>'+
    '<path d="M30 22 L30 112 A12 12 0 0 0 42 124 L78 124 A12 12 0 0 0 90 112 L90 22" fill="none" stroke="rgba(226,242,247,.55)" stroke-width="3" stroke-linejoin="round"/>'+
    '<ellipse cx="60" cy="22" rx="30" ry="6" fill="none" stroke="rgba(226,242,247,.55)" stroke-width="3"/>'+
    '<path d="M36 34 L36 104" stroke="rgba(255,255,255,.4)" stroke-width="3.5" stroke-linecap="round"/>'+
    '<path d="M84 44 L90 44 M84 62 L90 62 M84 80 L90 80" stroke="rgba(226,242,247,.4)" stroke-width="2" stroke-linecap="round"/>'+
  '</svg>';
}
function setBubbles(rate){
  clearInterval(bubTimer);
  if(rate<=0) return;
  bubTimer=setInterval(function(){
    var b=document.createElement('div'); b.className='bub';
    var sz=3+Math.random()*5;
    b.style.width=sz+'px'; b.style.height=sz+'px';
    b.style.left=(32+Math.random()*44)+'%';
    b.style.bottom=(16+Math.random()*12)+'%';
    b.style.animationDuration=(0.7+Math.random()*0.7)+'s';
    $('#bubbles').appendChild(b);
    setTimeout(function(){ if(b.parentNode) b.parentNode.removeChild(b); },1500);
  }, Math.max(55, 420 - rate*38));
}
function steam(n){
  for(var i=0;i<n;i++){(function(i){setTimeout(function(){
    var s=document.createElement('div'); s.className='steam';
    s.style.left=(38+Math.random()*24)+'%';
    $('#bubbles').appendChild(s);
    setTimeout(function(){ if(s.parentNode) s.parentNode.removeChild(s); },2100);
  }, i*230)})(i);}
}
function resetStage(){
  clearInterval(bubTimer);
  $('#bubbles').innerHTML='';
  $('#stage').classList.remove('shake');
  $('#gasVeil').style.opacity=0;
  $('#fireLayer').style.opacity=0;
  $('#flash').style.opacity=0;
  beakerFill=0.42; beakerCol='#4aa8d8'; drawBeaker();
  drawDoc('idle');
}

/* ---------- shelf & slots ---------- */

function renderShelf(){
  $('#shelf').innerHTML = REAGENTS.map(function(r){
    var on = (slots[0]===r.id||slots[1]===r.id);
    return '<button class="rg'+(on?' sel':'')+'" data-rg="'+r.id+'">'+
      '<div class="bottle" style="background:'+r.c+'"><i class="sh"></i></div>'+
      '<div class="s">'+r.sym+'</div><div class="n">'+nm(r)+'</div></button>';
  }).join('');
}
function renderSlots(){
  [0,1].forEach(function(i){
    var el=$('.slot[data-slot="'+i+'"]');
    if(slots[i]){
      var r=RG[slots[i]];
      el.className='slot filled';
      el.innerHTML='<span class="swatch" style="background:'+r.c+'"></span><span class="sym">'+r.sym+'</span><span class="nm">'+nm(r)+'</span>';
    } else {
      el.className='slot';
      el.innerHTML='<span class="nm">'+t('slotEmpty').replace('\n','<br>')+'</span>';
    }
  });
  $('#mixBtn').disabled = !(slots[0]&&slots[1]);
}
function pickReagent(id){
  if(slots[0]===id){ slots[0]=null; }
  else if(slots[1]===id){ slots[1]=null; }
  else if(!slots[0]) slots[0]=id;
  else if(!slots[1]) slots[1]=id;
  else { slots[1]=id; }
  renderSlots(); renderShelf();
}

/* ---------- mixing ---------- */

function getRx(a,b){
  var r = RX[K(a,b)];
  if(r) return r;
  return {kind:'meh',int:0,col:'#8fb4c4',fx:'',eq:'—',
    en:{n:t('noReact'),w:t('noReactWhy'),l:t('noReactLesson')},
    ar:{n:t('noReact'),w:t('noReactWhy'),l:t('noReactLesson')}};
}
function mix(){
  if(!slots[0]||!slots[1]) return;
  if(mode==='story' && S.hearts<=0){ toast(t('hpNone')); return; }
  var r = getRx(slots[0],slots[1]);
  var full = gear.goggles&&gear.gloves&&gear.hood&&gear.shield;
  if(full){ S.stats.fullGear++; }

  drawDoc('focus'); say(t('sayMix'));
  $('#mixBtn').disabled=true;

  // pour
  beakerCol=r.col; beakerFill=0.42;
  drawBeaker();
  setTimeout(function(){
    beakerFill = (r.fx==='foam')?0.9:0.6; drawBeaker();
    setBubbles(r.int);
    if(r.fx==='steam') steam(4);
    if(r.fx==='flame'){ $('#fireLayer').style.opacity=.55; }
    if(r.int>=7) $('#stage').classList.add('shake');
    if(r.kind==='gas'){ $('#gasVeil').style.opacity = gear.hood? .18 : .85; }
  },260);

  var key=K(slots[0],slots[1]);
  if(r.eq==='—'){ if(S.inert.indexOf(key)<0) S.inert.push(key); }
  else if(S.discovered.indexOf(key)<0){ S.discovered.push(key); }

  pending = {r:r, key:key, a:slots[0], b:slots[1], full:full};

  var delay = 1150;
  setTimeout(function(){
    if(r.kind==='fire' || (r.kind==='gas' && !gear.hood)) startEmergency(r);
    else resolve(r.kind);
  }, delay);
}

function startEmergency(r){
  var need = (r.kind==='fire')?'ext':'hood';
  pending.need = need;
  $('#emergTitle').textContent = (r.kind==='fire')? t('emergFire') : t('emergGas');
  $('#emerg').classList.add('on');
  drawDoc('panic'); say(r.kind==='gas'? t('sayGas'):'!');
  var total=3000, left=total;
  $('#timerFill').style.width='100%';
  clearInterval(emergTimer);
  emergTimer=setInterval(function(){
    left-=100;
    $('#timerFill').style.width = Math.max(0,(left/total*100))+'%';
    if(left<=0){ clearInterval(emergTimer); $('#emerg').classList.remove('on'); resolve('boom'); }
  },100);
}
function answerEmergency(choice){
  clearInterval(emergTimer);
  $('#emerg').classList.remove('on');
  if(choice===pending.need){
    if(choice==='hood'){ gear.hood=true; renderGear(); $('#gasVeil').style.opacity=.15; $('#hoodVis').classList.add('open'); }
    if(choice==='ext'){ $('#fireLayer').style.opacity=0; }
    S.stats.saves++;
    resolve('saved');
  } else {
    resolve('boom');
  }
}

function resolve(kind){
  var r=pending.r, dc=0, dh=0, ds=0, extra=[];
  clearInterval(bubTimer);
  $('#stage').classList.remove('shake');

  if(kind==='ok'){ dc=25; ds=2; S.stats.successes++; drawDoc('ok'); say(t('sayGood')); }
  else if(kind==='meh'){ dc=8; drawDoc('idle'); }
  else if(kind==='gas'){
    if(gear.hood){ dc=15; ds=-2; S.stats.successes++; drawDoc('focus'); }
    else { dc=-30; dh=-1; ds=-12; drawDoc('panic'); extra.push(t('gearNoHood')); }
  }
  else if(kind==='saved'){ dc=12; ds=-3; drawDoc('focus'); }
  else if(kind==='boom'){
    dc=-45; dh=-1; ds=-15; S.stats.booms++; S.damaged=true;
    $('#flash').style.opacity=1; setTimeout(function(){$('#flash').style.opacity=0},420);
    $('#stage').classList.add('shake');
    setTimeout(function(){$('#stage').classList.remove('shake')},600);
    beakerFill=0.12; beakerCol='#6b5a4a'; drawBeaker();
    drawDoc('soot'); say(t('sayBoom'));
    if(!gear.shield){ dc-=15; extra.push(t('gearNoShield')); }
    if(!gear.goggles){ ds-=8; extra.push(t('gearNoGoggles')); }
    if(S.stats.booms===1) extra.push(t('firstBoom'));
  }

  S.coins=Math.max(0,S.coins+dc);
  S.safety=Math.max(0,Math.min(100,S.safety+ds));
  if(dh<0){
    S.hearts=Math.max(0,S.hearts+dh);
    var hp=$$('#hearts .hp'); if(hp[S.hearts]) hp[S.hearts].classList.add('pulse');
  }

  var won=false;
  if(mode==='story'&&curLevel) won=checkGoal(curLevel,kind);
  if(won && S.levelsDone.indexOf(curLevel.id)<0) S.levelsDone.push(curLevel.id);

  renderHUD(); checkChallenges(); save();
  showSheet(kind,r,dc,dh,ds,extra,won);
  $('#mixBtn').disabled=false;
}

function checkGoal(lv,kind){
  var g=lv.goal, r=pending.r;
  if(g.gear){ for(var i=0;i<g.gear.length;i++) if(!gear[g.gear[i]]) return false; }
  if(g.pair){
    var want=g.pair.slice().sort().join('+');
    if(want!==pending.key) return false;
  }
  if(g.kind && g.kind!==kind && !(g.kind==='gas'&&r.kind==='gas')) return false;
  if(g.fx && g.fx!==r.fx) return false;
  if(g.safe && (kind==='boom')) return false;
  return true;
}

function showSheet(kind,r,dc,dh,ds,extra,won){
  var vmap={ok:'vSuccess',meh:'vPartial',gas:(gear.hood?'vSuccess':'vHazard'),boom:'vBoom',saved:'vSaved',fire:'vFire'};
  var emo={ok:'✅',meh:'🟡',gas:(gear.hood?'✅':'💨'),boom:'💥',saved:'🧯',fire:'🔥'};
  var txt = nm(r);
  $('#vTitle').innerHTML = emo[kind]+' <span>'+t(vmap[kind])+'</span>';
  $('#vEq').textContent = r.eq;
  $('#vWhy').innerHTML = '<b>'+txt.n+'.</b> '+txt.w + (extra.length? ' '+extra.join(' ') : '');
  $('#vLesson').textContent = txt.l;

  var d=[];
  if(dc) d.push('<span class="delta '+(dc>0?'pos':'neg')+'">🪙 '+(dc>0?'+':'')+dc+'</span>');
  if(dh) d.push('<span class="delta neg">❤️ '+t('hpLost')+'</span>');
  if(ds) d.push('<span class="delta '+(ds>0?'pos':'neg')+'">🥽 '+(ds>0?'+':'')+ds+'</span>');
  if(won) d.push('<span class="delta pos">🎯 '+t('goalDone')+'</span>');
  d.push('<span class="delta">📓 '+t('saved')+'</span>');
  $('#vDeltas').innerHTML=d.join('');

  var next=$('#sNext');
  if(mode==='story'){
    if(won){ next.textContent=t('next'); next.dataset.act='next'; }
    else { next.textContent=t('retry'); next.dataset.act='retry'; }
  } else { next.textContent=t('backHome'); next.dataset.act='home'; }
  $('#sheet').classList.add('on');
}
function hideSheet(){ $('#sheet').classList.remove('on'); }

/* ---------- gear ---------- */
function renderGear(){
  $$('.gear').forEach(function(b){ b.classList.toggle('on', !!gear[b.dataset.gear]); });
  $('#hoodVis').classList.toggle('open', gear.hood);
}


/* ======================================================================
   SCREEN SYSTEM
   ----------------------------------------------------------------------
   A .screen represents one major page of the game. JavaScript changes
   which screen has the .on class so the player sees one page at a time.
   ====================================================================== */
/* ---------- screens ---------- */

function go(name){
  $$('.screen').forEach(function(s){s.classList.remove('on')});
  $('#s-'+name).classList.add('on');
  $('#homeBtn').style.display = (name==='home'?'none':'flex');
  if(name==='levels') renderLevels();
  if(name==='notes') renderNotes();
  if(name==='challenges') renderChallenges();
  if(name==='shop') renderShop();
  if(name==='pt') renderPT();
}
function openLab(level){
  mode = level? 'story':'free';
  curLevel = level||null;
  slots=[null,null];
  gear={goggles:false,gloves:false,hood:false,shield:false};
  renderGear(); renderSlots(); renderShelf(); resetStage(); hideSheet();
  var tt=$('#taskText'); if(tt) tt.textContent = level? nm(level).d : t('freeTask');
  $('#task').style.display='block';
  go('lab');
  setTimeout(function(){ say(t('sayIdle')); },500);
}

/* ---------- level list ---------- */

function renderLevels(){
  $('#lvlList').innerHTML = LEVELS.map(function(lv,i){
    var done=S.levelsDone.indexOf(lv.id)>=0;
    var prev=(i===0)||S.levelsDone.indexOf(LEVELS[i-1].id)>=0;
    var o=nm(lv);
    return '<button class="lvl'+(done?' done':'')+(prev?'':' locked')+'" data-lv="'+lv.id+'" '+(prev?'':'disabled')+'>'+
      '<span class="num">'+(done?'✓':lv.id)+'</span>'+
      '<span class="t"><span class="a">'+o.n+'</span><span class="b">'+(prev?o.d:t('lockedTxt'))+'</span></span>'+
      '<span class="st">'+(prev?(done?'🏅':'▶'):'🔒')+'</span></button>';
  }).join('');
}

/* ---------- notes ---------- */

function renderNotes(){
  var total=Object.keys(RX).length;
  $('#nLede').textContent = t('notesCount').replace('@a',S.discovered.length).replace('@b',total);
  if(!S.inert) S.inert=[];
  if(!S.discovered.length && !S.inert.length){ $('#noteList').innerHTML='<div class="empty">'+t('noNotes').replace('\n','<br>')+'</div>'; return; }
  var icon={ok:'✅',meh:'🟡',gas:'💨',boom:'💥',fire:'🔥'};
  var out = S.discovered.map(function(k){
    var r=RX[k]; if(!r) return '';
    var o=nm(r);
    return '<div class="note"><div class="h">'+(icon[r.kind]||'🧪')+' '+o.n+'</div>'+
      '<div class="eqn">'+r.eq+'</div><div class="d">'+o.w+'</div>'+
      '<div class="d" style="margin-top:6px;color:#f2a541">'+o.l+'</div></div>';
  }).join('');
  out += S.inert.map(function(k){
    var names = k.split('+').map(function(id){ return RG[id]? RG[id].sym : id; }).join('  +  ');
    return '<div class="note" style="opacity:.82"><div class="h">⚪ '+t('noReact')+'</div>'+
      '<div class="eqn">'+names+'  →  —</div><div class="d">'+t('noReactWhy')+'</div>'+
      '<div class="d" style="margin-top:6px;color:#f2a541">'+t('noReactLesson')+'</div></div>';
  }).join('');
  $('#noteList').innerHTML = out;
}

/* ---------- challenges ---------- */

function statVal(s){ return (s==='discovered')? S.discovered.length : (s==='levelsDone')? S.levelsDone.length : (S.stats[s]||0); }
function checkChallenges(){
  CHALLENGES.forEach(function(c){
    if(S.claimed.indexOf(c.id)>=0) return;
    if(statVal(c.stat)>=c.need){
      S.claimed.push(c.id); S.coins+=c.reward;
      toast('🏆 '+nm(c).n+'  '+t('chReward').replace('@n',c.reward));
      renderHUD();
    }
  });
}
function renderChallenges(){
  $('#chList').innerHTML = CHALLENGES.map(function(c){
    var v=Math.min(statVal(c.stat),c.need), done=S.claimed.indexOf(c.id)>=0, o=nm(c);
    return '<div class="ch'+(done?' done':'')+'"><span class="ci">'+(done?'🏆':c.ic)+'</span>'+
      '<span class="cb"><span class="cn">'+o.n+'</span><span class="cd">'+o.d+'</span>'+
      '<span class="bar"><i style="width:'+(v/c.need*100)+'%"></i></span></span>'+
      '<span class="cr">'+(done?'✓':v+'/'+c.need)+'</span></div>';
  }).join('');
}

/* ---------- shop ---------- */

function renderShop(){
  var items=[
    {id:'heart', cost:70, ic:'❤️', n:t('buyHeart'), d:t('buyHeartD'), can:S.hearts<S.maxHearts},
    {id:'repair',cost:90, ic:'🛠️', n:t('repair'),   d:t('repairD'),   can:S.safety<100},
    {id:'stock', cost:0,  ic:'🎁', n:t('restock'),  d:t('restockD'),  can:S.coins<40}
  ];
  $('#shopList').innerHTML = items.map(function(it){
    var afford = S.coins>=it.cost;
    var lbl = !it.can? t('owned') : (afford? t('buy')+' · '+(it.cost||'free') : t('cant'));
    return '<div class="ch"><span class="ci">'+it.ic+'</span><span class="cb"><span class="cn">'+it.n+'</span>'+
      '<span class="cd">'+it.d+'</span></span>'+
      '<button class="sbtn'+((it.can&&afford)?' go':'')+'" style="flex:0 0 auto;padding:8px 12px;font-size:12px" '+
      ((it.can&&afford)?'data-buy="'+it.id+'"':'disabled')+'>'+lbl+'</button></div>';
  }).join('');
}
function buy(id){
  if(id==='heart'&&S.coins>=70&&S.hearts<S.maxHearts){ S.coins-=70; S.hearts++; toast('❤️ '+t('bought')); }
  if(id==='repair'&&S.coins>=90&&S.safety<100){ S.coins-=90; S.safety=100; S.damaged=false; toast('🥽 '+t('safetyUp')); }
  if(id==='stock'&&S.coins<40){ S.coins+=40; toast('🪙 +40'); }
  renderHUD(); renderShop(); save();
}

/* ---------- periodic table ---------- */

var shelfZ={};
REAGENTS.forEach(function(r){ (r.z||[]).forEach(function(z){ shelfZ[z]=1; }); });
function renderPT(){
  $('#pt').innerHTML = ELEMENTS.map(function(e){
    var c=CATS[e.cat];
    return '<div class="el'+(shelfZ[e.z]?' have':'')+'" style="background:'+c.c+';grid-row:'+e.row+';grid-column:'+e.col+'" data-z="'+e.z+'">'+
      '<span class="z">'+e.z+'</span>'+e.sym+'</div>';
  }).join('');
  $('#ptLegend').innerHTML = Object.keys(CATS).map(function(k){
    return '<span class="lg" style="background:'+CATS[k].c+'">'+nm(CATS[k])+'</span>';
  }).join('');
}
function showEl(z){
  var e=ELEMENTS.filter(function(x){return x.z===z})[0]; if(!e) return;
  var c=CATS[e.cat];
  $('#elCard').innerHTML =
    '<div class="big" style="color:'+c.c+'">'+e.sym+'</div>'+
    '<div class="nm">'+(L==='ar'?e.ar:e.en)+'</div>'+
    '<div class="meta">'+(L==='ar'?'العدد الذري':'Atomic number')+': '+e.z+'<br>'+
      (L==='ar'?'الكتلة الذرية':'Atomic mass')+': '+e.m+'</div>'+
    '<div class="cat" style="background:'+c.c+'">'+nm(c)+'</div>'+
    (shelfZ[e.z]?'<div class="meta" style="color:#f2a541">'+(L==='ar'?'موجود على رفّك':'On your shelf')+'</div>':'');
  $('#elModal').classList.add('on');
}

/* ---------- render all ---------- */

function renderAll(){
  renderHUD(); renderShelf(); renderSlots(); renderGear(); drawBeaker();
  var on=$('.screen.on');
  if(on){
    var id=on.id.replace('s-','');
    if(id==='levels')renderLevels(); if(id==='notes')renderNotes();
    if(id==='challenges')renderChallenges(); if(id==='shop')renderShop(); if(id==='pt')renderPT();
    if(id==='lab'){ var tt=$('#taskText'); if(tt) tt.textContent = curLevel? nm(curLevel).d : t('freeTask'); }
  }
}

/* ---------- events ---------- */

document.addEventListener('click', function(ev){
  var el;
  if(!ev.target||!ev.target.closest) return;
  if(el=ev.target.closest('[data-go]')){
    if(el.dataset.go==='free') openLab(null); else go(el.dataset.go);
    return;
  }
  if(el=ev.target.closest('[data-rg]')){ pickReagent(el.dataset.rg); return; }
  if(el=ev.target.closest('[data-slot]')){ var i=+el.dataset.slot; slots[i]=null; renderSlots(); renderShelf(); return; }
  if(el=ev.target.closest('[data-gear]')){ gear[el.dataset.gear]=!gear[el.dataset.gear]; renderGear(); return; }
  if(el=ev.target.closest('[data-e]')){ answerEmergency(el.dataset.e); return; }
  if(el=ev.target.closest('[data-lv]')){
    var lv=LEVELS.filter(function(x){return x.id===+el.dataset.lv})[0];
    if(lv) openLab(lv); return;
  }
  if(el=ev.target.closest('[data-buy]')){ buy(el.dataset.buy); return; }
  if(el=ev.target.closest('.el')){ showEl(+el.dataset.z); return; }
  if(ev.target.closest('#elModal')){ $('#elModal').classList.remove('on'); return; }
  if(ev.target.id==='mixBtn'){ mix(); return; }
  if(ev.target.id==='sAgain'){ hideSheet(); resetStage(); slots=[null,null]; renderSlots(); renderShelf(); return; }
  if(ev.target.id==='sNext'){
    var act=ev.target.dataset.act;
    hideSheet(); resetStage(); slots=[null,null]; renderSlots(); renderShelf();
    if(act==='next'){
      var i=LEVELS.findIndex(function(x){return curLevel&&x.id===curLevel.id});
      if(i>=0 && i+1<LEVELS.length) openLab(LEVELS[i+1]);
      else { toast(t('allDone')); go('levels'); }
    } else if(act==='home'){ go('home'); }
    return;
  }
  if(ev.target.id==='langBtn'){ L=(L==='ar'?'en':'ar'); applyLang(); return; }
  if(ev.target.id==='homeBtn'){ hideSheet(); clearInterval(emergTimer); $('#emerg').classList.remove('on'); go('home'); return; }
});

/* ---------- boot ---------- */

load().then(function(){
  if(navigator.language && navigator.language.indexOf('ar')===0) L='ar';
  applyLang();
  drawBeaker(); drawDoc('idle');
  $('#homeBtn').style.display='none';
});

/* ================= GUIDE, HINTS, FIRST-RUN COACHING ================= */

var hintOpen=false;

function renderTask(){
  var tk=$('#task .tk'), btn=$('#hintBtn');
  if(!curLevel){
    btn.style.display='none'; hintOpen=false;
    tk.innerHTML='<span class="tl">'+t('taskLabel')+'</span><span>'+t('freeTask')+'</span>';
    return;
  }
  btn.style.display='block';
  btn.classList.toggle('on',hintOpen);
  var o=nm(curLevel);
  var html='<span class="tl">'+t('taskLabel')+'</span><span>'+o.d+'</span>';
  if(hintOpen){
    var h=curLevel.hint? (L==='ar'?curLevel.hint.ar:curLevel.hint.en) : '';
    html+='<div style="margin-top:6px;font-size:12px;color:#f2a541">'+t('hintTitle')+': '+h+'</div>';
    var g=curLevel.goal;
    if(g.pair){
      html+='<div class="hintchips">'+g.pair.map(function(id){
        var r=RG[id]; if(!r) return '';
        return '<span class="hintchip"><i style="background:'+r.c+'"></i>'+r.sym+' · '+nm(r)+'</span>';
      }).join('')+'</div>';
    }
    if(g.gear){
      var labels={goggles:t('gGoggles'),gloves:t('gGloves'),hood:t('gHood'),shield:t('gShield')};
      html+='<div class="hintgear">'+t('hintGear')+' '+g.gear.map(function(k){return labels[k]}).join(' + ')+'</div>';
    }
  }
  tk.innerHTML=html;
}

/* ---------- guide content ---------- */

function guideData(){
  var en=(L!=='ar');
  return [
   {h: en?'The four steps':'الخطوات الأربع', steps:[
     en?'Tap two bottles on the shelf at the bottom of the screen. They fill the two slots above it.'
       :'اضغط زجاجتين من الرف أسفل الشاشة، فتملآن الخانتين فوقه.',
     en?'Turn on any safety gear you think you will need. This is optional and always allowed.'
       :'شغّل ما تراه لازماً من معدات الأمان. هذا اختياري ومسموح دائماً.',
     en?'Press MIX and watch the beaker. Bubbles, colour and screen shake all tell you how violent it is getting.'
       :'اضغط «اخلط» وراقب الكأس. الفقاعات واللون واهتزاز الشاشة تخبرك كم يزداد التفاعل عنفاً.',
     en?'Read the card that slides up. That card is the actual point of the game.'
       :'اقرأ البطاقة التي تظهر من الأسفل. هذه البطاقة هي جوهر اللعبة.'
   ]},
   {h: en?'Reading the shelf':'قراءة الرف',
    p: en?'Every bottle shows two things: the chemical formula on top and the everyday name underneath. The objective may use either one, so check both lines before you decide a reagent is missing.'
        :'كل زجاجة تعرض شيئين: الصيغة الكيميائية في الأعلى والاسم الدارج تحتها. قد يستخدم الهدف أياً منهما، فتحقق من السطرين قبل أن تظن أن المادة غير موجودة.',
    rows:[
      ['NaCl', en?'Table salt = sodium chloride':'ملح الطعام = كلوريد الصوديوم'],
      ['CH₃COOH', en?'Vinegar = acetic acid':'الخل = حمض الأسيتيك'],
      ['NaHCO₃', en?'Baking soda = sodium bicarbonate':'صودا الخبز = بيكربونات الصوديوم'],
      ['NaOCl', en?'Bleach = sodium hypochlorite':'المبيّض = هيبوكلوريت الصوديوم'],
      ['Ph', en?'Indicator = phenolphthalein':'الكاشف = الفينولفثالين'],
      ['🔥', en?'Burner — counts as a reagent. Use it for flame tests and heating.':'الموقد — يُحتسب كمادة. استخدمه لاختبارات اللهب والتسخين.']
    ]},
   {h: en?'The safety gear':'معدات الأمان',
    p: en?'None of these stop you from mixing anything. They only change what a mistake costs.'
        :'لا شيء منها يمنعك من خلط أي شيء. إنها تغيّر ثمن الخطأ فقط.',
    rows:[
      ['🥽 '+t('gGoggles'), en?'Protects your safety score in an explosion. Essential for burning magnesium.':'تحمي درجة أمانك عند الانفجار. ضرورية عند حرق المغنيسيوم.'],
      ['🧤 '+t('gGloves'), en?'Protects against splash from acid and metal reactions.':'تحمي من رذاذ تفاعلات الأحماض والفلزات.'],
      ['🌬️ '+t('gHood'), en?'Turns a toxic-gas failure into a safe demonstration. Open it before anything that smells like trouble.':'تحوّل فشل الغاز السام إلى عرض آمن. افتحه قبل أي شيء يبدو مريباً.'],
      ['🛡️ '+t('gShield'), en?'Saves you 15 coins on every explosion, and two levels require it.':'يوفّر عليك ١٥ عملة في كل انفجار، ومرحلتان تشترطانه.']
    ]},
   {h: en?'What can happen':'ماذا قد يحدث', rows:[
      ['✅ '+t('vSuccess'), en?'Clean result. Coins up, safety up.':'نتيجة نظيفة. العملات والأمان يرتفعان.'],
      ['🟡 '+t('vPartial'), en?'Something happened, but not what the level wanted.':'حدث شيء، لكنه ليس ما تريده المرحلة.'],
      ['💨 '+t('vHazard'), en?'Toxic gas. Safe with the hood open, costs a heart without it.':'غاز سام. آمن مع فتح الشفّاط، ويكلّف قلباً بدونه.'],
      ['💥 '+t('vBoom'), en?'Explosion. One heart, 45 coins, and 15 more if you skipped the shield.':'انفجار. قلب و٤٥ عملة، و١٥ إضافية إن تجاهلت الحاجز.'],
      ['🧯 '+t('vSaved'), en?'You caught an emergency in time. No heart lost.':'أدركت الطارئ في وقته. لم تخسر قلباً.']
   ]},
   {h: en?'The three-second emergency':'طوارئ الثلاث ثوانٍ',
    p: en?'Some mixes catch fire or start leaking gas instead of resolving straight away. The screen freezes and gives you three seconds and three buttons. Fire needs the extinguisher. Escaping gas needs the fume hood. Choose wrong, or wait too long, and it becomes a full explosion.'
        :'بعض الخلطات تشتعل أو تبدأ بتسريب الغاز بدل أن تنتهي مباشرة. تتجمد الشاشة وتمنحك ثلاث ثوانٍ وثلاثة أزرار. النار تحتاج الطفاية، والغاز المتسرّب يحتاج الشفّاط. اختر خطأً أو تأخّر، وسيتحول الأمر إلى انفجار كامل.'},
   {h: en?'Hearts and coins':'القلوب والعملات',
    p: en?'You have three hearts. Explosions and uncontained gas each cost one. Running out blocks story levels but never blocks free chaos, so you can always keep experimenting. Buy hearts back in the supply room, and repair your safety score there too.'
        :'لديك ثلاثة قلوب. الانفجار والغاز غير المحتوى يكلّف كل منهما قلباً. نفادها يوقف مراحل القصة ولا يوقف الفوضى الحرة، فيمكنك مواصلة التجريب دائماً. اشترِ القلوب من غرفة التموين، وأصلح درجة أمانك هناك أيضاً.'},
   {h: en?'If you get stuck':'إذا توقفت',
    p: en?'Press the ? button next to the objective. It names the exact reagents the level wants and any gear it requires. It is free, unlimited, and does not affect your score.'
        :'اضغط زر ؟ بجوار الهدف. يذكر لك المواد التي تريدها المرحلة بالضبط وأي معدات تشترطها. مجاني وغير محدود ولا يؤثر على نتيجتك.'}
  ];
}

function renderGuide(){
  var out = guideData().map(function(s){
    var h='<div class="gsec"><h3>'+s.h+'</h3>';
    if(s.p) h+='<p>'+s.p+'</p>';
    if(s.steps) h+=s.steps.map(function(x,i){
      return '<div class="gstep"><span class="n">'+(i+1)+'</span><span class="x">'+x+'</span></div>';
    }).join('');
    if(s.rows) h+=s.rows.map(function(r){
      return '<div class="grow"><span class="k">'+r[0]+'</span><span>'+r[1]+'</span></div>';
    }).join('');
    return h+'</div>';
  }).join('');

  out += '<div class="gsec"><h3>'+t('gWalk')+'</h3><p>'+t('gWalkNote')+'</p>'+
    LEVELS.map(function(lv){
      var o=nm(lv), hint=lv.hint? (L==='ar'?lv.hint.ar:lv.hint.en):'';
      return '<button class="gwalk" data-walk="'+lv.id+'">'+
        '<span class="q"><span><b>'+lv.id+'.</b> '+o.n+'</span><span style="color:#8ba0a8">▾</span></span>'+
        '<span class="a">'+hint+'</span></button>';
    }).join('') + '</div>';

  $('#guideBody').innerHTML=out;
}

/* ---------- first-run coaching ---------- */

var COACH=[['c1t','c1x'],['c2t','c2x'],['c3t','c3x'],['c4t','c4x']];
var coachI=0;
function showCoach(i){
  coachI=i;
  $('#coachStep').textContent=(i+1)+' / '+COACH.length;
  $('#coachTitle').textContent=t(COACH[i][0]);
  $('#coachText').textContent=t(COACH[i][1]);
  $('#coachSkip').textContent=t('coachSkip');
  $('#coachNext').textContent=(i===COACH.length-1)? t('coachDone') : t('coachNext');
  $('#coach').classList.add('on');
}
function endCoach(){
  $('#coach').classList.remove('on');
  S.seenCoach=true; save();
}

/* ---------- wire it up ---------- */

document.addEventListener('click', function(ev){
  if(!ev.target||!ev.target.closest) return;
  var el;
  if(ev.target.id==='hintBtn'){ hintOpen=!hintOpen; renderTask(); return; }
  if(el=ev.target.closest('[data-walk]')){ el.classList.toggle('open'); return; }
  if(ev.target.id==='coachSkip'){ endCoach(); return; }
  if(ev.target.id==='coachNext'){
    if(coachI<COACH.length-1) showCoach(coachI+1); else endCoach();
    return;
  }
});

/* hook the guide screen and the coach into the existing flow */

var _go=go;
go=function(name){ _go(name); if(name==='guide') renderGuide(); };

var _openLab=openLab;
openLab=function(level){
  hintOpen=false;
  _openLab(level);
  renderTask();
  if(!S.seenCoach) setTimeout(function(){ showCoach(0); },380);
};

var _renderAll=renderAll;
renderAll=function(){
  _renderAll();
  var on=$('.screen.on');
  if(on&&on.id==='s-guide') renderGuide();
  if(on&&on.id==='s-lab') renderTask();
};

