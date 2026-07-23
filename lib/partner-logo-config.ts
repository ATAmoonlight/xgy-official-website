export type PartnerLogoConfig = {
  scale: number;
  translateX: string;
  translateY: string;
  maxWidth: string;
  maxHeight: string;
};

const DEFAULT_PARTNER_LOGO_CONFIG: PartnerLogoConfig = {
  scale: 1,
  translateX: "0%",
  translateY: "0%",
  maxWidth: "86%",
  maxHeight: "76px",
};

export const partnerLogoConfig: Record<
  string,
  Partial<PartnerLogoConfig>
> = {
  bull: {
    scale: 1.6,
    maxWidth: "100%",
    maxHeight: "92px",
  },
  longood: {
    scale: 1.55,
    maxWidth: "100%",
    maxHeight: "96px",
  },
  foxess: {
    scale: 1.28,
    maxWidth: "96%",
    maxHeight: "90px",
  },
};

export function getPartnerLogoConfig(key: string): PartnerLogoConfig {
  return {
    ...DEFAULT_PARTNER_LOGO_CONFIG,
    ...partnerLogoConfig[key],
  };
}
