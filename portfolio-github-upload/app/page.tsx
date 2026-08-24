"use client";

/* eslint-disable @next/next/no-img-element -- vinext preview serves local public assets directly. */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = ["AI求职助手", "个人简历网站"];
const serviceColors = ["#f7ded9", "#d6e6f7"] as const;
const aiJobAssistantScreens = [
  { label: "初始状态", src: "/ai-job-assistant/1.原始.png" },
  { label: "岗位解析", src: "/ai-job-assistant/2.岗位解析.png" },
  { label: "简历优化", src: "/ai-job-assistant/3.简历优化.png" },
  { label: "打招呼话术", src: "/ai-job-assistant/4.打招呼话术.png" },
  { label: "Prompt 配置", src: "/ai-job-assistant/5.Prompt配置.png" },
] as const;

const heroTrailShapes = [
  "trail-particle--orb-pink",
  "trail-particle--orb-green",
  "trail-particle--flower",
  "trail-particle--bolt",
  "trail-particle--diamond",
  "trail-particle--capsules",
  "trail-particle--bow",
  "trail-particle--spark",
] as const;

function PendingBlobReveal() {
  const rootRef = useRef<HTMLParagraphElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const blobRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const word = wordRef.current;
    const blob = blobRef.current;
    if (!root || !word || !blob) return;

    const characters = Array.from(word.querySelectorAll<HTMLSpanElement>("i"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timeline: gsap.core.Timeline | undefined;

    const placeBlob = () => {
      const wordLeft = word.offsetLeft;
      const wordRight = wordLeft + word.offsetWidth;
      const gap = 22;
      const home = wordRight + gap;
      const start = wordLeft - gap;

      timeline?.kill();
      gsap.set(characters, { clearProps: "filter,opacity,transform" });
      gsap.set(blob, { autoAlpha: 1, x: home, yPercent: -50 });

      if (reducedMotion) return;

      timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.65 });
      timeline
        .to({}, { duration: 1.35 })
        .to(blob, { x: start, duration: 0.55, ease: "none" })
        .to(characters, {
          autoAlpha: 0,
          duration: 0.22,
          filter: "blur(10px)",
          stagger: { each: 0.07, from: "end" },
          y: 14,
        }, "<+0.05")
        .to({}, { duration: 0.12 })
        .to(blob, { x: home, duration: 0.65, ease: "none" })
        .to(characters, {
          autoAlpha: 1,
          duration: 0.28,
          filter: "blur(0px)",
          stagger: 0.08,
          y: 0,
        }, "<+0.08");
    };

    placeBlob();
    const resizeObserver = new ResizeObserver(placeBlob);
    resizeObserver.observe(root);

    return () => {
      resizeObserver.disconnect();
      timeline?.kill();
    };
  }, []);

  return <p className="services-pending" ref={rootRef} aria-label="未完待续">
    <span className="services-pending-word" ref={wordRef} aria-hidden="true">
      {Array.from("未完待续").map((character, index) => <i key={`${character}-${index}`}>{character}</i>)}
    </span>
    <b className="services-pending-blob" ref={blobRef} aria-hidden="true" />
  </p>;
}

const dataSpacePrototypeScreens = [
  { label: "登录页", src: "/internship/data-space/1.登录页.png", width: 1352, height: 754 },
  { label: "首页", src: "/internship/data-space/2.首页.png", width: 970, height: 572 },
  { label: "需求大厅", src: "/internship/data-space/3.需求大厅.png", width: 1206, height: 682 },
  { label: "需求发布", src: "/internship/data-space/4需求发布.png", width: 1500, height: 840 },
  { label: "数据产品集市", src: "/internship/data-space/5.数据产品集市.png", width: 1050, height: 894 },
  { label: "数据产品详情", src: "/internship/data-space/6.数据产品详情.png", width: 1232, height: 696 },
  { label: "个人中心", src: "/internship/data-space/7.个人中心.png", width: 1318, height: 740 },
  { label: "我发布的", src: "/internship/data-space/8.我发布的.png", width: 1844, height: 1050 },
  { label: "首页管理", src: "/internship/data-space/9.首页管理.png", width: 1388, height: 780 },
  { label: "热门产品管理", src: "/internship/data-space/10.热门产品管理.png", width: 2178, height: 1230 },
  { label: "需求大厅管理", src: "/internship/data-space/11.需求大厅管理.png", width: 1582, height: 894 },
  { label: "产品集市管理", src: "/internship/data-space/12.产品集市管理.png", width: 1802, height: 996 },
  { label: "审核中心", src: "/internship/data-space/13.审核中心.png", width: 964, height: 540 },
  { label: "审核中心预览", src: "/internship/data-space/14.审核中心预览.png", width: 1442, height: 938 },
  { label: "外观配置", src: "/internship/data-space/15.外观配置.png", width: 1200, height: 684 },
  { label: "消息中心", src: "/internship/data-space/16.消息中心.png", width: 1546, height: 872 },
] as const;

const computeSpacePrototypeScreens = [
  { label: "登录页", src: "/internship/compute-space/1.登录.png", width: 954, height: 528 },
  { label: "个人中心", src: "/internship/compute-space/2.个人中心.png", width: 1714, height: 962 },
  { label: "企业认证", src: "/internship/compute-space/3.企业认证.png", width: 1474, height: 888 },
  { label: "个人认证", src: "/internship/compute-space/4.个人认证.png", width: 1202, height: 672 },
  { label: "认证完成", src: "/internship/compute-space/5.认证完成.png", width: 1246, height: 690 },
  { label: "法人管理", src: "/internship/compute-space/6.法人管理.png", width: 1630, height: 906 },
  { label: "账号管理", src: "/internship/compute-space/7.账号管理.png", width: 956, height: 538 },
  { label: "业务备案", src: "/internship/compute-space/8.业务备案.png", width: 1056, height: 598 },
  { label: "审核详情", src: "/internship/compute-space/9.审核详情.png", width: 1364, height: 886 },
  { label: "审核详情", src: "/internship/compute-space/10.审核详情.png", width: 1676, height: 930 },
] as const;

