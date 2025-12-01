"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X, Moon, Sun, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  // { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -10]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      className="fixed top-2 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-0"
      style={{ y: headerY, opacity: headerOpacity }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Glassmorphism Navigation */}
      <motion.nav
        className={cn(
          "relative overflow-hidden w-full max-w-7xl",
          "bg-white/80 dark:bg-black/80 backdrop-blur-xl",
          "border border-white/20 dark:border-white/10",
          "rounded-2xl sm:rounded-full px-4 sm:px-8 lg:px-12 py-3",
          "shadow-2xl shadow-primary/10",
          "transition-all duration-500",
          isScrolled
            ? "bg-white/90 dark:bg-black/90 shadow-2xl shadow-primary/20 scale-[1.02]"
            : "bg-white/80 dark:bg-black/80 shadow-xl"
        )}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 rounded-2xl sm:rounded-full"
          animate={{
            background: [
              "linear-gradient(90deg, rgba(59,130,246,0.05) 0%, rgba(59,130,246,0.03) 50%, rgba(139,92,246,0.05) 100%)",
              "linear-gradient(90deg, rgba(139,92,246,0.05) 0%, rgba(59,130,246,0.03) 50%, rgba(59,130,246,0.05) 100%)",
              "linear-gradient(90deg, rgba(59,130,246,0.05) 0%, rgba(59,130,246,0.03) 50%, rgba(139,92,246,0.05) 100%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-full">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              initial={{
                x: Math.random() * 300,
                y: Math.random() * 80,
              }}
              animate={{
                y: [null, -10, null],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        <div className="flex h-14 items-center justify-between gap-4 sm:gap-8 relative z-10">
          {/* Animated Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg border border-white/10"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 0 8px rgba(59, 130, 246, 0.1)",
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Image
                  src="/logo.jpeg"
                  alt="Yog Computers Logo"
                  width={32}
                  height={32}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain rounded-lg"
                  priority
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="text-lg sm:text-xl font-bold tracking-tight"
              whileHover={{
                backgroundImage:
                  "linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: "linear-gradient(90deg, #000, #3b82f6, #000)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              className="dark:text-white hidden xs:block"
            >
              <span className="sm:hidden">Yog Computers</span>
              <span className="hidden sm:inline">Yog Computers</span>
            </motion.div>
          </Link>

          {/* Spectacular Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  className="relative"
                  onHoverStart={() => setHoveredItem(item.name)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-3 xl:px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 group",
                      isActive
                        ? "text-primary"
                        : "text-gray-600 dark:text-gray-300 hover:text-primary"
                    )}
                  >
                    {/* Hover Background */}
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredItem === item.name || isActive ? 1 : 0,
                        scale: hoveredItem === item.name || isActive ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Text with stagger animation */}
                    <motion.span
                      className="relative z-10 inline-block"
                      initial={{ y: 0 }}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name.split("").map((letter, letterIndex) => (
                        <motion.span
                          key={letterIndex}
                          className="inline-block"
                          whileHover={{
                            y: -2,
                            color: "#3b82f6",
                            transition: {
                              duration: 0.2,
                              delay: letterIndex * 0.02,
                            },
                          }}
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </motion.span>

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-1/2 w-1 h-1 bg-primary rounded-full"
                        layoutId="activeIndicator"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ x: "-50%" }}
                      />
                    )}

                    {/* Sparkle Effect on Hover */}
                    <AnimatePresence>
                      {hoveredItem === item.name && (
                        <motion.div
                          className="absolute -top-1 -right-1"
                          initial={{ opacity: 0, scale: 0, rotate: 0 }}
                          animate={{ opacity: 1, scale: 1, rotate: 180 }}
                          exit={{ opacity: 0, scale: 0, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Sparkles className="w-3 h-3 text-primary" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Animated Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {mounted && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full relative overflow-hidden group w-9 h-9 sm:w-10 sm:h-10"
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <AnimatePresence mode="wait" initial={false}>
                    {theme === "dark" ? (
                      <motion.div
                        key="sun"
                        initial={{ y: -30, opacity: 0, rotate: -90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: 30, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Sun className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ y: -30, opacity: 0, rotate: -90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: 30, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Moon className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            )}

            {/* Spectacular CTA Button */}
            <motion.div
              className="hidden lg:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                asChild
                className="rounded-full relative overflow-hidden group bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-purple-600 transition-all duration-300 px-4 xl:px-6"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 text-sm xl:text-base">
                    Work with us
                  </span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-3 h-3 xl:w-4 xl:h-4 relative z-10" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>

            {/* Animated Mobile Menu Button */}
            <motion.div
              className="lg:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative overflow-hidden w-9 h-9 sm:w-10 sm:h-10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <motion.div
                  className="absolute inset-0 bg-primary/10 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <AnimatePresence mode="wait" initial={false}>
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <X className="h-5 w-5 sm:h-6 sm:w-6 relative z-10" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Menu className="h-5 w-5 sm:h-6 sm:w-6 relative z-10" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Spectacular Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", y: 0, scale: 1 }}
              exit={{ opacity: 0, height: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden mt-4 bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 px-4 sm:px-6 py-4 sm:py-6 space-y-1 relative overflow-hidden"
            >
              {/* Mobile Menu Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              />

              {/* Mobile Navigation Items */}
              {navigation.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="relative z-10"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 py-3 px-3 sm:px-4 rounded-xl transition-all duration-300 group relative overflow-hidden",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-gray-600 dark:text-gray-300 hover:bg-primary/5 hover:text-primary"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.div
                        className="absolute inset-0 bg-primary/10 rounded-xl"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />

                      <motion.div
                        className="w-1.5 h-1.5 bg-primary rounded-full"
                        initial={{ scale: isActive ? 1 : 0 }}
                        animate={{ scale: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      <span className="font-medium relative z-10 text-sm sm:text-base">
                        {item.name}
                      </span>

                      <motion.div
                        className="ml-auto"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.2 }}
                        />
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navigation.length * 0.1, duration: 0.3 }}
                className="pt-3 sm:pt-4 relative z-10"
              >
                <Button
                  asChild
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-purple-600 transition-all duration-300 relative overflow-hidden group h-11 sm:h-12"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:text-base">
                      Work with us
                      <Sparkles className="w-4 h-4" />
                    </span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
}
