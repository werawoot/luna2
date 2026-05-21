import { FlowlyHeroScene } from "./components/FlowlyHeroScene";

const lineUrl = "https://line.me/R/ti/p/@flowly";

const pains = [
  "จดงานในกระดาษแล้วค้นประวัติลูกค้ายาก",
  "คุยลูกค้าใน LINE แล้วข้อมูลสำคัญหาย",
  "ลูกค้าโทรถามสถานะงานซ้ำจนทีมเสียเวลา",
  "ไม่รู้กำไรจริงจากงานขายและงานบริการ",
  "งานหลุด คิวหลุด ลูกค้าหลุด เพราะข้อมูลกระจาย"
];

const solutions = [
  "จัดการคิวและนัดหมายแบบเห็นภาพรวม",
  "จัดการงานบริการตั้งแต่รับงานถึงปิดงาน",
  "เก็บข้อมูลลูกค้าและประวัติการใช้บริการ",
  "เชื่อม LINE แจ้งเตือนสถานะงานอัตโนมัติ",
  "ดูยอดขาย กำไร และรายงานสำคัญบน Dashboard",
  "ลดงานซ้ำของพนักงานและลดความผิดพลาด"
];

const proofPoints = [
  {
    value: "100,000+",
    label: "มาตรฐานงานระบบที่เคยขายเป็นโปรเจกต์"
  },
  {
    value: "6,900",
    label: "ราคาเริ่มต้นที่ SME เข้าถึงได้"
  },
  {
    value: "1 ระบบ",
    label: "รวมคิว งานขาย ลูกค้า LINE และรายงาน"
  }
];

const features = [
  {
    title: "Booking / Job Management",
    description: "โปรแกรมจัดการคิวและงานบริการ เห็นสถานะงานแบบ real-time ตั้งแต่รับลูกค้าถึงส่งมอบ"
  },
  {
    title: "POS / Sales",
    description: "โปรแกรม POS สำหรับ SME รองรับงานขาย หน้าร้าน ใบเสนอราคา ใบเสร็จ และสรุปยอดขาย"
  },
  {
    title: "LINE Notification",
    description: "ระบบเชื่อม LINE สำหรับธุรกิจ แจ้งเตือนลูกค้าและทีมงาน ลดการโทรถามสถานะซ้ำ"
  },
  {
    title: "Customer CRM",
    description: "ระบบ CRM สำหรับร้านค้า เก็บข้อมูลลูกค้า ประวัติการซื้อ งานซ่อม และการติดตาม"
  },
  {
    title: "Dashboard Analytics",
    description: "Dashboard อัจฉริยะ ดูยอดขาย กำไร งานค้าง คิววันนี้ และ insight ที่เจ้าของร้านต้องรู้"
  },
  {
    title: "Staff / Inventory",
    description: "จัดการพนักงาน สต็อก อะไหล่ วัสดุ และต้นทุน เพื่อให้ธุรกิจเดินงานได้เป็นระบบ"
  }
];

const verticals = [
  "อู่รถ",
  "ร้านแอร์รถยนต์",
  "ร้านซ่อมรถ",
  "ร้านวัสดุก่อสร้าง",
  "คลินิก",
  "ร้านอาหาร"
];

const softwareShowcases = [
  {
    name: "Flowly Auto Garage",
    keyword: "ระบบจัดการอู่รถ",
    description: "รับรถ เปิดงานซ่อม แจ้งสถานะ เก็บประวัติรถ และดูรายงานกำไรต่อใบงาน"
  },
  {
    name: "Flowly Auto Air",
    keyword: "โปรแกรมร้านแอร์รถยนต์",
    description: "จัดคิวซ่อมแอร์ สต็อกน้ำยา อะไหล่ บิลขาย และแจ้งลูกค้าผ่าน LINE"
  },
  {
    name: "Flowly Repair Shop",
    keyword: "ระบบจัดการร้านซ่อมรถ",
    description: "คุมงานช่าง สถานะซ่อม ใบเสนอราคา อะไหล่ และประวัติลูกค้ารายคัน"
  },
  {
    name: "Flowly Retail POS",
    keyword: "โปรแกรม POS สำหรับ SME",
    description: "ขายหน้าร้าน รับชำระเงิน สรุปยอดขาย สต็อก และรายงานสำหรับเจ้าของ"
  },
  {
    name: "Flowly Clinic Queue",
    keyword: "โปรแกรมจัดการคิว",
    description: "จองคิว ติดตามลูกค้า ส่งแจ้งเตือน และดูประสิทธิภาพทีมบริการ"
  },
  {
    name: "Flowly CRM Line",
    keyword: "ระบบ CRM สำหรับร้านค้า",
    description: "เก็บลูกค้า แบ่งกลุ่ม ติดตามซ้ำ และใช้ระบบเชื่อม LINE สำหรับธุรกิจ"
  }
];