const medicalResearchPrototypeScreens = [
  { label: "调研文档 01", src: "/internship/medical-research/1.png", width: 1948, height: 1094 },
  { label: "调研文档 02", src: "/internship/medical-research/2.png", width: 1948, height: 1090 },
  { label: "调研文档 03", src: "/internship/medical-research/3.png", width: 1950, height: 1094 },
  { label: "调研文档 04", src: "/internship/medical-research/4.png", width: 1948, height: 1092 },
  { label: "调研文档 05", src: "/internship/medical-research/5.png", width: 1948, height: 1096 },
  { label: "调研文档 06", src: "/internship/medical-research/6.png", width: 1946, height: 1096 },
  { label: "调研文档 07", src: "/internship/medical-research/7.png", width: 1946, height: 1096 },
  { label: "调研文档 08", src: "/internship/medical-research/8.png", width: 1940, height: 1096 },
  { label: "调研文档 09", src: "/internship/medical-research/9.png", width: 1946, height: 1090 },
  { label: "调研文档 10", src: "/internship/medical-research/10.png", width: 1946, height: 1094 },
  { label: "调研文档 11", src: "/internship/medical-research/11.png", width: 1946, height: 1094 },
  { label: "调研文档 12", src: "/internship/medical-research/12.png", width: 1944, height: 1098 },
] as const;

const internshipProjects = [
  {
    title: "可信数据空间平台",
    company: "每日互动股份有限公司",
    color: "#b9d8ff",
    tags: ["0-1 建设", "B端产品", "双端设计"],
    content: ["面向政企用户搭建数据产品展示与供需撮合平台，解决产品曝光不足、供需对接困难等问题。", "独立完成用户端与运营后台设计、输出30+ 张原型和 PRD，推动平台上线"],
    result: "成功交付给2家客户，创造数十万元营收",
    details: [
      ["产品调研", "· 收集业务反馈，梳理政企用户需求\n· 分析竞品定位、功能与交互设计\n· 明确“产品展示+供需撮合”定位"],
      ["产品规划", "· 规划用户端与后台运营端双端架构\n· 设计产品集市、需求大厅、运营管理等功能\n· 输出30+张原型图与完整PRD"],
      ["项目跟进", "· 组织 10+ 次需求评审会\n· 协同开发、测试推动需求落地"],
    ],
  },
  {
    title: "可信计算空间",
    company: "每日互动股份有限公司",
    color: "#ccebbf",
    tags: ["1-N", "SaaS 账号体系", "全局工作台"],
    content: ["围绕账号开通效率低、多模块操作复杂两大问题，重构企业自助注册流程与全局工作台。", "协同研发、测试推动落地，形成从用户反馈到体验验证的完整迭代闭环。"],
    result: "账号创建效率提升约 80%，获用户积极反馈",
    details: [
      ["需求挖掘", "· 收集用户反馈与客服工单\n· 明确优化企业账号人工创建流程冗长问题\n· 明确设计全局工作台，提升用户的工作效率"],
      ["产品优化", "· 设计企业与个人自助注册流程\n· 搭建主子账号及企业认证体系\n· 设计分角色的全局任务工作台"],
      ["推动落地", "· 组织评审并协调开发、测试\n· 跟踪上线后的使用情况与反馈"],
    ],
  },
  {
    title: "医疗器械项目调研",
    company: "杭州泰格医药科技股份有限公司",
    color: "#eadfb4",
    tags: ["医生访谈", "竞品分析", "行业研究"],
    content: ["围绕手术机器人投资前评估，从临床需求、产品能力、市场竞争等维度开展系统调研。", "通过医生访谈、资料研究和竞品对比，输出可支持投资判断的结构化报告。"],
    result: "完成 3 份报告 · 采纳率 85%",
    details: [
      ["临床需求验证", "· 访谈多位临床外科医生\n· 梳理手术流程和现有方案痛点\n· 明确临床需求及医院落地可行性"],
      ["竞品分析", "· 从产品市场、核心功能、用户体验三个维度分析\n· 明确产品差异化优势和市场定位\n· 输出竞品分析报告"],
      ["决策支持", "· 整理访谈、竞品及行业信息\n· 完成 3 份报告，采纳率达 85%\n· 沉淀可复用的项目调研模板"],
    ],
  },
] as const;

const internships = [
  {
    company: "每日互动股份有限公司",
    logo: "/tech-logo.png",
    role: "产品实习生",
    period: "2025.07–2025.12",
    projects: ["可信数据空间平台", "可信计算空间"],
  },
  {
    company: "杭州泰格医药科技股份有限公司",
    logo: "/tigermed-logo.png",
    role: "市场调研实习生",
    period: "2024.07–2024.09",
    projects: ["医疗器械项目调研"],
  },
] as const;

function ScratchContactCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const scratchCountRef = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (revealed || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const drawCover = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * ratio));
      canvas.height = Math.max(1, Math.round(rect.height * ratio));
      const context = canvas.getContext("2d");
      if (!context) return;
      context.scale(ratio, ratio);
      context.fillStyle = "#d9dbe1";
      context.fillRect(0, 0, rect.width, rect.height);
      context.strokeStyle = "rgba(116, 120, 132, .28)";
      context.lineWidth = 2;
      for (let x = -rect.height; x < rect.width + rect.height; x += 12) {
        context.beginPath();
        context.moveTo(x, rect.height);
        context.lineTo(x + rect.height, 0);
        context.stroke();
      }
      context.fillStyle = "#737782";
      context.font = "700 14px Arial, sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("刮开查看", rect.width / 2, rect.height / 2);
    };
    drawCover();
    const observer = new ResizeObserver(drawCover);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [revealed]);

  const scratch = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || revealed) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    context.save();
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(x, y, 30, 0, Math.PI * 2);
    context.fill();
    context.restore();
    scratchCountRef.current += 1;
    if (scratchCountRef.current > 14) setRevealed(true);
  };

  const copyValue = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const followCardEyes = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)));
    const y = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)));
    event.currentTarget.style.setProperty("--card-eye-x", String(x));
    event.currentTarget.style.setProperty("--card-eye-y", String(y));
  };

  const contactIcon = icon === "phone" ? <svg viewBox="0 0 32 32" focusable="false"><path d="M9 3.5 5.5 7c-1.5 1.5-.7 6.1 3.8 10.7S18.5 23 20 21.5l3.5-3.5-4.2-4.2-2.8 2.1c-1.6-.8-3.2-2.4-4-4L14.7 9Z" /></svg> : icon === "mail" ? <svg viewBox="0 0 32 32" focusable="false"><rect x="3.5" y="7" width="25" height="18" rx="2" /><path d="m5 9 11 8 11-8" /></svg> : <svg viewBox="0 0 32 32" focusable="false"><path d="M6 6.5h19a5 5 0 0 1 5 5v7a5 5 0 0 1-5 5H14l-6 5v-5H6a5 5 0 0 1-5-5v-7a5 5 0 0 1 5-5Z" /><path d="M8 13h15M8 18h10" /></svg>;

  return (
    <article className="scratch-contact-card" onPointerMove={followCardEyes}>
      <span className="scratch-contact-icon" aria-hidden="true">{contactIcon}</span>
      <div className="scratch-contact-content">
        <strong>{value}</strong>
        <button type="button" onClick={copyValue} aria-label={`复制${label}`}>{copied ? "已复制" : "复制"}<i aria-hidden="true" /></button>
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="scratch-cover"
            aria-label={`刮开查看${label}`}
            onPointerDown={(event) => {
              drawingRef.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
              scratch(event);
            }}
            onPointerMove={scratch}
            onPointerUp={() => { drawingRef.current = false; }}
            onPointerCancel={() => { drawingRef.current = false; }}
          />
        )}
      </div>
      <span className="scratch-eyes" aria-hidden="true"><i><b /></i><i><b /></i></span>
    </article>
  );
}

function ResumeDownloadButton({ className = "" }: { className?: string }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const waterRef = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    if (waterRef.current) gsap.set(waterRef.current, { yPercent: 112 });
  }, { scope: buttonRef });

  const playFill = () => {
    const button = buttonRef.current;
    const water = waterRef.current;
    if (!button || !water) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf(water);
    button.classList.remove("is-filling");
    void button.offsetWidth;
    button.classList.add("is-filling");

    if (reduceMotion) {
      gsap.set(water, { yPercent: 0 });
      window.setTimeout(() => {
        gsap.set(water, { yPercent: -112 });
        button.classList.remove("is-filling");
      }, 260);
      return;
    }

    gsap.timeline({ onComplete: () => button.classList.remove("is-filling") })
      .set(water, { yPercent: 112 })
      .to(water, { yPercent: 0, duration: 0.46, ease: "power3.out" })
      .to(water, { yPercent: -112, duration: 0.42, delay: 0.46, ease: "power2.in" });
  };

  return (
    <a ref={buttonRef} className={`resume-download ${className}`} href="/shen-zeping-product-manager-resume.pdf" download="沈泽萍_杭州师范大学硕士_产品经理.pdf" onClick={playFill}>
      <span className="resume-water" ref={waterRef} aria-hidden="true"><i /><i /></span>
      <span className="resume-download-label">下载简历</span>
    </a>
  );
}

