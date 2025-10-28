import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { translations } from "@/lib/translations"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang || "en"
  const t = translations[lang as keyof typeof translations]

  return {
    title: `${t.emptySeatTitle} | BAWES Universe`,
    description: t.emptySeatDesc,
    openGraph: {
      title: `${t.emptySeatTitle} | BAWES Universe`,
      description: t.emptySeatDesc,
      locale: lang,
    },
  }
}

export default function EmptySeatPage({ params }: Props) {
  const lang = params.lang || "en"
  const t = translations[lang as keyof typeof translations]
  const isRtl = lang === "ar"

  // Content based on language
  const content = {
    en: {
      whatIsTitle: "What Is the Empty Seat?",
      whatIsDesc: "The Empty Seat is a symbolic and structural decision within the BAWES Universe. It means:",
      noIndividual: "No individual owns the throne.",
      noPermanent: "No one is the permanent ruler.",
      allPower: "All power is borrowed, not held.",
      whileThere:
        "While there may be a founder or temporary leader guiding the system, the Empty Seat represents the belief that no person should be at the center of the world — the ideas, structure, and purpose are.",
      whyItExists: "Why It Exists",
      preserveTitle: "Preserve Creative Freedom",
      preserveDesc:
        "The Empty Seat allows the world to operate without pressure from external investors, short-term elections, or internal power struggles. It protects the creative vision from being compromised.",
      enableTitle: "Enable Continuity",
      enableDesc:
        "If the founder or any key individual steps away, the Universe continues. No crisis of leadership occurs because the seat was never meant to be filled.",
      discourageTitle: "Discourage Entitlement",
      discourageDesc:
        "There are no permanent roles or special privileges. Every position is temporary and earned through relevance, contribution, and velocity.",
      supportTitle: "Support Scalable Autonomy",
      supportDesc:
        "Over time, systems will govern systems. Roles and decisions will be handled by infrastructure — not personalities.",
      whatItIsNot: "What It Is Not",
      notDemocracy: "It is not a democracy or shared governance model.",
      notLeaderless: "It does not imply the world is leaderless — only that leadership is functional, not symbolic.",
      notNoSay:
        "It does not mean the founder has no say — rather, the founder actively chooses not to sit on the throne.",
      implications: "Implications for HR & Internal Teams",
      titlesTemp: "Titles Are Temporary",
      noRole: "No role is permanent.",
      authority: "Authority must be earned and renewed through contribution.",
      noEntitlement: "No Entitlement or Succession Promises",
      noPaths: 'There are no paths to "own" the world or inherit the system.',
      evenSenior: "Even senior roles exist to serve the mission, not accumulate power.",
      performance: "Performance Over Politics",
      measure: "The measure of influence is contribution, not politics or positioning.",
      transparency: "Transparency and merit are baked into team dynamics.",
      documentation: "Documentation is Key",
      everything: "Everything must be documented so the world functions even if people change.",
      hrResponsible:
        "HR is responsible for helping individuals onboard into this mindset and transition out with full handoff protocols.",
      recruiting: "Recruiting with Clarity",
      whenHiring: "When hiring, be clear that we are building a universe, not a company.",
      reward: "The reward is contribution, growth, purpose — not control.",
      closingNote: "Closing Note",
      notSystem: "The Empty Seat is not a system of control. It is the absence of one.",
      itExists: "It exists to protect the integrity, longevity, and clarity of the BAWES Universe.",
      letAll: "Let all who participate understand this seat is sacred — because it is empty.",
    },
    ar: {
      whatIsTitle: "ما هو المقعد الفارغ؟",
      whatIsDesc: "المقعد الفارغ هو قرار رمزي وهيكلي داخل كون BAWES. وهذا يعني:",
      noIndividual: "لا يملك أي فرد السلطة المطلقة.",
      noPermanent: "لا أحد هو القائد الدائم.",
      allPower: "كل السلطة مستعارة، وليست مملوكة.",
      whileThere:
        "بينما قد يكون هناك مؤسس أو قائد مؤقت يوجه النظام، يمثل المقعد الفارغ الاعتقاد بأنه لا ينبغي أن يكون أي شخص في مركز العالم - بل الأفكار والهيكل والغرض.",
      whyItExists: "لماذا هو موجود",
      preserveTitle: "الحفاظ على الحرية الإبداعية",
      preserveDesc:
        "يسمح المقعد الفارغ للعالم بالعمل دون ضغط من المستثمرين الخارجيين، أو الانتخابات قصيرة المدى، أو الصراعات الداخلية على السلطة. إنه يحمي الرؤية الإبداعية من التعرض للخطر.",
      enableTitle: "تمكين الاستمرارية",
      enableDesc: "إذا ابتعد المؤسس أو أي فرد رئيسي، يستمر الكون. لا تحدث أزمة قيادة لأن المقعد لم يكن مخصصًا للملء.",
      discourageTitle: "تثبيط الاستحقاق",
      discourageDesc:
        "لا توجد أدوار دائمة أو امتيازات خاصة. كل منصب مؤقت ويتم اكتسابه من خلال الصلة والمساهمة والسرعة.",
      supportTitle: "دعم الاستقلالية القابلة للتوسع",
      supportDesc:
        "بمرور الوقت، ستحكم الأنظمة الأنظمة. سيتم التعامل مع الأدوار والقرارات من خلال البنية التحتية - وليس الشخصيات.",
      whatItIsNot: "ما ليس عليه",
      notDemocracy: "إنه ليس نموذجًا للديمقراطية أو الحكم المشترك.",
      notLeaderless: "لا يعني أن العالم بلا قيادة - فقط أن القيادة وظيفية، وليست رمزية.",
      notNoSay: "لا يعني أن المؤسس ليس له رأي - بل إن المؤسس يختار بنشاط عدم تولي السلطة المطلقة.",
      implications: "الآثار المترتبة على الموارد البشرية والفرق الداخلية",
      titlesTemp: "العناوين مؤقتة",
      noRole: "لا يوجد دور دائم.",
      authority: "يجب كسب السلطة وتجديدها من خلال المساهمة.",
      noEntitlement: "لا وعود بالاستحقاق أو الخلافة",
      noPaths: 'لا توجد مسارات "لامتلاك" العالم أو وراثة النظام.',
      evenSenior: "حتى الأدوار العليا موجودة لخدمة المهمة، وليس لتراكم السلطة.",
      performance: "الأداء فوق السياسة",
      measure: "مقياس التأثير هو المساهمة، وليس السياسة أو المواقف.",
      transparency: "الشفافية والجدارة متأصلة في ديناميكيات الفريق.",
      documentation: "التوثيق أمر أساسي",
      everything: "يجب توثيق كل شيء حتى يعمل العالم حتى لو تغير الناس.",
      hrResponsible:
        "الموارد البشرية مسؤولة عن مساعدة الأفراد على الانضمام إلى هذه العقلية والانتقال مع بروتوكولات التسليم الكاملة.",
      recruiting: "التوظيف بوضوح",
      whenHiring: "عند التوظيف، كن واضحًا أننا نبني كونًا، وليس شركة.",
      reward: "المكافأة هي المساهمة والنمو والهدف - وليس السيطرة.",
      closingNote: "ملاحظة ختامية",
      notSystem: "المقعد الفارغ ليس نظامًا للسيطرة. إنه غياب واحد.",
      itExists: "إنه موجود لحماية نزاهة واستمرارية ووضوح كون BAWES.",
      letAll: "دع كل من يشارك يفهم أن هذا المقعد ذو قيمة عالية - لأنه فارغ.",
    },
  }

  const c = content[lang as keyof typeof content]

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

            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">{t.emptySeatTitle}</h1>

            <div className="prose prose-lg prose-invert max-w-none">
              <div className="bg-black/50 backdrop-blur-sm border border-bawes-gold/20 rounded-2xl p-8 md:p-12 mb-12">
                <h2 className="text-2xl font-bold mb-6 text-white">{c.whatIsTitle}</h2>

                <p className="text-lg text-white/80 mb-6">{c.whatIsDesc}</p>

                <ul className="list-disc pl-6 space-y-2 text-white/80 mb-8">
                  <li>{c.noIndividual}</li>
                  <li>{c.noPermanent}</li>
                  <li>{c.allPower}</li>
                </ul>

                <p className="text-lg text-white/80">{c.whileThere}</p>
              </div>

              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-bawes-gold">🪑</span>
                {c.whyItExists}
              </h2>

              <div className="bg-black/50 backdrop-blur-sm border border-bawes-gold/20 rounded-2xl p-8 md:p-12 mb-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-bawes-gold/10 rounded-xl p-6 border border-bawes-gold/20">
                    <h3 className="text-xl font-bold mb-3 text-bawes-gold">{c.preserveTitle}</h3>
                    <p className="text-white/80">{c.preserveDesc}</p>
                  </div>

                  <div className="bg-bawes-red/10 rounded-xl p-6 border border-bawes-red/20">
                    <h3 className="text-xl font-bold mb-3 text-bawes-red">{c.enableTitle}</h3>
                    <p className="text-white/80">{c.enableDesc}</p>
                  </div>

                  <div className="bg-bawes-orange/10 rounded-xl p-6 border border-bawes-orange/20">
                    <h3 className="text-xl font-bold mb-3 text-bawes-orange">{c.discourageTitle}</h3>
                    <p className="text-white/80">{c.discourageDesc}</p>
                  </div>

                  <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
                    <h3 className="text-xl font-bold mb-3 text-blue-500">{c.supportTitle}</h3>
                    <p className="text-white/80">{c.supportDesc}</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-bawes-red">⚠️</span>
                {c.whatItIsNot}
              </h2>

              <div className="bg-black/50 backdrop-blur-sm border border-bawes-gold/20 rounded-2xl p-8 md:p-12 mb-12">
                <ul className="space-y-4 list-disc pl-6">
                  <li className="text-white/80">{c.notDemocracy}</li>
                  <li className="text-white/80">{c.notLeaderless}</li>
                  <li className="text-white/80">{c.notNoSay}</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-bawes-gold">👥</span>
                {c.implications}
              </h2>

              <div className="bg-black/50 backdrop-blur-sm border border-bawes-gold/20 rounded-2xl p-8 md:p-12 mb-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">{c.titlesTemp}</h3>
                    <ul className="list-disc pl-6 space-y-1 text-white/80">
                      <li>{c.noRole}</li>
                      <li>{c.authority}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">{c.noEntitlement}</h3>
                    <ul className="list-disc pl-6 space-y-1 text-white/80">
                      <li>{c.noPaths}</li>
                      <li>{c.evenSenior}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">{c.performance}</h3>
                    <ul className="list-disc pl-6 space-y-1 text-white/80">
                      <li>{c.measure}</li>
                      <li>{c.transparency}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">{c.documentation}</h3>
                    <ul className="list-disc pl-6 space-y-1 text-white/80">
                      <li>{c.everything}</li>
                      <li>{c.hrResponsible}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">{c.recruiting}</h3>
                    <ul className="list-disc pl-6 space-y-1 text-white/80">
                      <li>{c.whenHiring}</li>
                      <li>{c.reward}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-bawes-orange">🔑</span>
                {c.closingNote}
              </h2>

              <div className="bg-gradient-to-br from-black to-bawes-gold/10 rounded-2xl p-8 md:p-12 mb-12 border border-bawes-gold/20">
                <div className="space-y-4 text-center">
                  <p className="text-xl text-white/90">{c.notSystem}</p>
                  <p className="text-xl text-white/90">{c.itExists}</p>
                  <p className="text-xl text-white/90 italic">{c.letAll}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
