"use client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { translations } from "@/lib/translations"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"

type Props = {
  params: { lang: string }
}

export default function ManifestoClientPage({ params }: Props) {
  const lang = params.lang || "en"
  const t = translations[lang as keyof typeof translations]
  const isRtl = lang === "ar"

  // Content based on language
  const content = {
    en: {
      // English content
      notBuilding: "We are not building an app. We are building a universe.",
      fullyIntegrated:
        "A fully integrated, people-first universe designed to help you think, act, build, and grow — faster, smarter, and with less friction.",
      dontJustSupport: "We don't just support execution.",
      weAreExecution: "We are execution — deployed on-demand, backed by real humans, and powered by smart systems.",
      operatingPrinciple: "Our Operating Principle",
      effectiveRecruitment: "Effective recruitment = Right person @ Right place @ Right time",
      weOptimize: "We optimize this with:",
      noDelays: "No delays. No endless searching. No mismatches.",
      weTurn: "We turn thoughts into action — instantly.",
      coreSectors: "Core Sectors of the BAWES Universe",
      tamrTitle: "Tamr — On-Demand Recruitment",
      tamrDesc:
        "Need someone now? Tamr delivers. Freelancers, contractors, part-timers, or full-timers — matched and deployed with precision. Think: AWS for human talent.",
      studentHubTitle: "StudentHub — Next-Gen Student Hiring",
      studentHubDesc:
        "Contract students on flexible terms: gigs, internships, seasonal roles. We handle matching, payroll, and replacement. Universally accessible student workforce — optimized for velocity.",
      pogiTitle: "Pogi — Full-Time Recruitment at Scale",
      pogiDesc:
        "We identify, interview, and place top-tier talent tailored to your business goals. Frictionless hiring with full visibility.",
      economicSectors: "Economic & Support Sectors",
      capitalTitle: "The Capital — Crowdfunding & Micro-Loans",
      capitalDesc:
        "Fuel your idea. Raise funds. Get started. The Capital supports bootstrappers and builders with smart micro-financing options and crowd momentum.",
      plugnTitle: "Plugn — Our Universal Commerce Layer",
      plugnDesc:
        "Start, run, and scale your business. Company setup, invoicing, payments, subscriptions — done in minutes.",
      payrollTitle: "Payroll Management",
      payrollDesc:
        "Automated payments, contracts, and payout logs. Supports flexible work contracts, multi-country payroll, and velocity-based compensation.",
      organizationStack: "Organization & Delegation Stack",
      hrTitle: "HR Management",
      hrDesc:
        "All-in-one people ops. From onboarding to replacement. Monitor progress, measure performance, and restructure on the fly.",
      salesTitle: "Sales Assistance",
      salesDesc:
        "We give you pre-built teams, scripts, leads, and proposal engines. Plug directly into your pipeline. Let us close for you.",
      whiteBookTitle: "The White Book — Smart Event Planning",
      whiteBookDesc:
        "Plan and execute events — instantly. From venue to guest list, from media to logistics — we handle it all.",
      realTimeIntel: "Real-Time Intelligence & Execution",
      weRun: "We run continuous matchmaking. You don't need to search — just ask.",
      needDesigner: '"I need a designer for 10 hours this week."',
      needSales: '"I need 4 sales reps in Dubai."',
      wantPlan: '"I want to plan a community event."',
      needStartup: '"I need a startup team built from scratch."',
      bawesResponds: "BAWES responds with exact matches, cost, options — and full execution.",
      intelligenceLayer: "The Intelligence Layer",
      dontJustAssign: "We don't just assign people. We analyze behavior, availability, and capability in real time.",
      youSay: "You say:",
      needMarketing: '"I need a marketing intern in Kuwait by Thursday."',
      weProcess: "We process:",
      whoAvailable: "Who's available and qualified",
      whoWorked: "Who has worked on similar projects",
      whoHasTime: "Who has time and willingness",
      whatIncentives: "What incentives are needed",
      whoCanBe: "Who can be deployed instantly",
      andWeRespond: "And we respond:",
      hereAre: '"Here are 3 vetted candidates. One can start today."',
      thoughtToAction: "Thought-to-Action Engine",
      youSpeak: "You speak → We think → We build → You approve → It's done.",
      whetherIts: "Whether it's a voice note or a raw idea, we turn it into:",
      teamDeployment: "Team deployment",
      proposals: "Proposals",
      projectPlans: "Project plans",
      financialModels: "Financial models",
      launchReady: "Launch-ready operations",
      delegationAtScale: "Delegation at Scale",
      voiceTextThought: "Voice. Text. Thought.",
      youThink: "You think it → We build it.",
      youRequest: "You request it → We staff it.",
      youPlan: "You plan it → We manage it.",
      noTimeWasted: "No time wasted. No skill misused.",
      weAreUniverse: "We Are the BAWES Universe",
      modular: "Modular",
      transparent: "Transparent",
      scalable: "Scalable",
      poweredBy: "Powered by velocity",
      designedTo: "Designed to evolve with you",
      notPolitical: "We are not political.",
      notIdeological: "We are not ideological.",
      executional: "We are executional.",
      systemToBuild: "A system to build ideas, organize people, fund action, and create impact — at scale.",
      fullyOperational: "A fully operational ecosystem to build the future, now.",
      notStartup: "We are not building a startup.",
      notApp: "We are not building an app.",
      buildingNation: "We are building a nation.",
      decentralized: "A decentralized, human-first operating system.",
      madeOfSectors: "Made of sectors.",
      runByVelocity: "Run by velocity.",
      poweredByThoughts: "Powered by thoughts.",
      vision: "Vision",
      bawesIsBuilding:
        "BAWES is building the operating system for human potential. We're creating a universe where ideas transform into reality at unprecedented speed.",
      coreMission: "Core Mission",
      toCreate:
        "To create a seamless ecosystem where talent, resources, and opportunities converge instantly, powered by intelligent systems and human expertise.",
      ourBuildingBlocks: "Our Building Blocks",
      talentInfrastructure: "1. Talent Infrastructure",
      tamrRealTime: "Tamr: Real-time talent deployment system",
      studentHubMarketplace: "StudentHub: Student talent marketplace",
      pogiFull: "Pogi: Full-time recruitment engine",
      financialArchitecture: "2. Financial Architecture",
      capitalDemocratized: "The Capital: Democratized funding platform",
      plugnBusiness: "Plugn: Business operations hub",
      unifiedPayroll: "Unified Payroll: Multi-currency payment infrastructure",
      operationalExcellence: "3. Operational Excellence",
      hrManagement: "HR Management: Team optimization platform",
      salesEngine: "Sales Engine: Revenue generation system",
      whiteBookEvent: "The White Book: Event execution platform",
      operatingPrinciples: "Operating Principles",
      velocityFirst: "1. Velocity First",
      everyAction: "Every action, every deployment, every decision optimized for speed without compromising quality.",
      intelligenceDriven: "2. Intelligence Driven",
      realTimeData: "Real-time data analysis powering every match, every placement, every execution.",
      humanCentered: "3. Human Centered",
      buildingTech: "Building technology that amplifies human potential, not replaces it.",
      bawesPromise: "The BAWES Promise",
      wePromise: "We promise to:",
      executeSpeed: "Execute at unprecedented speed",
      matchPrecision: "Match with precision",
      scaleIntelligence: "Scale with intelligence",
      buildPurpose: "Build with purpose",
      impactVision: "Impact Vision",
      notJustBuilding: "We're not just building a platform - we're creating an ecosystem where:",
      talentFinds: "Talent finds its perfect match",
      ideasFind: "Ideas find their funding",
      projectsFind: "Projects find their team",
      businessesFind: "Businesses find their growth",
      theFuture: "The Future",
      bawesEvolving: "BAWES is evolving into a self-sustaining ecosystem where:",
      everyTransaction: "Every transaction creates value",
      everyConnection: "Every connection builds opportunity",
      everyAction: "Every action drives progress",
      togetherNot: "Together, we're not just building a company.",
      buildingFuture: "We're building the future of work itself.",
      welcomeTo: "Welcome to BAWES Universe.",
    },
    ar: {
      // Arabic content
      notBuilding: "نحن لا نبني تطبيقًا. نحن نبني كونًا.",
      fullyIntegrated:
        "كون متكامل بالكامل، يركز على الناس، مصمم لمساعدتك على التفكير والعمل والبناء والنمو - بشكل أسرع وأذكى وبأقل قدر من الاحتكاك.",
      dontJustSupport: "نحن لا ندعم التنفيذ فقط.",
      weAreExecution: "نحن التنفيذ - يتم نشره عند الطلب، مدعومًا بالبشر الحقيقيين، ومدعومًا بأنظمة ذكية.",
      operatingPrinciple: "مبدأ التشغيل الخاص بنا",
      effectiveRecruitment: "التوظيف الفعال = الشخص المناسب @ المكان المناسب @ الوقت المناسب",
      weOptimize: "نحن نحسن هذا مع:",
      noDelays: "لا تأخير. لا بحث لا نهاية له. لا عدم تطابق.",
      weTurn: "نحن نحول الأفكار إلى إجراءات - على الفور.",
      coreSectors: "القطاعات الأساسية لكون BAWES",
      tamrTitle: "تمر — التوظيف عند الطلب",
      tamrDesc:
        "تحتاج شخصًا الآن؟ تمر يقدم. المستقلون، المتعاقدون، العاملون بدوام جزئي، أو بدوام كامل - مطابقة ونشر بدقة. فكر: AWS للمواهب البشرية.",
      studentHubTitle: "مركز الطلاب — توظيف الطلاب من الجيل التالي",
      studentHubDesc:
        "تعاقد مع الطلاب بشروط مرنة: وظائف مؤقتة، تدريب داخلي، أدوار موسمية. نحن نتعامل مع المطابقة، كشوف المرتبات، والاستبدال. القوى العاملة الطلابية المتاحة عالميًا - محسنة للسرعة.",
      pogiTitle: "بوجي — التوظيف بدوام كامل على نطاق واسع",
      pogiDesc:
        "نحن نحدد ونقابل ونضع المواهب من الدرجة الأولى المصممة خصيصًا لأهداف عملك. توظيف بدون احتكاك مع رؤية كاملة.",
      economicSectors: "القطاعات الاقتصادية والدعم",
      capitalTitle: "رأس المال — التمويل الجماعي والقروض الصغيرة",
      capitalDesc:
        "قم بتغذية فكرتك. جمع الأموال. ابدأ. يدعم رأس المال المبتدئين والبناة بخيارات التمويل الصغير الذكية وزخم الحشد.",
      plugnTitle: "Plugn — طبقة التجارة العالمية الخاصة بنا",
      plugnDesc: "ابدأ وشغل ووسع عملك. إعداد الشركة، الفواتير، المدفوعات، الاشتراكات - تم في دقائق.",
      payrollTitle: "إدارة الرواتب",
      payrollDesc:
        "المدفوعات الآلية، العقود، وسجلات الدفع. يدعم عقود العمل المرنة، كشوف المرتبات متعددة البلدان، والتعويض القائم على السرعة.",
      organizationStack: "مجموعة التنظيم والتفويض",
      hrTitle: "إدارة الموارد البشرية",
      hrDesc: "عمليات الأشخاص الشاملة. من التأهيل إلى الاستبدال. مراقبة التقدم، قياس الأداء، وإعادة الهيكلة على الفور.",
      salesTitle: "مساعدة المبيعات",
      salesDesc:
        "نقدم لك فرق جاهزة، نصوص، عملاء محتملين، ومحركات اقتراح. قم بالتوصيل مباشرة في خط أنابيب الخاص بك. دعنا نغلق لك.",
      whiteBookTitle: "الكتاب الأبيض — تخطيط الأحداث الذكي",
      whiteBookDesc:
        "خطط ونفذ الأحداث - على الفور. من المكان إلى قائمة الضيوف، من وسائل الإعلام إلى الخدمات اللوجستية - نحن نتعامل مع كل شيء.",
      realTimeIntel: "الاستخبارات والتنفيذ في الوقت الحقيقي",
      weRun: "نحن نقوم بالمطابقة المستمرة. لا تحتاج إلى البحث - فقط اسأل.",
      needDesigner: '"أحتاج إلى مصمم لمدة 10 ساعات هذا الأسبوع."',
      needSales: '"أحتاج إلى 4 مندوبي مبيعات في دبي."',
      wantPlan: '"أريد التخطيط لحدث مجتمعي."',
      needStartup: '"أحتاج إلى فريق بدء تشغيل مبني من الصفر."',
      bawesResponds: "BAWES يستجيب بمطابقات دقيقة، التكلفة، الخيارات - والتنفيذ الكامل.",
      intelligenceLayer: "طبقة الذكاء",
      dontJustAssign: "نحن لا نعين الأشخاص فقط. نحن نحلل السلوك والتوافر والقدرة في الوقت الحقيقي.",
      youSay: "أنت تقول:",
      needMarketing: '"أحتاج إلى متدرب تسويق في الكويت بحلول يوم الخميس."',
      weProcess: "نحن نعالج:",
      whoAvailable: "من هو متاح ومؤهل",
      whoWorked: "من عمل في مشاريع مماثلة",
      whoHasTime: "من لديه الوقت والرغبة",
      whatIncentives: "ما هي الحوافز المطلوبة",
      whoCanBe: "من يمكن نشره على الفور",
      andWeRespond: "ونحن نستجيب:",
      hereAre: '"هنا 3 مرشحين تم التحقق منهم. يمكن لأحدهم البدء اليوم."',
      thoughtToAction: "محرك الفكر إلى العمل",
      youSpeak: "أنت تتحدث → نحن نفكر → نحن نبني → أنت توافق → تم.",
      whetherIts: "سواء كانت ملاحظة صوتية أو فكرة خام، نحولها إلى:",
      teamDeployment: "نشر الفريق",
      proposals: "اقتراحات",
      projectPlans: "خطط المشروع",
      financialModels: "نماذج مالية",
      launchReady: "عمليات جاهزة للإطلاق",
      delegationAtScale: "التفويض على نطاق واسع",
      voiceTextThought: "صوت. نص. فكر.",
      youThink: "أنت تفكر فيه → نحن نبنيه.",
      youRequest: "أنت تطلبه → نحن نوظفه.",
      youPlan: "أنت تخطط له → نحن نديره.",
      noTimeWasted: "لا وقت مهدر. لا مهارة مسيء استخدامها.",
      weAreUniverse: "نحن كون BAWES",
      modular: "معياري",
      transparent: "شفاف",
      scalable: "قابل للتوسع",
      poweredBy: "مدعوم بالسرعة",
      designedTo: "مصمم للتطور معك",
      notPolitical: "نحن لسنا سياسيين.",
      notIdeological: "نحن لسنا أيديولوجيين.",
      executional: "نحن تنفيذيون.",
      systemToBuild: "نظام لبناء الأفكار، تنظيم الناس، تمويل العمل، وخلق التأثير - على نطاق واسع.",
      fullyOperational: "نظام بيئي تشغيلي بالكامل لبناء المستقبل، الآن.",
      notStartup: "نحن لا نبني شركة ناشئة.",
      notApp: "نحن لا نبني تطبيقًا.",
      buildingNation: "نحن نبني أمة.",
      decentralized: "نظام تشغيل لامركزي يركز على الإنسان أولاً.",
      madeOfSectors: "مكون من قطاعات.",
      runByVelocity: "يدار بالسرعة.",
      poweredByThoughts: "مدعوم بالأفكار.",
      vision: "الرؤية",
      bawesIsBuilding:
        "BAWES يبني نظام التشغيل للإمكانات البشرية. نحن نخلق كونًا حيث تتحول الأفكار إلى واقع بسرعة غير مسبوقة.",
      coreMission: "المهمة الأساسية",
      toCreate: "لإنشاء نظام بيئي سلس حيث تتلاقى المواهب والموارد والفرص على الفور، مدعومة بأنظمة ذكية وخبرة بشرية.",
      ourBuildingBlocks: "لبنات البناء لدينا",
      talentInfrastructure: "1. البنية التحتية للمواهب",
      tamrRealTime: "تمر: نظام نشر المواهب في الوقت الحقيقي",
      studentHubMarketplace: "مركز الطلاب: سوق مواهب الطلاب",
      pogiFull: "بوجي: محرك التوظيف بدوام كامل",
      financialArchitecture: "2. الهندسة المالية",
      capitalDemocratized: "رأس المال: منصة تمويل ديمقراطية",
      plugnBusiness: "Plugn: مركز عمليات الأعمال",
      unifiedPayroll: "كشوف المرتبات الموحدة: البنية التحتية للدفع متعددة العملات",
      operationalExcellence: "3. التميز التشغيلي",
      hrManagement: "إدارة الموارد البشرية: منصة تحسين الفريق",
      salesEngine: "محرك المبيعات: نظام توليد الإيرادات",
      whiteBookEvent: "الكتاب الأبيض: منصة تنفيذ الأحداث",
      operatingPrinciples: "مبادئ التشغيل",
      velocityFirst: "1. السرعة أولاً",
      everyAction: "كل إجراء، كل نشر، كل قرار محسن للسرعة دون المساس بالجودة.",
      intelligenceDriven: "2. مدفوع بالذكاء",
      realTimeData: "تحليل البيانات في الوقت الحقيقي يدعم كل مطابقة، كل تنسيب، كل تنفيذ.",
      humanCentered: "3. متمحور حول الإنسان",
      buildingTech: "بناء تكنولوجيا تضخم الإمكانات البشرية، لا تستبدلها.",
      bawesPromise: "وعد BAWES",
      wePromise: "نحن نعد بـ:",
      executeSpeed: "التنفيذ بسرعة غير مسبوقة",
      matchPrecision: "المطابقة بدقة",
      scaleIntelligence: "التوسع بذكاء",
      buildPurpose: "البناء بهدف",
      impactVision: "رؤية التأثير",
      notJustBuilding: "نحن لا نبني منصة فقط - نحن نخلق نظامًا بيئيًا حيث:",
      talentFinds: "المواهب تجد مطابقتها المثالية",
      ideasFind: "الأفكار تجد تمويلها",
      projectsFind: "المشاريع تجد فريقها",
      businessesFind: "الأعمال تجد نموها",
      theFuture: "المستقبل",
      bawesEvolving: "BAWES يتطور إلى نظام بيئي مستدام ذاتيًا حيث:",
      everyTransaction: "كل معاملة تخلق قيمة",
      everyConnection: "كل اتصال يبني فرصة",
      everyAction: "كل إجراء يدفع التقدم",
      togetherNot: "معًا، نحن لا نبني شركة فقط.",
      buildingFuture: "نحن نبني مستقبل العمل نفسه.",
      welcomeTo: "مرحبًا بكم في كون BAWES.",
    },
  }

  const c = content[lang as keyof typeof content]
  const language = params.lang || "en"

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-black min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto" dir={isRtl ? "rtl" : "ltr"}>
            <Link href={`/${lang}`}>
              <Button variant="ghost" className="mb-8 text-white/70 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t.backToHome}
              </Button>
            </Link>

            <div className="flex justify-center mb-8">
              <div className="relative w-20 h-20">
                <img src="/images/bawes-logo.png" alt="BAWES" className="w-full h-full object-contain" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">{t.manifestoTitle}</h1>

            <div className="prose prose-lg prose-invert max-w-none">
              <div className="bg-black/50 backdrop-blur-sm border border-bawes-gold/20 rounded-2xl p-8 md:p-12 mb-12">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-1 h-full min-h-[24px] bg-gradient-to-b from-bawes-gold to-bawes-red rounded-full" />
                    <p className="text-xl text-white/90">{c.notBuilding}</p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-1 h-full min-h-[24px] bg-gradient-to-b from-bawes-gold to-bawes-red rounded-full" />
                    <p className="text-xl text-white/90">{c.fullyIntegrated}</p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-1 h-full min-h-[24px] bg-gradient-to-b from-bawes-gold to-bawes-red rounded-full" />
                    <p className="text-xl text-white/90">{c.dontJustSupport}</p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-1 h-full min-h-[24px] bg-gradient-to-b from-bawes-gold to-bawes-red rounded-full" />
                    <p className="text-xl text-white/90">{c.weAreExecution}</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-bawes-gold">⚙️</span>
                {c.operatingPrinciple}
              </h2>

              <div className="bg-black/50 backdrop-blur-sm border border-bawes-gold/20 rounded-2xl p-8 md:p-12 mb-12">
                <blockquote className="border-l-4 border-bawes-red pl-4 mb-8">
                  <p className="text-xl italic text-white/90">{c.effectiveRecruitment}</p>
                </blockquote>

                <p className="text-lg mb-6">{c.weOptimize}</p>

                <div className="mt-8 p-4 bg-gradient-to-r from-black/80 via-black/60 to-black/80 rounded-lg border border-white/10 relative overflow-hidden">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-bawes-gold/10 via-bawes-red/10 to-bawes-orange/10"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "linear",
                      }}
                      style={{
                        backgroundSize: "200% 200%",
                      }}
                    />
                  </div>

                  <p className="text-lg font-mono text-center relative z-10">
                    {language === "ar" ? (
                      <>
                        <span className="text-bawes-red">(المهارة × الجاهزية × التوفر)</span> × الوقت ={" "}
                        <span className="text-bawes-gold">التنفيذ في الوقت الحقيقي</span>
                      </>
                    ) : (
                      <>
                        <span className="text-bawes-red">(Skill × Readiness × Availability)</span> × Time ={" "}
                        <span className="text-bawes-gold">Real-time Execution</span>
                      </>
                    )}
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-lg text-white/90">{c.noDelays}</p>
                  <p className="text-lg text-white/90">{c.weTurn}</p>
                </div>
              </div>

              {/* Continue with the rest of the manifesto content */}
              {/* This is just a sample of how to continue - you would need to add all sections */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