function ProjectArrow() {
  return (
    <span className="project-arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </span>
  );
}

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);
  const heroTrailRefs = useRef<HTMLSpanElement[]>([]);
  const heroTrailIndex = useRef(0);
  const previousHeroTrailPoint = useRef({ x: 0, y: 0, ready: false });
  const [activeInternshipProject, setActiveInternshipProject] = useState<number | null>(null);
  const [activePrototypeIndex, setActivePrototypeIndex] = useState(0);
  const prototypeSwipeRef = useRef({ startX: 0, moved: false });
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(null);
  const [activeAiJobScreen, setActiveAiJobScreen] = useState(0);
  const aiJobGalleryRef = useRef<HTMLDivElement>(null);
  const aiJobDragRef = useRef({ startX: 0, startScrollLeft: 0, dragging: false });
  const activePrototypeScreens = activeInternshipProject === 1
    ? computeSpacePrototypeScreens
    : activeInternshipProject === 2
      ? medicalResearchPrototypeScreens
      : dataSpacePrototypeScreens;
  const setAiJobScreen = (nextIndex: number) => {
    const normalizedIndex = (nextIndex + aiJobAssistantScreens.length) % aiJobAssistantScreens.length;
    setActiveAiJobScreen(normalizedIndex);
    requestAnimationFrame(() => {
      const gallery = aiJobGalleryRef.current;
      if (gallery) gallery.scrollTo({ left: normalizedIndex * (gallery.clientWidth * 0.72 + 16), behavior: "smooth" });
    });
  };
  const eyeXTo = useRef<((value: number) => void) | null>(null);
  const eyeYTo = useRef<((value: number) => void) | null>(null);
  const previousPointer = useRef({ x: 0, y: 0, ready: false });
  const playHeroTrailRef = useRef<(event: React.PointerEvent<HTMLElement>) => void>(() => undefined);

  useEffect(() => {
    if (activeInternshipProject === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [activeInternshipProject]);

  useGSAP((context, contextSafe) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (eyesRef.current) {
      gsap.set(eyesRef.current, { x: window.innerWidth * 0.74, y: window.innerHeight * 0.68 });
      eyeXTo.current = gsap.quickTo(eyesRef.current, "x", { duration: reduceMotion ? 0 : 0.42, ease: "power3.out" });
      eyeYTo.current = gsap.quickTo(eyesRef.current, "y", { duration: reduceMotion ? 0 : 0.42, ease: "power3.out" });
    }
    if (!reduceMotion) {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.from(".hero-welcome", { yPercent: 16, autoAlpha: 0, duration: 0.58 })
        .from(".hero-note, .hero-mobile-notes, .resume-download, .dock", { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.46 }, "-=.3");
      gsap.to(".float-a", { y: -18, rotation: -4, duration: 2.7, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".float-b", { y: 16, rotation: 5, duration: 3.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => gsap.from(el, {
        y: 28, autoAlpha: 0, duration: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%" },
      }));
    }

    playHeroTrailRef.current = contextSafe((event: React.PointerEvent<HTMLElement>) => {
      if (event.pointerType === "touch" || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
      if ((event.target as HTMLElement).closest("button, input, label, textarea, a")) return;

      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      const previous = previousHeroTrailPoint.current;
      if (previous.ready && Math.hypot(point.x - previous.x, point.y - previous.y) < 100) return;
      previousHeroTrailPoint.current = { ...point, ready: true };

      const particle = heroTrailRefs.current[heroTrailIndex.current % heroTrailShapes.length];
      heroTrailIndex.current += 1;
      if (!particle) return;

      gsap.killTweensOf(particle);
      gsap.set(particle, { clearProps: "all" });
      gsap.set(particle, { autoAlpha: 1, x: point.x, xPercent: -50, y: point.y, yPercent: -50 });
      gsap.timeline()
        .fromTo(particle, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.48, ease: "elastic.out(1, 0.3)" })
        .to(particle, { rotation: gsap.utils.random(-360, 360, 1), duration: 0.52, ease: "none" }, "<")
        .to(particle, { autoAlpha: 0, duration: 1, ease: "back.in(.4)", y: `+=${window.innerHeight * 1.2}` }, 0);
    });

    return () => {
      eyeXTo.current = null;
      eyeYTo.current = null;
      playHeroTrailRef.current = () => undefined;
    };
  }, { scope: root });

  const followEyes = (event: React.PointerEvent<HTMLElement>) => {
    const previous = previousPointer.current;
    const deltaX = previous.ready ? event.clientX - previous.x : 0;
    const deltaY = previous.ready ? event.clientY - previous.y : 0;
    previousPointer.current = { x: event.clientX, y: event.clientY, ready: true };
    const pupilX = Math.max(-1, Math.min(1, deltaX / 18));
    const pupilY = Math.max(-1, Math.min(1, deltaY / 18));
    root.current?.style.setProperty("--eye-x", String(pupilX));
    root.current?.style.setProperty("--eye-y", String(pupilY));
    const eyeLeft = Math.max(8, Math.min(window.innerWidth - 70, event.clientX + 18));
    const eyeTop = Math.max(8, Math.min(window.innerHeight - 50, event.clientY - 18));
    eyeXTo.current?.(eyeLeft);
    eyeYTo.current?.(eyeTop);
  };

  const playHeroTrail = (event: React.PointerEvent<HTMLElement>) => playHeroTrailRef.current(event);

  const finalFoldRadius = 18;
  const darkFoldPath = `M84 84 L0 0 L0 ${84 - finalFoldRadius} Q0 84 ${finalFoldRadius} 84 Z`;
  const shadowFoldRadius = 32;
  const shadowFoldPath = `M84 84 L0 0 L0 ${84 - shadowFoldRadius} Q0 84 ${shadowFoldRadius} 84 Z`;

  return (
    <main ref={root} onPointerMove={followEyes}>
      <div className="site-backdrop" aria-hidden="true">
        <span className="backdrop-mark backdrop-square-one" />
        <span className="backdrop-mark backdrop-square-two" />
        <span className="backdrop-mark backdrop-square-three" />
        <span className="backdrop-mark backdrop-wave-one">⌁⌁⌁</span>
        <span className="backdrop-mark backdrop-wave-two">⌁⌁</span>
        <span className="backdrop-mark backdrop-wave-three">⌁⌁⌁</span>
        <span className="backdrop-mark backdrop-cup">◒</span>
        <span className="backdrop-mark backdrop-spring">〽</span>
        <span className="about-background-eyes" aria-hidden="true"><i><b /></i><i><b /></i></span>
        <span className="backdrop-mark backdrop-idea">◈✎</span>
        <span className="backdrop-mark backdrop-confetti">◆ ◼ 〽</span>
      </div>
      <section ref={heroRef} className="hero" id="home" onPointerMove={playHeroTrail} onPointerLeave={() => { previousHeroTrailPoint.current.ready = false; }}>
        <div className="hero-stage">
          <h1 className="hero-title hero-welcome" aria-label="WELCOME TO MY PORTFOLIO">
            <span className="hero-welcome-line hero-welcome-line-one">WELCOME<span className="hero-note-anchor hero-note-work"><span className="hero-note hero-note-card-work float-b" style={{ "--note-corner": "#86bd4b" } as CSSProperties}><span className="note-badge">↟</span><span className="note-clip" aria-hidden="true" /><span className="hero-note-text">实习经历</span><span className="note-fold" aria-hidden="true"><i className="note-fold-shadow" /><i className="note-fold-back" /><i className="note-fold-front" /></span></span></span></span>
            <span className="hero-welcome-line hero-welcome-line-two">TO MY<span className="hero-note-anchor hero-note-ai"><span className="hero-note hero-note-card-ai" style={{ "--note-corner": "#d53bdf" } as CSSProperties}><span className="note-badge">✎</span><span className="note-clip" aria-hidden="true" /><span className="hero-note-text">AI探索与学习</span><span className="note-fold" aria-hidden="true"><i className="note-fold-shadow" /><i className="note-fold-back" /><i className="note-fold-front" /></span></span></span></span>
            <span className="hero-welcome-line hero-welcome-line-three"><span className="hero-note-anchor hero-note-about"><span className="hero-note hero-note-card-about float-a" style={{ "--note-corner": "#7856ea" } as CSSProperties}><span className="note-badge">◇</span><span className="note-clip" aria-hidden="true" /><span className="hero-note-text">关于我</span><span className="note-fold" aria-hidden="true"><i className="note-fold-shadow" /><i className="note-fold-back" /><i className="note-fold-front" /></span></span></span>PORTFOLIO</span>
          </h1>
          <nav className="hero-mobile-notes" aria-label="首页快捷导航">
            <a className="hero-mobile-note hero-mobile-note-about" href="#about"><span>◇</span>关于我</a>
            <a className="hero-mobile-note hero-mobile-note-work" href="#projects"><span>↟</span>实习经历</a>
            <a className="hero-mobile-note hero-mobile-note-ai" href="#services"><span>✎</span>AI探索与学习</a>
          </nav>
        </div>
        <img className="hero-doodle hero-doodle-ribbon" src="/hero-doodles/lime-ribbon.png" alt="" aria-hidden="true" />
        <img className="hero-doodle hero-doodle-spiral" src="/hero-doodles/yellow-spiral.png" alt="" aria-hidden="true" />
        <img className="hero-doodle hero-doodle-waves" src="/hero-doodles/blue-waves.png" alt="" aria-hidden="true" />
        <img className="hero-doodle hero-doodle-confetti" src="/hero-doodles/confetti.png" alt="" aria-hidden="true" />
        <div className="hero-trail" aria-hidden="true">
          {heroTrailShapes.map((shape, index) => <span ref={(element) => { if (element) heroTrailRefs.current[index] = element; }} className={`trail-particle ${shape}`} key={shape} />)}
        </div>
        <ResumeDownloadButton />
      </section>

      <div ref={eyesRef} className="floating-eyes" aria-hidden="true"><span className="eye"><i className="pupil" /></span><span className="eye"><i className="pupil" /></span></div>

      <nav className="dock" aria-label="快捷联系">
        <a className="dock-item" href="#about" aria-label="关于我" data-tooltip="关于我"><img src="/dock-icons/about.png" alt="" width={64} height={64} loading="lazy" decoding="async" /></a>
        <a className="dock-item" href="#projects" aria-label="实习经历" data-tooltip="实习经历"><img src="/dock-icons/internship.png" alt="" width={64} height={64} loading="lazy" decoding="async" /></a>
        <a className="dock-item" href="#services" aria-label="AI探索与学习" data-tooltip="AI探索与学习"><img src="/dock-icons/ai.png" alt="" width={64} height={64} loading="lazy" decoding="async" /></a>
        <a className="dock-item" href="#contact" aria-label="联系我" data-tooltip="联系我"><img src="/dock-icons/contact.png" alt="" width={64} height={64} loading="lazy" decoding="async" /></a>
      </nav>

      <section className="about section grid-paper" id="about">
        <span className="paper-doodle doodle-pink" aria-hidden="true">◉</span><span className="paper-doodle doodle-blue" aria-hidden="true">〰〰</span><span className="paper-doodle doodle-sun" aria-hidden="true">☼</span>
        <div className="section-heading about-heading reveal"><p className="section-kicker section-page-title about-page-title">01 / 关于我</p></div>
        <div className="about-profile-layout reveal">
          <div className="portrait-column">
            <div className="about-portrait-window">
              <div className="portrait-paperclip" aria-hidden="true" />
              <div className="portrait-window-bar" aria-hidden="true"><i /><i /><i /></div>
              <div className="about-portrait-photo">
                <img src="/about-portrait.jpg" alt="申泽平的个人照片" width={1000} height={1000} loading="eager" decoding="sync" fetchPriority="high" />
              </div>
            </div>
          </div>
          <div className="about-content-column">
            <div className="about-intro-edit" aria-label="个人介绍">
              <p className="about-intro-greeting"><strong>Hi，<br />我是沈泽萍</strong></p>
              <p className="about-intro-role">一名正在探索 AI 产品方向的产品经理</p>
              <p className="about-intro-summary">擅长从用户需求出发分析问题，并将需求转化为可落地的产品方案。<br />拥有 B 端产品从 0 到 1 的实践经验，能独立完成用户调研、需求分析、产品设计及项目推进工作。<br />持续学习AI 产品相关知识并积极实践，探索 AI 在产品场景中的应用。</p>
            </div>
            <div
              className="about-info-grid"
              style={{
                "--fold-x": 0,
                "--fold-y": 0,
              } as CSSProperties}
            >
              <article className="about-education-card">
                <span className="about-card-pin" aria-hidden="true"><i className="pin-needle" /><i className="pin-base" /><i className="pin-cap" /></span>
                <span className="about-card-fold" aria-hidden="true"><svg className="fold-shadow-soft" viewBox="0 0 84 84" preserveAspectRatio="none"><path d={shadowFoldPath} /></svg><svg className="fold-back" viewBox="0 0 84 84" preserveAspectRatio="none"><path d={darkFoldPath} /></svg><i className="fold-front" /></span>
                <p className="about-card-kicker">EDUCATION / 教育背景</p>
                <div className="education-entry">
                  <span>2023.09 — 2026.06</span>
                  <div><strong>杭州师范大学</strong><small>硕士<br />应用心理学</small></div>
                </div>
                <div className="education-entry">
                  <span>2019.09 - 2023.06</span>
                  <div><strong>杭州师范大学钱江学院</strong><small>本科<br />护理学</small></div>
                </div>
              </article>
              <article className="about-skills-card">
                <span className="about-card-pin" aria-hidden="true"><i className="pin-needle" /><i className="pin-base" /><i className="pin-cap" /></span>
                <span className="about-card-fold" aria-hidden="true"><svg className="fold-shadow-soft" viewBox="0 0 84 84" preserveAspectRatio="none"><path d={shadowFoldPath} /></svg><svg className="fold-back" viewBox="0 0 84 84" preserveAspectRatio="none"><path d={darkFoldPath} /></svg><i className="fold-front" /></span>
                <p className="about-card-kicker">SKILLS / 技能</p>
                <div className="skill-list">
                  <div className="skill-row"><div><b>数据分析</b><div className="skill-tools" aria-label="数据分析工具"><span><img src="/skill-logos/sql.png" alt="SQL" width={58} height={58} loading="lazy" decoding="async" /><small>SQL</small></span><span><img src="/skill-logos/spss.png" alt="SPSS" width={58} height={58} loading="lazy" decoding="async" /><small>SPSS</small></span><span><img src="/skill-logos/matlab.png" alt="Matlab" width={58} height={58} loading="lazy" decoding="async" /><small>Matlab</small></span><span><img src="/skill-logos/r.png" alt="R语言" width={58} height={58} loading="lazy" decoding="async" /><small>R语言</small></span></div></div></div>
                  <div className="skill-row"><div><b>原型设计</b><div className="skill-tools" aria-label="原型设计工具"><span><img src="/skill-logos/axure.png" alt="Axure" width={58} height={58} loading="lazy" decoding="async" /><small>Axure</small></span><span><img src="/skill-logos/figma.png" alt="Figma" width={58} height={58} loading="lazy" decoding="async" /><small>Figma</small></span></div></div></div>
                  <div className="skill-row"><div><b>AI 工具</b><div className="skill-tools" aria-label="AI 工具"><span><img src="/skill-logos/codex.png" alt="Codex" width={58} height={58} loading="lazy" decoding="async" /><small>Codex</small></span><span><img src="/skill-logos/lovable.png" alt="Lovable" width={58} height={58} loading="lazy" decoding="async" /><small>Lovable</small></span><span><img src="/skill-logos/coze.png" alt="Coze" width={58} height={58} loading="lazy" decoding="async" /><small>Coze</small></span></div></div></div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="projects section grid-paper" id="projects">
        <header className="section-header centered-header section-heading reveal"><p className="section-kicker section-page-title">02 / 实习经历</p></header>
        <div className="internship-mobile-flow reveal" aria-label="按公司分组的实习经历">
          {internships.map((internship, companyIndex) => (
            <section className="internship-mobile-group" key={internship.company}>
              <article className="internship-entry">
                <span className="timeline-index">{companyIndex === 0 ? "02" : "01"}</span>
                <div className="internship-card"><p className="internship-period">{internship.period}</p><h3><img src={internship.logo} alt="" width={64} height={64} aria-hidden="true" loading="lazy" decoding="async" />{internship.company}</h3><p className="internship-role">{internship.role}</p></div>
              </article>
              <div className="internship-mobile-projects">
                {internshipProjects.filter((project) => project.company === internship.company).map((project) => {
                  const projectIndex = internshipProjects.findIndex((candidate) => candidate.title === project.title);
                  return (
                    <button className="internship-project-card" style={{ "--project-color": project.color } as CSSProperties} type="button" key={project.title} onClick={() => { setActivePrototypeIndex(0); setActiveInternshipProject(projectIndex); }} aria-haspopup="dialog">
                      <span className="project-number">PROJECT / {String(projectIndex + 1).padStart(2, "0")}</span><h3>{project.title}</h3><div className="internship-project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="internship-project-copy">{project.content.map((line) => <p key={line}>{line}</p>)}</div><p className="internship-project-result"><b>成果：</b>{project.result}</p><ProjectArrow />
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
        <div className="internship-layout reveal">
          <div className="internship-timeline" aria-label="实习时间线">
            {internships.map((internship, index) => (
              <article className="internship-entry" key={internship.company}>
                <span className="timeline-index">{index === 0 ? "02" : "01"}</span>
                <div className="internship-card">
                  <p className="internship-period">{internship.period}</p>
                  <h3><img src={internship.logo} alt="" width={64} height={64} aria-hidden="true" loading="lazy" decoding="async" />{internship.company}</h3>
                  <p className="internship-role">{internship.role}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="internship-project-grid" aria-label="实习项目概览">
            {internshipProjects.map((project, index) => (
              <button
                className="internship-project-card"
                style={{ "--project-color": project.color } as CSSProperties}
                type="button"
                key={project.title}
                onClick={() => { setActivePrototypeIndex(0); setActiveInternshipProject(index); }}
                aria-haspopup="dialog"
              >
                <span className="project-number">PROJECT / {String(index + 1).padStart(2, "0")}</span>
                <h3>{project.title}</h3>
                <div className="internship-project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="internship-project-copy">{project.content.map((line) => <p key={line}>{line}</p>)}</div>
                <p className="internship-project-result"><b>成果：</b>{project.result}</p>
                <ProjectArrow />
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeInternshipProject !== null && (
        <div
          className="internship-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setActiveInternshipProject(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setActiveInternshipProject(null);
          }}
        >
          <section className="internship-modal" role="dialog" aria-modal="true" aria-labelledby="internship-modal-title">
            <div className="internship-modal-panel" style={{ "--project-color": internshipProjects[activeInternshipProject].color } as CSSProperties}>
              <div className="internship-modal-toolbar">
                <div className="mac-traffic-lights"><button type="button" onClick={() => setActiveInternshipProject(null)} aria-label="关闭项目详情" autoFocus /><i aria-hidden="true" /><i aria-hidden="true" /></div>
                <div className="internship-folder-tabs" role="tablist" aria-label="切换项目">
                  {internshipProjects.map((project, index) => (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeInternshipProject === index}
                      className={activeInternshipProject === index ? "active" : ""}
                      style={{ "--project-color": project.color } as CSSProperties}
                      onClick={() => { setActivePrototypeIndex(0); setActiveInternshipProject(index); }}
                      key={project.title}
                    >{project.title}</button>
                  ))}
                </div>
              </div>
              <div className="internship-modal-content">
                <p className="internship-modal-company">{internshipProjects[activeInternshipProject].company}</p>
                <h2 id="internship-modal-title">{internshipProjects[activeInternshipProject].title}</h2>
                <div className="internship-detail-grid">
                  {internshipProjects[activeInternshipProject].details.map(([title, text], index) => (
                    <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><ul className="internship-detail-list">{text.split("\n").map((line) => <li key={line}>{line.replace(/^·\s*/, "")}</li>)}</ul></article>
                  ))}
                </div>
                {(activeInternshipProject === 0 || activeInternshipProject === 1 || activeInternshipProject === 2) && (
                  <section className="prototype-gallery" aria-labelledby="prototype-gallery-title">
                    <div className="prototype-gallery-heading"><h3 id="prototype-gallery-title">项目展示</h3><p>{String(activePrototypeIndex + 1).padStart(2, "0")} / {activePrototypeScreens[activePrototypeIndex].label}</p></div>
                    <div className="prototype-coverflow" role="group" aria-roledescription="carousel" aria-label={`${internshipProjects[activeInternshipProject].title}项目展示`} tabIndex={0} onKeyDown={(event) => {
                      if (event.key === "ArrowRight") { event.preventDefault(); setActivePrototypeIndex((current) => (current + 1) % activePrototypeScreens.length); }
                      if (event.key === "ArrowLeft") { event.preventDefault(); setActivePrototypeIndex((current) => (current - 1 + activePrototypeScreens.length) % activePrototypeScreens.length); }
                    }}>
                      <div className="prototype-coverflow-stage" onPointerDown={(event) => {
                        prototypeSwipeRef.current = { startX: event.clientX, moved: false };
                        event.currentTarget.setPointerCapture(event.pointerId);
                      }} onPointerMove={(event) => {
                        if (Math.abs(event.clientX - prototypeSwipeRef.current.startX) > 12) prototypeSwipeRef.current.moved = true;
                      }} onPointerUp={(event) => {
                        const delta = event.clientX - prototypeSwipeRef.current.startX;
                        if (Math.abs(delta) > 32) setActivePrototypeIndex((current) => delta < 0 ? (current + 1) % activePrototypeScreens.length : (current - 1 + activePrototypeScreens.length) % activePrototypeScreens.length);
                        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
                      }} onPointerCancel={() => { prototypeSwipeRef.current.moved = false; }} onClick={(event) => {
                        if (prototypeSwipeRef.current.moved) { prototypeSwipeRef.current.moved = false; return; }
                        const bounds = event.currentTarget.getBoundingClientRect();
                        const horizontalPosition = (event.clientX - bounds.left) / bounds.width;
                        if (horizontalPosition < 0.38) setActivePrototypeIndex((current) => (current - 1 + activePrototypeScreens.length) % activePrototypeScreens.length);
                        if (horizontalPosition > 0.62) setActivePrototypeIndex((current) => (current + 1) % activePrototypeScreens.length);
                      }}>
                        {activePrototypeScreens.map(({ label, src, width, height }, index) => {
                          let relative = index - activePrototypeIndex;
                          if (relative > activePrototypeScreens.length / 2) relative -= activePrototypeScreens.length;
                          if (relative < -activePrototypeScreens.length / 2) relative += activePrototypeScreens.length;
                          const distance = Math.abs(relative);
                          const visible = distance <= 2;
                          return <button type="button" className={`prototype-coverflow-card${visible ? " is-visible" : ""}${relative === 0 ? " is-active" : ""}`} key={src} onClick={(event) => { event.stopPropagation(); setActivePrototypeIndex(index); }} aria-label={`切换至${label}原型图`} aria-current={relative === 0 ? "true" : undefined} style={{ "--prototype-ratio": `${width} / ${height}`, "--coverflow-x": `${relative * 235}px`, "--coverflow-z": `${-distance * 220}px`, "--coverflow-y": `${-relative * 12}deg`, "--coverflow-tilt": `${relative * 5}deg`, "--coverflow-scale": Math.max(0.64, 1 - distance * 0.14), "--coverflow-opacity": visible ? 1 : 0 } as CSSProperties}>
                            <img src={src} alt={`${label}原型图`} />
                            <span>{String(index + 1).padStart(2, "0")} / {label}</span>
                          </button>;
                        })}
                      </div>
                    </div>
                    <div
                      className="prototype-mobile-carousel"
                      key={`prototype-mobile-${activeInternshipProject}`}
                      role="region"
                      aria-roledescription="carousel"
                      aria-label={`${internshipProjects[activeInternshipProject].title}项目展示，左右滑动切换`}
                      onScroll={(event) => {
                        const carousel = event.currentTarget;
                        if (carousel.clientWidth > 0) setActivePrototypeIndex(Math.round(carousel.scrollLeft / carousel.clientWidth));
                      }}
                    >
                      {activePrototypeScreens.map(({ label, src }, index) => (
                        <figure className="prototype-mobile-slide" key={src} aria-label={`${String(index + 1).padStart(2, "0")} / ${label}`}>
                          <img src={src} alt={`${label}原型图`} draggable={false} />
                          <figcaption>{String(index + 1).padStart(2, "0")} / {label}</figcaption>
                        </figure>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      <section className="services section grid-paper" id="services"><div className="services-top centered-header section-heading reveal"><p className="section-kicker section-page-title">03 / AI探索与学习</p></div><div className="services-list reveal">{services.map((service, i) => {
        const isOpen = activeServiceIndex === i;
        return <div className={`service-entry${isOpen ? " is-open" : ""}`} key={service} style={{ "--service-color": serviceColors[i] } as CSSProperties}>
          <button type="button" className="service-toggle" onClick={() => {
            if (i === 1) {
              setActiveServiceIndex(null);
              document.getElementById("home")?.scrollIntoView({ behavior: "smooth", block: "start" });
              return;
            }
            setActiveServiceIndex((current) => current === i ? null : i);
          }} aria-expanded={isOpen} aria-controls={`service-detail-${i}`}><span>0{i + 1}</span><span className="service-title-group"><b>{service}</b><span className="service-tool-label">{i === 0 ? "Lovable" : "Codex"}</span></span><i aria-hidden="true">{isOpen ? "×" : "+"}</i></button>
          {isOpen && (i === 0 ? <div className="service-detail-panel ai-job-detail" id={`service-detail-${i}`} aria-label={`${service}内容区域`}>
            <p className="ai-job-summary">面向求职用户，解决求职过程中“难以快速抓取岗位核心要求、简历与岗位匹配率低、面试复盘效率低”等问题，设计并搭建多任务 AI求职助手，帮助用户完成从JD分析到面试复盘的一站式流程。</p>
            <div className="ai-job-carousel-shell">
              {activeAiJobScreen > 0 && <button type="button" className="ai-job-carousel-button ai-job-carousel-prev" onClick={() => setAiJobScreen(activeAiJobScreen - 1)} aria-label="查看上一张图片"><span>←</span></button>}
              <div className="ai-job-carousel" ref={aiJobGalleryRef} onPointerDown={(event) => { const gallery = event.currentTarget; aiJobDragRef.current = { startX: event.clientX, startScrollLeft: gallery.scrollLeft, dragging: true }; gallery.setPointerCapture(event.pointerId); }} onPointerMove={(event) => { const drag = aiJobDragRef.current; if (drag.dragging) event.currentTarget.scrollLeft = drag.startScrollLeft - (event.clientX - drag.startX); }} onPointerUp={(event) => { const drag = aiJobDragRef.current; if (!drag.dragging) return; drag.dragging = false; event.currentTarget.releasePointerCapture(event.pointerId); setAiJobScreen(Math.round(event.currentTarget.scrollLeft / (event.currentTarget.clientWidth * 0.72 + 16))); }} onPointerCancel={() => { aiJobDragRef.current.dragging = false; }}>
                {aiJobAssistantScreens.map(({ label, src }, screenIndex) => <figure className="ai-job-slide" id={`ai-job-slide-${screenIndex}`} key={src}><img src={src} alt={`${label}界面`} draggable={false} /><figcaption>{String(screenIndex + 1).padStart(2, "0")} / {label}</figcaption></figure>)}
              </div>
              <button type="button" className="ai-job-carousel-button ai-job-carousel-next" onClick={() => setAiJobScreen(activeAiJobScreen + 1)} aria-label="查看下一张图片"><span>→</span></button>
            </div>
          </div> : <div className="service-detail-panel" id={`service-detail-${i}`} aria-label={`${service}内容区域`} />)}
        </div>;
      })}<PendingBlobReveal /></div></section>

      <footer className="contact contact-final" id="contact">
        <div className="contact-yellow-frame">
          <div className="contact-scene">
            <p className="contact-edit contact-edit-lead">下一段经历，<br />也许可以一起创建</p>
            <p className="contact-edit contact-edit-reply">— Let‘s chat!<br />Looking forward to your reply.</p>
            <div className="scratch-contact-row">
              <ScratchContactCard icon="phone" label="电话" value="18305086136" />
              <ScratchContactCard icon="chat" label="微信" value="Shenzzzp" />
              <ScratchContactCard icon="mail" label="邮箱" value="pingshenze@163.com" />
            </div>
            <ResumeDownloadButton className="contact-resume-download" />
          </div>
          <nav className="contact-bottom-nav" aria-label="页面导航">
            <a href="#about">关于我</a><a href="#projects">实习经历</a><a href="#services">AI探索与学习</a><a href="#contact">联系我</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