const pricing = [
  {
    name: "Starter",
    price: "เริ่มต้น 6,900 บาท",
    description: "เหมาะกับร้านที่เริ่มเปลี่ยนจาก Excel / LINE / กระดาษ"
  },
  {
    name: "Standard",
    price: "ประเมินตามระบบที่ใช้",
    description: "เหมาะกับร้านที่ต้องการระบบจริงจัง มีทีมงานและรายงานสำหรับเจ้าของ"
  },
  {
    name: "Pro",
    price: "สำหรับหลายสาขา",
    description: "เหมาะกับธุรกิจที่ต้องการจัดการหลายทีม หลายสาขา และ workflow เฉพาะ"
  }
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h11m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="none">
      <path d="m4.5 10.5 3.4 3.2 7.6-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <section className="relative min-h-[92svh] overflow-hidden px-5 pb-14 pt-6 sm:px-6 lg:min-h-[860px] lg:px-8 lg:pb-10 xl:min-h-[900px]">
        <FlowlyHeroScene />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_16%,rgba(47,125,255,0.18),transparent_14rem),linear-gradient(180deg,rgba(6,16,31,0.26)_0%,rgba(6,16,31,0.82)_34%,rgba(6,16,31,0.96)_72%)] lg:bg-[radial-gradient(circle_at_72%_42%,rgba(47,125,255,0.1),transparent_31rem),linear-gradient(90deg,rgba(6,16,31,0.98)_0%,rgba(6,16,31,0.92)_36%,rgba(6,16,31,0.46)_62%,rgba(6,16,31,0.7)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/70 to-transparent lg:h-32 lg:via-white/45" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between" aria-label="Main navigation">
          <a href="#" className="text-xl font-bold tracking-normal text-white">Flowly</a>
          <a
            href={lineUrl}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-navy-950 transition hover:bg-electric-300"
          >
            ทัก LINE
            <ArrowIcon />
          </a>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl pt-52 sm:pt-56 lg:min-h-[760px] lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-8 lg:pt-0 xl:grid-cols-[0.78fr_1.22fr]">
          <div className="max-w-3xl lg:max-w-[680px]">
            <p className="mb-5 inline-flex rounded-full border border-electric-400/30 bg-electric-500/10 px-4 py-2 text-sm font-medium text-electric-300 shadow-[0_0_50px_rgba(47,125,255,0.28)]">
              ระบบมาตรฐานโปรเจกต์หลักแสน สำหรับ SME ไทย
            </p>
            <h1 className="text-balance text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-[62px] lg:leading-[1] xl:text-[70px]">
              ลดงานซ้ำ เพิ่มกำไร จัดการธุรกิจได้ในระบบเดียว
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 lg:max-w-[640px]">
              Flowly นำมาตรฐานงานระบบที่เคยทำขายเป็นโปรเจกต์ระดับ 100,000 บาทขึ้นไป มาจัดเป็นซอฟต์แวร์สำเร็จรูปให้ SME ไทยเริ่มใช้ได้ตั้งแต่ 6,900 บาท เชื่อม LINE ได้ พร้อม Dashboard อัจฉริยะ
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={lineUrl}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-electric-500 px-6 text-base font-semibold text-white shadow-glow transition hover:bg-electric-400"
              >
                ทัก LINE รับ Demo ฟรี
                <ArrowIcon />
              </a>
              <a
                href="#features"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/16 bg-white/8 px-6 text-base font-semibold text-white transition hover:bg-white/14"
              >
                ดูตัวอย่างระบบ
              </a>
            </div>
            <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3 text-sm text-slate-200">
              {["คิวงานอัจฉริยะ", "CRM + LINE", "รายงานกำไร"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.07] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 grid max-w-2xl gap-3 sm:grid-cols-3">
              {proofPoints.map((point) => (
                <div key={point.value} className="rounded-2xl border border-electric-300/15 bg-navy-950/40 p-4 backdrop-blur">
                  <p className="text-2xl font-semibold text-white">{point.value}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">{point.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none relative hidden h-[620px] lg:block">
            <div className="absolute right-4 top-16 w-[310px] rounded-3xl border border-white/12 bg-white/[0.08] p-4 shadow-glow backdrop-blur-xl xl:right-0 xl:top-10 xl:w-[360px]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Flowly Command Center</p>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">Live</span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  ["ยอดขาย", "84k"],
                  ["คิว", "32"],
                  ["กำไร", "29k"]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-navy-950/50 p-3">
                    <p className="text-[11px] text-slate-400">{label}</p>
                    <p className="mt-2 text-xl font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-28 left-8 w-[280px] rounded-3xl border border-white/12 bg-white/[0.075] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl xl:left-16">
              <p className="text-sm font-semibold text-white">งานล่าสุด</p>
              <div className="mt-4 space-y-3">
                {["แจ้งลูกค้าผ่าน LINE", "ปิดงานซ่อมรถ", "อัปเดตสต็อกอะไหล่"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-electric-500/15 text-xs font-semibold text-electric-300">{index + 1}</span>
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 text-navy-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-electric-500">Software Suite</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">ไม่ใช่แค่เว็บสวย แต่คือชุดซอฟต์แวร์ธุรกิจที่พร้อมปรับเข้ากับร้านคุณ</h2>
            </div>
            <p className="leading-8 text-slate-600">
              เจ้าของร้านไม่จำเป็นต้องเริ่มจากศูนย์เหมือนจ้างทำระบบใหม่ Flowly แตกเป็นตัวอย่างระบบสำหรับหลายธุรกิจ เพื่อให้เห็นภาพเร็ว เลือก workflow ที่ใกล้เคียง แล้วปรับให้เข้ากับร้านจริงได้เร็วขึ้น
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {softwareShowcases.map((software) => (
              <article key={software.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-card">
                <p className="text-sm font-semibold text-electric-500">{software.keyword}</p>
                <h3 className="mt-3 text-xl font-semibold">{software.name}</h3>
                <p className="mt-3 leading-7 text-slate-600">{software.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 text-navy-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-electric-500">Pain points</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">ร้านคุณยังเจอปัญหาแบบนี้อยู่ไหม?</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {pains.map((pain) => (
              <div key={pain} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-card">
                <div className="mb-4 h-1.5 w-10 rounded-full bg-electric-500" />
                <p className="leading-7 text-slate-700">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-16 text-navy-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-electric-500">Solution</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Flowly ช่วยให้ร้านทำงานเป็นระบบขึ้น</h2>
            <p className="mt-5 leading-8 text-slate-600">
              รวมคิว งานขาย ลูกค้า ทีมงาน LINE และรายงานไว้ในที่เดียว เพื่อให้เจ้าของธุรกิจเห็นภาพจริงและตัดสินใจได้เร็วขึ้น
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {solutions.map((solution) => (
              <div key={solution} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                <span className="text-electric-500"><CheckIcon /></span>
                <p className="leading-7 text-slate-700">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-white px-5 py-16 text-navy-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-electric-500">Features</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">ฟีเจอร์หลักสำหรับระบบจัดการธุรกิจ SME</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-electric-500/10 text-electric-500">
                  <CheckIcon />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-electric-300">Thai SME Verticals</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">ออกแบบเพื่อธุรกิจ SME ไทย</h2>
            <p className="mt-5 leading-8 text-slate-300">
              Flowly รองรับงานเฉพาะทาง เช่น ระบบจัดการอู่รถ โปรแกรมร้านแอร์รถยนต์ ระบบจัดการร้านซ่อมรถ และธุรกิจบริการที่ต้องดูคิว ลูกค้า สต็อก และกำไรทุกวัน
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {verticals.map((vertical) => (
              <div key={vertical} className="rounded-2xl border border-white/10 bg-white/[0.06] p-6">
                <p className="text-xl font-semibold text-white">{vertical}</p>
                <p className="mt-3 leading-7 text-slate-300">ปรับ workflow ให้เข้ากับหน้างานจริง ลดข้อมูลตกหล่น และดูรายงานได้ในที่เดียว</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-16 text-navy-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-electric-500">Pricing</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">แพ็กเกจเริ่มต้นสำหรับร้านที่อยากโตแบบมีระบบ</h2>
            </div>
            <a href={lineUrl} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-navy-950 px-5 font-semibold text-white transition hover:bg-electric-500">
              ทัก LINE เพื่อประเมินราคา
              <ArrowIcon />
            </a>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {pricing.map((plan) => (
              <article key={plan.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                <p className="mt-4 text-xl font-semibold text-electric-500">{plan.price}</p>
                <p className="mt-4 leading-7 text-slate-600">{plan.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 text-navy-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[28px] bg-navy-950 px-6 py-12 text-center shadow-glow sm:px-10">
          <h2 className="text-balance text-3xl font-semibold text-white sm:text-4xl">อยากรู้ว่าร้านคุณลดงานซ้ำได้แค่ไหน?</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
            ส่งรูปแบบร้านหรือขั้นตอนงานที่ใช้อยู่ตอนนี้มาให้ทีม Flowly ประเมินได้ฟรี เหมาะสำหรับเจ้าของร้านที่อยากเห็น Demo ก่อนตัดสินใจ
          </p>
          <a href={lineUrl} className="mt-8 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-electric-500 px-7 font-semibold text-white transition hover:bg-electric-400">
            ทัก LINE เพื่อรับ Demo ฟรี
            <ArrowIcon />
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-10 text-navy-950 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xl font-bold">Flowly</p>
            <p className="mt-2 text-slate-600">ระบบจัดการธุรกิจยุคใหม่สำหรับ SME ไทย</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
            <a href="https://facebook.com/flowly" aria-label="Flowly Facebook">Facebook</a>
            <a href={lineUrl} aria-label="Flowly LINE">LINE</a>
            <a href="mailto:hello@flowly.co">hello@flowly.co</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
