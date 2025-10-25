"use client";

import { useI18n } from "@/context/i18n-context";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-foreground/5 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary" />
              <span className="font-bold text-lg">Cloud Connect</span>
            </div>
            <p className="text-sm text-foreground/60">{t("footerAbout")}</p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">
              {t("footerProduct")}
            </h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  {t("features")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  {t("pricing")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  {t("security")}
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">
              {t("footerCompany")}
            </h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  {t("about")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  {t("footerBlog")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  {t("footerCareers")}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">
              {t("footerLegal")}
            </h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  {t("footerPrivacy")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  {t("footerTerms")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  {t("contact")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
          <p>© 2025 Cloud Connect. {t("allRights")}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition">
              {t("footerTwitter")}
            </a>
            <a href="#" className="hover:text-foreground transition">
              {t("footerLinkedIn")}
            </a>
            <a href="#" className="hover:text-foreground transition">
              {t("footerFacebook")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
