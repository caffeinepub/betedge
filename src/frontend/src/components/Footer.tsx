import { TrendingUp } from "lucide-react";
import { SiDiscord, SiGithub, SiX } from "react-icons/si";

const FOOTER_LINKS = [
  "Analytics",
  "Live Odds",
  "Betting Trends",
  "Injury Reports",
  "Expert Picks",
  "AI Projections",
  "Responsible Gambling",
  "Privacy Policy",
];

const SOCIAL_LINKS = [
  { Icon: SiX, label: "X / Twitter" },
  { Icon: SiDiscord, label: "Discord" },
  { Icon: SiGithub, label: "GitHub" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="border-t border-border mt-16 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-black text-base tracking-widest text-foreground">
              BET<span className="text-primary">EDGE</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Data-driven sports analytics for smarter betting decisions. For
            informational purposes only.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link}
              href="."
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {SOCIAL_LINKS.map(({ Icon, label }) => (
            <a
              key={label}
              href="."
              aria-label={label}
              className="w-8 h-8 rounded-md bg-secondary/60 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          &copy; {year}. Built with ❤️ using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>{" "}
          · Odds data is for informational purposes only. Please bet
          responsibly.
        </p>
      </div>
    </footer>
  );
}
