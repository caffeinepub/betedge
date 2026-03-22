import { Input } from "@/components/ui/input";
import { Bell, Search, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const NAV_LINKS = ["Analytics", "Odds", "Trends", "Insights", "Tools"];

export function Header() {
  const [activeNav, setActiveNav] = useState("Analytics");
  const [search, setSearch] = useState("");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-6">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <span className="font-black text-lg tracking-widest text-foreground">
              BET<span className="text-primary">EDGE</span>
            </span>
          </div>

          <nav
            className="hidden md:flex items-center gap-1"
            data-ocid="header.panel"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link}
                data-ocid={`nav.${link.toLowerCase()}.tab`}
                onClick={() => setActiveNav(link)}
                className={`relative px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeNav === link
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link}
                {activeNav === link && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex-1" />

          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="header.search_input"
              placeholder="Search teams, matchups..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-56 h-8 bg-secondary/50 border-border text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
            />
          </div>

          <button
            type="button"
            data-ocid="header.notifications.button"
            className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
          </button>
        </div>
      </div>
    </header>
  );
}
