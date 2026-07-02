export function TopoLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-cream opacity-[0.32]"
      viewBox="0 0 1440 900"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* Primary contours */}
      <path
        d="M-40 180C120 120 280 220 420 160C560 100 700 200 860 140C1020 80 1180 180 1320 120C1380 90 1420 100 1480 80"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M-60 320C100 260 260 360 400 300C540 240 680 340 840 280C1000 220 1160 320 1300 260C1360 230 1400 240 1460 220"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M-20 480C140 420 300 520 440 460C580 400 720 500 880 440C1040 380 1200 480 1340 420C1400 390 1440 400 1500 380"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M-80 620C80 560 240 660 380 600C520 540 660 640 820 580C980 520 1140 620 1280 560C1340 530 1380 540 1440 520"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M0 760C160 700 320 800 460 740C600 680 740 780 900 720C1060 660 1220 760 1360 700C1420 670 1460 680 1520 660"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* Secondary tighter contours */}
      <path
        d="M-20 240C160 200 320 280 480 230C640 180 800 270 960 210C1120 150 1280 240 1440 190"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.7"
      />
      <path
        d="M-40 400C140 350 300 430 460 380C620 330 780 410 940 360C1100 310 1260 390 1420 340"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.7"
      />
      <path
        d="M-10 560C150 510 310 590 470 540C630 490 790 570 950 520C1110 470 1270 550 1430 500"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.7"
      />
      <path
        d="M20 680C180 630 340 710 500 660C660 610 820 690 980 640C1140 590 1300 670 1460 620"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.7"
      />

      {/* Elliptical rings — wind-tunnel feel */}
      <ellipse cx="720" cy="450" rx="520" ry="280" stroke="currentColor" strokeWidth="0.8" />
      <ellipse cx="720" cy="450" rx="420" ry="220" stroke="currentColor" strokeWidth="0.7" opacity="0.8" />
      <ellipse cx="720" cy="450" rx="320" ry="165" stroke="currentColor" strokeWidth="0.6" opacity="0.65" />
      <ellipse cx="480" cy="380" rx="200" ry="120" stroke="currentColor" strokeWidth="0.6" />
      <ellipse cx="980" cy="520" rx="240" ry="140" stroke="currentColor" strokeWidth="0.6" />
      <ellipse cx="300" cy="600" rx="160" ry="90" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <ellipse cx="1140" cy="320" rx="180" ry="100" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />

      {/* Diagonal flow lines */}
      <path
        d="M200 50 C400 200 500 350 720 450"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.45"
      />
      <path
        d="M1240 50 C1040 200 940 350 720 450"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.45"
      />
      <path
        d="M200 850 C400 700 500 550 720 450"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.45"
      />
      <path
        d="M1240 850 C1040 700 940 550 720 450"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.45"
      />
    </svg>
  );
}
