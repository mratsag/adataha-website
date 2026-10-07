"use client"

import { useId, type CSSProperties } from "react"
import styles from "./CoffeePourAnimation.module.css"

const beans = Array.from({ length: 9 }, (_, index) => ({
  delay: -index * 0.1,
  drift: (index % 3 - 1) * 5,
  spin: index % 2 ? 220 : -170,
}))

export default function CoffeePourAnimation() {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const ref = (name: string) => `${id}-${name}`
  const fill = (name: string) => `url(#${ref(name)})`

  return (
    <div className={styles.scene}>
      <svg viewBox="0 0 600 560" role="img" aria-label="CAWA paketinden kahve çekirdekleri cam bardağa düşüyor. Bardaktaki sıcak kahve seviyesi yükselip alçalıyor ve buhar yükseliyor." className="w-full">
        <defs>
          <radialGradient id={ref("halo")}><stop stopColor="#EAD6C1" stopOpacity=".6" /><stop offset="1" stopColor="#F7F0E5" stopOpacity="0" /></radialGradient>
          <filter id={ref("steam")} x="-100%" y="-50%" width="300%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
          <filter id={ref("shadow")} x="-40%" y="-30%" width="180%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#3D2A24" floodOpacity=".12" /></filter>
          <clipPath id={ref("inside")} clipPathUnits="userSpaceOnUse"><path d="M337 357Q421 317 507 357L494 449Q425 485 355 451Z" /></clipPath>
          <clipPath id={ref("level")} clipPathUnits="userSpaceOnUse"><rect className={styles.level} x="330" y="367" width="182" height="125" /></clipPath>
          <clipPath id={ref("surface")} clipPathUnits="userSpaceOnUse"><ellipse cx="423" cy="367" rx="79" ry="24" /></clipPath>
        </defs>
        <ellipse cx="324" cy="297" rx="252" ry="224" fill={fill("halo")} />
        <ellipse cx="298" cy="508" rx="220" ry="16" fill="#3D2A24" opacity=".04" />
        {/* The pouring corner is the pivot, so its location cannot drift. */}
        <g className={styles.pouch}>
          <g transform="translate(385 235) scale(1.2) translate(-385 -235)">
            <image href="/images/cawa-package.webp" x="220" y="225" width="190" height="280" preserveAspectRatio="xMidYMid meet" filter={fill("shadow")} />
          </g>
        </g>
        <image href="/images/empty-coffee-cup-clean.webp" x="265" y="310" width="320" height="214" preserveAspectRatio="xMidYMid meet" />
        <g className={styles.beans}>
          {beans.map((bean, index) => <g key={index} className={styles.bean} style={{
            animationDelay: `${bean.delay}s`, "--drift": `${bean.drift}px`, "--spin": `${bean.spin}deg`,
          } as CSSProperties}>
            <image href="/images/coffee-bean.webp" x="377" y="228" width="16" height="19" />
          </g>)}
        </g>
        {/* Both photos share framing. Only the liquid moves inside the fixed glass. */}
        <g clipPath={fill("inside")}>
          <g clipPath={fill("level")}>
            <image href="/images/hot-coffee-cup.webp" x="265" y="310" width="320" height="214" preserveAspectRatio="xMidYMid meet" />
          </g>
          <g className={styles.level}>
            <g clipPath={fill("surface")}>
              <image href="/images/hot-coffee-cup.webp" x="265" y="310" width="320" height="214" preserveAspectRatio="xMidYMid meet" />
            </g>
          </g>
          <path d="m346 385 12 61" fill="none" stroke="#FFF" strokeOpacity=".24" strokeWidth="2" />
        </g>
        <g filter={fill("steam")} fill="none" stroke="#9A897B" strokeWidth="9" strokeLinecap="round">
          <path className={styles.steamOne} d="M394 349c-27-26 18-39-1-67s16-39 0-61" />
          <path className={styles.steamTwo} d="M423 349c-20-22 24-42 3-63s16-34 0-51" />
          <path className={styles.steamThree} d="M449 356c-24-25 18-36 0-59s14-31 0-48" />
        </g>
      </svg>
      <p className="px-6 text-center text-[10px] tracking-[0.24em] text-muted-foreground">CAWA · KAHVE KEYFİ</p>
    </div>
  )
}
